const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    bname:{type:String, require:true},
    email:{type:String, require:true},
    contact:{type:String, require:true},
    password:{type:String, require:true}, //need confirm pass if cant check it in front
    creation_dt:{type:Date, require:true}
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);

}
console.log('hell1');


schema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}


// var User = mongoose.model('User', schema, 'user');
// module.exports = {User};

var User = module.exports = mongoose.model('user', schema);
console.log('hell7');


// module.exports.getUserByEmail = function(username, callback){
// 	var query = {username: username};
// 	User.findOne(query, callback);
// }

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}