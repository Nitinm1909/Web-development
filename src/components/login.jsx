import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import './login.css';
import googleLogo from './assets/google-logo.png';
import microsoftLogo from './assets/microsoft-logo.png';

const LoginPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const formRef = useRef(null);

  // Password validation function
  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(pwd)) return 'Password must be at least 8 characters';
    if (!upper.test(pwd)) return 'Password must include at least one uppercase letter';
    if (!lower.test(pwd)) return 'Password must include at least one lowercase letter';
    if (!number.test(pwd)) return 'Password must include at least one number';
    if (!special.test(pwd)) return 'Password must include at least one special character';
    return '';
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      setMessage(error);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Token:', data.token);
        // Optionally store token (e.g. localStorage.setItem('token', data.token))
        navigate('/#hero'); // ✅ Redirect to home
      } else {
        if (data.message === 'Invalid email or password') {
          setMessage("User doesn't exist. Please sign up.");
        } else if (data.message === 'Use OAuth to login') {
          setMessage('This account uses OAuth login. Please login with Google or Microsoft.');
        } else {
          setMessage(data.message || 'Login failed');
        }
      }
    } catch (err) {
      console.error(err);
      setMessage('Error logging in');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(signUpPassword);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError('');

    if (signUpPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful. Please login.');
        setIsSignUp(false);
      } else {
        setMessage(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error signing up');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setMessage('');
    setPasswordError('');
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "http://localhost:5000/auth/microsoft";
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.transition = 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';
      formRef.current.style.transform = 'translateY(0)';
      formRef.current.style.opacity = '1';
    }
  }, [isSignUp]);

  return (
    <div className="login-container">
      <div className="animation-container"></div>
      <div className="form-container">
        <div ref={formRef} className="credentials-container">
          {isSignUp ? (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUpSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => {
                      setSignUpPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                    required
                    placeholder="Password"
                  />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="input-group">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm Password"
                  />
                </div>
                <button type="submit" className="login-button" disabled={!!passwordError}>
                  Sign Up
                </button>
              </form>
              <p onClick={toggleSignUp} className="toggle-signup">
                Already have an account? Login
              </p>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="login-button">Login</button>
              </form>
              <div className="social-login">
                <button className="google-login" onClick={handleGoogleLogin}>
                  <img src={googleLogo} alt="Google Logo" className="social-logo" />
                  Login with Google
                </button>
                <button className="microsoft-login" onClick={handleMicrosoftLogin}>
                  <img src={microsoftLogo} alt="Microsoft Logo" className="social-logo" />
                  Login with Microsoft
                </button>
              </div>
              <p onClick={toggleSignUp} className="toggle-signup">
                Don't have an account? Sign up
              </p>
            </>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
