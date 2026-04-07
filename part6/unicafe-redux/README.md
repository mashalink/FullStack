# Unicafe Redux

Minimal Redux version of the Unicafe feedback app.

## Stack

- React
- Redux
- Vite
- Vitest
- ESLint

## Features

- dispatches feedback actions for `good`, `ok`, and `bad`
- supports resetting the counters
- renders directly from a Redux store subscription
- includes reducer-level tests

## Run Locally

```bash
cd part6/unicafe-redux
npm install
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run test` - run Vitest tests
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- This project intentionally keeps Redux usage minimal to show the core ideas without abstractions.
