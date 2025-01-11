const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Routes for user registration and login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
