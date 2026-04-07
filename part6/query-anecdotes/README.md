# Query Anecdotes

Anecdote application built with TanStack Query and a custom local backend.

## Stack

- React
- TanStack Query
- Vite
- custom Node server
- ESLint

## Features

- fetches anecdotes with query caching and retry control
- creates new anecdotes through mutations
- votes on anecdotes and refreshes cached data
- shows notifications for successful actions and failures
- surfaces backend validation errors in the UI

## Run Locally

Start the backend helper:

```bash
cd part6/query-anecdotes
npm install
npm run server
```

Start the frontend in another terminal:

```bash
cd part6/query-anecdotes
npm run dev
```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run server` - start the custom backend on `http://localhost:3001`
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- The backend validates anecdote length and rejects entries shorter than five characters.
