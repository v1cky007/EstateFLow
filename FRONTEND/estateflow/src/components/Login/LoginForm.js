import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt login for user
      let response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('username', responseData.name); // Store username in local storage
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome!',
        }).then(() => {
          navigate('/'); // Navigate to home page for regular users
        });
        return;
      }

      // Attempt login for broker if user login fails
      response = await fetch('http://localhost:8080/api/broker-details/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('username', email); // Store username or broker email in local storage
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome Broker!',
        }).then(() => {
          navigate('/broker-dashboard'); // Navigate to broker dashboard after confirmation
        });
      } else {
        const errorMessage = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-content" onSubmit={handleLogin}>
        <h1 className="form-title">Sign In</h1>
        <span className="form-span">or use your account</span>
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href="#" className="forgot-password-link">Forgot your password?</a>
        <button type="submit" className="form-button">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
