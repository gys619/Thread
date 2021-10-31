# 说明
 * 脚本都去重了
 * 个人研究学习自用，主要是为了自己方便
 * 合集加的最后结尾大佬们脚本,删了互助码和互助池，gua佬没删，需要互助池的可以用他们合集，结尾已经放了链接
 * 看到AV脚本群里 Windstill大佬说青蛙大佬也加入了，说我恰饭，那个贡献者是原来青蛙库改的不是有意的
 * 想用谁的合集都可以，结尾有其他大佬们的合集或者看Oreomeow大佬整理的那些
## 青龙拉取链接
``` 
ql repo https://github.com/gys619/jdd.git "jd_|jx_|jddj_|gua_|jddj_|getJDCookie|wskey" "activity|backUp" "^jd[^_]|USER|utils|ZooFaker_Necklace|JDJRValidator_Pure|sign_graphics_validate|jddj_cookie|function|ql"
```
```
推荐定时 0 */4 * * *
```

[兜兜风评价助手1.6测试版](https://github.com/gys619/gys/blob/main/doudoufeng/%E5%85%9C%E5%85%9C%E9%A3%8E%E7%9A%84%E4%B8%9C%E4%BA%AC%E8%AF%84%E4%BB%B7%E5%8A%A9%E6%89%8B(%E6%B5%8B%E8%AF%95%E7%89%88)%201.7.exe?raw=true)

[退会：JDMemberCloseAccount](https://github.com/yqchilde/JDMemberCloseAccount)
### 脚本说明
<details>
<summary>查看</summary>



* 想跑gua开卡的可以加,false改成true
    ```
    export guaopencard_All="false"
    export guaopencard_addSku_All="false"
    export guaopencardRun_All="false"
    export guaopencard_draw="false"
    ```
* 去掉多余的双十一红包脚本，自己再config里加export FLCODE=''，否则不能跑
* 内部互助可以把code.sh和task_before.sh放config目录下，并添加一个code的定时任务，命令:task /ql/config/code.sh
* 加KingRan大佬仓库
* 最新面板2.9.7或者新版拉不到可以进入容器
    ```
    docker exec -it 容器名 bash
    cd repo
    rm -rf gys619_jdd
    ```

* 加了[Oreomeow大佬](https://raw.githubusercontent.com/Oreomeow/VIP/main/Conf/Qinglong/config.sample.sh)的config模板,名字是jd_config.sample.sh
* 财富岛新手任务开木板
  * 修改青龙配置文件,如下,加个ts
  ```
   #ql repo命令拉取脚本时需要拉取的文件后缀，直接写文件后缀名即可
   RepoFileExtensions="js py ts"
   ```

 
 
</details>

### 安装青龙需要一些的依赖
<details>
<summary>查看依赖列表</summary>


* 最新青龙支持安装依赖需要啥依赖，去依赖管理添加即可，简单方便
* 遇到Cannot find module 'xxxxxx'报错就进入青龙容器
* docker exec -it QL(自己容器名) bash
* pnpm install xxxxx(报错中引号里的复制过来)

 

 安装青龙的一些依赖，按需求安装
* docker exec -it qinglong(自己容器名) bash -c "npm install -g typescript"

* docker exec -it qinglong bash -c "npm install axios date-fns"

* docker exec -it qinglong bash -c "npm install crypto -g"

* docker exec -it qinglong bash -c "npm install png-js"

* docker exec -it qinglong bash -c "npm install -g npm"

* docker exec -it qinglong bash -c "pnpm i png-js"

* docker exec -it qinglong bash -c "pip3 install requests"

* docker exec -it qinglong bash -c "apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev && cd scripts && npm install canvas --build-from-source"

* docker exec -it qinglong bash -c "apk add python3 zlib-dev gcc jpeg-dev python3-dev musl-dev freetype-dev"

* docker exec -it qinglong bash -c "cd /ql/scripts/ && apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev && npm i && npm i -S ts-node typescript @types/node date-fns axios png-js canvas --build-from-source"

或者

* npm install -g png-js
* npm install -g date-fns
* npm install -g axios
* npm install -g crypto-js
* npm install -g ts-md5
* npm install -g tslib
* npm install -g @types/node
* npm install -g requests

</details>



### 青龙拉取常用京东脚本库([Oreomeow大佬](https://github.com/Oreomeow/VIP/blob/main/Tasks/qlrepo/Readme.md)整理的一些仓库)
<details>
<summary>京东脚本库</summary>
 

#### 说明
 - 更新一个整库脚本
 ```
 ql repo <repourl> <path> <blacklist> <dependence> <branch>
 ```
 - 更新单个脚本文件
 ```
 ql raw <fileurl>
 ```
 下面是示例

#### 整库
- `Unknown 备份托管等`
  
  1. `JDHelloWorld`
  ```
  ql repo https://github.com/JDHelloWorld/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|enen|update|test" "^jd[^_]|USER|^TS|utils|notify|env|package|ken.js"
  ```
  2. `he1pu`（自动提交助力码-京喜工厂、种豆得豆、东东工厂、东东农场、健康社区、京喜财富岛、东东萌宠、闪购盲盒，随机从数据库中选取助力码互助）
  ```
  ql repo https://github.com/he1pu/JDHelp.git "jd_|jx_|getJDCookie" "Coupon|update" "^jd[^_]|USER|^sign|^ZooFaker|utils"
  ```
  3. `shufflewzc`
  ```
  ql repo https://github.com/shufflewzc/faker2.git "jd_|jx_|gua_|jddj_|getJDCookie" "activity|backUp" "^jd[^_]|USER|utils|^JS|^TS|^JDJRValidator_Pure|^ZooFaker|^sign"
  ```
  4. `Aaron-lv`
  ```
  ql repo https://github.com/Aaron-lv/sync.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon" "^jd[^_]|USER|utils" "jd_scripts"
  ```
  5. `panghu999`（无维护）
  ```
  ql repo https://github.com/panghu999/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon|jd_try|format_" "^jd[^_]|USER"
  ```
  6. `chinnkarahoi`（无维护）
  ```
  ql repo https://github.com/chinnkarahoi/jd_scripts.git "jd_|jx_|getJDCookie" "activity|backUp|Coupon" "^jd[^_]|USER"
  ```

- `passerby-b`
```
ql repo https://github.com/passerby-b/JDDJ.git "jddj_" "scf_test_event|jddj_fruit_code.js|jddj_getck.js|jd_|jddj_cookie"
```
- `curtinlv`
```
ql repo https://github.com/curtinlv/JD-Script.git "jd_"
```
- `smiek2221`
```
ql repo https://github.com/smiek2221/scripts.git "jd_|gua_" "" "^MovementFaker|^JDJRValidator|^ZooFaker|^sign" 
```
- `cdle`
```
ql repo https://github.com/cdle/xdd.git "jd_" "disposable|expired|jdc"
```
- `ZCY01`
```
ql repo https://github.com/ZCY01/daily_scripts.git "jd_"
```
- `whyour/hundun`
```
ql repo https://github.com/whyour/hundun.git "quanx" "tokens|caiyun|didi|donate|fold|Env"
```
- `moposmall`
```
ql repo https://github.com/moposmall/Script.git "Me"
```
- `Ariszy (Zhiyi-N)`
```
ql repo https://github.com/Ariszy/Private-Script.git "JD"
```
- `photonmang`（宠汪汪及兑换、点点券修复）
```
ql repo https://github.com/photonmang/quantumultX.git "JDscripts"
```
- `jiulan`
```
ql repo https://github.com/jiulan/platypus.git "jd_|jx_" "" "overdue" "main"
```
- `star261`
```
ql repo https://github.com/star261/jd.git "jd_|star" "" "code" "main"
```
- `Wenmoux`
```
ql repo https://github.com/Wenmoux/scripts.git "other|jd" "" "" "wen"
```
- `Tsukasa007`
```
ql repo https://github.com/Tsukasa007/my_script.git "jd_|jx_" "jdCookie|USER_AGENTS|sendNotify|backup" "" "master"
```

#### 单脚本
#### 名称之后标注`﹢`的单脚本，若上面已拉取仓库的可以不拉，否则会重复拉取。这里适用于只拉取部分脚本使用
> `curtinlv`﹢

>> 入会
```
ql raw https://raw.githubusercontent.com/curtinlv/JD-Script/main/OpenCard/jd_OpenCard.py
```
>> 关注
```
ql raw https://raw.githubusercontent.com/curtinlv/JD-Script/main/getFollowGifts/jd_getFollowGift.py
```

> `chiupam`

>> 京喜工厂瓜分电力开团 ID 
```
ql raw https://raw.githubusercontent.com/chiupam/JD_Diy/master/pys/activeId.py
```

> `Aaron-lv`+

>> 财富岛
```
ql raw https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_cfd.js
```
or
```
ql repo https://github.com/Aaron-lv/sync.git "jd_cfd" "" "" "jd_scripts"
```

> `Wenmoux`+

>> 口袋书店
```
ql raw https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/chinnkarahoi_jd_bookshop.js
```
or
```
ql repo https://github.com/Wenmoux/scripts.git "chinnkarahoi_jd_bookshop" "" "" "wen"
```

> `NobyDa`

>> 京东多合一签到脚本

```
ql raw https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
```
or
```
ql repo https://github.com/NobyDa/Script.git "JD-DailyBonus" "" "JD_DailyBonus" "master"
```

#### 已删库存档
- `monk-coder`
```
ql repo https://github.com/monk-dust/dust.git "i-chenzhe|normal|member|car" "backup"
```
- `hyzaw`
```
ql repo https://github.com/hyzaw/scripts.git "ddo_"
```
- `zooPanda`
```
ql repo https://github.com/zooPanda/zoo.git "zoo"
```
- `longzhuzhu`
```
ql repo https://github.com/longzhuzhu/nianyu.git "qx"
```
- `panghu999/panghu`
```
ql repo https://github.com/panghu999/panghu.git "jd_"
```
</details>
 
 

 
 
 

### 致谢
* [@kangwenhang](https://github.com/kangwenhang)
* [@smiek2221](https://github.com/smiek2221/scripts.git)
* [@yuannian1112](https://github.com/yuannian1112/jd_scripts.git)
*  [@shufflewzc](https://github.com/shufflewzc/faker2.git)
*  [@passerby-b](https://github.com/passerby-b/JDDJ.git)
*  [@he1pu](https://github.com/he1pu/JDHelp.git)
*  [@airacg](https://github.com/airacg/jd_task.git)
*  [@ccwav](https://github.com/ccwav/QLScript2.git)
*  [@Zy143L](https://github.com/Zy143L/wskey.git)
*  [@X1a0He](https://github.com/X1a0He/jd_scripts_fixed)
*  [@AlterGu](https://github.com/AlterGu/qinglong_note)
*  [@KingRan](https://github.com/KingRan/JD-Scripts)
*  [@Aaron-lv](https://github.com/Aaron-lv/sync)
*  [@zzfiu](https://github.com/zzfiu/jd.git)
