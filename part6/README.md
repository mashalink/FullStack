# Part 6 - Advanced State Management

This part compares different state-management approaches across small React applications.

## Projects

| Path | Focus |
| --- | --- |
| `unicafe-redux` | minimal Redux store and reducer testing |
| `redux-anecdotes` | Redux Toolkit, async thunks, filtering, and notifications |
| `query-anecdotes` | TanStack Query caching, mutations, and server validation |

## Covered Work

- using Redux for global state
- structuring state with Redux Toolkit slices
- fetching and mutating server data
- comparing Redux and TanStack Query approaches
- showing notifications based on async actions

## Run Locally

Each project is independent:

```bash
cd part6/<project>
npm install
npm run dev
```

For the anecdotes apps, run the backend helper in a separate terminal before starting the UI.

## Notes

- `redux-anecdotes` and `query-anecdotes` both use port `3001` for their local backend, so run only one of those servers at a time.
