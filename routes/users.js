const express = require("express");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs/dist/bcrypt");

const router = express.Router();

router.post(
  "/",
  [check("name", "Name is required!").not().isEmpty(), 
   check('email', 'Email is required!').isEmail(),
   check('password', 'Please enter a password with 6 or more characters!').isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    const {name, email, password} = req.body;

    try {   
        let user = await User.findOne({email: email})
        console.log(user);

        if(user) {
            return res.status(400).json({msg: 'User already exists!'})
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save()

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

    } catch(err) {
        console.error(err);
        res.status(500).send('Server error')
    }
  }
);

module.exports = router;
