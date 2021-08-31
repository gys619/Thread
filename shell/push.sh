#!/usr/bin/env bash

source $config/config"$1".sh
logs=$dir_root/logs

#创建文件夹
function Mkdir_folder {
  rm -rf $tongbu
  mkdir -p $tongbu/hebing
  hebing=$tongbu/hebing
  echo "初始化完成"
  sleep 3s
}

#清除git信息
function Delete_git {
  echo "正在清除git信息"
  sleep 3s
  find . -name ".git" | xargs rm -Rf
}

#获取主仓库更新日志
function Git_log {
  if [ "$diy_commit" = "" ]; then
    echo "未设置自定义提交内容，默认拉取主仓库更新内容"
    mkdir -p $tongbu/log
    git log --pretty=format:"%s %cr" > $tongbu/log/diy.log
    cp $tongbu/log/diy.log $logs/diy.log
    cd $logs
    diy_commit=`head -1 diy.log`
    echo "拉取成功"
  else
    echo "已设置提交内容，进行下一步"
  fi
}

#初始化文件夹
function Initialization {
  if [ "$diy_folder" = "" ]; then
    echo "未设定临时文件夹，请自行设定，此次由系统自动创建"
    diy_folder=user_1
    tongbu=/$diy_folder
    echo "创建完成，开始执行初始化"
    Mkdir_folder
  else
    echo "开始执行初始化"
    tongbu=/$diy_folder
    Mkdir_folder
  fi
}

#第三方仓库(网络仓库)
function Pull_diy_Third_party_warehouse {
  cd $tongbu
  echo "正在克隆第三方仓库"
  git clone -b $diy_Third_party_warehouse_branch $diy_Third_party_warehouse_url $hebing
  if [ $? = 0 ]; then
      echo "克隆第三方仓库成功"
      cd $hebing
      Git_log
      Delete_git
    else
      echo "克隆第三方仓库失败，正在恢复文件"
      rm -rf $tongbu
      exit
  fi
}

#自定义仓库数量(网络仓库)
function Count_diy_party_warehouse {
  i=1
  while [ $i -le 1000 ]; do
    Tmp=diy_party_warehouse$i
    diy_warehouse_Tmp=${!Tmp}
    [[ ${diy_warehouse_Tmp} ]] && diySum=$i || break
    let i++
  done
}

#合并仓库(网络仓库)
function Change_diy_party_warehouse {
  j=1
  h=${diySum}
  while [[ $j -le $h ]]; do
    Tmp_warehouse=diy_party_warehouse$j
    Tmp_warehouse_branch=diy_party_warehouse_branch$j
    Tmp_diy_feihebing=diy_feihebing$j
    Tmp_fugai=fugai$j
    warehouse_Tmp=${!Tmp_warehouse}
    branch_Tmp=${!Tmp_warehouse_branch}
    feihebing_Tmp=${!Tmp_diy_feihebing}
    fugai_Tmp=${!Tmp_fugai}
    pint_warehouse=$(printf ${warehouse_Tmp})
    pint_branch=$(printf ${branch_Tmp})
    pint_diy_feihebing=$(printf ${feihebing_Tmp})
    pint_fugai=$(printf ${fugai_Tmp})
    cd $tongbu
    if [ "$pint_diy_feihebing" = "" ]; then
      echo "您已选择将所有文件合并到根目录，开始执行"
      sleep 3s
      mkdir -p $tongbu/diy
      git clone -b $pint_branch $pint_warehouse $tongbu/diy
      if [ $? = 0 ]; then
        echo "克隆$j号仓库成功，开始合并$j号仓库"
        sleep 3s
        cd $tongbu/diy
        Delete_git
        if [ "$pint_fugai" = "" -o "$pint_fugai" = "1"  ]; then
          echo "您已选择强制覆盖同名文件"
          cp -rf $tongbu/diy/* $hebing
          cp -rf $tongbu/diy/. $hebing
          sleep 3s
        else
          echo "您已选择跳过同名文件"
          yes n | cp -i $tongbu/diy/* $hebing
          yes n | cp -i $tongbu/diy/. $hebing
          sleep 3s
        fi
        rm -rf $tongbu/diy
        echo "合并$j号仓库成功"
      else
        echo "克隆$j号仓库失败，请确认问题"
        rm -rf $tongbu/diy
      fi
    else
      echo "您已选择将文件夹合并到根目录，开始执行"
      sleep 3s
      mkdir -p $tongbu/$pint_diy_feihebing
      git clone -b $pint_branch $pint_warehouse $tongbu/$pint_diy_feihebing
      if [ $? = 0 ]; then
        echo "克隆$j号仓库成功，开始合并$j号仓库"
        cd $tongbu/$pint_diy_feihebing
        Delete_git
        cp -rf $tongbu/$pint_diy_feihebing $hebing
        rm -rf $tongbu/$pint_diy_feihebing
      else
        echo "克隆$j号仓库失败，请确认问题"
        rm -rf $tongbu/$pint_diy_feihebing
      fi
    fi
    let j++
  done
}

#合并仓库(本地仓库，正在开发)

#替换文件内容(正在开发)

#上传文件至github
function Push_github {
  cd $hebing
  git init
  git add .
  git config user.name "$diy_user_name"
  git config user.email "$diy_user_email"
  git commit --allow-empty -m "$diy_commit"
  git config --global http.sslVerify "false"
  git config --global sendpack.sideband false
  git config --local sendpack.sideband false
  git config --global http.postBuffer 524288000
  git push --force "https://$diy_user_name:$github_api@$diy_url" master:$diy_branch
  if [ $? = 0 ]; then
      echo "上传成功"
      rm -rf $tongbu
    else
      echo "上传失败，正在恢复文件"
      rm -rf $tongbu
  fi
}

echo "开始运行"
Initialization
Pull_diy_Third_party_warehouse
Count_diy_party_warehouse
Change_diy_party_warehouse
Push_github
echo "运行结束，退出"
exit
