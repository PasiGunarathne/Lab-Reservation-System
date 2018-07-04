const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');


var { Lab } = require('../models/lab');
// var { User } = require('../models/user');


router.get('/', (req, res) => {
    Lab.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retrieving Labs :' + JSON.stringify(err, undefined, 2)); }
    });

    // User.find((err, docs) => {
    //     if(!err) { res.send(docs); }
    //     else { console.log('Error in Retrieving Labs :' + JSON.stringify(err, undefined, 2)); }
    // })

});
router.get('/check', (req, res) => {
    if (Lab.findOne(req.params.date, (err, doc) => {
        if (!err) {
            if (Lab.findOne(req.params.time, (err, doc) => {
                if (!err) {
                    if (Lab.findOne(req.params.lab, (err, doc) => {
                        if (!err) { console.log('found duplicate'); }
                        else { res.send(doc); console.log('not found'); }
                    }));
                }
                else { res.send(doc); }
            }));
        }
        else { res.send(doc); }
    }));
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No  record with given id : ${req.params.id}');

    Lab.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Labs :' + JSON.stringify(err, undefined, 2)); }
    })

});

router.post('/add', (req, res) => {
    var labReservation = new Lab({
        date: req.body.date,
        time: req.body.time,
        lab: req.body.lab,
        session: req.body.session,
        person: req.body.person,

    });
    labReservation.save((err, doc)=>{
        if(!err) { res.send(doc); }
        else { console.log('Error in Lab save : '+ JSON.stringify(err, undefined, 2)); }
    });



    

    // if (Lab.findOne(req.params.date, (err, doc) => {
    //     if (!err) {
    //         if (Lab.findOne(req.params.time, (err, doc) => {
    //             if (!err) {
    //                 if (Lab.findOne(req.params.lab, (err, doc) => {
    //                     if (!err) { console.log('found duplicate'); }
    //                     else { res.send(doc); console.log('not found'); }
    //                 }));
    //             }
    //             else { res.send(doc); }
    //         }));
    //     }
    //     else { res.send(doc); }
    // }));
    // else {
    //     labReservation.save((err, doc) => {
    //         if (!err) { res.send(doc); }
    //         else { console.log('Error in Lab save : ' + JSON.stringify(err, undefined, 2)); }
    //     });
    // }
});



router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No  record with given id : ${req.params.id}');

    var labReservation = {
        date: req.body.date,
        time: req.body.time,
        lab: req.body.lab,
        session: req.body.session,
        person: req.body.person,

    };
    Lab.findByIdAndUpdate(req.params.id, { $set: labReservation }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lab Update : ' + JSON.stringify(err, undefined, 2)); }
    });

});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No  record with given id : ${req.params.id}');

    Lab.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Lab Deletes : ' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router; 