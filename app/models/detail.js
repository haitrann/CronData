const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    _id: String,
    time: Date,
    writer: String,
    header: String,
    content: String,
    picture: {
        image: String,
        caption: String
    }
});

var detail = mongoose.model('Detail', SomeModelSchema);

module.exports = detail;