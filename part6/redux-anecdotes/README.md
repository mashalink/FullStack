# Redux Anecdotes

Anecdote application built with Redux Toolkit and a local `json-server` backend.

## Stack

- React
- Redux Toolkit
- React Redux
- Vite
- `json-server`
- ESLint

## Features

- loads anecdotes from a backend with async thunks
- creates new anecdotes
- votes on existing anecdotes
- filters anecdotes in the UI
- shows timed notifications for async actions

## Run Locally

Start the backend helper:

```bash
cd part6/redux-anecdotes
npm install
npm run server
```

Start the frontend in another terminal:

```bash
cd part6/redux-anecdotes
npm run dev
```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run server` - start `json-server` on `http://localhost:3001`
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- Anecdotes are served from the local backend on port `3001`.
