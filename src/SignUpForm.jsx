import React, { useState } from 'react';

function SignUpForm({ onCancel }) {
  const [name, setName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check if the input is a valid email or a valid 10-digit mobile number
    if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
      setErrorMessage("Invalid email or mobile number format.");
      return;
    }

    // If all validations pass, clear any errors and proceed with account creation
    setErrorMessage(''); 
    console.log('Account Created:', { name, emailOrMobile, password });
    alert("Account creation successful!");

    // You would typically send a POST request to your API here
    // Example:
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, emailOrMobile, password }),
     }).then(response => {
       if (response.ok) {
       alert("Account created successfully!");
        onCancel(); // Go back to login form
      } else {
       setErrorMessage("Failed to create account. Please try again.");
     }
    });
  };

  return (
    <div className="details-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile number or email address"
          value={emailOrMobile}
          onChange={(e) => setEmailOrMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Create Account</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={onCancel} className="signin-button">Cancel</button>
    </div>
  );
}

export default SignUpForm;

