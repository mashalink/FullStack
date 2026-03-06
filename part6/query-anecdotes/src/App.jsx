import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './contexts/NotificationContext'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const {
    data: anecdotes,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  const voteMutation = useMutation({
    mutationFn: ({ id, votes }) => updateAnecdote(id, votes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (err) => {
      setNotification('Voting failed', 5)
    },
  })

  if (isPending) return <div>Loading...</div>
  if (isError)
    return <div>anecdote service not available due to problems in server</div>

  const handleVote = (anecdote) => {
    voteMutation.mutate({ id: anecdote.id, votes: anecdote.votes + 1 })
    setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
