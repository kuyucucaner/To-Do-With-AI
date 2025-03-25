import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Task from './pages/task';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/task" element = {<Task />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
