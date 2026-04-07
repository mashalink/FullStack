# Bloglist E2E

Playwright end-to-end test suite for the bloglist frontend and backend.

## Stack

- Playwright
- Node.js
- bloglist frontend from `part5/bloglist-frontend`
- bloglist backend from `part4/bloglist`

## Features

- verifies that the login form is shown
- tests successful and failed login flows
- tests blog creation
- tests liking a blog
- tests blog deletion by the creator
- tests that only the creator sees the delete action
- tests blog ordering by likes

## Run Locally

Start the backend in test mode:

```bash
cd part4/bloglist
npm install
npm run start:test
```

Start the frontend:

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

Run the Playwright suite:

```bash
cd part5/bloglist-e2e
npm install
npx playwright install
npm test
```

## Scripts

- `npm test` - run the Playwright test suite

## Notes

- Tests expect the backend at `http://localhost:3003`.
- Tests expect the frontend at `http://localhost:5173`.
- The suite resets the database through `/api/testing/reset` before each test and creates test users automatically.
- Playwright is configured with `workers: 1` and `headless: true`.
