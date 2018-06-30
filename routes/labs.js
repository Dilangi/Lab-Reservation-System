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

    });

    Lab.getResbyDateLab(newLabReservation.date, newLabReservation.labname, function(err,lab){
        if(err){
            res.json({success:false, msg: 'failed to load the lab'});
        } else {
            function isEmpty(lab){
                for (let y of lab){
                    if((y.date != newLabReservation.date) || (y.labname != newLabReservation.labname)){
                        return true;
                    }
                    return false;
                }
            }
            if(isEmpty(lab)){
                Lab.addLab(newLabReservation, function(err, lab){  
                    if(err){
                        res.json({success:false, msg:'Failed to add lab'});
                    } else {
                        res.json({success: true, msg:'Lab Reservation successful'});
                    }
                });
            } else {
                function overLapReservation(lab){
                    for (let x of lab) {
                        if((x.from < newLabReservation.from) && (newLabReservation.from < x.to)){
                            return false;
                        }
                        else if ((newLabReservation.from <= x.from) && (x.to <= newLabReservation.to)){
                            return false;
                        }
                        else if((x.from < newLabReservation.to) && (newLabReservation.to < x.to)){
                            return false;
                        }
                    }
                    return true;
                }

                if(overLapReservation(lab)){
                    Lab.addLab(newLabReservation, function(err, lab){  
                        if(err){
                            res.json({success:false, msg:'Failed to add lab'});
                        } else {
                            res.json({success: true, msg:'Lab Reservation successful'});
                        }
                    });
                } else {
                    res.json({success:false,msg:'Time Overlap'});
                }
            }
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

router.get('/serachReservation/:date', function(req, res, next){
    const date = req.params.date;
    console.log(date);
    Lab.getLabbyDate(date, function(err,labs){
        if(err){
            res.json({success:false, msg:'failed to load the labs'});
        } else {
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
   // console.log(newLabReservation);  testing
    //console.log(newLabReservation._id); testing
    Lab.getResbyDateLab(newLabReservation.date, newLabReservation.labname, function(err,lab){
        if(err) {
            res.json({success:false, msg: 'failed to load the lab'});
        } else {
            function isEmpty(lab){
                for (let y of lab){
                    if((y.date != newLabReservation.date) || (y.labname != newLabReservation.labname)){
                        return true;
                    }
                    return false;
                }
            }
            if(isEmpty(lab)){
                Lab.editReservation(newLabReservation._id, newLabReservation, function(err,lab){
                    if(err){
                        return res.json({success:false, msg:"update failed"});
                    } else {
                        res.json({success:true, msg:"Updated successfully"});
                    }
                });
            } else {
                function overLapReservation(lab){
                    for (let x of lab) {
                        if((x.from < newLabReservation.from) && (newLabReservation.from < x.to)){
                            return false;
                        }
                        else if ((newLabReservation.from <= x.from) && (x.to <= newLabReservation.to)){
                            return false;
                        }
                        else if((x.from < newLabReservation.to) && (newLabReservation.to < x.to)){
                            return false;
                        }
                    }
                    return true;
                }
                if(overLapReservation(lab)){
                    Lab.editReservation(newLabReservation._id, newLabReservation, function(err,lab){
                        if(err){
                            return res.json({success:false, msg:"update failed"});
                        } else {
                            res.json({success:true, msg:"Updated successfully"});
                        }
                    });
                } else {
                    res.json({success:false,msg:'Time Overlap'});
                }

            }

        }
    });
   
});




module.exports = router;
