import axios from 'axios'
const baseUrl = '/api/users'

const getUserBlogs = async id => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data.blogs
}

const getAllUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export default { getUserBlogs, getAllUsers }
