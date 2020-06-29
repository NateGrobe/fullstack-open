import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  const [view, setView] = useState(false)

  const addLike = () => {
    const blogObj = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes + 1,
    }

    props.likeBlog(props.blog.id, blogObj)
  }

  const unexpanded = () => {
    return (
      <div className='unexpanded-div'>
        {props.blog.title} {props.blog.author}
        <button onClick={() => setView(!view)}>view</button>
      </div>
    )
  }

  const expanded = () => {
    return (
      <div className='expanded-div'>
        <p>
          {props.blog.title}
          <button onClick={() => setView(!view)}>hide</button>
        </p>
        <p>{props.blog.url}</p>
        <p className='likes'>
          {props.blog.likes}
          <button onClick={props.testLikes ? props.testLikes : addLike}>
            like
          </button>
        </p>
        <p>{props.blog.author}</p>
        <button
          onClick={() => props.removeBlog(props.blog.id, props.blog.title)}
        >
          remove
        </button>
      </div>
    )
  }

  return (
    <div id={props.index} style={blogStyle}>
      {view === false && unexpanded()}
      {view === true && expanded()}
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
