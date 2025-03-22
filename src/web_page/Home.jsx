import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const toggleMusic = () => {
    const audioElement = document.getElementById("background-music")

    if(isMusicPlaying){
      audioElement.pause();
    }
    else{
      audioElement.play();
    }
    setIsMusicPlaying(!isMusicPlaying); 
  }
  
  const handleClick = () => {
    setHtmlContent('<h1>You clicked the wrong button!</h1><p>Click the button next to me!</p>');
    setTimeout(() => {
      setHtmlContent('');
    }, 1000);
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-black dark:bg-[url('/binding-dark.png')] font-mono">
      {/* Header with glass effect */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 z-10 w-full"
      >
        <div className="flex items-center text-[rgb(211,212,219)] p-6 justify-between mx-auto max-w-5xl rounded-lg border-transparent bg-neutral-900/20 backdrop-blur-3xl">
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


      {/* Third section - Game introduction */}
      <section className="min-h-screen text-white pt-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-2xl font-bold mb-8">Game Introduction</h2>
          <p className="text-lg">This is gamed introduction!</p>
        </div>
      </section>
      
      {/* First section - Game selection */}
      <section className="pt-32 min-h-screen">
        <main className="flex flex-row justify-between mx-auto px-8 text-neutral-400">
          <div className="flex flex-col gap-20">
            <h2 className="text-xl font-semibold">Game Selection List</h2>
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
            <div className="text-center text-xl font-semibold">Game Categories</div>
            <motion.div className="flex flex-row flex-wrap p-2 max-h-auto max-w-300 mx-auto w-full rounded-lg gap-20 justify-evenly">
              {[
                "Number Sequence Puzzle",
                "Number Sequence Puzzle",
                "Quick Math Challenge",
                "Memory Match Challenge",
                "Tic-Tac-Toe",
                "Word Search",
                "Meditation Game",
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
                    y: [0, -15, 0],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 2,
                      ease: "easeInOut",
                      delay: 0.1 * index
                    }
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: index % 2 == 0 ? 10 : -10,                   
                  }}
                  className="w-1/3 flex-shrink-0 flex-grow-0 border-2 border-white p-6 bg-gray-700 rounded-md text-white cursor-pointer relative overflow-hidden group shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 "
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.05, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                        delay: 0.1 * index
                      }
                    }}
                    whileHover={{
                      opacity: 1,
                      transition: { duration: 0.2 }
                    }}
                  />
                  
                  <div className="relative z-10">{game}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Game Development Time</h2>
          </div>
        </main>
        <div className="text-white">Hello</div>
        <div className="text-white">Hello</div>
        <div className="text-white">Hello</div>
        <div className="text-white">Hello</div>
        <div className="text-white">Hello</div>
      </section>

      {/* Second section - Music player */}
      <section className="min-h-screen bg-black/30 py-16">
        <div className="h-full text-white border mx-auto max-w-5xl p-8 rounded-lg">
          <div className="p-5 text-xl font-semibold">Click to play music!</div>
          <div className="flex flex-row items-center">
            <img src="/icons8-bot-40.png" className="p-10" onClick={handleClick} alt="Music Bot" />
            <button onClick={toggleMusic} className="text-5xl p-4 hover:text-teal-400 transition-colors">
              {isMusicPlaying ? "⏸" : "▶"}
            </button>
          </div>
          <div className="mt-2 p-4" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <audio id="background-music">
            <source src="/SpotiDownloader.com - Penelope - with_myself.mp3" type="audio/mp3" />
          </audio>
        </div>
      </section>

      
    </div>
  );
}