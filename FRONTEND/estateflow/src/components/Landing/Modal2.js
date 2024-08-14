import React from 'react';
import './Modal2.css';

const Modal2 = ({ show, onClose, house }) => {
  if (!show) return null;

  return (
    <div className="modal2-overlay">
      <div className="modal2-content">
        <button className="modal2-close" onClick={onClose}>X</button>
        {house && (
          <>
            <img src={house.image} alt={house.name} className="modal2-image" />
            <h2 className="modal2-title">{house.name}</h2>
            <p className="modal2-description">{house.description}</p>
          </>
        )}
      </div> 
    </div>
  );
};

export default Modal2;
