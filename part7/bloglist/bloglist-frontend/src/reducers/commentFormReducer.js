const commentFormReducer = (state = '', action) => {
  switch(action.type) {
    case 'UPDATE_COMMENT':
      return action.comment

    case 'CLEAR_COMMENT':
      return ''

    default:
      return state
  }
}

export const updateComment = comment => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_COMMENT',
      comment
    })
  }
}

export const clearComment = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_COMMENT'
    })
  }
}

export default commentFormReducer
