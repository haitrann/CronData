const request = require('request');
const cheerio = require('cheerio');
const modelCategories = require('../models/categories');


request('https://giaoduc.net.vn/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const abc = $('.menu-heading selected').text();
        console.log(':::::::::::',abc)
        // $('.menu-heading selected').each((index, element) => {
            
            // const title = $(element)
            //     .find('.news-list__headline-link')
            //     .text()
            //     .replace(/\s\s+/g, '');

            // const time = $(element)
            //     .find('.label__timestamp')
            //     .text();

            // const data = $(element)
            //     .find('.news-list__snippet')
            //     .text();

            // const date_time = date_time_format(time);

            // // mongo_MU_news.create({ date_time, title, data });

        // });
    }
});