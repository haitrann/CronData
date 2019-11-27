const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    title: String,
    href: String
});

var listContent = mongoose.model('List_Content', SomeModelSchema);

module.exports = listContent;