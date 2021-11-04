const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get a logged in user
// @access  Private
router.get('/', (req, res) =>{
    res.send('Get logged in user');
}); //api/users

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) =>{
    res.send('Log in user');
}); //api/users

module.exports = router;
