const request = require('request');
const cheerio = require('cheerio');
const modelDetail = require('../models/detail');


module.exports = function(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            function getData(selector) {
                let header = '';
                let content = '';
                let picture = {};
                let time = '';
                let writer = {};

                $(selector).each((index, element) => {
                    header = $(element).find('.details__summary.cms-desc').text();
                    $(element).find('.details__content.cms-body').each((i, el) => {
                        content += $(el).find('p').text();
                    });

                    $(element).find('.details__meta').each((i,el) => {
                        time = $(el).find('time').text();
                        // $(el).find('a').each((i,e) => {
                        //     writer = {
                        //         name: $(e).text(),
                        //         href: $(e).attr('href')
                        //     }
                        // });
                    });

                    $(element).find('.picture').each((i, el) => {
                        const src = 'https:' + $(el).find('.pic img').attr('src');
                        const cap = $(el).find('.caption').text();
                        picture = {
                            image: src,
                            caption: cap
                        }
                    });

                });

                return { header,time,writer,content,picture };
            };

            const data = getData('.details');
            // console.log({time: data.time.replace(/\n\s+/g,'')})

            // modelDetail.create({_id: url,...data});
        };
    });
};