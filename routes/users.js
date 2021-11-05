const express = require('express');
const router = express.Router();
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min:6})
],(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmptpy()){
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('passed');//data sent to the route: name, email, pwd, 
}); //api/users

module.exports = router;