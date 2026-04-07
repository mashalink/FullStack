# Part 7 - React Router, Custom Hooks, Styling

This part contains several independent React applications that build on the earlier course work.

## Projects

| Path | Focus |
| --- | --- |
| [routed-anecdotes](./routed-anecdotes) | React Router basics and routed anecdotes views |
| [country-hook](./country-hook) | reusable hooks for fetching and managing country data |
| [ultimate-hooks](./ultimate-hooks) | custom hooks exercises with a local `json-server` backend |
| [bloglist-frontend-react-query-context](./bloglist-frontend-react-query-context) | bloglist UI using React Query and Context |
| [bloglist-frontend-redux](./bloglist-frontend-redux) | bloglist UI using Redux Toolkit and React Router |

## Covered Work

- using React Router for multi-view navigation
- extracting reusable custom hooks
- comparing Context, React Query, and Redux Toolkit approaches
- extending the bloglist application with routed views and comments
- building small hook-based utility applications

## Run Locally

For the Redux bloglist frontend:

```bash
cd part7/bloglist-frontend-redux
npm install
npm run dev
```

For the React Query + Context variant:

```bash
cd part7/bloglist-frontend-react-query-context
npm install
npm run dev
```

## Notes

- Both bloglist frontends are designed to work against the Part 4 backend API.
- If you want the most complete app in this part, start with [bloglist-frontend-redux](./bloglist-frontend-redux).
