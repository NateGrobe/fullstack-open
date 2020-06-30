import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'

const User = (props) => {
  const id = useParams().id
  const user = props.users.find(user => user.id === id)

  if(!user) return null

  return (
    <div>
      <br/>
      <Typography variant='h5' component='h4'>
        {user.name}
      </Typography>

      <br />
      <br />
      <Typography variant='h6' component='h6'>
        Added Blogs:
      </Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem dense={true} key={blog.id}>
            <ListItemText primary={blog.title} />
          </ListItem>
        )}
      </List>
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
