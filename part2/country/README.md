# Country

React app for searching countries and showing country details together with current weather in the capital city.

## Stack

- React
- Vite
- OpenWeatherMap API
- Helsinki Rest Countries API
- ESLint

## Features

- filters countries by name as the user types
- shows either a list of matches or a single country detail view
- displays capital weather, temperature, wind, and weather icon
- handles loading and weather fetch errors in the UI

## Run Locally

```bash
cd part2/country
npm install
export VITE_WEATHER_KEY=YOUR_KEY
npm run dev
```

Default local URL: `http://localhost:5173`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally
- `npm run server` - start the local `json-server` helper on port `3001`
- `npm run dev:all` - run the frontend and local helper server together

## Notes

- `VITE_WEATHER_KEY` is required for weather data.
- Country data is fetched from `https://studies.cs.helsinki.fi/restcountries/api/all`.
