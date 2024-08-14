import React from 'react';

const Overlay = ({ togglePanel }) => (
  <div className="overlay-container">
    <div className="overlay">
      <div className="overlay-panel overlay-left">
        <h1 className="overlay-title">Welcome Back!</h1>
        <p className="overlay-paragraph">To keep connected with us please login with your personal info</p>
        <button className="overlay-button ghost" onClick={() => togglePanel(false)}>Sign In</button>
      </div>
      <div className="overlay-panel overlay-right">
        <h1 className="overlay-title">Hello, Friend!</h1>
        <p className="overlay-paragraph">Enter your personal details and start journey with us</p>
        <button className="overlay-button ghost" onClick={() => togglePanel(true)}>Sign Up</button>
      </div>
    </div>
  </div>
);

export default Overlay;
