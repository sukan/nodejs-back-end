const mongoose = require('mongoose');

const Submission = mongoose.Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required  : true
    },
    file : {
        type : Buffer,
        required: true
    },
    filename : {
        type : String,
        required : true
    },
    submitDate : {
        type : String,
        required : true
    },
    submitTime : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    mark : {
        type : Number,
        required : true
    },
    assignment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Assignment",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    regNo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Submission", Submission );