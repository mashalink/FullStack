# Part 4 — Bloglist Backend

Express + MongoDB service for managing blogs and users (Full Stack Open, Part 4). Supports JWT-based authentication, ownership-aware deletes, validation, and `node:test` + SuperTest coverage.

> Tested with Node 20+. `node --watch` is used in dev scripts.

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
MONGODB_URI=mongodb://localhost:27017/bloglist           # production
DEV_MONGODB_URI=mongodb://localhost:27017/bloglist-dev    # used by `npm run dev`
TEST_MONGODB_URI=mongodb://localhost:27017/bloglist-test
SECRET=dev-secret
```
Optionally add `.env.test` with `TEST_MONGODB_URI` if you keep prod/dev/test separate.
3) Run:
```bash
npm run dev   # watch mode
npm start     # production mode
npm run start:test # start server with NODE_ENV=test (for E2E)
```

## Scripts
- `npm run dev` — development server with NODE_ENV=development
- `npm start` — production server
- `npm run start:test` — start API in test mode (mounts `/api/testing` helpers)
- `npm test` — run all tests (`--test-concurrency=1`)
- `npm run lint` — ESLint over the repo
- `npm run seed:dev` — seed development database
- `npm run seed:prod` — seed production database

### Seeding
Both seed scripts respect the current `NODE_ENV`/URI pair:
```bash
# seed dev DB
NODE_ENV=development npm run seed:dev

# seed prod DB (be careful!)
NODE_ENV=production npm run seed:prod
```

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
- `POST /api/testing/reset` — **test env only**; clears blogs and users for clean runs

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
Tests run serially via `--test-concurrency=1` to avoid shared DB race conditions.
