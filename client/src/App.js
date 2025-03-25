import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Task from './pages/task';
import UpdateTask from './components/update-task';
import CreateTask from './components/create-task';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element = {<Login />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/task" element = {<Task />} />
        <Route path="/update-task/:id" element = {<UpdateTask />} />
        <Route path="/create-task/" element = {<CreateTask />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
