#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
cron: 5 15 * * *
new Env('冬香节送福利');
入口: 京东极速版》首页》领红包
说明：每天3次抽奖机会，抽奖，提现
青龙拉取命令：
ql raw https://raw.githubusercontent.com/wuye999/myScripts/main/jd/jd_dongxiang_benefits.py
'''
import os,json,random,time,re,string,functools
import sys
sys.path.append('../../tmp')
sys.path.append(os.path.abspath('.')) 
try:
    import requests
except Exception as e:
    print(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")
requests.packages.urllib3.disable_warnings()


run_send='no'              # yes或no, yes则启用通知推送服务
linkId='7ya6o83WSbNhrbYJqsMfFA'


# 获取pin
cookie_findall=re.compile(r'pt_pin=(.+?);')
def get_pin(cookie):
    try:
        return cookie_findall.findall(cookie)[0]
    except:
        print('ck格式不正确，请检查')


# 读取环境变量
def get_env(env):
    try:
        if env in os.environ:
            a=os.environ[env]
        elif '/ql' in os.path.abspath(os.path.dirname(__file__)):
            try:
                a=v4_env(env,'/ql/config/config.sh')
            except:
                a=eval(env)
        elif '/jd' in os.path.abspath(os.path.dirname(__file__)):
            try:
                a=v4_env(env,'/jd/config/config.sh')
            except:
                a=eval(env)
        else:
            a=eval(env)
    except:
        a=''
    return a

# v4
def v4_env(env,paths):
    b=re.compile(r'(?:export )?'+env+r' ?= ?[\"\'](.*?)[\"\']', re.I)
    with open(paths, 'r') as f:
        for line in f.readlines():
            try:
                c=b.match(line).group(1)
                break
            except:
                pass
    return c


# 随机ua
def ua():
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
            print('请填写环境变量JD_COOKIE\n')    
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


## 获取通知服务
class Msg(object):
    def getsendNotify(self):
        url_list = [
            'https://mirror.ghproxy.com/https://raw.githubusercontent.com/wuye999/myScripts/main/sendNotify.py',
            'https://cdn.jsdelivr.net/gh/wuye999/myScripts@main/sendNotify.py',
            'https://raw.githubusercontent.com/wuye999/myScripts/main/sendNotify.py',
        ]
        for e,url in enumerate(url_list):
            try:
                response = requests.get(url,timeout=10)
                with open('sendNotify.py', "w+", encoding="utf-8") as f:
                    f.write(response.text)
                return
            except:
                if e >= (len(url_list)-1):
                    print('获取通知服务失败，请检查网络连接...')               
    def main(self,f=0):
        global send,msg,initialize
        sys.path.append(os.path.abspath('.'))
        for _ in range(2):
            try:
                from sendNotify import send,msg,initialize
                break
            except:
                self.getsendNotify()
        l=['BARK_PUSH', 'BARK_ARCHIVE', 'BARK_GROUP', 'BARK_SOUND', 'DD_BOT_SECRET', 'DD_BOT_TOKEN', 'FSKEY', 'GOBOT_URL', 'GOBOT_QQ', 'GOBOT_TOKEN', 'GOTIFY_URL', 'GOTIFY_TOKEN', 'GOTIFY_PRIORITY', 'IGOT_PUSH_KEY', 'PUSH_KEY', 'PUSH_PLUS_TOKEN', 'PUSH_PLUS_USER', 'QMSG_KEY', 'QMSG_TYPE', 'QYWX_AM', 'QYWX_KEY', 'TG_BOT_TOKEN', 'TG_USER_ID', 'TG_API_HOST', 'TG_PROXY_AUTH', 'TG_PROXY_HOST', 'TG_PROXY_PORT']
        d={}
        for a in l:
            try:
                d[a]=eval(a)
            except:
                d[a]=''
        try:
            initialize(d)
        except:
            if f < 2:
                f += 1
                self.getsendNotify()
                return self.main(f)
Msg().main()   # 初始化通知服务    


def taskGetUrl(functionId,body,cookie):
    url=f'https://api.m.jd.com/?functionId={functionId}&body={json.dumps(body)}&_t={gettimestamp()}&appid=activities_platform'
    headers={
        'accept': 'application/json, text/plain, */*',
        'origin': 'https://prodev.m.jd.com',
        'user-agent': ua(),
        'sec-fetch-mode': 'cors',
        'x-requested-with': 'com.jd.jdlite',
        'sec-fetch-site': 'same-site',
        'referer': 'https://prodev.m.jd.com/jdlite/active/31U4T6S4PbcK83HyLPioeCWrD63j/index.html?lng=107.64926&lat=30.282091&sid=f0f0c723bde6965c5f6e1979f36c146w&un_area=4_134_19915_0',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie' :cookie,
    }
    for n in range(3):
        try:
            res=requests.get(url,headers=headers).json()
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')  


def taskGetUrl_2(cookie):
    url='https://api.m.jd.com/?functionId=spring_reward_receive&body={%22inviter%22:%22%22,%22linkId%22:%22'+linkId+'%22}&_t=1638374691838&appid=activities_platform'
    headers={
        'accept': 'application/json, text/plain, */*',
        'origin': 'https://prodev.m.jd.com',
        'user-agent': ua(),
        'sec-fetch-mode': 'cors',
        'x-requested-with': 'com.jd.jdlite',
        'sec-fetch-site': 'same-site',
        'referer': 'https://prodev.m.jd.com/jdlite/active/31U4T6S4PbcK83HyLPioeCWrD63j/index.html?lng=107.649257&lat=30.282082&sid=e0296d84862c705f9d23dfb70165cfaw&un_area=4_134_19915_0',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie' :cookie,
    }
    for n in range(3):
        try:
            res=requests.get(url,headers=headers).json()
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')  

# 抽奖
def spring_reward_receive(cookie):
    res=taskGetUrl_2(cookie)
    if not res:
        return
    try:              
        if res['code']==0:
            # remainChance=res['data']['remainChance']        # 剩余抽奖次数
            received=res['data']['received']
            prizeDesc=received['prizeDesc']      # 奖品名称
            amount=received['amount']       # 奖品数量
            msg(f"抽到 {prizeDesc} {amount}")
            return spring_reward_receive(cookie)
        else:
            msg(f"{res['errMsg']}\n")
    except:
        msg(f"错误\n{res}")

# 微信现金id
def spring_reward_list(cookie):
    
    body={"linkId":linkId,"pageNum":1,"pageSize":10}
    res=taskGetUrl("spring_reward_list", body, cookie)
    
    if res['code']==0:
        if res['success']:
            items=res['data']['items']
            for _items in items:
                amount=_items['amount']         # 金额
                prizeDesc=_items['prizeDesc']   # 金额备注
                amountid=_items['id']           # 金额id
                prizeType=_items['prizeType']   # 类型，4代表微信红包
                poolBaseId=_items['poolBaseId']
                prizeGroupId=_items['prizeGroupId']
                prizeBaseId=_items['prizeBaseId']
                if prizeType == 4:
                    msg('尝试微信提现')
                    wecat(cookie,amountid,poolBaseId,prizeGroupId,prizeBaseId)
        else:
            msg(f'获取数据失败\n{res}\n')
    else:
        msg(f'获取数据失败\n{res}\n')                     

# 微信提现
def wecat(cookie,amountid,poolBaseId,prizeGroupId,prizeBaseId):
    url='https://api.m.jd.com'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://bnzf.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    body={"businessSource":"happyDiggerH5Cash","base":{"id":amountid,"business":"happyDigger","poolBaseId":poolBaseId,"prizeGroupId":prizeGroupId,"prizeBaseId":prizeBaseId,"prizeType":4},"linkId":linkId}
    data=f"functionId=apCashWithDraw&body={json.dumps(body)}&t={gettimestamp()}&appid=activities_platform&client=H5&clientVersion=1.0.0"
    for n in range(3):
        try:
            res=requests.post(url,headers=headers,data=data).json()
            break
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n') 
    try:
        if res['code']==0:
            if res['success']:
                msg(res['data']['message']+'\n')
    except:
        msg(res)
        msg('')


def main():
    msg('🔔冬香节送福利，开始！\n')
    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')

    for e,cookie in enumerate(cookie_list):
        msg(f'******开始【账号 {e+1}】 {get_pin(cookie)} *********\n')
        msg('开始领红包')
        spring_reward_receive(cookie)
        spring_reward_list(cookie)

    
    if run_send=='yes':
        send('冬香节送福利')   # 通知服务


if __name__ == '__main__':
    main()

