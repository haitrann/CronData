

// const pageHome = require('./home/categories');
// pageHome('https://giaoduc.net.vn');





// https://giaoduc.net.vn/goc-nhin/o-my-ho-khong-muon-chung-toi-hoc-post199792.gd ------- link co reply comment




//crawl trang list content

// const listContents = require('./router');
// listContents.crawlListContents();



// const detail = require('./post/index');
// detail.crawlPageDetailAndComment();


// crawl comments
// const comment = require('./post/comment');
// comment('123','https://giaoduc.net.vn/goc-nhin/o-my-ho-khong-muon-chung-toi-hoc-post199792.gd')

const abc = require('./post/handling');
// abc.crawlDetailAndCommentOfHighlight();
abc.crawlDetailAndCommentOfTimeline();