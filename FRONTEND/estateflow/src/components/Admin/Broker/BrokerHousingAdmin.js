import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './BrokerHousingAdmin.css';
import BrokerSidebar from './BrokerSidebar';

const BrokerHousingAdmin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddHousing = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('owner', owner);
        formData.append('estimatedPrice', estimatedPrice);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('image', image);
        formData.append('username', localStorage.getItem('username'));

        try {
            console.log('Sending data to the server...');
            console.log('FormData contents:', {
                title,
                description,
                owner,
                estimatedPrice,
                location,
                category,
                image: image ? image.name : 'No image selected',
                username: localStorage.getItem('username')
            });

            const response = await axios.post('http://localhost:8080/api/brokerhousings/addhousing', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server response:', response.data);

            Swal.fire({
                title: 'Success!',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Error adding housing:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error adding housing: ' + (error.response?.data || error.message),
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
        <div>
        <BrokerSidebar/>
        <div className="broker-housing-admin">
            <h2>Add New Housing</h2>
            <form onSubmit={handleAddHousing}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Owner</label>
                    <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Estimated Price</label>
                    <input type="text" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="file" onChange={handleImageChange} required />
                </div>
                <button type="submit">Add Housing</button>
            </form>
        </div>
    </div>
</div>
    );
};

export default BrokerHousingAdmin;
