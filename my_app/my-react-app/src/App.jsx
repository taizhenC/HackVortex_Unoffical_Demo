import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4">Vite + React + Motion</h1>

      {/* Motion Box */}
      <motion.div
        className="w-32 h-32 bg-blue-500 rounded-lg"
        initial={{ x: -100 }}  // Start from left off-screen
        animate={{ x: 100 }}   // Move to the right
        transition={{ duration: 1 }}  // Animation lasts 1 second
      >
        <p className="text-white text-center pt-12">Motion Box</p>
      </motion.div>

      <div className="card bg-white shadow-md p-6 rounded-lg mt-6">
        <button
          onClick={() => setCount(count + 1)}
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 font-medium text-xl hover:underline hover:decoration-2 transition duration-300"
        >
          Click me! Count is {count}
        </button>
        <p className="mt-2 text-center text-gray-600">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
