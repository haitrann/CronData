const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const base64 = require('base-64');
const getNumber = require('../../library/get_number');
const dateTime = require('../../library/date_time');

module.exports = async function(encodedUrl, contentUrl) {
    let array = [];
    let options = {
        uri: contentUrl,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    await requestPromise(options)
        .then(function($) {
            $('.cmt-item.primary-comment').each((index, element) => {
                const info = $(element).find('.meta');
                const username = $(info).find('h4').text();
                const strCommentDate = $(info).find('time').text();
                const commentDate = dateTime.isoFormat(strCommentDate);
                const message = $(element).find('.comment').text().replace(/\n\s+/g, '');
                const totalReact = getNumber($(element).find('.cmt-like-btn').text().replace(/\n\s+/g, ''));
                const unique = encodedUrl + strCommentDate;
                // const commentId = base64.encode(unique);
                array.push({
                    message,
                    username,
                    postId: encodedUrl,
                    commentDate,
                    strCommentDate,
                    totalReact
                });
                $(element).nextAll('.cmt-item.secondary-comment').each((i, el) => {
                    const repInfo = $(el).find('.meta');
                    const repUsername = $(repInfo).find('h4').text();
                    const repStrCommentDate = $(repInfo).find('time').text();
                    const repCommentDate = dateTime.isoFormat(repStrCommentDate);
                    const repMessage = $(el).find('.comment').text().replace(/\n\s+/g, '');
                    const repTotalReact = getNumber($(el).find('.cmt-like-btn').text().replace(/\n\s+/g, ''));
                    // const replyId = base64.encode(encodedUrl + strCommentDate);
                    array.push({
                        message: repMessage,
                        username: repUsername,
                        postId: encodedUrl,
                        commentDate: repCommentDate,
                        strCommentDate: repStrCommentDate,
                        totalReact: repTotalReact,
                        replyOfId: commentId
                    });
                });
            });
        })
        .catch(function(err) {
            if (err) throw err;
        });

    return array;
};