const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    _id: String,
    url: String,
    name: String,
    crawledUrlId: String,
    priorityType:  {
        type: String,
        default: 'HIGH'
    },
    urlType: {
        type: String,
        default: 'GIAODUCNET'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: null
    },
    crawlNum: {
        type: Number,
        default: 0
    },
    failNum: {
        type: Number,
        default: 0
    },
    urlStatus: String,
    sourceType: {
        type: String,
        default: 'GIAODUCNET'
    }
});

var crawledURL = mongoose.model('Crawled_Url', SomeModelSchema);

module.exports = crawledURL;