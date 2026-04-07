# Country Hook

React exercise app that uses custom hooks to search for a country and render its basic details.

## Stack

- React
- Vite
- custom hooks
- Rest Countries API

## Features

- custom `useField` hook for input state management
- custom `useCountry` hook for fetching country data
- searches by country name on form submit
- shows country name, capital, population, and flag
- shows a `not found...` state when the country lookup fails

## Run Locally

```bash
cd part7/country-hook
npm install
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build

## Notes

- Country data is fetched from `https://studies.cs.helsinki.fi/restcountries/api/name/:name`.
