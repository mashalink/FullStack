https://fullstackopen.com/en/about

# 📘 FullStack Open — Coursework

This repository contains my solutions for the **FullStack Open** course by the University of Helsinki.

The course covers modern full-stack development using:

- ⚛️ React (frontend)
- 🟦 Node.js + Express (backend)
- 🌐 REST APIs
- 🗄️ Databases
- 🧪 Testing
- 🚀 Deployment

---

## 📚 Course Progress

### ✅ Completed

- **Part 0:** Fundamentals of Web Apps
- **Part 1:** Introduction to React
- **Part 2:** Communicating with Server
- **Part 3:** Programming a Server with NodeJS and Express
    *  Backend deployed on Render
    * 🔗 **Live API:**  
https://fullstack-9acg.onrender.com/
- **Part 4:** Testing Express servers, user administration
    * node:test + Supertest coverage for the blog API (CRUD + auth)
    * Password hashing, JWT login, request validation, test DB resets via `/api/testing/reset`
- **Part 5:** Testing React apps
    * Bloglist SPA (React + Vite): login, create, like, delete, sort by likes
    * Vitest + Testing Library unit/integration tests; Playwright E2E suite

#### Quick start for Part 5 E2E
- Backend: `cd part4/bloglist && npm install && npm run dev` (needs `.env` with PORT=3003, TEST_MONGODB_URI, etc.; serves http://localhost:3003).
- Frontend: `cd part5/bloglist-frontend && npm install && npm run dev` (http://localhost:5173).
- E2E: `cd part5/bloglist-e2e && npm install && npx playwright install && npm test`.


---

### 🚧 In Progress

- Part 6: Advanced state management

### Upcoming Course Parts


- Part 7: React Router, custom hooks, styling, Webpack

- Part 8: GraphQL

- Part 9: TypeScript

- Part 10: React Native

- Part 11: CI/CD

- Part 12: Containers

- Part 13: Relational databases
