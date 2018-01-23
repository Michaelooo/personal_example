author='michael'

#!/bin/sh

# 第一种写法
cd /home/xxxx/
if [ "$?"= "0" ]; then
   rm -rf *
else
   echo "cannot change directory" 1>&2
   exit 1
fi 

# 第二种写法
if cd /home/xxxx/ ; then
    rm -rf *
else
    echo "cannot change directory" 1>&2
    exit 1

# 第三种写法
cd /home/xxxx/ && rm -rf *

# 第四种，捕获异常到输出
ls liqiu > /tmp/error 2>&1 #使用 " 2>&1" 把标准错误 stderr 重定向到标准输出 stdout ；
echo $? #捕获上一条命令的输出 (if 0 正常 else 错误)
ls -l > /tmp/log
echo $?

# 更健壮的shell
if [ "$?"-ne 0]; then echo "command failed"; exit 1; fi
command || { echo "command failed"; exit 1; }
if ! command; then echo "command failed"; exit 1; fi