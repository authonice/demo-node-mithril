var mongoose = require('mongoose');
var Email = require('mongoose-type-email');

// Your User model with the default fields
var UserSchema = new mongoose.Schema({
    email: {type: Email, required:true, unique:true},
    password: {type: String, required:true},
    verify: {type:String, default:null}
});
UserSchema.plugin(require('mongoose-bcrypt'));
var User = module.exports = mongoose.model('User', UserSchema);