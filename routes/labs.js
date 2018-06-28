const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Lab = require('../models/lab');

//add reservation
router.post('/addReservation', function(req, res, next){
    let newLabReservation = new Lab({  //creating an instance using the model
        username: req.body.username,
        labname: req.body.labname,
        subject: req.body.subject,
        date: req.body.date,
        from: req.body.from,
        to: req.body.to,
        _id:req.body.id

    });

    Lab.addLab(newLabReservation, function(err, lab){  
        if(err){
            res.json({success:false, msg:'Failed to add lab'});
        } else {
            res.json({success: true, msg:'Lab Reservation successful'});
        }
    });
});

router.get('/veiwReservation', function(req, res, next){
    Lab.getLabs({}, function(err, labs){
        if(err){
            throw err;
        } else {
            res.json({labs:labs});
        }
        
    });    

});

router.get('/myReservations/:username', function(req, res, next){
    const username = req.params.username;
    // console.log(username); testing
    Lab.getLabsByUsername(username, function(err, labs){
        if(err){
            res.json({success:false,msg:'Failed to load the data'});
        } else {
            //console.log(labs); testing
            res.json({success:true, labs:labs});
            
        }
    });
});

router.get('/getReservation/:id',function(req,res,next){
    Lab.getLabById({_id:req.params.id},function(err,labs){
        if(err){
            res.json({success:false,msg:'Failed to load the lab'});
        } else {
            console.log(labs); // testing
            res.json({success:true, labs:labs});
        }
    });
});

router.get('/delete/:id',function(req,res,next){
    Lab.deleteReservation({_id:req.params.id}, function(err,labs){
        if(err){
            return res.json({success:false, msg:"cannot delete"});
        } else {
            //console.log(req.params.id); testing
            res.json({success:true, msg:"Delete successfully"});
        }
    });
});

router.post('/update/:id',function(req,res,next){
    let newLabReservation = new Lab({  //creating an instance using the model
        username: req.body.username,
        labname: req.body.labname,
        subject: req.body.subject,
        date: req.body.date,
        from: req.body.from,
        to: req.body.to,
        _id:req.params.id
    });
    console.log(newLabReservation);
    console.log(newLabReservation._id);
    Lab.editReservation(newLabReservation._id,newLabReservation, function(err,labs){
        if(err){
            return res.json({success:false, msg:"update failed"});
        } else {
            res.json({success:true, msg:"Update successfully"});
        }
    });
});


module.exports = router;
