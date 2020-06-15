import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT': {
      return action.data
    }
    case 'VOTE': {
      const id = action.data.id
      const aToChange = state.find(item => item.id === id)

      const votedA = {
        ...aToChange,
        votes: aToChange.votes + 1
      }

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
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const addVote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    content
  }
}

export default anecdoteReducer
