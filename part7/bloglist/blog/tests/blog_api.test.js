const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjVlZDdlY2Q2OGZmNjA4Nzg0NzQ5ZWVmZiIsImlhdCI6MTU5MTIwOTcxMn0.BPfi5a2oG87wgUsRuc7sxS1HPJiftW4A0Bp2-bdTXLI'

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

let token

// add test entries to db
beforeEach(async (done) => {
  await Blog.deleteMany({})
  
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }


  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('test', 10)

  const user = new User({
    username: 'test',
    passwordHash,
  })

  await user.save()

  api
    .post('/api/login')
    .send({ username: 'test', password: 'test' })
    .end((error, res) => {
      token = res.body.token
      done()
    })
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithNoUrl)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithNoTitle)
      .expect(400)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(initialBlogs.length)
  }) 

  test('if token is invalid fail and return 401', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Nate',
      url: 'http://blog.testblog.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

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
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const remainingBlogs = await api.get('/api/blogs')

    expect(remainingBlogs.body).toHaveLength(initialBlogs.length -1)

    const contents = remainingBlogs.body.map(r => r.title)
    
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('modifying blog data', () => {
  test('update the info in the blog post', async () => {
    const res = await api.get('/api/blogs')
    const blogToChange = res.body[0]

    const changedBlog = {
      title: blogToChange.title,
      author: blogToChange.author,
      url: blogToChange.url,
      likes: 100,
    }

    await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(changedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterChanges = await api.get('/api/blogs')
    const modifiedBlog = blogsAfterChanges.body[0]
    expect(blogsAfterChanges.body).toHaveLength(initialBlogs.length)
    expect(modifiedBlog.likes).toEqual(100)
  })
})

describe('adding user data', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('hello', 10)
    const user = new User ({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()
  })

  test('with a non-unique username will fail', async () => {
    const usersBefore = await api.get('/api/users')

    const badUser = {
      username: 'root',
      name: 'user',
      password: 'hello'
    }

    const result = await api
      .post('/api/users')
      .send(badUser)
      .expect(400)

    const usersAfter = await api.get('/api/users')
    expect(usersAfter.body).toHaveLength(usersBefore.body.length)
    expect(result.body.error).toContain('`username` to be unique')
  })

  test('with a 2 character or less username will fail', async () => {
    const usersBefore = await api.get('/api/users')

    const badUser = {
      username: 'ro',
      name: 'user',
      password: 'hello'
    }

    const result = await api
      .post('/api/users')
      .send(badUser)
      .expect(400)

    const usersAfter = await api.get('/api/users')
    expect(usersAfter.body).toHaveLength(usersBefore.body.length)
    expect(result.body.error).toContain('`username` (`ro`) is shorter than the minimum allowed length (3)')
  })

  test('with a password shorter than 3 characters will fail', async () => {
    const usersBefore = await api.get('/api/users')

    const badUser = {
      username: 'Nate',
      name: 'Nate Grobe',
      password: 'iv'
    }

    const result = await api
      .post('/api/users')
      .send(badUser)
      .expect(400)

    const usersAfter = await api.get('/api/users')
    expect(usersAfter.body).toHaveLength(usersBefore.body.length)
    expect(result.body.error).toContain('password must be at least 3 characters')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
