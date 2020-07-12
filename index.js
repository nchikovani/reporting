const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express(); // create express app

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/db", { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) return console.log(err);
    app.listen(8080, function(){
        console.log("Сервер ожидает подключения...");
    });
});
const Users = require('./models/Users');
require('./config/passport');
// // const newUser1 = new Users({login: 'user1', password: '123', role: 'user'});
// const newUser2 = new Users({login: 'admin', password: 'admin', role: 'admin'});
//
// // newUser1.save();
// newUser2.save();
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.post('/login', function(req, res, next){
    const login=String(req.body.login),
        password=String(req.body.password);
    if(!login) {
        return res.json({message: 'login is required' });
    }
    if(!password) {
        return res.json({message: 'password is required' });
    }
    return passport.authenticate('login', { session: false }, (err, user, info) => {
        if(info) {
            res.json({
                message: info.message,
            });
        }
        if(user) {
            return res.json({ role: user.role, login: user.login});
        }
    })(req, res, next);
});
