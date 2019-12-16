const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const base64 = require('base-64');
const getNumber = require('../../services/getNumber');
const dateTimeFormat = require('../../services/date_time_format');
const modelComment = require('../../models/comment');

module.exports = async function(encodedUrl, contentUrl) {
    let options = {
        uri: contentUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await requestPromise(options)
        .then(function ($) {
            let array = [];
            $('.cmt-item.primary-comment').each((index, element) => {
                const info = $(element).find('.meta');
                const username = $(info).find('h4').text();
                const strCommentDate = $(info).find('time').text();
                const commentDate = dateTimeFormat(strCommentDate);
                const message = $(element).find('.comment').text().replace(/\n\s+/g, '');
                const totalReact = getNumber($(element).find('.cmt-like-btn').text().replace(/\n\s+/g, ''));
                const unique = encodedUrl + strCommentDate;
                const commentId = base64.encode(unique);
                array.push({
                    _id: commentId,
                    message,
                    username,
                    postId: encodedUrl,
                    commentDate,
                    strCommentDate,
                    totalReact
                });
                $(element).nextAll('.cmt-item.secondary-comment').each((i,el) => {
                    const repInfo = $(element).find('.meta');
                    const repUsername = $(repInfo).find('h4').text();
                    const repStrCommentDate = $(repInfo).find('time').text();
                    const repCommentDate = dateTimeFormat(repStrCommentDate);
                    const repMessage = $(element).find('.comment').text().replace(/\n\s+/g, '');
                    const repTotalReact = getNumber($(element).find('.cmt-like-btn').text().replace(/\n\s+/g, ''));
                    const replyId = base64.encode(encodedUrl + strCommentDate);
                    array.push({
                        _id: replyId,
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

            array.forEach(el => {
                modelComment.create(el)
            })
        })
        .catch(function (err) {
            if (err) throw err;
        });
};