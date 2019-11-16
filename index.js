require('./service/db');

const request = require('request');
const cheerio = require('cheerio');
const date_time_format = require('./service/date_time_format');
const mongo_MU_news = require('./model/news');


request('https://giaoduc.net.vn/giao-duc-24h/khong-vuong-nghi-dinh-161-ha-noi-co-ly-do-gi-ma-khong-xet-dac-cach-giao-vien-post204414.gd', (error, response, html) => {
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

            mongo_MU_news.create({ date_time, title, data });

        });
    }
});