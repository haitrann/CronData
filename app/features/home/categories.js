const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const base64 = require('base-64');
const modelCrawledUrl = require('../../models/crawled_url');


module.exports = async function(url = 'https://giaoduc.net.vn/') {
    let options = {
        uri: url,
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    await requestPromise(options)
        .then(function($) {
            let menu = [];

            function getMenu(selector) {
                $(selector).each((index, element) => {
                    const a = $(element).find('a.menu-heading')
                    const name = $(a).text().replace(/\n\s+/g, '');
                    if (name.length > 0) {
                        const link = url + $(a).attr('href');
                        const id = base64.encode(link);
                        menu.push({
                            _id: id,
                            crawledUrlId: id,
                            url: link,
                            name
                        });
                    };
                });
                $(selector).find('ul.mega-menu').each((index, element) => {
                    const a = $(element).find('a');
                    const name = $(a).text().replace(/\n\s+/g, '');
                    const link = url + $(a).attr('href');
                    const id = base64.encode(link);
                    menu.push({
                        _id: id,
                        crawledUrlId: id,
                        url: link,
                        name
                    })
                });
                return menu;
            };

            menu = getMenu('li.menu-item');
            menu.forEach(el => {
                modelCrawledUrl.create(el);
            });
            console.log('Crawling categories done ...');
        })
        .catch(function(err) {
            if (err) throw err;
        });
};