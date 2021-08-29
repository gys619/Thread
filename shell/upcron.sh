#!/usr/bin/env bash

#导变量
. /share.sh

#更新cron
crontab ${ListCron}
exit
