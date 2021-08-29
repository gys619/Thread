#!/usr/bin/env bash

#导入变量
config=$dir_root/config
ListCron=$config/crontab.list

#更新cron
crontab ${ListCron}
exit
