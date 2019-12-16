const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    _id: String,
    postId: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    post: Object
});

var postHistory = mongoose.model('Post_History', SomeModelSchema);

module.exports = postHistory;