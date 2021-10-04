#!/usr/bin/env bash

## 导入通用变量与函数
. /push/shell/share.sh

function Git_PullShell {
  git config --global http.version HTTP/1.1
  echo -e "更新shell脚本\n"
  cd $dir_root
  git fetch --all
  ExitStatusShell=$?
  git reset --hard origin/master
}

function Update_Config {
  if [ $ExitStatusShell = 0 ]; then
    echo -e "更新config.sh.sample\n"
    cp -rf $dir_root/sample/config.sh.sample $dir_root/config/config.sh.sample
    echo -e "提升权限"
    chmod -R 777 $dir_root
  else
    echo -e "更新shell失败了，提升权限"
    chmod -R 777 $dir_root
  fi
}

echo "开始运行"
Git_PullShell
Update_Config
echo "运行结束，退出"
exit
