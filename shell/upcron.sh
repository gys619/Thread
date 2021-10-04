#!/usr/bin/env bash

#导入变量
config=$dir_root/config
ListCron=$config/crontab.list
md5=package_md5

# 创建md5的函数
function creatmd5()
{
    echo $package_md5_new > $md5
}

# 判断文件是否存在
if [ ! -f $md5 ] ; then
    echo "md5file is not exsit,create md5file......."
    creatmd5
    exit
fi

# 对象对比判断
while :
do
    package_md5_new=$(md5sum -b ${ListCron} | awk '{print $1}'|sed 's/ //g')
    package_md5_old=$(cat $md5|sed 's/ //g')
    echo $package_md5_new
    echo $package_md5_old
    if [ "$package_md5_new" == "$package_md5_old" ];then
        echo ""
    else
        echo "定时变动"
        creatmd5
        crontab ${ListCron}
    fi
    sleep 15
done
