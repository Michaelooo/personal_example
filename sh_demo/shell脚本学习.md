# **shell脚本学习**

## 一个远程登陆的例子

> 参考链接：
> 
> * [ssh远程执行命令方法和Shell脚本实例](http://www.jb51.net/article/64229.htm)

* `-t` 就是可以提供一个远程服务器的虚拟tty终端，加上这个参数我们就可以在远程服务器的虚拟终端上输入自己的提权密码了。
* `-p` 指定端口。

```
#!/bin/bash  
  
#变量定义  
ip_array=("192.168.1.1" "192.168.1.2" "192.168.1.3")  
user="test1"  
remote_cmd="/home/test/1.sh"  
  
#本地通过ssh执行远程服务器的脚本  
for ip in ${ip_array[*]}  
do  
    if [ $ip = "192.168.1.1" ]; then  
        port="7777"  
    else  
        port="22"  
    fi  
    ssh -t -p $port $user@$ip "remote_cmd"  
done  
```

## 通过rsync发布工程

> 参考链接：
> 
> * [rsync命令的详细介绍](http://man.linuxde.net/rsync)
> * [Linux expect 用法](http://blog.csdn.net/catoop/article/details/48289991)

* `rsync`命令是一个远程数据同步工具 。
* `spawn `是进入expect环境后才可以执行的expect内部命,它主要的功能是给ssh运行进程加个壳，用来传递交互指令。
* `EOF`是END Of File的缩写,表示自定义终止符.既然自定义,那么EOF就不是固定的,可以随意设置别名,在linux按ctrl-d就代表EOF,EOF一般会配合cat能够多行文本输出.
* 



```


user_pass='xxxx'

echo "========================================"
echo "编译项目开始"

rm -rf dist/*
npm run build:test
if [ ! -f dist/assets/app.js ]; then
    echo "****** build failed ******"
    exit 1
else
    echo "****** build success ******"
fi

echo "========================================"
echo "DEPLOY TO SERVER..."


/usr/bin/expect << EOF

   set timeout -1

   spawn rsync -cauvz -e "/usr/bin/ssh -l root" dist/ 192.168.xxx.xx:/home/targetsrc/
   expect "assword:" {send "$user_pass\n" }
   expect "sec]." {exit }

EOF%

```

另外一个发布到docker的例子：

> 参考链接：

> * [docker清理镜像](https://segmentfault.com/a/1190000004491286)
> * [在Linux中让echo命令显示带颜色的字。](http://blog.51cto.com/onlyzq/546459)

* `echo -e "\033[40;37m 黑底白字 \033[0m"` 此方法是输入带上颜色
* 清理镜像的操作是一系列的。具体情况具体分析。例如另一个例子：
* `$ docker ps --filter "status=exited" | grep 'weeks ago' | awk '{print $1}' | xargs --no-run-if-empty docker rm`，来自[How to remove old Docker containers](https://stackoverflow.com/questions/17236796/how-to-remove-old-docker-containers) 
* `awk`是一个文本分析工具，找出文本指定位置的内容并print出来（解释不当）

```
# 声明变量
SERVER_HOST="root@xx.x.xxx.xx"
SERVER_PATH="/home/test/src"
BUILD_TIME=`date "+%Y%m%d%H%M"`
IMAGE_NAME="xxxx(docker镜像)"

# 传输之后特殊文件的修改
rsync -cavzP --delete-after ./ --exclude-from='.rsync-exclude' $SERVER_HOST:$SERVER_PATH
rsync -cavzP --delete-after ./node_modules/ftp-client $SERVER_HOST:$SERVER_PATH/node_modules


ssh $SERVER_HOST "\
  cd $SERVER_PATH; \
  echo "安装依赖"; \
  npm install; \
  echo "清理过时的测试镜像"; \
  docker images | awk '{ print \$3 }' | xargs docker rmi ; \
  echo "构建docker镜像 $IMAGE_NAME"; \
  docker build -t $MAGE_NAME . ;\
  echo "发布docker镜像"; \
  docker push $IMAGE_NAME ;\
  exit; \
  "

echo "\033[40;32m\n"
echo "Sync to Server: $MARKET_SERVER_HOST"
echo "Build source code path: $MARKET_SERVER_PATH"
echo "Image: $MARKET_IMAGE_NAME"
echo "Image deploy success"
echo "\033[0m"
```