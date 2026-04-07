# Part 3 - Programming a Server with Node.js and Express

This part contains the phonebook full-stack application, split into a backend API and a frontend client.

## Projects

| Path | Description |
| --- | --- |
| `phonebook_backend` | Express and MongoDB backend with validation, error handling, and deployment |
| `phonebook_frontend` | frontend for the phonebook UI used during local development |

## Live Links

- App: `https://fullstack-9acg.onrender.com/`
- API: `https://fullstack-9acg.onrender.com/api/persons`

## Covered Work

- building REST endpoints with Express
- connecting the app to MongoDB with Mongoose
- adding validation and centralized error handling
- deploying the backend to Render
- serving the production frontend from the backend

## Run Locally

Backend:

```bash
cd part3/phonebook_backend
npm install
npm run dev
```

Frontend:

```bash
cd part3/phonebook_frontend
npm install
npm run dev
```

## Notes

- Completed exercises: `3.1-3.22`
- `mongo.js` in the backend project can be used to list or create phonebook entries from the command line.
