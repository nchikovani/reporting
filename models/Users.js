const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

UsersSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;