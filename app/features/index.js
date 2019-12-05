// const pageHome = require('./pg_home');
// pageHome('https://giaoduc.net.vn');





// https://giaoduc.net.vn/goc-nhin/o-my-ho-khong-muon-chung-toi-hoc-post199792.gd ------- link co reply comment




//crawl trang list content

const listContents = require('./router');
listContents.crawlListContents();






//crawl trang detail
// const detail = require('./router');
// detail.crawlPageDetail();


//crawl comments
// const comment = require('./router');
// comment.crawlComments();