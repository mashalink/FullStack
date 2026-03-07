import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import blogsReducer from '../reducers/blogsReducer'
import userReducer from '../reducers/userReducer'
import Blog from './Blog'

const mockLikeBlog = vi.fn()
const mockDeleteBlog = vi.fn()
const mockCommentBlog = vi.fn()

vi.mock('../hooks/useBlogs', () => ({
  useBlogs: () => ({
    likeBlog: mockLikeBlog,
    deleteBlog: mockDeleteBlog,
    commentBlog: mockCommentBlog,
  }),
}))

const renderWithProviders = (blog, currentUser) => {
  const store = configureStore({
    reducer: {
      blogs: blogsReducer,
      user: userReducer,
    },
    preloadedState: {
      blogs: [blog],
      user: currentUser,
    },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/blogs/${blog.id}`]}>
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe('Blog component', () => {
  beforeEach(() => {
    mockLikeBlog.mockReset()
    mockDeleteBlog.mockReset()
    mockCommentBlog.mockReset()
  })

  test('5.13 renders blog title and likes', () => {
    const blog = {
      id: '1',
      title: 'Testing blog',
      author: 'Bulka',
      url: 'https://example.com',
      likes: 10,
      user: { name: 'Creator' },
    }

    renderWithProviders(blog, { username: 'visitor' })

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Testing blog')
    expect(screen.getByText(/10 likes/i)).toBeInTheDocument()
  })

  test('5.14 calls like handler when like button is clicked', async () => {
    const user = userEvent.setup()
    const blog = {
      id: '2',
      title: 'Testing blog',
      author: 'Bulka',
      url: 'https://example.com',
      likes: 10,
      user: { name: 'Creator' },
    }

    renderWithProviders(blog, { username: 'visitor' })

    const likeButton = screen.getAllByRole('button', { name: /like/i })[0]
    await user.click(likeButton)

    expect(mockLikeBlog).toHaveBeenCalledTimes(1)
  })

  test('5.15 calls like handler twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const blog = {
      id: '3',
      title: 'Testing blog',
      author: 'Bulka',
      url: 'https://example.com',
      likes: 10,
      user: { name: 'Creator' },
    }

    renderWithProviders(blog, { username: 'visitor' })

    const likeButton = screen.getAllByRole('button', { name: /like/i })[0]
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeBlog).toHaveBeenCalledTimes(2)
  })
})
