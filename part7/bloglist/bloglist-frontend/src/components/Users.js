import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper
} from '@material-ui/core'

const Users = (props) => {
  useEffect(() => {
    props.initUsers()
  }, [])

  return (
    <div>
      <br />
      <Typography variant='h5' component='h2'>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.users.map(user =>
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
