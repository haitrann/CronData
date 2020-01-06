const modelPostHistory = require('../models/post_history');

const createModelPostHistory = (value) => {
    return modelPostHistory.create(value);
};

module.exports = {
    createModelPostHistory
}