import React, { useState, useEffect } from 'react';
import PlanningEditModal from './PlanningEditModal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Planning.css';
import Sidebar from '../sidebar';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Planning = () => {
  const [plannings, setPlannings] = useState([]);
  const [newPlanning, setNewPlanning] = useState({
    numberOfRooms: '',
    acres: '',
    squareFootage: '',
    image: ''
  });
  const [editingPlanning, setEditingPlanning] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlanning(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      if (files[0].type !== 'image/png') {
        alert('Please upload a PNG file.');
        return;
      }
      try {
        const base64 = await base64Encode(files[0]);
        setNewPlanning(prevState => ({ ...prevState, [name]: base64 }));
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
    }
  };

  const handleAddPlanning = () => {
    fetch('http://localhost:8080/api/planning/addplanning', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlanning),
    })
      .then(response => response.json())
      .then(data => {
        setPlannings(prevPlannings => [...prevPlannings, data]);
        setNewPlanning({
          numberOfRooms: '',
          acres: '',
          squareFootage: '',
          image: ''
        });
        Swal.fire({
          title: 'Success!',
          text: 'Planning added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(error => console.error('Error adding planning:', error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPlanning(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditPlanning = (planning) => {
    console.log("Edit button clicked for planning:", planning);
    setEditingPlanning(planning);
    setIsModalOpen(true);
  };

  const handleUpdatePlanning = () => {
    fetch(`http://localhost:8080/api/planning/${editingPlanning.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingPlanning),
    })
      .then(response => response.json())
      .then(() => {
        setPlannings(prevPlannings => prevPlannings.map(planning => (planning.id === editingPlanning.id ? editingPlanning : planning)));
        setEditingPlanning(null);
        setIsModalOpen(false);
        Swal.fire({
          title: 'Updated!',
          text: 'Planning updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(error => console.error('Error updating planning:', error));
  };

  const handleDeletePlanning = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/api/planning/${id}`, { method: 'DELETE' })
          .then(() => {
            setPlannings(prevPlannings => prevPlannings.filter(planning => planning.id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Planning has been deleted.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          })
          .catch(error => console.error('Error deleting planning:', error));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your planning is safe :)',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  };

  return (
    <div>
    <Sidebar/>
    <div className="planning-container">
      <div className="planning-add-form-container">
        <div className="planning-add-form">
          <h2>Add New Planning</h2>
          <input
            type="text"
            name="numberOfRooms"
            value={newPlanning.numberOfRooms}
            onChange={handleChange}
            placeholder="Number of Rooms (e.g., 1BHK)"
          />
          <input
            type="text"
            name="acres"
            value={newPlanning.acres}
            onChange={handleChange}
            placeholder="Acres"
          />
          <input
            type="text"
            name="squareFootage"
            value={newPlanning.squareFootage}
            onChange={handleChange}
            placeholder="Square Footage"
          />
          <input
            type="file"
            name="image"
            accept=".png"
            onChange={handleFileChange}
          />
          {newPlanning.image && <img src={newPlanning.image} alt="Preview" className="preview-image" />}
          <button onClick={handleAddPlanning}>Add Planning</button>
        </div>
      </div>
      <div className="planning-list">
        {plannings.map(planning => (
          <div key={planning.id} className="planning-item-container">
            {planning.image && <img src={planning.image} alt="Planning" className="planning-item-image" />}
            <div className="planning-item-details">
              <h3>{planning.numberOfRooms}</h3>
              <p>Acres: {planning.acres}</p>
              <p>Square Footage: {planning.squareFootage}</p>
              <div className="planning-item-buttons">
                <button className="edit-button" onClick={() => handleEditPlanning(planning)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeletePlanning(planning.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingPlanning && (
        <PlanningEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planning={editingPlanning}
          onUpdate={(updatedPlanning) => {
            setPlannings(prevPlannings => prevPlannings.map(planning => planning.id === updatedPlanning.id ? updatedPlanning : planning));
          }}
        />
      )}
    </div>
    </div>
  );
};

export default Planning;
