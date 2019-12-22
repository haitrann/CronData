const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const base64 = require('base-64');
const getNumber = require('../../library/get_number');
const dateTime = require('../../library/date_time');
const modelPost = require('../../models/post');


module.exports = async function(crawledUrlId, contentUrl) {
    let numComments;
    let encodedUrl;
    let postDate;
    let options = {
        uri: contentUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    await requestPromise(options)
        .then(function ($) {
            let detailObj = {};
            const contentHTML = $('.details');
            const story = contentHTML.find('.details__summary.cms-desc').text();
            let message;
            contentHTML.find('.details__content.cms-body').each((i, el) => {
                message += $(el).find('p').text();
            });
            const postedByUserName = contentHTML.find('.details__meta .meta a').text();
            const postedByUserUrl = 'https://giaoduc.net.vn' + contentHTML.find('.details__meta .meta a').attr('href');

            const strPostDate = contentHTML.find('.details__meta .meta time').text().replace(/\n\s+/g,'');
            postDate = dateTime.isoFormat(strPostDate);


            numComments = getNumber(contentHTML.find('.details__meta .right').find('a').text());

            encodedUrl = base64.encode(contentUrl);

            let hashtags = [];
            contentHTML.find('div.tags ul li a').each((i,el) => {
                const url = 'https://giaoduc.net.vn/' + $(el).attr('href');
                const name = $(el).text();
                hashtags.push({
                    name,
                    url
                });
            });

            detailObj = {
                _id: encodedUrl,
                numComments,
                linkPost: contentUrl,
                story,
                message,
                postDate,
                strPostDate,
                contentHTML,
                encodedUrl,
                crawledUrlId,
                postedByUserName,
                postedByUserUrl,
                hashtags
            }

            modelPost.create(detailObj);

        })
        .catch(function (err) {
            if (err) throw err;
        });

    return {
        numComments,
        encodedUrl,
        postDate
    };
};