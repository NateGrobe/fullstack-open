import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createAnecdote = async content => {
  const obj = {
    content,
    id: getId(),
    likes: 0
  }

  const res = await axios.post(baseUrl, obj)
  return res.data
}

const vote = async (id, obj) => {
  const newObj = {
    ...obj,
    votes: obj.votes + 1
  }

  const res = await axios.put(`${baseUrl}/${id}`, newObj)
  return res.data
}

export default { getAll, createAnecdote, vote }
