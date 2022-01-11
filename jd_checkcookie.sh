#!/usr/bin/env bash
'''
cron=	*/20 * * * * jd_checkcookie.sh
new Env('检查更新ck');
'''
## Build 20210831-001

dir_shell=/ql/shell
. $dir_shell/share.sh

gen_pt_pin_array() {
  local envs=$(eval echo "\$JD_COOKIE")
  local array=($(echo $envs | sed 's/&/ /g'))
  local tmp1 tmp2 i pt_pin_temp
  for i in "${!array[@]}"; do
    pt_pin_temp=$(echo ${array[i]} | perl -pe "{s|.*pt_pin=([^; ]+)(?=;?).*|\1|; s|%|\\\x|g}")
    [[ $pt_pin_temp == *\\x* ]] && pt_pin[i]=$(printf $pt_pin_temp) || pt_pin[i]=$pt_pin_temp
    remark_name[i]=$(cat $dir_db/env.db | grep ${array[i]} | perl -pe "{s|.*remarks\":\"([^\"]+).*|\1|g}" | tail -1)
  done
}

check_jd_cookie(){
    local test_connect="$(curl -I -s --connect-timeout 5 https://bean.m.jd.com/bean/signIndex.action -w %{http_code} | tail -n1)"
    local test_jd_cookie="$(curl -s --noproxy "*" "https://bean.m.jd.com/bean/signIndex.action" -H "cookie: $1")"
    local status=$(cat $dir_db/env.db | grep "$1" | perl -pe "{s|.*status\":([^,\"]).*|\1|g}" | tail -1)
    if [ "$test_connect" -eq "302" ]; then
        [[ "$test_jd_cookie" ]] && echo "(COOKIE 有效)" || echo "(COOKIE 已失效)"
    else
        echo "(API 连接失败)"
    fi
}

dump_user_info(){
echo -e "\n## 账号用户名及 COOKIES 整理如下："
local envs=$(eval echo "\$JD_COOKIE")
local array=($(echo $envs | sed 's/&/ /g'))
local notify_content=""
    mkdir $dir_log/Cookie_Notify/
    echo "" > $dir_log/Cookie_Notify/Cookie_Notify.log
    for ((m = 0; m < ${#pt_pin[*]}; m++)); do
        j=$((m + 1))
        if [[ `check_jd_cookie ${array[m]}` =~ "已失效"  ]]; then
            echo -n "用户 $j ${remark_name[m]} 的 Cookie 已失效。\n" >> $dir_log/Cookie_Notify/Cookie_Notify.log
            task /ql/scripts/gys619_jdd/wskey.py
        fi
        echo -e "## 用户名 $j：${pt_pin[m]} 备注：${remark_name[m]} `check_jd_cookie ${array[m]}`\nCookie$j=\"${array[m]}\""
    done
    notify_content="$(cat $dir_log/Cookie_Notify/Cookie_Notify.log)"
    #notify "Cookie 状态通知" "$notify_content" >/dev/null 2>&1
    rm -rf $dir_log/Cookie_Notify
}

gen_pt_pin_array
dump_user_info