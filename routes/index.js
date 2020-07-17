const passport = require('passport');
const path = require("path");
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Users = require('../models/Users');

router.get("/userinfo", function(req, res){
    passport.authenticate('jwt', {session: false},
        (err, user) => {
            if (err) {
                res.json({message: err});
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
                    res.send(err);
                }
                const token = jwt.sign({id: user._id}, 'secret');
                return res.json({role: user.role, login: user.login, token});
            });
        }
    })(req, res);
});
router.post('/register', function(req, res){
    const {login, password, name} = req.body;
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
                    login: login,
                    role: 'user',
                    name: name,
                });
                newUser.setPassword(password);
                newUser.save()
                    .then(user => {
                        req.login(user, {session: false}, (err) => {
                            if (err) {
                                res.send(err);
                            }
                            const token = jwt.sign({id: user._id}, 'secret');
                            return res.json({login: user.login, token});
                        });
                    }, error=> {
                        res.json({message: error});
                    });
            }
        });
});
module.exports = router;