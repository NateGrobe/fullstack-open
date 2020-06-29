import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const User = (props) => {
  const id = useParams().id
  const user = props.users.find(user => user.id === id)

  if(!user) return null

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(User)
