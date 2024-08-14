import React from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
        <button className="edit-modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default EditModal;
