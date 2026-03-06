import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`New anecdote '${created.content}'`, 5)
    },
    onError: (error) => {
      setNotification(error.message, 5)
    },
  })

  const addAnecdote = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
