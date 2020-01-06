const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const crawlDetail = require('./detail');
const crawlComment = require('./comment');
const postService = require('../../services/post');
const postHistoryService = require('../../services/post_history');
const commentService = require('../../services/comment');
const crawledUrlService = require('../../services/crawled_url');
const formatUrl = require('../../library/format_url');
const dateTime = require('../../library/date_time');

const crawlDetailAndCommentOfTimeline = async (crawlFirstPaging) => {
    const listCategories = await crawledUrlService.findModelCrawledUrl();
    for (let i = 0; i < listCategories.length; i++) {
        const crawledUrlId = listCategories[i].crawledUrlId;
        let numPage = 1;
        let checkLoop = 0;
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
                            if (checkExist === false) {
                                const detailValue = await crawlDetail(crawledUrlId, contentUrl);
                                yearPostNews = dateTime.getYear(detailValue.postDate);
                                if (yearPostNews >= process.env.LIMIT_YEAR) {
                                    postService.createModelPost(detailValue);
                                    if (detailValue.numComments > 0) {
                                        const comment = await crawlComment(detailValue.encodedUrl, contentUrl);
                                        commentService.createModelComment(comment);
                                    }
                                }
                                else {
                                    checkLoop += 1;
                                    return 0;
                                }
                            }
                        }
                    }
                })
                .catch(function (err) {
                    if (err) throw err;
                });
            
            if (crawlFirstPaging === true) {
                return 0;
            }
            else {
                numPage += 1;
            }
        }
        while (checkLoop < 1);
        console.log('Crawling data done ...');
    }
};

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
                            postService.createModelPost(detailValue);
                            if (detailValue.numComments > 0) {
                                const comment = await crawlComment(detailValue.encodedUrl, contentUrl);
                                commentService.createModelComment(comment);
                            }
                        }
                        else
                            crawlFail += 1;
                    }
                }

                if (crawlFail === 0) {
                    await crawlDetailAndCommentOfTimeline(true);
                }
                else {
                    return 0;
                }
            })
            .catch(function (err) {                           
                if (err) throw err;
            });
    }
};

const updateValueCrawled = async () => {
    const arr = await postService.findUrlExistModelPost();
    for (let i = 0; i < arr.length; a++) {
        const detailValue = await crawlDetail(arr[i].crawledUrlId, arr[i].linkPost);
        if (detailValue.contentHTML != arr[i].contentHTML) {
            await postHistoryService.createModelPostHistory({
                postId: arr[i]._id,
                post: arr[i]
            });
            await postService.updateModelPost(arr[i]._id, detailValue);
        }
    }
};

module.exports = {
    crawlDetailAndCommentOfHighlight,
    crawlDetailAndCommentOfTimeline,
    updateValueCrawled
};