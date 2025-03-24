import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './pages/register';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/register" element = {<Register />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
