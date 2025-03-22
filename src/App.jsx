import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./web_page/Home.jsx";
import Task from "./web_page/Task.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </>
  );
}

export default App;