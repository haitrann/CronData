const request = require('request');
const cheerio = require('cheerio');
const { encrypt } = require('../services/hash');
const modelListContents = require('../models/listContents');


module.exports = function(id,url) {
    return new Promise((resolve,reject) => {
        request(url, async (error, response, html) => {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);
                let array = [];

                function getData(selector) {
                    $(selector).each((index, element) => {
                        $(element).find('a.story__title.cms-link').each((i,el) => {
                            const title = $(el).text();
                            const href = url + $(el).attr('href');
                            array.push({
                                _id: encrypt(href),
                                title,
                                href,
                                categoryId: id});
                        })
                    })

                    return array;
                };

                const listContent = getData('.l-content article.story');
                for (let i = 0; i < listContent.length; i++) {
                    await modelListContents.create(listContent[i]);
                }
                resolve();
            };
        }); 
    });
};