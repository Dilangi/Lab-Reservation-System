const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Lab = require('../models/lab');

// Register
router.post('/register',function(req, res, next){
    let newUser = new User({  //creating an instance using the model
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        usertype:"user"
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
    const username = req.body.username;  // getting details from the form submitted
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg:'User not found' });
        }

        User.comparePassword(password, user.password, function(err,isMatch){
            // 'password' - candidate password, 'user.password' - actual hash 'isMatch'- is a boolean value
            if(err) throw err;
            if(isMatch){
                // 'token' - using to protect data
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        usertype:user.usertype
                    }
                });
            } else{
                return res.json({success: false, msg:'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next){
    res.json({user: req.user});
});


module.exports = router;