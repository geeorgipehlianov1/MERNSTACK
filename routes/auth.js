const express = require('express');
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const { check, validationResult } = require("express-validator");
const auth = require('../middelware/auth')
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require('bcryptjs');

const router = express.Router();


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
});

router.post('/',[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    };

    const {email, password } = req.body;

    try {
        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, 'asdf', {
            expiresIn: 360000
        }, (err, token) => {
            if(err) {
                throw err;
            }
            res.json({token})
        })
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server error')
    }

});



module.exports = router;