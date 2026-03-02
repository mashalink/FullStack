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
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    })

    notify(`a new anecdote "${content.inputProps.value}" created!`)
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content:
        <input {...content.inputProps} />
        <br/>
        author:
        <input {...author.inputProps} />
        <br/>
        url for more info:
        <input {...info.inputProps} />
        <br/>
        <button type="submit">create</button>
        <button type="button" onClick={() => {
          content.reset()
          author.reset()
          info.reset()
        }}>
          reset
        </button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default CreateNew