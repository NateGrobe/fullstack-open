import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_USER, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
  const userResult = useQuery(GET_USER)
  const booksResult = useQuery(ALL_BOOKS)

  if(!props.show || !userResult.data || !booksResult.data) return null

  const books = booksResult.data.allBooks
  const user = userResult.data.me
  
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
          {books.filter(b => b.genres.includes(user.favouriteGenre)).map(book =>
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
