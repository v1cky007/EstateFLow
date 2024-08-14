import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <main className="footer-content">
        {/* Your main content goes here */}
      </main>
      <footer className="footer">
        <div className="footer-sections">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@EstateFlow.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul className="social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>About Us</h3>
            <p>EstateFlow is your trusted platform for buying, selling, and planning properties. Discover your dream home today!</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 EstateFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
