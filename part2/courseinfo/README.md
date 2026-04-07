# Courseinfo

Expanded course information app for Part 2 with data loading from a local API.

## Stack

- React
- Vite
- Axios
- `json-server`
- ESLint

## Features

- loads course data asynchronously from a backend
- renders multiple courses with extracted components
- calculates totals per course
- shows loading and error states while fetching data

## Run Locally

Start the local backend helper:

```bash
cd part2/courseinfo
npm install
npm run server
```

Start the frontend in another terminal:

```bash
cd part2/courseinfo
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run server` - start `json-server` on `http://localhost:3001`
- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally

## Notes

- This version extends the Part 1 courseinfo app by fetching course data from a backend instead of hardcoding it in the component tree.
