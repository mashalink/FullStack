import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

describe('Blog component', () => {
    test('5.13 renders title and author, but not url or likes by default', () => {
        const blog = {
            title: 'Testing blog',
            author: 'Bulka',
            url: 'https://example.com',
            likes: 10,
            user: { name: 'Creator' },
        }

        const { container } = render(
            <Blog blog={blog} onLike={() => {}} />
        )

        // title + author should be visible
        const title = container.querySelector('.blogTitle')
        expect(title).toHaveTextContent('Testing blog')
        expect(title).toHaveTextContent('Bulka')

        // url and likes should not be visible
        const details = container.querySelector('.blogDetails')
        expect(details).toBeNull()
    })
    test('5.14 shows url and likes when view button is clicked',  async () => {
        const user = userEvent.setup()

        const blog = {
            title: 'Testing blog',
            author: 'Bulka',
            url: 'https://example.com',
            likes: 10,
            user: { name: 'Creator' },
        }

        const { container } = render(
            <Blog blog={blog} onLike={() => {}} />
        )

        await user.click(screen.getByText('view'))

        const details = container.querySelector('.blogDetails')
        expect(details).toBeInTheDocument()
        expect(details).toHaveTextContent('https://example.com')
        expect(details).toHaveTextContent('likes 10')
    })
    test('5.15 calls onLike handler twice when like button is clicked twice', async () => {
        const user = userEvent.setup()
        const mockLikeHandler = vi.fn()

        const blog = {
            title: 'Testing blog',
            author: 'Bulka',
            url: 'https://example.com',
            likes: 10,
            user: { name: 'Creator' },
        }

        render(<Blog blog={blog} onLike={mockLikeHandler} />)

        await user.click(screen.getByText('view'))

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockLikeHandler).toHaveBeenCalledTimes(2)
    })
})