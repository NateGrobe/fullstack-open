import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import {
  Typography,
  Button,
  makeStyles
} from '@material-ui/core'

const classes = makeStyles(theme => ({
  button: {
    marginLeft: 5
  }
}))

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  return (
    <div id={props.index} style={blogStyle}>
      <div className='unexpanded-div'>
        <Typography component={Link} to={`/blogs/${props.blog.id}`}>
          {props.blog.title} {props.blog.author}
        </Typography>
        <Button
          className={classes.button}
          color='secondary'
          onClick={() => props.removeBlog(props.blog.id, props.blog.title)}
        >
          remove
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
