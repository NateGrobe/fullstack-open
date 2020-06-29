import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { updateComment, clearComment } from '../reducers/commentFormReducer'
import { commentOnBlog } from '../reducers/blogReducer'

const BlogView = (props) => {
  const id = useParams().id
  const blog = props.blogs.find(blog => blog.id === id)

  const addLike = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    props.likeBlog(id, blogObj)
  }

  const addComment = event => {
    event.preventDefault()
    props.commentOnBlog(id, props.comment)
    props.clearComment()
  }

  const commentForm = () => {
    return (
      <form onSubmit={addComment}>
        <input
          type='text'
          value={props.comment}
          onChange={({ target }) => props.updateComment(target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
    )
  }

  if(!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={addLike}>like</button></p>
      <p>added by {blog.author}</p>

      <h3>comments:</h3>
      {commentForm()}
      <ul>
        {blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    comment: state.comment
  }
}

const mapDispatchToProps = {
  likeBlog,
  updateComment,
  clearComment,
  commentOnBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)
