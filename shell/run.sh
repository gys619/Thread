#!/usr/bin/env bash

## 导入通用变量与函数
config=$dir_root/config
shell=$dir_root/shell
. /$config/config"$1".sh
. /$shell/push.sh

##运行脚本
exec push
