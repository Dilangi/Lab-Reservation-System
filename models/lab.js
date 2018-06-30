const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// lab Schema
const LabSchema = mongoose.Schema({
    username: {
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
        type: String,
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

//get lab by ID
module.exports.getLabById = function(id,callback){
    Lab.findById(id,callback);
}

// delete my reservation
module.exports.deleteReservation = function(id,callback){
    const query = {_id: id};
    Lab.remove(query,callback);
}

// edit my reservation
module.exports.editReservation = function(id,eReservation,callback){
    //console.log('this is model');
    //console.log(eReservation);
    const query = {_id: id};
    Lab.update(query,eReservation,callback);
}

// get lab by date & lab name
module.exports.getResbyDateLab = function(rDate,rLabname,callback){
    const query = {date:rDate, labname:rLabname};
    Lab.find(query,callback);
}

// get lab by date
module.exports.getLabbyDate = function(rDate, callback){
    const query = {date:rDate};
    Lab.find(query,callback);
}
