const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    _id: String,
    numComments: Number,
    postType: {
        type: String,
        default: 'NEWS'
    },
    linkPost: String,
    story: String,
    message: String,
    postDate: Date,
    strPostDate: String,
    contentHTML: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    updateDate: Date,
    encodedUrl: String,
    crawledUrlId: [ String ],
    postedByUserName: String,
    postedByUserUrl: String,
    postedByUrlType: {
        type: String,
        default: 'GIAODUCNET'
    },
    hashtags: [{
        name: String,
        url: String,
    }]
});

var post = mongoose.model('Post', SomeModelSchema);

module.exports = post;