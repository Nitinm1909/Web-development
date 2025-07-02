import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { supabase } from '../supabaseClient';
import googleLogo from './assets/google-logo.png';
import microsoftLogo from './assets/microsoft-logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (pwd) => {
    if (!pwd) return 'Password cannot be empty.';
    const minLength = /.{8,}/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    if (!minLength.test(pwd)) return 'Password must be at least 8 characters.';
    if (!upper.test(pwd)) return 'Must include an uppercase letter.';
    if (!lower.test(pwd)) return 'Must include a lowercase letter.';
    if (!number.test(pwd)) return 'Must include a number.';
    if (!special.test(pwd)) return 'Must include a special character.';
    return '';
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
      navigate('/#hero');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setPasswordError('');

    if (!firstName.trim()) {
      setMessage('First name is required.');
      return;
    }

    const error = validatePassword(signUpPassword);
    if (error) {
      setPasswordError(error);
      return;
    }

    if (signUpPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (signUpError) {
      setMessage(signUpError.message);
    } else {
      setMessage('Signup successful. Check your email to confirm.');
      setIsSignUp(false);
    }
  };

const handleOAuthLogin = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin, // or window.location.origin + '/'
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
  } else {
    // ✅ This is required to open Google/Microsoft login
    window.location.href = data.url;
  }
};


  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setMessage('');
    setPasswordError('');
    setFirstName('');
    setLastName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      formRef.current.style.transform = 'translateY(0)';
      formRef.current.style.opacity = '1';
    }
  }, [isSignUp]);

  return (
    <div className="login-container">
      <div className="animation-container"></div>
      <div className="form-container">
        <div ref={formRef} className="credentials-container" aria-live="polite">
          {isSignUp ? (
            <>
              <h2>Sign Up</h2>
              <form onSubmit={handleSignUpSubmit} noValidate>
                <div className="input-group">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First Name *"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name (optional)"
                  />
                </div>
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

              {/* OAuth buttons on Sign Up page only */}
              <div className="social-login">
                <button className="google-login" onClick={() => handleOAuthLogin('google')}>
                  <img src={googleLogo} alt="Google Logo" className="social-logo" />
                  Sign Up with Google
                </button>
                <button className="microsoft-login" onClick={() => handleOAuthLogin('azure')}>
                  <img src={microsoftLogo} alt="Microsoft Logo" className="social-logo" />
                  Sign Up with Microsoft
                </button>
              </div>

              {message && <p className="error-message">{message}</p>}
              <p onClick={toggleSignUp} className="toggle-signup">Already have an account? Login</p>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <form onSubmit={handleLoginSubmit} noValidate>
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
              {message && <p className="error-message">{message}</p>}
              <p onClick={toggleSignUp} className="toggle-signup">Don't have an account? Sign up</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
