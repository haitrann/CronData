const post = require('./post');
const home = require('./home');

const crawlCategories = async () => {
    home();
};

const updateCrawled = async () => {
    post.updateValueCrawled();
};

const crawlingNews = async () => {
    post.crawlDetailAndCommentOfHighlight();
};

const crawlingPaging = async () => {
    post.crawlDetailAndCommentOfTimeline();
}

module.exports = {
    crawlingNews,
    updateCrawled,
    crawlingPaging,
    crawlCategories
}