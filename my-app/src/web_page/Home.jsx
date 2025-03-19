import React, { useState } from 'react';

export default function Home() {
  console.log("Home page loaded!");  // Debugging log

  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">
        Welcome to Home Page!
      </h1>

      {/* Hover Effect Box */}
      <div className="w-64 h-32 bg-blue-300 hover:bg-blue-500 transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-white font-semibold">Hover over me!</p>
      </div>

      {/* Click Button Counter */}
      <button 
        onClick={() => setCount(count + 1)}
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md transition-all duration-300"
      >
        Clicked {count} times
      </button>
    </div>
  );
}
