#!/usr/bin/env bash

## 导入通用变量与函数
dir_root=/push
config_use=config"$1"
shell=$dir_root/shell
logs=$dir_root/logs
config=$dir_root/config
diy_logs=$logs/$config_use
log_time=$(date "+%Y-%m-%d-%H-%M-%S.%N")
log_path="$diy_logs/$log_time.log"
. $config/$config_use.sh

##运行脚本
mkdir -p $diy_logs
source $shell/push.sh 2>&1 | tee $log_path
exit
