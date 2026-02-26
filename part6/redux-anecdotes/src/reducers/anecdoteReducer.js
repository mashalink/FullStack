import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      
      if (anecdote) {
        anecdote.votes++
      }

      state.sort((a, b) => b.votes - a.votes)
    },

    createAnecdote(state, action) {
      state.push(action.payload)
      state.sort((a, b) => b.votes - a.votes)
    },

    setAnecdotes(state, action) {
      return action.payload.slice().sort((a, b) => b.votes - a.votes) 
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer