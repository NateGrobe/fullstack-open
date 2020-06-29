import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'

const Users = (props) => {
  useEffect(() => {
    props.initUsers()
  }, [])

  console.log(props.users)

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
              <td>{user.name}</td>
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
