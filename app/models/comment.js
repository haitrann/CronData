const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
	user: {
        type: String,
        default: ''
    },   
	comment: {
        type: String,
        default: ''
    },
	like_comment: {
        type: String,
        default: ''
    },
   date_time: {
        type: Date,
        default: Date.now
    }
    
});

var UComment = mongoose.model('UserComment', SomeModelSchema);

module.exports = UComment;