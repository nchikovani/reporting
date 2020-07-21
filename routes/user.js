const passport = require('passport');
const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');
const IssuedTasks = require('../models/IssuedTasks');

router.get("/getTasks", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else {
                IssuedTasks.find({userId: user.id}).populate('taskId')
                    .then(issuedTasks => {
                        return res.json({
                            tasks: issuedTasks.map((task) => {
                                console.log(task)
                                return {
                                    id: task._id,
                                    title: task.taskId.title,
                                    description: task.taskId.description,
                                    type: task.taskId.type,
                                    created: task.created,
                                    deadline: task.taskId.deadline,
                                    status: task.status,
                                    closedDate: task.closedDate,
                                    result: task.result,
                                    additionally: task.taskId.additionally,
                                }
                            })
                        });
                });
            }
        })(req, res);
});
router.post("/closeTask", function(req, res){
    const {taskId, result} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else {
                IssuedTasks.findByIdAndUpdate({_id: taskId}, {result: result, status: "closed", closedDate: new Date},
                    function (err) {
                        if (err) {
                            res.json({message: err.name});
                        }else {
                            IssuedTasks.find({userId: user.id}).populate('taskId')
                                .then(issuedTasks => {
                                    return res.json({
                                        tasks: issuedTasks.map((task) => {
                                            return {
                                                id: task._id,
                                                title: task.taskId.title,
                                                description: task.taskId.description,
                                                type: task.taskId.type,
                                                created: task.created,
                                                deadline: task.taskId.deadline,
                                                status: task.status,
                                                closedDate: task.closedDate,
                                                result: task.result,
                                                additionally: task.additionally,
                                            }
                                        })
                                    });
                                });
                        }
                    });
            }
        })(req, res);
});

module.exports = router;