# Part 3 — Phonebook Backend (Exercises 3.1–3.11)

This folder contains the backend implementation for **Full Stack Open Part 3: Phonebook**.  
The backend is built with **Node.js**, **Express**, and also serves the production build of the frontend.

---

## 📌 Live Application

- **Frontend + Backend:**  
  https://fullstack-9acg.onrender.com/

- **API Endpoint:**  
  https://fullstack-9acg.onrender.com/api/persons

---

## 📚 Completed Exercises (up to 3.11)

### ✔️ 3.1–3.8

Basic Express server, routes, middleware, and logging.

### ✔️ 3.9 — Connect Frontend and Backend

The backend works together with the phonebook frontend from Part 2.

### ✔️ 3.10 — Deploy Backend

The backend is deployed to Render and tested with browser, VS Code REST Client, and Postman.

### ✔️ 3.11 — Serve Production Frontend

The production build of the frontend is included in the backend and served using:

```js
app.use(express.static("dist"));
```

## Running Locally

### Backend

```bash
cd part3/phonebook_backend
npm install
npm run dev
```

Server runs at:
http://localhost:3001

### Frontend (development)

```bash
cd part3/phonebook_frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173
