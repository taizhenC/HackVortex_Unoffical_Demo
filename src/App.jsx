import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./web_page/Home.jsx";
import Task from "./web_page/Task.jsx";
import TicTacToe from "./web_page/TicTacToe.jsx";
import QuickMath from "./web_page/QuickMath.jsx";  // From pdx branch
import MemoryGame from "./web_page/memorygame.jsx";  // From pdx branch
import WordCompletionGame from "./web_page/WordCompletionGame.jsx";  // From main branch

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/fastmath" element={<QuickMath />} />  // From pdx branch
        <Route path="/memorygame" element={<MemoryGame />} />  // From pdx branch
        <Route path="/word-game" element={<WordCompletionGame />} />  // From main branch
      </Routes>
    </>
  );
}

export default App;
