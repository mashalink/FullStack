import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { describe, expect, test, vi } from 'vitest'
import notificationReducer from '../reducers/notificationReducer'
import BlogForm from './BlogForm'

const renderWithStore = (ui) => {
  const store = configureStore({
    reducer: {
      notification: notificationReducer,
    },
  })

  return render(<Provider store={store}>{ui}</Provider>)
}

describe('BlogForm', () => {
  test('5.16 calls createBlog with correct details when submitted', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    renderWithStore(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)
    const submitButton = screen.getByRole('button', { name: /save/i })

    await user.type(titleInput, 'Testing blog')
    await user.type(authorInput, 'Bulka')
    await user.type(urlInput, 'https://example.com')

    await user.click(submitButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
      title: 'Testing blog',
      author: 'Bulka',
      url: 'https://example.com',
    })
  })
})
