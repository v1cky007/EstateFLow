import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, onClose, house, onSave, isEditing, onEdit, onDelete }) => {
  const [editedHouse, setEditedHouse] = useState(house || { name: '', description: '', image: '' });

  useEffect(() => {
    if (house) {
      setEditedHouse(house);
    }
  }, [house]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedHouse({ ...editedHouse, [name]: value });
  };

  const handleSave = () => {
    onSave(editedHouse);
  };

  const handleDelete = () => {
    if (house) {
      onDelete(house.id);
    }
  };

  return (
    <div className="modal-overlay-container">
      <div className="modal-content-container">
        <button className="modal-close-button" onClick={onClose}>X</button>
        {house ? (
          <>
            {isEditing ? (
              <div className="modal-edit-form">
                <input
                  type="text"
                  name="name"
                  value={editedHouse.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="modal-input"
                />
                <input
                  type="text"
                  name="description"
                  value={editedHouse.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="modal-input"
                />
                <input
                  type="text"
                  name="image"
                  value={editedHouse.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="modal-input"
                />
                <button onClick={handleSave} className="modal-save-button">Save</button>
              </div>
            ) : (
              <>
                <img src={house.image} alt={house.name} className="modal-house-image" />
                <h2 className="modal-house-title">{house.name}</h2>
                <p className="modal-house-description">{house.description}</p>
                <button onClick={onEdit} className="modal-edit-button">Edit</button>
                <button onClick={handleDelete} className="modal-delete-button">Delete</button>
              </>
            )}
          </>
        ) : (
          <p className="modal-no-data">No house data available</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
