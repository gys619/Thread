#!/usr/bin/env bash

# Build 20211122-001

name_js=(
  jd_fruit
  jd_pet
  jd_plantBean
  jd_dreamFactory
  jd_jdfactory
  jd_crazy_joy
  jd_jdzz
  jd_jxnc
  jd_bookshop
  jd_cash
  jd_sgmh
  jd_cfd
  jd_health
  jd_carnivalcity
  jd_city
  jd_moneyTree_heip
  jd_cfdtx
)
name_config=(
  Fruit
  Pet
  Bean
  DreamFactory
  JdFactory
  Joy
  Jdzz
  Jxnc
  BookShop
  Cash
  Sgmh
  Cfd
  Health
  Carni
  City
  MoneyTree
  TokenJxnc
)
env_name=(
  FRUITSHARECODES                     ## 1、东东农场互助码
  PETSHARECODES                       ## 2、东东萌宠互助码
  PLANT_BEAN_SHARECODES               ## 3、种豆得豆互助码
  DREAM_FACTORY_SHARE_CODES           ## 4、京喜工厂互助码
  DDFACTORY_SHARECODES                ## 5、东东工厂互助码
  JDJOY_SHARECODES                    ## 6、疯狂的JOY互助码
  JDZZ_SHARECODES                     ## 7、京东赚赚互助码
  JXNC_SHARECODES                     ## 8、京喜农场助力码
  BOOKSHOP_SHARECODES                 ## 9、口袋书店互助码
  JD_CASH_SHARECODES                  ## 10、签到领现金互助码
  JDSGMH_SHARECODES                   ## 11、闪购盲盒互助码
  JDCFD_SHARECODES                    ## 12、京喜财富岛互助码
  JDHEALTH_SHARECODES                 ## 13、东东健康社区互助码
  JD818_SHARECODES                    ## 14、京东手机狂欢城互助码
  CITY_SHARECODES                     ## 15、城城领现金互助码
  MONEYTREE_SHARECODES                ## 16、摇钱树
  JXNCTOKENS                          ## 17、京喜Token(京喜财富岛提现用)
)
var_name=(
  ForOtherFruit                       ## 1、东东农场互助规则
  ForOtherPet                         ## 2、东东萌宠互助规则
  ForOtherBean                        ## 3、种豆得豆互助规则
  ForOtherDreamFactory                ## 4、京喜工厂互助规则
  ForOtherJdFactory                   ## 5、东东工厂互助规则
  ForOtherJoy                         ## 6、疯狂的JOY互助规则
  ForOtherJdzz                        ## 7、京东赚赚互助规则
  ForOtherJxnc                        ## 8、京喜农场助力码
  ForOtherBookShop                    ## 9、口袋书店互助规则
  ForOtherCash                        ## 10、签到领现金互助规则
  ForOtherSgmh                        ## 11、闪购盲盒互助规则
  ForOtherCfd                         ## 12、京喜财富岛互助规则
  ForOtherHealth                      ## 13、东东健康社区互助规则
  ForOtherCarni                       ## 14、京东手机狂欢城互助规则
  ForOtherCity                        ## 15、城城领现金互助规则
  ForOtherMoneyTree                   ## 16、摇钱树
  TokenJxnc                           ## 17、京喜Token(京喜财富岛提现用)
)

## 临时屏蔽某账号运行活动脚本(账号序号匹配)
TempBlock_JD_COOKIE(){
    source $file_env
    local TempBlockCookieInterval="$(echo $TempBlockCookie | perl -pe "{s|~|-|; s|_|-|}" | sed 's/\(\d\+\)-\(\d\+\)/{\1..\2}/g')"
    local TempBlockCookieArray=($(eval echo $TempBlockCookieInterval))
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    local m n t
    for ((m = 1; m <= $user_sum; m++)); do
        n=$((m - 1))
        for ((t = 0; t < ${#TempBlockCookieArray[*]}; t++)); do
            [[ "${TempBlockCookieArray[t]}" = "$m" ]] && unset array[n]
        done
    done
    jdCookie=$(echo ${array[*]} | sed 's/\ /\&/g')
    [[ ! -z $jdCookie ]] && export JD_COOKIE="$jdCookie"
    temp_user_sum=${#array[*]}
}

## 临时屏蔽某账号运行活动脚本(pt_pin匹配)
TempBlock_JD_PT_PIN(){
    [[ -z $JD_COOKIE ]] && source $file_env
    local TempBlockPinArray=($TempBlockPin)
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local i m n t pt_pin_temp pt_pin_temp_block
    for i in "${!array[@]}"; do
        pt_pin_temp=$(echo ${array[i]} | perl -pe "{s|.*pt_pin=([^; ]+)(?=;?).*|\1|; s|%|\\\x|g}")
        [[ $pt_pin_temp == *\\x* ]] && pt_pin[i]=$(printf $pt_pin_temp) || pt_pin[i]=$pt_pin_temp
        for n in "${!TempBlockPinArray[@]}"; do
            pt_pin_temp_block=$(echo ${TempBlockPinArray[n]} | perl -pe "{s|%|\\\x|g}")
            [[ $pt_pin_temp_block == *\\x* ]] && pt_pin_block[n]=$(printf $pt_pin_temp_block) || pt_pin_block[n]=$pt_pin_temp_block
            [[ "${pt_pin[i]}" =~ "${pt_pin_block[n]}" ]] && unset array[i]
        done
    done
    jdCookie=$(echo ${array[*]} | sed 's/\ /\&/g')
    [[ ! -z $jdCookie ]] && export JD_COOKIE="$jdCookie"
    temp_user_sum=${#array[*]}
}

## 随机账号运行活动
Random_JD_COOKIE(){
    [[ -z $JD_COOKIE ]] && source $file_env
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    local combined_all
    if [[ $RandomMode = "1" ]]; then
        [[ ! $ran_num ]] && ran_num=$user_sum
        if [ $(echo $ran_num|grep '[0-9]') ]; then
            [[ $ran_num -gt $user_sum || $ran_num -lt 2 ]] && ran_num=$user_sum
            ran_sub="$(seq $user_sum | sort -R | head -$ran_num)"
            for i in $ran_sub; do
                tmp="${array[i]}"
                combined_all="$combined_all&$tmp"
            done
            jdCookie=$(echo $combined_all | sed 's/^&//g')
            [[ ! -z $jdCookie ]] && export JD_COOKIE="$jdCookie"
        fi
    fi
}

## 组队任务
combine_team(){
    p=$1
    q=$2
    export jd_zdjr_activityId=$3
    export jd_zdjr_activityUrl=$4
}

team_task(){
    [[ -z $JD_COOKIE ]] && source $file_env
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    local i j k x y p q
    local scr=$scr_name
    local teamer_array=($teamer_num)
    local team_array=($team_num)
    if [[ -f /ql/scripts/$scr ]]; then
        for ((i=0; i<${#teamer_array[*]}; i++)); do
            combine_team ${teamer_array[i]} ${team_array[i]} ${activityId[i]} ${activityUrl[i]}
            [[ $q -ge $(($user_sum/p)) ]] && q=$(($user_sum/p))
            [[ q -lt 1 ]] && q=1
            for ((m = 0; m < $user_sum; m++)); do
                j=$((m + 1))
                x=$((m/q))
                y=$(((p - 1)*m + 1))
                COOKIES_HEAD="${array[x]}"
                COOKIES=""
                if [[ $j -le $q ]]; then
                    for ((n = 1; n < $p; n++)); do
                        COOKIES="$COOKIES&${array[y]}"
                        let y++
                    done
                elif [[ $j -eq $((q + 1)) ]]; then
                    for ((n = 1; n < $((p-1)); n++)); do
                        COOKIES_HEAD="${array[x]}&${array[0]}"
                        COOKIES="$COOKIES&${array[y]}"
                        let y++
                    done
                elif [[ $j -gt $((q + 1)) ]]; then
                    [[ $((y+1)) -le $user_sum ]] && y=$(((p - 1)*m)) || break
                    for ((n = $m; n < $((m + p -1)); n++)); do
                        COOKIES="$COOKIES&${array[y]}"
                        let y++
                        [[ $y = $x ]] && y=$((y+1))
                        [[ $((y+1)) -gt $user_sum ]] && break
                    done
                fi
                result=$(echo -e "$COOKIES_HEAD$COOKIES")
                if [[ $result ]]; then
                    export JD_COOKIE=$result
                    node /ql/scripts/$scr
                fi
#               echo $JD_COOKIE
            done
        done
        exit
    fi
}

## 组合互助码格式化为全局变量的函数
combine_sub() {
    source $file_env
    local what_combine=$1
    local combined_all=""
    local tmp1 tmp2
    local TempBlockCookieInterval="$(echo $TempBlockCookie | perl -pe "{s|~|-|; s|_|-|}" | sed 's/\(\d\+\)-\(\d\+\)/{\1..\2}/g')"
    local TempBlockCookieArray=($(eval echo $TempBlockCookieInterval))
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    local a b i j t sum combined_all
    for ((i=1; i <= $user_sum; i++)); do
        local tmp1=$what_combine$i
        local tmp2=${!tmp1}
        [[ ${tmp2} ]] && sum=$i || break
    done
    [[ ! $sum ]] && sum=$user_sum
    for ((j = 1; j <= $sum; j++)); do
        a=$temp_user_sum
        b=$sum
        if [[ $a -ne $b ]]; then
            for ((t = 0; t < ${#TempBlockCookieArray[*]}; t++)); do
                [[ "${TempBlockCookieArray[t]}" = "$j" ]] && continue 2
            done
        fi
        local tmp1=$what_combine$j
        local tmp2=${!tmp1}
        combined_all="$combined_all&$tmp2"
    done
    echo $combined_all | perl -pe "{s|^&||; s|^@+||; s|&@|&|g; s|@+&|&|g; s|@+|@|g; s|@+$||}"
}

## 正常依次运行时，组合互助码格式化为全局变量
combine_all() {
    for ((i = 0; i < ${#env_name[*]}; i++)); do
        result=$(combine_sub ${var_name[i]})
        if [[ $result ]]; then
            export ${env_name[i]}="$result"
        fi
    done
}

## 正常依次运行时，组合互助码格式化为全局变量
combine_only() {
    for ((i = 0; i < ${#env_name[*]}; i++)); do
        case $1 in
            *${name_js[i]}*.js | *${name_js[i]}*.ts)
	            if [[ -f $dir_log/.ShareCode/${name_config[i]}.log ]]; then
                    . $dir_log/.ShareCode/${name_config[i]}.log
                    result=$(combine_sub ${var_name[i]})
                    if [[ $result ]]; then
                        export ShareCodeConfigName=${name_config[i]}
                        export ShareCodeEnvName=${env_name[i]}
                    fi
                fi
                ;;
           *)
                export ${env_name[i]}=""
                ;;
        esac
    done
}

TempBlock_JD_COOKIE && TempBlock_JD_PT_PIN && Random_JD_COOKIE

if [ $scr_name ]; then
    team_task
else
	combine_only "$1"
fi

#if [[ $(ls $dir_code) ]]; then
#    latest_log=$(ls -r $dir_code | head -1)
#    . $dir_code/$latest_log
#    combine_all
#fi

