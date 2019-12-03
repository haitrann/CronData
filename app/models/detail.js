const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    time: Date,
    writer: {
        name: String,
        href: String
    },
    
    header: String,
    content: String,
    picture: [{
        image: String,
        caption: String
    }],    
    totalComment: Number,
    listContentId: String

});

var detail = mongoose.model('Detail', SomeModelSchema);

module.exports = detail;