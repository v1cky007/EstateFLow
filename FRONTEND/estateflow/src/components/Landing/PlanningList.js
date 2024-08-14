import React, { useState, useEffect } from 'react';
import './PlanningList.css';

const PlanningList = () => {
  const [plannings, setPlannings] = useState([]);
  const [filters, setFilters] = useState({
    numberOfRooms: '',
    acres: '',
    squareFootage: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/planning/getall')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlannings(data);
        } else {
          console.error('Fetched data is not an array');
        }
      })
      .catch(error => console.error('Error fetching plannings:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(filters).toString();
    fetch(`http://localhost:8080/api/planning/filter?${query}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlannings(data);
        } else {
          console.error('Fetched data is not an array');
        }
      })
      .catch(error => console.error('Error fetching filtered plannings:', error));
  };

  return (
    <div className="mainbody">
      <div className="housing-list-container">
        <div className="filter-sidebar">
          <form onSubmit={handleFilterSubmit}>
            <label>
              Number of Rooms:
              <input
                type="text"
                name="numberOfRooms"
                value={filters.numberOfRooms}
                onChange={handleFilterChange}
                placeholder="Number of Rooms"
              />
            </label>
            <label>
              Acres:
              <input
                type="text"
                name="acres"
                value={filters.acres}
                onChange={handleFilterChange}
                placeholder="Acres"
              />
            </label>
            <label>
              Square Footage:
              <input
                type="text"
                name="squareFootage"
                value={filters.squareFootage}
                onChange={handleFilterChange}
                placeholder="Square Footage"
              />
            </label>
            <button type="submit">Filter</button>
          </form>
        </div>
        <div className="housing-list">
          {plannings.map(planning => (
            <div key={planning.id} className="housing-item-container">
              {planning.image && <img src={planning.image} alt="Planning" className="housing-item-image" />}
              <div className="housing-item-details">
                <h3>{planning.numberOfRooms}</h3>
                <p>Acres: {planning.acres}</p>
                <p>Square Footage: {planning.squareFootage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningList;
