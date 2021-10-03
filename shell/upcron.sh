#!/usr/bin/env bash

#导入变量
config=$dir_root/config
ListCron=$config/crontab.list

#更新cron
echo "开始更新cron"
while :
do
    crontab ${ListCron}
    sleep 15
done
