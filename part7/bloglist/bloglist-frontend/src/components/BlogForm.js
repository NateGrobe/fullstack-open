import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateTitle,
  updateAuthor,
  updateUrl,
  clearBlogForm
} from '../reducers/blogFormReducer'

import {
  TextField,
  Button,
  makeStyles
} from '@material-ui/core'

import { setSuccNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const { title, author, url } = props.blogForm

  const addBlog = event => {
    event.preventDefault()
    props.addBlog({
      title: title,
      author: author,
      url: url
    })
    props.clearBlogForm()
    props.setSuccNotification( `a new blog ${title} by ${author} added`)
  }

  const classes = useStyles()

  return (
    <div>
      <form onSubmit={addBlog}>
        <TextField
          className={classes.inputs}
          variant='outlined'
          type='text'
          value={title}
          label='Title'
          onChange={({ target }) => props.updateTitle(target.value)}
        />
        <TextField
          className={classes.inputs}
          variant='outlined'
          type='text'
          value={author}
          label='Author'
          onChange={({ target }) => props.updateAuthor(target.value)}
        />
        <TextField
          className={classes.inputs}
          variant='outlined'
          type='text'
          value={url}
          label='URL'
          onChange={({ target }) => props.updateUrl(target.value)}
        />
        <div>
          <Button color='primary' type='submit'>create</Button>
        </div>
      </form>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  inputs: {
    marginRight: theme.spacing(1)
  }
}))

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    blogForm: state.blogForm
  }
}

const mapDispatchToProps = {
  updateTitle,
  updateAuthor,
  updateUrl,
  clearBlogForm,
  setSuccNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)
