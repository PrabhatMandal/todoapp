const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: String,
    completed: Boolean,
    completedAt: String

});
/**********add comment */
module.exports = mongoose.model('Todo', todoSchema);