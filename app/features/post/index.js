const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const modelCrawledUrl = require('../../models/crawled_url');
const crawlDetail = require('./detail');
const crawlComment = require('./comment');

const findPageHome = async () => {
    return await modelCrawledUrl.find().select('crawledUrlId, url').exec();
};

const crawlPageDetailAndComment = async () => {
    const listCategories = await findPageHome();
    for (let i = 0; i < listCategories.length; i++) {
        const crawledUrlId = listCategories[i].crawledUrlId;
        const url = listCategories[i].url;
        let options = {
            uri: url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        await requestPromise(options)
            .then(async function ($) {
                const arrA = $('.l-content article.story');
                for (let a = 0; a < arrA.length; a++) {
                    const arrB = $(arrA[a]).find('a.story__title.cms-link');
                    for (let b = 0; b < arrB.length; b++) {
                        const contentUrl = 'https://giaoduc.net.vn' + $(arrB[b]).attr('href');
                        const detailValue = await crawlDetail(crawledUrlId, contentUrl);
                        if (detailValue.numComments > 0) {
                            await crawlComment(detailValue.encodedUrl, contentUrl);
                        }
                    }
                }
            })
            .catch(function (err) {
                if (err) throw err;
            });
    }
};

module.exports = {
    crawlPageDetailAndComment
}