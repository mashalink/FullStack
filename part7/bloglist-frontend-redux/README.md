# Bloglist Frontend (Redux) — Part 7

Frontend for the FullStack Open bloglist app with React Router 7 and Redux Toolkit.

## Stack
- React + Vite
- Redux Toolkit
- React Router v7
- Axios
- Vitest + Testing Library

## Features
- Login / logout with persisted session (localStorage)
- List blogs sorted by likes
- View single blog with likes, delete (owner only), and comments
- Create new blog entries via form
- Notifications for errors/success

## Getting started
```bash
cd part7/bloglist-frontend-redux
npm install
npm run dev
```
App runs on http://localhost:5173 by default.

### Backend
Requires the bloglist API from Part 4 running locally (default http://localhost:3003) or another compatible deployment. Update `src/services/blogs.js` base URL if needed.

## Tests
```bash
npm test        # vitest unit/integration tests
npm run lint    # eslint
```

## Build
```bash
npm run build
npm run preview
```

## Deployment
- Live (Render): **https://bloglist-dunc.onrender.com/**
- Demo credentials: `demo` / `demopass`

## Notes
- Uses custom theming variables defined in `src/index.css`.
- Routing is configured in `src/main.jsx` and `src/views/MainLayout.jsx`.
