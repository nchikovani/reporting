const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const indexRouter = require('./routes');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

const uri = "mongodb+srv://admin:admin@cluster0.vr7at.mongodb.net/reporting?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) return console.log(err);
    app.listen(8080, function(){
        console.log("Сервер ожидает подключения...");
    });
});

require('./config/passport');
// const userAdmin = new Users({login: 'admin', role: 'admin'});
// userAdmin.setPassword('admin');
// userAdmin.save();
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/', indexRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


