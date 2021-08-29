#!/usr/bin/env bash

# 加权
chomd -R 777 /dir_root

## 导入通用变量与函数
shell=/$dir_root/shell
. $shell/share.sh
. $config/config"$1".sh

##运行脚本
exec push
