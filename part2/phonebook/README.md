# Phonebook

React phonebook app for creating, updating, filtering, and deleting people entries.

## Stack

- React
- Vite
- Axios
- custom hooks
- `json-server`
- ESLint

## Features

- loads people from a backend
- filters the list by name
- creates new contacts and updates existing ones
- deletes contacts from the list
- shows success and error notifications

## Run Locally

Start the local backend helper:

```bash
cd part2/phonebook
npm install
npm run server
```

Start the frontend in another terminal:

```bash
cd part2/phonebook
npm run dev
```

Or run both together:

```bash
cd part2/phonebook
npm start
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run server` - start `json-server` on `http://localhost:3001`
- `npm start` - run backend and frontend together
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- The app uses custom hooks for fetching, filtering, creating, updating, and deleting persons.
