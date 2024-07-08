import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/ProviderDirectory.css';

const ProviderDirectory = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/providers');
      setProviders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching providers:', error);
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(search.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="provider-directory container mt-4"
    >
      <h2 className="text-center mb-4">Healthcare Provider Directory</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search providers by name or specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredProviders.map(provider => (
            <motion.div 
              key={provider._id} 
              className="col-md-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card provider-card">
                <div className="card-body">
                  <h5 className="card-title">{provider.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{provider.specialty}</h6>
                  <p className="card-text">{provider.address}</p>
                  <p className="card-text">Phone: {provider.phone}</p>
                  <motion.button 
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProviderDirectory;