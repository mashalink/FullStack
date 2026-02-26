import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { showNotification } from './reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      try {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
      } catch (err) {
        console.error(err)
        dispatch(showNotification('Failed to fetch anecdotes', 5))
      }
    }

    fetchAnecdotes()
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App