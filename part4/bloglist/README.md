# Part 4 — Bloglist Backend

Express + MongoDB service for managing blogs and users (Full Stack Open, Part 4). Supports JWT-based authentication, ownership-aware deletes, validation, and `node:test` + SuperTest coverage.

## Tech
- Node.js + Express + cors
- MongoDB + Mongoose
- dotenv for env loading
- bcrypt for password hashing, jsonwebtoken for auth
- node:test + SuperTest for tests, ESLint for linting

## Setup
1) Install deps:
```bash
npm install
```
2) Add `.env`:
```ini
PORT=3003
MONGODB_URI=mongodb://localhost:27017/bloglist
TEST_MONGODB_URI=mongodb://localhost:27017/bloglist-test
SECRET=dev-secret
```
3) Run:
```bash
npm run dev   # watch mode
npm start     # production mode
```

## Scripts
- `npm run dev` — development server with NODE_ENV=development
- `npm start` — production server
- `npm test` — run all tests (`--test-concurrency=1`)
- `npm run lint` — ESLint over the repo

## API quickstart
All blog mutations require a Bearer token from `/api/login`.

1) Create user:
```bash
curl -X POST http://localhost:3003/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","name":"Alice","password":"secret"}'
```
2) Log in to get a token:
```bash
TOKEN=$(curl -s -X POST http://localhost:3003/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret"}' | jq -r .token)
```
3) Create a blog (likes default to 0):
```bash
curl -X POST http://localhost:3003/api/blogs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"First test blog","author":"Bulka","url":"https://example.com/blog-1"}'
```

## Routes
- `GET /api/blogs` — list blogs (populated `user` info)
- `POST /api/blogs` — create blog, auth required
- `PUT /api/blogs/:id` — update title/author/url/likes
- `DELETE /api/blogs/:id` — delete only if created by the token owner
- `GET /api/users` — list users with their blogs
- `POST /api/users` — create user (username/password min length 3, username unique)
- `POST /api/login` — exchange credentials for JWT

## Project layout
```
app.js
index.js
controllers/ (blogs, users, login)
models/ (blog, user)
utils/ (config, logger, middleware, list_helper)
tests/ (helpers + API suites)
```

## Testing
Uses `TEST_MONGODB_URI` and NODE_ENV=test. Ensure the test DB exists or Mongo can create it.
```bash
npm test
# or a single suite (examples)
npm test -- tests/blog_api.test.js
npm test -- tests/user_api.test.js
npm test -- tests/most_likes.test.js
```
