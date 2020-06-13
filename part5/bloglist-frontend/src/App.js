import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import ErrorNoti from './components/ErrorNoti'
import SuccNoti from './components/SuccNoti'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succMessage, setSuccMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => { return b.likes - a.likes }))
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
      setSuccMessage('Welcome!')
      setTimeout(() => {
        setSuccMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = blogObj => {

    blogFormRef.current.toggleVisiblity()
    blogService
      .createBlog(blogObj)
      .then(nb => {
        setBlogs(blogs.concat(nb))
        setSuccMessage(
          `a new blog ${nb.title} by ${nb.author} added`
        )
        setTimeout(() => {
          setSuccMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('failed to add blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        console.log(error.message)
      })
  }

  const removeBlog = (id, title) => {
    window.confirm(`Remove ${title}`)
    blogService
      .deleteBlog(id, user.id)
      .then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Add Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }


  return (
    <div>
      <ErrorNoti message={errorMessage} />
      <SuccNoti message={succMessage} />
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
            <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
          )}
        </div>}
    </div>
  )
}

export default App
