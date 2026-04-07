# Bloglist Frontend (React Query + Context)

Alternative bloglist frontend for Part 7 that uses React Query for server state and Context for user and notification state.

## Stack

- React
- Vite
- Axios
- TanStack Query
- Context API
- Vitest
- Testing Library
- ESLint

## Features

- login and logout with persisted session
- fetches blogs through React Query
- create, like, and delete blogs
- keeps notifications in a dedicated context
- sorts blogs by likes before rendering

## Run Locally

```bash
cd part7/bloglist-frontend-react-query-context
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
- This frontend is intended to run against the Part 4 bloglist backend.
