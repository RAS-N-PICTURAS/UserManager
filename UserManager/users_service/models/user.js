var mongoose = require('mongoose');


var usersSchema = new mongoose.Schema({
    _id : String,
    first_name: String,
    email: String,
    password_hash: String,
    type: String
}, {versionKey : false});


module.exports  = mongoose.model('users', usersSchema)