import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  test('5.16 calls createBlog with correct details when submitted', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const submitButton = screen.getByText('create')

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
