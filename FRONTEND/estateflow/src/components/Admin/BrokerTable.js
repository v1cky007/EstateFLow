import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import './BrokerTable.css'; // External CSS file
import Sidebar from './sidebar';
const BrokerTable = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/brokers');
      console.log('Fetched brokers:', response.data); // Log the fetched data
      setBrokers(response.data);
    } catch (error) {
      console.error('Error fetching brokers', error);
    }
  };

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to approve this broker?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50', // Green
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Fetch broker details
        axios.get(`http://localhost:8080/api/brokers/${id}`)
          .then(response => {
            const broker = response.data;
            const { name, email, password } = broker; // Extract only the required fields

            // Save broker data for use in the email
            const brokerData = { name, email, password };

            // Post broker data to broker-details and then delete the broker
            return axios.post('http://localhost:8080/api/broker-details', brokerData)
              .then(() => axios.delete(`http://localhost:8080/api/brokers/${id}`))
              .then(() => {
                console.log('Sending email...');
                return emailjs.send('service_fu97gas', 'template_koknjat', {
                  to_email: brokerData.email,
                  from_name: 'Your Company Name',
                  broker_name: brokerData.name,
                  broker_password: brokerData.password,
                }, 'EwrF_RT3IiStPWpIJ');
              })
              .then(response => {
                console.log('Email sent successfully:', response);
                Swal.fire(
                  'Approved!',
                  'The broker has been approved and an email has been sent.',
                  'success'
                );
                fetchBrokers(); // Refetch brokers to update the table
              })
              .catch(error => {
                console.error('Error during broker approval process:', error);
                Swal.fire(
                  'Error!',
                  'There was a problem during the broker approval process.',
                  'error'
                );
              });
          })
          .catch(error => {
            console.error('Error fetching broker details:', error);
            Swal.fire(
              'Error!',
              'There was a problem fetching broker details.',
              'error'
            );
          });
      }
    });
  };

  const handleDeny = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deny this broker?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f44336', // Red
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deny',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/brokers/${id}`)
          .then(() => {
            Swal.fire(
              'Denied!',
              'The broker has been denied.',
              'success'
            );
            fetchBrokers(); // Refetch brokers to update the table
          })
          .catch(error => {
            console.error('Error denying broker', error);
            Swal.fire(
              'Error!',
              'There was a problem denying the broker.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div>
      <Sidebar/>
    <div className="broker-table-container">
      <h2>Broker List</h2>
      <table className="broker-table">
        <thead className="broker-thead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="broker-tbody">
          {brokers.length === 0 ? (
            <tr>
              <td colSpan="5">No brokers available.</td>
            </tr>
          ) : (
            brokers.map((broker) => (
              <tr key={broker.id}>
                <td>{broker.id}</td>
                <td>{broker.name}</td>
                <td>{broker.email}</td>
                <td>{broker.phone}</td>
                <td>
                  <button 
                    className="broker-btn-approve"
                    onClick={() => handleApprove(broker.id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="broker-btn-deny"
                    onClick={() => handleDeny(broker.id)}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default BrokerTable;
