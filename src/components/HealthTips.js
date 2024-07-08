import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import '../styles/HealthTips.css';

const healthTips = [
  "Stay hydrated by drinking at least 8 glasses of water a day.",
  "Aim for 7-9 hours of sleep each night for optimal health.",
  "Incorporate 30 minutes of moderate exercise into your daily routine.",
  "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
  "Practice mindfulness or meditation to reduce stress.",
  "Limit processed foods and sugary drinks in your diet.",
  "Get regular health check-ups and screenings.",
  "Wash your hands frequently to prevent the spread of germs.",
  "Wear sunscreen to protect your skin from harmful UV rays.",
  "Take breaks and stretch regularly if you sit for long periods.",
];

const HealthTips = () => {
  const [currentTip, setCurrentTip] = useState('');

  useEffect(() => {
    getRandomTip();
  }, []);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setCurrentTip(healthTips[randomIndex]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="health-tips container mt-4"
    >
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faLightbulb} className="me-2" />
        Daily Health Tips
      </h2>
      <div className="tip-container">
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="tip-card"
        >
          <p>{currentTip}</p>
        </motion.div>
        <motion.button
          className="btn btn-primary mt-3"
          onClick={getRandomTip}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Another Tip
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HealthTips;