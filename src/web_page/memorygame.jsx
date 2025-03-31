import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// List of emojis to be used for the cards
const allEmojis = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍑', '🥝', '🍍'];

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MemoryGame() {
  // All cards in play
  const [cards, setCards] = useState([]);
  // Currently flipped cards (by id)
  const [flipped, setFlipped] = useState([]);
  // Matched emojis
  const [matched, setMatched] = useState([]);
  // Number of moves made
  const [moves, setMoves] = useState(0);

  // On component mount, generate the cards by duplicating and shuffling emojis
  useEffect(() => {
    const doubleEmojis = shuffleArray([...allEmojis, ...allEmojis]);
    const cardSet = doubleEmojis.map((emoji, index) => ({ id: index, emoji, flipped: false }));
    setCards(cardSet);
  }, []);

  // Function to handle flipping a card
  const handleFlip = (card) => {
    // Prevent flipping more than two or re-flipping same or matched cards
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.emoji)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id));
      if (first.emoji === second.emoji) {
        // If matched, add emoji to matched list
        setMatched([...matched, first.emoji]);
      }
      // Reset flipped cards after a short delay
      setTimeout(() => setFlipped([]), 1000);
    }
  };

  // Function to restart the game
  const resetGame = () => {
    const doubleEmojis = shuffleArray([...allEmojis, ...allEmojis]);
    const cardSet = doubleEmojis.map((emoji, index) => ({ id: index, emoji, flipped: false }));
    setCards(cardSet);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-20 font-mono">
      {/* Game title */}
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Memory Game
      </motion.h1>

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => {
          // Determine if the card should be shown (flipped or matched)
          const isFlipped = flipped.includes(card.id) || matched.includes(card.emoji);
          return (
            <motion.button
              key={card.id}
              className="w-20 h-20 text-3xl flex items-center justify-center bg-gray-800 rounded-md hover:bg-gray-700"
              onClick={() => handleFlip(card)}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Show emoji or question mark */}
              {isFlipped ? card.emoji : '❓'}
            </motion.button>
          );
        })}
      </div>

      {/* Move counter */}
      <div className="mt-6 text-lg">Moves: {moves}</div>

      {/* Win message */}
      {matched.length === allEmojis.length && (
        <motion.div
          className="mt-4 text-green-400 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          You matched all cards!
        </motion.div>
      )}

      {/* Restart button */}
      <motion.button
        className="mt-6 px-6 py-3 bg-indigo-600 rounded-md hover:bg-indigo-700"
        onClick={resetGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Restart
      </motion.button>
    </div>
  );
}