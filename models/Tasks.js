const mongoose = require('mongoose');
const TasksSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now,
    },
    title: String,
    description: String,
    type: String,
    deadline: Date,
});
TasksSchema.virtual('usersCount', {
    ref: 'IssuedTasks', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'taskId', // is equal to `foreignField`
    count: true
});
TasksSchema.virtual('closedUsersCount', {
    ref: 'IssuedTasks', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'taskId', // is equal to `foreignField`
    count: true,
    match: { status: "closed" }
});
const Tasks = mongoose.model('Tasks', TasksSchema);
module.exports = Tasks;