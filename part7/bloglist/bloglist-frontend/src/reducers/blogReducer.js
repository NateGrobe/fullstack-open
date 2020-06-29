import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT':
      return action.content.sort((a, b) => b.likes - a.likes)

    case 'CREATE_BLOG':
      return [...state, action.newBlog]

    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.id)

    case 'LIKE': {
      const votedBlog = action.votedBlog
      const id = votedBlog.id
      const blogs = state.map(blog => blog.id === id ? votedBlog : blog)
      return blogs.sort((a, b) => b.likes - a.likes)
    }

    case 'ADD_COMMENT': {
      const commentedBlog = action.commentedBlog
      const id = commentedBlog.id
      const blogs = state.map(blog => blog.id === id ? commentedBlog : blog)
      return blogs.sort((a, b) => b.likes - a.likes)
    }

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const content = await blogService.getAll()
    dispatch({
      type: 'INIT',
      content
    })
  }
}

export const createBlog = obj => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(obj)
    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

export const likeBlog = (id, obj) => {
  return async dispatch => {
    const votedBlog = await blogService.updateLikes(id, obj)
    dispatch({
      type: 'LIKE',
      votedBlog
    })
  }
}

export const commentOnBlog = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      commentedBlog
    })
  }
}

export default blogReducer
