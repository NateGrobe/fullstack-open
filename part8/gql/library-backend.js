const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const Book = require('./models/Book')
const Author = require('./models/Author')

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
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      authorName: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

function filterByGenre(booksArr, givenGenre) {
  return booksArr.filter(book => book.genres.includes(givenGenre))
}

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    // doesn't need to work
    allBooks: async (root, args) => {
      const books = await Book.find({})
      if (!args.author && !args.genre) return books
      let filteredBooks
      if(args.author) {
        const author = await Author.findOne({ name: args.author})
        filteredBooks = books.filter(book => book.author == author.id)
      }
      if (args.genre) {
        if(filteredBooks) return filterByGenre(filteredBooks, args.genre)
        return filterByGenre(books, args.genre)
      }

      return filteredBooks
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({})
      return books.filter(book => 
        book.author.toString() === root._id.toString()).length
    },
  },
  Book: {
    author: root => {
      return {
        name: root.name,
        born: root.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.authorName })
      if (!author) {
        author = new Author({ name: args.authorName })
      }
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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
