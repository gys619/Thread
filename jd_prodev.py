"""
# 邀好友赢大礼 create by doubi 通用模板 
# 17:/椋东送福利，邀请好友，争排行榜排位，大礼送不停，(E1Y7RAtC4b) ，升级新版猄·=·Dσσōngαpρ
# https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=16dde1860f1b4f1b9a93db6612abf0b9&invitePin=pin值
# 注意事项 pin 为助力pin 必须保证ck在里面
# 作者要求 注释不能删除  否则后续不再更新
# 作者授权发布KR库。搬运请完整保留注释。

环境变量说明：
export yhypin="需要助力的pin值"  
export yhyauthorCode="活动ID"

cron: 6 6 6 6 *
new Env('邀请赢大礼');
"""

""#line:15
import json #line:17
import sys #line:18
import urllib #line:19
import requests #line:20
import time #line:21
import re #line:22
import os #line:23
from urllib .parse import quote_plus ,unquote_plus #line:24
import logging #line:25
import asyncio #line:26
logging .basicConfig (level =logging .INFO ,format ="%(asctime)s %(levelname)s %(lineno)d %(message)s",datefmt ="%H:%M:%S")#line:31
logger =logging .getLogger ('prodev邀请好友赢大礼通用模板')#line:33
CK_FILE ='cklist.txt'#line:35
NUM_TYR =1 #line:36
UNSUCC =0 #line:37
Appid ='jdchoujiang_h5'#line:38
appid ='9c0f9'#line:39
venderId =int #line:40
inviterList =[]#line:41
activityId =''#line:42
activityUrl =f'https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code={activityId}'#line:43
globalExitFlag =False #line:44
index =0 #line:45
cks =[]#line:46
def get_time ():#line:49
    return int (time .time ()*1000 )#line:50
class Userinfo :#line:53
    userIdx =0 #line:54
    def __init__ (OOOO00O0000O00O0O ,O000OO0OOO00OO0O0 ):#line:56
        try :#line:57
            Userinfo .userIdx +=1 #line:58
            OOOO00O0000O00O0O .userIdx =Userinfo .userIdx #line:59
            OOOO00O0000O00O0O .cookie =O000OO0OOO00OO0O0 #line:60
            OOOO00O0000O00O0O .pt_pin =(str (re .findall (r'(pt_pin=([^; ]+)(?=;?))',OOOO00O0000O00O0O .cookie )[0 ][1 ]))#line:61
            OOOO00O0000O00O0O .name =unquote_plus (OOOO00O0000O00O0O .pt_pin )#line:62
            OOOO00O0000O00O0O .UA ='jdapp;iPhone;10.1.4;${this.iosVer};${this.uuid};network/wifi;model/iPhone${this.iphone},1;addressid/${this.addressid};' 'appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ${this.iosVer_} like Mac OS X) AppleWebKit/605.1.15 ' '(KHTML, like Gecko) Mobile/null;supportJDSHWK/1'#line:65
            OOOO00O0000O00O0O .successCount =0 #line:66
            OOOO00O0000O00O0O .loggin =True #line:67
            OOOO00O0000O00O0O .needHelp =False #line:68
            OOOO00O0000O00O0O .black =False #line:69
            OOOO00O0000O00O0O .stageReward =[]#line:70
            OOOO00O0000O00O0O .needInviteNum =0 #line:71
        except :#line:73
            logger .info (f'京东账户[{OOOO00O0000O00O0O.userIdx}]无效,请检查')#line:74
    def getActivityPage (OOOO0OO0O00O000OO ):#line:76
        global globalExitFlag ,Now_Time ,venderId #line:77
        O0OO0O0O00O000OO0 =getUrl ('memberBringActPage',{"code":activityId ,"invitePin":OOOO0OO0O00O000OO .pt_pin ,"_t":get_time ()},OOOO0OO0O00O000OO .pt_pin )#line:81
        OOOO0OO0O0O0O000O =postUrl (O0OO0O0O00O000OO0 ,OOOO0OO0O00O000OO .cookie ,OOOO0OO0O00O000OO .UA ,'get')#line:82
        O00OO0O0O00O0OO0O =json .loads (OOOO0OO0O0O0O000O )#line:83
        if O00OO0O0O00O0OO0O ['success']:#line:84
            OOOOOOOO00OOOO00O =O00OO0O0O00O0OO0O .get ('data').get ('shopId')#line:85
            O0O000O000OOOO00O =O00OO0O0O00O0OO0O .get ('data').get ('shopName')#line:86
            venderId =O00OO0O0O00O0OO0O .get ('data').get ('venderId')#line:87
            Now_Time =get_time ()#line:88
            OO00OOOO00OOOO0O0 =O00OO0O0O00O0OO0O .get ('data').get ('beginTime')/1000 #line:89
            O0OOOOO0000000OO0 =O00OO0O0O00O0OO0O .get ('data').get ('endTime')/1000 #line:90
            O00OO00000O0OOOO0 =O00OO0O0O00O0OO0O .get ('data').get ('inviteFloor')#line:91
            OOOO0OO0O00O000OO .successCount =O00OO0O0O00O0OO0O .get ('data').get ('successCount')#line:92
            logger .info (f'京东账户{OOOO0OO0O00O000OO.userIdx}[{OOOO0OO0O00O000OO.name}]:已邀请{OOOO0OO0O00O000OO.successCount}人')#line:93
            logger .info (f'活动:{O00OO00000O0OOOO0}')#line:94
            logger .info (f'开始时间:{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(OO00OOOO00OOOO0O0))}')#line:95
            logger .info (f'结束时间:{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(O0OOOOO0000000OO0))}')#line:96
            logger .info (f'店铺:{O0O000O000OOOO00O}')#line:97
            logger .info (f'shopid:{OOOOOOOO00OOOO00O}')#line:98
            logger .info (f'venderId:{venderId}')#line:99
            logger .info (f'已邀请{OOOO0OO0O00O000OO.successCount}人')#line:100
            logger .info (f'奖品:')#line:101
            for OO00OOO0000OOOO0O in O00OO0O0O00O0OO0O .get ('data').get ('rewards'):#line:102
                if OO00OOO0000OOOO0O ['rewardStock']>1 :#line:103
                    if OO00OOO0000OOOO0O ["inviteNum"]>OOOO0OO0O00O000OO .successCount :#line:104
                        OOOO0OO0O00O000OO .needHelp =True #line:105
                    OOOO0OO0O00O000OO .needInviteNum =OO00OOO0000OOOO0O ['inviteNum']#line:106
                    OOOO0OO0O00O000OO .stageReward .append ({'stage':OO00OOO0000OOOO0O ['stage'],'inviteNum':OO00OOO0000OOOO0O ['inviteNum'],'rewardName':OO00OOO0000OOOO0O ['rewardName'],'rewardStatus':OO00OOO0000OOOO0O ['rewardStatus'],'rewardStock':OO00OOO0000OOOO0O ['rewardStock']})#line:113
                O00O000O0OOOO0O00 ='未达标'#line:114
                if OO00OOO0000OOOO0O ['rewardStatus']==2 :#line:115
                    O00O000O0OOOO0O00 ='待领取'#line:116
                if OO00OOO0000OOOO0O ['rewardStatus']==3 :#line:117
                    O00O000O0OOOO0O00 ='已领取'#line:118
                if OO00OOO0000OOOO0O ['rewardStatus']==4 :#line:119
                    O00O000O0OOOO0O00 ='已发完'#line:120
                O0O00000OO0000O00 =OO00OOO0000OOOO0O ['stage']#line:121
                OO0000OO000O0OO0O =OO00OOO0000OOOO0O ['rewardStock']#line:122
                O0O0OO00OOOOOO0OO =OO00OOO0000OOOO0O ['rewardName']#line:123
                logger .info (f'-- [{O0O00000OO0000O00}] 需[{OO00OOO0000OOOO0O["inviteNum"]}]已{OOOO0OO0O00O000OO.successCount}人：{O0O0OO00OOOOOO0OO}，剩余{OO0000OO000O0OO0O}份，{O00O000O0OOOO0O00}')#line:125
            if Now_Time >=O00OO0O0O00O0OO0O .get ('data').get ('endTime'):#line:126
                logger .info ('活动结束了别玩了哈')#line:127
                globalExitFlag =True #line:128
            if Now_Time <O00OO0O0O00O0OO0O .get ('data').get ('beginTime'):#line:129
                logger .info ('活动还没开始，别着急')#line:130
                globalExitFlag =True #line:131
        else :#line:132
            logger .info (f'账户{OOOO0OO0O00O000OO.userIdx}{OOOO0OO0O00O000OO.name}:进入活动失败')#line:133
    def firstInvite (OOOOO00O0O00OO000 ,tyess =0 ):#line:135
        O0OO0000O0000OOOO =getUrl ('memberBringFirstInvite',{"code":activityId ,"fp":"92c2eaecd929167b42f5f873769f5921","eid":"EJKJDGG4CM4CMPC4S27BYKCN2IXTSLPCXTM2CUSGB2BQTXMLLM7IXOUJAZHCEJQ44SFMGGMTBROUO4BG473S5SNVJE"},OOOOO00O0O00OO000 .pt_pin )#line:138
        O0000OO00O0O0OO00 =postUrl (O0OO0000O0000OOOO ,OOOOO00O0O00OO000 .cookie ,OOOOO00O0O00OO000 .UA ,'get')#line:139
        OO0O00000000O0OOO =json .loads (O0000OO00O0O0OO00 )#line:140
        if OO0O00000000O0OOO ['success']:#line:141
            logger .info (f'{OOOOO00O0O00OO000.name}:开启邀请成功')#line:142
        else :#line:143
            logger .info (f'{OOOOO00O0O00OO000.name}:开启失败'+OO0O00000000O0OOO ['errorMessage'])#line:144
            if tyess >=NUM_TYR :#line:145
                OOOOO00O0O00OO000 .black =True #line:146
                return #line:147
            logger .info (f'{OOOOO00O0O00OO000.name}:等待2秒')#line:148
            time .sleep (2 )#line:149
            O0O00OO000OOO0OO0 =tyess +1 #line:150
            logger .info (f"重试第{O0O00OO000OOO0OO0}次")#line:151
            OOOOO00O0O00OO000 .firstInvite (O0O00OO000OOO0OO0 )#line:152
    def getInviteReward (OO000OO0OO000OOOO ,OOOO0O00O0O00OOOO ,ttry =0 ):#line:154
        global addressIdx ,inviterList #line:155
        OOOO0OO0O0000OO0O =getUrl ('memberBringInviteReward',{"code":activityId ,"stage":OOOO0O00O0O00OOOO ["stage"]},OO000OO0OO000OOOO .pt_pin )#line:158
        OOO0O000000OO000O =postUrl (OOOO0OO0O0000OO0O +f"&code={activityId}&stage={OOOO0O00O0O00OOOO['stage']}",OO000OO0OO000OOOO .cookie ,OO000OO0OO000OOOO .UA ,'get')#line:159
        O0O0OOOO0OO0000OO =json .loads (OOO0O000000OO000O )#line:160
        if O0O0OOOO0OO0000OO ['success']:#line:161
            OOOO0O00O0O00OOOO ['rewardStatus']=3 #line:162
            logger .info (f'京东账户{OO000OO0OO000OOOO.userIdx}[{OO000OO0OO000OOOO.name}]:领取阶段{OOOO0O00O0O00OOOO["stage"]}，奖励{OOOO0O00O0O00OOOO["rewardName"]}成功')#line:164
            return #line:165
        if '操作过于频繁'in str (O0O0OOOO0OO0000OO ['errorMessage']):#line:166
            logger .info (f'京东账户{OO000OO0OO000OOOO.userIdx}[{OO000OO0OO000OOOO.name}]:领取阶段{OOOO0O00O0O00OOOO["stage"]}，奖励{OOOO0O00O0O00OOOO["rewardName"]}失败'+O0O0OOOO0OO0000OO ['errorMessage'])#line:170
            logger .info ("等待5秒")#line:171
            time .sleep (5 )#line:172
            OO000OO0OO000OOOO .getInviteReward (OOOO0O00O0O00OOOO ,ttry +1 )#line:173
        if "交易失败"in O0O0OOOO0OO0000OO ['errorMessage']:#line:174
            logger .info ("实物不自动领取请自行前往查看")#line:175
        else :#line:176
            logger .info (f'京东账户{OO000OO0OO000OOOO.userIdx}[{OO000OO0OO000OOOO.name}]:领取阶段{OOOO0O00O0O00OOOO["stage"]}，奖励{OOOO0O00O0O00OOOO["rewardName"]}失败'+O0O0OOOO0OO0000OO ['errorMessage'])#line:180
            OOOO0O00O0O00OOOO ['rewardStatus']=3 #line:181
    def getShopOpenCardInfo (O00O00O0OO00O00O0 ):#line:183
        global UNSUCC ,cks #line:184
        O0O00OOOO000OO00O ={"venderId":venderId ,"channel":"401"}#line:185
        OO00OO00O00OO0OO0 =f'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body={quote_plus(json.dumps(O0O00OOOO000OO00O))}&client=H5&clientVersion=9.2.0&uuid=88888'#line:186
        OOOO00O00O0OO00O0 ={'Host':'api.m.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':O00O00O0OO00O00O0 .cookie ,'User-Agent':O00O00O0OO00O00O0 .UA ,'Accept-Language':'zh-cn','Referer':f'https://shopmember.m.jd.com/shopcard/?venderId={venderId}&channel=801&returnUrl={json.dumps(activityUrl)}','Accept-Encoding':'gzip, deflate'}#line:196
        O00OOO00O0OO0O0OO =requests .get (url =OO00OO00O00OO0OO0 ,headers =OOOO00O00O0OO00O0 ,timeout =5 )#line:197
        try :#line:198
            if O00OOO00O0OO0O0OO .status_code ==200 :#line:199
                O00OOO00O0OO0O0OO =O00OOO00O0OO0O0OO .json ()#line:200
                if O00OOO00O0OO0O0OO ['success']:#line:201
                    logger .info (f'京东账户{O00O00O0OO00O00O0.userIdx}[{O00O00O0OO00O00O0.name}]店铺入会状态:'+str (O00OOO00O0OO0O0OO .get ("result").get ("userInfo").get ("openCardStatus")).replace ("0",'未入会').replace ("1",'已入会'))#line:204
                    if O00OOO00O0OO0O0OO .get ("result").get ("userInfo").get ("openCardStatus")==0 :#line:205
                        Userinfo .joinMember (O00O00O0OO00O00O0 ,O00O00O0OO00O00O0 )#line:206
                    else :#line:207
                        pass #line:208
                else :#line:209
                    if '火爆'in O00OOO00O0OO0O0OO ['message']:#line:210
                        logger .info (f'京东账户{O00O00O0OO00O00O0.userIdx}[{O00O00O0OO00O00O0.name}]店铺入会状态:火爆')#line:211
                    if UNSUCC <NUM_TYR :#line:212
                        logger .info (f'京东账户{O00O00O0OO00O00O0.userIdx}[{O00O00O0OO00O00O0.name}]检查入会状态失败,重试第{UNSUCC + 1}次'+O00OOO00O0OO0O0OO ['message'])#line:213
                        UNSUCC +=1 #line:214
                        time .sleep (1 )#line:215
                        O00O00O0OO00O00O0 .getShopOpenCardInfo ()#line:216
                    else :#line:217
                        logger .info (f'京东账户{O00O00O0OO00O00O0.userIdx}[{O00O00O0OO00O00O0.name}]检查入会状态失败,result:'+O00OOO00O0OO0O0OO ['message'])#line:218
        except Exception as O0O0OOO0OO000OOOO :#line:220
            print (O0O0OOO0OO000OOOO )#line:221
    def joinMember (O00O0O0O00000O00O ,OO000O00OOOO0000O ,retry =0 ):#line:223
        global UNSUCC #line:224
        OOO0OOOOO0OO0OOO0 =getUrl ('memberBringJoinMember',{"code":activityId ,"invitePin":OO000O00OOOO0000O .pt_pin },OO000O00OOOO0000O .pt_pin )#line:227
        O00OOO000O00OOOO0 =postUrl (OOO0OOOOO0OO0OOO0 ,O00O0O0O00000O00O .cookie ,O00O0O0O00000O00O .UA ,'get')#line:228
        OOO0OO0OO00OOOO00 =json .loads (O00OOO000O00OOOO0 )#line:229
        try :#line:230
            if OOO0OO0OO00OOOO00 ['success']:#line:231
                if OO000O00OOOO0000O .pt_pin !=O00O0O0O00000O00O .pt_pin :#line:232
                    OO000O00OOOO0000O .successCount +=1 #line:233
                logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]入会成功!,已助力{OO000O00OOOO0000O.name}')#line:234
            else :#line:236
                if '交易失败'in OOO0OO0OO00OOOO00 ['errorMessage']:#line:237
                    if OO000O00OOOO0000O .pt_pin !=O00O0O0O00000O00O .pt_pin :#line:238
                        OO000O00OOOO0000O .successCount +=1 #line:239
                    logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]入会成功!,已助力{OO000O00OOOO0000O.name}')#line:240
                elif 'already'in OOO0OO0OO00OOOO00 ['errorMessage']:#line:242
                    logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]已是会员')#line:243
                elif '火爆'in OOO0OO0OO00OOOO00 ['errorMessage']:#line:245
                    logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]:'+OOO0OO0OO00OOOO00 ['errorMessage'])#line:246
                if UNSUCC <NUM_TYR :#line:248
                    logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]入会失败,重试第{UNSUCC}次'+OOO0OO0OO00OOOO00 ['errorMessage'])#line:249
                    UNSUCC +=1 #line:250
                    time .sleep (0.1 )#line:251
                    Userinfo .joinMember (O00O0O0O00000O00O ,OO000O00OOOO0000O )#line:252
                else :#line:253
                    logger .info (f'京东账户{O00O0O0O00000O00O.userIdx}[{O00O0O0O00000O00O.name}]入会失败')#line:254
        except Exception as O0OO0O000O00OO00O :#line:256
            logger .error (O0OO0O000O00OO00O )#line:257
    async def userInviteTask (OO000OO00OO0OO0O0 ):#line:259
        global globalExitFlag ,cks ,index #line:260
        logger .info (f'京东账户{OO000OO00OO0OO0O0.userIdx}[{OO000OO00OO0OO0O0.name}]开始邀请 --------')#line:261
        globalExitFlag =False #line:262
        OO000OO00OO0OO0O0 .getActivityPage ()#line:263
        if globalExitFlag :#line:264
            return #line:265
        OO000OO00OO0OO0O0 .getShopOpenCardInfo ()#line:266
        if not globalExitFlag :#line:267
            OO000OO00OO0OO0O0 .firstInvite ()#line:268
            if OO000OO00OO0OO0O0 .black :#line:269
                logger .info (OO000OO00OO0OO0O0 .name +'黑号不助力了')#line:270
                return #line:271
        for OO0000000O0000000 in OO000OO00OO0OO0O0 .stageReward :#line:273
            if OO0000000O0000000 ['rewardStatus']<=2 and OO000OO00OO0OO0O0 .successCount >=OO0000000O0000000 ['inviteNum']:#line:274
                OO000OO00OO0OO0O0 .getInviteReward (OO0000000O0000000 )#line:275
        if OO000OO00OO0OO0O0 .needHelp :#line:277
            for OO0OO0O0OO0O0000O in cks :#line:278
                index =cks .index (OO0OO0O0OO0O0000O )#line:279
                OO00O000OO0OOO00O =Userinfo (OO0OO0O0OO0O0000O )#line:280
                OO00O000OO0OOO00O .joinMember (OO000OO00OO0OO0O0 )#line:281
                for OO0000000O0000000 in OO000OO00OO0OO0O0 .stageReward :#line:282
                    if OO0000000O0000000 ['rewardStatus']<=2 and OO000OO00OO0OO0O0 .successCount >=OO0000000O0000000 ['inviteNum']:#line:283
                        OO000OO00OO0OO0O0 .getInviteReward (OO0000000O0000000 )#line:284
                if OO000OO00OO0OO0O0 .successCount >=OO000OO00OO0OO0O0 .needInviteNum :#line:285
                    return #line:286
                time .sleep (3 )#line:287
            globalExitFlag =True #line:288
        else :#line:290
            logger .info (f'京东账户{OO000OO00OO0OO0O0.userIdx}[{OO000OO00OO0OO0O0.name}]助力已满，无需助力')#line:291
def postUrl (O0O0OO0O0O0O000OO ,OO00O000OO00OOOOO ,O0O0000O0O0000000 ,O00000000OOO0O0OO ,body =''):#line:294
    O000O00OO0OOO0OO0 ={'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-CN,zh-Hans;q=0.9','Connection':'keep-alive','Cookie':OO00O000OO00OOOOO ,'Host':'api.m.jd.com','Referer':'https://prodev.m.jd.com/','User-Agent':O0O0000O0O0000000 }#line:304
    if O00000000OOO0O0OO =='get':#line:305
        OO0OO00O0OOOOOOO0 =requests .get (url =O0O0OO0O0O0O000OO ,headers =O000O00OO0OOO0OO0 )#line:306
        return OO0OO00O0OOOOOOO0 .text #line:307
    if O00000000OOO0O0OO =='post':#line:308
        O000O00OO0OOO0OO0 ["Content-Type"]="application/json"#line:309
        OO0OO00O0OOOOOOO0 =requests .post (url =O0O0OO0O0O0O000OO ,headers =O000O00OO0OOO0OO0 ,data =body )#line:310
        return OO0OO00O0OOOOOOO0 .text #line:311
def getUrl (O0OO0O000O0OO00O0 ,OO0O0OOOO000OOO00 ,O00OOO0000OOOOO00 ):#line:314
    O0OOO0OO000OO00O0 =f'https://api.m.jd.com/api?client=&clientVersion=&appid={Appid}&t={get_time()}&functionId={O0OO0O000O0OO00O0}&'#line:315
    OOO00OO0OO00000OO =O0OOO0OO000OO00O0 +'body='+json .dumps (OO0O0OOOO000OOO00 )+f'&openid=-1&code={activityId}&invitePin={O00OOO0000OOOOO00}'#line:316
    return OOO00OO0OO00000OO #line:317
if __name__ =='__main__':#line:320
    async def main ():#line:321
        global cks ,inviterList ,activityId #line:322
        try :#line:323
            cks =os .environ ['JD_COOKIE'].split ('&')#line:324
        except :#line:325
            try :#line:326
                with open (os .path .join (os .path .dirname (__file__ ),'cklist.txt'),'r')as O00O0O0OO0O0OOOOO :#line:327
                    cks =O00O0O0OO0O0OOOOO .read ().split ('\n')#line:328
            except FileNotFoundError :#line:329
                logger .info ('没有找到该路径下的ck:'+os .path .join (os .path .dirname (__file__ ),'cklist.txt'))#line:330
                sys .exit ()#line:331
        O0O0O0O0OOO0OOOOO =os .environ .get ('yhypin',"")#line:332
        if O0O0O0O0OOO0OOOOO =="":#line:333
            logger .info ('没有填写yhypin：export yhypin="pt_pin"')#line:334
            sys .exit ()#line:335
        O0O0O0O0OOO0OOOOO =O0O0O0O0OOO0OOOOO .split (',')#line:336
        set (O0O0O0O0OOO0OOOOO )#line:337
        activityId =os .environ .get ('yhyauthorCode',"")#line:338
        if activityId =="":#line:339
            logger .info ('没有填写yhyauthorCode：export yhyauthorCode="xxxx"')#line:340
            sys .exit ()#line:341
        try :#line:342
            activityId =activityId .split ('code=')[1 ].split ('&')[0 ]#line:343
        except :#line:344
            pass #line:345
        OO00OO0OOO00O00O0 =f'https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code={activityId}'#line:346
        logger .info (f'活动链接:{OO00OO0OOO00O00O0}')#line:347
        inviterList =[OOOO0O0O000000OO0 for OOOO0O0O000000OO0 in cks for O0O0O00OO0O0O0OOO in O0O0O0O0OOO0OOOOO if O0O0O00OO0O0O0OOO in OOOO0O0O000000OO0 ]#line:348
        logger .info (f'一共找到{len(inviterList)}个车头pin')#line:349
        if len (inviterList )==0 :#line:350
            sys .exit ()#line:351
        for O0OO0OOOO00OO0OOO in inviterList :#line:352
            OO00O0OOO000000O0 =Userinfo (O0OO0OOOO00OO0OOO )#line:353
            await OO00O0OOO000000O0 .userInviteTask ()#line:354
            if globalExitFlag :#line:355
                break #line:356
    loop =asyncio .get_event_loop ()#line:358
    loop .run_until_complete (main ())#line:359
