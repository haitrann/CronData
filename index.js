require('./db');

const request = require('request');
const cheerio = require('cheerio');
const date_time_format = require('./date_time_format');
const mongo_MU_news = require('./schema/news');


request('https://www.skysports.com/manchester-united-news',(error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.news-list__body').each((index, element) => {
            const title = $(element)
                .find('.news-list__headline-link')
                .text()
                .replace(/\s\s+/g, '');

            const time = $(element)
                .find('.label__timestamp')
                .text();

            const data = $(element)
                .find('.news-list__snippet')
                .text();

            const date_time = date_time_format(time);

            mongo_MU_news.create({date_time, title, data});
            
        });
    }
});