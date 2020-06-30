import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'
import { updateComment, clearComment } from '../reducers/commentFormReducer'
import { commentOnBlog } from '../reducers/blogReducer'

import {
  TextField,
  Link,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core'

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
        <TextField
          variant='outlined'
          label='comment'
          type='text'
          value={props.comment}
          onChange={({ target }) => props.updateComment(target.value)}
        />
        <br />
        <Button variant='contained' color='primary' type='submit'>
          add comment
        </Button>
      </form>
    )
  }

  if(!blog) return null

  return (
    <div>
      <br />
      <Typography variant='h5' component='h2'>
        {blog.title}
      </Typography>
      <Link variant='subtitle1' href={`https://${blog.url}`}>
        {blog.url}
      </Link>
      <Typography variant='subtitle1' component='p'>
        {blog.likes} likes
        <Button onClick={addLike} color='primary'>
          like
        </Button>
      </Typography>

      <Typography variant='subtitle1' component='p'>
        added by: {blog.author}
      </Typography>

      <br/>
      <br/>
      <Typography variant='h6' component='p'>
        comments:
      </Typography>

      {commentForm()}
      <br/>
      <br/>
      <List component={Paper}>
        {blog.comments.map((c, i) =>
          <ListItem dense={true} key={i}>
            <ListItemText primary={c} />
          </ListItem>
        )}
      </List>
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
