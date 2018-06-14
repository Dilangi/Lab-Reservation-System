const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register
router.post('/register',function(req, res, next){
    let newUser = new User({  //creating an instance using the model
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, function(err, user){  
        if(err){
            res.json({success:false, msg:'Failed to register'});
        } else {
            res.json({success: true, msg:'User registration successful'});
        }
    })
});

// Authenticate
router.post('/authenticate', function(req, res, next){
    res.send('Authenticate');
});

// Profile
router.get('/profile', function(req, res, next){
    res.send('Profile');
});

module.exports = router;