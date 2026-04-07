# Ultimate Hooks

Custom hooks exercise app that uses `useField` and `useResource` to manage forms and remote resources.

## Stack

- React
- Vite
- Axios
- `json-server`
- custom hooks
- ESLint

## Features

- `useField` for reusable input state handling
- `useResource` for fetching and creating resources
- separate resource collections for notes and persons
- local helper backend with `json-server`

## Run Locally

Start the local backend helper:

```bash
cd part7/ultimate-hooks
npm install
npm run server
```

Start the frontend in another terminal:

```bash
cd part7/ultimate-hooks
npm run dev
```

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run server` - start `json-server` on `http://localhost:3005`
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- The app expects the local backend to be available on port `3005`.
