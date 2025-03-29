import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./web_page/Home.jsx";
import Task from "./web_page/Task.jsx";
import TicTacToe from "./web_page/TicTacToe.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
      </Routes>
    </>
  );
}

export default App;