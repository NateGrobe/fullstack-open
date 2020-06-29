import blogService from '../services/blogs'
import userService from '../services/user'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user

    case 'UPDATE':
      return { ...state, blogs: action.userBlogs }

    case 'CLEAR_USER':
      return null

    default:
      return state
  }
}

export const setUser = user => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

export const updateUserBlogs = userId => {
  return async dispatch => {
    const userBlogs = await userService.getUserBlogs(userId)
    dispatch({
      type: 'UPDATE',
      userBlogs
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_USER'
    })
  }
}

export default userReducer
