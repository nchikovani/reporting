const passport = require('passport');
const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Users = require('../models/Users');

router.get("/userinfo", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                return res.json({message: err.name});
            }else if (user) {
                return res.json({role: user.role, login: user.login});
            } else {
                return res.status(403).send();
            }
        })(req, res);
});

router.post('/login', function(req, res){
    const {login, password} = req.body;
    if(!login) {
        return res.json({message: 'login is required' });
    }
    if(!password) {
        return res.json({message: 'password is required' });
    }
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if(info) {
            return res.json({message: info.message});
        }
        if(user) {
            // return res.json({ role: user.role, login: user.login});
            req.login(user, {session: false}, (err) => {
                if (err) {
                    return res.json({message: err.name});
                }
                const token = jwt.sign({id: user._id}, 'secret');
                return res.json({role: user.role, login: user.login, token});
            });
        }
    })(req, res);
});
router.post('/register', function(req, res){
    const {
        login,
        password,
        firstName,
        lastName,
        patronymic,
        position,
        team,
        signature,
    } = req.body;
    if(!login) {
        return res.json({message: 'login is required' });
    }
    if(!password) {
        return res.json({message: 'password is required' });
    }
    Users.findOne({login: login})
        .then(user => {
            if(user) {
                return res.json({message: 'User is already registered'});
            } else {
                const newUser = new Users({
                    role: 'user',
                    login,
                    password,
                    firstName,
                    lastName,
                    patronymic,
                    position,
                    team,
                    signature: signature,
                });
                newUser.setPassword(password);
                newUser.save()
                    .then(user => {
                        req.login(user, {session: false}, (err) => {
                            if (err) {
                                return res.json({message: err.name});
                            }
                            const token = jwt.sign({id: user._id}, 'secret');
                            return res.json({login: user.login, token});
                        });
                    }, error=> {
                        res.json({message: error.name});
                    });
            }
        });
});
module.exports = router;