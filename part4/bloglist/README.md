# Part 4 — Bloglist Backend

### 4.1 Bloglist Setup
Created a new Express + MongoDB backend.

#### Includes
- Express server
- Mongoose connection
- Environment variables (`dotenv`)
- Routes:
  - GET /api/blogs — return all blogs
  - POST /api/blogs — create a blog

#### Run locally
```bash
npm install
npm run dev
```
#### .env:
``` ini
MONGODB_URI=your_mongo_url
PORT=3003
```
``` json
{
  "title": "First test blog",
  "author": "Bulka",
  "url": "https://example.com/blog-1",
  "likes": 5
}
```
### 4.2 Refactoring

Code reorganized into modules:
``` bach
controllers/blogs.js
models/blog.js
utils/config.js
utils/logger.js
utils/middleware.js
app.js
index.js
```
All functionality works the same after refactoring.