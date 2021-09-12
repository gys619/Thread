#!/usr/bin/env bash

## 导入通用变量与函数
shell=$dir_root/shell
file_push=$shell/push.sh
file_run=$shell/run.sh
file_upcron=$shell/upcron.sh
file_update=$shell/update.sh
file_rmlog=$shell/rmlog.sh

##创建映射关系
ln -sf $file_push $dir_root/push.sh
ln -sf $file_run $dir_root/run.sh
ln -sf $file_upcron $dir_root/upcron.sh
ln -sf $file_update $dir_root/update.sh
ln -sf $file_rmlog $dir_root/rmlog.sh
