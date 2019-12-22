const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const crawlDetail = require('./detail');
const crawlComment = require('./comment');
const postService = require('../../services/post');
const crawledUrlService = require('../../services/crawled_url');
const formatUrl = require('../../library/format_url');
const dateTime = require('../../library/date_time');

const crawlDetailAndCommentOfHighlight = async () => {
    const listCategories = await crawledUrlService.findModelCrawledUrl();
    for (let i = 0; i < listCategories.length; i++) {
        const crawledUrlId = listCategories[i].crawledUrlId;
        const url = listCategories[i].url;

        let option = {
            uri: url,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        await requestPromise(option)
            .then(async function ($) {
                const arrA = $('.highlight');
                let crawlFail = 0;
                for (let a = 0; a < arrA.length; a++) {
                    const arrB = $(arrA[a]).find('a.story__title.cms-link');
                    for (let b = 0; b < arrB.length; b++) {
                        const contentUrl = 'https://giaoduc.net.vn' + $(arrB[b]).attr('href');
                        const checkExist = await postService.findCheckExistModelPost(contentUrl);
                        if (checkExist === false) {
                            const detailValue = await crawlDetail(crawledUrlId, contentUrl);
                            if (detailValue.numComments > 0) {
                                await crawlComment(detailValue.encodedUrl, contentUrl);
                            }   
                        }
                        else
                            crawlFail += 1;
                    }
                }

                return crawlFail;
            })
            .catch(function (err) {                           
                if (err) throw err;
            });
    }
};


//--------------------------------- crawl paging -------------------------------------
const crawlDetailAndCommentOfTimeline = async () => {
    const listCategories = await crawledUrlService.findModelCrawledUrl();
    for (let i = 0; i < listCategories.length; i++) {
        const crawledUrlId = listCategories[i].crawledUrlId;
        let numPage = 1;
        let yearPostNews;
        do {
            const url = formatUrl(listCategories[i].url, numPage);
            let option = {
                uri: url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };

            await requestPromise(option)
                .then(async function ($) {
                    const arrA = $('.timeline');
                    for (let a = 0; a < arrA.length; a++) {
                        const arrB = $(arrA[a]).find('a.story__title.cms-link');
                        for (let b = 0; b < arrB.length; b++) {
                            const contentUrl = 'https://giaoduc.net.vn' + $(arrB[b]).attr('href');
                            const checkExist = await postService.findCheckExistModelPost(contentUrl);
                            console.log(checkExist)
                            if (checkExist === false) {
                                const detailValue = await crawlDetail(crawledUrlId, contentUrl);
                                yearPostNews = dateTime.getYear(detailValue.postDate);
                                if (detailValue.numComments > 0) {
                                    await crawlComment(detailValue.encodedUrl, contentUrl);
                                }   
                            }
                        }
                    }
                })
                .catch(function (err) {
                    if (err) throw err;
                });
            
            numPage += 1;
        }
        while (yearPostNews <= 2018);
    }
};

module.exports = {
    crawlDetailAndCommentOfHighlight,
    crawlDetailAndCommentOfTimeline
};