const initialState = {
  title: '',
  author: '',
  url: ''
}

const blogFormReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'TITLE':
      return { ...state, title: action.title }
    case 'AUTHOR':
      return { ...state, author: action.author }
    case 'URL':
      return { ...state, url: action.url }
    case 'CLEAR_BLOG':
      return initialState
    default:
      return state
  }
}

export const updateTitle = title => {
  return async dispatch => {
    dispatch({
      type: 'TITLE',
      title
    })
  }
}

export const updateAuthor = author => {
  return async dispatch => {
    dispatch({
      type: 'AUTHOR',
      author
    })
  }
}

export const updateUrl = url => {
  return async dispatch => {
    dispatch({
      type: 'URL',
      url
    })
  }
}

export const clearBlogForm = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_BLOG'
    })
  }
}

export default blogFormReducer
