const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
      const anecdoteAsObj = asObject(action.data.content)
      return [ ...state, anecdoteAsObj ]
    }

    default:
      return state
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export const addVote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    data: { content }
  }
}

export default anecdoteReducer
