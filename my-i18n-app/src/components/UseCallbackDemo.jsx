import React, { useCallback, useState } from "react";

// Memoized child that only re-renders when its props change by shallow compare
const MemoButton = React.memo(function MemoButton({ onClick, label }) {
  console.log(`[render] <MemoButton label="${label}">`);
  return (
    <button onClick={onClick} style={{ padding: "8px 12px" }}>
      {label}
    </button>
  );
});

const Info = React.memo(function Info({ theme, count }) {
  console.log(`[render] <Info theme=${theme} count=${count}>`);
  const bg = theme === "dark" ? "#222" : "#eee";
  const color = theme === "dark" ? "#eee" : "#222";
  return (
    <div style={{ marginTop: 12, padding: 12, background: bg, color }}>
      Theme: <b>{theme}</b> • Count: <b>{count}</b>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");
  const [note, setNote] = useState("");

  console.log(`[render] <UseCallbackDemo note="${note}">`);
  // Stable function identity across renders (no deps needed thanks to functional update)
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  // This one would change identity each render if created inline without useCallback.

  return (
    <section style={{ padding: 16, fontFamily: "system-ui", maxWidth: 720 }}>
      <h2>useCallback Demo: Prevent Unnecessary Re-renders</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <MemoButton onClick={increment} label="Increment" />
        <button
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          style={{ padding: "8px 12px" }}
        >
          Toggle Theme
        </button>
        <span>Count: <b>{count}</b></span>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          Unrelated note (parent state):
          <input
            style={{ marginLeft: 8, padding: 6, width: 260 }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="type here and watch console logs"
          />
        </label>
      </div>

      <Info theme={theme} count={count} />

      <p style={{ marginTop: 12, color: "#666" }}>
        Open the browser console. Typing in the note input re-renders the parent.
        With <code>useCallback</code>, <code>&lt;MemoButton&gt;</code> will NOT re-render
        unless its props actually change.
      </p>
    </section>
  );
}
