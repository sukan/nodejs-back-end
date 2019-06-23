const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Submission = require('../models/submission.model');

/*
Get all the submissions of assignments
 */
router.get("/all", function (req,res) {

    Submission.find()
        .populate("")
        .exec()
        .then(submissions=>{
            res.status(200).json(submissions)
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});

/*
Get the submission by submission id
 */
router.get("/single/:submissionId",function (req,res) {
   const id = req.params.submissionId;

   Submission.findById({_id : id })
       .exec()
       .then(submission=>{
           if( submission ){
               res.status(200).json(submission);
           }else{
               res.status(404).json({"message": "not found"});
           }

       })
       .catch(err=>{
           res.status(500).json(err);
       })
});

/*
Delete a submission
 */
router.delete("/delete/:submissionId",function (req,res) {

    const id = req.params.submissionId;

    Submission.findByIdAndRemove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
});

router.put("/update/:id/:mark" , function (req,res) {

    const mark = req.params.mark;
    const id = req.params.id;

    Submission.update(
        { _id : id },
        {$set :
                {
                    mark : mark
                }

        }
    )
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json(err);
        })
})

module.exports = router;