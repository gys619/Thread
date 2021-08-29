#!/usr/bin/env bash

## 导入通用变量与函数
. /share.sh
. /push.sh
. /$config/config"$1".sh

##运行脚本
exec push
