import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SymptomChecker from './components/SymptomChecker';
import ProviderDirectory from './components/ProviderDirectory';

const Home = () => <h2>Welcome to HealthConnect</h2>;

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">HealthConnect</Link>
          <div className="navbar-nav">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/symptom-checker" className="nav-item nav-link">Symptom Checker</Link>
            <Link to="/providers" className="nav-item nav-link">Providers</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/providers" element={<ProviderDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;