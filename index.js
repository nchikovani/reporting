const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express(); // create express app

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

const uri = "mongodb+srv://admin:admin@cluster0.vr7at.mongodb.net/reporting?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) return console.log(err);
    app.listen(8080, function(){
        console.log("Сервер ожидает подключения...");
    });
});
const Users = require('./models/Users');
require('./config/passport');
// const userAdmin = new Users({login: 'admin', password: 'admin', role: 'admin'});
// userAdmin.save();
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post('/login', function(req, res){
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
app.post('/register', function(req, res){
    const {login, password} = req.body;
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
                    password: password,
                    role: 'user',
                });
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