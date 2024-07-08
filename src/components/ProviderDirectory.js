import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderDirectory = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/providers');
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(search.toLowerCase()) ||
    provider.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Healthcare Provider Directory</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search providers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredProviders.map(provider => (
          <div key={provider._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{provider.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{provider.specialty}</h6>
                <p className="card-text">{provider.address}</p>
                <p className="card-text">Phone: {provider.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderDirectory;
