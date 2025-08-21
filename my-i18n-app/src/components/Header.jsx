import { useSelector } from 'react-redux'
import React from "react"
import { selectCounterValue } from '../features/counter/selectors'

export default function Header() {
  const count = useSelector(selectCounterValue)
  return (
    <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
      <strong>App Header</strong> — Counter: {count}
    </header>
  )
}
