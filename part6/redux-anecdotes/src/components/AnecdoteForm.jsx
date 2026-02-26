import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()
    if (!content) return
    event.target.anecdote.value = ''

    try {
      const returnedAnecdote = await anecdoteService.create(content)
      dispatch(createAnecdote(returnedAnecdote))
      dispatch(showNotification(`You created '${content}'`, 5))
    } catch (error) {
      console.error(error)
      dispatch(showNotification('Failed to create anecdote', 5))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm