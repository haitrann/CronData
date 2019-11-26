const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    title: String,
    href: String
});

var Categories = mongoose.model('Categories', SomeModelSchema);

module.exports = Categories;