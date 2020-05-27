const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [ 
  { 
    _id: "5a422a851b54a676234d17f7", 
    title: "React patterns", 
    author: "Michael Chan", 
    url: "https://reactpatterns.com/", 
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: "5a422aa71b54a676234d17f8", 
    title: "Go To Statement Considered Harmful", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
    likes: 5, 
    __v: 0 
  }, 
  { 
    _id: "5a422b3a1b54a676234d17f9", 
    title: "Canonical string reduction", 
    author: "Edsger W. Dijkstra", 
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
    likes: 12, 
    __v: 0 
  }, 
  { 
    _id: "5a422b891b54a676234d17fa", 
    title: "First class tests", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
    likes: 10, 
    __v: 0 
  }, 
  { 
    _id: "5a422ba71b54a676234d17fb", 
    title: "TDD harms architecture", 
    author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: "5a422bc61b54a676234d17fc", 
    title: "Type wars", 
    author: "Robert C. Martin", 
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
    likes: 2, 
    __v: 0 
  }
]

// add test entries to db
beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there initially blogs saved', () => {
  test('all blogs are returned with get', async () => {
    const res = await api.get('/api/blogs')

    expect(res.body).toHaveLength(initialBlogs.length)
  })

  test('verify id exists', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body[0].id).toBeDefined()
  }) 
})

describe('adding blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Nate',
      url: 'http://blog.testblog.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const contents = res.body.map(r => r.title)

    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
      'Test Blog'
    )
  })

  test('if likes missing default to zero', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Nate',
      url: 'http://blog.testblog.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const addedBlog = res.body.filter(r => r.title === 'Test Blog')[0]

    expect(addedBlog.likes).toEqual(0)
  })

  test('title and url are missing', async () => {
    const blogWithNoUrl = {
      title: 'Test Blog',
      author: 'Nate',
      likes: 10,
    }

    const blogWithNoTitle = {
      author: 'Nate',
      url: 'http://blog.testblog.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogWithNoUrl)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  }) 
})

describe('removing blogs', () => {
  test('a blog can be deleted', async () => {
    const res = await api.get('/api/blogs')
    const blogToDelete = res.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const remainingBlogs = await api.get('/api/blogs')

    expect(remainingBlogs.body).toHaveLength(initialBlogs.length -1)

    const contents = remainingBlogs.body.map(r => r.title)
    
    expect(contents).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
