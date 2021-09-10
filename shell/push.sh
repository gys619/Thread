#!/usr/bin/env bash

#变量判定
config_use=config"$1"
source $config/$config_use.sh
logs=$dir_root/logs
diy_config=$dir_root/diy/$config_use
dir_repo=$dir_root/repo
dir_backup=$dir_root/backup
dir_sample=$dir_root/sample
tongbu=$dir_root/temporary_file

#初始化文件夹
function Initialization {
  echo "开始执行初始化"
  rm -rf $tongbu
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

#第三方仓库(网络仓库)
function Pull_diy_Third_party_warehouse {
  git config --global http.version $http_version
  echo "正在克隆第三方仓库"
  git clone -b $diy_Third_party_warehouse_branch ${github_proxy_url}$diy_Third_party_warehouse_url $tongbu
  if [ $? = 0 ]; then
    echo "克隆第三方仓库成功"
    Git_log
  else
    l=1
    while [[ l -le 3 ]]; do
      echo "克隆失败,重试执行第$l次"
      git clone -b $diy_Third_party_warehouse_branch ${github_proxy_url}$diy_Third_party_warehouse_url $tongbu
      if [ $? = 0 ]; then
        echo "克隆第三方仓库成功"
        Git_log
        return
      else
        let l++
      fi
    done
    echo "克隆第三方仓库失败，正在恢复文件"
    rm -rf $tongbu
    exit
  fi
}

#识别clone或者pull
function Clone_Pull {
  if [ ! -d "$repo_path" ];then
    echo "文件夹不存在，创建并执行clone"
    mkdir -p $repo_path
    git clone -b $pint_branch ${github_proxy_url}$pint_warehouse $repo_path
    if [ $? = 0 ]; then
      echo "克隆(更新)$j号仓库成功，开始备份仓库内容"
      cp -rf $repo_path $dir_backup
      echo "备份成功，开始合并$j号仓库"
      Consolidated_Warehouse
    else
      echo "克隆(更新)$j号仓库失败，请确认问题"
      echo "识别备份并确认拷贝备份文件"
      cp -rf $dir_backup/${uniq_path}/* $repo_path
      cp -rf $dir_backup/${uniq_path}/. $repo_path
      Consolidated_Warehouse
      echo "清理失败缓存"
      rm -rf $repo_path
    fi
  else
    echo "文件夹存在，进行下一步"
    cd $repo_path
    ls -a
    if [ ! -d "$repo_path/.git/" ];then
      echo "执行clone"
      git clone -b $pint_branch ${github_proxy_url}$pint_warehouse $repo_path
      if [ $? = 0 ]; then
        echo "克隆(更新)$j号仓库成功，开始备份仓库内容"
        cp -rf $repo_path $dir_backup
        echo "备份成功，开始合并$j号仓库"
        Consolidated_Warehouse
      else
        echo "克隆(更新)$j号仓库失败，请确认问题"
        echo "识别备份并确认拷贝备份文件"
        cp -rf $dir_backup/${uniq_path}/* $repo_path
        cp -rf $dir_backup/${uniq_path}/. $repo_path
        Consolidated_Warehouse
        echo "清理失败缓存"
        rm -rf $repo_path
      fi
    else
      echo "执行git pull"
      cd $repo_path
      git reset --hard
      git pull origin $pint_branch
      if [ $? = 0 ]; then
        echo "克隆(更新)$j号仓库成功，开始备份仓库内容"
        cp -rf $repo_path $dir_backup
        echo "备份成功，开始合并$j号仓库"
        Consolidated_Warehouse
      else
        echo "克隆(更新)$j号仓库失败，请确认问题"
        echo "识别备份并确认拷贝备份文件"
        cp -rf $dir_backup/${uniq_path}/* $repo_path
        cp -rf $dir_backup/${uniq_path}/. $repo_path
        Consolidated_Warehouse
        echo "清理失败缓存"
        rm -rf $repo_path
      fi
    fi
  fi
}

#合并仓库
function Consolidated_Warehouse {
 if [ "$pint_diy_feihebing" = "" ]; then
    echo "您已选择将所有文件合并到根目录，开始执行"
    sleep 3s
    cd $repo_path
    if [ "$pint_fugai" = "" -o "$pint_fugai" = "1"  ]; then
      echo "您已选择强制覆盖同名文件"
      cp -rf $repo_path/* $tongbu
      cp -rf $repo_path/. $tongbu
    else
      echo "您已选择跳过同名文件"
      yes n | cp -ir $repo_path/* $tongbu
      yes n | cp -ir $repo_path/. $tongbu
    fi
    echo "合并$j号仓库成功"
  else
    echo "您已选择将文件夹合并到根目录，开始执行"
    sleep 3s
    mkdir -p $repo_path/$pint_diy_feihebing
    cp -rf $repo_path/* $repo_path/$pint_diy_feihebing
    cp -rf $repo_path/. $repo_path/$pint_diy_feihebing
    cp -rf $repo_path/$pint_diy_feihebing $tongbu
    echo "合并$j号仓库成功，清理文件"
    rm -rf $repo_path/$pint_diy_feihebing
  fi
}

get_uniq_path() {
  local url="$1"
  local branch="$2"
  local urlTmp="${url%*/}"
  local repoTmp="${urlTmp##*/}"
  local repo="${repoTmp%.*}"
  local tmp="${url%/*}"
  local authorTmp1="${tmp##*/}"
  local authorTmp2="${authorTmp1##*:}"
  local author="${authorTmp2##*.}"

  uniq_path="${author}_${repo}"
  [[ $branch ]] && uniq_path="${uniq_path}_${branch}"
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

#合并仓库(网络仓库-clone)
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
    get_uniq_path "$pint_warehouse" "$pint_branch"
    local repo_path="${dir_repo}/${uniq_path}"
    Clone_Pull
    let j++
  done
}

#合并仓库(网络仓库-RAW-正在开发)

#合并仓库(本地仓库)
function Local_Change_diy_party_warehouse {
  echo "开始合并本地文件，目标文件夹$dir_root/diy"
  echo "识别为diy文件夹$config_use"
  if [ ! -d "$dir_root/diy/$config_use" ];then
    echo "$diy_config文件夹不存在,创建$config_use文件夹"
    mkdir -p $diy_config
    cp -fv $dir_sample/gitignore.sample $diy_config/.gitignore
    echo "$diy_config文件夹创建完成，请自行导入文件，黑白名单请填写$diy_config/.gitignore 中的内容"
  else
    cd $diy_config
    if [ "`ls -A $diy_config`" = "" ];then
      echo "$diy_config文件夹为空文件夹，跳过合并"
    else
      echo "$diy_config文件夹已经存在，且存在文件，进行下一步"
      cp -rf $diy_config/* $tongbu
      cp -rf $diy_config/. $tongbu
      echo "合并完成"
    fi
  fi
}

#替换文件内容(正在开发)

#上传文件至github
function Push_github {
  cd $tongbu
  git init
  git add .
  git config user.name "$diy_user_name"
  git config user.email "$diy_user_email"
  git commit --allow-empty -m "$diy_commit"
  git config --global http.sslVerify "false"
  git config --global sendpack.sideband false
  git config --local sendpack.sideband false
  git config --global http.postBuffer 524288000
  git config --global http.version $http_version
  git push --force "https://$diy_user_name:$github_api@$diy_url" master:$diy_branch
  if [ $? = 0 ]; then
    echo "上传成功"
    rm -rf $tongbu
  else
    k=1
    while [[ k -le 3 ]]; do
      echo "上传失败,重试执行第$k次"
      git push --force "https://$diy_user_name:$github_api@$diy_url" master:$diy_branch
      if [ $? = 0 ]; then
        echo "上传成功"
        rm -rf $tongbu
        return
      else
        let k++
      fi
    done
    echo "上传失败，正在恢复文件"
    rm -rf $tongbu
  fi
}

echo "开始运行"
Initialization
Pull_diy_Third_party_warehouse
Count_diy_party_warehouse
Change_diy_party_warehouse
Local_Change_diy_party_warehouse
Push_github
echo "运行结束，退出"
exit
