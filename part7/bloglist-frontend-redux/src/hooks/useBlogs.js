import { useDispatch } from 'react-redux'
import {
  commentBlog as commentBlogAction,
  createBlog,
  deleteBlog as deleteBlogAction,
  likeBlog as likeBlogAction,
} from '../reducers/blogsReducer'
import { showNotification } from '../reducers/notificationReducer'

export const useBlogs = () => {
  const dispatch = useDispatch()

  const notify = (message, type = 'info', seconds = 5) => {
    dispatch(showNotification(message, type, seconds))
  }

  const addBlog = async (blogObject, blogFormRef) => {
    try {
      const created = await dispatch(createBlog(blogObject))

      notify(
        `a new blog "${created.title}" by ${created.author} added`,
        'info',
        5,
      )

      blogFormRef?.current?.toggleVisibility()
    } catch (exception) {
      console.log(exception)
      notify('error creating blog', 'error', 5)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const returned = await dispatch(likeBlogAction(blog))
      notify(`you liked "${returned.title}"`, 'info', 4)
    } catch (exception) {
      console.log(exception)
      notify('failed to like blog', 'error', 5)
    }
  }

  const deleteBlog = async (blog) => {
    const ok = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      await dispatch(deleteBlogAction(blog.id))
      notify(`blog "${blog.title}" removed`, 'info', 4)
    } catch (exception) {
      console.log(exception)
      notify('failed to delete blog', 'error', 5)
    }
  }

  const commentBlog = async (blog, comment) => {
    try {
      const updated = await dispatch(commentBlogAction(blog.id, comment))
      notify('comment added', 'info', 4)
      return updated
    } catch (exception) {
      console.log(exception)
      notify('failed to add comment', 'error', 5)
      throw exception
    }
  }

  return {
    addBlog,
    likeBlog,
    deleteBlog,
    commentBlog,
  }
}
