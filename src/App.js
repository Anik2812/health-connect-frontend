import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeartbeat, faUserMd, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import SymptomChecker from './components/SymptomChecker';
import ProviderDirectory from './components/ProviderDirectory';
import HealthTips from './components/HealthTips';
import './styles/App.css';

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="home-container"
  >
    <h1>Welcome to HealthConnect</h1>
    <p>Your one-stop solution for healthcare needs</p>
    <div className="feature-cards">
      <motion.div 
        className="feature-card"
        whileHover={{ scale: 1.05 }}
      >
        <FontAwesomeIcon icon={faHeartbeat} size="3x" className="mb-3" />
        <h3>Symptom Checker</h3>
        <p>Check your symptoms and get instant advice</p>
        <Link to="/symptom-checker" className="btn btn-primary">Try Now</Link>
      </motion.div>
      <motion.div 
        className="feature-card"
        whileHover={{ scale: 1.05 }}
      >
        <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3" />
        <h3>Provider Directory</h3>
        <p>Find healthcare providers in your area</p>
        <Link to="/providers" className="btn btn-primary">Search Providers</Link>
      </motion.div>
      <motion.div 
        className="feature-card"
        whileHover={{ scale: 1.05 }}
      >
        <FontAwesomeIcon icon={faLightbulb} size="3x" className="mb-3" />
        <h3>Health Tips</h3>
        <p>Get daily health tips and advice</p>
        <Link to="/health-tips" className="btn btn-primary">View Tips</Link>
      </motion.div>
    </div>
  </motion.div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">HealthConnect</Link>
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                <FontAwesomeIcon icon={faHome} className="me-1" /> Home
              </Link>
              <Link to="/symptom-checker" className="nav-item nav-link">
                <FontAwesomeIcon icon={faHeartbeat} className="me-1" /> Symptom Checker
              </Link>
              <Link to="/providers" className="nav-item nav-link">
                <FontAwesomeIcon icon={faUserMd} className="me-1" /> Providers
              </Link>
              <Link to="/health-tips" className="nav-item nav-link">
                <FontAwesomeIcon icon={faLightbulb} className="me-1" /> Health Tips
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/providers" element={<ProviderDirectory />} />
            <Route path="/health-tips" element={<HealthTips />} />
          </Routes>
        </main>

        <footer className="footer mt-auto py-3 bg-light">
          <div className="container text-center">
            <span className="text-muted">© 2024 HealthConnect. All rights reserved.</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;