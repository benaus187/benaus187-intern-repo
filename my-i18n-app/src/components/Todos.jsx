import { useEffect, useState } from 'react'
import { getTodos } from '../lib/api'

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    async function run() {
      setStatus('loading')
      setError(null)
      try {
        const data = await getTodos()
        if (!ignore) {
          setTodos(data)
          setStatus('success')
        }
      } catch (e) {
        if (!ignore) {
          setError(e.message || 'failed')
          setStatus('error')
        }
      }
    }
    run()
    return () => { ignore = true }
  }, [])

  if (status === 'loading') return <p aria-label="status">Loading…</p>
  if (status === 'error')   return <p aria-label="status">Error: {error}</p>

  return (
    <div>
      <h2>Todos</h2>
      {status === 'success' && (
        <ul>
          {todos.map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
      )}
    </div>
  )
}
