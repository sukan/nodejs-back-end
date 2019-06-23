const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let assignments = new Schema({
    _id : {
        type : mongoose.Schema.Types.ObjectId,
        required  : true
    },
    file : {
        type: Buffer,
        required: true
    },
    subject: {
        type: String
    },
    assignmentName: {
        type: String
    },
    description: {
        type:String
    } ,
    dueDate: {
        type: String
    },
    startDate: {
        type: String
    },
});


module.exports = mongoose.model('assignments',assignments);