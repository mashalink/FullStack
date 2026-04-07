# Bloglist Frontend

React frontend for the bloglist application from Full Stack Open Part 5.

## Stack

- React
- Vite
- Axios
- Vitest
- Testing Library
- ESLint

## Features

- login and logout with persisted session
- create, like, and delete blogs
- sort blogs by likes
- show notifications for user actions and errors
- component and integration tests for core UI behavior

## Run Locally

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run test` - run Vitest test suites
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- The Vite dev server proxies `/api` requests to `http://localhost:3003`.
- For automated tests, the backend should run in test mode so `/api/testing/reset` is available.
- The logged-in user is stored in `localStorage` under `loggedBlogappUser`.
