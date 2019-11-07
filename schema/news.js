const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    date_time: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: ''
    },
    data: {
        type: String,
        default: ''
    }
});

var MUnews = mongoose.model('MUnews', SomeModelSchema);

module.exports = MUnews;