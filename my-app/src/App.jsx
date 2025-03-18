import { useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
      <motion.div
        className="mb-8"
        animate={{ rotate: count * 10 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Motion + Tailwind CSS
        </motion.h1>
      </motion.div>
      
      <motion.div
        className="mb-6"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-full text-xl"
        >
          Count is {count}
        </button>
      </motion.div>
      
      <motion.p
        className="mt-4 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Click the button to increase the count with a motion effect!
      </motion.p>
    </div>
  )
}

export default App
