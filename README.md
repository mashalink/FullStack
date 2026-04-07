# FullStack Open Coursework

Solutions for the University of Helsinki [Full Stack Open](https://fullstackopen.com/en/about) course.

The repository currently covers Parts 0-7 and is organized by course part. Each project lives in its own directory with its own dependencies and scripts.

## Repository Structure

| Part | Topics | Projects |
| --- | --- | --- |
| [Part 0](./part0) | Fundamentals of web apps, browser-server flow | sequence diagrams and screenshots |
| [Part 1](./part1) | React basics, state, events | `courseinfo`, `unicafe`, `anecdotes` |
| [Part 2](./part2) | Server communication, forms, reusable components | `courseinfo`, `phonebook`, `country` |
| [Part 3](./part3) | Express, MongoDB, deployment | `phonebook_backend`, `phonebook_frontend` |
| [Part 4](./part4) | Testing Express APIs, authentication, user admin | `bloglist` |
| [Part 5](./part5) | Testing React apps | `bloglist-frontend`, `bloglist-e2e` |
| [Part 6](./part6) | Redux Toolkit, React Query | `unicafe-redux`, `redux-anecdotes`, `query-anecdotes` |
| [Part 7](./part7) | React Router, custom hooks, richer app structure | multiple bloglist and hook-based apps |

## Highlighted Projects

- [Part 3 Phonebook](./part3/README.md): full-stack phonebook app with an Express/MongoDB backend and a deployed Render instance.
- [Part 4 Bloglist Backend](./part4/README.md): authenticated blog API with `node:test`, SuperTest, validation, and seed scripts.
- [Part 5 Bloglist Frontend and E2E](./part5/README.md): React frontend with component tests plus Playwright end-to-end coverage.
- [Part 6 State Management Apps](./part6/README.md): Redux Toolkit and TanStack Query implementations of the anecdotes app.
- [Part 7 Bloglist Frontends](./part7/README.md): routing, comments, notifications, and two state-management variants for the bloglist UI.

## Quick Start

Each project is self-contained. Install dependencies inside the specific directory you want to run.

### Part 4 bloglist backend

```bash
cd part4/bloglist
npm install
npm run dev
```

Expected local API: `http://localhost:3003`

Required environment variables are documented in [part4/bloglist/README.md](./part4/bloglist/README.md).

### Part 5 bloglist frontend and E2E

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

```bash
cd part5/bloglist-e2e
npm install
npm test
```

The frontend expects the Part 4 backend to be running. Playwright tests also rely on the Part 4 backend in `NODE_ENV=test`.

### Part 7 bloglist frontend (Redux)

```bash
cd part7/bloglist-frontend-redux
npm install
npm run dev
```

Expected local UI: `http://localhost:5173`

The frontend uses relative `/api/...` endpoints and is intended to run against the Part 4 backend.

## Repository Notes

- This is a course repository, not a single installable monorepo package.
- Most projects use Vite on the frontend and Node.js/Express on the backend.
- GitHub Actions validates the main bloglist backend and frontend projects on pushes and pull requests.
- Parts 8-13 are not included in this repository yet.
