import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./web_page/Home.jsx";
import Task from "./web_page/Task.jsx";
import TicTacToe from "./web_page/TicTacToe.jsx";
import QuickMath from "./web_page/QuickMath.jsx";
import MemoryGame from "./web_page/memorygame.jsx";
//yzc
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/fastmath" element={<QuickMath />} />
        <Route path="/memorygame" element={<MemoryGame />} />
      </Routes>
    </>
  );
}

export default App;