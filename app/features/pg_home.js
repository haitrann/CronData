const request = require('request');
const cheerio = require('cheerio');
const modelCategories = require('../models/categories');


request('https://giaoduc.net.vn/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let array1 = [];
        let array2 = [];
        // $('.menu-heading').each((index, element) => {
            
        //     const title = $(element)
        //         .text()
        //         .replace(/\n\s+/g, '');

        //     if ( title.length > 0 ) {
        //         const href = $(element)
        //             .attr('href');

        //         array1.push({ title, href });
        //     }

        //     // const a = $(element)
        //     //     .find('a')
        //     //     .length;
        //     // console.log
        // });


        $('a').each((index, element) => {
            const title = $(element)
                .find($('.menu-heading'))
                .text();
            console.log(title)
        });

    }
});