const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// lab Schema
const LabSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    labname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }


});

const Lab = module.exports = mongoose.model('Lab',LabSchema);

module.exports.addLab = function(newLabReservation, callback){
    newLabReservation.save(callback);
}

// get all lab reservations
module.exports.getLabs = function({}, callback){
    Lab.find({},callback);
}

// get lab reservations by username
module.exports.getLabsByUsername = function(username, callback){
    const query = {username: username};
    Lab.find(query, callback);
}