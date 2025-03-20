import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black dark:bg-[url('/binding-dark.png')] font-mono">
      {/* Header with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-1/2 z-10 w-full max-w-[50%] -translate-x-1/2"
      >
        <div className="flex items-center text-[rgb(211,212,219)] p-6 justify-between mx-auto rounded-lg border-transparent bg-neutral-900/20 backdrop-blur-3xl">
          <motion.div whileHover={{ scale: 1.05 }} className="text-lg font-bold">
            BrainFlow
          </motion.div>
          <nav className="flex flex-row gap-4 text-[rgb(150,151,159)]">
            <motion.div whileHover={{ color: "rgb(255,255,255)", scale: 1.1 }}>
              <a href="/task" className="px-3 py-2">Task</a>
            </motion.div>
            <motion.div whileHover={{ color: "rgb(255,255,255)", scale: 1.1 }}>
              <a href="/analysts" className="px-3 py-2">Analysts</a>
            </motion.div>
          </nav>
        </div>
      </motion.div>

      {/* Main content to enable backdrop blur effect */}
      <main className="flex flex-row justify-between mx-auto pt-32 px-8 text-neutral-400">
        <div className="flex flex-col gap-20">
          Game Selection List
          <ul className="flex flex-col gap-10">
            <li>Math</li>
            <li>Puzzle-Math</li>
            <li>Puzzle-Word</li>
            <li>Memory-Game</li>
            <li>Meditation-Game</li>
            <li>Music-Game</li>
            <li>Breathing-Game</li>
          </ul>
        </div>
        <div className="flex flex-col gap-20">
          <div className="text-center">Game Categories</div>
          <motion.div className="flex flex-row flex-wrap p-2 max-h-auto max-w-300 mx-auto w-full rounded-lg gap-20 justify-evenly">
            {[
              "Number Sequence Puzzle",
              "Quick Math Challenge",
              "Math Grid (Sudoku-like)",
              "Number Sequence Puzzle",
              "Tic-Tac-Toe",
              "Memory Match Game",
              "Word Search Puzzle",
              "Meditation Game",
              "Music Listening",
              "Breathing Exercise Game",
            ].map((game, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2 * (index + 1), duration: 0.5 }
                }}
                whileInView={{
                  y: [0, -5, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    ease: "easeInOut",
                    delay: 0.1 * index
                  }
                }}
                whileHover={{
                  y: -12,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 10
                  },
                }}
                className="w-1/3 flex-shrink-0 flex-grow-0 border-2 border-white p-6 bg-gray-700 rounded-md text-white cursor-pointer relative overflow-hidden group shadow-lg"
              >
                {/* Background animation layer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-teal-500/0 to-blue-600/0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.05, 0],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: 0.2 * index
                    }
                  }}
                  whileHover={{
                    opacity: 1,
                    background: "linear-gradient(90deg, rgba(109,40,217,0.2) 0%, rgba(45,212,191,0.2) 50%, rgba(37,99,235,0.2) 100%)",
                    transition: { duration: 0.3 }
                  }}
                />

                {/* Border animation */}
                <motion.div
                  className="absolute inset-0"
                  initial={{
                    opacity: 0.3,
                    background: "linear-gradient(90deg, #6D28D9, #2DD4BF, #2563EB, #6D28D9)",
                    backgroundSize: "300% 300%",
                    backgroundPosition: "0% 0%"
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear"
                  }}
                  style={{
                    padding: "2px",
                    borderRadius: "0.375rem",
                    maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude"
                  }}
                />

                {/* Text container with shimmer effect */}
                <div className="relative z-10">
                  <motion.div
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                      x: "100%",
                      opacity: 0.1,
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.3 * index
                      }
                    }}
                    whileHover={{
                      opacity: 0.2,
                      transition: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                      }
                    }}
                  />
                  {game}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div>Game Development Time</div>
      </main>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
      <div>hello</div>
    </div>
  );
}
