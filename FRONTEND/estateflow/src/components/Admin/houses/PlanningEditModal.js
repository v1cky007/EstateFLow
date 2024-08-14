import React, { useState, useEffect } from 'react';
import './PlanningEditModal.css';

const PlanningEditModal = ({ isOpen, onClose, planning, onUpdate }) => {
  const [numberOfRooms, setNumberOfRooms] = useState(planning.numberOfRooms);
  const [acres, setAcres] = useState(planning.acres);
  const [squareFootage, setSquareFootage] = useState(planning.squareFootage);
  const [image, setImage] = useState(planning.image);

  useEffect(() => {
    setNumberOfRooms(planning.numberOfRooms);
    setAcres(planning.acres);
    setSquareFootage(planning.squareFootage);
    setImage(planning.image);
  }, [planning]);

  const handleUpdate = async () => {
    const updatedPlanning = { ...planning, numberOfRooms, acres, squareFootage, image };
    try {
      const response = await fetch(`http://localhost:8080/api/planning/${planning.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlanning),
      });
      const data = await response.json();
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error("Error updating planning:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
        <button className="edit-modal-close" onClick={onClose}>X</button>
        <h2>Edit Planning</h2>
        <input
          type="text"
          placeholder="Number of Rooms"
          value={numberOfRooms}
          onChange={(e) => setNumberOfRooms(e.target.value)}
        />
        <input
          type="text"
          placeholder="Acres"
          value={acres}
          onChange={(e) => setAcres(e.target.value)}
        />
        <input
          type="text"
          placeholder="Square Footage"
          value={squareFootage}
          onChange={(e) => setSquareFootage(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <img src={image} alt="Preview" className="preview-image" />}
        <div className="button-container">
          <button className="update-btn" onClick={handleUpdate}>Update Planning</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PlanningEditModal;
