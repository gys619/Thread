#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
cron: 5 15 * * *
new Env('东东农场-集勋章合成兑换奖励');
入口: 京东》我的>东东农场>集勋章合成兑换奖励
变量: JD_COOKIE，awardType
export awardType="3"   1或2或3 -->  1是2500水滴 2是5元无门槛红包(仅限京东使用) 3是500京豆 ，不使用该环境变量默认500豆
export JD_COOKIE="第1个cookie&第2个cookie"
地址：https://raw.githubusercontent.com/wuye999/myScripts/main/jd/jd_fruit_medalExchange.py
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


run_send='yes'              # yes或no, yes则启用通知推送服务
awardType="3"


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
            'https://raw.fastgit.org/wuye999/myScripts/main/sendNotify.py',
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


def taskPostUrl(functionId, body, cookie):
    url=f'https://api.m.jd.com/client.action'
    headers={
        'cookie': cookie,
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/x-www-form-urlencoded',
        'x-requested-with': 'com.jingdong.app.mall',
        'sec-fetch-site': 'same-site', 
        'sec-fetch-mode': 'cors',       
        'origin': 'https://h5.m.jd.com',
        'referer': 'https://h5.m.jd.com/babelDiy/Zeus/m6Gntdu86ypN4ehW9oFsChdMtPG/index.html?babelChannel=ttt5&sid=8ebbce4a93eaa3d4962ee2e1bf58848w&un_area=4_134_19915_0',
        "user-agent": ua(),
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    }
    data=body
    for n in range(3):
        try:
            res=requests.post(url,headers=headers,data=data).json()
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')  

# type映射
type_name_s={
    3:'500京豆',
    2:'5元无门槛红包(仅限京东使用)',
    1:'2500水滴'
}

# 合成
def collect_getAwardInfo(cookie):
    body='functionId=collect_getAwardInfo&body={}&client=wh5&clientVersion=1.0.0'
    res=taskPostUrl('', body, cookie)
    if not res:
        return
    try:              
        if res['code']=='0':
            awardList=res['result']['awardList']
            if len(awardList)==1:
                awardType=awardList[0]['awardType']
                msg(f'您已兑换过 {type_name_s[awardType]}\n')
            else:
                # msg('合成成功')
                return True
    except:
        msg(f"错误\n{res}")

# 兑换
def collect_exchangeAward(cookie):
    body='functionId=collect_exchangeAward&body={"type":'+get_env('awardType')+'}&client=wh5&clientVersion=1.0.0'
    res=taskPostUrl('', body, cookie)
    if not res:
        return
    try:              
        if res['code']=='0':
            awardType=res['result']['awardType']
            msg(f'兑换成功 {type_name_s[awardType]} \n')
        else:
            msg(f'兑换失败，还没有收集到所有勋章哦~ \n')
    except:
        msg(f"错误\n{res}")    

def main():
    msg('🔔东东农场-集勋章合成兑换奖励，开始！\n')
    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')

    for e,cookie in enumerate(cookie_list):
        msg(f'******开始【账号 {e+1}】 {get_pin(cookie)} *********\n')
        ffff=collect_getAwardInfo(cookie)
        if ffff:
            collect_exchangeAward(cookie)
    
    if run_send=='yes':
        send('东东农场-集勋章合成兑换奖励')   # 通知服务


if __name__ == '__main__':
    main()

