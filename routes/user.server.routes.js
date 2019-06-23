const express = require('express');
const Router = express.Router();
//import nodemailer email service
const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let User = require('../models/user.model');

//get all users
Router.route('/').get(function(req,res){
    User.find(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});
//get all instructores
Router.get("/instructors", (req, res, next) => {

    User.find().exec().then(docs => {

        //res.json(docs);

        const instructors = [];

        docs.forEach(user => {

            if (user.role == 'Instructor') {
                instructors.push(user);
            }

        });

        res.status(200).json({
            instructors: instructors
        })

    }).catch(err => {

        res.status(500).json({
            error: err
        });

    });

});


//get all admins
Router.get("/admins", (req, res, next) => {

    User.find().exec().then(docs => {

        //res.json(docs);

        const admins = [];

        docs.forEach(user => {

            if (user.role == 'Admin') {
                admins.push(user);
            }

        });

        res.status(200).json({
            admins: admins
        })

    }).catch(err => {

        res.status(500).json({
            error: err
        });

    });

});
//get all students
Router.get("/students", (req, res, next) => {

    User.find().exec().then(docs => {

        //res.json(docs);

        const students = [];

        docs.forEach(user => {

            if (user.role == 'Student') {
                students.push(user);
            }

        });

        res.status(200).json({
            students: students
        })

    }).catch(err => {

        res.status(500).json({
            error: err
        });

    });

});

//get a specific user 
Router.route('/:id').get(function(req,res){
    let id = req.params.id;
    User.findById(id,function(err,user){
        res.json(user);
    });
});

//add user
Router.route('/add').post(function(req,res){

    let user = new User(req.body);
    user.save()
        .then(user=>{
            if(user.role==='Instructor'){
                emailnotification(user.email)
            }
            res.status(200).json({'message':'user added successfully',
                                   'user':user
                                });
        })
        .catch(err=>{
            res.status(400).send({'message':'adding new todo failed'});
        });

});

//update a user as json object
Router.route('/update/:id').post(function(req,res){
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send('data is not found');
        else
            user.regNo = req.body.regNo;
            user.fname =req.body.fname;
            user.lname = req.body.lname;
            user.role = req.body.role;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save().then(user =>{
                res.json({'message':'User updated successfully',
                'user':user
             });
            }).catch(err=>{
                res.status(400).send("Update not possible");
            });
    });
});


function emailnotification(email){

    var output=`<b>Your Account Activated </b>
                <p>Dear Sir/Madam, We set up your course web account to stay connected with your
                students.SLIIT Hope that you will do a good job </p>`; 


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'tutionguru2@gmail.com',
            pass: 'Guru1234'
        }
    });
    let mailOptions = {
        from: 'tutionguru2@gmail.com <SLIIT>',
        to:email,
        subject: 'Instructor Account',
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
module.exports = Router;
