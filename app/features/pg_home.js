const request = require('request');
const cheerio = require('cheerio');
const { encrypt } = require('../services/hash');
const modelCategories = require('../models/categories');


module.exports = function(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let menu = [];

            function getMenu(selector, parent) {
                let menuList = [];

                (typeof parent !== 'undefined' ? $(parent).find(selector) : $(selector)).each(function(index, element) {
                    const menuItem = $(element).children('a');

                    const title = menuItem.text().replace(/\n\s+/g, '');

                    if ( title.length > 0 ) {
                        let menuDetail = {
                            title,
                            href: url + menuItem.attr('href')
                        }
                        if ($(element).has('ul')) {
                            // menuDetail.children = getMenu(`${selector} ul li`, element)
                            getMenu(`${selector} ul li`, element).forEach(el => {
                                menuList.push({
                                    ...el
                                    // parent: 
                                });
                            });
                        };
                        menuList.push({_id: encrypt(menuDetail.href), ...menuDetail});
                    };
                })
                return menuList;
            }

            menu = getMenu('li.menu-item');
            menu.forEach(el => {
                modelCategories.create(el);
            })
 
        };
    });
};