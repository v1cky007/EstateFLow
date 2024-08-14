import React, { useState, useEffect } from 'react';
import './HousingList.css';
import NavBar from './Navbar';

const HousingList = () => {
  const [housings, setHousings] = useState([]);
  const [filteredHousings, setFilteredHousings] = useState([]);
  const [selectedHousing, setSelectedHousing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([
    'Residential', 'Commercial', 'Industrial', 'Villa', 'Apartment', 'Duplex',
    'Penthouse', 'Studio', 'Townhouse', 'Bungalow'
  ]);

  useEffect(() => {
    fetch('http://localhost:8080/api/housings/getall')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHousings(data);
          setFilteredHousings(data);
        } else {
          console.error('Expected an array but got:', data);
          setHousings([]);
          setFilteredHousings([]);
        }
      })
      .catch(error => {
        console.error('Error fetching housings:', error);
        setHousings([]);
        setFilteredHousings([]);
      });
  }, []);

  const applyFilters = () => {
    const filtered = housings.filter(housing => {
      const matchesCategory = category === '' || housing.category.toLowerCase() === category.toLowerCase();
      const matchesLocation = location === '' || housing.location.toLowerCase().includes(location.toLowerCase());
      const matchesMinPrice = minPrice === '' || parseInt(housing.estimatedPrice) >= parseInt(minPrice);
      const matchesMaxPrice = maxPrice === '' || parseInt(housing.estimatedPrice) <= parseInt(maxPrice);

      return matchesCategory && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredHousings(filtered);
  };

  const handleViewDetails = (housing) => {
    setSelectedHousing(housing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='mainbody'>
    <NavBar/>

    <div className="housing-list-container">
      <div className="filter-sidebar">
        <h3>Filter Housings</h3>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Min Price:
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </label>
        <label>
          Max Price:
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="housing-list">
        {filteredHousings.length > 0 ? (
          filteredHousings.map(housing => (
            <div key={housing.id} className="housing-item-container">
              <img src={housing.image} alt={housing.title} className="housing-item-image" />
              <div className="housing-item-details">
                <h3>{housing.title}</h3>
                <p>{housing.description}</p>
                <p>{housing.owner}</p>
                <p>&#8377;{housing.estimatedPrice}</p>
                <p>{housing.location}</p>
                <p>{housing.category}</p>
                <button className="view-details-button" onClick={() => handleViewDetails(housing)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No housings found</p>
        )}
      </div>
      {isModalOpen && selectedHousing && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-button" onClick={handleCloseModal}>X</button>
            <h2 className="modal-details-title">{selectedHousing.title}</h2>
            <img className="modal-details-image" src={selectedHousing.image} alt={selectedHousing.title} />
            <div className="modal-details-text">
              <p><strong>Description:</strong> {selectedHousing.description}</p>
              <p><strong>Owner:</strong> {selectedHousing.owner}</p>
              <p><strong>Estimated Price:</strong> &#8377;{selectedHousing.estimatedPrice}</p>
              <p><strong>Location:</strong> {selectedHousing.location}</p>
              <p><strong>Category:</strong> {selectedHousing.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default HousingList;
