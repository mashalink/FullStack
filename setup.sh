#!/usr/bin/env bash
set -euo pipefail

# -----------------------------
# 1. Имя проекта
# -----------------------------
APP_NAME="${1:-my-app}"

echo "▶ Creating Vite React app: $APP_NAME"

# Создаём проект Vite + React
# В некоторых версиях create-vite задаёт вопросы.
# Важно: если спросит "Install and start now?" — отвечай NO.
npm create vite@latest "$APP_NAME" -- --template react

cd "$APP_NAME"

# -----------------------------
# 2. Чистим public
# -----------------------------
echo "▶ Cleaning up public folder"
rm -rf public/* || true

# -----------------------------
# 3. Чистим index.html
# -----------------------------
echo "▶ Cleaning up index.html"
sed -i.bak "/vite.svg/d" index.html
sed -i.bak "s|<title>.*</title>|<title>$APP_NAME</title>|" index.html
rm -f index.html.bak

# -----------------------------
# 4. Ставим зависимости
# -----------------------------
echo "▶ Installing dependencies"
npm i
npm i -D json-server concurrently

# -----------------------------
# 5. Находим свободный порт для json-server
# -----------------------------
API_PORT=3001
while lsof -i :$API_PORT >/dev/null 2>&1; do
  API_PORT=$((API_PORT+1))
done
echo "▶ json-server will use port $API_PORT"

# -----------------------------
# 6. Создаём db.json
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
# 7. vite.config.js с прокси на /api
# -----------------------------
echo "▶ Writing vite.config.js"
cat > vite.config.js <<JS
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:$API_PORT',
        changeOrigin: true,
        rewrite: path => path.replace(/^\\/api/, '')
      }
    }
  }
})
JS

# -----------------------------
# 8. Простенький API-клиент
# -----------------------------
echo "▶ Adding example API client and demo component"
mkdir -p src/services

cat > src/services/api.js <<'JS'
export async function getTodos() {
  const res = await fetch('/api/todos')
  if (!res.ok) throw new Error('Failed to load todos')
  return res.json()
}
JS

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
      <p style={{opacity:.7}}>
        API: <code>/api/todos</code> → proxied to <code>http://localhost:$API_PORT/todos</code>
      </p>
    </div>
  )
}
JSX

# -----------------------------
# 9. Обновляем scripts в package.json
# -----------------------------
echo "▶ Updating package.json scripts"

node <<NODE
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "dev": "vite --open",
  "build": "vite build",
  "preview": "vite preview",
  "server": "json-server --watch db.json --port $API_PORT",
  "dev:all": "concurrently -n web,api -c auto \"npm run dev\" \"npm run server\""
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('New scripts:', pkg.scripts);
NODE

# -----------------------------
# 10. Финальное сообщение
# -----------------------------
cat <<TXT

✅ Setup complete for project: $APP_NAME

Запуск всего стека:
  cd $APP_NAME
  npm run dev:all

Или отдельно:
  npm run dev       # только фронт
  npm run server    # только json-server (API на http://localhost:$API_PORT)
TXT
