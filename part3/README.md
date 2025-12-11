# Part 3 — Phonebook Backend

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

## ✔️ 3.12 — Command-Line Database Script

A separate CLI script **`mongo.js`** was added for working with the cloud MongoDB database.

- Running with **only the password** lists all phonebook entries.
- Running with **password + name + number** adds a new entry to the database.

### Example usage

```bash
node mongo.js yourpassword
node mongo.js yourpassword "Arto Vihavainen" 045-1232456
```

The script connects to the Atlas cluster **without storing the password in the code**.

## ✔️ 3.13 — Fetch All Persons from MongoDB

The `/api/persons` route has been updated to load data **directly from the MongoDB database** using the Mongoose `Person` model.

```js
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch(next);
});
```

The frontend continues to work normally and displays all persons stored in the database.

---

## ✔️ 3.14 — Save New Persons to MongoDB

The POST /api/persons endpoint now stores new entries in the cloud database instead of keeping them in an in-memory array.

```js
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({ name, number });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch(next);
});
```

At this stage, checking for duplicate names is not required and will be implemented in later exercises.

---

## ✔️ 3.15 — Delete Persons from MongoDB

The DELETE `/api/persons/:id` endpoint now removes entries directly from the database:

```js
app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
});
```

The frontend updates correctly after a deletion.

## ✔️ 3.16 — Centralized Error Handling Middleware

A unified error handler was added to manage all application and Mongoose errors:

```js
const errorHandler = (error, req, res, next) => {
  console.error("ERROR:", error.name, error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }

  return res.status(500).json({ error: error.message });
};

app.use(errorHandler);
```

All routes now use .catch(next) for clean error forwarding.

## ✔️ 3.17 — Update Existing Person (PUT)

The backend now supports updating an existing person’s number using HTTP PUT, enabling the frontend to replace numbers when duplicate names are detected.

```js
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true })
    .then((updatedPerson) => {
      if (updatedPerson) res.json(updatedPerson);
      else res.status(404).end();
    })
    .catch(next);
});
```

## ✔️ 3.18 — Use MongoDB for /api/persons/:id and /info

Get one person:

```js
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(next);
});
```

Info page:

```js
app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(next);
});
```

Both routes now reflect the live database state.

## ✔️ 3.19 — Validation: Name Min Length & Phone Number Format

Server-side validation was added using **Mongoose validators**.

#### Name rules:

must be at least 3 characters

#### Phone number rules:

must be at least **8 characters**

must follow the format **XX-XXXXXXX** or **XXX-XXXXXXX**

Validation logic:

```js
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name must be at least 3 characters long"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    minlength: [8, "Number must be at least 8 characters long"],
    required: [true, "Number is required"],
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
      message:
        "Number must be in the form XX-XXXXXXX or XXX-XXXXXXX (only digits and one dash)",
    },
  },
});
```

If validation fails, the backend responds:

```js
{ "error": "Number must be in the form XX-XXXXXXX..." }
```

The frontend logs validation errors using:

```js
.catch(error => console.log(error.response.data.error));
```

## ✔️ 3.20 — Enable Validation for Updates (PUT)

Mongoose does **not** run validators on updates by default.
Validation was enabled using runValidators: true and context: "query":

```js
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedPerson) => {
      if (updatedPerson) res.json(updatedPerson);
      else res.status(404).end();
    })
    .catch(next);
});
```

PUT requests now obey all validation rules (name length, phone format, etc.).

## ✔️ 3.21 — Production Deployment with Updated Frontend Build

A new production build of the frontend was created and copied into the backend using:

```js
npm run build:ui
```

This script removes the old dist folder, builds the frontend, and copies the new dist into the backend.

The backend serves the production UI:

```js
app.use(express.static("dist"));
```

Deployment to Render was completed and verified:

- App works from: https://fullstack-9acg.onrender.com/

- API works from: **/api/persons**

- PUT, POST, DELETE all function correctly

- Validation errors appear properly both in backend and frontend

## ✔️ 3.22 — ESLint added and backend code cleaned up

The backend now uses ESLint to enforce consistent formatting and catch common issues.

**Installed:**

```bash
npm install --save-dev eslint @eslint/js @stylistic/eslint-plugin globals
```
**Added** eslint.config.mjs:
```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: { '@stylistic/js': stylisticJs },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      'no-console': 'off',
    },
  },
  { ignores: ['dist/**'] },
]
```
**Lint script added:**
```bash
"lint": "eslint ."
```
All lint errors were fixed, completing exercise 3.22.