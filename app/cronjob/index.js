const schedule = require('node-schedule');
const features = require('../features');

/*

            *    *    *    *    *    *
            ┬    ┬    ┬    ┬    ┬    ┬
            │    │    │    │    │    │
            │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
            │    │    │    │    └───── month (1 - 12)
            │    │    │    └────────── day of month (1 - 31)
            │    │    └─────────────── hour (0 - 23)
            │    └──────────────────── minute (0 - 59)
            └───────────────────────── second (0 - 59, OPTIONAL)

*/

const crawlCategories = schedule.scheduleJob('* * * */6 *', () => {
    features.crawlCategories();
    console.log('Crawling categories ...');
});

const crawlNew = schedule.scheduleJob('*/5 * * * *', () => {
    features.crawlingNews();
    console.log('Crawling latest news ...');
});

const updateCrawled = schedule.scheduleJob('*/5 * * * *', () => {
    features.updateCrawled();
    console.log('Update crawled ...');
});

module.exports = {
    crawlCategories,
    crawlNew,
    updateCrawled
}
