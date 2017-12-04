const cheerio = require('cheerio');
const superagent = require('superagent');
const path = require('path')
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const iconv = require('iconv-lite');
const request = require('superagent-charset')(superagent);

const baseUrl = 'http://www.zbjuran.com/mei/'
const urlPre = 'http://www.zbjuran.com';

// 获取目标网址列表，并创建文件夹
let dir = './meizi/';
let imgUrl = [];
let tasks = [];

const getImgUrl = () => {
    request
        .get(baseUrl)
        .set('Content-Type', 'text/html;charset=gb2312')
        .charset('gbk')
        .end(function (err, res) {
            if (err) {
                console.log('boom sha ka la ka', err)
                return false
            }
            // console.log('qqqq',iconv.encodingExists("gb2312"),res.text); let resBody =
            // iconv.decode(res.text,'utf-8','gb2312');
            console.log('resBody', res.text);
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
        })
    return imgUrl;
}

// 得到目标大图URL列表，进一步获取图片
const fetchUrl = (url,callback) => {
    request
        .get(item)
        .set('Content-Type', 'text/html;charset=gb2312')
        .end(function (err, res) {
            if (err) {
                console.log('boom sha ka la ka', err);
                return false;
            }
            console.log('sss',res.text);
            let $ = cheerio.load(res.text);
            let imgDom = $('div.picbox img').toArray();
            console.log('xxxx',imgDom);
        })
    return bigImgUrl;
}


// 下载图片
const dowloadImg = (uri, des, callback) => {
    request({
        uri: uri,
        encoding: 'binary'
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        console.log('======', body);
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
    });
}


// 并发执行请求
const asyncQuery = (urls) => {
    async.eachOfSeries(urls, function (url, callback) {
        fetchUrl(url, callback);
    }, function (err, result) {
        if (err) {
            console.log('出错了哦：', err);
        } else {
            console.log(result, '大门已经全部打开，安静等待下载吧。');
        }
    })
}

tasks.push(function(callback){
    let urls = getImgUrl();
    console.log('oneoneone',urls);
    
    callback(null,urls);
});
tasks.push(function(urls,callback){
    console.log('sasasa',urls);
    asyncQuery(urls,callback);
    //callback(null,'done');
})

async.waterfall(tasks,function(err,res){
    if (err) {
        console.log('出错了哦：', err);
    } else {
        console.log(res, '下载完成。');
    }
})

