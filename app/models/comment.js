const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    message: String,
    username: String,
    postId: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: Date,
    commentDate: Date,
    strCommentDate: String,
    totalReact: Number,
    replyOfId: {
        type: String,
        default: null
    }
});

var comment = mongoose.model('Comment', SomeModelSchema);

module.exports = comment;