const request = require('request');
const cheerio = require('cheerio');
const getNumber = require('../services/getNumber');
const dateTimeFormat = require('../services/date_time_format');
const modelComments = require('../models/comment');


module.exports = function(id,url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let array = [];

            function getData(selector) {
                $(selector).each((index, element) => {
                    const avatar = 'https:' + $(element).find('img').attr('src');
                    const info = $(element).find('.meta');
                    const name = $(info).find('h4').text();
                    const time = dateTimeFormat($(info).find('time').text());
                    const comment = $(element).find('.comment').text().replace(/\n\s+/g, '');
                    const likes = getNumber($(element).find('.cmt-like-btn').text().replace(/\n\s+/g, ''));

                    array.push({ time,name,avatar,likes,comment,listContentId: id });
                });

                return array;
            };

            const data = getData('.cmt-item.primary-comment');
            data.forEach(el => {
                modelComments.create(el)
            })
        };
    });
};