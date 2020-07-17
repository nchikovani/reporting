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
                                return {
                                    title: task.taskId.title,
                                    description: task.taskId.description,
                                    type: task.taskId.type,
                                    created: task.created,
                                    deadline: task.taskId.deadline,
                                    status: task.status,
                                    closedDate: task.closedDate,
                                    result: task.result,
                                }
                            })
                        });
                });
            }
        })(req, res);
});

module.exports = router;