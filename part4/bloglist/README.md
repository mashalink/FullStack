# Part 4 — Bloglist Backend

Express + MongoDB backend for managing blogs and users (Full Stack Open, Part 4). Includes CRUD endpoints, validation, and unit/integration tests with `node:test` and SuperTest.

## Stack
- Node.js + Express
- MongoDB + Mongoose
- dotenv for environment variables
- bcrypt for password hashing
- node:test + SuperTest for testing

## Project structure
```
app.js
index.js
controllers/
  blogs.js
  users.js
models/
  blog.js
  user.js
utils/
  config.js
  logger.js
  middleware.js
  list_helper.js
tests/
  blog_api.test.js
  user_api.test.js
  dummy.test.js
  favorite_blog.test.js
  most_blogs.test.js
  most_likes.test.js
  total_likes.test.js
```

## Getting started
```bash
npm install
```

Create `.env` in the project root:
```ini
MONGODB_URI=your_mongo_url
PORT=3003
```

Run the dev server:
```bash
npm run dev
```

## API overview
- `GET /api/blogs` — list all blogs
- `POST /api/blogs` — create a blog; `likes` defaults to `0` when omitted
- `PUT /api/blogs/:id` — update an existing blog (e.g., likes)
- `DELETE /api/blogs/:id` — remove a blog
- `GET /api/users` — list users (sensitive fields omitted)
- `POST /api/users` — create a user with validation (unique `username`, min length 3; passwords hashed with bcrypt)

Sample blog payload:
```json
{
  "title": "First test blog",
  "author": "Bulka",
  "url": "https://example.com/blog-1",
  "likes": 5
}
```

## Testing
- Unit tests for helper functions (`utils/list_helper.js`)
- Integration tests for blog and user APIs (SuperTest)

Run all tests:
```bash
npm test
```

Run a specific suite:
```bash
npm test -- tests/blog_api.test.js
npm test -- tests/user_api.test.js
```


