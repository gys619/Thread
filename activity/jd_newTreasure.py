# 发现新宝藏
# 入口>   京东>12.0:/￥J5iAk3pzZUJgE4%，复制口令进入京东APP给我助力，一起瓜分1亿京豆！
# 脚本功能为 完成全部任务，内部互助，抽奖
# 已完成的任务会显示火爆，当然也可能你是黑号...
# 环境变量JD_COOKIE，多账号用&分割
# export JD_COOKIE="第1个cookie&第2个cookie"
# 11/1 12:40 增加ck格式兼容
"""
const $ = new Env("发现新宝藏");
cron 46 3,20 * * * jd_newTreasure.py
"""

import os,json,random,time,re,string
import asyncio
import sys
sys.path.append('../../tmp')
try:
    import requests
except Exception as e:
    print(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")
requests.packages.urllib3.disable_warnings()
try:
    import aiohttp
except Exception as e:
    print(str(e) + "\n缺少aiohttp模块, 请执行命令：pip3 install aiohttp\n")


JD_API_HOST = 'https://api.m.jd.com'
run_send='no'     # yes或no, yes则启用通知推送服务


# 获取pin
cookie_match=re.compile(r'pt_key=(.+);pt_pin=(.+);')
cookie_match2=re.compile(r'pt_pin=(.+);pt_key=(.+);')
def get_pin(cookie):
    try:
        return cookie_match.match(cookie).group(2)
    except:
        try:
            return cookie_match2.match(cookie).group(1)
        except:
            print('ck格式不正确，请检测')


# 随机ua
def ua():
    sys.path.append(os.path.abspath('.'))
    try:
        from jdEnv import USER_AGENTS as a
    except:
        a='jdpingou;android;5.5.0;11;network/wifi;model/M2102K1C;appBuild/18299;partner/lcjx11;session/110;pap/JA2019_3111789;brand/Xiaomi;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.159 Mobile Safari/537.36'
    return a

# 13位时间戳
def gettimestamp():
    return str(int(time.time() * 1000))

## 获取cooie
class Judge_env(object):
    def main_run(self):
        if '/jd' in os.path.abspath(os.path.dirname(__file__)):
            cookie_list=self.v4_cookie()
        else:
            cookie_list=os.environ["JD_COOKIE"].split('&')       # 获取cookie_list的合集
        if len(cookie_list)<1:
            msg('请填写环境变量JD_COOKIE\n')    
        return cookie_list

    def v4_cookie(self):
        a=[]
        b=re.compile(r'Cookie'+'.*?=\"(.*?)\"', re.I)
        with open('/jd/config/config.sh', 'r') as f:
            for line in f.readlines():
                try:
                    regular=b.match(line).group(1)
                    a.append(regular)
                except:
                    pass
        return a
cookie_list=Judge_env().main_run()

# 检查账号有效性
def getUserInfo(cookie):
    try:
        pin=get_pin(cookie)
    except:
        msg('有一个cookie 格式出错\n')
        return
    time.sleep(0.2)
    url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback='
    headers = {
        'Cookie': cookie,
        'Accept': '*/*',
        'Connection': 'close',
        'Referer': 'https://home.m.jd.com/myJd/home.action',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'me-api.jd.com',
        'User-Agent': ua(),
        'Accept-Language': 'zh-cn'
    }
    try:
        resp = requests.get(url=url, headers=headers, timeout=60).json()
        if resp['retcode'] == "0":
            nickname = resp['data']['userInfo']['baseInfo']['nickname']  # 账号名
            return True
        else:
            msg(f"账号 {pin} Cookie 已失效！请重新获取。\n")
    except Exception:
        msg(f"账号 {pin} Cookie 已失效！请重新获取。\n")
    return


## 获取通知服务
class Msg(object):
    def getsendNotify(self, a=1):
        try:
            url = 'https://ghproxy.com/https://raw.githubusercontent.com/wuye999/myScripts/main/sendNotify.py'
            response = requests.get(url,timeout=3)
            with open('sendNotify.py', "w+", encoding="utf-8") as f:
                f.write(response.text)
            return
        except:
            pass
        if a < 5:
            a += 1
            return self.getsendNotify(a)

    def main(self,n=1):
        global send,msg,initialize
        sys.path.append(os.path.abspath('.'))
        for n in range(3):
            try:
                from sendNotify import send,msg,initialize
                break
            except:
                self.getsendNotify()
        l=['BARK','PUSH_KEY','TG_BOT_TOKEN','TG_USER_ID','TG_API_HOST','TG_PROXY_HOST','TG_PROXY_PORT','DD_BOT_TOKEN','DD_BOT_SECRET','QQ_SKEY','Q_SKEY','QQ_MODE','QYWX_AM','PUSH_PLUS_TOKEN']
        d={}
        for a in l:
            try:
                d[a]=eval(a)
            except:
                d[a]=''
        try:
            initialize(d)
        except:
            self.getsendNotify()
            if n < 5:
                n += 1
                return self.main(n)
            else:
                print('获取通知服务失败，请检查网络连接...')
Msg().main()   # 初始化通知服务  


async def taskPostUrl(functionId, body, cookie, resp=True):
    url=f'{JD_API_HOST}/{functionId}?appid=contenth5_common&functionId={functionId}&body=[{json.dumps(body)}]'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    if resp:
        for n in range(3):
            try:
                async with session.get(url,headers=headers) as res:
                    res=await res.json(encoding="utf-8")
                return res
            except:
                if n==3:
                    msg('API请求失败，请检查网路重试❗\n')  
    else:
        return url,data,headers


async def taskPostUrl_2(functionId, body, cookie, resp=True):
    url=f'{JD_API_HOST}/{functionId}?appid=contenth5_common&functionId={functionId}&body={json.dumps(body)}'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    if resp:
        for n in range(3):
            try:
                async with session.get(url,headers=headers) as res:
                    res=await res.json(encoding="utf-8")
                return res
            except:
                if n==3:
                    msg('API请求失败，请检查网路重试❗\n')  
    else:
        return url,data,headers


async def taskPostUrl_3(functionId, body, cookie, resp=True):
    url=f'{JD_API_HOST}/{functionId}?appid=contenth5_common&functionId={functionId}&body=[{json.dumps(body)}]&client=wh5'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    if resp:
        for n in range(3):
            try:
                async with session.get(url,headers=headers) as res:
                    res=await res.json(encoding="utf-8")
                return res
            except:
                if n==3:
                    msg('API请求失败，请检查网路重试❗\n')  
    else:
        return url,data,headers

async def taskPostUrl_4(functionId, body, cookie, resp=True):
    url=f'{JD_API_HOST}/{functionId}?appid=contenth5_common&functionId={functionId}&body={json.dumps(body)}&client=wh5'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    if resp:
        for n in range(3):
            try:
                async with session.get(url,headers=headers) as res:
                    res=await res.json(encoding="utf-8")
                return res
            except:
                if n==3:
                    msg('API请求失败，请检查网路重试❗\n')  
    else:
        return url,data,headers

async def taskPostUrl_5(functionId, body, cookie, resp=True):
    url=f'{JD_API_HOST}/{functionId}?appid=contenth5_common&functionId={functionId}&body={json.dumps(body)}&client=wh5'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    if resp:
        for n in range(3):
            try:
                async with session.post(url,headers=headers) as res:
                    res=await res.json(encoding="utf-8")
                return res
            except:
                if n==3:
                    msg('API请求失败，请检查网路重试❗\n')  
    else:
        return url,data,headers

# 获取活动信息
async def task_assignment(cookie,assignmentId,projectId,advGrpId1,advGrpId2):
    a=[]
    a.append(f"获取活动信息🔎...")
    body={"type":"12","projectId":projectId,"assignmentId":assignmentId,"agid":[advGrpId1,advGrpId2]}
    res=await taskPostUrl("interactive_info", body, cookie)
    if not res:
        return
    if res['code']=='0' :
        if res['success']:
            try:
                a.append(f"获取活动信息成功✅")
                # print(f"data数量 {len(res['data'])}")
                a.append(f"活动名称：{res['data'][0]['specialName']}📑")
                a.append(f"共 {len(res['data'][0]['skuList'])} 个子任务\n")
                a=[aa+'\n' for aa in a]
                a=''.join(a)
                msg(a)
                return [res['data'][0]['assignmentId'],res['data'][0]['projectId'],res['data'][0]['skuList']]
            except:
                a.append(f"找到 0 个活动信息\n")
        else:
            a.append(f"找到 0 个活动信息\n")
    else:
        a.append('错误⭕')
        a.append(f'{res}\n')
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)


# 分配子任务
async def skuList_task(cookie,assignmentId,projectId,skuList):
    a=[]
    for sku in skuList:
        body={"type":"12","agid":[sku['agid']],"adid":sku['adid'],"projectId":projectId,"assignmentId":assignmentId}
        
        a.append(f"开始 {sku['name']}📑")
        res=await taskPostUrl_2("interactive_done", body, cookie)
        if not res:
            return    
        if res['code']=='0' :
            if res['success']:
                try:
                    a.append(f"{res['data']['rewardMsg']}✅\n")
                except:
                    a.append(f"{res['message']}\n")   
            else:
                a.append(f"{res['message']}\n")
        else:
            a.append('错误⭕')
            a.append(f'{res}\n')
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)


# 主页面任务领取能量
async def page_task(cookie,assignmentId,projectId,title,itemId):
    a=[]
    a.append(f'开始 {title}📑')
    body={"projectId":projectId,"assignmentId":assignmentId,"type":"1","itemId":itemId}
    res=await taskPostUrl_4("interactive_done", body, cookie)
    if not res:
        return    
    if res['code']=='0' :
        if res['success']:
            try:
                a.append(f"{res['data']['rewardMsg']}✅\n")
            except:
                a.append(f"{res['message']}\n")  
        else:
            a.append(f"{res['message']}\n")
    else:
        a.append('错误⭕')
        a.append(f'{res}\n')
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)


# 主页面任务id
async def page_taskid(cookie,assignmentId,projectId):
    a=[]
    body={"type":"1","projectId":projectId,"assignmentId":assignmentId,"doneHide":False}
    a.append('获取主页面任务id🔎...')
    res=await taskPostUrl_3("interactive_info", body, cookie)
    if not res:
        return    
    if res['code']=='0':
        if res['success']:
            try:
                title=res['data'][0]['title']
                itemId=res['data'][0]['itemId']
                a=[aa+'\n' for aa in a]
                a=''.join(a)
                msg(a)
                return [title,itemId]
            except:
                a.append(f"没有找到任务id\n")    
        else:
            a.append(f"没有找到任务id\n") 
    else:
        a.append('错误⭕')
        a.append(f'{res}\n')    
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)

# 获取邀请码
async def get_inviteId(cookie,assignmentId,projectId):
    a=[]
    global inviteId_list
    body={"type":"2","projectId":projectId,"assignmentId":assignmentId,"doneHide":False,"helpType":"1","itemId":""}
    a.append('获取邀请码🔎..')
    res=await taskPostUrl_3("interactive_info", body, cookie)
    if not res:
        return    
    if res['code']=='0' :
        if res['success']:
            try:
                # print(res)
                inviteId=res['data'][0]['itemId']
                if inviteId not in inviteId_list:
                    inviteId_list.append(inviteId)
                    a.append(f"账号{get_pin(cookie)}的邀请码是 {inviteId}✅\n")
                else:
                    a.append(f"已记录过该邀请码\n")
            except:
                a.append(f"没有找到邀请码\n")  
        else:
            a.append(f"没有找到邀请码\n")
    else:
        a.append('错误')
        a.append(f'{res}\n') 
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)

# 检查是否可助力，获取agid,adid
async def boost(cookie,assignmentId,projectId,inviteId):
    body={"type":"2","projectId":projectId,"assignmentId":assignmentId,"doneHide":False,"helpType":"2","itemId":inviteId}
    res=await taskPostUrl_3("interactive_info", body, cookie)
    if not res:
        return    
    if res['code']=='0' :
        if res['success']:
            try:
                b=res['data'][0]['msg']
                if b=='可助力':
                    
                    return 1
            except:
                pass
        else:
            pass
    else:
        a=[]
        a.append('错误')
        a.append(f'{res}\n')
        a=[aa+'\n' for aa in a]
        a=''.join(a)
        msg(a)   


# 助力
async def boost_help(cookie,assignmentId,projectId,inviteId,agid_list):
    a=[]
    a.append(f'账号{get_pin(cookie)}去助力{inviteId}📑...')
    body={"projectId":projectId,"assignmentId":assignmentId,"type":"2","itemId":inviteId,"agid":agid_list}
    res=await taskPostUrl_5("interactive_done", body, cookie)
    if not res:
        return  
    if res['code']=='0' :
        if res['success']:
            try:
                b=res['data'][0]['msg']
                if '助力成功' in b:
                    a.append('助力成功✅\n')
            except:
                a.append(res['message']+'\n')
        else:
            a.append(res['message']+'\n')
    else:
        a.append(f'错误\n{res}\n')
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a)         

# 抽奖
async def boost_lottery(cookie,assignmentId,projectId):
    a=[]
    a.append('开始抽奖...')
    body={"projectId":projectId,"assignmentId":assignmentId,"type":"13"}
    res=await taskPostUrl_5("interactive_done", body, cookie)
    if not res:
        return    
    if res['code']=='0' :
        if res['success']:
            try:
                a.append(res['data']['rewardMsg']+'\n')
            except:
                a.append(res['message']+'\n')
        else:
            a.append(res['message']+'\n')
    else:
        a.append(f'错误\n{res}\n')
    a=[aa+'\n' for aa in a]
    a=''.join(a)
    msg(a) 

# 获取所有任务数据，分配任务
async def task_id(cookie):

    # 数据源1
    url='https://prodev.m.jd.com/mall/active/qyteDVYBqzar2x6S9rcsBYQJXhW/index.html?_ts=1635062092818&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Qqfriends&ad_od=share&utm_user=plusmember&gx=RnFikG5YbzSPntRf7Nl_WBPsc0vAzg&tttparams=NRuRseyJnTGF0IjoiMzAuMjczNzIiLCJnTG5nIjoiMTA3LjY0ODcxMi5J9&sid=683bb76d3f8c68afb54a6699eb4a030w&un_area=4_134_19915_0'
    headers={
        'Cookie': cookie,
        'Host': 'prodev.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res = requests.get(url=url, headers=headers, timeout=10,verify=False)
            res.encoding='utf-8'
            res=res.text
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 
    # 数据源2
    url_2='https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryH5BabelFloors'
    headers_2={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',  
    }
    body_2={"activityId":"qyteDVYBqzar2x6S9rcsBYQJXhW","paginationParam":"2","paginationFlrs":"[[65545401,65545402,65545403,65690186,65633233,65751866,65545406,65578502,65545407,65578503,65735501,65578504,65545408],[65735500,65545409,65690061,65545410,65690062,65545411,65956790,65956791,65956792,65545413,65545412,65545415,65545416,66027650,66027651,66027652,66027653]]"}
    data_2=f'body={json.dumps(body_2)}&sid=683bb76d3f8c68afb54a6699eb4a030w&uuid=8363031323830343433313332303-13d2438366461633039353566366&area=4_134_19915_0&osVersion=9'
    for n in range(3):
        try:
            res_2 = requests.post(url=url_2, headers=headers_2,data=data_2, timeout=10,verify=False)
            res_2.encoding='utf-8'
            res_2=res_2.text
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 

    # 数据源3
    url_3='https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryH5BabelFloors'
    headers_3={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',  
    }
    body_3={"activityId":"qyteDVYBqzar2x6S9rcsBYQJXhW","pageNum":"-1","innerAnchor":"","innerExtId":"","hideTopFoot":"","innerLinkBase64":"","innerIndex":"0","focus":"","forceTop":"","addressId":"3988099308","posLng":"","posLat":"","homeLng":"107.648712","homeLat":"30.27372","gps_area":"","headId":"","headArea":"","warehouseId":"","jxppGroupid":"","jxppFreshman":"","dcId":"","babelChannel":"","mitemAddrId":"","geo":{"lng":"","lat":""},"flt":"","jda":"122270672.1631870452730354165508.1631870452.1635073434.1635134733.27","topNavStyle":"","autoSkipEmptyPage":False,"paginationParam":"2","paginationFlrs":"[[65545401,65545402,65545403,65690186,65633233,65751866,65545406,65578502,65545407,65578503,65735501,65578504,65545408,65735500,65545409,65690061,65545410,65690062,65545411],[65956790,65956791,65956792,65545413,65545412,65545415,65545416,66027650,66027651,66027652,66027653]]","transParam":"{\"bsessionId\":\"08ce2a06-356a-4901-bc37-90d67616e3cc\",\"babelChannel\":\"\",\"actId\":\"01092053\",\"enActId\":\"qyteDVYBqzar2x6S9rcsBYQJXhW\",\"pageId\":\"3060764\",\"encryptCouponFlag\":\"1\",\"sc\":\"android\",\"scv\":\"10.1.4\",\"requestChannel\":\"h5\",\"jdAtHomePage\":\"0\",\"utmFlag\":\"0\"}","siteClient":"android","siteClientVersion":"10.1.4","matProExt":{"unpl":"V2_ZzNtbUZVShF9XEVUfhwIVmJWEwpKVUQXdVpOXHxJWg1mARYNclRCFnUUR1xnGFkUZwEZXkFcQxFFCEZkexhdBWQEF1lAVHMlfQAoVDYZMgYJAF8QD2dAFUUJdlR8G10DZQAbVUpTQBRyDUVVchFeBWQzIl1EZ0MUdAlGU3McVQRgBCJtQ2dCJXQ4DTp6VFwCZQIUX0FeSx1xC0dTfhpdDG8BEl5yVnMW"},"userInterest":{"whiteNote":"0_0_0","payment":"0_0_0","plusNew":"0_0_0","plusRenew":"0_0_0"}}

    data_3=f'body={json.dumps(body_3)}&sid=683bb76d3f8c68afb54a6699eb4a030w&uuid=8363031323830343433313332303-13d2438366461633039353566366&area=4_134_19915_0&osVersion=9'
    for n in range(3):
        try:
            res_3 = requests.post(url=url_3, headers=headers_3,data=data_3, timeout=10,verify=False)
            res_3.encoding='utf-8'
            res_3=res_3.text
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 

    try:
        # 处理数据1
        # advId1=re.findall(r'"advId1":\[(.+?)\]',res,re.M)
        # advId2=re.findall(r'"advId2":\[(.+?)\]',res,re.M)
        # assignmentId_list=re.findall(r'"assignmentid":"(.+?)"',res,re.M)
        # projectId_list=re.findall(r'"programid":"(.+?)"',res,re.M)
        # advId1_advGrpId=[re.findall(r'"advGrpId":"(.+?)"',advId)[0] for advId in advId1]
        # advId2_advGrpId=[re.findall(r'"advGrpId":"(.+?)"',advId)[0] for advId in advId2]
        # taskCode_list=re.findall(r'"taskCode":"(.+?)"',res,re.M)
        try:
            advGrpId_list_1=re.findall(r'"advGrpId":"(.+?)"',res,re.M)
            assignmentId_list_1=re.findall(r'"assignmentid":"(.+?)"',res,re.M)
            projectId_list_1=re.findall(r'"programid":"(.+?)"',res,re.M)
            taskCode_list_1=re.findall(r'"taskCode":"(.+?)"',res,re.M)
        except:
            msg('第一个数据处理失败\n')
        # 处理数据2
        # advId1_2=re.findall(r'"advId1":\[(.+?)\]',res_2,re.M)
        # advId2_2=re.findall(r'"advId2":\[(.+?)\]',res_2,re.M)
        # assignmentId_list_2=re.findall(r'"assignmentid":"(.+?)"',res_2,re.M)
        # projectId_list_2=re.findall(r'"programid":"(.+?)"',res_2,re.M)
        # advId1_advGrpId_2=[re.findall(r'"advGrpId":"(.+?)"',advId)[0] for advId in advId1_2]
        # advId2_advGrpId_2=[re.findall(r'"advGrpId":"(.+?)"',advId)[0] for advId in advId2_2]
        # taskCode_list_2=re.findall(r'"taskCode":"(.+?)"',res_2,re.M)
        try:
            advGrpId_list_2=re.findall(r'"advGrpId":"(.+?)"',res_2,re.M)
            assignmentId_list_2=re.findall(r'"assignmentid":"(.+?)"',res_2,re.M)
            projectId_list_2=re.findall(r'"programid":"(.+?)"',res_2,re.M)
            taskCode_list_2=re.findall(r'"taskCode":"(.+?)"',res_2,re.M)
        except:
            msg('第二个数据处理失败\n')

        # 处理数据3
        try:
            advGrpId_list_3=re.findall(r'"advGrpId":"(.+?)"',res_3,re.M)
            assignmentId_list_3=re.findall(r'"assignmentid":"(.+?)"',res_3,re.M)
            projectId_list_3=re.findall(r'"programid":"(.+?)"',res_3,re.M)
            taskCode_list_3=re.findall(r'"taskCode":"(.+?)"',res_3,re.M)
        except:
            msg('第三个数据处理失败\n')

        # 整理数据
        try:
            assignmentId_list=assignmentId_list_1+assignmentId_list_2+assignmentId_list_3
            projectId_list=projectId_list_1+projectId_list_2+projectId_list_3
            # advId1_advGrpId=advId1_advGrpId_2
            # advId2_advGrpId=advId2_advGrpId_2
            taskCode_list=taskCode_list_1+taskCode_list_2+taskCode_list_3
            advGrpId_list=advGrpId_list_1+advGrpId_list_2+advGrpId_list_3

            assignmentId_list=set(assignmentId_list)
            projectId_list=set(projectId_list)
            # advId1_advGrpId=set(advId1_advGrpId)
            # advId2_advGrpId=set(advId2_advGrpId)
            taskCode_list=set(taskCode_list)
            advGrpId_list=set(advGrpId_list)
        except:
            msg('整理数据失败\n')
    except:
        msg(f'收集任务数据失败，快去买买买吧\n')
        return
    # print(assignmentId_list)
    # print(projectId_list)
    # print(advId1_advGrpId)
    # print(advId2_advGrpId)

    # 遍历数据
    global session
    async with aiohttp.ClientSession() as session:
        tasks=[]
        for assignmentId in assignmentId_list:
            for e,projectId in enumerate(projectId_list):
                for f,taskCode in enumerate(taskCode_list):
                    async def page_taskid_async(cookie,taskCode,projectId):
                        taskid=await page_taskid(cookie,taskCode,projectId)          # 主页面任务id
                        if taskid:
                            await page_task(cookie,taskCode,projectId,taskid[0],taskid[1])          # 主页面任务
                    tasks.append(boost_lottery(cookie,assignmentId,projectId))      # 抽奖
                    tasks.append(page_taskid_async(cookie,taskCode,projectId))      # 主页面任务
                    tasks.append(get_inviteId(cookie,taskCode,projectId))        # 获取邀请码                      
                for advGrpId1 in advGrpId_list:
                    for advGrpId2 in advGrpId_list:
                        async def task_assignment_async(cookie,assignmentId,projectId,advGrpId1,advGrpId2):  
                            skuList=await task_assignment(cookie,assignmentId,projectId,advGrpId1,advGrpId2)        # 获取活动数据
                            if skuList:
                                time.sleep(0.5)
                                await skuList_task(cookie,skuList[0],skuList[1],skuList[2])        # 分配子任务
                        tasks.append(task_assignment_async(cookie,assignmentId,projectId,advGrpId1,advGrpId2))          # 获取活动数据
                        pass
        await asyncio.wait(tasks) 

# 获取所有任务数据，分配任务
async def task_id_help(cookie):
    global session
    # 数据源1
    url='https://prodev.m.jd.com/mall/active/qyteDVYBqzar2x6S9rcsBYQJXhW/index.html?_ts=1635062092818&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Qqfriends&ad_od=share&utm_user=plusmember&gx=RnFikG5YbzSPntRf7Nl_WBPsc0vAzg&tttparams=NRuRseyJnTGF0IjoiMzAuMjczNzIiLCJnTG5nIjoiMTA3LjY0ODcxMi5J9&sid=683bb76d3f8c68afb54a6699eb4a030w&un_area=4_134_19915_0'
    headers={
        'Cookie': cookie,
        'Host': 'prodev.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url,headers=headers, timeout=10) as res:
                    res=await res.text(encoding="utf-8")     #查看默认编码为utf-8
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 

    # 数据源2
    url_2='https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryH5BabelFloors'
    headers_2={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',  
    }
    body_2={"activityId":"qyteDVYBqzar2x6S9rcsBYQJXhW","paginationParam":"2","paginationFlrs":"[[65545401,65545402,65545403,65690186,65633233,65751866,65545406,65578502,65545407,65578503,65735501,65578504,65545408],[65735500,65545409,65690061,65545410,65690062,65545411,65956790,65956791,65956792,65545413,65545412,65545415,65545416,66027650,66027651,66027652,66027653]]"}
    data_2=f'body={json.dumps(body_2)}&sid=683bb76d3f8c68afb54a6699eb4a030w&uuid=8363031323830343433313332303-13d2438366461633039353566366&area=4_134_19915_0&osVersion=9'
    for n in range(3):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url_2,headers=headers_2,data=data_2, timeout=10) as res_2:
                    res_2=await res_2.text(encoding="utf-8")    #查看默认编码为utf-8
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 
    # 数据源3
    url_3='https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryH5BabelFloors'
    headers_3={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',  
    }
    body_3={"activityId":"qyteDVYBqzar2x6S9rcsBYQJXhW","pageNum":"-1","innerAnchor":"","innerExtId":"","hideTopFoot":"","innerLinkBase64":"","innerIndex":"0","focus":"","forceTop":"","addressId":"3988099308","posLng":"","posLat":"","homeLng":"107.648712","homeLat":"30.27372","gps_area":"","headId":"","headArea":"","warehouseId":"","jxppGroupid":"","jxppFreshman":"","dcId":"","babelChannel":"","mitemAddrId":"","geo":{"lng":"","lat":""},"flt":"","jda":"122270672.1631870452730354165508.1631870452.1635073434.1635134733.27","topNavStyle":"","autoSkipEmptyPage":False,"paginationParam":"2","paginationFlrs":"[[65545401,65545402,65545403,65690186,65633233,65751866,65545406,65578502,65545407,65578503,65735501,65578504,65545408,65735500,65545409,65690061,65545410,65690062,65545411],[65956790,65956791,65956792,65545413,65545412,65545415,65545416,66027650,66027651,66027652,66027653]]","transParam":"{\"bsessionId\":\"08ce2a06-356a-4901-bc37-90d67616e3cc\",\"babelChannel\":\"\",\"actId\":\"01092053\",\"enActId\":\"qyteDVYBqzar2x6S9rcsBYQJXhW\",\"pageId\":\"3060764\",\"encryptCouponFlag\":\"1\",\"sc\":\"android\",\"scv\":\"10.1.4\",\"requestChannel\":\"h5\",\"jdAtHomePage\":\"0\",\"utmFlag\":\"0\"}","siteClient":"android","siteClientVersion":"10.1.4","matProExt":{"unpl":"V2_ZzNtbUZVShF9XEVUfhwIVmJWEwpKVUQXdVpOXHxJWg1mARYNclRCFnUUR1xnGFkUZwEZXkFcQxFFCEZkexhdBWQEF1lAVHMlfQAoVDYZMgYJAF8QD2dAFUUJdlR8G10DZQAbVUpTQBRyDUVVchFeBWQzIl1EZ0MUdAlGU3McVQRgBCJtQ2dCJXQ4DTp6VFwCZQIUX0FeSx1xC0dTfhpdDG8BEl5yVnMW"},"userInterest":{"whiteNote":"0_0_0","payment":"0_0_0","plusNew":"0_0_0","plusRenew":"0_0_0"}}

    data_3=f'body={json.dumps(body_3)}&sid=683bb76d3f8c68afb54a6699eb4a030w&uuid=8363031323830343433313332303-13d2438366461633039353566366&area=4_134_19915_0&osVersion=9'
    for n in range(3):
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url_3,headers=headers_3,data=data_3, timeout=10) as res_3:
                    res_3=await res_3.text(encoding="utf-8")    #查看默认编码为utf-8
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')
                return 
    

    advGrpId_list_1=re.findall(r'"advGrpId":"(.+?)"',res,re.M)
    assignmentId_list_1=re.findall(r'"assignmentid":"(.+?)"',res,re.M)
    projectId_list_1=re.findall(r'"programid":"(.+?)"',res,re.M)
    taskCode_list_1=re.findall(r'"taskCode":"(.+?)"',res,re.M)

    advGrpId_list_2=re.findall(r'"advGrpId":"(.+?)"',res_2,re.M)
    assignmentId_list_2=re.findall(r'"assignmentid":"(.+?)"',res_2,re.M)
    projectId_list_2=re.findall(r'"programid":"(.+?)"',res_2,re.M)
    taskCode_list_2=re.findall(r'"taskCode":"(.+?)"',res_2,re.M)

    advGrpId_list_3=re.findall(r'"advGrpId":"(.+?)"',res_3,re.M)
    assignmentId_list_3=re.findall(r'"assignmentid":"(.+?)"',res_3,re.M)
    projectId_list_3=re.findall(r'"programid":"(.+?)"',res_3,re.M)
    taskCode_list_3=re.findall(r'"taskCode":"(.+?)"',res_3,re.M)

    assignmentId_list=assignmentId_list_1+assignmentId_list_2+assignmentId_list_3
    projectId_list=projectId_list_1+projectId_list_2+projectId_list_3
    taskCode_list=taskCode_list_1+taskCode_list_2+taskCode_list_3
    advGrpId_list=advGrpId_list_1+advGrpId_list_2+advGrpId_list_3

    assignmentId_list=set(assignmentId_list)
    projectId_list=set(projectId_list)
    taskCode_list=set(taskCode_list)
    advGrpId_list=set(advGrpId_list)

    # 遍历数据
    async with aiohttp.ClientSession() as session:
        taskss=[]
        for e,projectId in enumerate(projectId_list):
            for f,taskCode in enumerate(taskCode_list):
                async def boost_async(cookie,taskCode,projectId,advGrpId_list):
                    taskssss=[]
                    for inviteId in inviteId_list:
                        c=await boost(cookie,taskCode,projectId,inviteId)       # 检查是否可助力
                        if c==1:
                            for advGrpId1 in advGrpId_list:
                                for advGrpId2 in advGrpId_list: 
                                    advGrpId=[advGrpId1,advGrpId2]
                                    taskssss.append(boost_help(cookie,taskCode,projectId,inviteId,advGrpId))               # 助力
                    if c==1: 
                        await asyncio.wait(taskssss)
                taskss.append(boost_async(cookie,taskCode,projectId,advGrpId_list))  
        await asyncio.wait(taskss)      


def main():
    msg('🔔发现新宝藏，开始！\n')
    global inviteId_list,start
    start = time.time()
    inviteId_list=[]

    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')
    msg('已完成的任务会显示火爆，当然也可能你是黑号...\n')
    tasksss=[]
    for e,cookie in enumerate(cookie_list,start=1):
        msg(f'******开始【账号 {e}】 {get_pin(cookie)} *********\n')
        a=getUserInfo(cookie)
        if not a:
            return
        asyncio.run(task_id(cookie))
        # async def task_id_async(cookie):
        #     a=getUserInfo(cookie)
        #     if not a:
        #         return
        #     await task_id(cookie)
        # tasksss.append(task_id_async(cookie))
        # asyncio.run(task_id(cookie))
    # asyncio.run(asyncio.wait(tasksss))
    
    msg(f'\n\n====================开始内部助力=========\n')

    tasksss=[]
    for e,cookie in enumerate(cookie_list,start=1):
        tasksss.append(task_id_help(cookie))      
    done,p=asyncio.run(asyncio.wait(tasksss))
    ret = [d.result() for d in done]
    
    if run_send=='yes':
        send('### 发现新宝藏 ###')   # 通知服务


if __name__ == '__main__':
    main()

