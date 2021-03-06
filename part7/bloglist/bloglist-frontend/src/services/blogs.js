import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async obj => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, obj, config)
  return res.data
}

const updateLikes = async (id, obj) => {
  const res = await axios.put(`${baseUrl}/${id}`, obj)
  return res.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  return await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, comment) => {
  const commentObj = { comment: comment }
  const res = await axios.post(`${baseUrl}/${id}/comments`, commentObj)
  return res.data
}

export default {
  getAll,
  setToken,
  createBlog,
  updateLikes,
  deleteBlog,
  addComment
}
