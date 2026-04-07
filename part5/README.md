# Part 5 - Testing React Apps

This part contains the bloglist frontend and its end-to-end Playwright test suite.

## Projects

| Path | Description |
| --- | --- |
| `bloglist-frontend` | React blog UI with login, create, like, delete, sorting, and component tests |
| `bloglist-e2e` | Playwright suite for login and blog interaction flows |

## Covered Work

- testing React components with Vitest and Testing Library
- writing end-to-end tests with Playwright
- validating authenticated UI flows
- testing blog creation, liking, deletion, and ordering

## Run Locally

Backend:

```bash
cd part4/bloglist
npm install
npm run start:test
```

Frontend:

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

E2E tests:

```bash
cd part5/bloglist-e2e
npm install
npm test
```

## Notes

- The frontend uses a Vite proxy to forward `/api` requests to `http://localhost:3003`.
- Playwright tests expect the Part 4 backend to expose `/api/testing/reset` in test mode.
