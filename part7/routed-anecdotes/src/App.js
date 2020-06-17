import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
}
from 'react-router-dom'

import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = { paddingRight: 5 }

  const match = useRouteMatch('/anec/:id')

  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  const createNotification = content => {
    setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <div>

      <div>
        <h1>Software anecdotes</h1>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </div>

      {notification}

      <Switch>
        <Route path='/create'>
          <CreateNew addNew={addNew} createNotification={createNotification} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/anec/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <br />
      <div>
        <Footer />
      </div>

    </div>
  )
}

export default App
