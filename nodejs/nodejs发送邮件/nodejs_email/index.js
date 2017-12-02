// 尝试使用我自己的qq邮箱给网易邮箱发送邮件
/**
 * Nodemailer的主要特点包括：
    支持Unicode编码
    支持Window系统环境
    支持HTML内容和普通文本内容
    支持附件(传送大附件)
    支持HTML内容中嵌入图片
    支持SSL/STARTTLS安全的邮件发送
    支持内置的transport方法和其他插件实现的transport方法
    支持自定义插件处理消息
    支持XOAUTH2登录验证
 */
'use strict'
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '422201870@qq.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'datirvutyzbobhjj'
    }
});

let mailOptions = {
    from: '"测试邮件nodeserver" <422201870@qq.com>', // sender address
    to: '2487954539@qq.com', // list of receivers
    subject: '测试邮件服务器', // Subject line
    // 发送text或者html格式 text: 'Hello world?', // plain text body
    html: '<b>测试邮件</b>', // html body
    cc: [
        '187209288p69@163.com'
    ],
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        },{   // binary buffer as an attachment
            filename: 'text2.txt',
            content: new Buffer('hello world!','utf-8')
        },
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: './package.json' // stream this file
        }
    ]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});

// 官网的测试demo nodemailer.createTestAccount((err, account) => {     // create
// reusable transporter object using the default SMTP transport     let
// transporter = nodemailer.createTransport({         host:
// 'smtp.ethereal.email',         port: 587,         secure: false, // true for
// 465, false for other ports         auth: {             user: account.user, //
// generated ethereal user             pass: account.pass  // generated ethereal
// password         }     });     // setup email data with unicode symbols let
// mailOptions = {         from: '"Fred Foo 👻" <foo@blurdybloop.com>', //
// sender address         to: 'bar@blurdybloop.com, baz@blurdybloop.com', //
// list of receivers         subject: 'Hello ✔', // Subject line         text:
// 'Hello world?', // plain text body         html: '<b>Hello world?</b>' //
// html body     };     // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => { if (error) {
// return console.log(error);         } console.log('Message sent: %s',
// info.messageId);         // Preview only available when sending through an
// Ethereal account console.log('Preview URL: %s',
// nodemailer.getTestMessageUrl(info)); // Message sent:
// <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>   // Preview URL:
// https://ethereal.email/message/WaQKMgKddxQDoou...     }); });