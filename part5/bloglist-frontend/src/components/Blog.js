import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid black',
    marginBottom: 5
  }

  const [view, setView] = useState(false)

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
        <p>{blog.likes}<button>like</button></p>
        <p>{blog.author}</p>
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
