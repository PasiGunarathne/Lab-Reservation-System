const express = require('express');
var path = require('path');
// var cookieParser = require('cookieParser');
const bodyParser = require('body-parser');
const cors = require('cors');


var labController = require('./controllers/labController.js');
var userController = require('./controllers/userController.js');


var app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials:true 
}));
const { mongoose } = require('./db.js');

var flash = require('connect-flash');

//passport
var passport =require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// mongoose.connect(connectionOptions);
app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'secret', 
    cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
    },
    // store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// require('./passport-config');
app.use(passport.initialize());
app.use(passport.session()); 


console.log('hello1');
console.log('hell3');



// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/labs', labController); 
app.use('/user', userController);


app.listen(3000, () => console.log('Lab Server started at port : 3000'));
 