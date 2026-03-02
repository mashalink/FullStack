import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const CreateNew = ({ addNew, notify }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    notify(`a new anecdote "${content.value}" created!`)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content:
        <input {...content} />
        <br/>
        author:
        <input {...author} />
        <br/>
        url for more info:
        <input {...info} />
        <br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default CreateNew