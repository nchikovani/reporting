const mongoose = require('mongoose');
const crypto = require('crypto');
const UsersSchema = new mongoose.Schema({
    role: String,
    login: String,
    name: String,
    firstName: String,
    lastName: String,
    patronymic: String,
    position: String,
    team: String,
    signature: Buffer,
    hash: String,
    salt: String,
});
UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;