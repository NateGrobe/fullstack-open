import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// reducers
import {
  initializeBlogs,
  createBlog,
  removeBlog
} from './reducers/blogReducer'
import { setUser, updateUserBlogs, clearUser } from './reducers/userReducer'
import {
  updateUsername,
  updatePassword,
  clearLoginData
} from './reducers/loginReducer'
import {
  setSuccNotification,
  setErrorNotification,
} from './reducers/notificationReducer'

import Blog from './components/Blog'
import ErrorNoti from './components/ErrorNoti'
import SuccNoti from './components/SuccNoti'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import loginService from './services/login'

const App = (props) => {
  const { username, password } = props.login
  const { successMessage, errorMessage } = props.notification

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      props.updateUserBlogs(user.id)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      props.setUser(user)
      props.clearLoginData()
      props.setSuccNotification('Welcome!')
    } catch (exception) {
      props.setErrorNotification('wrong username or password')
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    props.clearUser()
  }

  const addBlog = async blogObj => {
    blogFormRef.current.toggleVisiblity()
    await props.createBlog(blogObj)
    props.updateUserBlogs(props.user.id)
  }

  const removeBlog = async (id, title) => {
    if (window.confirm(`Remove ${title}`)) {
      await props.removeBlog(id, props.user.id)

      const validBlog = props.user.blogs.find(blogId => 
        blogId === id
      )

      if(validBlog) {
        props.updateUserBlogs(props.user.id)
        props.setSuccNotification(`${title} has been removed`)
      }
      else
        props.setErrorNotification('Only a blogs author can remove it')
    }
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
              onChange={({ target }) => props.updateUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => props.updatePassword(target.value)}
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
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }


  return (
    <div>
      <ErrorNoti message={errorMessage} />
      <SuccNoti message={successMessage} />
      {props.user === null && loginForm()}

      {props.user !== null &&
        <div>
          <h2>blogs</h2>
          {props.user.name} logged in
          <button onClick={handleLogout}>
            logout
          </button>
          <br />
          <br />
          <h3>create new</h3>
          {blogForm()}
          <div>
            {props.blogs.map((blog, index) =>
              <Blog
                key={blog.id}
                blog={blog}
                removeBlog={removeBlog}
                index={index}
              />
            )}
          </div>
        </div>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.user,
    login: state.login,
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  createBlog,
  removeBlog,
  setUser,
  updateUserBlogs,
  clearUser,
  updateUsername,
  updatePassword,
  clearLoginData,
  setSuccNotification,
  setErrorNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
