const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    _id: String,
    title: String,
    href: {
        type: String,
        unique: true
    }
});

var Categories = mongoose.model('Categories', SomeModelSchema);

module.exports = Categories;