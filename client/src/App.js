import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
