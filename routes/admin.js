const passport = require('passport');
const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.get("/getUsers", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err});
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
                res.json({message: err});
            }else if (user.role === 'admin') {
                Users.findByIdAndUpdate(id, {name: name}, function (err) {
                    if (err) {
                        res.json({message: err});
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
                res.json({message: err});
            }else if (user.role === 'admin') {
                Users.deleteOne({ _id: id }, function (err) {
                    if (err) {
                        res.json({message: err});
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

module.exports = router;