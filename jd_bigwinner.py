# -*- coding:utf-8 -*-
"""
Python 3.9.7
作者：doubi
日期：2022年10月30日
注：脚本运行后会生成一个black.txt,之后如果出现车头pin找不到的情况下，请在black.txt搜索然后删除
注意事项 pin 为助力pin 必须保证ck在里面
作者要求 注释不能删除  否则后续不再更新
作者授权发布KR库。搬运请完整保留注释。
环境变量说明：
export dyjpin="需要助力的pin值"  

cron: 6 6 6 6 *
new Env('邀请赢大礼');
"""

""#line:7:"""
import os #line:9:import os
import re #line:10:import re
import sys #line:11:import sys
import time #line:12:import time
import uuid #line:13:import uuid
import json #line:14:import json
import random #line:15:import random
import logging #line:16:import logging
import requests #line:17:import requests
import traceback #line:18:import traceback
from hashlib import sha1 #line:19:from hashlib import sha1
from urllib .parse import quote_plus ,unquote_plus ,quote #line:20:from urllib.parse import quote_plus, unquote_plus, quote
activity_name ="京东极速版-赚钱大赢家"#line:22:activity_name = "京东极速版-赚钱大赢家"
logging .basicConfig (level =logging .INFO ,format ="%(asctime)s %(levelname)s %(lineno)d %(message)s",datefmt ="%H:%M:%S")#line:27:)
logger =logging .getLogger (activity_name )#line:28:logger = logging.getLogger(activity_name)
index =0 #line:29:index = 0
h5st_appid ='d06f1'#line:30:h5st_appid = 'd06f1'
appCode ='msc588d6d5'#line:31:appCode = 'msc588d6d5'
activeId ='63526d8f5fe613a6adb48f03'#line:32:activeId = '63526d8f5fe613a6adb48f03'
task_fn =['打扫店铺']#line:33:task_fn = ['打扫店铺']
invite_taskId =None #line:34:invite_taskId = None
need_invite =0 #line:35:need_invite = 0
not_tx =[0.3 ,1 ,3 ]#line:36:not_tx = [0.3, 1, 3]
black_user_file ='black'#line:37:black_user_file = 'black'
class Userinfo :#line:40:class Userinfo:
    cookie_obj =[]#line:41:cookie_obj = []
    index =0 #line:42:index = 0
    def __init__ (OOOO0O0OO000OO0O0 ,OO000000OO00O0OO0 ):#line:44:def __init__(self, cookie):
        global index #line:45:global index
        index +=1 #line:46:index += 1
        OOOO0O0OO000OO0O0 .user_index =index #line:47:self.user_index = index
        OOOO0O0OO000OO0O0 .cookie =OO000000OO00O0OO0 #line:48:self.cookie = cookie
        try :#line:49:try:
            OOOO0O0OO000OO0O0 .pt_pin =re .findall (r'pt_pin=(.*?);',OOOO0O0OO000OO0O0 .cookie )[0 ]#line:50:self.pt_pin = re.findall(r'pt_pin=(.*?);', self.cookie)[0]
        except Exception :#line:51:except Exception:
            logger .info (f"取值错误['pt_pin']：{traceback.format_exc()}")#line:52:logger.info(f"取值错误['pt_pin']：{traceback.format_exc()}")
            return #line:53:return
        OOOO0O0OO000OO0O0 .name =unquote_plus (OOOO0O0OO000OO0O0 .pt_pin )#line:54:self.name = unquote_plus(self.pt_pin)
        OOOO0O0OO000OO0O0 .UA ='jdltapp;iPhone;4.2.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1217;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DtCzCNvwDzc4CwG0CWY2ZWTvENVwCJS3EJDvEWDsDNHuCNU2YJqnYm%3D%3D%22%2C%22sv%22%3A%22CJSkDy42%22%2C%22iad%22%3A%22C0DOGzumHNSjDJvMCy0nCUVOBJvLEOYjG0PNGzCmHOZNEJO2%22%7D%2C%22ts%22%3A1667286187%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 12_7_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E126;supportJDSHWK/1'#line:55:self.UA = 'jdltapp;iPhone;4.2.0;;;M/5.0;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;hasOCPay/0;appBuild/1217;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DtCzCNvwDzc4CwG0CWY2ZWTvENVwCJS3EJDvEWDsDNHuCNU2YJqnYm%3D%3D%22%2C%22sv%22%3A%22CJSkDy42%22%2C%22iad%22%3A%22C0DOGzumHNSjDJvMCy0nCUVOBJvLEOYjG0PNGzCmHOZNEJO2%22%7D%2C%22ts%22%3A1667286187%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 12_7_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E126;supportJDSHWK/1'
        OOOO0O0OO000OO0O0 .account_hot =False #line:56:self.account_hot = False
        OOOO0O0OO000OO0O0 .help_status =False #line:57:self.help_status = False
        Userinfo .cookie_obj .append (OOOO0O0OO000OO0O0 )#line:58:Userinfo.cookie_obj.append(self)
        OOOO0O0OO000OO0O0 .sha =sha1 (str (OOOO0O0OO000OO0O0 .pt_pin ).encode ('utf-8')).hexdigest ()#line:59:self.sha = sha1(str(self.pt_pin).encode('utf-8')).hexdigest()
        OOOO0O0OO000OO0O0 .headers ={"Host":"wq.jd.com","Cookie":OOOO0O0OO000OO0O0 .cookie +f"sid={OOOO0O0OO000OO0O0.sha}","User-Agent":OOOO0O0OO000OO0O0 .UA ,"Referer":f"https://wqs.jd.com/sns/202210/20/make-money-shop/guest.html?activeId={activeId}&type=sign&shareId=&__navVer=1",}#line:65:}
        OOOO0O0OO000OO0O0 .shareUuid =""#line:66:self.shareUuid = ""
        OOOO0O0OO000OO0O0 .invite_success =0 #line:67:self.invite_success = 0
        OOOO0O0OO000OO0O0 .task_list =[]#line:68:self.task_list = []
        OOOO0O0OO000OO0O0 .need_help =False #line:69:self.need_help = False
    def getData (O0OOO0OOOO00000O0 ,OO00O0OO00O0OOOOO ,OO0000O0OO00O0000 ):#line:71:def getData(self, task_name, shareId):
        O000O000OO00OOOO0 =f'https://wq.jd.com/makemoneyshop/{OO00O0OO00O0OOOOO}?g_ty=h5&g_tk=&appCode={appCode}&activeId={activeId}&shareId={OO0000O0OO00O0000}&_stk=activeId,shareId&_ste=1&sceneval=2'#line:72:url = f'https://wq.jd.com/makemoneyshop/{task_name}?g_ty=h5&g_tk=&appCode={appCode}&activeId={activeId}&shareId={shareId}&_stk=activeId,shareId&_ste=1&sceneval=2'
        OOO00OOO0OO0O0OO0 =requests .get (url =O000O000OO00OOOO0 ,headers =O0OOO0OOOO00000O0 .headers ,timeout =10 ).json ()#line:73:res = requests.get(url=url, headers=self.headers, timeout=10).json()
        return OOO00OOO0OO0O0OO0 #line:74:return res
    def UserTask (O0OOO0O000OOO0O00 ):#line:76:def UserTask(self):
        O0OOOOO00O0000000 =O0OOO0O000OOO0O00 .getData ('home','')#line:77:home_res = self.getData('home', '')
        if O0OOOOO00O0000000 ['code']!=0 :#line:78:if home_res['code'] != 0:
            logger .info (f"车头账户[{O0OOO0O000OOO0O00.name}]：{O0OOOOO00O0000000['msg']}")#line:79:logger.info(f"车头账户[{self.name}]：{home_res['msg']}")
            return #line:80:return
        else :#line:81:else:
            O0OOO0O000OOO0O00 .shareUuid =O0OOOOO00O0000000 ['data']['shareId']#line:82:self.shareUuid = home_res['data']['shareId']
            logger .info (f"车头账户[{O0OOO0O000OOO0O00.name}]：已获取助力码[{O0OOO0O000OOO0O00.shareUuid}]")#line:83:logger.info(f"车头账户[{self.name}]：已获取助力码[{self.shareUuid}]")
            logger .info (f"车头账户[{O0OOO0O000OOO0O00.name}]：当前营业币约[{O0OOOOO00O0000000['data']['canUseCoinAmount']}]元")#line:84:logger.info(f"车头账户[{self.name}]：当前营业币约[{home_res['data']['canUseCoinAmount']}]元")
        O0OOO0O000OOO0O00 .GetUserTaskStatusList ()#line:85:self.GetUserTaskStatusList()
        if O0OOO0O000OOO0O00 .need_help :#line:86:if self.need_help:
            logger .info (f"当前从{Userinfo.index}继续")#line:87:logger.info(f"当前从{Userinfo.index}继续")
            for OOO0OO0000OOOOOO0 in Userinfo .cookie_obj [Userinfo .index :]:#line:88:for cookie in Userinfo.cookie_obj[Userinfo.index:]:
                if OOO0OO0000OOOOOO0 .pt_pin ==O0OOO0O000OOO0O00 .pt_pin :#line:89:if cookie.pt_pin == self.pt_pin:
                    continue #line:90:continue
                if OOO0OO0000OOOOOO0 .account_hot :#line:91:if cookie.account_hot:
                    continue #line:92:continue
                OOOO0OO0OOO00000O =OOO0OO0000OOOOOO0 .getData ('guesthelp',O0OOO0O000OOO0O00 .shareUuid )#line:93:res = cookie.getData('guesthelp', self.shareUuid)
                if OOOO0OO0OOO00000O ['code']==147 :#line:94:if res['code'] == 147:  # 火爆
                    OOO0OO0000OOOOOO0 .account_hot =True #line:95:cookie.account_hot = True
                    logger .info (f"工具人账户[{OOO0OO0000OOOOOO0.user_index}][{OOO0OO0000OOOOOO0.name}]：{OOOO0OO0OOO00000O['msg']}")#line:96:logger.info(f"工具人账户[{cookie.user_index}][{cookie.name}]：{res['msg']}")
                if OOOO0OO0OOO00000O ['code']==1007 :#line:97:if res['code'] == 1007:
                    logger .info (f"工具人账户[{OOO0OO0000OOOOOO0.user_index}][{OOO0OO0000OOOOOO0.name}]：{OOOO0OO0OOO00000O['msg']}")#line:98:logger.info(f"工具人账户[{cookie.user_index}][{cookie.name}]：{res['msg']}")
                if OOOO0OO0OOO00000O ['code']==1008 :#line:99:if res['code'] == 1008:
                    logger .info (f"工具人账户[{OOO0OO0000OOOOOO0.user_index}][{OOO0OO0000OOOOOO0.name}]：{OOOO0OO0OOO00000O['msg']}")#line:100:logger.info(f"工具人账户[{cookie.user_index}][{cookie.name}]：{res['msg']}")
                if str (OOOO0OO0OOO00000O ).find ("助力任务已完成")>-1 :#line:101:if str(res).find("助力任务已完成") > -1:
                    O0OOO0O000OOO0O00 .reward (invite_taskId )#line:102:self.reward(invite_taskId)
                if OOOO0OO0OOO00000O ['code']==0 :#line:103:if res['code'] == 0:
                    O0OOO0O000OOO0O00 .invite_success +=1 #line:105:self.invite_success += 1
                    logger .info (f"工具人账户[{OOO0OO0000OOOOOO0.user_index}][{OOO0OO0000OOOOOO0.name}]：助力成功，当前助力成功{O0OOO0O000OOO0O00.invite_success}次")#line:106:logger.info(f"工具人账户[{cookie.user_index}][{cookie.name}]：助力成功，当前助力成功{self.invite_success}次")
                if O0OOO0O000OOO0O00 .invite_success >=need_invite :#line:108:if self.invite_success >= need_invite:
                    logger .info (f"车头账户[{O0OOO0O000OOO0O00.name}]：助力已满")#line:109:logger.info(f"车头账户[{self.name}]：助力已满")
                    return O0OOO0O000OOO0O00 .exchange_query ()#line:110:return self.exchange_query()
                Userinfo .index +=1 #line:111:Userinfo.index += 1
        else :#line:114:else:
            return O0OOO0O000OOO0O00 .exchange_query ()#line:115:return self.exchange_query()
    def exchange_query (OOOO0O00O000OO0O0 ):#line:117:def exchange_query(self):
        OOO0OOO0O0O0O00O0 =f'https://wq.jd.com/makemoneyshop/exchangequery?g_ty=h5&g_tk=&appCode={appCode}&activeId={activeId}&sceneval=2'#line:118:url = f'https://wq.jd.com/makemoneyshop/exchangequery?g_ty=h5&g_tk=&appCode={appCode}&activeId={activeId}&sceneval=2'
        OOOO0OOO00000O0OO =requests .get (url =OOO0OOO0O0O0O00O0 ,headers =OOOO0O00O000OO0O0 .headers ).json ()#line:119:res = requests.get(url=url, headers=self.headers).json()
        if OOOO0OOO00000O0OO ['code']==0 :#line:120:if res['code'] == 0:
            logger .info (f"车头账户[{OOOO0O00O000OO0O0.name}]：获取微信提现信息成功")#line:121:logger.info(f"车头账户[{self.name}]：获取微信提现信息成功")
            O0O0O0OOOOOOOOOOO =float (OOOO0OOO00000O0OO ['data']['canUseCoinAmount'])#line:122:canUseCoinAmount = float(res['data']['canUseCoinAmount'])
            logger .info (f"车头账户[{OOOO0O00O000OO0O0.name}]：当前余额[{O0O0O0OOOOOOOOOOO}]元")#line:123:logger.info(f"车头账户[{self.name}]：当前余额[{canUseCoinAmount}]元")
            for OOO0O00OOOO00OO0O in OOOO0OOO00000O0OO ['data']['cashExchangeRuleList'][::-1 ]:#line:124:for data in res['data']['cashExchangeRuleList'][::-1]:
                if float (OOO0O00OOOO00OO0O ['cashoutAmount'])not in not_tx :#line:125:if float(data['cashoutAmount']) not in not_tx:
                    if O0O0O0OOOOOOOOOOO >=float (OOO0O00OOOO00OO0O ['cashoutAmount']):#line:126:if canUseCoinAmount >= float(data['cashoutAmount']):
                        logger .info (f"车头账户[{OOOO0O00O000OO0O0.name}]：当前余额[{O0O0O0OOOOOOOOOOO}]元,符合提现规则[{OOO0O00OOOO00OO0O['cashoutAmount']}]门槛")#line:127:logger.info(f"车头账户[{self.name}]：当前余额[{canUseCoinAmount}]元,符合提现规则[{data['cashoutAmount']}]门槛")
                        O00O00O00000OO000 =OOO0O00OOOO00OO0O ['id']#line:128:rule_id = data['id']
                        OOOO0O00O000OO0O0 .tx (O00O00O00000OO000 )#line:129:self.tx(rule_id)
                    else :#line:131:else:
                        logger .info (f"车头账户[{OOOO0O00O000OO0O0.name}]：当前余额[{O0O0O0OOOOOOOOOOO}]元,不足提现[{OOO0O00OOOO00OO0O['cashoutAmount']}]门槛")#line:132:logger.info(f"车头账户[{self.name}]：当前余额[{canUseCoinAmount}]元,不足提现[{data['cashoutAmount']}]门槛")
                else :#line:133:else:
                    logger .info (f"车头账户[{OOOO0O00O000OO0O0.name}]：当前余额[{O0O0O0OOOOOOOOOOO}]元,不提现[{not_tx}]门槛")#line:134:logger.info(f"车头账户[{self.name}]：当前余额[{canUseCoinAmount}]元,不提现[{not_tx}]门槛")
    def tx (OOOO0OOOO0O0OOOOO ,OO00000O0OO0O00O0 ):#line:136:def tx(self, rule_id):
        OOO0O0O00O000O00O =f'https://wq.jd.com/prmt_exchange/client/exchange?g_ty=h5&g_tk=&appCode={appCode}&bizCode=makemoneyshop&ruleId={OO00000O0OO0O00O0}&sceneval=2'#line:137:url = f'https://wq.jd.com/prmt_exchange/client/exchange?g_ty=h5&g_tk=&appCode={appCode}&bizCode=makemoneyshop&ruleId={rule_id}&sceneval=2'
        O000OO00000O0O0O0 =requests .get (url =OOO0O0O00O000O00O ,headers =OOOO0OOOO0O0OOOOO .headers ).json ()#line:138:res = requests.get(url=url, headers=self.headers).json()
        if O000OO00000O0O0O0 ['ret']==0 :#line:139:if res['ret'] == 0:
            logger .info (f"车头账户[{OOOO0OOOO0O0OOOOO.name}]：提现成功")#line:140:logger.info(f"车头账户[{self.name}]：提现成功")
            return True #line:141:return True
        if O000OO00000O0O0O0 ['ret']==232 :#line:142:if res['ret'] == 232:
            logger .info (f"车头账户[{OOOO0OOOO0O0OOOOO.name}]：{O000OO00000O0O0O0['msg']}")#line:143:logger.info(f"车头账户[{self.name}]：{res['msg']}")
            return False #line:144:return False
        if O000OO00000O0O0O0 ['ret']==604 :#line:145:if res['ret'] == 604:
            logger .info (f"车头账户[{OOOO0OOOO0O0OOOOO.name}]：{O000OO00000O0O0O0['msg']}")#line:146:logger.info(f"车头账户[{self.name}]：{res['msg']}")
            return True #line:147:return True
        else :#line:148:else:
            logger .info (f"车头账户[{OOOO0OOOO0O0OOOOO.name}]：{O000OO00000O0O0O0}")#line:149:logger.info(f"车头账户[{self.name}]：{res}")
    def GetUserTaskStatusList (O0O0O0OO0000O0OOO ):#line:151:def GetUserTaskStatusList(self):
        global invite_taskId ,need_invite #line:152:global invite_taskId, need_invite
        O00OOOO0000000O00 =f'https://wq.jd.com/newtasksys/newtasksys_front/GetUserTaskStatusList?g_ty=h5&g_tk=&appCode={appCode}&__t={getTime()}&source=makemoneyshop&bizCode=makemoneyshop&sceneval=2'#line:153:url = f'https://wq.jd.com/newtasksys/newtasksys_front/GetUserTaskStatusList?g_ty=h5&g_tk=&appCode={appCode}&__t={getTime()}&source=makemoneyshop&bizCode=makemoneyshop&sceneval=2'
        OO0000000O00000O0 =requests .get (url =O00OOOO0000000O00 ,headers =O0O0O0OO0000O0OOO .headers ,timeout =10 ).json ()#line:154:res = requests.get(url=url, headers=self.headers, timeout=10).json()
        if OO0000000O00000O0 ['ret']==0 :#line:155:if res['ret'] == 0:
            O0OO0O0O0OOO00O00 =[]#line:156:msg = []
            for OO0000O00000O0000 ,O000OOO00O000O0O0 in enumerate (OO0000000O00000O0 ['data']['userTaskStatusList'],1 ):#line:157:for taskid, task in enumerate(res['data']['userTaskStatusList'], 1):
                O000OO0OOO0O0OO00 =O000OOO00O000O0O0 ['taskName']#line:158:taskName = task['taskName']
                OOOO0000000OO0OO0 =int (O000OOO00O000O0O0 ['reward'])/100 #line:159:reward = int(task['reward']) / 100
                O0O0O000O0O0OO00O =O000OOO00O000O0O0 ['taskId']#line:160:taskId = task['taskId']
                O00OO00O0OOOO0O0O =O000OOO00O000O0O0 ['configTargetTimes']#line:161:configTargetTimes = task['configTargetTimes']
                O0OOOOO0OOO0OO00O =str (O000OOO00O000O0O0 ['gettaskStatus'])#line:162:status = str(task['gettaskStatus'])
                if O000OO0OOO0O0OO00 =='邀请好友打卡':#line:163:if taskName == '邀请好友打卡':
                    O0O0O0OO0000O0OOO .invite_success =O000OOO00O000O0O0 ['realCompletedTimes']#line:164:self.invite_success = task['realCompletedTimes']
                    if invite_taskId is None :#line:165:if invite_taskId is None:
                        invite_taskId =O000OOO00O000O0O0 ['taskId']#line:166:invite_taskId = task['taskId']
                        logger .info (f"已成功获取邀请好友打卡任务ID:{invite_taskId}")#line:167:logger.info(f"已成功获取邀请好友打卡任务ID:{invite_taskId}")
                    if need_invite ==0 :#line:168:if need_invite == 0:
                        need_invite =int (O000OOO00O000O0O0 ['configTargetTimes'])#line:169:need_invite = int(task['configTargetTimes'])
                    if O0O0O0OO0000O0OOO .invite_success <need_invite :#line:170:if self.invite_success < need_invite:
                        O0O0O0OO0000O0OOO .need_help =True #line:171:self.need_help = True
                        logger .info (f"最高可邀请[{need_invite}]人,目前已邀请[{O0O0O0OO0000O0OOO.invite_success}]人,还需邀请[{int(need_invite) - int(O0O0O0OO0000O0OOO.invite_success)}]人")#line:173:f"最高可邀请[{need_invite}]人,目前已邀请[{self.invite_success}]人,还需邀请[{int(need_invite) - int(self.invite_success)}]人")
                    else :#line:174:else:
                        logger .info (f"最高可邀请[{need_invite}]人,目前已邀请[{O0O0O0OO0000O0OOO.invite_success}]人,助力已满，换号")#line:175:logger.info(f"最高可邀请[{need_invite}]人,目前已邀请[{self.invite_success}]人,助力已满，换号")
                O0O0O0OO0000O0OOO .task_list .append ({"status":O0OOOOO0OOO0OO00O ,"taskName":O000OO0OOO0O0OO00 ,"taskId":O0O0O000O0O0OO00O ,"configTargetTimes":O00OO00O0OOOO0O0O })#line:184:)
                O0OO0O0O0OOO00O00 .append (f"{OO0000O00000O0000} : {O000OO0OOO0O0OO00} -- {OOOO0000000OO0OO0}个营业币 -- {O0OOOOO0OOO0OO00O.replace('1', '未完成').replace('2', '已完成')}")#line:186:f"{taskid} : {taskName} -- {reward}个营业币 -- {status.replace('1', '未完成').replace('2', '已完成')}")
            print ('\n'.join (O0OO0O0O0OOO00O00 ))#line:188:print('\n'.join(msg))
            O0O0O0OO0000O0OOO .do_task ()#line:189:self.do_task()
    def reward (O00O0OOO000OO0000 ,OOOO0OO0OO0000OOO ):#line:191:def reward(self, taskId):
        OO0OOO0OO0O000OOO =f'https://wq.jd.com/newtasksys/newtasksys_front/Award?g_ty=h5&g_tk=&appCode={appCode}&__t={getTime()}&source=makemoneyshop&taskId={OOOO0OO0OO0000OOO}&bizCode=makemoneyshop&sceneval=2'#line:192:url = f'https://wq.jd.com/newtasksys/newtasksys_front/Award?g_ty=h5&g_tk=&appCode={appCode}&__t={getTime()}&source=makemoneyshop&taskId={taskId}&bizCode=makemoneyshop&sceneval=2'
        O00O0OOO000OO0000 .headers ['Referer']=f'https://wqs.jd.com/sns/202210/20/make-money-shop/index.html?activeId={activeId}&lng=118.389971&lat=24.974751&sid={O00O0OOO000OO0000.sha}&un_area=16_1341_1343_44855'#line:194:'Referer'] = f'https://wqs.jd.com/sns/202210/20/make-money-shop/index.html?activeId={activeId}&lng=118.389971&lat=24.974751&sid={self.sha}&un_area=16_1341_1343_44855'
        O00OOO0O000O0OO00 =requests .get (url =OO0OOO0OO0O000OOO ,headers =O00O0OOO000OO0000 .headers ,timeout =10 ).json ()#line:195:res = requests.get(url=url, headers=self.headers, timeout=10).json()
        if O00OOO0O000O0OO00 ['ret']==0 :#line:196:if res['ret'] == 0:
            logger .info (f"车头账户[{O00O0OOO000OO0000.name}]：领取成功")#line:197:logger.info(f"车头账户[{self.name}]：领取成功")
        else :#line:198:else:
            logger .info (f"车头账户[{O00O0OOO000OO0000.name}]：{O00OOO0O000O0OO00['msg']}")#line:199:logger.info(f"车头账户[{self.name}]：{res['msg']}")
    def do_task (O0O0OO000O0O00O0O ):#line:201:def do_task(self):
        for O00000OOOO0O0000O in O0O0OO000O0O00O0O .task_list :#line:202:for task in self.task_list:
            if O00000OOOO0O0000O ['taskName']in task_fn and O00000OOOO0O0000O ['status']!="2":#line:203:if task['taskName'] in task_fn and task['status'] != "2":
                logger .info (f"车头账户[{O0O0OO000O0O00O0O.name}]：去做[{O00000OOOO0O0000O['taskName']}]")#line:204:logger.info(f"车头账户[{self.name}]：去做[{task['taskName']}]")
                O0O0OO000O0O00O0O .reward (O00000OOOO0O0000O ['taskId'])#line:205:self.reward(task['taskId'])
def getTime ():#line:208:def getTime():
    return int (time .time ()*1000 )#line:209:return int(time.time() * 1000)
def black_user ():#line:212:def black_user():
    if os .path .exists (f'{black_user_file}.txt'):#line:213:if os.path.exists(f'{black_user_file}.txt'):
        with open (f'{black_user_file}.txt','r')as OO0O0OOO0OO0OOOOO :#line:214:with open(f'{black_user_file}.txt', 'r') as f:
            return OO0O0OOO0OO0OOOOO .read ().split ('&')#line:215:return f.read().split('&')
    else :#line:216:else:
        with open (f'{black_user_file}.txt','a'):#line:217:with open(f'{black_user_file}.txt', 'a'):
            logger .info (f"文件:{black_user_file}不存在，创建")#line:218:logger.info(f"文件:{black_user_file}不存在，创建")
        return []#line:219:return []
def del_black (OOOO0OOOOO0OOOO0O ):#line:222:def del_black(pin):
    OOO00OOOO00OO0OO0 =Userinfo .cookie_obj .copy ()#line:223:cookie_copy = Userinfo.cookie_obj.copy()
    for O0O00000OOO0O0000 in OOO00OOOO00OO0OO0 :#line:224:for cookie in cookie_copy:
        if OOOO0OOOOO0OOOO0O in O0O00000OOO0O0000 .pt_pin and OOOO0OOOOO0OOOO0O !='':#line:225:if pin in cookie.pt_pin and pin != '':
            Userinfo .cookie_obj .remove (O0O00000OOO0O0000 )#line:226:Userinfo.cookie_obj.remove(cookie)
def main ():#line:229:def main():
    try :#line:230:try:
        OOO0O0000O0OO0O00 =os .environ ['JD_COOKIE'].split ('&')#line:231:cookies = os.environ['JD_COOKIE'].split('&')
    except :#line:232:except:
        with open (os .path .join (os .path .dirname (__file__ ),'cklist.txt'),'r')as OO00OOO0OOOOOO0O0 :#line:233:with open(os.path.join(os.path.dirname(__file__), 'cklist.txt'), 'r') as f:
            OOO0O0000O0OO0O00 =OO00OOO0OOOOOO0O0 .read ().split ('\n')#line:234:cookies = f.read().split('\n')
    OO00O00OOOO0000OO =os .environ .get ('dyjpin',"")#line:235:helpPin = os.environ.get('dyjpin', "")
    if OO00O00OOOO0000OO =="":#line:236:if helpPin == "":
        logger .info ("您尚未填写'dyjpin'-- pin1&pin2&pin")#line:237:logger.info("您尚未填写'dyjpin'-- pin1&pin2&pin")
        sys .exit ()#line:238:sys.exit()
    try :#line:239:try:
        OO00O00OOOO0000OO =OO00O00OOOO0000OO .split ('&')#line:240:helpPin = helpPin.split('&')
    except :#line:241:except:
        logger .info ("dyjpin填写格式错误，pin1&pin2&pin3")#line:242:logger.info("dyjpin填写格式错误，pin1&pin2&pin3")
        sys .exit ()#line:243:sys.exit()
    [Userinfo (O00OOOO0O0O00OO0O )for O00OOOO0O0O00OO0O in OOO0O0000O0OO0O00 ]#line:244:[Userinfo(cookie) for cookie in cookies]
    O0OOO0000O0OOOOO0 =black_user ()#line:245:black = black_user()
    if O0OOO0000O0OOOOO0 :#line:246:if black:
        del O0OOO0000O0OOOOO0 [-1 ]#line:247:del black[-1]
        for OOO00O0OO0OOO0O00 in O0OOO0000O0OOOOO0 :#line:248:for pin in black:
            del_black (OOO00O0OO0OOO0O00 )#line:249:del_black(pin)
    logger .info (f"共去除{len(O0OOO0000O0OOOOO0)}个黑名单pin")#line:250:logger.info(f"共去除{len(black)}个黑名单pin")
    logger .info (f"当前剩余[{len(Userinfo.cookie_obj)}]个cookie可助力")#line:251:logger.info(f"当前剩余[{len(Userinfo.cookie_obj)}]个cookie可助力")
    OO00OO00OO0OOOO0O =([OOO000OOO0O000OO0 for OOO000OOO0O000OO0 in Userinfo .cookie_obj for OO0O0O0O000OOOO0O in OO00O00OOOO0000OO if OO0O0O0O000OOOO0O in OOO000OOO0O000OO0 .pt_pin ])#line:253:[cookie_obj for cookie_obj in Userinfo.cookie_obj for name in helpPin if name in cookie_obj.pt_pin])
    if not OO00OO00OO0OOOO0O :#line:254:if not inviterList:
        logger .info (f"没有找到车头:{OO00O00OOOO0000OO}")#line:255:logger.info(f"没有找到车头:{helpPin}")
        sys .exit ()#line:256:sys.exit()
    logger .info (f"共找到[{len(OO00OO00OO0OOOO0O)}]车头")#line:257:logger.info(f"共找到[{len(inviterList)}]车头")
    for O0000000O0OO00OOO in OO00OO00OO0OOOO0O :#line:258:for inviter in inviterList:
        logger .info (f"开启助力车头：{O0000000O0OO00OOO.pt_pin}")#line:259:logger.info(f"开启助力车头：{inviter.pt_pin}")
        O0000000O0OO00OOO .UserTask ()#line:260:inviter.UserTask()
    time .sleep (round (random .uniform (0.7 ,1.3 ),2 ))#line:261:time.sleep(round(random.uniform(0.7, 1.3), 2))
    for OOOOOOOOO0OOO00OO in Userinfo .cookie_obj :#line:262:for cookie in Userinfo.cookie_obj:
        if OOOOOOOOO0OOO00OO .account_hot :#line:263:if cookie.account_hot:
            if OOOOOOOOO0OOO00OO .pt_pin in str (O0OOO0000O0OOOOO0 ):#line:264:if cookie.pt_pin in str(black):
                continue #line:265:continue
            if OOOOOOOOO0OOO00OO .pt_pin in OO00O00OOOO0000OO :#line:266:if cookie.pt_pin in helpPin:
                continue #line:267:continue
            with open (f'{black_user_file}.txt','a')as OOOO00OO000O0OO0O :#line:268:with open(f'{black_user_file}.txt', 'a') as w:
                OOOO00OO000O0OO0O .write (OOOOOOOOO0OOO00OO .pt_pin +'&')#line:269:w.write(cookie.pt_pin + '&')
if __name__ =='__main__':#line:272:if __name__ == '__main__':
    main ()#line:273:main()
