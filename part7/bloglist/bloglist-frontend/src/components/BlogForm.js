import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  updateTitle,
  updateAuthor,
  updateUrl,
  clearBlogForm
} from '../reducers/blogFormReducer'

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

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => props.updateTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => props.updateAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='URL'
            onChange={({ target }) => props.updateUrl(target.value)}
          />
        </div>
        <button id='create-button' type='submit'>create</button>
      </form>
    </div>
  )
}

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
