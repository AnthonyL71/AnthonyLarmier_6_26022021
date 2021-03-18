const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Routes
// Signup route
router.post('/signup', userCtrl.signup);
// Login route
router.post('/login', userCtrl.login);

module.exports = router;