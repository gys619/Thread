'''
cron: 5 0 * * *
new Env('安静的锦鲤');
入口: 京东首页>领券>锦鲤红包
变量: JD_COOKIE,kois
export JD_COOKIE="第1个cookie&第2个cookie"
export kois=" 第1个cookie的pin & 第2个cookie的pin "
环境变量kois中填入需要助力的pt_pin，有多个请用 '@'或'&'或空格 符号连接,不填默认全部账号内部随机助力
脚本内或环境变量填写，优先环境变量
地址：https://raw.githubusercontent.com/wuye999/myScripts/main/jd/jd_angryKoi.py
更新：
17/24 22:00 使用随机log,增加开红包
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
sceneid='JLHBhPageh5'


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


def log():
    log_str=string.ascii_lowercase+string.digits
    return ''.join(random.sample(log_str,8))+'~8,~'+''.join(random.sample(log_str,7))   

def taskPostUrl(functionId, body, cookie):
    url=f'https://api.m.jd.com/api?appid=jinlihongbao&functionId={functionId}&loginType=2&client=jinlihongbao&t={gettimestamp()}&clientVersion=10.1.4&osVersion=-1'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'origin': 'https://happy.m.jd.com',
        'referer': 'https://happy.m.jd.com/babelDiy/zjyw/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html?channel=9&un_area=4_134_19915_0',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    data=f"body={json.dumps(body)}"
    for n in range(3):
        try:
            res=requests.post(url,headers=headers,data=data).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')  

# 开启助力
code_findall=re.compile(r'"code":(.*?),')
def h5launch(cookie):
    body={"followShop":1,"random":''.join(random.sample(string.digits, 6)),"log":log(),"sceneid":sceneid}
    res=taskPostUrl("h5launch", body, cookie)
    if not res:
        return
    if Code:=code_findall.findall(res):
        if str(Code[0])=='0':
            msg(f"账号 {get_pin(cookie)} 开启助力码成功\n")
        else:
            msg(f"账号 {get_pin(cookie)} 开启助力码失败")
            msg(res)
    else:
        msg(f"账号 {get_pin(cookie)} 开启助力码失败")
        msg(res)

# 获取助力码
id_findall=re.compile(r'","id":(.+?),"')
def h5activityIndex(cookie):
    global inviteCode_list
    body={"isjdapp":1}
    res=taskPostUrl("h5activityIndex", body, cookie)
    if not res:
        return
    if inviteCode:=id_findall.findall(res):
        inviteCode=inviteCode[0]
        inviteCode_list.append(inviteCode)
        msg(f"账号 {get_pin(cookie)} 的锦鲤红包助力码为 {inviteCode}\n")
    else:
        msg(f"账号 {get_pin(cookie)} 获取助力码失败\n")

# 助力
statusDesc_findall=re.compile(r',"statusDesc":"(.+?)"')
def jinli_h5assist(cookie,redPacketId):
    body={"redPacketId":redPacketId,"followShop":0,"random":''.join(random.sample(string.digits, 6)),"log":log(),"sceneid":sceneid}
    res=taskPostUrl("jinli_h5assist", body, cookie)
    msg(f'账号 {get_pin(cookie)} 去助力{redPacketId}')
    if not res:
        return
    if statusDesc:=statusDesc_findall.findall(res):
        statusDesc=statusDesc[0]
        msg(f"{statusDesc}\n")
    else:
        msg(f"错误\n{res}\n")

# 开红包
biz_msg_findall=re.compile(r'"biz_msg":"(.*?)"')
discount_findall=re.compile(r'"discount":"(.*?)"')
def h5receiveRedpacketAll(cookie):
    body={"random":''.join(random.sample(string.digits, 6)),"log":log(),"sceneid":sceneid}
    res=taskPostUrl("h5receiveRedpacketAll", body, cookie)
    msg(f'账号 {get_pin(cookie)} 开红包')
    if not res:
        return
    try:
        biz_msg=biz_msg_findall.findall(res)[0]
    except:
        print(res)
        return
    if discount:=discount_findall.findall(res):
        discount=discount[0]
        msg(f"恭喜您，获得红包 {discount}\n")
        return h5receiveRedpacketAll(cookie)
    else:
        msg(f"{biz_msg}\n")


def main():
    msg('🔔安静的锦鲤，开始！\n')
    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')

    if debug_pin:=get_env('kois'):
        cookie_list_pin=[cookie for cookie in cookie_list if get_pin(cookie) in debug_pin]
    else:
        cookie_list_pin=cookie_list
    global inviteCode_list
    inviteCode_list=list()

    msg('***************************开启助力码***************\n')
    [h5launch(cookie) for cookie in cookie_list_pin]

    msg('***************************获取助力码***************\n')
    [h5activityIndex(cookie) for cookie in cookie_list_pin]


    msg('*******************助力**************************\n')
    if inviteCode_list:
        [jinli_h5assist(cookie,inviteCode) for inviteCode in inviteCode_list for cookie in cookie_list]
    else:
        msg('没有需要助力的锦鲤红包助力码\n')

    msg('*******************开红包**************************\n')
    [h5receiveRedpacketAll(cookie) for cookie in cookie_list_pin]
    
    if run_send=='yes':
        send('安静的锦鲤')   # 通知服务


if __name__ == '__main__':
    main()



