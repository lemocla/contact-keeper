const express = require('express');
const router = express.Router();
// auth middleware
const auth = require('../middleware/auth');
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');
// Models
const Contact = require('../models/Contact');
const User = require('../models/User');



// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) =>{
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1});
        res.json(contacts);
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error');
    }
}); //api/users

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) =>{
    res.send('Add contact');
}); //api/users


// @route   PUT api/contacts/:id
// @desc    Auth user & get token
// @access  Public
router.put('/:id', (req, res) =>{
    res.send('Update contact');
}); //api/users


// @route   DELETE api/contacts/:id
// @desc    Auth user & get token
// @access  Public
router.delete('/:id', (req, res) =>{
    res.send('Delete contact');
}); //api/users

module.exports = router;