const passport = require('passport');
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Tasks = require('../models/Tasks');
const IssuedTasks = require('../models/IssuedTasks');

router.get("/getUsers", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === "admin") {
                Users.find().then(users => {
                    const resUsers = [];
                    users.forEach(user => {
                        if(user.role!=="admin") {
                            resUsers.push({id: user._id, login: user.login, name: user.name});
                        }
                    });
                    return res.json({users: resUsers});
                });
            }
        })(req, res);
});
router.post('/editUser', function(req, res){
    const {id, name} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === 'admin') {
                Users.findByIdAndUpdate(id, {name: name}, function (err) {
                    if (err) {
                        res.json({message: err.name});
                    }else {
                        Users.find().then(users => {
                            const resUsers = [];
                            users.forEach(user => {
                                if(user.role!=="admin") {
                                    resUsers.push({id: user._id, login: user.login, name: user.name});
                                }
                            });
                            return res.json({users: resUsers});
                        });
                    }
                });
            } else {
                return res.status(403).send();
            }
        })(req, res);
});
router.delete('/deleteUser', function(req, res){
    const {id} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === 'admin') {
                Users.deleteOne({ _id: id }, function (err) {
                    if (err) {
                        res.json({message: err.name});
                    }else {
                        IssuedTasks.deleteMany({userId: id}).then(() => {
                            Users.find().then(users => {
                                const resUsers = [];
                                users.forEach(user => {
                                    if(user.role!=="admin") {
                                        resUsers.push({id: user._id, login: user.login, name: user.name});
                                    }
                                });
                                return res.json({users: resUsers});
                            });
                        });
                    }
                });
            } else {
                return res.status(403).send();
            }
        })(req, res);
});
router.get("/getTasks", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === "admin") {
                Tasks.find().populate('usersCount').populate('closedUsersCount').then(tasks => {
                    return res.json({tasks: tasks.map((task) => {
                            return {
                                id: task._id,
                                title: task.title,
                                description: task.description,
                                type: task.type,
                                created: task.created,
                                deadline: task.deadline,
                                closedTasks: task.closedUsersCount,
                                issuedTasks: task.usersCount,
                            }})
                    });
                });
            }
        })(req, res);
});
router.post('/createTask', function(req, res){
    const {title, description, type, deadline} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === 'admin') {
                const newTask = new Tasks({
                    title,
                    description,
                    type,
                    deadline,
                });
                newTask.save()
                    .then((task) => {
                        Users.find().then(users => {
                            users.forEach(user => {
                                if (user.role === 'admin') return;
                                const newIssuedTasks = new IssuedTasks({
                                    taskId: task._id,
                                    userId: user._id,
                                    status: "new",
                                });
                                newIssuedTasks.save()
                            })
                        });
                        Tasks.find().populate('usersCount').populate('closedUsersCount').then(tasks => {
                            return res.json({tasks: tasks.map((task) => {
                                    return {
                                        id: task._id,
                                        title: task.title,
                                        description: task.description,
                                        type: task.type,
                                        created: task.created,
                                        deadline: task.deadline,
                                        closedTasks: task.closedUsersCount,
                                        issuedTasks: task.usersCount,
                                    }})
                            });
                        });
                    }, error=> {
                        res.json({message: error.name});
                    });
            } else {
                return res.status(403).send();
            }
        })(req, res);
});
router.post('/editTask', function(req, res){
    const {id, title, description, type, deadline} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === 'admin') {
                Tasks.findByIdAndUpdate(id, {title, description, type, deadline}, function (err) {
                    if (err) {
                        res.json({message: err.name});
                    }else {
                        Tasks.find().populate('usersCount').populate('closedUsersCount').then(tasks => {
                            return res.json({tasks: tasks.map((task) => {
                                    return {
                                        id: task._id,
                                        title: task.title,
                                        description: task.description,
                                        type: task.type,
                                        created: task.created,
                                        deadline: task.deadline,
                                        closedTasks: task.closedUsersCount,
                                        issuedTasks: task.usersCount,
                                    }})
                            });
                        });
                    }
                });
            } else {
                return res.status(403).send();
            }
        })(req, res);
});

router.delete('/deleteTask', function(req, res){
    const {id} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === 'admin') {
                Tasks.deleteOne({ _id: id }, function (err) {
                    if (err) {
                        res.json({message: err.name});
                    }else {
                        IssuedTasks.deleteMany({taskId: id}).then(() => {
                            Tasks.find().populate('usersCount').populate('closedUsersCount').then(tasks => {
                                return res.json({tasks: tasks.map((task) => {
                                        return {
                                            id: task._id,
                                            title: task.title,
                                            description: task.description,
                                            type: task.type,
                                            created: task.created,
                                            deadline: task.deadline,
                                            closedTasks: task.closedUsersCount,
                                            issuedTasks: task.usersCount,
                                        }})
                                });
                            });
                        });

                    }
                });
            } else {
                return res.status(403).send();
            }
        })(req, res);
});
router.post("/getTaskUsers", function(req, res){
    const {id} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === "admin") {
                IssuedTasks.find({taskId: id}).populate('userId').then(tasks => {
                    return res.json({tasks: tasks.map((task) => {
                            return {
                                id: task._id,
                                name: task.userId.name,
                                status: task.status,
                                result: task.result,
                                closedDate: task.closedDate,
                            }})
                    });
                });
            }
        })(req, res);
});
router.post("/openTask", function(req, res){
    const {id, taskId} = req.body;
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err.name});
            }else if (user.role === "admin") {
                IssuedTasks.findByIdAndUpdate(id, {status: "open"}, function (err) {
                    if (err) {
                        res.json({message: err.name});
                    }else {
                        IssuedTasks.find({taskId: taskId}).populate('userId').then(tasks => {
                            return res.json({tasks: tasks.map((task) => {
                                    return {
                                        id: task._id,
                                        name: task.userId.name,
                                        status: task.status,
                                        result: task.result,
                                        closedDate: task.closedDate,
                                    }})
                            });
                        });
                    }
                });
            }
        })(req, res);
});

module.exports = router;