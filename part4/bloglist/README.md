# Bloglist Backend

Express and MongoDB backend for the Full Stack Open bloglist application.

## Stack

- Node.js
- Express
- MongoDB and Mongoose
- JWT authentication
- bcrypt
- `node:test` and SuperTest
- ESLint

## Features

- user creation and login
- authenticated blog creation
- blog updates and owner-only deletion
- populated user data in blog responses
- test-only reset route for clean automated runs
- seed scripts for development and production databases

## Run Locally

Install dependencies:

```bash
cd part4/bloglist
npm install
```

Create `.env`:

```ini
PORT=3003
MONGODB_URI=mongodb://localhost:27017/bloglist
DEV_MONGODB_URI=mongodb://localhost:27017/bloglist-dev
TEST_MONGODB_URI=mongodb://localhost:27017/bloglist-test
SECRET=dev-secret
```

Start the service:

```bash
npm run dev
```

Alternative modes:

```bash
npm start
npm run start:test
```

## Scripts

- `npm run dev` - start the API in development mode with `node --watch`
- `npm start` - start the API in production mode
- `npm run start:test` - start the API in test mode
- `npm test` - run the backend test suites
- `npm run lint` - run ESLint
- `npm run seed:dev` - seed the development database
- `npm run seed:prod` - seed the production database
- `npm run build` - build and copy the Part 7 Redux frontend into `dist`

## Routes

- `GET /api/blogs` - list blogs with populated user info
- `POST /api/blogs` - create a blog, requires authentication
- `PUT /api/blogs/:id` - update blog fields such as title, author, url, or likes
- `DELETE /api/blogs/:id` - delete a blog if it belongs to the authenticated user
- `GET /api/users` - list users and their blogs
- `POST /api/users` - create a user
- `POST /api/login` - exchange credentials for a JWT
- `POST /api/testing/reset` - clear blogs and users in test mode only

## Notes

- Tests use `TEST_MONGODB_URI` with `NODE_ENV=test`.
- Parts 5 and 7 expect this backend to be available at `http://localhost:3003`.
- `npm run build` uses `part7/bloglist-frontend-redux` as the UI source for the served production bundle.
