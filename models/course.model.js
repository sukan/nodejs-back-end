const mongoose = require('mongoose');

const Schema = mongoose.Schema;



let Course = new Schema({

        course_name: {
            type: String
        },
        course_code: {
            type: String
        },
        instructors: [{
            instructor: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
            status: {type: String}
        }],


        students: [{type: Schema.Types.ObjectId, required: false, ref: 'User'}]


    }
);
module.exports = mongoose.model('Course', Course);