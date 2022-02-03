## Version: v2.8.0
## Date: 2021-06-20
## Mod: Build 20220203-002-test
## Update Content: 可持续发展纲要\n1. session管理破坏性修改\n2. 配置管理可编辑config下文件\n3. 自定义脚本改为查看脚本\n4. 移除互助相关

## 上面版本号中，如果第2位数字有变化，那么代表增加了新的参数，如果只有第3位数字有变化，仅代表更新了注释，没有增加新的参数，可更新可不更新

## 在运行 ql repo 命令时，是否自动删除失效的脚本与定时任务
AutoDelCron="true"

## 在运行 ql repo 命令时，是否自动增加新的本地定时任务
AutoAddCron="true"

## 拉取脚本时默认的定时规则，当匹配不到定时规则时使用，例如: 0 9 * * *
DefaultCronRule="37 0 * * *"

## ql repo命令拉取脚本时需要拉取的文件后缀，直接写文件后缀名即可
RepoFileExtensions="js py sh ts"

## 由于github仓库拉取较慢，所以会默认添加代理前缀，如不需要请移除
GithubProxyUrl="https://ghproxy.com/"

## 设置定时任务执行的超时时间，默认1h，后缀"s"代表秒(默认值), "m"代表分, "h"代表小时, "d"代表天
CommandTimeoutTime="3h"

## 设置批量执行任务时的并发数，默认同时执行5个任务
MaxConcurrentNum="20"

## 在运行 task 命令时，随机延迟启动任务的最大延迟时间
## 默认给javascript任务加随机延迟，如 RandomDelay="300" ，表示任务将在 1-300 秒内随机延迟一个秒数，然后再运行，取消延迟赋值为空
RandomDelay=""

## 如果你自己会写shell脚本，并且希望在每次运行 ql update 命令时，额外运行你的 shell 脚本，请赋值为 "true"，默认为true
EnableExtraShell="true"

## 是否自动启动bot，默认不启动，设置为true时自动启动，目前需要自行克隆bot仓库所需代码，存到ql/repo目录下，文件夹命名为dockerbot
AutoStartBot="true"

## 安装bot依赖时指定pip源，默认使用清华源，如不需要源，设置此参数为空
PipMirror="https://pypi.tuna.tsinghua.edu.cn/simple"

## 通知环境变量
## 1. Server酱
## https://sct.ftqq.com
## 下方填写 SCHKEY 值或 SendKey 值
export PUSH_KEY=""

## 2. BARK
## 下方填写app提供的设备码，例如：https://api.day.app/123 那么此处的设备码就是123
export BARK_PUSH=""
## 下方填写推送声音设置，例如choo，具体值请在bark-推送铃声-查看所有铃声
export BARK_SOUND=""
## 下方填写推送消息分组，默认为"QingLong"
export BARK_GROUP="QingLong"

## 3. Telegram
## 下方填写自己申请@BotFather的Token，如10xxx4:AAFcqxxxxgER5uw
export TG_BOT_TOKEN=""
## 下方填写 @getuseridbot 中获取到的纯数字ID
export TG_USER_ID=""
## Telegram 代理IP（选填）
## 下方填写代理IP地址，代理类型为 http，比如您代理是 http://127.0.0.1:1080，则填写 "127.0.0.1"
## 如需使用，请自行解除下一行的注释
export TG_PROXY_HOST=""
## Telegram 代理端口（选填）
## 下方填写代理端口号，代理类型为 http，比如您代理是 http://127.0.0.1:1080，则填写 "1080"
## 如需使用，请自行解除下一行的注释
export TG_PROXY_PORT=""
## Telegram 代理的认证参数（选填）
export TG_PROXY_AUTH=""
## Telegram api自建反向代理地址（选填）
## 教程：https://www.hostloc.com/thread-805441-1-1.html
## 如反向代理地址 http://aaa.bbb.ccc 则填写 aaa.bbb.ccc
## 如需使用，请赋值代理地址链接，并自行解除下一行的注释
export TG_API_HOST=""

## 4. 钉钉
## 官方文档：https://developers.dingtalk.com/document/app/custom-robot-access
## 下方填写token后面的内容，只需 https://oapi.dingtalk.com/robot/send?access_token=XXX 等于=符号后面的XXX即可
export DD_BOT_TOKEN=""
export DD_BOT_SECRET=""

## 5. 企业微信机器人
## 官方说明文档：https://work.weixin.qq.com/api/doc/90000/90136/91770
## 下方填写密钥，企业微信推送 webhook 后面的 key
export QYWX_KEY=""

## 6. 企业微信应用
## 参考文档：http://note.youdao.com/s/HMiudGkb
## 下方填写素材库图片id（corpid,corpsecret,touser,agentid），素材库图片填0为图文消息, 填1为纯文本消息
export QYWX_AM=""

## 7. iGot聚合
## 参考文档：https://wahao.github.io/Bark-MP-helper
## 下方填写iGot的推送key，支持多方式推送，确保消息可达
export IGOT_PUSH_KEY=""

## 8. Push Plus
## 官方网站：http://www.pushplus.plus
## 下方填写您的Token，微信扫码登录后一对一推送或一对多推送下面的token，只填 PUSH_PLUS_TOKEN 默认为一对一推送
export PUSH_PLUS_TOKEN=""
## 一对一多推送（选填）
## 下方填写您的一对多推送的 "群组编码" ，（一对多推送下面->您的群组(如无则新建)->群组编码）
## 1. 需订阅者扫描二维码 2、如果您是创建群组所属人，也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送
export PUSH_PLUS_USER=""

## 仅指定的脚本采用 pushplus 推送
## case $1 in
##     ccwav_QLScript2_jd_bean_change* | ccwav_QLScript2_jd_CheckCK* | *jd_scripts_jd_dreamFactory* | *jd_jxgc* | *jd_pigPet* )
##         export PUSH_PLUS_TOKEN=""                                                                                             ##填写 pushplus 的 token
##         export PUSH_PLUS_USER=""                                                                                              #填写 pushplus 的群组名称，不填的话只推送到 pushplus 的个人消息
##         ;;
##     *)
##         export PUSH_PLUS_TOKEN=""                                                                                             ##必填项。默认为空，表示其他脚本不推送 pushplus。
##         export PUSH_PLUS_USER=""                                                                                              ##必填项。默认为空，表示其他脚本不推送 pushplus 群组。
##         ;;
## esac

## 9. go-cqhttp
## gobot_url 推送到个人QQ: http://127.0.0.1/send_private_msg  群：http://127.0.0.1/send_group_msg
## gobot_token 填写在go-cqhttp文件设置的访问密钥
## gobot_qq 如果GOBOT_URL设置 /send_private_msg 则需要填入 user_id=个人QQ 相反如果是 /send_group_msg 则需要填入 group_id=QQ群
## go-cqhttp相关API https://docs.go-cqhttp.org/api
export GOBOT_URL=""
export GOBOT_TOKEN=""
export GOBOT_QQ=""

## 10 临时禁止Cookie
### 分为 按 Cookie 序号、按 pt_pin(用户名) 2 种模式禁止将 Cookie 提交活动脚本：
### 其他说明：①全局模式和局部模式可同时生效；
###         ②支持黑名单模式(即不使用该模式，详见 局部模式环境变量 recombin_ck_envs 说明)；

## 10.1 全局模式选项
### 赋值要求：①TempBlockCookie 只能填数字或者区间，表示按 Cookie 序号禁止账号；
###         ②TempBlockPin 只能填写 pt_pin 值 或者 用户名(支持中文)，表示按 pt_pin 或者 用户名(支持中文) 禁止账号。
###         ③TempDesiPin 只能填写 pt_pin 值 或者 用户名(支持中文)，表示按 pt_pin 或者 用户名(支持中文) 只允许设定的账号参加活动。
###         ④对全部脚本有效(除非 recombin_ck_envs 另有设定)；
###         ⑤例如：TempBlockCookie="1,2,5_8,12~19 20"，表示第 1、2、5至8、12至19、20位账号均被禁止参加活动。数字与数字，数字与区间之间可用 ~、_、空格隔开；
###         ⑥例如：TempBlockPin="张三 jd_13134567890,%E7%95%AA%E8%8C%84%E5%8A%A0%E4%B8%AA%E8%9B%8B"，表示 张三、jd_13134567890、番茄加个蛋、这几个账号均被禁止参加活动。各账号间可用 , 或空格隔开；
###         ⑦例如：TempDesiPin="张三 jd_13134567890,%E7%95%AA%E8%8C%84%E5%8A%A0%E4%B8%AA%E8%9B%8B"，表示只允许 张三、jd_13134567890、番茄加个蛋、这几个账号参加活动。各账号间可用 , 或空格隔开；
TempBlockCookie=""
TempBlockPin=""
TempDesiPin=""

## 10.2 局部模式环境变量
### 释义：①单脚本规则单元：脚本1文件名关键词@参数1@参数2；
###      ②两个及以上脚本共享一套规则单元：脚本1文件名关键词|脚本2文件名关键词@参数1@参数2。多脚本共用一套规则单元时，脚本文件名关键词之间采用 | 分隔符。
### 赋值要求：①脚本文件名关键词，例如，东东农场的活动脚本关键词 jd_fruit；多个脚本关键词采用 | 符号分隔。例如：jd_fruit|jd_dreamFactory；
###         ②脚本文件名关键词与各参数采用 @ 连接。释义附后。如果不设定参数1，表示该脚本所有账号参加活动(即：黑名单)；
###         ③参数1。表示 TempBlockCookie。不能有空格，建议序号与序号、序号与区间采用 , 分隔；
###         ④参数2。表示 TempBlockPin。不能有空格，各 pt_pin(或用户名) 采用 , 分隔；
###         ⑤参数3。表示 TempDesiPin。不能有空格，各 pt_pin(或用户名) 采用 , 分隔；
###         ⑥各个规则单元之间采用 & 连接，例如：jd_fruit|jd_dreamFactory@1,3-4,7~9&jd_plantBean@2,4-6,8@张三&jd_pigPet@-@张三&jd_plantBean；
###               jd_fruit|jd_dreamFactory@1,3-5,7~9   使用模式：按序号，1、3至5、7至9不参加活动
###               jd_plantBean@2,4-6,8@张三            使用模式：按序号，2、4至6、8不参加活动，且张三也不参加活动
###               jd_pigPet@-@张三,赵四                使用模式：按pt_pin或用户名，张三和赵四不参加活动。注意，参数1位置需要 - 作为占位符
###               jd_pigPet@-@-@张三,赵四              使用模式：按pt_pin或用户名，仅张三和赵四参加活动。注意，参数1、参数2填任意非空值，都只允许参数3位置的账号参加活动
###               jd_plantBean                         使用模式：所有账号参加活动

## 10.2.1 局部模式环境变量的启用数量
### 释义：顾名思义；
### 赋值要求：①正整数。如果填写 3 ，表示 tempblock_ck_envs1 ~ tempblock_ck_envs3 生效；
tempblock_ck_envs_num=""
## 10.2.2 多组环境变量
### 释义：可以自由定义多组局部模式环境变量，如果多组变量中针对同一个脚本设置了多次变量，第一次变量有效，其他变量无效；
### 赋值要求：详见“局部模式环境变量”赋值要求；
# tempblock_ck_envs1="jd_fruit@1,3-4,7~9&jd_plantBean@2,4-6,8@张三&jd_pigPet@-@张三&jd_plantBean"
# tempblock_ck_envs2="Check|jd_islogin_xh@3-5@法外狂徒"
# tempblock_ck_envs3="jd_joy_reward@-@-@郭靖,名侦探"
tempblock_ck_envs1=""
tempblock_ck_envs2=""
tempblock_ck_envs3=""

## 11 重组Cookie
### 分为 随机、优先、轮换、组队和分段 5 种模式：
### 1、随机模式：支持自定义从所有 Cookie 中随机抽取若干数量的账号按随机顺序参加活动；
### 2、优先模式：支持自定义前若干数量的账号固定按照正常顺序参加活动，其余账号按随机顺序参加活动；
### 3、轮换模式：支持自定义前若干数量的账号固定按照正常顺序参加活动，其余账号按轮换模式参加活动。所谓轮换就是指若干数量的账号每过一天挪动到 Cookie 队伍末尾；
### 4、组队模式：只支持 js 脚本。根据游戏规则每支队伍的成员数量、每个账号能发起的组队次数上限自动按顺序参加活动。
### 5、分段模式：只支持 js 脚本。支持自定义按若干数量拆分账号，按分段顺序参加活动。支持各段启动活动脚本的延隔时间。
### 其他说明：①全局模式和局部模式可同时生效；
###         ②支持黑名单模式(即不使用该模式，详见 局部模式环境变量 recombin_ck_envs 说明)；

## 11.1 全局模式选项
### 模式
### 赋值要求：①只能填 1 2 3 4 5，分别表示随机、优先、轮换、组队、分段 5 种模式，对全部脚本有效(除非 recombin_ck_envs 另有设定)；
###         ②若填写为其他内容，则所有账号按正常顺序参加活动(除非 recombin_ck_envs 另有设定)；
Recombin_CK_Mode=""

### 参数 1
### 释义：①在随机模式下：表示随意抽取 N 个账号随机顺序参加活动；
###      ②在优先模式和轮换模式下：表示前 N 个账号固定按正常顺序参加活动；
###      ③在组队模式下：表示每支队伍的成员数量；
###      ④在分段模式下：表示前 N 个账号固定按正常顺序参加活动；
### 赋值要求：①填写不大于 Cookie 总数的 0 或正整数，对全部脚本有效(除非 recombin_ck_envs 另有设定)；
###         ②随机模式下：若赋空值或非数字字符，则所有账号随机顺序参加活动；若填写数值为 0 或大于等于 Cookie 总数，则所有账号按正常顺序参加活动；
###         ③优先模式下：若填写数值为 0 或大于等于 Cookie 总数，则所有账号切换回正常顺序参加活动；
###         ④轮换模式下：若填写数值为 0 ，表示所有账号参加轮换；若填写数值为大于等于 Cookie 总数，则所有账号切换回正常顺序参加活动；
###         ⑤组队模式下：若填写数值为 0 或其他内容，则所有账号切换回正常顺序参加活动。
###         ⑥分段模式下：若填写数值为 0 ，表示所有账号参与分段；若填写数值为大于等于 Cookie 总数，则所有账号切换回正常顺序参加活动；
Recombin_CK_ARG1=""

### 参数 2
### 释义：①随机模式和优先模式下：无意义；
###      ②轮换模式下：表示自定义轮换频次，即单日参加轮换的账号数量；
###      ③在组队模式下：表示每个账号发起组队的次数；
###      ④在分段模式下：表示每个分段的账号数量；
### 赋值要求：①轮换模式下：只能填不大于参与轮换账号数量(即：总Cookie数量-固定Cookie数量)的正整数；
###         ②轮换模式下：若填写为其他内容或留空，则自动调整为按天计算轮换频次(即：参与轮换账号数量÷当月总天数的商值，取上整数)；
###         ③组队模式下：若填写为其他内容或留空，则所有账号切换回正常顺序参加活动。
###         ④分段模式下：只能填大于固定账号数量且不大于 Cookie 总数的数值。若填写为其他内容或留空，则所有账号切换回正常顺序参加活动。
Recombin_CK_ARG2=""

## 重组Cookie前是否剔除失效Cookie
### 释义：①如果开启，会在模式参数已设定的情况下，执行任务前进行 Cookie 有效性验证并剔除失效的 Cookie。受 Cookie 总数量影响任务启动的即时性；
### 赋值要求：①填 1 表示开启，填其他内容或空值表示关闭；
Remove_Void_CK=""

## 始终放置在末尾的Cookie
### 赋值要求：①只能填写 pt_pin 值 或者 用户名(支持中文)，表示按 pt_pin 或者 用户名(支持中文) 禁止账号。
###         ②例如：Bottom_CK="张三 jd_13134567890,%E7%95%AA%E8%8C%84%E5%8A%A0%E4%B8%AA%E8%9B%8B"，表示 张三、jd_13134567890、番茄加个蛋、这几个账号始终排在账号队列末尾。各账号间可用 , 或空格隔开。这三个账号之间的顺序同变量中的顺序；
Bottom_CK=""

## 11.2 局部模式环境变量
### 释义：①单脚本规则单元：脚本1文件名关键词@模式@参数1@参数2@参数3@参数4@参数5；
###      ②两个及以上脚本共享一套规则单元：脚本1文件名关键词|脚本2文件名关键词@模式@参数1@参数2@参数3@参数4@参数5。多脚本共用一套规则单元时，脚本文件名关键词之间采用|分隔符。
### 赋值要求：①脚本文件名关键词，例如，东东农场的活动脚本关键词 jd_fruit，支持某个作者的脚本通配符模糊匹配，例如：ccwav*jd_fruit表示只对ccwav的jd_fruit脚本生效。多个脚本关键词采用 | 符号分隔。例如：jd_fruit|jd_dreamFactory；
###         ②脚本文件名关键词与各参数采用 @ 连接。释义附后。如果不设定参数1，表示该脚本按正常账号顺序参加活动(即：黑名单)；
###         ③模式。表示 Recombin_CK_Mode；
###         ④参数1。表示 Recombin_CK_ARG1；
###         ⑤参数2。表示 Recombin_CK_ARG2；
###         ⑥参数3。表示 Recombin_CK_ARG3；组队模式、分段模式：表示各分段启动活动脚本的延隔时间。当该参数填写 0 的时候，表示各分段/组并发参加活动。支持 d(天)、h(小时)、m（分钟）、s(秒可略写)。如 1d2h3m4s 表示 1天2小时3分钟4秒；
###         ⑦参数4。表示 Recombin_CK_ARG4；组队模式、分段模式：表示各分段启动活动脚本的间隔时间。需参数3为 - 占位符时生效。支持 d(天)、h(小时)、m（分钟）、s(秒可略写)。如 1d2h3m4s 表示 1天2小时3分钟4秒；
###         ⑧参数5。表示 Recombin_CK_ARG5；组队瓜分京豆脚本 (jd_zdjr) ：表示调用 activity_env 变量组(用法附后)的指定环境变量。例如，填 0，表示所有变量执行一次，填 1 表示只调用第 1 组变量。需参数3、参数4已赋值或为 - 占位符时生效；
###         ⑨各个规则单元之间采用 & 连接。可以针对同一脚本设置多个规则单元，以实现模式迭代组合。当多次变量遇到组队或分段模式时，终止迭代，即：随机、优先、轮换三者间可以无限迭代；这三者与组队、分段其中之一实现单轮迭代；
###         ⑩例如：jd_cfd&jd_fruit|jd_dreamFactory@1@5&jd_pet@2@6&jd_pigPet@3@5&jd_plantBean@3@7@4&jd_jxlhb@4@80@1&jd_islogin_xh@5@4@8&jd_islogin_xh@5@4@8@15&ccwav*speed_sign@5@0@20@-@5400&iroyway*zdjr@3@5&iroyway*zdjr@4@5@4@-@-@1；
###               jd_cfd                                      脚本按正常账号顺序参加活动
###               jd_fruit|jd_dreamFactory@1@5                共用模式：1随机，抽5个CK顺序随机
###               jd_pet@2@6                                  使用模式：2优先，前6个CK顺序优先，其余CK顺序随机
###               jd_pigPet@3@5                               使用模式：3轮换，前5个CK顺序固定，根据CK总数和当月天数自动计算每天轮换CK数量
###               jd_plantBean@3@7@4                          使用模式：3轮换，前7个CK顺序固定，每天轮换4个CK
###               jd_jxlhb@4@80@1                             使用模式：4组队，队伍成员数量80，每个账号组队1次
###               jd_islogin_xh@5@4@8                         使用模式：5分段，前4个CK顺序固定，每段成员数量8，各分段依次启动脚本
###               jd_islogin_xh@5@4@8@0                       使用模式：5分段，前4个CK顺序固定，每段成员数量8，各分段并发启动脚本
###               jd_islogin_xh@5@4@8@15                      使用模式：5分段，前4个CK顺序固定，每段成员数量8，每段启动脚本的延隔时间为15秒，即本段开始启动脚本后 15 秒，下一段启动脚本。第 4 个参数表示每个分段启动活动脚本的延隔时间，单位：秒；
###               ccwav*speed_sign@5@0@20@-@5400              ccwav 的 speed_sign 脚本。使用模式：5分段，所有账号参与分段，每段成员数量20，每段启动脚本的间隔时间为 5400 秒即本段脚本执行完成后，等待 5400 秒，下一段启动脚本。当第 4 个参数使用 - 占位符时，第 5 个参数表示每个分段启动活动脚本的间隔时间，单位：秒。
###               iroyway*zdjr@3@5&iroyway*zdjr@4@5@4@-@-@1   iroyway*zdjr 脚本。使用模式：先3轮换再4组队。

## 11.2.1 局部模式环境变量的启用数量
### 释义：顾名思义；
### 赋值要求：①正整数。如果填写 3 ，表示 recombin_ck_envs1 ~ recombin_ck_envs3 生效；
recombin_ck_envs_num="7"
## 11.2.2 多组环境变量
### 释义：可以自由定义多组局部模式环境变量；
### 赋值要求：详见“局部模式环境变量”赋值要求。如果多组变量中针对同一个脚本设置了多次模式及参数变量，实现迭代组合，等同于局部模式环境变量的赋值要求 ⑨ ；
recombin_ck_envs1="jd_fruit|jd_pet|jd_plantBean|jd_dreamFactory|jd_jdfactory|jd_crazy_joy|jd_jdzz|jd_jxnc|jd_bookshop|jd_cash|jd_sgmh|jd_cfd|jd_health|jd_carnivalcity|jd_city|jd_moneyTree_heip@3@5" ## 强制轮换
recombin_ck_envs2="iroyway*zdjr@4@-@-@0@-@0"                                                                                                                                                          # 组队瓜分京豆。参数1、参数2，使用 - 占位符，表示引用 组队瓜分京豆活动变量组 的前两个参数，作为几人成队和发起几次组队
recombin_ck_envs3="jd_jxlhb|jd_88hb@4@78@1"                                                                                                                                                           # 领88元红包
recombin_ck_envs4="CheckCK|checkCookie|cookieCheck|checkCookie|bean_change|wskey&jd_islogin_xh"                                                                                                       # 强制黑名单
recombin_ck_envs5="ccwav*speed_sign|jd_speed_signfaker@5@0@20@-@1h"                                                                                                                                   # ccwav 防黑号京东极速版任务分段
recombin_ck_envs6="jd_joy_reward@5@0@10@0"                                                                                                                                                            # 宠汪汪兑换分段并发
recombin_ck_envs7="jd_jfcz@5@0@10@0"

## 11.2.3 组队瓜分京豆环境变量组
### 释义：用于自定义多组 activityId 和 activityUrl；
### 赋值要求：详见示例：
activity_env=(
  5@3@48a4106275f24bb7871e396fcf39d767@https://lzkjdz-isv.isvjcloud.com # 第 1 组环境变量。前两个参数表示 5 人成队，每个账号最多发起 3 次组队
  5@2@a64e40b100b44e2d9213712fa3fdcd67@https://cjhydz-isv.isvjcloud.com # 第 2 组环境变量。前两个参数表示 5 人成队，每个账号最多发起 2 次组队
  5@3@e56a4af7b2e940ec9270f24dd67a20d3@https://lzkjdz-isv.isvjcloud.com # 第 3 组环境变量。前两个参数表示 5 人成队，每个账号最多发起 3 次组队
  5@3@c68f8d3d24464740a5ed9dbc1e99857f@https://cjhydz-isv.isvjcloud.com # 第 4 组环境变量。前两个参数表示 5 人成队，每个账号最多发起 3 次组队
  5@3@00d5cde9d98547f4befa225c0e4bb087@https://cjhydz-isv.isvjcloud.com
  5@3@6757db2bea4748ae9168a8e5b4d050c4@https://cjhydz-isv.isvjcloud.com
  5@3@402541a7b196403c8781171a0c27967c@https://lzkjdz-isv.isvjcloud.com
  5@3@776e7e159a2b4b04bd3fc72791b50c17@https://cjhydz-isv.isvjcloud.com
  5@3@8dd125c39ede43b8882ef5b9d82b8e2d@https://lzkjdz-isv.isvjcloud.com
  teamer_num@team_num@activityId9@activityUrl9 # 第 10 组环境变量。前两个参数表示 teamer_num 人成队，每个账号最多发起 team_num 次组队
)

## 12 自定义小工具 extra2.sh 环境变量
## 12.1 定义是否自动安装或修复缺失或损坏的 node 依赖
### 赋值要求：填 1 表示启用该功能；空值或填其他内容表示不启用该功能。
FixDependType=""
## 12.2 定义是否自动安装或修复缺失或损坏的 node 依赖名称
package_name="canvas png-js date-fns axios crypto-js ts-md5 tslib @types/node dotenv got md5 requests typescript fs require jsdom download js-base64 tough-cookie tunnel ws jieba prettytable form-data json5 global-agent"
## 12.3 基础 js 依赖文件的预先下载
### 释义：目前仅支持将 ql.js、sendNotify.js、JD_DailyBonus.js、JS_USER_AGENTS.js、USER_AGENTS.js 5 个文件下载至 /ql/config 路径
### 赋值要求：填 1 表示启用该功能；空值或填其他内容表示不启用该功能。
DOWNLOAD_BASIC_JS=""
## 12.4 基础 js 依赖文件的预先替换
### 释义：目前仅支持将 /ql/config 路径下的  ql.js、sendNotify.js、JD_DailyBonus.js、JS_USER_AGENTS.js、USER_AGENTS.js 5 个文件，在 task 命令启动时会自动替换到当前运行的脚本所在的文件夹。
### 赋值要求：例如：ql|JD_DailyBonus&sendNotify@JDHelloWorld_jd_scripts|ccwav_QLScript2。各个定义单元之间采用 & 连接。
###                ql|JD_DailyBonus                                      两个脚本均不屏蔽仓库文件夹复制替换
###                sendNotify@JDHelloWorld_jd_scripts|ccwav_QLScript2    sendNotify.js 不复制到 /ql/scripts/路径下的 JDHelloWorld 和 ccwav 的仓库文件夹。文件夹名称必须精确完整写出，不支持模糊匹配。
js_deps_replace_envs="ql|JD_DailyBonus&sendNotify|JS_USER_AGENTS|USER_AGENTS@JDHelloWorld_jd_scripts"

## 13 Shell 版 Cookie 检测工具 ckck2 环境变量
## 13.1 推送失效账号、有效账号
### 赋值要求：填 1 表示只推送失效账号；
###          填 2 表示推送失效账号、有效账号；
###          空值或填其他内容表示不启用该功能。
NOTIFY_VALID_CK_TYPE=""
## 13.2 如果本次检测的失效、有效账号与上次结果一致，则不通知
### 赋值要求：填 1 表示如果失效账号未变化，则不通知。空值或填其他内容表示不启用该功能。
NOTIFY_SKIP_SAME_CONTENT=""
## 13.3 预测和通知账号剩余有效期的检测和通知类型
### 赋值要求：填 1 表示预测和通知账号剩余有效期；
###          填 2 表示只预测不通知账号剩余有效期；
###          空值或填其他内容表示不启用该功能。
NOTIFY_VALID_TIME=""
## 13.4 JD_WSCK(wskey)相关
## 13.4.1 检测到失效账号后是否搜索并运行 WSKEY 转换 Cookie 的脚本(需要 /ql/scripts 或其子路径已存在 wskey 转换脚本)
### 赋值要求：填 1 表示启用 WSKEY 转换 Cookie 功能。空值或其他值表示不启用该功能。
WSKEY_TO_CK=""
## 13.4.2 自定义调用的 wskey 转换脚本
### 赋值要求：例如 wskey_scr="hyzaw_scripts/ql_refreshCK.py"。空值或其他值表示自动搜索文件名中包含 wskey 的 py 文件。
diy_wskey_scr=""
## 13.4.3 当未搜索到 wskey 脚本时下载 wskey 转换脚本，下载路径 /ql/scripts/
### 赋值要求：填 1 表示启用下载 wskey 转换脚本功能。空值或其他值表示不启用该功能。
DOWNLOAD_WSKEY_SCR=""
## 13.4.4 下载 wskey 转换脚本的 URL 链接
### 赋值要求：空值，则默认下载 ZL143L 的脚本。非必要留空即可。也可自定义其他链接。
WSKEY_SCR_URL=""
## 13.4.5 当检索到下载路径 /ql/scripts/ 存在 wskey 转换脚本时，先行检测更新脚本后再进行 wskey 转换
### 赋值要求：填 1 表示启用功能。空值或其他值表示不启用该功能。
CHECK_UPDATE_WSKEY_SCR=""
## 13.4.6 JD_WSCK(wskey) 未录入情况的检测和通知类型
### 赋值要求：填 1 表示检测和通知 JD_WSCK(wskey) 未录入情况；
###          填 2 表示只检测不通知 JD_WSCK(wskey) 未录入情况；
###          空值或填其他内容表示不启用该功能。
NOTIFY_WSKEY_NO_EXIST=""
## 13.5 Zy143L wskey 转换脚本相关
### 13.5.1 是否禁用失效 Cookie
### 赋值要求：任意赋值表示自动禁用，空值表示不自动禁用
WSKEY_AUTO_DISABLE=""
### 13.5.2 按时间间隔更新 Cookie
### 赋值要求：正整数数字，（单位：小时）
WSKEY_UPDATE_HOUR=""
### 13.5.3 自动重试
### 赋值要求：正整数数字，（单位：次）；
###          空值表示默认值 10 次。
WSKEY_TRY_COUNT=""
## 13.6 将 JD_COOKIE 的 pt_pin 值的备注名同步 至 JD_WSCK(wskey) 的同 pin 值的备注名
### 赋值要求：填 1 表示同步；
###          空值或填其他内容表示不启用该功能。
WSKEY_REMARK_SYNC=""
## 13.7 WxPusher相关
## 说明：默认在 /ql/scripts/ 生成、更新 CK_WxPusherUid.json 文件，如果账号存在 UID ，可配合 ccwav 的 sendNotify.js 实现一对一推送
### 13.7.1 未录入 WxPusher UID 的账号。
### 赋值要求：填 1 表示检测并通知未录入 WxPusher UID 的账号；
###          填 2 表示只预测不通知未录入 WxPusher UID 的账号；
###          空值或填其他内容表示不启用该功能。
CK_WxPusherUid=""
### 13.7.2 自动补全备注中的时间戳和UID
## 说明：当 CK_WxPusherUid.json 文件，中存在账号的 UID 且面板环境变量备注中缺少时间戳或 UID 时生效
### 赋值要求：填 1 表示补全；
###          空值或填其他内容表示不启用该功能。
SCANF_WXPusher_Remarks=""
### 13.7.3 WxPusher App Token，用于一对一推送账号失效通知(同 ccwav 一对一通知环境变量，只可保留一个)。
### 格式为 AT_xxxx；查看地址：https://wxpusher.zjiecode.com/admin/main/app/appToken
#WP_APP_TOKEN_ONE=""
### 13.7.4 WxPusher 主 UID，主 UID 账号可以接收失效的第三者账号及其是否录入JD_WSCK(wskey)的信息。
### 格式为 UID_xxxx；查看地址：https://wxpusher.zjiecode.com/admin/main/wxuser/list
MainWP_UID=""
## 13.8 扩展通知
### 通知内容出现在正文末尾。支持 HTML 语言代码，仅支持 pushplus 、WxPusher 这些 HTML 代码通知的渠道
### 例如：ExNotify_Content="NoLan服务器：<a href="http://服务器地址:端口?key=HeaderKey">点击访问</a>"
ExNotify_Content=""

## 其他需要的变量，脚本中需要的变量使用 export 变量名= 声明即可

# 定义每日签到的通知形式
## js脚本每日签到提供3种通知方式，分别为：
## 关闭通知，那么请在下方填入0
## 简洁通知，那么请在下方填入1，其效果见：https://github.com/LXK9301/jd_scripts/blob/master/icon/bean_sign_simple.jpg
## 原始通知，那么请在下方填入2，如果不填也默认为2，内容比较长，这也是默认通知方式
NotifyBeanSign=""

# 定义每日签到每个接口间的延迟时间
## 默认每个签到接口并发无延迟，如需要依次进行每个接口，请自定义延迟时间，单位为毫秒，延迟作用于每个签到接口, 如填入延迟则切换顺序签到(耗时较长)
export JD_BEAN_STOP=""

# 脚本推送控制类环境变量
## 1、京东多合一签到脚本关闭运行结果推送，默认推送，填true表示不推送
export JD_BEAN_SIGN_STOP_NOTIFY=""
## 2、京东多合一签到脚本推送简单结果，默认推送完整版结果，填true表示启用简单推送
export JD_BEAN_SIGN_NOTIFY_SIMPLE="true"
## 3、东东萌宠关闭推送。填写false为不关闭推送，true为关闭推送
export PET_NOTIFY_CONTROL="false"
## 4、京东农场关闭推送。填写false为不关闭推送，true为关闭推送
export FRUIT_NOTIFY_CONTROL="false"
## 5、京东领现金关闭推送。填写false为不关闭推送，true为关闭推送
export CASH_NOTIFY_CONTROL="false"
## 6、京东摇钱树关闭推送。填写false为不关闭推送，true为关闭推送
export MONEYTREE_NOTIFY_CONTROL="true"
## 7、京东点点券关闭推送。填写false为不关闭推送，true为关闭推送
export DDQ_NOTIFY_CONTROL="false"
## 8、京东京东赚赚小程序关闭推送。填写false为不关闭推送，true为关闭推送
export JDZZ_NOTIFY_CONTROL="false"
## 9、宠汪汪兑换京豆关闭推送。填写false为不关闭推送，true为关闭推送
export JD_JOY_REWARD_NOTIFY="false"
## 10、宠汪汪赛跑获胜后是否推送通知。填false为不推送通知消息,true为推送通知消息
export JOY_RUN_NOTIFY="true"
## 11、东东超市兑换奖品是否关闭推送通知。填false为不关闭推送,true为关闭推送
export MARKET_REWARD_NOTIFY="false"
## 12、京喜财富岛控制是否运行脚本后通知。输入true为通知,不填则为不通知
export CFD_NOTIFY_CONTROL=""
## 13、京喜农场岛控制是否运行脚本后通知。0=只通知成熟;1=本次获得水滴>0;2=任务执行;3=任务执行+未种植种子
export JXNC_NOTIFY_LEVEL="3"

# 功能配置类环境变量
## 1、京东领现金红包兑换京豆开关。false为不换,true为换(花费2元红包兑换200京豆，一周可换四次)，默认为false
export CASH_EXCHANGE="false"
## 2、宠汪汪喂食数量。可以填的数字0,10,20,40,80,其他数字不可
export JOY_FEED_COUNT="80"
## 3、宠汪汪帮好友喂食。默认 "false" 不会自动给好友的汪汪喂食，如想自动喂食，请修改为 "true"
export JOY_HELP_FEED="true"
## 4、宠汪汪是否赛跑(默认参加双人赛跑)。false为不跑,true为跑
export JOY_RUN_FLAG="true"
## 5、宠汪汪参加什么级别的赛跑。可选数字为2,10,50，
## 当JOY_RUN_FLAG不设置或设置为 "true" 时生效
## 可选值：2,10,50，其他值不可以。其中2代表参加双人PK赛，10代表参加10人突围赛，50代表参加50人挑战赛，不填时默认为2
## 各个账号间请使用 & 分隔，比如：JOY_TEAM_LEVEL="2&2&50&10"
## 如果您有5个账号但只写了四个数字，那么第5个账号将默认参加2人赛，账号如果更多，与此类似
export JOY_TEAM_LEVEL="2&2&50&10"
## 6、宠汪汪赛跑自己账号内部互助。输入true为开启内部互助
export JOY_RUN_HELP_MYSELF="true"
## 7、宠汪汪积分兑换多少京豆。目前可填值为20或者500,脚本默认0,0表示不兑换京豆
export JD_JOY_REWARD_NAME="500"
## 8、东东超市兑换京豆数量。目前可输入值为20或者1000，或者其他商品的名称,例如碧浪洗衣凝珠
export MARKET_COIN_TO_BEANS="超值京豆包"
## 9、东东超市是否参加pk。true表示参加,false表示不参加
export JOIN_PK_TEAM="true"
## 10、东东超市是否用金币抽奖。true表示抽奖,false表示不抽奖
export SUPERMARKET_LOTTERY="true"
## 11、东东农场是否使用水滴换豆卡。true表示换,false表示不换
export FRUIT_BEAN_CARD="true"
## 12、是否取关商品。环境变量内容的意思依次是是否取关全部商品(0表示一个都不),是否取关全部店铺数(0表示一个都不),遇到此商品不再进行取关,遇到此店铺不再进行取关
export UN_SUBSCRIBES="300,300,,"
## 12、jd_unsubscribe这个任务是用来取关每天做任务关注的商品和店铺，默认在每次运行时取关20个商品和20个店铺
### 如果取关数量不够，可以根据情况增加，还可以设置 jdUnsubscribeStopGoods 和 jdUnsubscribeStopShop
### 商品取关数量
export goodPageSize="30"
### 店铺取关数量
export shopPageSize="60"
### 遇到此商品不再取关此商品以及它后面的商品，需去商品详情页长按拷贝商品信息
export jdUnsubscribeStopGoods=""
### 遇到此店铺不再取关此店铺以及它后面的店铺，请从头开始输入店铺名称
export jdUnsubscribeStopShop=""
## 13、疯狂的JOY循环助力开关。true表示循环助力,false表示不循环助力，默认不开启循环助力
export JDJOY_HELPSELF="true"
## 14、疯狂的JOY京豆兑换。0表示不换,其他按可兑换数填写。目前最小2000
export JDJOY_APPLYJDBEAN="2000"
## 15、疯狂的JOY购买joy等级。如需要使用请自行解除注释，可购买等级为 "1~30"
export BUY_JOY_LEVEL=""
## 16、摇钱树是否卖出金果。true卖出，false不卖出，默认false
export MONEY_TREE_SELL_FRUIT="true"
## 17、东东工厂心仪商品。
export FACTORAY_WANTPRODUCT_NAME=""
## 18、东东工厂控制哪个京东账号不运行此脚本。多个使用&连接
export JDFACTORY_FORBID_ACCOUNT=""
## 19、京喜工厂控制哪个京东账号不运行此脚本。多个使用&连接
export DREAMFACTORY_FORBID_ACCOUNT=""
## 20、lxk0301脚本是否加购。如加设置true
export PURCHASE_SHOPS="true"
## 21、京喜工厂拼团瓜分电力活动的activeId（当前需抓包替换或去群里求别人分享）
export TUAN_ACTIVEID=""
## 22、京东UA。点点券脚本运行环境变量
export JD_USER_AGENT=""

# curtinlv 环境变量
## 1、赚京豆
### 助力账号，填写pt_pin或用户名的值，如 zlzh = ['aaaa','xxxx','yyyy'] ，支持ENV
### export zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s| ||g; s|^|[|; s|$\|,$|]|}" | awk 'BEGIN{for(i=0;i<10;i++)hex[i]=i;hex["A"]=hex["a"]=10;hex["B"]=hex["b"]=11;hex["C"]=hex["c"]=12;hex["D"]=hex["d"]=13;hex["E"]=hex["e"]=14;hex["F"]=hex["f"]=15;}{gsub(/\+/," ");i=$0;while(match(i,/%../)){;if(RSTART>1);printf"%s",substr(i,1,RSTART-1);printf"%c",hex[substr(i,RSTART+1,1)]*16+hex[substr(i,RSTART+2,1)];i=substr(i,RSTART+RLENGTH);}print i;}')"  ## 支持中文用户名
export zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s| ||g; s|^|[|; s|$\|,$|]|}")"
## 2、全民抢京豆
### export qjd_zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s| ||g; s|^|[|; s|$\|,$|]|}" | awk 'BEGIN{for(i=0;i<10;i++)hex[i]=i;hex["A"]=hex["a"]=10;hex["B"]=hex["b"]=11;hex["C"]=hex["c"]=12;hex["D"]=hex["d"]=13;hex["E"]=hex["e"]=14;hex["F"]=hex["f"]=15;}{gsub(/\+/," ");i=$0;while(match(i,/%../)){;if(RSTART>1);printf"%s",substr(i,1,RSTART-1);printf"%c",hex[substr(i,RSTART+1,1)]*16+hex[substr(i,RSTART+2,1)];i=substr(i,RSTART+RLENGTH);}print i;}')"  ## 支持中文用户名
export qjd_zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s| ||g; s|^|[|; s|$\|,$|]|}")"
## 3、签到领现金助力
### export cash_zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s|^|[|; s|$\|,$|]|}" | awk 'BEGIN{for(i=0;i<10;i++)hex[i]=i;hex["A"]=hex["a"]=10;hex["B"]=hex["b"]=11;hex["C"]=hex["c"]=12;hex["D"]=hex["d"]=13;hex["E"]=hex["e"]=14;hex["F"]=hex["f"]=15;}{gsub(/\+/," ");i=$0;while(match(i,/%../)){;if(RSTART>1);printf"%s",substr(i,1,RSTART-1);printf"%c",hex[substr(i,RSTART+1,1)]*16+hex[substr(i,RSTART+2,1)];i=substr(i,RSTART+RLENGTH);}print i;}')"  ## 支持中文用户名
export cash_zlzh="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|'\1',|g; s|^|[|; s|$\|,$|]|}")"
## 4、京喜工厂开团助力 for Python
### 支持指定账号开团，跑1次脚本默认开3次团，如未指定账号默认给账号一开团。
### 变量ENV 指定开团账号。可填用户名 或 pt_pin 的值。示例：export jxgc_kaituan="用户1&用户2"
export jxgc_kaituan="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|\1|g; s| |&|g;}" | awk 'BEGIN{for(i=0;i<10;i++)hex[i]=i;hex["A"]=hex["a"]=10;hex["B"]=hex["b"]=11;hex["C"]=hex["c"]=12;hex["D"]=hex["d"]=13;hex["E"]=hex["e"]=14;hex["F"]=hex["f"]=15;}{gsub(/\+/," ");i=$0;while(match(i,/%../)){;if(RSTART>1);printf"%s",substr(i,1,RSTART-1);printf"%c",hex[substr(i,RSTART+1,1)]*16+hex[substr(i,RSTART+2,1)];i=substr(i,RSTART+RLENGTH);}print i;}')" ## 支持中文用户名
## 5、城城分现金内部助力
### 指定助力账号，默认按ck顺序助力
export ccfxj_isOrder="true"
### 助力账号pin名称
export ccfxj_help="$(echo $JD_COOKIE | perl -pe "{s|&| |g; s|\S*pt_pin=([^; ]+)(?=;?)\S*|\1|g; s| |&|g;}" | awk 'BEGIN{for(i=0;i<10;i++)hex[i]=i;hex["A"]=hex["a"]=10;hex["B"]=hex["b"]=11;hex["C"]=hex["c"]=12;hex["D"]=hex["d"]=13;hex["E"]=hex["e"]=14;hex["F"]=hex["f"]=15;}{gsub(/\+/," ");i=$0;while(match(i,/%../)){;if(RSTART>1);printf"%s",substr(i,1,RSTART-1);printf"%c",hex[substr(i,RSTART+1,1)]*16+hex[substr(i,RSTART+2,1)];i=substr(i,RSTART+RLENGTH);}print i;}')" ## 支持中文用户名
## 6、入会开卡
### int，入会送豆满足此值，否则不入会
export openCardBean="30"
### 布尔值，是否记录符合条件的shopid(默认True)
export record="true"
### 布尔值， True:仅记录，不入会(默认False)
export onlyrecord="false"
### 布尔值，开启记忆功能，接力上一次异常中断位置继续。(默认yes)
export memory="false"
### 布尔值，True：只打印部分日志 False:打印所有日志
export printlog="true"
### Float，限制速度，单位秒，如果请求过快报错适当调整0.5秒以上
export sleepNum="0.5"
### 布尔值，True:使用作者远程仓库更新的id，False：使用本地shopid.txt的id
export isRemoteSid="true"
## 6、东东超市商品兑换
### 填写商品名字，兼容模糊关键词
export coinToBeans='京豆包'
### 多账号并发，默认开启 True，关闭 False
export blueCoin_Cc='True'
### 轮次
export startMaxNum="30"
### 多线程并发，相当于每秒点击兑换次数...适当调整，手机会发烫
export dd_thread="30"
### 开始抢兑时间
export starttime="23:59:59.00000000"
### 结束时间
export endtime="00:00:30.00000000"

# smiek2221 环境变量
## 1、京东签到图形验证修改火爆问题
### 如果 read ECONNRESET 错误 可以试试
### 环境变量 JOY_HOST 修改域名 https://jdjoy.jd.com 可以改成ip https://49.7.27.236
### 如果上面ip不行就自己去ping下域名对应的ip cmd窗口输入—>ping jdjoy.jd.com 再改
### 不要频繁请求 请过个半小时 1小时在执行
export JOY_HOST=""
## 2、图形验证文件 JDJRValidator_Pure.js 验证次数
### 新增验证次数上限 默认25次 验证可能无法成功
export JDJR_validator_Count="25"
## 3、财富大陆热气球接客次数
### 新增热气球接客 默认每次运行执行10次
export gua_wealth_island_serviceNum="500"
## 4、修复点点券
### 新增显示有多少个非法请求 可以开通知
export DDQ_NOTIFY_CONTROL="" ##不填或false为通知，true为不通知
## 5、24 及之后的开卡变量
export guaopencard_All="true"
export guaopencard_addSku_All="true"
export guaopencardRun_All="true"
export guaopencard_draw="true"
export guaunknownTask_addSku_All="true"
export guaunknownTask_card_All="true"
export gua_carnivalcity_draw="true"
export guaopenwait_All="true"
export guaopencard_draw45="3"
for ((s = 0; s <= 200; s++)); do
  export guaopencard$s="3"
  export guaopencard_draw$s="3"
  export guaopencard_addSku$s="true"
done
## 6、开卡新增变量（69之后适配)
# 京豆奖励判断 | 1=邀请 2=开卡 3=关注  | 填1,2,3
export guaopencard_rewardBean="1,2,3"
## 7、城城领现金自动抽奖
export jdJxdExchange="true"
export JD_CITY_HELPSHARE="false" # false 优先内部助力 | true 优先助力池

# cdle 环境变量
## 1、签到领现金兑换
### 填写 pt_pin@金额，pt_pin为用户名，可以在 COOKIES 中提取；金额为 2 或 10，例如 LiLei@2 或 HanMeimei@10。多值用 & 连接，例如 LiLei@2&HanMeimei@10
export exchangeAccounts="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1@10/g; s/\n/\&/g;")" ##兑10元现金，比较难兑
### export exchangeAccounts="$(echo $JD_COOKIE | sed "s/&/ /g; s/\S*pt_pin=\([^;]\+\);\S*/\1@2/g; s/ /&/g;")"           ##兑2元现金
## 2、愤怒的现金
### 极速助力，打击黑产盗取现金的犯罪行为。默认向前助力9个账号，若要指定被助力账号，需cashHelpPins环境变量中填入需要助力的pt_pin，有多个请用@符号连接。
export cashHelpPins="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/\n/@/g;")"
## 3、愤怒的锦鲤
### 助力账号，填写pt_pin或用户名的值。多个 pt_pin 值用 @ 连接
export kois="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/\n/@/g;")"
## 4、发财大赢家助力
### 需要设置环境变量dyjHelpPins来指定要助力的账号
export dyjHelpPins="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/\n/@/g;")"
## 5、早起赢现金
### 入口：京东汽车-瓜分万元
### 备注：支付一元才能参与活动，填写环境变量morningScPins给指定账号打卡
export morningScPins="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/\n/@/g;")"
## 6、赚30元
### 备注：赚30元每日签到红包、天降红包助力，在earn30Pins环境变量中填入需要签到和接受助力的账号。
### 技巧：每月可以提现100元，但需要邀请一个新人下首单。可以用已注册手机号重新注册为新人账号，切换ip可以提高成功率。
export earn30Pins="$(echo $JD_COOKIE | sed "s/&/\n/g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/\n/@/g;")"
## 7、真·抢京豆
### 高速并发抢京豆，专治偷助力。设置环境变量angryBeanPins为指定账号助力，默认不助力。
### 环境变量angryBeanMode可选值priority或speed或smart，默认smart模式。
### 默认推送通知，如要屏蔽通知需将环境变量enableAngryBeanNotify的值设为false。
export angryBeanPins="$(echo $JD_COOKIE | sed "s/&/ /g; s/\S*pt_pin=\([^;]\+\);\S*/\1/g; s/ /@/g;")"
export angryBeanMode="priority"
export enableAngryBeanNotify="true"

# star261 环境变量
## 1、京喜工厂开团
### 默认第一个CK开团，例：若OPEN_DREAMFACTORY_TUAN="2,3"，则第2，第3个CK开团，其他账号参加第2，第3个CK开的团。每执行一次，会领取上一次成团的奖励和新开一次团，每天执行4次能开完3次团和领取3次团的奖励。一个账号能参团一次，一个账号一天能开三次团，请根据自己的情况设置需要开团的CK，一般至少5个CK能成团
### 助力规则：开团账号开团，其他账号自动参团。 例：有A,B,C账号，A，B账号开团，则B，C会参加A的团，A会参加B的团。账号内互助之后，开团账号若有剩下参团次数，会尝试加入作者团
### 成团条件：成团所需人数根据活动所需人数变化，一般为5-7人，若5人成团，则5个CK能成团一次，9个CK能成团两次，13个CK能成团三次
export OPEN_DREAMFACTORY_TUAN=""

# JDHelloWorld 环境变量
## 1、宠汪汪二代目
### 默认80，10、20、40、80可选
export feedNum="80"
### 默认双人跑
export JD_JOY_teamLevel="2"
## 2、新版京喜财富岛提现
### 提现金额，可选0.1 0.5 1 2 10
export CFD_CASHOUT_MONEY=10
### token，顺序、数量必须与cookie一致。抓包地址：https://m.jingxi.com/jxbfd/user/ExchangePrize
### export CFD_CASH_TOKEN='[{"strPgtimestamp":"你的值","strPhoneID":"你的值","strPgUUNum":"你的值"},{"strPgtimestamp":"你的值","strPhoneID":"你的值","strPgUUNum":"你的值"}]'
export CFD_CASH_TOKEN='[{"strPgtimestamp":"1626623544085","strPhoneID":"878e21db65d2d606","strPgUUNum":"56eaaf98f7d7a69c59e50c6bb40e79c1"}]'
## 3、宠汪汪等提示预存验证码数量不足
export validate_num="" ##你需要的数值

# Aaron-lv 环境变量
## 1、京东健康社区京豆兑换
export JD_HEALTH_REWARD_NAME="20" ##只能兑换京豆，填写纯数字20 10 5 3
## 1、京东金融签到
### 添加京东签到 金融签到body兼容，body抓包获取 不同账号不通用
### 变量名： JD_BEAN_SIGN_BODY
### 格式： 演示为两个账号，多账号以此类推
### export JD_BEAN_SIGN_BODY="{\"pin\":\"ck1的pt_pin\",\"body\":\"reqData=xxxx一大串字符\"}&{\"pin\":\"ck2的pt_pin\",\"body\":\"reqData=xxx一大串字符\"}"
export JD_BEAN_SIGN_BODY=""

# Ninja 环境变量
## 1、通知黑名单
### 使用 & 分隔，例如 东东乐园&东东萌宠
export NOTIFY_SKIP_LIST=""

# 不知名大佬环境变量
## 1、清空购物车
### 将需要跳过清理的账号(cookie中的pt_pin)放到变量CleanUsers中，多个用@隔开
export CleanUsers=""

# ccwav 环境变量
## [1] jd_bean_change.js (已添加支持一对一推送)
### 京东资产变动 + 白嫖榜 + 京东月资产变动,注意事项：如果你遇到TG Bark报错，那是因为报文过长，请使用分段通知功能.
### 1. BEANCHANGE_PERSENT  分段通知
### 例：export BEANCHANGE_PERSENT="10"总共有22个账号,结果会分成3条推送通知，1~10为第一条推送，11~20为第二条推送，剩余的为第三条推送
export BEANCHANGE_PERSENT="" ##10合1
### 2. BEANCHANGE_USERGP2 BEANCHANGE_USERGP3 BEANCHANGE_USERGP4  根据Pt_Pin的值进行分组通知
### 注意：分组通知会强制禁用BEANCHANGE_PERSENT变量!
### 分组通知的通知标题为 脚本名+"#"+分组数值
### 主要用于搭配通知脚本的分组通知使用.
### 3.BEANCHANGE_ALLNOTIFY
### 设置推送置顶公告，&表示换行，公告会出现在资产通知中(包括一对一).
### 	例子 :  export BEANCHANGE_ALLNOTIFY="你好&今天天气不错...&&哥斯拉大战金刚...."
### 	显示:
###
### 	【✨✨✨✨公告✨✨✨✨】
### 	 你好
### 	 今天天气不错...
###
### 	 哥斯拉大战金刚....
export BEANCHANGE_ALLNOTIFY='京东APP-秒杀-秒秒币 1月17过期,记得换哦.
因为加了购物车抽奖脚本，所有人早上8点半会自动清理购物车。
活动1：<a href="http://mtw.so/6dtM4K">京东会员权益</a>
活动2：<a href="https://u.jd.com/YMlLsvu">晚上12点下拉页面签到得20豆</a>
活动3：<a href="https://u.jd.com/YI7HbhU">连续签到瓜分大奖</a>
<iframe allowtransparency="true" frameborder="0" width="100%" height="auto" scrolling="yes" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=1&t=0&v=0&d=2&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=100%&h=auto&align=center"></iframe>'
### 4. BEANCHANGE_ExJxBeans
### 当设定BEANCHANGE_ExJxBeans="true"且时间在17点之后，会自动将临期京豆兑换成喜豆续命.
export BEANCHANGE_ExJxBeans="true"
### 5. BEANCHANGE_CheckJxBeans
### 当设定BEANCHANGE_CheckJxBeans="true" 将启用喜豆查询功能.
export BEANCHANGE_CheckJxBeans="true"
## [2] jd_CheckCK.js
### 京东CK检测,不正常的自动禁用，正常的如果是禁用状态则自动启用。
### 配合通知脚本CK触发使用，也可以直接task。
### 兼容jd_bean_change的BEANCHANGE_USERGP2 BEANCHANGE_USERGP3 BEANCHANGE_USERGP4变量。
### BEANCHANGE_USERGP2 BEANCHANGE_USERGP3 BEANCHANGE_USERGP4  根据Pt_Pin的值进行分组通知
### 分组通知的通知标题为 脚本名+"#"+分组数值
### 主要用于搭配通知脚本的分组通知使用.
### 2021-11-14增加CHECKCK_ALLNOTIFY设置温馨提示，&表示换行，推送时在内容末尾添加显示
### 一对一推送只有推送账户失效时才会添加.用法参考BEANCHANGE_ALLNOTIFY.
export CHECKCK_SHOWSUCCESSCK="true"   ##true表示显示正常CK；false表示不显示正常CK状态；
export CHECKCK_CKALWAYSNOTIFY="false" ##true为永远通知CK状态；false表示关闭通知CK状态
export CHECKCK_CKAUTOENABLE="false"   ##true表示自动启用CK；false表示停用自动启用CK；
export CHECKCK_CKNOWARNERROR="true"   ##true表示服务器空数据等错误不触发通知，false表示通知。

## [3] sendNotify.js
### 1. NOTIFY_SKIP_LIST 通知黑名单
### 如果通知标题在此变量里面存在(&隔开),则用屏蔽不发送通知.(PS: Ningjia 作者写的功能，继承过来)。例：export NOTIFY_SKIP_LIST="京东CK检测&京东资产变动"
export NOTIFY_SKIP_NAMETYPELIST=""
### 2. 多套通知。NOTIFY_GROUP2_LIST NOTIFY_GROUP3_LIST NOTIFY_GROUP4_LIST NOTIFY_GROUP5_LIST NOTIFY_GROUP6_LIST
### 如果通知标题在此变量里面存在(&隔开),则用第2/3/4/5/6套推送变量进行配置.
##分组2推送
## export PUSH_PLUS_TOKEN_hxtrip2=""
## export PUSH_PLUS_USER_hxtrip2=""
export PUSH_PLUS_TOKEN2=""
export PUSH_PLUS_USER2=""
export TG_BOT_TOKEN2=""
export TG_USER_ID2=""
### export NOTIFY_GROUP2_LIST="京东白嫖榜&京东月资产变动&省钱大赢家之翻翻乐&京东CK检测&京喜工厂&金融养猪"

### 3. NOTIFY_SHOWNAMETYPE 通知显示的账号类型
### 例：账号名:ccwav  别名:ccwav的别名  Remark:代码玩家
#export NOTIFY_SHOWNAMETYPE="1"    ##效果: 账号名称：代码玩家
export NOTIFY_SHOWNAMETYPE="2" ##效果: 账号名称：ccwav的别名(代码玩家)
#export NOTIFY_SHOWNAMETYPE="3"    ##不做处理，效果: 账号名称：ccwav
#export NOTIFY_SHOWNAMETYPE="4"    ##不做处理，效果: 账号名称：ccwav(代码玩家)
### 4. NOTIFY_SKIP_NAMETYPELIST
### 单独指定某些脚本不做NOTIFY_SHOWNAMETYPE变量处理。例：export NOTIFY_SKIP_NAMETYPELIST="东东农场&东东工厂"
export NOTIFY_SKIP_NAMETYPELIST=""
### 5. NOTIFY_NOREMIND
### 对 东东农场领取 东东萌宠领取 京喜工厂领取 汪汪乐园养joy领取 脚本任务更新的通知进行屏蔽,可自行删减.
### export NOTIFY_NOREMIND="京喜工厂&汪汪乐园养joy"
### 6. NOTIFY_NOCKFALSE 屏蔽ck失效通知
### 执行所有脚本时，如果有单独推送CK失效的请求也不会推送失效通知
export NOTIFY_NOCKFALSE="true"
### 7. NOTIFY_AUTHOR
### 通知底部显示：本通知 By 测试人
#export NOTIFY_AUTHOR="测试人"
### 8. NOTIFY_NOLOGINSUCCESS
### 屏蔽青龙登陆成功通知，登陆失败不屏蔽(新版貌似可以直接设定了)
export NOTIFY_NOLOGINSUCCESS="true"
### 9. NOTIFY_CUSTOMNOTIFY
### 强大的自定义通知，格式为 脚本名称&推送组别&推送类型 (推送组别总共5组)
### 推送类型: Server酱&pushplus&Bark&TG机器人&钉钉&企业微信机器人&企业微信应用消息&iGotNotify&gobotNotify
### export NOTIFY_CUSTOMNOTIFY=["京东资产变动&组1&Server酱&Bark&企业微信应用消息&TG机器人&iGotNotify","京东白嫖榜&组1&TG机器人&pushplus&iGotNotify","京东CK检测&组1&TG机器人&pushplus&iGotNotify"]
export NOTIFY_CUSTOMNOTIFY=""
### 10. NOTIFY_CKTASK
### 当接收到发送CK失效通知和Ninja 运行通知时候执行子线程任务,支持js py ts
### export NOTIFY_CKTASK="jd_CheckCK.js"
### 11. PUSH_PLUS_TOKEN_hxtrip 和 PUSH_PLUS_USER_hxtrip
### 增加pushplus.hxtrip.com的推送加接口，貌似更稳定
export PUSH_PLUS_TOKEN_hxtrip=""
export PUSH_PLUS_USER_hxtrip=""
### 12. 用 WxPusher 进行一对一推送
### 新方案：
### 填写变量 WP_APP_TOKEN_ONE,按照备注内容@@WxPusherUid的格式修改备注,例子 萌新cc@@UID_AASDADASDQWEQWDADASDADASDASDSA
### 旧方案：
### 详细教程有人写了，不知道是幸运还是不幸: https://www.kejiwanjia.com/jiaocheng/27909.html
### 填写变量 WP_APP_TOKEN_ONE,可在管理台查看: https://wxpusher.zjiecode.com/admin/main/app/appToken
### 手动建立CK_WxPusherUid.json,可以参考CKName_cache.json,只是nickName改成Uid，
### 每个用户的uid可在管理台查看: https://wxpusher.zjiecode.com/admin/main/wxuser/list
### 另外: export WP_APP_ONE_TEXTSHOWREMARK="true"，启用一对一推送标题显示备注信息，默认不启用.
export WP_APP_TOKEN_ONE=""
export WP_APP_ONE_TEXTSHOWREMARK=""
### CK_WxPusherUid.json 内容(pt_pin 如果是汉字需要填写转码后的!):
### [
###   {
### 	"pt_pin": "ccwav",
### 	"Uid": "UID_AAAAAAAA"
###   },
###   {
### 	"pt_pin": "中文名",
### 	"Uid": "BBBBBBBBBB"
###   }
### ]
### 15. NOTIFY_SKIP_TEXT
### 如果此变量(&隔开)的关键字在通知内容里面存在,则屏蔽不发送通知.
### 例子 :  export NOTIFY_SKIP_TEXT="忘了种植&异常"
### 16. NOTIFY_AUTHOR_BLANK (tcbaby提交)
### 控制不显示推送通知的底部信息
### 例子 :  export NOTIFY_AUTHOR_BLANK="随便填只要非空即可"
## [4] jd_joy_reward_Mod.js 宠汪汪积分兑换有就换版
export JOY_GET20WHEN16="true" ##控制16点才触发20京豆兑换.

# X1a0He 环境变量
## 1、简化版京东日资产变动通知
### 支持环境变量控制每次发送的账号个数，默认为2
export JD_BEAN_CHANGE_SENDNUM="10"
## 2、清空购物车
### 使用前请认真看对应注释：https://raw.githubusercontent.com/X1a0He/jd_scripts_fixed/main/jd_cart_remove.js
### 当环境变量中存在JD_CART并设置为true时才会执行删除购物车
export JD_CART="true"
### 运行一次取消多全部已关注的商品。数字0表示不取关任何商品，默认20
export JD_CART_REMOVESIZE="20"
### 是否清空，如果为false，则上面设置了多少就只删除多少条
export JD_CART_REMOVEALL="true"
### 关键词，用@分隔
export JD_CART_KEYWORDS=""
## 3、京东试用
### 由ZCY01二次修改：脚本默认不运行，由X1a0He修复：依然保持脚本默认不运行。true为运行
### 使用前请认真看对应注释：https://raw.githubusercontent.com/X1a0He/jd_scripts_fixed/main/jd_try_xh.js
export JD_TRY="true"
export JD_TRY_PRICE="0"
export JD_TRY_TABID="1@2@3@4@5@6@7@8@9@10"
export JD_TRY_TITLEFILTERS="保护套@擦杯布@打底裤@档案袋@电商@吊带@俄语@儿童@辅导@妇女@肛门@钢化膜@钢圈@宫颈@狗@和田玉@黑丝@狐臭@互动课@脚气@教程@解酒@戒烟@卷尺@课@老太太@流量卡@六级@美少女@糜烂@棉签@女纯棉@女孩@女内裤@女内衣@女性内裤@女性内衣@培训@培训@屏风底座@驱蚊@祛痘@软件@三角裤@少女@少女内衣@生殖器@手机壳@手机膜@刷头@私处@四级@四六级@童装@娃娃@玩具@网课@网络课程@网校@卫生巾@卫生条@文胸@小靓美@卸妆@胸罩@癣@洋娃娃@衣架@益智@阴道@阴道炎@英语@英语@婴儿@幼儿@鱼@孕妇@在线@在线网络@纸尿裤@中年@种子"
export JD_TRY_TRIALPRICE="0"
export JD_TRY_MINSUPPLYNUM="1"
export JD_TRY_APPLYNUMFILTER="10000"
export JD_TRY_APPLYINTERVAL="5000"
export JD_TRY_MAXLENGTH="100"
export JD_TRY_PASSZC="true"
export JD_TRY_PLOG="true"
export JD_TRY_WHITELIST="false"
export JD_TRY_WHITELISTKEYWORDS=""
## 4、批量取关店铺和商品
### 是否执行取消关注，默认true
### 使用前请认真看对应注释：https://raw.githubusercontent.com/X1a0He/jd_scripts_fixed/main/jd_unsubscribe_xh.js
export JD_UNSUB="true"
export JD_UNSEB_NOTIFY="false"
export JD_UNSUB_GPAGESIZE="20"
export JD_UNSUB_SPAGESIZE="20"
export JD_UNSUB_GKEYWORDS=""
export JD_UNSUB_SKEYWORDS=""
export JD_UNSUB_INTERVAL="3000"
export JD_UNSUB_PLOG="true"

# jiulan 环境变量
export JOYPARK_JOY_START="120" # 只做前几个CK
export JOY_COIN_MAXIMIZE="1"   # 最大化硬币收益，如果合成后全部挖土后还有空位，则开启此模式（默认关闭） 0关闭 1开启

# ddo
export JD_CITY_HELPPOOL="true"
# shufflewzc
## 1、禁用重复脚本
### 变量内容为任务关键词，各变量用 & 分隔”。
### 例：export RES_SUB="Aaron-lv_sync&smiek2121_scripts& /ql/scripts/jd_zjd.py"有三个变量
export RES_SUB="ccwav_QLScript2&shufflewzc_faker2&Aaron-lv_sync&smiek2121_scripts"
## 2、京东自动评价
### true为开启，false为关闭
export JD_Evaluation="true"

# passerby-b
## 1、滴滴橙心果园
### 变量内容为抓包token，多账号用换行或者应为逗号(,)隔开。
export DD_TOKEN=""
## 2、美团买菜果园
### 抓cookie:进果园点浇水,在抓包记录里搜water,在请求头里找属性t: thKFxxxxxxxxxxxxxxxxxxx_w,复制冒号后面的值
export MTMC_COOKIE=""
