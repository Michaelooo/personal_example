# 一个使用docker，部署node项目的小例子
FROM node
LABEL author="chengpengfei <422201870@qq.com>" 

RUN mkdir -p /var/www/node_demo
ADD * /var/www/node_demo

WORKDIR /var/www/node_demo

EXPOSE 1234
CMD [ "node", "app.js" ]
