const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const assignments = require('../models/assignment.model');

/*
Get all assignments
 */
router.get("/all", function (req,res) {

    console.log(req);
    assignments.find()
        .populate("")
        .exec()
        .then(assignments=>{
            res.status(200).json(assignments)
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});

/*
Get the submission by submission id
 */
router.get("/find/:assignmentId",function (req,res) {
    const id = req.params.assignmentId;
    console.log(req);
    assignments.findById({_id : id })
        .exec()
        .then(assignment =>{
            if( assignment ){
                res.status(200).json(assignment);
            }else{
                res.status(404).json({"message": "not found"});
            }

        })
        .catch(err=>{
            res.status(500).json(err);
        })
});


//  Defined update route
router.route('/update/:id').post(function (req, res) {
    assignments.findById(req.params.id, function(err, assignment) {
        if (!assignment)
            res.status(404).send("data is not found");
        else {
            assignment.file = req.body.file;
            assignment.subject = req.body.subject;
            assignment.assignmentName = req.body.assignmentName;
            assignment.description = req.body.description;
            assignment.dueDate = req.body.dueDate;
            assignment.startDate = req.body.startDate;

            assignment.save().then(assignment => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database"+err);
                });
        }
    });
});

/*
Delete a submission
 */
router.delete("/delete/:id",function (req,res) {

    const id = req.params.id;

    assignments.findByIdAndRemove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});

module.exports = router;