const express = require('express');
const router = express.Router();
const { subscribeToEmails, verifyEmail, updateProfile } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// @route   PUT api/user
// @desc    Update user profile
// @access  Private
router.put('/', auth, updateProfile);

// @route   POST api/user/subscribe
// @desc    Subscribe user to emails
// @access  Private
router.post('/subscribe', auth, subscribeToEmails);

// @route   GET api/user/verify/:token
// @desc    Verify user email
// @access  Public
router.get('/verify/:token', verifyEmail);

module.exports = router; 