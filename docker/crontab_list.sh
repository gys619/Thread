# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############活动##############
0 0 * * * node /scripts/jd_angryBean.js >> /scripts/logs/jd_angryBean.log 2>&1
#真·抢京豆
20 06-22 * * * node /scripts/jd_aid_fortune.js >> /scripts/logs/jd_aid_fortune.log 2>&1 
#财富岛助力
44 0-23/6 * * * node /scripts/jd_aid_factory.js >> /scripts/logs/jd_aid_factory.log 2>&1
#京喜工厂助力
5 0 * * * node /scripts/jd_angryKoi.js >> /scripts/logs/jd_angryKoi.log 2>&1
#愤怒的锦鲤
1 81218 * * * node /scripts/jd_bookshop.js >> /scripts/logs/jd_bookshop.log 2>&1
#口袋书店
59 23 * * * node /scripts/jd_blueCoin.py >> /scripts/logs/jd_blueCoin.log 2>&1
#东东超市商品兑换
59 23 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
#东东超市兑换奖品
#20 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
#省钱大赢家之翻翻乐
20 12 * * * node /scripts/jd_beauty_ex.js >> /scripts/logs/jd_beauty_ex.log 2>&1
#美丽研究院--兑换
26 8 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#美丽研究院
26 8 * * * node /scripts/jd_bean_info.js >> /scripts/logs/jd_bean_info.log 2>&1
#京豆详情统计
0 0 * * * node /scripts/jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
#京东多合一签到
30 1022 * * * node /scripts/jd_bean_change_new.js >> /scripts/logs/jd_bean_change_new.log 2>&1
#京东资产变动通知
23 11222 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
#领京豆额外奖励
30 21 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
#京东资产变动
0 03 * * * node /scripts/jd_babel_sign.js >> /scripts/logs/jd_babel_sign.log 2>&1
#通天塔共建
50 * * * * node /scripts/jd_cfd_hb.js >> /scripts/logs/jd_cfd_hb.log 2>&1
#财富岛兑换红包
50 820 * * * node /scripts/jd_ckck2.sh >> /scripts/logs/jd_ckck2.log 2>&1
#ck检测
10 10 * * * node /scripts/jd_china-joy_card.py >> /scripts/logs/jd_china-joy_card.log 2>&1
#萌虎摇摇乐卡片信息
15 36 * * * node /scripts/jd_connoisseur.js >> /scripts/logs/jd_connoisseur.log 2>&1
#内容鉴赏官
5 023 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
#摇京豆
59 0-23/1 * * * node /scripts/jd_cfd_pearl_ex.js >> /scripts/logs/jd_cfd_pearl_ex.log 2>&1
#财富岛珍珠兑换
59 0-23/2 * * * node /scripts/jd_cfd_pearl.js >> /scripts/logs/jd_cfd_pearl.log 2>&1
#京喜财富岛合成珍珠饼
26 8 * * * node /scripts/jd_cfd_mooncake_help.js >> /scripts/logs/jd_cfd_mooncake_help.log 2>&1
#京喜财富岛合成珍珠互助
5 * * * * node /scripts/jd_cfd_mooncake.js >> /scripts/logs/jd_cfd_mooncake.log 2>&1
#京喜财富岛合成月饼
30 0-23/3 * * * node /scripts/jd_cfd_loop.js >> /scripts/logs/jd_cfd_loop.log 2>&1
#京喜财富岛热气球
45 * * * * node /scripts/jd_cfd_fresh.js >> /scripts/logs/jd_cfd_fresh.log 2>&1
#京喜财富岛合成生鲜
0 0 * * * node /scripts/jd_cash_exchange.js >> /scripts/logs/jd_cash_exchange.log 2>&1
#领现金兑换红包
2 0-23/4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
#签到领现金
050 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
#京东汽车兑换
10 7 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
#京东汽车
15 0 * * * node /scripts/jd_ccSign.js >> /scripts/logs/jd_ccSign.log 2>&1
#领券中心签到
0 0 * * * node /scripts/jd_CkSeq.js >> /scripts/logs/jd_CkSeq.log 2>&1
#CK顺序调试工具
30 * * * * node /scripts/jd_CheckCK.js >> /scripts/logs/jd_CheckCK.log 2>&1
#京东CK检测
1 * * * * node /scripts/jd_cfd.js >> /scripts/logs/jd_cfd.log 2>&1
#京喜财富岛
#26 8 * * * node /scripts/jd_dreamFactory_product.js >> /scripts/logs/jd_dreamFactory_product.log 2>&1
#京喜工厂可生产
4045 23 * * * node /scripts/jd_duobao.js >> /scripts/logs/jd_duobao.log 2>&1
#M京豆夺宝
1 0 * * * node /scripts/jd_dreamFactory_tuan.js >> /scripts/logs/jd_dreamFactory_tuan.log 2>&1
#京喜工厂开团
5 618 * * * node /scripts/jd_dreamFactory_help.js >> /scripts/logs/jd_dreamFactory_help.log 2>&1
#京喜工厂招工互助
10 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
#京喜工厂
28 19 */3 * * node /scripts/jd_delete_coupon.js >> /scripts/logs/jd_delete_coupon.log 2>&1
#M优惠券删除
0 0 */3 * * node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#删除优惠券
0 0 * * * node /scripts/jd_ddworld_exchange.js >> /scripts/logs/jd_ddworld_exchange.log 2>&1
#东东世界兑换
38 517 * * * node /scripts/jd_ddnc_farmpark.js >> /scripts/logs/jd_ddnc_farmpark.log 2>&1
#东东乐园
21 21519 * * * node /scripts/jd_daily_lottery.js >> /scripts/logs/jd_daily_lottery.log 2>&1
#小鸽有礼-每日抽奖
10 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
#天天提鹅
33 719 * * * node /scripts/jd_dwapp.js >> /scripts/logs/jd_dwapp.log 2>&1
#积分换花费
15 6 * * * node /scripts/jd_DrawEntrance.js >> /scripts/logs/jd_DrawEntrance.log 2>&1
#天天优惠大乐透
15 09 * * * node /scripts/jd_DailyBonus_Mod.js >> /scripts/logs/jd_DailyBonus_Mod.log 2>&1
#多合一签到脚本
0 0 * * * node /scripts/jd_dpqd.js >> /scripts/logs/jd_dpqd.log 2>&1
#店铺签到
0 0-23/2 * * * node /scripts/jd_EsportsManager.js >> /scripts/logs/jd_EsportsManager.log 2>&1
#东东电竞经理
33 9 * * * node /scripts/jd_exchangejxbeans.js >> /scripts/logs/jd_exchangejxbeans.log 2>&1
#京豆兑换为喜豆
0 6 */3 * * node /scripts/jd_Evaluation.py >> /scripts/logs/jd_Evaluation.log 2>&1
#京东全自动评价
10 517 * * * node /scripts/jd_fruit_friend.js >> /scripts/logs/jd_fruit_friend.log 2>&1
#东东农场好友删减奖励
18 17 * * * node /scripts/jd_fan.js >> /scripts/logs/jd_fan.log 2>&1
#粉丝互动
26 8 * * * node /scripts/jd_foodRunning.js >> /scripts/logs/jd_foodRunning.log 2>&1
#零食街
26 8 * * * node /scripts/jd_fanli.js >> /scripts/logs/jd_fanli.log 2>&1
#M饭粒任务
5 0-23/2 * * * node /scripts/jd_fcwb.js >> /scripts/logs/jd_fcwb.log 2>&1
#发财挖宝
1 1223 * * * node /scripts/jd_family.js >> /scripts/logs/jd_family.log 2>&1
#京东家庭号
26 8 * * * node /scripts/jd_festival.js >> /scripts/logs/jd_festival.log 2>&1
#点鞭炮赢京豆
5 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
#东东农场
13 122 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
#金榜创造营
0 9 * * * node /scripts/jd_getFollowGift.py >> /scripts/logs/jd_getFollowGift.log 2>&1
#关注有礼
30 6 * * * node /scripts/jd_goodMorning.js >> /scripts/logs/jd_goodMorning.log 2>&1
#早起福利
13 7 * * * node /scripts/jd_gold_sign.js >> /scripts/logs/jd_gold_sign.log 2>&1
#京东金榜
26 8 * * * node /scripts/jd_hbCount.py >> /scripts/logs/jd_hbCount.log 2>&1
#历史红包统计
5 414 * * * node /scripts/jd_health_help.js >> /scripts/logs/jd_health_help.log 2>&1
#东东健康社区内部互助
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
#东东健康社区收集能量
13 0622 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#东东健康社区
30 16-23/1 * * * node /scripts/jd_half_redrain.js >> /scripts/logs/jd_half_redrain.log 2>&1
#半点京豆雨
0 * */30 * * node /scripts/jd_identical.py >> /scripts/logs/jd_identical.log 2>&1
#禁用重复任务
0 0 * * * node /scripts/jd_kanjia.js >> /scripts/logs/jd_kanjia.log 2>&1
#砍价免费拿
10 0 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
#京东快递签到
36 8 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
#京东抽奖机&内部互助
#10 7 * * * node /scripts/jd_lxLottery.js >> /scripts/logs/jd_lxLottery.log 2>&1
#京东我的理想家
10 0 * * * node /scripts/jd_lottery_drew.js >> /scripts/logs/jd_lottery_drew.log 2>&1
#京东赚京豆一分钱抽奖
030 0-23/1 * * * node /scripts/jd_live_redrain.js >> /scripts/logs/jd_live_redrain.log 2>&1
#超级直播间红包雨
50 12-14 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#京东直播
30 06-23 * * * node /scripts/jd_moneyTree_help.js >> /scripts/logs/jd_moneyTree_help.log 2>&1
#京东摇钱树助力
0 01-23/3 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1
#5G超级盲盒
26 8 * * * node /scripts/jd_mpdzcar_help.js >> /scripts/logs/jd_mpdzcar_help.log 2>&1
#头文字J助力
26 8 * * * node /scripts/jd_mpdzcar_game.js >> /scripts/logs/jd_mpdzcar_game.log 2>&1
#头文字J游戏
10 8 * * * node /scripts/jd_mpdzcar.js >> /scripts/logs/jd_mpdzcar.log 2>&1
#头文字J
30 7 * * * node /scripts/jd_morningSc.js >> /scripts/logs/jd_morningSc.log 2>&1
#早起赢现金
3 0-23/2 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
#京东摇钱树
5 019 * * * node /scripts/jd_mohe_help.js >> /scripts/logs/jd_mohe_help.log 2>&1
#5G盲盒内部互助
31 8 * * * node /scripts/jd_mofang_ex.js >> /scripts/logs/jd_mofang_ex.log 2>&1
#京东小魔方--收集兑换
26 8 * * * node /scripts/jd_mhtask.js >> /scripts/logs/jd_mhtask.log 2>&1
#盲盒任务抽京豆
4 10 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
#幸运大转盘
0 0 * * * node /scripts/jd_mall_active.js >> /scripts/logs/jd_mall_active.log 2>&1
#逛京东会场
0 0 * * * node /scripts/jd_mall.js >> /scripts/logs/jd_mall.log 2>&1
#逛会场任务
3 0 * * * node /scripts/jd_m_sign.js >> /scripts/logs/jd_m_sign.log 2>&1
#京东通天塔--签到
30 8 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#秒秒币
30 8 * * * node /scripts/jd_mhyyl_sendCard.js >> /scripts/logs/jd_mhyyl_sendCard.log 2>&1
#萌虎摇摇乐送卡
20 419 * * * node /scripts/jd_mofang.js >> /scripts/logs/jd_mofang.log 2>&1
#京东小魔方
26 8 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1
#女装盲盒抽京豆
26 815 * * * node /scripts/jd_openCard.py >> /scripts/logs/jd_openCard.log 2>&1
#开卡有礼
26 815 * * * node /scripts/jd_joyjd_open.js >> /scripts/logs/jd_joyjd_open.log 2>&1
#通用ID任务
12 0-23/6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
#金融养猪
41 11 7142128 * * node /scripts/jd_priceProtect_Mod.js >> /scripts/logs/jd_priceProtect_Mod.log 2>&1
#京东价保一对一推送版
40 417 * * * node /scripts/jd_plantBean_help.js >> /scripts/logs/jd_plantBean_help.log 2>&1
#种豆得豆内部互助
40 23 * * * node /scripts/jd_price.js >> /scripts/logs/jd_price.log 2>&1
#京东保价
1 7-21/2 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
#京东种豆得豆
15 6-18/6 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
#东东萌宠
1 0-23/2 * * * node /scripts/jd_qqxing.js >> /scripts/logs/jd_qqxing.log 2>&1
#QQ星系牧场
0 012 * * * node /scripts/jd_refreshInvokeKey.js >> /scripts/logs/jd_refreshInvokeKey.log 2>&1
#宠汪汪invokeKey刷新
30 2122 * * * node /scripts/jd_redrain_half.js >> /scripts/logs/jd_redrain_half.log 2>&1
#半点京豆雨
1 1223 * * * node /scripts/jd_redPacket_help.js >> /scripts/logs/jd_redPacket_help.log 2>&1
#京东全民开红包助力-纯助力
1 8 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
#京东排行榜
0 * * * * node /scripts/jd_redrain.js >> /scripts/logs/jd_redrain.log 2>&1
#整点京豆雨
11 * * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
#东东超市
20 022 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1
#京东极速版红包
10 7 * * * node /scripts/jd_sxLottery.js >> /scripts/logs/jd_sxLottery.log 2>&1
#京东生鲜每日抽奖
4 2322 * * * node /scripts/jd_superbox.js >> /scripts/logs/jd_superbox.log 2>&1
#京东超级盒子
1 1820 * * * node /scripts/jd_super_mh.js >> /scripts/logs/jd_super_mh.log 2>&1
#超级直播间盲盒抽京豆
20 08 * * * node /scripts/jd_speed_sign_Part5.js >> /scripts/logs/jd_speed_sign_Part5.log 2>&1
#京东极速版任务5
20 08 * * * node /scripts/jd_speed_sign_Part4.js >> /scripts/logs/jd_speed_sign_Part4.log 2>&1
#京东极速版任务4
20 08 * * * node /scripts/jd_speed_sign_Part3.js >> /scripts/logs/jd_speed_sign_Part3.log 2>&1
#京东极速版任务3
20 08 * * * node /scripts/jd_speed_sign_Part2.js >> /scripts/logs/jd_speed_sign_Part2.log 2>&1
#京东极速版任务2
20 08 * * * node /scripts/jd_speed_sign_Part1.js >> /scripts/logs/jd_speed_sign_Part1.log 2>&1
#京东极速版任务1
0 17 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
#京东极速版
0 17 * * * node /scripts/jd_speed.js >> /scripts/logs/jd_speed.log 2>&1
#天天加速
16 22 * * * node /scripts/jd_small_home.js >> /scripts/logs/jd_small_home.log 2>&1
#东东小窝
10 8 * * * node /scripts/jd_sign_graphics1.js >> /scripts/logs/jd_sign_graphics1.log 2>&1
#京东签到翻牌
10 10 * * * node /scripts/jd_sign_graphics.js >> /scripts/logs/jd_sign_graphics.log 2>&1
#京东签到图形验证
10 10 * * * node /scripts/jd_signFree.js >> /scripts/logs/jd_signFree.log 2>&1
#极速免费签到
48 922 * * * node /scripts/jd_sign.js >> /scripts/logs/jd_sign.log 2>&1
#M京东签到
0 0 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
#店铺签到
10 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
#进店领豆
0 0 * * * node /scripts/jd_sevenDay.js >> /scripts/logs/jd_sevenDay.log 2>&1
#超级无线店铺签到
26 8 * * * node /scripts/jd_sendBeans.js >> /scripts/logs/jd_sendBeans.log 2>&1
#送豆得豆
10 0723 * * * node /scripts/jd_syj.js >> /scripts/logs/jd_syj.log 2>&1
#赚京豆
10 8 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
#闪购盲盒
#0 018 * * * node /scripts/jd_tiger_help.js >> /scripts/logs/jd_tiger_help.log 2>&1
#萌虎摇摇乐助力
26 8 * * * node /scripts/jd_tw.js >> /scripts/logs/jd_tw.log 2>&1
#特务Z
26 20 * * * node /scripts/jd_try_notify.py >> /scripts/logs/jd_try_notify.log 2>&1
#京东试用成功通知
26 8 * * * node /scripts/jd_try.js >> /scripts/logs/jd_try.log 2>&1
#京东试用
26 8 * * * node /scripts/jd_upgrade.js >> /scripts/logs/jd_upgrade.log 2>&1
#升级赚京豆
#26 20 * * * node /scripts/jd_userAwardExpandinfo.py >> /scripts/logs/jd_userAwardExpandinfo.log 2>&1
#京东膨胀红包通知
26 8 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
#批量取关店铺和商品
26 22 * * * node /scripts/jd_unsubscriLive.js >> /scripts/logs/jd_unsubscriLive.log 2>&1
#取关所有主播
26 22 */7 * * node /scripts/jd_unbind.js >> /scripts/logs/jd_unbind.log 2>&1
#注销京东会员卡
0 8 * * * node /scripts/jd_wyw.js >> /scripts/logs/jd_wyw.log 2>&1
#玩一玩成就
30 8 * * * node /scripts/jd_wxShopFollowActivity.js >> /scripts/logs/jd_wxShopFollowActivity.log 2>&1
#关注店铺抽奖
30 8 * * * node /scripts/jd_wxCollectionActivity.js >> /scripts/logs/jd_wxCollectionActivity.log 2>&1
#加购物车抽奖
58 71523 * * * node /scripts/jd_work_validate.js >> /scripts/logs/jd_work_validate.log 2>&1
#京东验证码获取
5 0-23/6 * * * node /scripts/jd_wsdlb.js >> /scripts/logs/jd_wsdlb.log 2>&1
#柠檬我是大老板农场
40 02 * * * node /scripts/jd_wish.js >> /scripts/logs/jd_wish.log 2>&1
#众筹许愿池
26 22 * * 2 node /scripts/jd_week.js >> /scripts/logs/jd_week.log 2>&1
#生活特权～免费领京豆
26 8 * * * node /scripts/jd_wxgame.js >> /scripts/logs/jd_wxgame.log 2>&1
#通用游戏任务
0 0 * * * node /scripts/jd_xmf_exchange.js >> /scripts/logs/jd_xmf_exchange.log 2>&1
#5魔方兑换
38 518 * * * node /scripts/jd_ylyn.js >> /scripts/logs/jd_ylyn.log 2>&1
#伊利养牛记
28 19 * * * node /scripts/jd_yfcoupon.js >> /scripts/logs/jd_yfcoupon.log 2>&1
#M运费券提醒
28 8 * * * node /scripts/jd_year.js >> /scripts/logs/jd_year.log 2>&1
#京东超市年货日历
0 10 * * * node /scripts/jd_yqyl.js >> /scripts/logs/jd_yqyl.log 2>&1
#柠檬邀请有礼
26 10 * * * node /scripts/jd_zjb_help.js >> /scripts/logs/jd_zjb_help.log 2>&1
#赚金币邀请
26 11 * * * node /scripts/jd_zdjr.js >> /scripts/logs/jd_zdjr.log 2>&1
#赚京豆组队
0 5 * * * node /scripts/jd_zjb.js >> /scripts/logs/jd_zjb.log 2>&1
#赚金币
0-59/8 1,2,3 5-7 2 * node /scripts/ jd_freshgoods.js >> /scripts/logs/ jd_freshgoods.js.log 2>&1
#春节游戏互动