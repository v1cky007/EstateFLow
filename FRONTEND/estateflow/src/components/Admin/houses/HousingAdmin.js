import React, { useState, useEffect } from 'react';
import './HousingAdmin.css';
import EditModal from './EditModal';
import Sidebar from '../sidebar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const HousingAdmin = () => {
  const [housings, setHousings] = useState([]);
  const [editingHousing, setEditingHousing] = useState(null);
  const [newHousing, setNewHousing] = useState({
    title: '',
    description: '',
    owner: '',
    estimatedPrice: '',
    location: '',
    category: '',
    image: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['Residential', 'Commercial', 'Industrial', 'Villa', 'Apartment', 'Duplex', 'Penthouse', 'Studio', 'Townhouse', 'Bungalow'];

  useEffect(() => {
    fetch('http://localhost:8080/api/housings/getall')
      .then(response => response.json())
      .then(data => setHousings(data))
      .catch(error => console.error('Error fetching housings:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHousing(prevState => ({ ...prevState, [name]: value }));
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
        setNewHousing(prevState => ({ ...prevState, [name]: base64 }));
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
    }
  };

  const handleAddHousing = () => {
    fetch('http://localhost:8080/api/housings/addhousing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHousing),
    })
      .then(response => response.json())
      .then(data => {
        setHousings(prevHousings => [...prevHousings, data]);
        setNewHousing({
          title: '',
          description: '',
          owner: '',
          estimatedPrice: '',
          location: '',
          category: '',
          image: ''
        });
        Swal.fire({
          title: 'Success!',
          text: 'Housing added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(error => console.error('Error adding housing:', error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingHousing(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditHousing = (housing) => {
    setEditingHousing(housing);
    setIsModalOpen(true);
  };

  const handleUpdateHousing = () => {
    fetch(`http://localhost:8080/api/housings/${editingHousing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingHousing),
    })
      .then(response => response.json())
      .then(() => {
        setHousings(prevHousings => prevHousings.map(housing => (housing.id === editingHousing.id ? editingHousing : housing)));
        setEditingHousing(null);
        setIsModalOpen(false);
        Swal.fire({
          title: 'Updated!',
          text: 'Housing updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(error => console.error('Error updating housing:', error));
  };

  const handleDeleteHousing = (id) => {
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
        fetch(`http://localhost:8080/api/housings/${id}`, { method: 'DELETE' })
          .then(() => {
            setHousings(prevHousings => prevHousings.filter(housing => housing.id !== id));
            Swal.fire({
              title: 'Deleted!',
              text: 'Housing has been deleted.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          })
          .catch(error => console.error('Error deleting housing:', error));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your housing is safe :)',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  };

  return (
    <div>
      <Sidebar />
      <div className="housing-admin-container">
        <main className="admin-main-content">
          <div className="admin-add-housing-form">
            <h2>Add New Housing</h2>
            <input type="text" name="title" placeholder="Title" value={newHousing.title} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={newHousing.description} onChange={handleChange} />
            <input type="text" name="owner" placeholder="Owner" value={newHousing.owner} onChange={handleChange} />
            <input type="text" name="estimatedPrice" placeholder="Estimated Price" value={newHousing.estimatedPrice} onChange={handleChange} />
            <input type="text" name="location" placeholder="Location" value={newHousing.location} onChange={handleChange} />
            <select name="category" value={newHousing.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <input type="file" name="image" onChange={handleFileChange} />
            <button onClick={handleAddHousing}>Add Housing</button>
          </div>

          <div className="admin-housing-list">
            <h2>Housings</h2>
            {housings.map(housing => (
              <div key={housing.id} className="housing-item-container">
                <img src={housing.image} alt={housing.title} className="housing-item-image" />
                <div className="housing-item-details">
                  <h3>{housing.title}</h3>
                  <p>{housing.description}</p>
                  <p>{housing.owner}</p>
                  <p>₹{housing.estimatedPrice}</p>
                  <p>{housing.location}</p>
                  <p>{housing.category}</p>
                  <div className="housing-item-buttons">
                    <button className="edit-button" onClick={() => handleEditHousing(housing)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteHousing(housing.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <EditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Edit Housing</h2>
            <input type="text" name="title" placeholder="Title" value={editingHousing?.title || ''} onChange={handleEditChange} />
            <textarea name="description" placeholder="Description" value={editingHousing?.description || ''} onChange={handleEditChange} />
            <input type="text" name="owner" placeholder="Owner" value={editingHousing?.owner || ''} onChange={handleEditChange} />
            <input type="text" name="estimatedPrice" placeholder="Estimated Price" value={editingHousing?.estimatedPrice || ''} onChange={handleEditChange} />
            <input type="text" name="location" placeholder="Location" value={editingHousing?.location || ''} onChange={handleEditChange} />
            <select name="category" value={editingHousing?.category || ''} onChange={handleEditChange}>
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <button onClick={handleUpdateHousing}>Update Housing</button>
          </EditModal>
        </main>
      </div>
    </div>
  );
};

export default HousingAdmin;
