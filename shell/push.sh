#!/usr/bin/env bash

#变量判定
source /push/shell/share.sh
source $config/$config_use.sh

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
    git log --pretty=format:"%s %cr" > $diy_logs/diy.log
    cd $diy_logs
    diy_commit=`head -1 diy.log`
    echo "拉取成功"
  else
    echo "已设置提交内容，进行下一步"
  fi
}

#网络协议
function Http_Version {
  if [ "$http_version" = "" ]; then
    echo "http协议未设置，将采用默认协议"
    http_version="HTTP/2"
  else
    echo "http协议已设置，将采用$http_version协议"
    git config --global http.version $http_version
  fi
}

#第三方仓库(网络仓库)
function Pull_diy_Third_party_warehouse {
  echo "正在克隆第三方仓库"
  git clone -b $diy_Third_party_warehouse_branch ${github_proxy_url}$diy_Third_party_warehouse_url $tongbu_push
  if [ $? = 0 ]; then
    echo "克隆第三方仓库成功"
    cd $tongbu_push
    Git_log
  else
    l=1
    while [[ l -le 3 ]]; do
      echo "克隆失败,重试执行第$l次"
      sleep 20s
      git clone -b $diy_Third_party_warehouse_branch ${github_proxy_url}$diy_Third_party_warehouse_url $tongbu_push
      if [ $? = 0 ]; then
        echo "克隆第三方仓库成功"
        cd $tongbu_push
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

#pull函数
function Git_Pull {
  git remote remove origin
  git remote add origin $pint_warehouse
  git fetch --all
  ExitStatusShell=$?
  git reset --hard origin/$pint_branch
  if [ $? = 0 ] && [ $ExitStatusShell = 0 ]; then
    echo "克隆(更新)$j号仓库成功，开始备份仓库内容"
    rsync -a $dir_backup/${uniq_path} $old_backup
    cp -af $repo_path $dir_backup
    echo "备份成功，开始合并$j号仓库"
    Consolidated_Warehouse
  else
    echo "克隆(更新)$j号仓库失败，使用备份文件"
    cp -af $dir_backup/${uniq_path}/. $repo_path
    Consolidated_Warehouse
    echo "清理失败缓存"
    rm -rf $repo_path
  fi
}

#clone函数
function Git_Clone {
  git clone -b $pint_branch ${github_proxy_url}$pint_warehouse $repo_path
  if [ $? = 0 ]; then
      echo "克隆(更新)$j号仓库成功，开始备份仓库内容"
      rsync -a $dir_backup/${uniq_path} $old_backup
      cp -af $repo_path $dir_backup
      echo "备份成功，开始合并$j号仓库"
      Consolidated_Warehouse
    else
      echo "克隆(更新)$j号仓库失败，请确认问题"
      echo "识别备份并确认拷贝备份文件"
      cp -af $dir_backup/${uniq_path}/. $repo_path
      Consolidated_Warehouse
      echo "清理失败缓存"
      rm -rf $repo_path
  fi
}

#合并仓库（网络仓库）
function Consolidated_Warehouse {
 if [ "$pint_diy_feihebing" = "" ]; then
    echo "您已选择将所有文件合并到根目录，开始执行"
    sleep 3s
    mkdir -p $tongbu_temp
    cp -af $repo_path/. $tongbu_temp
    cd $tongbu_temp
    Delete_git
    prefix_suffix
    if [ "$pint_fugai" = "" -o "$pint_fugai" = "1"  ]; then
      echo "您已选择强制覆盖同名文件"
      cp -af $tongbu_temp/. $tongbu_push
    else
      echo "您已选择跳过同名文件"
      cp -n $tongbu_temp/. $tongbu_push
    fi
    echo "合并$j号仓库成功，清理文件"
    rm -rf $tongbu_temp
  else
    echo "您已选择将文件夹合并到根目录，开始执行"
    sleep 3s
    mkdir -p $tongbu_temp/$pint_diy_feihebing
    cp -af $repo_path/. $tongbu_temp/$pint_diy_feihebing
    cd $tongbu_temp/$pint_diy_feihebing
    Delete_git
    prefix_suffix
    if [ "$pint_fugai" = "" -o "$pint_fugai" = "1"  ]; then
      echo "您已选择强制覆盖同名文件"
      cp -af $tongbu_temp/$pint_diy_feihebing $tongbu_push
    else
      echo "您已选择跳过同名文件"
      cp -n $tongbu_temp/$pint_diy_feihebing $tongbu_push
    fi
    echo "合并$j号仓库成功，清理文件"
    rm -rf $tongbu_temp
  fi
}

#识别clone或者pull
function Clone_Pull {
  echo -e "\n======================开始执行$j号仓库的拉取合并========================\n"
  if [ ! -d "$repo_path" ];then
    echo "文件夹不存在，创建并执行clone"
    mkdir -p $repo_path
    cd $dir_repo
    Git_Clone
  else
    echo "文件夹存在，进行下一步"
    cd $dir_repo
    ls -a
    if [ ! -d "$repo_path/.git/" ];then
      echo "执行clone"
      Git_Clone
    else
      echo "执行git pull"
      cd $repo_path
      Git_Pull
    fi
  fi
  echo -e "\n========================$j号仓库的拉取合并结束========================\n"
}

#重命名仓库文件
function prefix_suffix {
  if [[ $pint_name = "" ]] && [[ $pint_file = "" ]]; then
    echo "未定义重命名参数"
  else
    echo "已定义重命名参数，开始重命名文件"
    rename $pint_name $pint_file
    echo "重命名完成"
  fi
}


#库名称判定(网络仓库)
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

#合并仓库(网络仓库)
function Change_diy_party_warehouse {
  j=1
  h=${diySum}
  while [[ $j -le $h ]]; do
    Tmp_warehouse=diy_party_warehouse$j
    Tmp_warehouse_branch=diy_party_warehouse_branch$j
    Tmp_diy_feihebing=diy_feihebing$j
    Tmp_fugai=fugai$j
    Tmp_name=rename_name$j
    Tmp_file=rename_file$j
    warehouse_Tmp=${!Tmp_warehouse}
    branch_Tmp=${!Tmp_warehouse_branch}
    feihebing_Tmp=${!Tmp_diy_feihebing}
    fugai_Tmp=${!Tmp_fugai}
    name_Tmp=${!Tmp_name}
    file_Tmp=${!Tmp_file}
    pint_warehouse=${warehouse_Tmp}
    pint_branch=${branch_Tmp}
    pint_diy_feihebing=${feihebing_Tmp}
    pint_fugai=${fugai_Tmp}
    pint_name=${name_Tmp}
    pint_file=${file_Tmp}
    get_uniq_path "$pint_warehouse" "$pint_branch"
    local repo_path="${dir_repo}/${uniq_path}"
    Clone_Pull
    let j++
  done
}

#合并仓库(网络仓库-RAW)
Update_Own_Raw () {
    local rm_mark
    [[ ${#OwnRawFile[*]} -gt 0 ]] && echo -e "\n=========================开始拉取raw并合并==========================\n"
    for ((i=0; i<${#OwnRawFile[*]}; i++)); do
        raw_file_name[$i]=$(echo ${OwnRawFile[i]} | awk -F "/" '{print $NF}')
        echo "开始下载：${OwnRawFile[i]} 保存路径：$raw_flie/${raw_file_name[$i]}"
        wget -q --no-check-certificate -O "$raw_flie/${raw_file_name[$i]}.new" ${OwnRawFile[i]}
        if [[ $? -eq 0 ]]; then
            mv "$raw_flie/${raw_file_name[$i]}.new" "$raw_flie/${raw_file_name[$i]}"
            echo "下载 ${raw_file_name[$i]} 成功,开始备份成功后的文件"
            cp -af $raw_flie/${raw_file_name[$i]} $dir_backup_raw/${raw_file_name[$i]}
            echo "备份完成，开始合并"
            cp -af $raw_flie/${raw_file_name[$i]} $tongbu_push
            echo "合并完成"
        else
            echo "下载 ${raw_file_name[$i]} 失败，保留之前正常下载的版本..."
            [ -f "$raw_flie/${raw_file_name[$i]}.new" ] && rm -f "$dir_raw/${raw_file_name[$i]}.new"
            echo "开始合并"
            cp -af $raw_flie/${raw_file_name[$i]} $tongbu_push
            echo "合并完成"
        fi
    done
    
    for file in $(ls $raw_flie); do
        rm_mark="yes"
        for ((i=0; i<${#raw_file_name[*]}; i++)); do
            if [[ $file == ${raw_file_name[$i]} ]]; then
                rm_mark="no"
                break
            fi
        done
        [[ $rm_mark == yes ]] && rm -f $raw_flie/$file 2>/dev/null
    done
    echo -e "\n=========================拉取raw并合并结束===========================\n"
}

#合并仓库(本地仓库)
function Local_Change_diy_party_warehouse {
  echo -e "\n=========================开始识别并合并diy文件==========================\n"
  echo "开始合并本地文件，目标文件夹$dir_root/diy，识别为diy文件夹$config_use"
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
      cp -af $diy_config/. $tongbu_push
      echo "合并完成"
    fi
  fi
  echo -e "\n=========================识别并合并diy文件结束==========================\n"
}

#替换文件内容(正在开发)

#上传文件至github
function Push_github {
  echo -e "\n===========================开始上传文件至网端==========================\n"
  cd $tongbu_push
  git init
  git add .
  git config user.name "$diy_user_name"
  git config user.email "$diy_user_email"
  git commit --allow-empty -m "$diy_commit"
  git config --global http.sslVerify "false"
  git config --global sendpack.sideband false
  git config --local sendpack.sideband false
  git config --global http.postBuffer 524288000
  git push --force "https://$diy_user_name:$github_api@$diy_url" HEAD:$diy_branch
  if [ $? = 0 ]; then
    echo "上传成功"
    rm -rf $tongbu
  else
    k=1
    while [[ k -le 3 ]]; do
      echo "上传失败,重试执行第$k次"
      sleep 20s
      git push --force "https://$diy_user_name:$github_api@$diy_url" HEAD:$diy_branch
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
  echo -e "\n===========================上传文件至网端结束==========================\n"
}

#执行函数
echo "开始运行"
Initialization
Http_Version
Pull_diy_Third_party_warehouse
Count_diy_party_warehouse
Change_diy_party_warehouse
Update_Own_Raw
Local_Change_diy_party_warehouse
Push_github
echo "运行结束，退出"
exit
