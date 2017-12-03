// const cheerio = require('cheerio');
// const request = require('superagent');
// const path = require('path')
// const fs = require('fs');
// const async = require('async');
// const mkdirp = require('mkdirp');

// const baseUrl = 'http://www.zbjuran.com/mei/'
// const urlPre = 'http://www.zbjuran.com/mei/';

// // 网址列表

// const getImgUrl = () => {
//     let imgUrl = [];
//     let dir = './mei/';

//     request
//         .get(baseUrl)
//         .end(function(err,res){
//             if (err) {
//                 console.log('boom sha ka la ka', err)
//                 return false
//             }
//             console.log('bbbb',res);
//             let $ = cheerio.load(res);
//             let imgDom = $('div.changeDiv > a')[0];
//             console.log('aaaa',imgDom);
//         })

//     // mkdirp(dir,function(err){
//     //     if(error){
//     //         console.log(err);
//     //     }else{
//     //         console.log(dir+'文件夹创建成功')
//     //     }
//     // })
// }
// getImgUrl();



