const express = require('express');
const courseRoutes = express.Router();
let Course = require('./../models/course.model');

courseRoutes.get('/', function (req, res) {
    res.json({message: 'Welcome to the react + express + mongoDB'});
});

// Defined store route
courseRoutes.route('/addCourse').post(function (req, res) {
    let course = new Course(req.body);
    course.save()
        .then(course => {
            res.status(200).json({ 'course': 'New Course added succefully' });
        })
        .catch(err => {
            res.status(400).send("Unable to add New Course");
        });
});
// Defined get data(index or listing) route
courseRoutes.route('/courseDetails').get(function (req, res) {
    Course.find(function (err, course) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(course);
        }
    });
});
//remove Course
courseRoutes.route('/delete/:id').get(function (req, res) {
    Course.findByIdAndRemove({_id: req.params.id }, function (err, course) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});
//

//Update the Course Details

courseRoutes.route('/edit/:id').post(function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (!course)
            res.status(404).send("Course  is not found");
        else {
            course.course_name = req.body.course_name;
            course.course_code= req.body.course_code;

            course.save().then(course => {
                res.json('Course Update completed');
            })
                .catch(err => {
                    res.status(400).send("unable to update the Course Details");
                });
        }
    });
});

//instructer filter by course List

courseRoutes.get("/instructor/new/:instructorid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.instructors.forEach(ins => {
                if (ins.instructor == req.params.instructorid) {
                    if (ins.status =='not-accepted') {
                        courses.push(course);
                    }
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


// accepted courses by Instructer

courseRoutes.get("/instructor/current/:instructorid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.instructors.forEach(ins => {
                if (ins.instructor == req.params.instructorid) {
                    if (ins.status =='accepted') {
                        courses.push(course);
                    }
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


//click button accept


courseRoutes.post("/instructor/accept/:courseid/:instructorid", (req, res, next) => {

    Course.findById(req.params.courseid, function (err, course) {
        if (!course)
            res.status(404).send('Course is not found');
        else {

            course.couese_code = req.body.couese_code;
            course.course_name = req.body.course_name;
            course.instructors = req.body.instructors;
            course.students = req.body.students;

            course.save().then(course => {
                res.json('Course updated');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    })
});

courseRoutes.route('/all').get(function(req,res){
    Course.find(function(err,courses){
        if(err){
            console.log(err);
        }else{
            res.json(courses);

        }
    });
});

//Student's New And Current Courses
courseRoutes.post("/student/join/:courseid/:studentid", (req, res, next) => {

    Course.findById(req.params.courseid, function (err, course) {
        if (!course)
            res.status(404).send('Course is not found');
        else {

            course.code = req.body.code;
            course.name = req.body.name;
            course.instructors = req.body.instructors;
            course.students = req.body.students;

            course.save().then(course => {
                res.json('Course updated');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

courseRoutes.get("/student/new/:studentid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        // console.log('---------------------');
        docs.forEach(course => {
            var val=false;
            course.students.forEach(ins => {
                // console.log('oneeeeeeee');
                // console.log('param '+req.params.studentid);
                // console.log('array '+ins);
                if (ins == req.params.studentid) {
                    val=true
                }
            });
            if(val===false){
                courses.push(course);
            }
        });

        res.status(200).json({
            courses: courses
        });

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Current Student Courses

courseRoutes.get("/student/current/:studentid", (req, res, next) => {

    Course.find().exec().then(docs => {

        const courses = [];

        docs.forEach(course => {
            course.students.forEach(ins => {
                if (ins == req.params.studentid) {
                    courses.push(course);
                }
            });
        });

        res.status(200).json({
            courses: courses
        })

    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});




module.exports = courseRoutes;
