import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, addBy, reset } from '../features/counter/counterSlice'
import { selectCounterValue } from '../features/counter/selectors'
import React from "react"

function getMessage(count) {            // <— no : number here
  if (count < 0) return 'Below zero — careful!'
  if (count === 0) return 'Start counting…'
  if (count < 10) return 'Nice progress!'
  if (count < 100) return '🔥 On a roll!'
  return '🚀 Count legend!'
}

export default function CounterView() {
  const dispatch = useDispatch()
  const count = useSelector(selectCounterValue)

  return (
    <div style={{ padding: 16 }}>
      <h2>Counter</h2>
      <p>Value: {count}</p>
      <p><em>{getMessage(count)}</em></p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(addBy(5))}>+5</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  )
}
