const modelComment = require('../models/comment');


const createModelComment = (value) => {
    return modelComment.create(value);
};

module.exports = {
    createModelComment
}