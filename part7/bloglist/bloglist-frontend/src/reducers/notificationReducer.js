const initialState = {
  successMessage: null,
  errorMessage: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SUCC':
      return { ...state, successMessage: action.message }

    case 'ERROR':
      return { ...state, errorMessage: action.message }

    case 'CLEAR_NOTI':
      return initialState

    default:
      return state
  }
}

let timeoutId

export const setSuccNotification = message => {
  return async dispatch => {
    dispatch({
      type: 'SUCC',
      message
    })

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTI'
      })
    }, 5000)
  }
}

export const setErrorNotification = message => {
  return async dispatch => {
    dispatch({
      type: 'ERROR',
      message
    })

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTI'
      })
    }, 5000)
  }
}

export default notificationReducer
