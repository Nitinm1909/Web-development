const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const pool = require('../supabaseClient.js');
const router = express.Router();

// Email/password login
router.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

// Email/password signup
router.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM auth WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO auth (email, password) VALUES (?, ?)', [email, hashed]);
    res.json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

// Microsoft OAuth
router.get('/auth/microsoft', passport.authenticate('azuread-openidconnect'));
router.get('/auth/microsoft/callback',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

module.exports = router;
