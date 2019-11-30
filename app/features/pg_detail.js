const request = require('request');
const cheerio = require('cheerio');
const modelDetail = require('../models/detail');
const dateTimeFormat = require('../services/date_time_format')


module.exports = function(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            function getData(selector) {
                let header = '';
                let content = '';
                let picture = [];
                let time = '';
                let writer = {};

                $(selector).each((index, element) => {
                    header = $(element).find('.details__summary.cms-desc').text();
                    $(element).find('.details__content.cms-body').each((i, el) => {
                        content += $(el).find('p').text();
                    });

                    $(element).find('.details__meta .meta').each((i,el) => {
                        const url = 'https://giaoduc.net.vn'
                        const t = $(el).find('time').text().replace(/\n\s+/g,'');
                        time = dateTimeFormat(t);
                        $(el).find('a').each((i,e) => {
                            writer = {
                                name: $(e).text(),
                                href: url + $(e).attr('href')
                            }
                        });
                    });

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

                return { header,time,writer,content,picture };
            };

            const data = getData('.details');

            modelDetail.create({_id: url,...data});
        };
    });
};