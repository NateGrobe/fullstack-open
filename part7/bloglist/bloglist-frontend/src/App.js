import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Switch, Route, useHistory } from 'react-router-dom'

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
import {
  Container,
  Toolbar,
  AppBar,
  Button,
  Avatar,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


import Blog from './components/Blog'
import ErrorNoti from './components/ErrorNoti'
import SuccNoti from './components/SuccNoti'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

import loginService from './services/login'

const App = (props) => {
  const { username, password } = props.login
  const { successMessage, errorMessage } = props.notification

  const history = useHistory()

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
    history.push('/')
  }

  const addBlog = async blogObj => {
    blogFormRef.current.toggleVisiblity()
    await props.createBlog(blogObj)
    props.updateUserBlogs(props.user.id)
  }

  const removeBlog = async (id, title) => {
    if (window.confirm(`Remove ${title}`)) {
      if(props.user.blogs.length === 0)
        props.setErrorNotification('Only a blogs author can remove it')

      const validBlog = props.user.blogs.find(blogId =>
        blogId === id
      )

      if(validBlog) {
        await props.removeBlog(id, props.user.id)
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
        <Typography variant='h4' component='h2'>
          Sign In!
        </Typography>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              type='text'
              value={username}
              label='Username'
              onChange={({ target }) => props.updateUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              type='password'
              value={password}
              label='Password'
              onChange={({ target }) => props.updatePassword(target.value)}
            />
          </div>
          <br/>
          <Button type='submit' color='primary' variant='contained'>login</Button>
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

  const classes = useStyles()

  return (
    <Container>
      {props.user &&
        <AppBar position='static'>
          <Toolbar>
            <div  className={classes.navItem}>
              <Button color='inherit' component={Link} to='/'>
                Blogs
              </Button>
              <Button color='inherit'  component={Link} to='/users'>
                Users
              </Button>
            </div>
            <Button color='inherit' onClick={handleLogout}>Logout</Button>
            <Avatar className={classes.avatar}>{props.user.name.charAt(0)}</Avatar>
          </Toolbar>
        </AppBar>
      }

      <ErrorNoti message={errorMessage} />
      <SuccNoti message={successMessage} />

      {props.user !== null &&
        <div>
          <Typography variant='h5' component='h5'>
            Blog App
          </Typography>
        </div>
      }

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          {props.user === null && loginForm()}

          {props.user !== null &&
              <div>
                <br />
                <Typography variant='h6' component='h5'>
                  Create New!
                </Typography>
                {blogForm()}
                <br/>
                <br/>
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
        </Route>
      </Switch>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  navItem: {
    flexGrow: 1
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}))

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
