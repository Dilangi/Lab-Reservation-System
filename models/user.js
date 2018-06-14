const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// user schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// creating a model, 'User' is the collection name & 'UserSchema' is one that you need to use
//inside User collection
const User = module.exports = mongoose.model('User',UserSchema);

// findById: Finds the document with the specified id (every document has a unique id).
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

// findOne: Finds a single document that matches the specified criteria.
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err) throw err;
            newUser.password = hash; // hashing the password using bcrypt
            newUser.save(callback); //save the instance
        });
    });
}

// All callbacks in Mongoose use the pattern callback(error, result). 
// If an error occurs executing the query, the error parameter will contain an error document, 
// and result will be null. If the query is successful, the error parameter will be null, 
// and the result will be populated with the results of the query.

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
}