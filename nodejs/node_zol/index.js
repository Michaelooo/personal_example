const cheerio = require('cheerio');
const request = require('superagent');
const path = require('path')
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const iconv = require('iconv-lite');
require('superagent-charset')(request);
//const page = require('webpage').create();
const baseUrl = 'http://www.zbjuran.com/mei/'
const urlPre = 'http://www.zbjuran.com';
const http = require('http');
// 获取目标网址列表，并创建文件夹
let dir = './meizi/';
let imgUrl = [],bigImgUrl=[],fileNameArr = [];
let tasks = [];

const getImgUrl = (callback) => {
    request
        .get(baseUrl)
        .set('Content-Type', 'text/html;charset=gb2312')
        .charset('gbk')
        .end(function (err, res) {
            if (err) {
                console.log('boom sha ka la ka', err)
                return false
            }

            //console.log('resBody', res.text);
            let $ = cheerio.load(res.text);
            let imgDom = $('div.changeDiv a').toArray();
            for (let index = 0; index < imgDom.length; index++) {
                let aUrl = imgDom[index].attribs.href;
                imgUrl.push(path.join(urlPre, aUrl));

                let fileName = imgDom[index].attribs.title;
                let fileDir = path.join(dir, fileName);
                mkdirp(fileDir, function (err, res) {
                    if (err) 
                        console.log('创建文件夹失败')
                    else 
                        console.log(fileDir + '创建成功')
                })

            }
            console.log('aaaaa',imgUrl);
            asyncQuery(imgUrl);
        })
}

// 得到目标大图URL列表，进一步获取图片
const fetchUrl = (url, callback) => {
    console.log('yyyyy',url);

    // var option = {
    //     hostname: 'www.zbjuran.com',
    //     path: url.split('www.zbjuran.com')[1]
    // }
    // let req = http.request(option,function(res){
    //     res.on('data',function(chunk) {
    //         let data = iconv.decode(chunk, "gbk");
    //         let $ = cheerio.load(data);
    //         let imgDom = $('div.picbox img').toArray();
    //         for (let index = 0; index < imgDom.length; index++) {
    //             let srcUrl = imgDom[index].attribs.src;
    //             let srcText = imgDom[index].attribs.alt;
    //             bigImgUrl.push(path.join(urlPre, srcUrl));
    //             fileNameArr.push(srcText);
    //         }
    //         console.log('++++++',bigImgUrl);
    //         bigImgUrl.forEach(function(item,index){
    //             console.log('urll',item);
    //             dowloadImg(item,fileNameArr[index],dir);
    //         })
    //     }).on('error',function(err){
    //         console.log(err.message)
    //     })
    // })
    // req.end();
    // page.open(url, function (status) {
    //     if(status === 'fail'){
    //         console.log('报错了你知道吗')
    //     }
    //     var content = page.content;
    //     console.log('Content: ' + content);
    //     let $ = cheerio.load(content);
    //     let imgDom = $('div.picbox img').toArray();
    //     console.log('xxx',imgDom);
    //     phantom.exit();
    // });
    request
        .get(url)
        .charset('gbk')
        .end(function (err, res) {
            if (err) {
                console.log('boom sha ka la ka', err);
                return false;
            }
            console.log('sss', res.text);
            let $ = cheerio.load(res.text);
            let imgDom = $('div.picbox img').toArray();
            console.log('xxxx', imgDom);
        })
}

// 下载图片
const dowloadImg = (uri, filename, dir, callback) => {
    request
        .get(uri)
        .end(function(error, response){
            if (error) {
                console.log(error);
            }
            console.log('======', response);
            if (!error && response.statusCode == 200) {
                if (!body) 
                    console.log("(╥╯^╰╥)哎呀没有内容。。。")
                fs
                    .writeFile(dir + '/' + filename, body, 'binary', function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('o(*￣▽￣*)o偷偷下载' + dir + '/' + filename + ' done');
                    });
            }
        })

    // request({
    //     uri: uri,
    //     encoding: 'binary'
    // }, function (error, response, body) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log('======', body);
    //     if (!error && response.statusCode == 200) {
    //         if (!body) 
    //             console.log("(╥╯^╰╥)哎呀没有内容。。。")
    //         fs
    //             .writeFile(dir + '/' + filename, body, 'binary', function (err) {
    //                 if (err) {
    //                     console.log(err);
    //                 }
    //                 console.log('o(*￣▽￣*)o偷偷下载' + dir + '/' + filename + ' done');
    //             });
    //     }
    // });
}

// 并发执行请求
const asyncQuery = (urls) => {
    console.log('urls',urls);
    async
        .eachOfSeries(urls, function (url, callback) {
            console.log('url',url);
            fetchUrl(url, callback);
        }, function (err, result) {
            if (err) {
                console.log('出错了哦：', err);
            } else {
                console.log(result, '大门已经全部打开，安静等待下载吧。');
            }
        })
}
getImgUrl();
// tasks
//     .push(function (callback) {
//         let urls = getImgUrl();
//         console.log('oneoneone', urls);
//         callback(null, urls);
//     });
// tasks.push(function (urls, callback) {
//     console.log('sasasa', urls);
//     asyncQuery(urls, callback);
//     //callback(null,'done');
// })

// async.waterfall(tasks, function (err, res) {
//     if (err) {
//         console.log('出错了哦：', err);
//     } else {
//         console.log(res, '下载完成。');
//     }
// })
