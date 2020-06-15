import React from 'react'
import { connect } from 'react-redux'

import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = id => {
    const anec = props.anecdotes.find(a => a.id === id)
    props.addVote(id, anec)
    props.setNotification(`you voted '${anec.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }

  const filteredAnecdotes = state.anecdotes.filter(a =>
    a.content.toLowerCase().includes(state.filter.toLowerCase()))

  return {
    anecdotes: filteredAnecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
