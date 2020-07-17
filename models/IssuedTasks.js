const mongoose = require('mongoose');
const IssuedTasksSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    taskId: mongoose.Schema.ObjectId,
    created: {
        type: Date,
        default: Date.now,
    },
    status: String,
    closedDate: Date,
    result: String,
});

const IssuedTasks = mongoose.model('IssuedTasks', IssuedTasksSchema);
module.exports = IssuedTasks;