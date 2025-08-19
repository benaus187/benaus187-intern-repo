import React, { useEffect, useRef, useState } from "react";

export default function UseEffectDemo() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [fetchTick, setFetchTick] = useState(0); // triggers fetch effect when incremented
  const intervalRef = useRef(null);              // demonstrate cleanup of interval
  const abortRef = useRef(null);                 // keep last AbortController to cancel

  // 1) Mount / Unmount log (and demo cleanup for an interval)
  useEffect(() => {
    console.log("[useEffectDemo] mounted");
    // Example “resource” that must be cleaned up:
    intervalRef.value = setInterval(() => {
      // no-op; just to show cleanup runs
    }, 10_000);

    return () => {
      console.log("[useEffectDemo] unmounted");
      if (intervalRef.value) clearInterval(intervalRef.value);
      // also abort any in-flight fetch on unmount
      abortRef.current?.abort?.();
    };
  }, []);

  // 2) Fetch when the user clicks the button (not on mount)
  useEffect(() => {
    if (fetchTick === 0) return; // skip until user clicks

    const controller = new AbortController();
    abortRef.current?.abort?.(); // cancel any previous request
    abortRef.current = controller;

    const run = async () => {
      try {
        setStatus("loading");
        setData(null);

        // sample API; swap to your own if needed
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1",
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        setData(json);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return; // expected on cancel
        console.error("[useEffectDemo] fetch error:", err);
        setStatus("error");
      }
    };

    run();

    // Cleanup for this effect run: abort if a new run starts or component unmounts
    return () => controller.abort();
  }, [fetchTick]);

  return (
    <section style={{ padding: 16, fontFamily: "system-ui", maxWidth: 720 }}>
      <h2>useEffect Demo</h2>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button
          onClick={() => setFetchTick((n) => n + 1)}
          disabled={status === "loading"}
          style={{ padding: "8px 12px" }}
        >
          {status === "loading" ? "Fetching…" : "Fetch TODO"}
        </button>
        <span style={{ color: "#666" }}>Clicks: {fetchTick}</span>
      </div>

      <pre
        style={{
          background: "#111", color: "#eaeaea", padding: 12, borderRadius: 8,
          whiteSpace: "pre-wrap", wordBreak: "break-word"
        }}
      >
        Status: {status}
        {"\n"}
        Data: {data ? JSON.stringify(data, null, 2) : "(none)"}
      </pre>

      <p style={{ color: "#666" }}>
        Open the browser console to see mount/unmount logs. This component also cleans up:
        clears an interval and aborts in‑flight fetches when unmounted or when a new fetch starts.
      </p>
    </section>
  );
}
