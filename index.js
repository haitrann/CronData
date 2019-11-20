require('./service/db');

const request = require('request');
const cheerio = require('cheerio');
const date_time_format = require('./service/date_time_format');
const ModelComment = require('./model/comment');


request('https://giaoduc.net.vn/giao-duc-24h/khong-vuong-nghi-dinh-161-ha-noi-co-ly-do-gi-ma-khong-xet-dac-cach-giao-vien-post204414.gd', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.data').each((index, element) => {
            const user = $(element)
                .find('h4')
                .text()
				.replace(/\n/g,' ');

            const time = $(element)
                .find('time')
                .text()
				.replace(/\n/g,' ');
           
		   const comment = $(element)
                .find('.comment')
                .text()
				.trim()			
				.replace(/\n/g,' ');
			
			const like_comment = $(element)
                .find('.likecomment .cmt-like-btn')
                .text()
				.trim()		
				.replace(/\n/g,' ');
        
		const date_time = date_time_format(time);
			//mongo_MU_newsco
			console.log(like_comment);				
			//ModelComment.updateOne({like_comment:like_comment});
				ModelComment.findOne({'like_comment':like_comment},function(e,r){
				if(r!=null)
				{
					console.log("not null");
					ModelComment.updateOne(
						{date_time: date_time},
						{
							$set: {
								like_comment: like_comment
							}
						}		
					).exec(function (err, athletes) {
					  if (err) return handleError(err);
					 else 	console.log("update thanh cong");
					})
				}
				else
				{
					console.log("null");
					console.log(r);
					ModelComment.create({user, comment, like_comment, date_time });
					//var ModelComment=new ModelComment(r);
				//	ModelComment.save(r);
				}
			});		
            //ModelComment.create({user, comment, like_comment, date_time });
        });
    }
});