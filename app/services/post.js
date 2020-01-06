const modelPost = require('../models/post');
const base64 = require('base-64');

const findCheckExistModelPost = (value) => {
    return modelPost.exists({_id: base64.encode(value)});
};

const createModelPost = (value) => {
    return modelPost.create(value);
};

const updateModelPost = (id, value) => {
    return modelPost.findByIdAndUpdate(id, value);
};

const findContentHTMLModelPost = (value) => {
    return modelPost.find({_id: value}).select('contentHTML').exec();
};

const findUrlExistModelPost = () => {
    return modelPost.find().select('_id linkPost contentHTML crawledUrlId').exec();
};

module.exports = {
    findCheckExistModelPost,
    createModelPost,
    findContentHTMLModelPost,
    updateModelPost,
    findUrlExistModelPost
}
