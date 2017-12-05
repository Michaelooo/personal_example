// 参考网上的一种写法

'use strict'
let fs = require("fs");
let cheerio = require('cheerio');
let asyncQuene = require("async").queue;
let request = require('superagent');
require('superagent-charset')(request);

const config = {
    urlPre: 'http://www.zbjuran.com',
    indexUrl: 'http://www.zbjuran.com/mei/',
    downloadConcurrent: 2, 
};

let getHtmlAsync = (url) => {
    return new Promise((resolve,reject) => {
        request.get(url).charset('gbk').end((err,res) => {
            err ? reject(err) : resolve(cheerio.load(res.text));
        })
    })
}

let dowloadImg = (albumList) => {
    console.log('开始下载图片');
    const folder = './grils/';
    fs.existsSync(folder, status => {
        status ? '' : fs.mkdirSync(folder);
    })
    let downloadCount = 0;
    let queue = asyncQuene( ({ url: albumUrl, title: albumTitle},done) => {
        request.get(albumUrl).end(function (err, res) {
            if (err) {
                console.log(err);
                done();
            } else {
                fs.writeFile(`./${folder}/${albumTitle}-${++downloadCount}.jpg`, res.body, function (err) {
                    err ? console.log(err) : console.log(`${albumTitle}保存一张`);
                    done();
                });
            }
        });
    },config.downloadConcurrent);

    queue.drain = () => {
        console.log('所有图片已经下载');
    }

    let imgListTemp = [];
    albumList.forEach(function ({ title, imgList }) {
        console.log(title,imgList);
        imgList.forEach(function (url) {
            imgListTemp.push({ title: title, url: url });
        });
    });
    console.log('sssss',albumList,imgListTemp);
    queue.push(imgListTemp);//将所有任务加入队列
}

let getIndexAsync = () => {
    return new Promise((resolve, reject) =>{
        console.log('进入主页，开始获取目标url');
        let targetUrl = [];
        let queue = asyncQuene(async (url, done) => {
            try {
                let $ = await getHtmlAsync(url);
                console.log(`成功获取主页${url}`);
                $('div.changeDiv a').each( (index,value) => {
                    targetUrl.push({
                        title: value.attribs.title,
                        url: `${config.urlPre}${value.attribs.href}`,
                        imgList: []
                    })
                });
            } catch (err) {
                console.log(`在访问${url}出现以下错误：${err}`);
            }
            finally {
                done();
            }
        },config.downloadConcurrent);
        queue.drain = () => {
            console.log('已成功生成目标Url');
            resolve(targetUrl);
        }

        queue.push(config.indexUrl);
    })
}

let getTargetAsync = (targetUrl) => {
    return new Promise((resolve, reject) =>{
        console.log('进入目标页，开始获取目标url');
        let queue = asyncQuene(async ({ url: url, title: title, imgList },done) => {
            try {
                let $ = await getHtmlAsync(url);
                console.log(`成功获取主页${url}`);
                let imgLength = $('div.page > li').length - 3;
                $('div.picbox img').each( (index,value) => {
                    let imgSrcPath = value.attribs.src;
                    imgList.push(`${config.urlPre}${value.attribs.src}`);
                    for (let i = 0,length = imgLength; i < length; i++) {
                        if(i >= 1){
                            imgList.push(`${config.urlPre}${imgSrcPath.replace('-0','-'+i)}.jpg`);
                        }
                    }
                });
            } catch (err) {
                console.log(`在访问${url}出现以下错误：${err}`);
            }
            finally {
                done();
            }
        },config.downloadConcurrent);

        queue.drain = () => {
            console.log('已成功获取到所有图片的Url');
            resolve(targetUrl);
        }

        queue.push(targetUrl);
    })
}


let spider = async () => {
    // let albumList = await getAlbumsAsync();//获取所有画册URL
    // albumList = await getImageListAsync(albumList);//根据画册URL获取画册里的所有图片URL
    // downloadImg(albumList);//下载画册里面的所有图片
    let targetUrl = await getIndexAsync();
    targetUrl = await getTargetAsync(targetUrl);
    dowloadImg(targetUrl);
}

spider();