const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {}; // options to control how the token is extracted from the request or verified.
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // Function that accepts a request as the only parameter and returns either the JWT as a string or null. 
    opts.secretOrKey = config.secret; // using to verify the token's signature
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){ // 'jwt_payload' an object literal containing the decoded JWT payload.
       //console.log(jwt_payload);
        User.getUserById(jwt_payload.data._id, function(err, user){
            if(err){
                return done(err, false); // 'done' accepts arguments in the format function(err, secret)
            }
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}