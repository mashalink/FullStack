import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {

      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      anecdote.votes++

      state.sort((a, b) => b.votes - a.votes)
    },

    createAnecdote(state, action) {
      const content = action.payload
      state.push(asObject(content))
      state.sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      return action.payload.slice().sort((a, b) => b.votes - a.votes) 
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer