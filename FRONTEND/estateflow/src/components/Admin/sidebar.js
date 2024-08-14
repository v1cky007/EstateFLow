import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  const handleSignOutClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to sign out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'No, stay',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear local storage
        localStorage.clear(); // Or use specific items if needed, e.g., localStorage.removeItem('username');

        // Redirect to home page
        navigate('/'); 

        // Display success message
        Swal.fire(
          'Signed Out!',
          'You have been signed out successfully.',
          'success'
        );
      }
    });
  };

  return (
    <>
      <div className={`sidebar ${isClosed ? 'close' : ''}`}>
        <div className="logo-details">
          <i className='bx bxs-home'></i>
          <span className="logo_name">HomeNest</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dash">
              <i className='bx bx-grid-alt'></i>
              <span className="link_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/add">
              <i className='bx bxs-home-smile'></i>
              <span className="link_name">Houses</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/plan">
              <i className='bx bxs-home-smile'></i>
              <span className="link_name">Planning</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/broker">
              <i className='bx bxs-home-smile'></i>
              <span className="link_name">Broker Request</span>
            </Link>
          </li>
          
          <li>
            <Link to="/users">
              <i className="fa-regular fa-user"></i>
              <span className="link_name">Users</span>
            </Link>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <img src="image/profile.jpg" alt="profileImg"/> */}
              </div>
              <div className="name-job">
                <div className="profile_name" onClick={handleSignOutClick}>Sign Out</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
