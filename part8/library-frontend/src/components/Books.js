import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    if(result.data)
      setFilteredBooks(result.data.allBooks)
  }, [result.data])

  if (!props.show || !result.data) return null

  const books = result.data.allBooks

  const filterGenre = genre => {
    if(genre !== '')
      setFilteredBooks(books.filter(b => b.genres.includes(genre)))
    else
      setFilteredBooks(result.data.allBooks)
  }

  const genreButtons = () => {
    const genreArr = []
    books.forEach(book => {
      book.genres.forEach(g => {
        genreArr.push(g)
      })
    })
    const genres = [...new Set(genreArr)]

    return (
      <div>
        {genres.map(g => 
          <button key={g} onClick={() => filterGenre(g)}>
            {g}
          </button>
        )}
        <button onClick={() => filterGenre('')}>all genres</button>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

export default Books
