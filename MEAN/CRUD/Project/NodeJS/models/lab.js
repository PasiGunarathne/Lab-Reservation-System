const mongoose = require('mongoose');

var Lab = mongoose.model('Lab', {
    date : { type : String },
    time : { type : String },
    lab : { type : String },
    session  : { type : String },
    person  : { type : String },
   

}, 'labReservation');

// var User = mongoose.model('User', {
//     username : { type : String },
//     password : { type : String },
// }, 'user');

module.exports = {Lab};
// module.exports = {User};


// module.exports.getDTL = function(value, callback){
// 	var query = {date: value};
// 	User.findOne(query, callback);
// }