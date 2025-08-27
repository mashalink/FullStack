#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# Usage Instructions
# -----------------------------
# Save this file as setup.sh (or any name you like)
# Make it executable:  chmod +x setup.sh
# Run it:              ./setup.sh my-app
# If you omit "my-app", it will default to folder name "my-app".

# -----------------------------
# Project Setup
# -----------------------------
APP_NAME="${1:-my-app}"

# Create a new Vite React project
echo "▶ Creating Vite React app: $APP_NAME"
npm create vite@latest "$APP_NAME" -- --template react

cd "$APP_NAME"

# -----------------------------
# Clean up public folder
# -----------------------------
echo "▶ Cleaning up public folder"
rm -rf public/*

# -----------------------------
# Clean up index.html
# -----------------------------
echo "▶ Cleaning up index.html"
# Remove favicon link line and replace <title>
sed -i.bak "/vite.svg/d" index.html
sed -i.bak "s|<title>.*</title>|<title>$APP_NAME</title>|" index.html
rm -f index.html.bak

# -----------------------------
# Install Dependencies
# -----------------------------
echo "▶ Installing dependencies"
npm i                                 # install default Vite/React deps
npm i -D json-server concurrently      # install dev tools: json-server + concurrently

# -----------------------------
# Mock Database Setup
# -----------------------------
echo "▶ Creating db.json (mock data)"
cat > db.json <<'JSON'
{
  "todos": [
    { "id": 1, "title": "Learn Vite", "done": false },
    { "id": 2, "title": "Build React app", "done": true }
  ]
}
JSON

# -----------------------------
# Vite Proxy Configuration
# -----------------------------
echo "▶ Setting up Vite dev-server proxy to /api → http://localhost:3001"
cat > vite.config.js <<'JS'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Any request starting with /api will be proxied to json-server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
JS

# -----------------------------
# Example API Client + Component
# -----------------------------
echo "▶ Adding example API client and demo component"
mkdir -p src/services

# API helper file
cat > src/services/api.js <<'JS'
export async function getTodos() {
  const res = await fetch('/api/todos')
  if (!res.ok) throw new Error('Failed to load todos')
  return res.json()
}
JS

# Replace App.jsx with demo that uses the API
cat > src/App.jsx <<'JSX'
import { useEffect, useState } from 'react'
import './App.css'
import { getTodos } from './services/api'

export default function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Vite + React + json-server</h1>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} readOnly /> {t.title}
          </li>
        ))}
      </ul>
      <p style={{opacity:.7}}>API: <code>/api/todos</code> → proxied to <code>http://localhost:3001/todos</code></p>
    </div>
  )
}
JSX

# -----------------------------
# Update package.json Scripts
# -----------------------------
echo "▶ Updating package.json scripts"
node - <<'NODE'
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

pkg.scripts = {
  ...pkg.scripts,
  "dev": "vite",                      // start frontend only
  "build": "vite build",              // production build
  "preview": "vite preview",          // preview built app
  "server": "json-server --watch db.json --port 3001", // start json-server
  "dev:all": "concurrently -n web,api -c auto \"npm run dev\" \"npm run server\"" // start both
}

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
console.log('package.json scripts added:')
console.log(pkg.scripts)
NODE

# -----------------------------
# Final Instructions
# -----------------------------
cat <<'TXT'

✅ Setup complete!

Run the whole stack with:
  npm run dev:all
  - web:  http://localhost:3000   (Vite + React)
  - api:  http://localhost:3001   (json-server; example: /todos)

Examples:
  GET  http://localhost:3001/todos
  GET  http://localhost:3000/api/todos   (via proxy, just fetch('/api/todos') from frontend)

Useful commands:
  npm run dev       — frontend only
  npm run server    — API only (json-server)
  npm run build     — production build
  npm run preview   — local preview of build

Edit db.json and restart server to change mock API.
TXT
