// 未实现的功能，晚上回家再试试


// 中文乱码的问题始终不能解决，不懂
const cheerio = require('cheerio');
const request = require('superagent');
const path = require('path')
const fs = require('fs');
const async = require('async');
const mkdirp = require('mkdirp');
const iconv = require('iconv-lite');

const baseUrl = 'http://www.zbjuran.com/mei/'
const urlPre = 'http://www.zbjuran.com';

// 获取目标网址列表，并创建文件夹
let dir = './meizi/';
const getImgUrl = () => {
    let imgUrl = [];

    request
        .get(baseUrl)
        .set('Content-Type','text/html;charset=gb2312')
        .end(function(err,res){
            if (err) {
                console.log('boom sha ka la ka', err)
                return false
            }
            //console.log('qqqq',iconv.encodingExists("gb2312"),res.text);
            let resBody = iconv.encode(res.text,'GB2312');
            let $ = cheerio.load(res.text);
            let imgDom = $('div.changeDiv a').toArray();
            for (let index = 0; index < imgDom.length; index++) {
                let aUrl = imgDom[index].attribs.href;
                imgUrl.push(path.join(urlPre,aUrl));

                let fileName = imgDom[index].attribs.title;
                let fileDir = path.join(dir);
                mkdirp(fileDir,function(err,res){
                    if(err)
                        console.log('创建文件夹失败')
                    else 
                        console.log(fileDir+'创建成功')
                })
                
            }
            console.log('======',imgUrl);
        })
        return imgUrl;
}



// 得到目标大图URL列表，进一步获取图片
const getTrueImgUrl = (url) => {
    let imgUrl = [];
    url.forEach( (item,index) => {
        request
            .get(item)
            .set('Content-Type','text/html;charset=gb2312')
            .end(function(err,res){
                if (err) {
                    console.log('boom sha ka la ka', err);
                    return false;
                }
                
                let $ = cheerio.load(res.text);
                let imgDom = $('div.picbox img').toArray();
                for (let index = 0; index < imgDom.length; index++) {
                    let aUrl = imgDom[index].attribs.src;
                    imgUrl.push(path.join(urlPre,aUrl));
                }
            })
    });
    return imgUrl;
}

// 下载图片
const dowloadImg = (uri, des , callback) => {
    request({
        uri: uri,
        encoding: 'binary'
    }, function (error, response, body) {
        if(error){
            console.log(error);
        }
        console.log('======',body);
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

const start = () => {
    let mainUrl = getImgUrl();
    let TrueUrl = getTrueImgUrl(mainUrl);
    console.log('xx',mainUrl,TrueUrl);
    //dowloadImg(TrueUrl[0],dir)
}

start();


