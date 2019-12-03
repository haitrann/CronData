const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    time: Date,
    name: String,
    avatar: String,
    likes: Number,
    comment: String,
    reply: {
        time: Date,
        name: String,
        likes: Number,
        content: String
    },
    listContentId: String
});

var comment = mongoose.model('Comments', SomeModelSchema);

module.exports = comment;