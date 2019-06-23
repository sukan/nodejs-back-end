//import mongoose
const mongooes =require('mongoose');
const Schema =mongooes.Schema;

const uniqueValidator = require('mongoose-unique-validator');

//creating the model schema
let User = new Schema({
    regNo :{
        type: String,
        required: true,
        unique: true
    },

    fname:{
        type : String
    },
    lname:{
        type : String
    },
    role:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    }

});

User.plugin(uniqueValidator);

//make exportable to import in server
module.exports = mongooes.model('User',User)