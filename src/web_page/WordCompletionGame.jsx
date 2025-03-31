import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WordCompletionGame() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  // Word library categorized by difficulty
  const wordLibrary = {
    easy: [
      { original: 'APPLE', masked: 'A__LE' },
      { original: 'HOUSE', masked: 'H_U_E' },
      { original: 'SMILE', masked: 'S_I_E' },
      { original: 'BEACH', masked: 'B__CH' },
      { original: 'LIGHT', masked: 'L_G_T' },
      { original: 'CHAIR', masked: 'C_A_R' },
      { original: 'TABLE', masked: 'T_B_E' },
      { original: 'WATER', masked: 'W_T_R' },
    ],
    medium: [
      { original: 'JOURNEY', masked: 'J__RN_Y' },
      { original: 'DIAMOND', masked: 'D__M_ND' },
      { original: 'MYSTERY', masked: 'M_ST__Y' },
      { original: 'VICTORY', masked: 'V_CT__Y' },
      { original: 'AWESOME', masked: 'A__S_ME' },
      { original: 'FREEDOM', masked: 'F__ED_M' },
      { original: 'PATTERN', masked: 'P_TT__N' },
      { original: 'QUALITY', masked: 'QU_L__Y' },
    ],
    hard: [
      { original: 'ALGORITHM', masked: 'A_G_R_T_M' },
      { original: 'ASTRONAUT', masked: 'A_TR_N__T' },
      { original: 'KNOWLEDGE', masked: 'K__WL_DG_' },
      { original: 'AMBITIOUS', masked: 'A_B_T__US' },
      { original: 'TECHNIQUE', masked: 'T_CHN_Q__' },
      { original: 'EDUCATION', masked: 'ED_C_T__N' },
      { original: 'CHALLENGE', masked: 'CH_LL_NG_' },
      { original: 'ELABORATE', masked: 'E__B_R_TE' },
    ],
    expert: [
      { original: 'VOCABULARY', masked: 'V_C_B_L_RY' },
      { original: 'PHENOMENAL', masked: 'PH_N_M_N_L' },
      { original: 'EXTRAORDINARY', masked: 'E_TR__RD_N_RY' },
      { original: 'COMMUNICATION', masked: 'C_MM_N_C_T__N' },
      { original: 'PROCRASTINATE', masked: 'PR_CR_ST_N_TE' },
      { original: 'SOPHISTICATED', masked: 'S_PH_ST_C_T_D' },
      { original: 'INTELLIGENCE', masked: 'INT_LL_G_NC_' },
      { original: 'OPPORTUNITY', masked: 'OPP_RT_N_TY' },
    ],
  };

  // Get difficulty based on level
  const getDifficulty = () => {
    if (level <= 5) return 'easy';
    if (level <= 10) return 'medium';
    if (level <= 15) return 'hard';
    return 'expert';
  };

  // Get a random word from the library based on current difficulty
  const getRandomWord = () => {
    const difficulty = getDifficulty();
    const words = wordLibrary[difficulty];
    return words[Math.floor(Math.random() * words.length)];
  };

  // Start a new game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    nextWord();
    setTimerRunning(true);
    setTimer(30);
  };

  // Set up the next word
  const nextWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setUserInput('');
    setFeedback('');
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // Handle user input change
  const handleInputChange = (e) => {
    // Only allow letters
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
    setUserInput(value);
  };

  // Check the user's answer
  const checkAnswer = () => {
    if (userInput.toUpperCase() === currentWord.original) {
      setIsCorrect(true);
      setScore(score + 10 * level);
      setFeedback('Correct! Great job!');
      
      if (level >= 20) {
        setGameWon(true);
        setTimerRunning(false);
      } else {
        setLevel(level + 1);
        setTimeout(() => {
          nextWord();
          setTimer(30); // Reset timer for next level
        }, 1500);
      }
    } else {
      setIsCorrect(false);
      setLives(lives - 1);
      setFeedback(`Wrong! The correct word was: ${currentWord.original}`);
      
      if (lives <= 1) {
        setGameOver(true);
        setTimerRunning(false);
      } else {
        setTimeout(() => {
          nextWord();
          setTimer(30); // Reset timer for next level
        }, 1500);
      }
    }
    setShowFeedback(true);
  };

  // Handle submit (when user presses Enter)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput && !showFeedback) {
      checkAnswer();
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && timerRunning) {
      setLives(lives - 1);
      setFeedback(`Time's up! The correct word was: ${currentWord.original}`);
      setShowFeedback(true);
      
      if (lives <= 1) {
        setGameOver(true);
        setTimerRunning(false);
      } else {
        setTimeout(() => {
          nextWord();
          setTimer(30); // Reset timer for next level
        }, 1500);
      }
    }
    
    return () => clearInterval(interval);
  }, [timer, timerRunning]);

  const renderGameContent = () => {
    if (gameOver) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-red-500">Game Over</h2>
          <p className="text-xl mb-4">Your final score: {score}</p>
          <p className="text-lg mb-8">You reached level {level}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold"
          >
            Play Again
          </motion.button>
        </motion.div>
      );
    } else if (gameWon) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-500">You Won!</h2>
          <p className="text-xl mb-4">Your final score: {score}</p>
          <p className="text-lg mb-8">You completed all 20 levels!</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold"
          >
            Play Again
          </motion.button>
        </motion.div>
      );
    } else if (!gameStarted) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Word Completion Challenge</h2>
          <p className="text-lg mb-6">Fill in the missing letters to complete the word!</p>
          <ul className="text-left mb-8 max-w-md mx-auto">
            <li className="mb-2">• You have 30 seconds per word</li>
            <li className="mb-2">• 3 lives to start with</li>
            <li className="mb-2">• Words get harder as you progress</li>
            <li className="mb-2">• Complete 20 levels to win</li>
          </ul>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg font-semibold"
          >
            Start Game
          </motion.button>
        </motion.div>
      );
    }

    return (
      <div className="max-w-md w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-semibold">
            Level: {level}
          </div>
          <div className="text-lg font-semibold">
            Lives: {Array(lives).fill('❤️').join('')}
          </div>
          <div className="text-lg font-semibold">
            Score: {score}
          </div>
        </div>
        
        <div className="mb-3 text-center">
          <div className={`text-lg font-semibold ${timer <= 10 ? 'text-red-500' : ''}`}>
            Time: {timer}s
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div 
              className={`h-2.5 rounded-full ${timer <= 10 ? 'bg-red-600' : 'bg-blue-600'}`} 
              style={{ width: `${(timer / 30) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-center">Complete this word:</h3>
          <div className="text-4xl text-center font-mono tracking-widest my-6 font-bold">
            {currentWord?.masked}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Enter the complete word"
              disabled={showFeedback}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              autoFocus
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!userInput || showFeedback}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              !userInput || showFeedback ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Submit Answer
          </motion.button>
        </form>
        
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-center mb-4 ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {feedback}
          </motion.div>
        )}
        
        <div className="text-sm text-gray-500 mt-6 text-center">
          <p>Tip: Focus on the pattern of the word and common letter combinations.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl"
        >
          {renderGameContent()}
        </motion.div>
      </div>
    </div>
  );
}