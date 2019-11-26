const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
	user: String,
	comment: String,
    like_comment: String,
    date_time: {
        type: Date,
        default: Date.now
    }
});

var Comment = mongoose.model('Comment', SomeModelSchema);

module.exports = Comment;