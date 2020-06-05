import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .createBlog(newBlog)
      .then(nb => {
        setBlogs(blogs.concat(nb))
      })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              type='text' 
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              type='password' 
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {user === null && loginForm()}

      {user !== null &&
        <div>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={() => window.localStorage.removeItem('loggedUser')}>logout</button>
          <br />
          <br />
          <h3>create new</h3>
          {blogForm()}
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
