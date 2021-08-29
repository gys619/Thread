#!/usr/bin/env bash

#导入变量
shell=/$dir_root/shell
. $shell/share.sh

#更新cron
crontab ${ListCron}
exit
