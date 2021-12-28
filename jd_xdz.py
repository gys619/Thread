# 星店长
# 入口 复制到京东打开>   12:/￥T8kw4Dip0tI9Hy￥，邀你瓜分百万红包！
# 脚本功能为 完成任务
# 环境变量JD_COOKIE，多账号用&分割
# export JD_COOKIE="第1个cookie&第2个cookie"
# 11 10 22:00 应要求更改cdn


import os,json,random,time,re,string,functools,asyncio
import sys
sys.path.append('../../tmp')
try:
    import requests
except Exception as e:
    print(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")
requests.packages.urllib3.disable_warnings()
    

JD_API_HOST = 'https://api.m.jd.com'
run_send='yes'     # yes或no, yes则启用通知推送服务


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
        'Accept-Langua()ge': 'zh-cn'
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
            url = 'https://mirror.ghproxy.com/https://raw.githubusercontent.com/wuye999/myScripts/main/sendNotify.py'
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
        l=['BARK','SCKEY','TG_BOT_TOKEN','TG_USER_ID','TG_API_HOST','TG_PROXY_HOST','TG_PROXY_PORT','DD_BOT_TOKEN','DD_BOT_SECRET','Q_SKEY','QQ_MODE','QYWX_AM','PUSH_PLUS_TOKEN','PUSH_PLUS_USER']
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


def taskPostUrl(functionId, body, cookie):
    url=f'https://api.m.jd.com'
    headers={
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'origin': 'https://pro.m.jd.com',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        "User-Agent": ua(),
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    data=f"functionId={functionId}&body={json.dumps(body)}&_t={gettimestamp()}&appid=activities_platform"
    for n in range(3):
        try:
            res=requests.post(url,headers=headers,data=data).json()
            return res
        except:
            if n==3:
                msg('API请求失败，请检查网路重试❗\n')  

# 签到
def apDoTask(cookie):
    msg('开始签到')
    body={"taskType":"SIGN","taskId":388,"linkId":"nUW_swWdzGTw9TREVAMBCw"}
    res=taskPostUrl("apDoTask", body, cookie)
    if not res:
        return
    if res['code']==0:
        if res['success']:
            msg(f"签到成功\n获得热爱值 {res['data']['awardInfo'][0]['factAwardNum']} \n")
        else:
            msg(f"{res['errMsg']}\n")
    else:
        msg(f"{res['errMsg']}\n")

def liulanhuic(cookie):
    itemId_list=[
        'https://prodev.m.jd.com/mall/active/3dS52LmsBGrZ9eQnmZ6q7QhYsVjT/index.html?babelChannel=ttt8',
        'https://prodev.m.jd.com/mall/active/JZmi8ucdvKaHHJvXqxvJpKA9KsT/index.html?babelChannel=ttt8',
        'https://h5.m.jd.com/babelDiy/Zeus/4VnAwLc5iM42E8az6CyAWR1e4kcV/index.html?babelChannel=ttt13',
        'https://prodev.m.jd.com/mall/active/31QzsgSooWDuebS3u31MxcSqZ7c2/index.html?babelChannel=ttt25',
        'https://prodev.m.jd.com/mall/active/2ZfWtL9FJJjaJDmcPpZ2x9YhyEj4/index.html?babelChannel=ttt11',
        'https://pro.m.jd.com/mall/active/PCzmsXPp2aweHqtNGcyYgAKtYDC/index.html?babelChannel=ttt15'
    ]
    for itemId in itemId_list:
        apDoTask_2(cookie,itemId)

# 浏览会场活动
def apDoTask_2(cookie,itemId):
    msg('浏览会场活动')
    time.sleep(1)
    body={"taskType":"BROWSE_CHANNEL","taskId":395,"channel":4,"linkId":"nUW_swWdzGTw9TREVAMBCw","itemId":itemId}
    res=taskPostUrl("apDoTask", body, cookie)
    if not res:
        return
    if res['code']==0:
        if res['success']:
            msg(f"浏览成功\n获得热爱值 {res['data']['awardInfo'][0]['factAwardNum']} \n")
        else:
            msg(f"{res['errMsg']}\n")
    else:
        msg(f"{res['errMsg']}\n")

def pinpaixiaod(cookie):
    itemId_list=[
        'https://prodev.m.jd.com/mall/active/31ghed72ZdDsLsNrN8R4EZRA3L9/index.html',
        'https://prodev.m.jd.com/mall/active/2XGf9o8uJqzuTvneZbiDD63vKQ9p/index.html',
        'https://prodev.m.jd.com/mall/active/3ZzEwyQbnZswdv5JYbJuDBtmCsSi/index.html',
        'https://prodev.m.jd.com/mall/active/aVX5MdJL3uGu5n4jSFdJTycypBQ/index.html',
        'https://prodev.m.jd.com/mall/active/3AViwZB9UPzrtJksto1BndB9Tzxn/index.html'
    ]
    for itemId in itemId_list:
        apDoTask_3(cookie,itemId)    

# 浏览品牌小店
def apDoTask_3(cookie,itemId):
    msg('浏览品牌小店')
    time.sleep(1)
    body={"taskType":"BROWSE_CHANNEL","taskId":396,"channel":4,"linkId":"nUW_swWdzGTw9TREVAMBCw","itemId":itemId}
    res=taskPostUrl("apDoTask", body, cookie)
    if not res:
        return
    if res['code']==0:
        if res['success']:
            msg(f"浏览成功\n获得热爱值 {res['data']['awardInfo'][0]['factAwardNum']} \n")
        else:
            msg(f"{res['errMsg']}\n")
    else:
        msg(f"{res['errMsg']}\n")

# 助力
def queryPanamaFloor(cookie):
    pass



def main():
    msg('🔔星店长，开始！\n')

    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')

    for e,cookie in enumerate(cookie_list,start=1):
        msg(f'******开始【账号 {e}】 {get_pin(cookie)} *********\n')
        a=getUserInfo(cookie)
        if not a:
            return
        apDoTask(cookie)
        liulanhuic(cookie)
        pinpaixiaod(cookie)
    
    if run_send=='yes':
        send('星店长')   # 通知服务


if __name__ == '__main__':
    main()



    
