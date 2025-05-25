const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;
require('dotenv').config();

const app = express();

// Configure CORS to allow your frontend origin and support cookies if needed
app.use(cors({
  origin: 'http://localhost:3000', // change if your frontend runs somewhere else
  credentials: true,
}));

app.use(express.json());

// Setup MySQL pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Setup express-session (needed for passport OAuth sessions)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialize/Deserialize user for session support
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Simple test route to verify server is running
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM auth WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(409).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO auth (email, password, provider) VALUES (?, ?, "local")',
      [email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ message: 'Signup failed' });
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM auth WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = results[0];
    if (!user.password) return res.status(401).json({ message: 'Use OAuth to login' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  db.query('SELECT * FROM auth WHERE email = ?', [email], (err, results) => {
    if (err) return done(err);

    if (results.length === 0) {
      // Insert new user with google provider
      db.query('INSERT INTO auth (email, provider) VALUES (?, "google")', [email], (err) => {
        if (err) return done(err);
        return done(null, profile);
      });
    } else {
      return done(null, profile);
    }
  });
}));

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // frontend redirect after login
  }
);

// Microsoft OAuth Strategy
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: '/auth/microsoft/callback',
  scope: ['user.read'],
}, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value; // fix here

  db.query('SELECT * FROM auth WHERE email = ?', [email], (err, results) => {
    if (err) return done(err);

    if (results.length === 0) {
      // Insert new user with microsoft provider
      db.query('INSERT INTO auth (email, provider) VALUES (?, "microsoft")', [email], (err) => {
        if (err) return done(err);
        return done(null, profile);
      });
    } else {
      return done(null, profile);
    }
  });
}));

// Microsoft OAuth routes
app.get('/auth/microsoft', passport.authenticate('microsoft'));

app.get('/auth/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // frontend redirect after login
  }
);

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
