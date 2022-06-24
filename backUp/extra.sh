#!/bin/bash
# Update: 2022-02-18
# Content: add  

##############################  京  东  商  城  ##############################
## 列表格式： 脚本名称 | 活动名称 | 备注说明

##############################  脚  本  内  环  境  变  量  ##############################
## 推荐使用项目自带的环境变量管理命令，默认交互支持快捷命令
## 快速添加环境变量：task env add <变量名> <变量的值>

##############################  近  期  删  除  ##############################

##############################  主  要  代  码  ##############################
NEWLINE="\n          "
UpdateDate="2022-02-18"
UpdateContent="add"

## 作者
author_list="TongLin138"
author_name=(
  TongLin138
)

## 定义下载代理 (非内置功能)
if [[ ${EnableExtraShellProxy} ]] && [[ ${EnableExtraShellProxy} == true ]]; then
  ProxyJudge="true"
else
  ProxyJudge="false"
fi

## TongLin138
scripts_base_url_TongLin138=https://cdn.jsdelivr.net/gh/TongLin138/Test@main/backUp/Scripts
my_scripts_list_TongLin138="jd_dreamFactory_mod.js jd_fruit_mod.js jd_health_mod.js jd_jdfactory_mod.js jd_pet_mod.js jd_plantBean_mod.js jd_sgmh_mod.js"

##############################  主 命 令  ##############################
cd $RootDir
if [ -d $RootDir/.git ]; then
  git remote -v | grep "git@jd_base_gitee:supermanito/jd_base.git" -wq
  [ $? -ne 0 ] && echo -e "\n${RED}非本项目用户禁止使用！${PLAIN}\n" && exit 1
fi

echo -e "更新日期：\033[33m${UpdateDate}\033[0m"
echo -e "更新内容：\033[33m${UpdateContent}\033[0m\n"

## 随机函数
rand() {
  min=$1
  max=$(($2 - $min + 1))
  num=$(cat /proc/sys/kernel/random/uuid | cksum | awk -F ' ' '{print $1}')
  echo $(($num % $max + $min))
}

index=0
for author in $author_list; do
  eval scripts_list=\$my_scripts_list_${author}
  eval url_list=\$scripts_base_url_${author}
  eval author="author_name[${index}]"

  echo ${url_list} | grep -Eq "cdn\.jsdelivr\.net\/gh\/"
  if [ $? -eq 0 ]; then
    if [[ ${ProxyJudge} == false ]]; then
      url_list=$(echo ${url_list} | perl -pe "{s|cdn\.jsdelivr\.net\/gh|raw\.githubusercontent\.com|g; s|\@|\/|g}")
    fi
  fi

  ## 判断脚本来源仓库
  repository_judge=$(echo $url_list | grep -Eo "github|gitee|jsdelivr")
  download_judge=""
  repository_platform=""
  reformat_url=""
  if [[ ${repository_judge} == "github" ]]; then
    repository_platform="https://github.com"
    repository_branch=$(echo $url_list | awk -F '.com' '{print$NF}' | sed 's/.$//' | awk -F '/' '{print$4}')
    reformat_url=$(echo $url_list | awk -F '.com' '{print$NF}' | perl -pe "{s|.$||g; s|$repository_branch|tree\/$repository_branch|g}")
    [[ ${ProxyJudge} == true ]] && download_judge="(代理)"
  elif [[ ${repository_judge} == "gitee" ]]; then
    repository_platform="https://gitee.com"
    reformat_url=$(echo $url_list | awk -F '.com' '{print$NF}' | perl -pe "{s|.$||g; s|\/raw\/|\/tree\/|g}")
  elif [[ ${repository_judge} == "jsdelivr" ]]; then
    repository_platform="https://github.com"
    repository_branch=$(echo $format_url | awk -F '/' '{print$4}')
    reformat_url=$(echo $url_list | awk -F '/gh' '{print$NF}' | perl -pe "{s|.$||g; s|\@|\/tree\/|g}")
    download_judge="(代理)"
  fi
  repository_url="${repository_platform}${reformat_url}"

  echo -e "[${YELLOW}更新${PLAIN}] ${!author} ${download_judge}"
  [[ ${repository_url} ]] && echo -e "[${YELLOW}仓库${PLAIN}] $repository_url"

  for js in $scripts_list; do
    croname=""
    script_cron_standard=""

    eval url=$url_list$js
    eval name=$js
    eval formatname=$(echo $js | awk -F '/' '{print$NF}')

    [[ ${EnableExtraShellProxy} == true ]] && sleep 1s ## 降低使用代理下载脚本的请求频率
    wget -q --no-check-certificate $url -O "$ScriptsDir/$name.new" -T 20

    if [ $? -eq 0 ]; then
      mv -f $ScriptsDir/$name.new $ScriptsDir/$name
      echo -e "$COMPLETE $formatname"

      case $name in
      jddjCookie.js | sign_graphics_validate.js | JDSignValidator.js | JDJRValidator_Pure.js | TS_USER_AGENTS.ts | function/*)
        continue
        ;;
      esac

      croname=$(echo "$name" | awk -F\. '{print $1}' | perl -pe "{s|^jd_||; s|^jx_||; s|^jr_||;}")
      script_cron_standard=$(cat $ScriptsDir/$name | grep "https" | awk '{if($1~/^[0-9]{1,2}/) print $1,$2,$3,$4,$5}' | sort -u | head -n 1)
      case $name in
      jd_try.js)
        script_cron="30 10 * * *" # 指定京东试用的定时
        ;;
      jd_unsubscribe_xh.js)
        script_cron="20 10,23 * * *" # 指定取关脚本的定时
        ;;
      jd_productZ4Brand.js)
        script_cron="5 20,21 * * *" # 指定特物Z的定时
        ;;
      jd_jchsign.js)
        script_cron="$(rand 1 59) $(rand 1 23) * * *" # 京车会签到，随机定时
        ;;
      jd_beauty_ex.js)
        script_cron="$(rand 1 5) $(rand 6 8),$(rand 11 13),$(rand 18 20) * * * " # 美丽研究院兑换，随机定时
        ;;
      jd_txjf.js)
        script_cron="8 0,1 * * *" # 指定通讯积分的定时
        ;;
      *)
        if [[ -z ${script_cron_standard} ]]; then
          tmp1=$(grep -E "^cron|script-path=|tag=|[0-9] \* \*|^[0-9]\*.*$name" $ScriptsDir/$name | grep -Ev "^http.*:|^function " | head -1 | perl -pe '{s|[a-zA-Z\"\.\=\:\_]||g;}')
          ## 判断开头
          tmp2=$(echo "${tmp1}" | awk -F '[0-9]' '{print$1}' | sed 's/\*/\\*/g; s/\./\\./g')
          ## 判断表达式的第一个数字（分钟）
          tmp3=$(echo "${tmp1}" | grep -Eo "[0-9]" | head -1)
          ## 判定开头是否为空值
          if [[ $(echo "${tmp2}" | perl -pe '{s| ||g;}') = "" ]]; then
            script_cron=$(echo "${tmp1}" | awk '{if($1~/^[0-9]{1,2}/) print $1,$2,$3,$4,$5; else if ($1~/^[*]/) print $2,$3,$4,$5,$6}')
          else
            script_cron=$(echo "${tmp1}" | perl -pe "{s|${tmp2}${tmp3}|${tmp3}|g;}" | awk '{if($1~/^[0-9]{1,2}/) print $1,$2,$3,$4,$5; else if ($1~/^[*]/) print $2,$3,$4,$5,$6}')
          fi
        else
          script_cron=${script_cron_standard}
        fi
        ;;
      esac

      if [ -z "${script_cron}" ]; then
        cron_min=$(rand 1 59)
        cron_hour=$(rand 1 23)
        [ $(grep -c " $TaskCmd $croname" $ListCrontabUser) -eq 0 ] && sed -i "/hang up/a${cron_min} ${cron_hour} * * * $TaskCmd $croname" $ListCrontabUser
      else
        [ $(grep -c " $TaskCmd $croname" $ListCrontabUser) -eq 0 ] && sed -i "/hang up/a${script_cron} $TaskCmd $croname" $ListCrontabUser
      fi
    else
      [ -f $ScriptsDir/$name.new ] && rm -f $ScriptsDir/$name.new
      echo -e "$FAIL $formatname 更新失败"
    fi
  done
  let index+=1
  echo ''
done
##############################  自  定  义  命  令  ##############################

## 删除垃圾文件
DeleteCacheFiles=""
for del in ${DeleteCacheFiles}; do
  [ -f $ScriptsDir/$del ] && rm -rf $ScriptsDir/$del
done

## 删除脚本和定时
DeleteScripts=""
for del in ${DeleteScripts}; do
  [ -f $ScriptsDir/$del ] && rm -rf $ScriptsDir/$del && sed -i "/ $TaskCmd $(echo "$del" | awk -F\. '{print $1}' | perl -pe "{s|^jd_||; s|^jx_||; s|^jr_||;}")/d" $ListCrontabUser
done
