# Part 5 – Bloglist Frontend & E2E

`part5` contains two sibling projects: the blog UI and its end‑to‑end Playwright tests.

## bloglist-frontend
- React + Vite SPA: login, create blog, like, delete, sort by likes.
- Key components: `App.jsx` (auth + data loading + sorting), `Blog.jsx` (card with toggle/details, like/delete), `BlogForm.jsx`, `Togglable.jsx`, `Notification.jsx`.
- Stores the user JWT in `localStorage` under `loggedBlogappUser` and passes it to `blogService`.
- UI sorting: `blogs` are sorted by `likes` descending before render.

Run:
- `npm install`
- `npm run dev` (default http://localhost:5173)
- `npm run test` — Vitest + Testing Library unit/integration tests.
- `npm run lint` — ESLint.

Environment:
- Requires a backend at `http://localhost:3003` with `/api/login`, `/api/blogs`, `/api/users`, and `/api/testing/reset` (for tests).

## bloglist-e2e
- Playwright test suite (`tests/blog_app.spec.js`) against the same frontend and test backend.
- Scenarios: login (success/failure), create, like, delete, delete visibility for author only, ordering by likes.
- Config: `playwright.config.js` sets `workers: 1`, baseURL `http://localhost:5173`.
- Tests run in serial mode inside the describe to avoid data races.

Run:
- `npm install`
- Download browsers once: `npx playwright install`
- Ensure backend is running at `http://localhost:3003` and frontend at `http://localhost:5173`.
- `npm test` — runs `playwright test`.

Notes:
- Each test resets data via `/api/testing/reset`, then creates users `testuser` and `otheruser` (password `password123`).
- Tests rely on labels/button text; if UI text changes, update the specs accordingly.
