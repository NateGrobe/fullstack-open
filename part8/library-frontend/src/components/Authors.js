import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [editAuthorBirth] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show || !result.data) return null

  const authors = result.data.allAuthors

  const modAuthor = event => {
    event.preventDefault()

    editAuthorBirth({
      variables: {
        name: name.value,
        setBornTo: Number(born)
      }
    })

    setName(null)
    setBorn('')
  }

  const options = authors.map(a => {
    return { label: a.name, value: a.name }
  })

  const setSelectedAuthor = value => { setName(value) }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      {props.token &&
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={modAuthor}>
          <div>
            <Select 
              value={name}
              onChange={setSelectedAuthor}
              options={options}
            />
          </div>
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
      }
    </div>
  )
}

export default Authors
