const express = require('express');
const router = express.Router();
// import bcrypt 
const bcrypt = require('bcryptjs');
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
], async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmptpy()){
        return res.status(400).json({ errors: errors.array() });
    }
   const{ name, email, password} = req.body;
   try{
       let user = await User.findOne({ email });
       if(user) {
           return res.status(400).json({msg: 'User already exists'});
       }
       user = new User({
           name,
           email,
           password
       });
       //Encrypt the password
       // salt
       const salt = await bcrypt.genSalt(10);
       // hash the passowrd
       user.password = await bcript.hash( password, salt );
       // create a 
       await user.save();
       res.send('User saved');

   } catch (err){
        console.error(err.message);
        res.status(500).send('Server error')
   }
}); //api/users

module.exports = router;