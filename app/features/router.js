const modelCategories = require('../models/categories');
const modelListContents = require('../models/listContents');
const pageDetail = require('./pg_detail');
const pageListContents = require('./pg_listContents');
const pageComments = require('./pg_comments');

const findPageHome = async () => {
    const data = await modelCategories.find().select('_id, href').exec();
    return data;
};

const crawlListContents = async () => {
    const data = await findPageHome();
    for (let i = 0; i < data.length; i++) {
        await pageListContents(data[i]._id, data[i].href);
    }
};

const findListContent = async () => {
    const data = await modelListContents.find().select('_id, href').exec();
    return data;
};

const crawlPageDetail = async () => {
    const data = await findListContent();
    for (let i = 0; i < data.length; i++) {
        await pageDetail(data[i]._id, data[i].href);
    }
};

const crawlComments = async () => {
    const data = await findListContent();
    data.forEach(el => {
        pageComments(el._id, el.href);
    });
};

module.exports = {
    crawlListContents,
    crawlPageDetail,
    crawlComments
};
