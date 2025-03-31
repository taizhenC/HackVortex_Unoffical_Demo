import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function FastMathGame() {
  const [startNumber, setStartNumber] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  // Generate questions when the component mounts or startNumber changes
  useEffect(() => {
    setQuestions(generateQuestions(startNumber));
  }, [startNumber]);

  // Start timer and update every second if game is not over
  useEffect(() => {
    let timer;
    if (!gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Clean up the timer when component unmounts or game ends
  }, [gameOver]);

  // Function to generate 8 math questions
  const generateQuestions = (start) => {
    const ops = ['+', '-', '*', '/'];
    const questions = [];
    let current = start;

    for (let i = 0; i < 8; i++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      const num = Math.floor(Math.random() * 9) + 1;

      // Ensure division results in whole number
      if (op === '/' && current % num !== 0) {
        i--;
        continue;
      }

      const expr = `${current} ${op} ${num}`;
      const result = eval(expr); // Evaluate expression (be careful in real-world apps)

      questions.push({
        expression: expr,
        correctAnswer: Math.round(result), // Round off to avoid decimal mismatch
      });

      current = result; // Use result as starting number for next question
    }
    return questions;
  };

  // Handle answer submission
  const handleSubmit = () => {
    const currentQ = questions[currentIndex];
    const correct = parseInt(userAnswer) === currentQ.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      if (currentIndex < questions.length - 1) {
        // Move to next question after short delay
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setUserAnswer('');
          setIsCorrect(null);
        }, 500);
      } else {
        // End game if last question is reached
        setTimeout(() => {
          setGameOver(true);
        }, 500);
      }
    } else {
      // Deduct score if incorrect (but not below 0)
      setScore(score > 0 ? score - 1 : 0);
    }
  };

  // Reset game to initial state
  const resetGame = () => {
    setStartNumber(10);
    setQuestions(generateQuestions(10));
    setCurrentIndex(0);
    setUserAnswer('');
    setIsCorrect(null);
    setScore(0);
    setGameOver(false);
    setTime(0);
  };

  // Current question object
  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-32 flex flex-col items-center font-mono">
      {/* Game title */}
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Fast Math Game
      </motion.h1>

      {/* Game content when not over */}
      {!gameOver ? (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Question progress */}
          <div className="text-xl">
            Question {currentIndex + 1} of {questions.length}
          </div>

          {/* Current expression */}
          <div className="text-3xl font-semibold">
            {currentQuestion?.expression} = ?
          </div>

          {/* Input for user's answer */}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className={`px-4 py-2 rounded-md text-black text-xl focus:outline-none 
              ${isCorrect === null ? 'bg-white' : isCorrect ? 'bg-green-300' : 'bg-red-300'}`}
          />

          {/* Submit button */}
          <motion.button
            className="px-6 py-3 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>

          {/* Score and timer */}
          <div className="text-lg mt-2">Score: {score}</div>
          <div className="text-lg">Time: {time}s</div>
        </motion.div>
      ) : (
        // Game over view
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl mb-4">Game Over!</div>
          <div className="text-xl mb-2">Final Score: {score} / {questions.length}</div>
          <div className="text-xl mb-6">Total Time: {time} seconds</div>

          {/* Reset button */}
          <motion.button
            className="px-6 py-3 bg-green-600 rounded-md hover:bg-green-700 focus:outline-none"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
