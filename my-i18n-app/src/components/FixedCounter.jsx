import React, { useEffect, useState } from "react";

export default function FixedCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ✅ functional update reads the *current* count safely
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []); // ok: closure no longer depends on `count`

  return (
    <div style={{ padding: 16 }}>
      <h3>Fixed Counter</h3>
      <p>Count: {count}</p>
    </div>
  );
}
