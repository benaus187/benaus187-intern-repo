import React, { useMemo, useState } from "react";

// intentionally slow isPrime (O(√n)) to simulate expensive work
function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function BigListMemo() {
  // Controls
  const [size, setSize] = useState(5000);        // how many numbers to render
  const [threshold, setThreshold] = useState(1000); // only compute primes up to this
  const [note, setNote] = useState("");          // unrelated UI state

  // Generate a large list once per size change
  const numbers = useMemo(() => {
    // e.g., [1, 2, 3, ..., size]
    return Array.from({ length: size }, (_, i) => i + 1);
  }, [size]);

  // EXPENSIVE: count of primes <= threshold and their sum
  // This recomputes ONLY when numbers or threshold change
  const { primeCount, primeSum } = useMemo(() => {
    const start = performance.now();
    let count = 0;
    let sum = 0;
    for (const n of numbers) {
      if (n > threshold) break; // early stop
      if (isPrime(n)) {
        count++;
        sum += n;
      }
    }
    const end = performance.now();
    // Log so you can see recomputation in the console
    console.log(`[useMemo] expensive calc took ${(end - start).toFixed(1)}ms`);
    return { primeCount: count, primeSum: sum };
  }, [numbers, threshold]);

  return (
    <section style={{ padding: 16, fontFamily: "system-ui" }}>
      <h2>useMemo Demo: Big List + Expensive Calculation</h2>

      <div style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr 1fr", maxWidth: 900 }}>
        <label>
          Size: {size}
          <input
            type="range"
            min={500}
            max={15000}
            step={500}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </label>

        <label>
          Threshold: {threshold}
          <input
            type="range"
            min={200}
            max={5000}
            step={100}
            value={threshold}
            onChange={(e) => setThreshold(parseInt(e.target.value))}
          />
        </label>

        <label>
          Unrelated note (does NOT recompute):
          <input
            type="text"
            placeholder="type anything..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Prime stats ≤ {threshold}:</strong>{" "}
        {primeCount} primes, sum = {primeSum}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <div style={{ height: 250, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
        {/* Render the large list; not the expensive part */}
        {numbers.map((n) => (
          <span key={n} style={{ display: "inline-block", width: 48, textAlign: "right", paddingRight: 8 }}>
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
