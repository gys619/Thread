#!/usr/bin/env bash

## 导入通用变量与函数
config_use=config"$1"
source /push/shell/share.sh
source $config/$config_use.sh

##运行脚本
mkdir -p $diy_logs
source $shell/push.sh 2>&1 | tee $log_path
exit
