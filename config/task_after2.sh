#!/usr/bin/env bash
#把通知文件移动到deps目录下
cp /ql/repo/gys619_Absinthe_main/sendNotify.js /ql/data/deps/sendNotify.js
cp /ql/repo/gys619_Absinthe_main/sendNotify.js /ql/data/scripts/gys619_jdd/sendNotify.js

url1="jsjiami"
#互助码目录修改
mkdir /ql/data/log/code
#cp -f /ql/data/log/config_code /ql/data/log/code
mv -n /ql/data/log/config_code/* /ql/data/log/code

#改加密文件，只是让报错
#sed -i "s@$url1@jjjmmm@g;" /ql/scripts/gys619_jdd/*.js

#xmsl的目录挂载
 if [ -d /ql/data ]; then
     echo "映射目录"
     ln -sf /ql/data/config /ql/config
     ln -sf /ql/data/db /ql/db
     ln -sf /ql/data/deps /ql/deps
     ln -sf /ql/data/log /ql/log
     ln -sf /ql/data/scripts /ql/scripts
     ln -sf /ql/data/raw /ql/raw
     ln -sf /ql/data/repo /ql/repo
     echo "映射完成"
 fi