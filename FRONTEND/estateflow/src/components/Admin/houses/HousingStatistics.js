import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HousingStatistics.css'; // Ensure the correct path to your CSS file

const HousingStatistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/housings/statistics')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the housing statistics!", error);
      });
  }, []);

  return (
    <div className="stats-container">
      {Object.keys(stats).map((key) => (
        <div className="stat-card" key={key}>
          <h2>{key === 'totalHousings' ? 'Total Houses' : key.charAt(0).toUpperCase() + key.slice(1)}</h2>
          <p>{stats[key]}</p>
        </div>
      ))}
    </div>
  );
};

export default HousingStatistics;
