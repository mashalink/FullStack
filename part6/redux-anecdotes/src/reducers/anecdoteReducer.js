import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await anecdotesService.getAll()
      dispatch(setAnecdotes(anecdotes))
    } catch (err) {
      console.error('Fetch failed:', err)
    }
  }
}

export const createAnecdoteAsync = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdotesService.create(content)
      dispatch(createAnecdote(newAnecdote))
    } catch (err) {
      console.error('Failed to create anecdote:', err)
    }
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer