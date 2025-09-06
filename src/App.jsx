// App.jsx
import { useState } from 'react';
import './App.css';
import SignUpForm from './SignUpForm';

function App() {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Regular expression to validate either an email or a 10-digit mobile number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
      setErrorMessage("Invalid email or mobile number format.");
      setIsLoading(false);
      return;
    }

    const userCredentials = { emailOrMobile, password };
    setTimeout(() => {
      const apiUrl = import.meta.env.VITE_API_URL;
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userCredentials),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Login successful:', data);
        setEmailOrMobile('');
        setPassword('');
        
      });

      setIsLoading(false);
      setErrorMessage('Invalid credentials, please try again.');
      setEmailOrMobile('');
      setPassword('');
    }, 1500);
  };

  const handleSignUp = () => {
    setIsSigningUp(true);
  };

  const handleCancel = () => {
    setIsSigningUp(false);
  };

  if (isSigningUp) {
    return <SignUpForm onCancel={handleCancel} />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <button onClick={handleSignUp} className="signin-button">
        Create an account
      </button>
      {isLoading && <div className="loading-spinner"></div>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default App;
