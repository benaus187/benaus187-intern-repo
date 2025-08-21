//import React, { useState } from "react";
//import Button from "./Button";

//export default function Counter() {
  //const [count, setCount] = useState(0);

  //return (
    //<div className="flex flex-col items-start gap-4 p-6">
      //<h1 className="text-4xl font-bold">Counter: {count}</h1>
      //<div className="flex gap-3">
        //<Button onClick={() => setCount(c => c + 1)}>Increment</Button>
        //<Button onClick={() => setCount(c => c - 1)} className="bg-slate-600 hover:bg-slate-700 active:bg-slate-800">
          //Decrement
        //</Button>
        //<Button onClick={() => setCount(0)} className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800">
          //Reset
        //</Button>
      //</div>
    //</div>
  //);
//}
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, addBy, reset } from '../features/counter/counterSlice'
import React from "react"

export default function Counter() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)

  return (
    <div style={{ padding: 16 }}>
      <h2>Counter</h2>
      <p>Value: {count}</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(addBy(5))}>+5</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  )
}
