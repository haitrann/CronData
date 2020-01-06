const modelCrawledUrl = require('../models/crawled_url');

const findModelCrawledUrl = () => {
    return modelCrawledUrl.find().select('crawledUrlId url').exec();
};

module.exports = {
    findModelCrawledUrl
}
