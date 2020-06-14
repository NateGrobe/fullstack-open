const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_FILTER':
      return action.data
    default:
      return state
  }
}

export const changeFilter = data => {
  return {
    type: 'CHANGE_FILTER',
    data
  }
}

export default filterReducer
