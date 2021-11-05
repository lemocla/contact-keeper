const express = require('express');
const router = express.Router();
// import bcrypt 
const bcrypt = require('bcryptjs');
//Json webtoken
const jwt = require('jsonwebtoken');
//config
const config = require('config')
// middleware auth.js
const auth = require('../middleware/auth')
// ...rest of the initial code omitted for simplicity.
const { check, validationResult } = require('express-validator');

const User = require('../models/User');


// @route   GET api/auth
// @desc    Get a logged in user
// @access  Private
router.get('/', auth,  async (req, res) =>{ //middleware auth is passed as second parameter
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}); //api/users


// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmptpy()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ msg: 'Invalid credentials'});
        }
        //password match
        user.password = await bcrypt.hash( password, salt );
        // create a user in MongoDB
        await user.save();
        //payload for jwt
        const payload={
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtSecret'), {
                 expiresIn: 360000 //1hour
            },
            (err, token)=>{
                 if(err) throw err;
                 res.json({ token });
             }
        );        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error')
    }
}
); //api/users

module.exports = router;
