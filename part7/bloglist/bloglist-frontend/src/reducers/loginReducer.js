const initialState = {
  username: '',
  password: ''
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.username }

    case 'UPDATE_PASS':
      return { ...state, password: action.pass }

    case 'CLEAR_LOGIN':
      return initialState

    default:
      return state
  }
}

export const updateUsername = username => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_USERNAME',
      username
    })
  }
}

export const updatePassword = pass => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_PASS',
      pass
    })
  }
}

export const clearLoginData = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_LOGIN'
    })
  }
}

export default loginReducer
