const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const initializePassport = require('./auth/passport-config');
const googleAuth = require('./auth/google');
const microsoftAuth = require('./auth/microsoft');

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Auth Strategies
initializePassport(passport);
googleAuth(passport);
microsoftAuth(passport);

// Routes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
