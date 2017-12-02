#! /usr/bin/env node
// 'use strict'
const Program = require('commander');
const Cheerio = require('cheerio');
const Request = require('superagent');
const Table = require('cli-table2');

const urlPre = {
    zol_news: 'http://search.zol.com.cn/s/all.php',
    youdao_trans: 'http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctyp' +
            'e=json&version=1.1'
}

Program
    .allowUnknownOption()
    .version('0.0.1')
    .usage('cpf <cmd> [input]')

// 添加自定义命令
Program
    .command('news')
    .description('手机新闻')
    .action(function (word) {
        // 发起请求
        Request
            .get(urlPre.zol_news)
            .query({kword: word})
            .set('Content-Type','text/html;charset=gbk')
            .end(function (err, res) {
                if (err) {
                    console.log('boom sha ka la ka',err)
                    return false
                }
                let $ = Cheerio.load(res);
                let data = JSON.parse(res.text)
                let result = {}

                // // 返回的数据处理
                // if (data.basic) {
                //     result[word] = data['basic']['explains']
                // } else if (data.translation) {
                //     result[word] = data['translation']
                // } else {
                //     console.error('error')
                // }

                // 输出表格
                let table = new Table()
                table.push(res)
                console.log(table.toString())
            })
    })

Program
    .command('mobile')
    .description('查询手机具体信息')
    .action(function (word) {
        // 发起请求
        Request
            .get(urlPre.youdao_trans)
            .query({q: word})
            .end(function (err, res) {
                if (err) {
                    console.log('excuse me, try again')
                    return false
                }
                let data = JSON.parse(res.text)
                let result = {}

                // 返回的数据处理
                if (data.basic) {
                    result[word] = data['basic']['explains']
                } else if (data.translation) {
                    result[word] = data['translation']
                } else {
                    console.error('error')
                }

                // 输出表格
                let table = new Table()
                table.push(result)
                console.log(table.toString())
            })
    })


Program
    .command('search')
    .description('查询单词信息')
    .action(function (word) {
        // 发起请求
        Request
            .get(urlPre.youdao_trans)
            .query({q: word})
            .end(function (err, res) {
                if (err) {
                    console.log('excuse me, try again')
                    return false
                }
                let data = JSON.parse(res.text)
                console.log('xxx',data)
                let result = {}

                // 返回的数据处理
                if (data.basic) {
                    result[word] = data['basic']['explains']
                } else if (data.translation) {
                    result[word] = data['translation']
                } else {
                    console.error('error')
                }

                // 输出表格
                let table = new Table()
                table.push(result)
                console.log(table.toString())
            })
    })

// 没有参数时显示帮助信息
if (!process.argv[2]) {
    Program.help();
    console.log();
}

Program.parse(process.argv)