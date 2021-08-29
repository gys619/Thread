#!/usr/bin/env bash

function Git_PullShell {
  echo -e "更新shell脚本\n"
  cd ${dir_root}
  git fetch --all
  ExitStatusShell=$?
  git reset --hard origin/master
}

echo "开始运行"
Git_PullShell
echo "运行结束，退出"
exit
