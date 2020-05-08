import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const remove = id => {
    axios.delete(`${baseUrl}/${id}`)
}

const changeNumber = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

export default {getAll, create, remove, changeNumber}