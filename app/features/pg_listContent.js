const request = require('request');
const cheerio = require('cheerio');
const modelListContent = require('../models/listContent');


module.exports = function(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let array = [];

            function getData(selector) {
                $(selector).each((index, element) => {
                    $(element).find('a.story__title.cms-link').each((i,el) => {
                        const title = $(el).text();
                        const href = $(el).attr('href');
                        array.push({title,href});
                    })
                })

                return array;
            };

            const listContent = getData('.l-content article.story');
            console.log(listContent.length)
            listContent.forEach(item => {
                item.href = url + item.href;
                modelListContent.create(item);
            });
        };
    });
};