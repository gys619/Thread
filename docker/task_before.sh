#!/usr/bin/env bash
#6dylan6_924

name_js=(
  fruit.js
  pet.js
  plantBean.js
  dreamFactory.js
  jdfactory.js
  cash.js
  sgmh.js
  health.js
  moneyTree_help.js
)


env_name=(
  FRUITSHARECODES
  PETSHARECODES
  PLANT_BEAN_SHARECODES
  DREAM_FACTORY_SHARE_CODES
  DDFACTORY_SHARECODES
#  JDZZ_SHARECODES
#  JDJOY_SHARECODES
#  JXNC_SHARECODES
#  BOOKSHOP_SHARECODES
  JD_CASH_SHARECODES
  JDSGMH_SHARECODES
#  JDCFD_SHARECODES
  JDHEALTH_SHARECODES
  MONEYTREE_SHARECODES
)
var_name=(
  ForOtherFruit
  ForOtherPet
  ForOtherBean
  ForOtherDreamFactory
  ForOtherJdFactory
#  ForOtherJdzz
#  ForOtherJoy
#  ForOtherJxnc
#  ForOtherBookShop
  ForOtherCash
  ForOtherSgmh
#  ForOtherCfd
  ForOtherHealth
  ForOtherMoneyTree
)

function getArrItemIdx(){
local arr=$1
local item=$2
local index=0
for i in ${arr[*]}
do
  if [[ $item == $i ]]
    then
    echo $index
    return
  fi
  index=$(( $index + 1 ))
done
}
 
file_code=$dir_log/6dylan6_jdpro_jd_sharecode*
combine_sub() {
    local what_combine=$1
    local combined_all=""
    local tmp1 tmp2
    local envs=$(eval echo "\$JD_COOKIE")
    local array=($(echo $envs | sed 's/&/ /g'))
    local user_sum=${#array[*]}
    for ((i = 1; i <= $user_sum; i++)); do
        local tmp1=$what_combine$i
        local tmp2=${!tmp1}
        combined_all="$combined_all&$tmp2"
    done
    echo $combined_all | perl -pe "{s|^&||; s|^@+||; s|&@|&|g; s|@+&|&|g; s|@+|@|g; s|@+$||}"
}

## 正常依次运行时，组合所有账号的Cookie与互助码
combine_all() {
    for ((i = 0; i < ${#env_name[*]}; i++)); do
        result=$(combine_sub ${var_name[i]})
        #if [[ $result ]]; then
            #export ${env_name[i]}="$result"
            #export ShareCodeConfigName=${name_config[i]}
            #export ShareCodeEnvName=${env_name[i]}
        #fi
    done
}

## 仅输出当前脚本的助力码
combine_only() {
        echo ${name_js[*]}|grep ${cur##*jd_} > /dev/null
        if [[ `echo $?` -eq 0 ]];then
            tmp=$(getArrItemIdx "${name_js[*]}" ${cur##*jd_})
            result=$(combine_sub ${var_name[$tmp]})
            if [[ $result ]]; then
               export ${env_name[$tmp]}="$result"
               #export ShareCodeConfigName=${name_js[$tmp]}
               #export ShareCodeEnvName=${env_name[$tmp]}
            fi
        fi
}

cur=$1
if [[ $(ls $file_code) ]]; then
    latest_log=$(ls -r $file_code | head -1)
    . $file_code/$latest_log
    combine_only
fi
