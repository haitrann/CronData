const request = require('request');
const cheerio = require('cheerio');
const modelDetail = require('../models/detail');
const getNumber = require('../services/getNumber');
const dateTimeFormat = require('../services/date_time_format')


module.exports = function(id,url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            function getData(selector) {
                let header = '';
                let content = '';
                let picture = [];
                let writer = {};
                let time = '';
                let totalComment = '';

                $(selector).each((index, element) => {
                    header = $(element).find('.details__summary.cms-desc').text();
                    $(element).find('.details__content.cms-body').each((i, el) => {
                        content += $(el).find('p').text();
                    });

                    writer = {
                        name: $(element).find('.details__meta .meta a').text(),
                        href: 'https://giaoduc.net.vn' + $(element).find('.details__meta .meta a').attr('href')
                    }

                    time = dateTimeFormat($(element).find('.details__meta .meta time').text().replace(/\n\s+/g,'')); 

                    totalComment = getNumber($(element).find('.details__meta .right').find('a').text());

                    $(element).find('.picture').each((i, el) => {
                        const src = 'https:' + $(el).find('.pic img').attr('src');
                        const cap = $(el).find('.caption').text().replace(/\n\s+/g,'');
                        pic = {
                            image: src,
                            caption: cap
                        }
                        picture.push(pic);
                    });

                });

                return { time,writer,header,content,picture,totalComment};
            };

            const data = getData('.details');
            console.log(a.push(data))
            // modelDetail.create({...data, listContentId: id});
        };
    });
};