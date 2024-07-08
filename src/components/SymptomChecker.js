import React, { useState } from 'react';
import axios from 'axios';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/symptom-checker', { symptoms });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="symptoms">Describe your symptoms:</label>
          <textarea
            className="form-control"
            id="symptoms"
            rows="3"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-2">Check Symptoms</button>
      </form>
      {result && (
        <div className="mt-4">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;