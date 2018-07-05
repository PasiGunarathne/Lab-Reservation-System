var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');
// var User = mongoose.model('user', schema);

var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// require('../passport-config');


router.get('/', (req, res) => {

    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retrieving Labs :' + JSON.stringify(err, undefined, 2)); }
    })

});

// router.get('/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No  record with given id : ${req.params.id}');

//     Lab.findById(req.params.id, (err, doc) => {
//         if(!err) { res.send(doc); }
//         else { console.log('Error in Retrieving Labs :' + JSON.stringify(err, undefined, 2)); }
//     })

// });


// for register users
router.post('/register', (req, res) => {
    console.log('hell5');

    addToDB(req, res);
    //     var user = new User({ 
    //         bname: req.body.bname,
    //         email: req.body.email,
    //         contact: req.body.contact,
    //         password: User.hashPassword(req.body.password),
    //         // cpassword: req.body.cpassword,
    //         creation_dt:Date.now()
    //     });
    //     user.save((err, doc)=>{
    //         if(!err) { res.send(doc); 
    //             console.log('hell6');
    // }
    //         else { console.log('Error in User save : '+ JSON.stringify(err, undefined, 2)); }
    //     });
});
async function addToDB(req, res) {
    var user = new User({
        bname: req.body.bname,
        email: req.body.email,
        contact: req.body.contact,
        password: User.hashPassword(req.body.password),
        // cpassword: req.body.cpassword,
        creation_dt: Date.now()
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
}

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No  record with given id : ${req.params.id}');

        var users = {
            bname: req.body.bname,
            email: req.body.email,
            contact: req.body.contact,
            // session: req.body.session,
            // person: req.body.person,
           
        };
        User.findByIdAndUpdate(req.params.id, {$set:users}, {new:true}, (err, doc) => {
            if(!err) { res.send(doc); }
            else { console.log('Error in Lab Update : '+ JSON.stringify(err, undefined, 2)); }
        });
});


router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No  record with given id : ${req.params.id}');

    User.findByIdAndRemove(req.params.id, (err, doc)=> {
        if(!err) { res.send(doc); }
            else { console.log('Error in User Deletes : '+ JSON.stringify(err, undefined, 2)); }
    });
});

console.log('hello2 ');
console.log('hell4');





// for login
passport.use(new LocalStrategy({
    // check email n password and attach to usernameField n passwordField
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown User' });
            }

            // User.comparePassword(password, user.password, function (err, isMatch) {
            //     if (err) throw err;
            //     if (isMatch) {
            //         return done(null, user);
            //     } else {
            //         return done(null, false, { message: 'Invalid password' });
            //     }
            // });
            
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err; 
                
                if (isMatch) {
                    var i =0;
                    if (user.password=="admin") {
                        var i = 1 ;
                    }
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

// router.post('/login',
// 	passport.authenticate('local', { successRedirect: '/labs', failureRedirect: '/user/login', failureFlash: true }),
// 	function (req, res) {
//         console.log('helooooooooooooo');

// 		res.redirect('/');
//     });

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'Login Success' });
        }); 
    })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
    return res.status(200).json(req.user);
  });

  router.get('/admin',isValidUser,function(req,res,next){
    return res.status(200).json(req.user);
  });
  
  router.get('/logout',isValidUser, function(req,res,next){
    req.logout();
    return res.status(200).json({message:'Logout Success'});
  })
  
  function isValidUser(req,res,next){
    if(req.isAuthenticated()) next();
    else return res.status(401).json({message:'Unauthorized Request'});
  }






module.exports = router;