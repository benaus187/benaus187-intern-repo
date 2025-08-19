import React, { useState } from "react";

export default function TodoForm() {
  const [input, setInput] = useState("");   // track the input value
  const [items, setItems] = useState([]);   // track the list of items

  const handleAdd = () => {
    if (input.trim() === "") return; // ignore empty input
    setItems([...items, input]);     // add new item
    setInput("");                    // clear input
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an item"
      />
      <button onClick={handleAdd} style={{ marginLeft: "8px" }}>
        Add
      </button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>   
        ))}
      </ul>
    </div>
  );
}
