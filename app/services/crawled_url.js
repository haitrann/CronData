const modelCrawledUrl = require('../models/crawled_url');

const findModelCrawledUrl = async () => {
    return await modelCrawledUrl.find().select('crawledUrlId, url').exec();
};

module.exports = {
    findModelCrawledUrl
}
