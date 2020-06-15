import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT': 
      return action.data.sort((a, b) => b.votes - a.votes)
    
    case 'VOTE': {
      const votedA = action.data
      const id = votedA.id
      const anecdotes = state.map(anec => anec.id === id ? votedA : anec)
      return anecdotes.sort((a, b) => b.votes - a.votes)
    }

    case 'NEW_ANECDOTE':{
      return [ ...state, action.content ]
    }

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const addVote = (id, content) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id, content)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      content: newAnecdote
    })
  }
}

export default anecdoteReducer
