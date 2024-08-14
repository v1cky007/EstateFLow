import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

const SignupForm = ({ onSignupSuccess, onSignupFailure }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        localStorage.setItem('username', name); // Store username in local storage
        
        // Send confirmation email
        sendConfirmationEmail(email, name);

        onSignupSuccess(); // Notify parent about successful signup
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'Your account has been created!',
        });
      } else {
        const errorMessage = await response.text();
        onSignupFailure(errorMessage); // Notify parent about failed signup
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      onSignupFailure(error.message); // Notify parent about error
      Swal.fire({
        icon: 'error',
        title: 'Signup Failed',
        text: error.message,
      });
    }
  };

  const sendConfirmationEmail = (email, username) => {
    const templateParams = {
      to_email: email,
      username: username,
      message: 'Thank you for registering with EstateFlow! Your account has been created successfully.',
    };

    emailjs.send('service_fu97gas', 'template_debw4mn', templateParams, 'EwrF_RT3IiStPWpIJ')
      .then((response) => {
        console.log('Confirmation email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send confirmation email:', error);
      });
  };

  return (
    <div className="signup-form-container">
      <form className="form-content" onSubmit={handleSignup}>
        <h1 className="form-title">Create Account</h1>
        <span className="form-span">or use your email for registration</span>
        <input
          type="text"
          placeholder="Name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
