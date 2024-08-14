import React from 'react';
import './Quote.css'; // Add custom styles

const Quote = () => {
  return (
    <div className="quote-section" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
      <div className="quote-text">
        <h1>“Your ultimate destination for buying, selling, and planning your dream home.”</h1>
      </div>
    </div>
  );
};

export default Quote;
