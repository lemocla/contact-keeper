const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req, res) =>{
    res.send('Get all contacts');
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