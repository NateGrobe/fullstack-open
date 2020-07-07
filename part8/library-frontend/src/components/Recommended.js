import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER, ALL_BOOKS_GENRE } from '../queries'

const Recommended = (props) => {
  const [favGenre, setFavGenre] = useState('')
  const userResult = useQuery(GET_USER)
  const booksResult = useQuery(ALL_BOOKS_GENRE, {
    variables:  {
      genre: favGenre
    }
  })

  useEffect(() => {
    if (userResult.data)
      setFavGenre(userResult.data.me.favouriteGenre)
  }, [userResult.data])

  if(!props.show || !userResult.data || !booksResult.data) return null

  const user = userResult.data.me
  const filteredBooks = booksResult.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre 
        <strong> {user.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(book =>
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
