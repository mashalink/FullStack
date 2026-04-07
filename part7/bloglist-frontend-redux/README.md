# Bloglist Frontend (Redux)

Part 7 bloglist frontend built with React Router and Redux Toolkit.

## Stack

- React
- Vite
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Vitest
- Testing Library
- ESLint

## Features

- login and logout with persisted session
- routed views for blogs and related data
- create, like, delete, and comment on blogs
- notifications for success and error states
- blogs sorted by likes

## Run Locally

```bash
cd part7/bloglist-frontend-redux
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

## Deployment

- Live: `https://bloglist-dunc.onrender.com/`
- Demo credentials: `demo` / `demopass`

## Notes

- The Vite dev server proxies `/api` requests to `http://localhost:3003`.
- This frontend is designed to work with the Part 4 bloglist backend.
