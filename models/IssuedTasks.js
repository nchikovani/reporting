const mongoose = require('mongoose');
const IssuedTasksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users'
    },
    taskId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tasks'
    },
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