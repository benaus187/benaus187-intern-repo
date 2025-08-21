import React, { useEffect, useState } from "react";

export default function BuggyCounter() {
  const [count, setCount] = useState(0);

  // BUG: stale closure + empty deps
  useEffect(() => {
    console.log("[buggy] mount; count =", count); // always logs 0 at mount
    const id = setInterval(() => {
      // uses the *initial* count from the closure (0)
      setCount(count + 1); // increments to 1, then keeps setting 1 forever
    }, 1000);
    return () => clearInterval(id);
  }, []); // never re-declared -> closure stuck at initial count

  return (
    <div style={{ padding: 16 }}>
      <h3>Buggy Counter</h3>
      <p>Count: {count}</p>
    </div>
  );
}
