import React, { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const addLike = () => {
    const blogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }

    blogService
      .updateLikes(blog.id, blogObj)
      .then(rb => {
        setLikes(rb.likes)
      })
  }

  const unexpanded = () => {
    return (
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setView(!view)}>view</button>
      </div>
    )
  }

  const expanded = () => {
    return (
      <div>
        <p>{blog.title}<button onClick={() => setView(!view)}>hide</button></p>
        <p>{blog.url}</p>
        <p>{likes}<button onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={() => removeBlog(blog.id, blog.title)}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {view === false && unexpanded()} 
      {view === true && expanded()} 
    </div>
  )
}

export default Blog
