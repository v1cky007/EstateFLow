import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './JoinUsForm.css'; // External CSS file

const JoinUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/brokers', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your application has been sent successfully.',
      });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="join-us-form-container">
      <div className="join-us-form-wrapper">
        <div className="join-us-form-left">
          <div className="join-us-form-left-inner">
            <h2 className="join-us-form-h2">Join Us as a Broker</h2>
            <p>If you have the passion and drive to succeed in the real estate industry, we want to hear from you.</p>
            <br />
            <p>Fill out the form and let's get started.</p>
          </div>
        </div>
        <div className="join-us-form-right">
          <div className="join-us-form-right-inner">
            <form onSubmit={handleSubmit}>
              <h2 className="join-us-form-lg-view join-us-form-h2">Join Us</h2>
              <h2 className="join-us-form-sm-view join-us-form-h2">Become a Broker</h2>
              <p>* Required</p>
              <input
                type="text"
                className="join-us-form-input"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                className="join-us-form-input"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                className="join-us-form-input"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="join-us-form-input"
                name="password"
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="join-us-form-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinUsForm;
