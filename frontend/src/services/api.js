//const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

console.log("API_BASE =", API_BASE);
export async function predictColleges(payload) {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Predict API error: ${res.status} ${text}`)
  }

  return res.json()
}

// optional health check
export async function health() {
  try {
    const r = await fetch(`${API_BASE}/actuator/health`).catch(() => null)
    return r && r.ok
  } catch {
    return false
  }
}


