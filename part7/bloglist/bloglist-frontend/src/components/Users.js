import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = (props) => {
  useEffect(() => {
    props.initUsers()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
