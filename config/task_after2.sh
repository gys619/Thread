#!/usr/bin/env bash
#赋值通知文件到deps目录下
cp /ql/data/repo/gys619_Absinthe_main/sendNotify.js /ql/data/deps/sendNotify.js
cp /ql/data/repo/gys619_Absinthe_main/sendNotify.js /ql/data/scripts/gys619_Absinthe_main/sendNotify.js 
#在log目录下创建个code文件夹，不然互助马获取不到
cd /ql/data/log
kadir code
#把config_code目录下的互助吗日志，复制到code文件夹里
mv -n /ql/data/log/config_code/* /ql/data/log/code

#改加密文件，只是让报错
url1="jsjiami"
#sed -i "s@$url1@jjjmmm@g;" /ql/scripts/gys619_jdd/*.js

# #xmsl的目录挂载
#  if [ -d /ql/data ]; then
#      echo "映射目录"
#      ln -sf /ql/data/config /ql/config
#      ln -sf /ql/data/db /ql/db
#      ln -sf /ql/data/deps /ql/deps
#      ln -sf /ql/data/log /ql/log
#      ln -sf /ql/data/scripts /ql/scripts
#      ln -sf /ql/data/raw /ql/raw
#      ln -sf /ql/data/repo /ql/repo
#      echo "映射完成"
#  fi