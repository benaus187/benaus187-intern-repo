import React from "react";

export default function HelloWorld({ name }) {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello, Focus Bear! 👋
      </h1>
      {name && (
        <p className="mt-2 text-lg text-gray-700">
          Welcome, {name}!
        </p>
      )}
    </div>
  );
}
