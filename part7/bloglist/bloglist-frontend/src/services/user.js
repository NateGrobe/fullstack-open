import axios from 'axios'
const baseUrl = '/api/users'

const getUserBlogs = async id => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data.blogs
}

export default { getUserBlogs }
