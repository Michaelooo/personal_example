author='michael'

echo '=========================='
echo 'if语句的一些学习'

if [ "$SHELL" = "/bin/sh" ];then
echo "your login shell is the bash \n"
echo "SHELL is : $SHELL"
elif [ "$autor" = "michael" ];then
echo "大爷"
else 
echo "your login shell is not bash but $SHELL"
fi

#[ -f "somefile" ] : 判断是否是一个文件
#[ -x "/bin/ls" ] : 判断/bin/ls是否存在并有可执行权限
#{ -n "$var" } : 判断$var变量是否有值
#[ "&a" = "$b" ] : 判断$a和$b是否相等
#[ "&a" -a "&b" ] : 逻辑与
#[ "&a" -o "&b" ] : 逻辑或
#[ !"&a"] : 逻辑非
