# Part 6 – Advanced State Management

This part contains three small apps that explore Redux and React Query patterns.

## unicafe-redux

- Minimal Redux counter for feedback buttons (`good | ok | bad | reset`).
- Uses a single reducer and manual `store.subscribe(renderApp)` to demonstrate the bare essentials.

Run:

- `cd part6/unicafe-redux`
- `npm install`
- `npm run dev` (http://localhost:5173)

## redux-anecdotes (Redux Toolkit)

- Anecdote list with voting, creation, filtering, and notifications.
- State is managed with RTK slices (`anecdotes`, `filter`, `notification`); async thunks load/create/vote via `json-server`.
- Sorting is kept in-state (`votes` desc) to keep UI consistent.

Run:

- `cd part6/redux-anecdotes`
- `npm install`
- `npm run server` (starts json-server on http://localhost:3001/anecdotes)
- In another terminal: `npm run dev` (http://localhost:5173)
- Optional: `npm run lint`

## query-anecdotes (TanStack Query v5)

- Same anecdotes feature set rebuilt with React Query: caching, retries, invalidation, optimistic vote updates.
- Notifications via context provider; json-server validator rejects anecdotes shorter than 5 chars and the error is surfaced to the UI.

Run:

- `cd part6/query-anecdotes`
- `npm install`
- `npm run server` (custom `server.js` with validation on http://localhost:3001/anecdotes)
- In another terminal: `npm run dev` (http://localhost:5173)
- Optional: `npm run lint`

Notes:

- Backends for `redux-anecdotes` and `query-anecdotes` both use port 3001; run only one server at a time.
