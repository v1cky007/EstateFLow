import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './NavBar.css';
import homenest from "./assets/images/homenest.png";

const NavBar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('username'); 
    };

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLogoutClick = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username'); // Clear username from local storage
        setUsername(''); // Clear username from state
        Swal.fire({
          title: 'Logged out!',
          icon: 'success',
          text: 'You have been logged out.',
        }).then(() => {
          window.location.href = '/'; // Redirect to home or login page
        });
      }
    });
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <img src={homenest} alt="HomeNest Logo" className="logo-img" />
          <Link to="/">EstateFlow</Link>
        </div>
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/joinus">JoinUs</Link></li>
          <li>
            <Link to="#" className="desktop-item">Features</Link>
            <label htmlFor="showMega" className="mobile-item">Mega Menu</label>
            <div className="mega-box">
              <div className="content">
                <div className="row">
                  <header>For Buyers</header>
                  <ul className="mega-links">
                    <li><Link to="/houses">Flats</Link></li>
                    <li><Link to="/houses">Independent House</Link></li>
                    <li><Link to="/houses">Serviced Apartments</Link></li>
                    <li><Link to="/houses">Farm Houses</Link></li>
                  </ul>
                </div>
                <div className="row">
                  <header>For Owners</header>
                  <ul className="mega-links">
                    <li><Link to="/plan">Post Property for Free</Link></li>
                    <li><Link to="/plan">Owner Services</Link></li>
                    <li><Link to="/plan">View Responses</Link></li>
                    <li><Link to="/plan">Studio Apartments/1 RK Flats</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            {username ? (
              <span className="username-display" onClick={handleLogoutClick}>
                Welcome, {username}!
              </span>
            ) : (
              <Link to="/account" className='nbutton'>Signup</Link>
            )}
          </li>
          <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
