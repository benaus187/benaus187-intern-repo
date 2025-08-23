import { useState } from 'react'

export default function Greeting({ name = 'friend' }) {
  const [count, setCount] = useState(0)

  return (
    <section>
      <h1 aria-label="greeting">Hello, {name}!</h1>
      <p aria-label="clicks">Clicks: {count}</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
      >
        Click me
      </button>
    </section>
  )
}
