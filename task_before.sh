#!/usr/bin/env bash

# Build 20211208-003-test

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
  jd_moneyTree
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
name_chinese=(
  东东农场
  东东萌宠
  京东种豆得豆
  京喜工厂
  东东工厂
  crazyJoy任务
  京东赚赚
  京喜农场
  口袋书店
  签到领现金
  闪购盲盒
  京喜财富岛
  东东健康社区
  京东手机狂欢城
  城城领现金
  摇钱树
  京喜token
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

local_scr=$1
repo_dir=""
sub_dir_scripts="$(ls -l $dir_scripts |awk '/^d/ {print $NF}')"
if [[ ! $local_scr =~ "/" ]] || [[ $local_scr == $dir_scripts/[^/]* ]]; then
    local_scr_dir="$dir_scripts"
elif [[ $local_scr == */* ]] && [[ ! $local_scr =~ ql ]]; then
    repo_dir="$(echo $local_scr | awk -F '/' '{print $(NF-1)}')"
    [[ $sub_dir_scripts[@] =~ $repo_dir ]] && local_scr_dir="$dir_scripts/$repo_dir"
else
    local_scr_dir=""
fi

## 生成pt_pin清单
gen_pt_pin_array() {
    source $file_env
    ori_jdCookie=$JD_COOKIE
    ori_envs=$(eval echo "\$ori_jdCookie")
    ori_array=($(echo $ori_envs | sed 's/&/ /g'))
    local i j ori_pt_pin_temp
    for i in "${!ori_array[@]}"; do
        j=$((i + 1))
        ori_pt_pin_temp=$(echo ${ori_array[i]} | perl -pe "{s|.*pt_pin=([^; ]+)(?=;?).*|\1|; s|%|\\\x|g}")
        ori_remark_name[i]="$(cat $dir_db/env.db | grep ${ori_array[i]} | grep remarks | perl -pe "{s|.*remarks\":\"([^\"]+).*|\1|g}" | tail -1)"
        [[ ! ${ori_remark_name[i]} ]] && ori_remark_name[i]="未备注"
        [[ $ori_pt_pin_temp == *\\x* ]] && ori_pt_pin[i]=$(printf $ori_pt_pin_temp) || ori_pt_pin[i]=$ori_pt_pin_temp
        ori_sn=$j
        ori_uesr_info[i]="序号 $j. 用户名：${ori_pt_pin[i]} 备注：${ori_remark_name[i]}"
    done
}

export_uesr_info(){
for i in $@; do
    for j in "${!ori_array[@]}"; do
        [[ ${ori_array[j]} == *$i* ]] && echo ${ori_uesr_info[j]}
    done
done
}

# Cookie 有效性检查
check_jd_ck(){
    local test_jd_cookie="$(curl -s --connect-timeout 5 --retry 3 --noproxy "*" "https://bean.m.jd.com/bean/signIndex.action" -H "cookie: $1")"
    [[ "$test_jd_cookie" ]] && return 0 || return 1
}

# 移除失效的 Cookie
remove_void_ck(){
    gen_pt_pin_array
    local tmp_jdCookie i j void_ck_num
    if [[ $jdCookie_1 ]]; then
        tmp_jdCookie=$jdCookie_1
    else
        source $file_env
        tmp_jdCookie=$JD_COOKIE
    fi
    local envs=$(eval echo "\$tmp_jdCookie")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    local test_connect="$(curl -I -s --connect-timeout 5 --retry 3 --noproxy "*" https://bean.m.jd.com/bean/signIndex.action -w %{http_code} | tail -n1)"
    echo -e "# 开始检测 Cookie 的有效性，可能花费一定时间，请耐心等待 ..."
    if [ "$test_connect" -eq "302" ]; then
        echo -e "# 本次一共导入 $user_sum 个 Cookie ，其中："
        for ((i = 0; i < $user_sum; i++)); do
            j=$((i + 1))
            check_jd_ck ${array[i]}
            [[ $? = 0 ]] && echo -e "# `export_uesr_info ${array[i]}` 状态正常"
            [[ $? = 1 ]] && echo -e "# `export_uesr_info ${array[i]}` 已失效" && unset array[i]
        done
        jdCookie_2=$(echo ${array[*]} | sed 's/\ /\&/g')
        [[ $jdCookie_2 ]] && export JD_COOKIE="$jdCookie_2"
        void_ck_num=$((user_sum - ${#array[*]}))
        [[ $void_ck_num = 0 ]] && echo -e "# 未检测到失效 Cookie 。" || echo -e "# 已剔除以上 $void_ck_num 个失效的 Cookie 。"
    else
        echo -e "# API 连接失败，跳过检测。"
    fi
    echo -e ""
}

## 临时禁止账号运行活动脚本
TempBlock_CK(){
    ## 按 Cookie 序号禁止账号
    TempBlock_JD_COOKIE(){
        ## 导入基础 JD_COOKIE 变量
        source $file_env
        local tmp_jdCookie=$JD_COOKIE
        local envs=$(eval echo "\$tmp_jdCookie")
        local array=($(echo $envs | sed 's/&/ /g'))
        local user_sum=${#array[*]}
        local TempBlockCookie="$(eval echo $(echo $TempBlockCookie | perl -pe "{s|~\|-|_|g; s|\W+\|[A-Za-z]+| |g; s|(\d+)_(\d+)|{\1..\2}|g;}"))"
        local TempBlockPin="$(echo $TempBlockPin | perl -pe "{s|,| |g;}")"
        local TempBlockCookieArray=($TempBlockCookie)
        local TempBlockPinArray=($TempBlockPin)
        local i j k m jdCookie_3
        for ((i = 1; i <= $user_sum; i++)); do
            j=$((i - 1))
            for ((k = 0; k < ${#TempBlockCookieArray[*]}; k++)); do
                [[ "${TempBlockCookieArray[k]}" = "$i" ]] && unset array[j]
            done
            pt_pin_temp=$(echo ${array[j]} | perl -pe "{s|.*pt_pin=([^; ]+)(?=;?).*|\1|; s|%|\\\x|g}")
            [[ $pt_pin_temp == *\\x* ]] && pt_pin[j]=$(printf $pt_pin_temp) || pt_pin[j]=$pt_pin_temp
            for ((m = 0; m < ${#TempBlockPinArray[*]}; m++)); do
                pt_pin_temp_block=$(echo ${TempBlockPinArray[m]} | perl -pe "{s|%|\\\x|g}")
                [[ $pt_pin_temp_block == *\\x* ]] && pt_pin_block[m]=$(printf $pt_pin_temp_block) || pt_pin_block[m]=$pt_pin_temp_block
                [[ "${pt_pin[j]}" =~ "${pt_pin_block[m]}" ]] && unset array[j]
            done
        done
        jdCookie_1=$(echo ${array[*]} | sed 's/\ /\&/g')
        [[ $jdCookie_1 ]] && export JD_COOKIE="$jdCookie_1"
        user_sum_1=${#array[*]}
    }

    local i j k
    if [[ -n "$(echo $tempblock_ck_envs_num|sed -n "/^[0-9]\+$/p")" ]]; then
        for ((k = 1; k <= $tempblock_ck_envs_num; k++)); do
            if [ tempblock_ck_envs$k ]; then
                local tempblock_ck_array=($(eval echo "\$tempblock_ck_envs$k" | perl -pe "{s|&| |g}"))
                for i in "${tempblock_ck_array[@]}"; do
                    local tmp_task_array=($(echo $i | perl -pe "{s|@| |g}"))
                    local tmp_script_array=($(echo ${tmp_task_array[0]} | perl -pe "{s/\|/ /g}"))
                    for j in ${tmp_script_array[@]}; do
                        if [[ $local_scr == *$j* ]]; then
                            [[ $(echo ${tmp_task_array[1]} | perl -pe "{s|\D||g;}") ]] && TempBlockCookie=${tmp_task_array[1]} || TempBlockCookie=""
                            TempBlockPin=${tmp_task_array[2]}
                            break
                        fi
                    done
                done
            fi
        done
    fi
    if [[ $TempBlockCookie ]] || [[ $TempBlockPin ]]; then
        TempBlock_JD_COOKIE
    else
        export JD_COOKIE="$tmp_jdCookie"
    fi
}

## 重组 CK
Recombin_CK(){
    ## 导入基础 JD_COOKIE 变量
    if [[ $jdCookie_2 ]]; then
        tmp_jdCookie=$jdCookie_2
    elif [[ $jdCookie_1 ]]; then
        tmp_jdCookie=$jdCookie_1
    else
        source $file_env
        tmp_jdCookie=$JD_COOKIE
    fi

    ## JD_COOKIE 基本分析
    local envs=$(eval echo "\$tmp_jdCookie")
    array=($(echo $envs | sed 's/&/ /g'))
    user_sum=${#array[*]}
    local jdCookie_4 i j k m n
    if [[ -n "$(echo $recombin_ck_envs_num|sed -n "/^[0-9]\+$/p")" ]]; then
        for ((k = 1; k <= $recombin_ck_envs_num; k++)); do
            if [ recombin_ck_envs$k ]; then
                local recombin_ck_array=($(eval echo "\$recombin_ck_envs$k" | perl -pe "{s|&| |g}"))
                for i in "${recombin_ck_array[@]}"; do
                    local tmp_task_array=($(echo $i | perl -pe "{s|@| |g}"))
                    local tmp_script_array=($(echo ${tmp_task_array[0]} | perl -pe "{s/\|/ /g}"))
                    #[[ $DEBUG_MODE = 1 ]]  && echo ${tmp_script_array[@]}
                    for j in "${tmp_script_array[@]}"; do
                        if [[ $local_scr == *$j* ]]; then
                            [[ $DEBUG_MODE = 1 ]] && echo -n "${tmp_script_array[@]}" && echo -e "\n"
                            Recombin_CK_Mode="${tmp_task_array[1]}"
                            for ((m = 1; m <= 5; m++)); do
                                n=$((m + 1))
                                eval Recombin_CK_ARG$m="${tmp_task_array[n]}"
                                [[ $DEBUG_MODE = 1 ]] && eval echo "Recombin_CK_ARG$m : \$Recombin_CK_ARG$m"
                            done
                            local temp_status=1
                            [[ $Recombin_CK_Mode = 4 || $Recombin_CK_Mode = 5 ]] && Recombin_CK_cal && break 4 || Recombin_CK_cal
                        fi
                    done
                done
            fi
        done
    fi

    [[ ! $temp_status ]] && Recombin_CK_cal
}

## 重组 CK 计算
Recombin_CK_cal(){
    ## 随机模式算法
    combine_random(){
        local combined_all ran_sub tmp i
        echo "# 正在应用 随机Cookie 模式..."
        [[ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ]] && ran_num=$1 || ran_num=$user_sum
        echo -e "# 当前总共 $user_sum 个有效账号，本次随机抽取 $ran_num 个账号按随机顺序参加活动。"
        ran_sub="$(seq $user_sum | sort -R | head -$ran_num)"
        for i in $ran_sub; do
            j=$((i -1))
            tmp="${array[j]}"
            combined_all="$combined_all&$tmp"
        done
        jdCookie_4=$(echo $combined_all | sed 's/^&//g')
        [[ $jdCookie_4 ]] && export JD_COOKIE="$jdCookie_4"
        #[[ $DEBUG_MODE = 1 ]] && echo $jdCookie_4
    }

    ## 优先模式算法
    combine_priority(){
        local combined_all ran_sub jdCookie_priority jdCookie_random m n
        if [ $1 ]; then
            # 固定区账号数量
            [[ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ]] && fixed_num=$1 || fixed_num="0"
            if [[ $fixed_num -ge $user_sum ]]; then
                echo "# 固定账号数量不得大于或等于有效账号总量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            elif [[ $fixed_num -eq 0 ]]; then
                echo "# 未设定固定账号数量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            else
                echo "# 正在应用 优先Cookie 模式..."
                echo -e "# 当前总共 $user_sum 个有效账号，其中前 $fixed_num 个账号为固定顺序。\n# 本次从第 $((fixed_num + 1)) 个账号开始按随机顺序参加活动。"
                ran_sub=$(seq $fixed_num $user_sum | sort -R)
                for ((m = 0; m < $fixed_num; m++)); do
                    tmp="${array[m]}"
                    jdCookie_priority="$jdCookie_priority&$tmp"
                done
                for n in $ran_sub; do
                    tmp="${array[n]}"
                    jdCookie_random="$jdCookie_random&$tmp"
                done
                combined_all="$jdCookie_priority$jdCookie_random"
                jdCookie_4=$(echo $combined_all | perl -pe "{s|^&||; s|&&|&|; s|&$||}")
                [[ $jdCookie_4 ]] && export JD_COOKIE="$jdCookie_4"
                #[[ $DEBUG_MODE = 1 ]] && echo $jdCookie_4
            fi
        else
            echo "# 由于参数缺失，切换回正常 Cookie 模式..."
            export JD_COOKIE="$tmp_jdCookie"
        fi
    }

    ## 轮换模式算法
    combine_rotation(){
        # 当月总天数
        local total_days=$(cal | grep ^[0-9] | tail -1 | awk -F " " '{print $NF}')
        # 今天几号
        local today_day=$(date +%-d)
        local combined_all rot_num rot_start_num jdCookie_priority jdCookie_rot_head jdCookie_rot_mid tmp_1 tmp_2 tmp_3 a b c
        # 固定区账号数量
        [[ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ]] && fixed_num=$1 || fixed_num="0"
        if [[ $fixed_num -ge $user_sum ]]; then
            echo "# 固定账号数量不得大于或等于有效账号总量，切换回正常 Cookie 模式..."
            export JD_COOKIE="$tmp_jdCookie"
        elif [[ $today_day -gt 1 ]]; then
            echo "# 正在应用 轮换Cookie 模式..."
            local rot_total_num=$((user_sum - $fixed_num))
            if [[ $rot_total_num -gt 2 ]]; then
                # 轮换区的账号数量
                rot_num=$Recombin_CK_ARG2
                [[ -z "$(echo $rot_num|sed -n "/^[0-9]\+$/p")" || ! $rot_num || $rot_num -lt 1 || $rot_total_num -lt $rot_num ]] && rot_num=$(((rot_total_num + total_days -1)/total_days)) && [[ $rot_num -lt 1 ]] && rot_num="1"
                rot_start_num=$((fixed_num + rot_num * ((today_day - 1))))
                while [[ $user_sum -lt $rot_start_num ]]; do rot_start_num=$((rot_start_num - rot_total_num)); done
                echo -n "# 当前总共 $user_sum 个有效账号"
                [[ $fixed_num -gt 0 ]] && echo -e "，其中前 $fixed_num 个账号为固定顺序。" || echo -e "，所有账号参与轮换。"
                echo -e "# 今天从第 $((rot_start_num + 1)) 个账号开始轮换，轮换频次为：$rot_num 个账号/天。"
                for ((a = 0; a < fixed_num; a++)); do
                    tmp_1="${array[a]}"
                    jdCookie_priority="$jdCookie_priority&$tmp_1"
                done
                for ((b = $rot_start_num; b < $user_sum; b++)); do
                    tmp_2="${array[b]}"
                    jdCookie_rot_head="$jdCookie_rot_head&$tmp_2"
                done
                for ((c = $fixed_num; c < $((rot_start_num)); c++)); do
                    tmp_3="${array[c]}"
                    jdCookie_rot_mid="$jdCookie_rot_mid&$tmp_3"
                done
                combined_all="$jdCookie_priority$jdCookie_rot_head$jdCookie_rot_mid"
                jdCookie_4=$(echo $combined_all | perl -pe "{s|^&||; s|&$||}")
                [[ $jdCookie_4 ]] && export JD_COOKIE="$jdCookie_4"
                #[[ $DEBUG_MODE = 1 ]] && echo $jdCookie_4
            else
                echo "# 由于参加轮换的账号数量不足 2 个，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            fi
        elif [[ $today_day -eq 1 ]]; then
            echo "# 今天是 1 号，不应用轮换模式，全部 Cookie 按正常顺序参加活动..."
            export JD_COOKIE="$tmp_jdCookie"
        fi
    }

    ## 组队模式算法
    combine_team(){
        run_js_in_team(){
            local jdCookie_team_part1 jdCookie_team_part2 i j k m n
            for ((i = 0; i < $user_sum; i++)); do
                j=$((i + 1))
                m=$((i/team_num))
                n=$(((teamer_num - 1)*i + 1))
                jdCookie_team_part1="${array[m]}"
                jdCookie_team_part2=""
                if [[ $j -le $team_num ]]; then
                    for ((k = 1; k < $teamer_num; k++)); do
                        jdCookie_team_part2="$jdCookie_team_part2&${array[n]}"
                        let n++
                    done
                elif [[ $j -eq $((team_num + 1)) ]]; then
                    for ((k = 1; k < $((teamer_num-1)); k++)); do
                        jdCookie_team_part1="${array[m]}&${array[0]}"
                        jdCookie_team_part2="$jdCookie_team_part2&${array[n]}"
                        let n++
                    done
                elif [[ $j -gt $((team_num + 1)) ]]; then
                    [[ $((n+1)) -le $user_sum ]] && n=$(((teamer_num - 1)*i)) || break
                    for ((k = $i; k < $((i + teamer_num -1)); k++)); do
                        jdCookie_team_part2="$jdCookie_team_part2&${array[n]}"
                        let n++
                        [[ $n = $m ]] && n=$((n+1))
                        [[ $((n+1)) -gt $user_sum ]] && break
                    done
                fi
                jdCookie_4=$(echo -e "$jdCookie_team_part1$jdCookie_team_part2")
                if [[ $jdCookie_4 ]]; then
                    export JD_COOKIE="$jdCookie_4"
                    #[[ $DEBUG_MODE = 1 ]] && echo $jdCookie_4
                    if [[ $local_scr == *.js ]]; then
                        if [ $temp_status = 3 ]; then
                            node /ql/scripts/$local_scr
                            [[ $interval_time != "0" ]] && echo -e "# 等待 $interval_time 秒后开始进行下一组队任务 ..."
                            sleep $interval_time
                        else
                            node /ql/scripts/$local_scr &
                            sleep $delay_time
                        fi
                    fi
                fi
            done
            exit
        }

        local teamer_num="$1"
        local team_num="$2"
        local p q
        if [[ $1 ]] && [[ $2 ]]; then
            # 每组队伍的成员数量
            [[ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ]] && teamer_num=$1 || teamer_num=$user_sum
            # 单个账号最多发起的组队数量
            [[ -n "$(echo $2|sed -n "/^[0-9]\+$/p")" ]] && team_num=$2 || team_num=1
            if [[ $teamer_num -ge $user_sum ]]; then
                echo "# 每组队伍的成员数量不得大于或等于有效账号总数量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            elif [[ $((teamer_num * team_num)) -ge $user_sum ]]; then
                echo "# 参与组队的总成员数量不得大于或等于有效账号总数量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            else
                echo "# 正在应用 组队Cookie 模式..."
                [[ $team_num -ge $((user_sum/teamer_num)) ]] && team_num=$((user_sum/teamer_num)) && [[ $team_num -lt 1 ]] && team_num=1
                echo -e "# 当前总共 $user_sum 个有效账号，每支队伍包含 $1 个账号，每个账号可以发起 $2 次组队。"
                if [[ -n "$(echo $3|perl -pe "{s|\.\|s\|m\|h\|d||g}"|sed -n "/^[0-9]\+$/p")" ]]; then
                    temp_status="1"
                    local delay_time="$(echo $3|perl -pe "{s|([a-z])(\d)+|\1 \2|g;}")"
                    echo -e "各支队伍启动脚本的延隔时间为`format_time $3`。"
                elif [[ $3 = 0 ]]; then
                    temp_status="2"
                    local delay_time="0"
                    echo -e "所有队伍并发启动脚本，可能会占用较高的系统资源导致卡顿。"
                elif [[ $3 = "-" ]] && [[ -n "$(echo $4|perl -pe "{s|\.\|s\|m\|h\|d||g}"|sed -n "/^[0-9]\+$/p")" ]] ; then
                    temp_status="3"
                    local interval_time="$(echo $4|perl -pe "{s|([a-z])(\d)|\1 \2|g;}")"
                    echo -e "各支队伍启动脚本的间隔时间为`format_time $4`。"
                else
                    temp_status="3"
                    delay_time="0"
                    interval_time="0"
                fi
                if [[ ${activity_env[0]} ]]; then
                    if [[ $5 = 0 ]]; then
                        for p in ${activity_env[@]}; do
                            activity_array=($(echo $p | perl -pe "{s|@| |g}"))
                            export jd_zdjr_activityId=${activity_array[0]}
                            export jd_zdjr_activityUrl=${activity_array[1]}
                            echo -e "活动ID(activityId)   : $jd_zdjr_activityId"
                            echo -e "活动链接(activityUrl): $jd_zdjr_activityUrl"
                            run_js_in_team
                        done
                    elif [[ $5 -gt 0 ]]; then
                        q=$(($5 - 1))
                        activity_array=($(echo ${activity_env[q]} | perl -pe "{s|@| |g}"))
                        export jd_zdjr_activityId=${activity_array[0]}
                        export jd_zdjr_activityUrl=${activity_array[1]}
                        run_js_in_team
                    fi
                else
                    run_js_in_team
                fi
            fi
        else
            echo "# 由于参数缺失，切换回 正常 Cookie 模式..."
            export JD_COOKIE="$tmp_jdCookie"
        fi
    }

    ## 分段模式算法
    combine_segmentation(){
        local delay_time="$3"
        local interval_time="$4"
        local jdCookie_priority jdCookie_team_part i j k m n
        if [[ $1 ]] && [[ $2 ]]; then
            # 固定区账号数量
            [[ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ]] && fixed_num=$1 || fixed_num="0"
            # 每段账号总数量
            [[ -n "$(echo $2|sed -n "/^[0-9]\+$/p")" ]] && segment_length=$2 || segment_length=$user_sum
            if [[ $fixed_num -ge $segment_length ]]; then
                echo "# 固定账号数量不得大于或等于每段账号总数量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            elif [[ $segment_length -ge $user_sum ]]; then
                echo "# 分段账号数量不得大于或等于有效账号总数量，切换回正常 Cookie 模式..."
                export JD_COOKIE="$tmp_jdCookie"
            elif [[ $fixed_num -lt $segment_length ]]; then
                echo "# 正在应用 分段Cookie 模式..."
                local team_length="$((segment_length - fixed_num))"
                local team_total_num=$(((user_sum - fixed_num + team_length -1)/team_length)) && [[ $team_total_num -lt 1 ]] && team_total_num=1
                echo -n "# 当前总共 $user_sum 个有效账号"
                [[ $fixed_num -ne 0 ]] && echo -n "，其中前 $fixed_num 个账号为固定顺序"
                echo -n "。每 $segment_length 个账号分一段，一共分 $team_total_num 段。"
                if [[ -n "$(echo $3|perl -pe "{s|\.\|s\|m\|h\|d||g}"|sed -n "/^[0-9]\+$/p")" ]]; then
                    temp_status="1"
                    local delay_time="$(echo $3|perl -pe "{s|([a-z])(\d)+|\1 \2|g;}")"
                    echo -e "各分段启动脚本的延隔时间为`format_time $3`。"
                    echo -e "# 注意：如果每段的运行时间较长且延隔时间设定较短，运行日志可能会显示混乱，此为正常现象。"
                elif [[ $3 = 0 ]]; then
                    temp_status="2"
                    local delay_time="0"
                    echo -e "所有分段并发启动脚本，可能会占用较高的系统资源导致卡顿。"
                    echo -e "# 注意：运行日志会显示混乱，此为正常现象。"
                elif [[ $3 = "-" ]] && [[ -n "$(echo $4|perl -pe "{s|\.\|s\|m\|h\|d||g}"|sed -n "/^[0-9]\+$/p")" ]] ; then
                    temp_status="3"
                    local interval_time="$(echo $4|perl -pe "{s|([a-z])(\d)|\1 \2|g;}")"
                    echo -e ""
                else
                    temp_status="3"
                    delay_time="0"
                    interval_time="0"
                    echo -e "各分段启动脚本的间隔时间为`format_time $4`。"
                fi
                for ((m = 0; m < $fixed_num; m++)); do
                    tmp="${array[m]}"
                    jdCookie_priority="$jdCookie_priority&$tmp"
                done
                for ((i = 0; i < $team_total_num; i++)); do
                    j=$((i + 1))
                    m=$((team_length * i + fixed_num))
                    n=$((team_length * j + fixed_num))
                    t=$n && [[ $user_sum -lt $t ]] && t=$user_sum
                    jdCookie_team_part=""
                    for ((k = m; k < $n; k++)); do
                        tmp="${array[k]}"
                        jdCookie_team_part="$jdCookie_team_part&$tmp"
                    done
                    jdCookie_4=$(echo $jdCookie_priority$jdCookie_team_part | perl -pe "{s|^&+\|&+$||g}")
                    if [[ $jdCookie_4 ]]; then
                        export JD_COOKIE="$jdCookie_4"
                        #[[ $DEBUG_MODE = 1 ]] && echo $jdCookie_4
                        if [[ $local_scr == *.js ]]; then
                            if [ $temp_status = 3 ]; then
                                [[ $fixed_num -ne 0  ]] && echo -e "# 本次提交的是前 $fixed_num 位账号及第 $((m + 1)) - $n 位账号。" || echo -e "# 本次提交的是第 $((m + 1)) - $n 位账号。"
                                node /ql/scripts/$local_scr
                                [[ $interval_time != "0" ]] && echo -e "# 等待`format_time $interval_time`后开始进行下一段任务 ..."
                                sleep $interval_time
                            else
                                [[ $fixed_num -ne 0  ]] && echo -e "# 本次提交的是前 $fixed_num 位账号及第 $((m + 1)) - $n 位账号。" || echo -e "# 本次提交的是第 $((m + 1)) - $n 位账号。"
                                node /ql/scripts/$local_scr &
                                sleep $delay_time
                            fi
                        fi
                    fi
                done
                exit
            fi
        else
            echo "# 由于参数缺失，切换回正常 Cookie 模式..."
            export JD_COOKIE="$tmp_jdCookie"
        fi
    }

    # 格式化时间
    format_time(){
        for i in $@; do
            if [[ -n "$(echo $i|perl -pe "{s|\.||g}"|sed -n "/^[0-9]\+$/p")" ]]; then
                time_text=" $i 秒"
            elif [[ -n "$(echo $i|perl -pe "{s|\.\|s\|m\|h\|d||g}"|sed -n "/^[0-9]\+$/p")" ]]; then
                time_text="$(echo $i|perl -pe "{s|([a-z])(\d)+|\1 \2|g; s|s| 秒|g; s|m| 分|g; s|h| 小时|g; s|d| 天|g; s|^| |g; s|(\d+)$|\1 秒|g;}")"
            fi
            echo -n "$time_text"
        done
    }

    # Cookie 环境变量迭代导入
    [[ $jdCookie_4 ]] && array=($(echo $jdCookie_4 | sed 's/&/ /g')) && user_sum=${#array[*]}
    ## 移除无效 Cookie
    [[ $Recombin_CK_Mode ]] && [[ $Remove_Void_CK = 1 ]] && remove_void_ck
    # Recombin_CK_ARG1 参数基本判断
    if [ -n "$(echo $Recombin_CK_ARG1|sed -n "/^[0-9]\+$/p")" ]; then
        [[ $user_sum -lt $Recombin_CK_ARG1 || $Recombin_CK_ARG1 -lt 0 ]] && Recombin_CK_ARG1=$user_sum
    else
        Recombin_CK_ARG1=""
    fi

    case $Recombin_CK_Mode in
        1)
            combine_random $Recombin_CK_ARG1
            ;;
        2)
            combine_priority $Recombin_CK_ARG1
            ;;
        3)
            combine_rotation $Recombin_CK_ARG1 $Recombin_CK_ARG2
            ;;
        4)
            combine_team $Recombin_CK_ARG1 $Recombin_CK_ARG2 $Recombin_CK_ARG3 $Recombin_CK_ARG4 $Recombin_CK_ARG5
            ;;
        5)
            combine_segmentation $Recombin_CK_ARG1 $Recombin_CK_ARG2 $Recombin_CK_ARG3 $Recombin_CK_ARG4
            ;;
        *)
            export JD_COOKIE="$tmp_jdCookie"
            ;;
    esac
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
        case $local_scr in
            *${name_js[i]}*.js | *${name_js[i]}*.ts)
                if [[ -f $dir_log/.ShareCode/${name_config[i]}.log ]]; then
                    . $dir_log/.ShareCode/${name_config[i]}.log
                    result=$(combine_sub ${var_name[i]})
                    if [[ $result ]]; then
                        export ShareCodeConfigChineseName=${name_chinese[i]}
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

## 提前替换js基础依赖
JS_Deps_Replace() {
    if [ $js_deps_replace_envs ]; then
        local js_deps_replace_array=($(echo $js_deps_replace_envs | perl -pe "{s|&| |g}"))
        for i in "${js_deps_replace_array[@]}"; do
            local tmp_task_array=($(echo $i | perl -pe "{s|@| |g}"))
            local tmp_script_array=($(echo ${tmp_task_array[0]} | perl -pe "{s/\|/ /g}"))
            local tmp_skip_repo=($(echo ${tmp_task_array[1]} | perl -pe "{s/\|/ /g}"))
            for j in "${tmp_script_array[@]}"; do
                [[ ! ${tmp_skip_repo[@]} =~ $repo_dir ]] && [[ -f $dir_config/$j.js ]] && [[ $local_scr_dir ]] && cp -rvf $dir_config/$j.js $local_scr_dir/$j.js
            done
        done
    fi
}

## 魔改版 jdCookie.js 复制到 /ql/deps/。仅支持v2.10.8及以上版本的青龙
## [[ -d $dir_dep && -f $dir_config/jdCookie.js ]] && cp -rf $dir_config/jdCookie.js $dir_dep
## 魔改版 jdCookie.js 和 sendNotify.js 覆盖到 /ql/scripts/及子路径下的所有 jdCookie.js。支持v2.10.8 以下版本的青龙
## [[ -f $dir_config/$i.js ]] && find $dir_scripts ! \( -path "*JDHelloWorld*" -o -path "*ccwav*" \) -type f -name $i|xargs -n 1 cp -rf $dir_config/$i.js && cp -rf $dir_config/$i.js $dir_scripts
## [[ -f $dir_config/$i.js ]] && cp -rf $dir_config/$i.js $local_scr_dir/


JS_Deps_Replace && TempBlock_CK && Recombin_CK

combine_only

#if [[ $(ls $dir_code) ]]; then
#    latest_log=$(ls -r $dir_code | head -1)
#    . $dir_code/$latest_log
#    combine_all
#fi
