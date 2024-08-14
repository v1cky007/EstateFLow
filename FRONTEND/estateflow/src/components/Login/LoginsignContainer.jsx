import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Overlay from './Overlay';
import './LoginSignupContainer.css'; // Import the CSS

const LoginSignupContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const togglePanel = (toSignUp) => {
    setIsSignUp(toSignUp);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLoginFailure = (message) => {
    setIsAuthenticated(false);
    alert('Login failed: ' + message);
  };

  const handleSignupSuccess = () => {
    alert('Signup successful! Please log in.');
    setIsSignUp(false); // Switch to the login form
  };

  const handleSignupFailure = (message) => {
    alert('Signup failed: ' + message);
  };

  return (
    <div className={`login-signup-container ${isSignUp ? 'right-panel-active' : ''}`}>
      {!isAuthenticated && (
        <>
          <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
          <SignupForm onSignupSuccess={handleSignupSuccess} onSignupFailure={handleSignupFailure} />
          <Overlay togglePanel={togglePanel} />
        </>
      )}
    </div>
  );
};

export default LoginSignupContainer;
