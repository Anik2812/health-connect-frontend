import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/SymptomChecker.css';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const commonSymptoms = [
    'Fever', 'Cough', 'Fatigue', 'Shortness of breath', 'Headache',
    'Body aches', 'Sore throat', 'Nausea', 'Diarrhea', 'Loss of taste or smell'
  ];

  const handleSymptomToggle = (symptom) => {
    setSymptoms(prevSymptoms => 
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter(s => s !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/symptom-checker', { symptoms });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="symptom-checker container mt-4"
    >
      <h2 className="text-center mb-4">Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <div className="symptom-list">
          {commonSymptoms.map((symptom) => (
            <motion.button
              key={symptom}
              type="button"
              className={`symptom-btn ${symptoms.includes(symptom) ? 'active' : ''}`}
              onClick={() => handleSymptomToggle(symptom)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {symptom}
            </motion.button>
          ))}
        </div>
        <motion.button 
          type="submit" 
          className="btn btn-primary mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={symptoms.length === 0 || loading}
        >
          {loading ? 'Checking...' : 'Check Symptoms'}
        </motion.button>
      </form>
      {result && (
        <motion.div 
          className="result mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Result:</h3>
          <p>{result}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymptomChecker;