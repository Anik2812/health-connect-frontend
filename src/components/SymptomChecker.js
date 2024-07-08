import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faClipboardList, faUserMd } from '@fortawesome/free-solid-svg-icons';
import '../styles/SymptomChecker.css';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Added for error handling

  const commonSymptoms = [
    'Fever', 'Cough', 'Fatigue', 'Shortness of breath', 'Headache',
    'Body aches', 'Sore throat', 'Nausea', 'Diarrhea', 'Loss of taste or smell',
    'Runny nose', 'Sneezing', 'Chest pain', 'Dizziness', 'Vomiting',
    'Rash', 'Joint pain', 'Chills', 'Sweating', 'Loss of appetite'
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
    setError(null);  // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:5000/symptom-checker', { symptoms });
      console.log('Fetched symptoms:', response.data);

      // Check if response.data.result is an array
      if (Array.isArray(response.data.result)) {
        setResult(response.data.result);
      } else {
        console.error('API response result is not an array:', response.data.result);
        setResult(['An error occurred. Please try again.']);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult([]);
      setError('An error occurred. Please try again.');  // Set error message
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
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faHeartbeat} className="me-2" />
        Symptom Checker
      </h2>
      <div className="row">
        <div className="col-md-6">
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
              className="btn btn-primary mt-4 w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={symptoms.length === 0 || loading}
            >
              {loading ? 'Checking...' : 'Check Symptoms'}
            </motion.button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="selected-symptoms">
            <h4>
              <FontAwesomeIcon icon={faClipboardList} className="me-2" />
              Selected Symptoms
            </h4>
            {symptoms.length > 0 ? (
              <ul>
                {symptoms.map((symptom, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {symptom}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p>No symptoms selected</p>
            )}
          </div>
        </div>
      </div>
      {error && (
        <motion.div 
          className="error mt-4 text-danger"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.div>
      )}
      {result.length > 0 && (
        <motion.div 
          className="result mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>
            <FontAwesomeIcon icon={faUserMd} className="me-2" />
            Results:
          </h3>
          <ul>
            {result.map((advice, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {advice}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymptomChecker;
