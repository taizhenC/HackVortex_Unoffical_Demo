import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
//yzc
export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });

  // Check for winner after each move
  useEffect(() => {
    const checkWinner = () => {
      const lines = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6], // diagonal
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          // Update scores
          setScores(prevScores => ({
            ...prevScores,
            [board[a]]: prevScores[board[a]] + 1
          }));
          return;
        }
      }

      // Check for draw
      if (!board.includes(null) && !winner) {
        setIsDraw(true);
        setScores(prevScores => ({
          ...prevScores,
          ties: prevScores.ties + 1
        }));
      }
    };

    checkWinner();
  }, [board, winner]);

  const handleClick = (index) => {
    // Don't allow moves if there's a winner or square is filled
    if (winner || board[index] || isDraw) return;

    // Create a copy of the board
    const newBoard = [...board];
    // Make the move
    newBoard[index] = isXNext ? 'X' : 'O';
    
    // Update the board
    setBoard(newBoard);
    // Switch player
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const renderSquare = (index) => {
    return (
      <motion.button
        className={`w-20 h-20 bg-gray-800 text-4xl flex items-center justify-center 
                   ${board[index] === 'X' ? 'text-blue-400' : 'text-red-400'} 
                   rounded-md hover:bg-gray-700 focus:outline-none`}
        onClick={() => handleClick(index)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 }}
      >
        {board[index]}
      </motion.button>
    );
  };

  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
      ? "It's a draw!" 
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-32 flex flex-col items-center font-mono">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tic Tac Toe
      </motion.h1>
      
      {/* Game board */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="status text-xl mb-4 text-center">{status}</div>
        <div className="grid grid-cols-3 gap-2">
          {board.map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Controls */}
      <motion.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          className="px-6 py-3 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Game
        </motion.button>
        
        {/* Score display */}
        <div className="mt-6 p-4 bg-gray-800 rounded-md">
          <h2 className="text-xl mb-2 text-center">Score</h2>
          <div className="flex justify-around gap-8">
            <div className="text-center">
              <div className="text-blue-400 text-lg">X</div>
              <div className="text-2xl">{scores.X}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-lg">Ties</div>
              <div className="text-2xl">{scores.ties}</div>
            </div>
            <div className="text-center">
              <div className="text-red-400 text-lg">O</div>
              <div className="text-2xl">{scores.O}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}