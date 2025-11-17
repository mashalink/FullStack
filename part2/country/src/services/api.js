export async function getTodos() {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to load todos");
  return res.json();
}
