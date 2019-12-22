const modelPost = require('../models/post');
const base64 = require('base-64');

const findCheckExistModelPost = async (value) => {
    return await modelPost.exists({_id: base64.encode(value)});
};

module.exports = {
    findCheckExistModelPost
}
