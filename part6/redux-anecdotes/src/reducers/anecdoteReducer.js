const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const sortByVotesDesc = (anecdotes) =>
  [...anecdotes].sort((a, b) => b.votes - a.votes)

const initialState = sortByVotesDesc(anecdotesAtStart.map(asObject))

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.data.id
      const updated = state.map(a =>
        a.id !== id ? a : { ...a, votes: a.votes + 1 }
      )
      return sortByVotesDesc(updated)
    }

    case 'CREATE': {
      const newAnecdote = asObject(action.data.content)
      return sortByVotesDesc(state.concat(newAnecdote))
    }

    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: { content }
  }
}

export default anecdoteReducer
