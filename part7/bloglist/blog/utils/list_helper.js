// dummy test
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = blogs => {
  let fav
  let max = 0

  if (blogs.length === 0)
    return 'There are currently no blog posts'

  blogs.forEach((blog, index) => {
    if (index === 0)
      fav = index
    if (blog.likes > max) {
      fav = index
      max = blog.likes
    }
  })

  return {
    title: blogs[fav].title,
    author: blogs[fav].author,
    likes: max
  }
}

const mostBlogs = blogs => {
  const authors = []

  if (blogs.length === 0)
    return 'There are no blogs currently'

  while (blogs.length !== 0) {
    const currLength = blogs.length
    let currAuthor = blogs[0].author
    blogs = blogs.filter(blog => blog.author !== currAuthor)
    authors.push({
      author: currAuthor,
      blogs: currLength - blogs.length,
    })
  }

  authors.sort((a, b) => {
    if (a.blogs > b.blogs) return -1
    if (a.blogs < b.blogs) return 1

    return 0
  })

  return authors[0]
}

const mostLikes = blogs => {
  const authors = []

  if (blogs.length === 0)
    return 'There are no blogs currently'

  blogs.map(blog => {
    const currentAuthor = authors.filter(author => author.author === blog.author)
    if (currentAuthor.length === 0) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    } else {
      currentAuthor[0].likes += blog.likes
    }
  })

  authors.sort((a, b) => {
    if ( a.likes > b.likes) return -1
    if ( a.likes < b.likes) return 1
  })

  return authors[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
