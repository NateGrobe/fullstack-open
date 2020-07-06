const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const SECRET = 'shh dont tell'

mongoose.set('useFindAndModify', false)

console.log('connection to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }


  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      authorName: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

function filterByGenre(booksArr, givenGenre) {
  if (!givenGenre || givenGenre === '') return booksArr
  return booksArr.filter(book => book.genres.includes(givenGenre))
}

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      let filteredBooks = filterByGenre(books, args.genre)

      if (args.author) 
        return filteredBooks.filter(book => book.author.name === args.author)

      return filteredBooks
    },
    allAuthors: () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: root => {
      return {
        name: root.author.name,
        born: root.author.born
      }
    }
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({})
      return books.filter(book => 
        book.author.toString() === root._id.toString()).length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.authorName })
      const currentUser = context.currentUser

      if(!currentUser) throw new AuthenticationError('not authenticated')

      if (!author) author = new Author({ name: args.authorName })

      const authorId = author._id
      const book = new Book({ ...args, author: authorId })
      try {
        await book.save()
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser) throw new AuthenticationError('not authenticated')

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'pass')
        throw new UserInputError('wrong credentials')

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      console.log('here')
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
