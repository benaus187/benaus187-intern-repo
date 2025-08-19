import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow " +
        "transition-colors duration-200 " +
        "hover:bg-blue-700 active:bg-blue-800 " +
        "focus:outline-none focus:ring-2 focus:ring-blue-400 " +
        className
      }
    >
      {children}
    </button>
  );
}
