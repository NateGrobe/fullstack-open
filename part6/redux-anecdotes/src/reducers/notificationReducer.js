const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_MESSAGE': 
      return action.message
    case 'REMOVE_MESSAGE':
      return ''
    default:
      return state
  }
}

let timeoutId
export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message: message
    })

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    }, time*1000)
  }
}

export default notificationReducer
