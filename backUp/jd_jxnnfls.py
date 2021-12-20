# 牛牛福利社
# 入口> 京喜>我的>牛牛赚大钱>去领福利
# 脚本功能为 签到，完成任务，内部互助，抽大奖
# 环境变量JD_COOKIE，多账号用&分割
# export JD_COOKIE="第1个cookie&第2个cookie"
# export nnfls_Lucky="yes"     # 是否抽奖 yes或no，不填默认yes


import os,json,random,time,re,string,functools,asyncio
import sys
sys.path.append('../../tmp')
sys.path.append(os.path.abspath('.'))
from  multiprocessing import Pool
try:
    import requests
except Exception as e:
    print(str(e) + "\n缺少requests模块, 请执行命令：pip3 install requests\n")
requests.packages.urllib3.disable_warnings()


JD_API_HOST = 'https://api.m.jd.com'
run_send='no'     # yes或no, yes则启用通知推送服务


# 获取pin
cookie_findall=re.compile(r'pt_pin=(.+?);')
def get_pin(cookie):
    try:
        return cookie_findall.findall(cookie)[0]
    except:
        print('ck格式不正确，请检查')


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


# 检查账号有效性
def getUserInfo(cookie):
    if not (pin:=get_pin(cookie)):
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
cookie_list=list(filter(getUserInfo,cookie_list))  


def taskGetUrl(functionId, cookie):
    url=f'https://m.jingxi.com/pgcenter/task/{functionId}?sceneval=2&_stk=sceneval&_ste=1&h5st=20211103212952604%3B4806829085285162%3B10012%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3Bb486a44084312d9dd397b3e6c99fdc2c1ce379f8da4f5668d05d108f29614419&_={gettimestamp()}&sceneval=2&g_login_type=1&callback=jsonpCBKV&g_ty=ls'
    headers={
        'Cookie': cookie,
        'Host': 'm.jingxi.com',
        'Connection': 'keep-alive',
        'referer': 'https://st.jingxi.com/pingou/taskcenter/index.html?_close=1&jxsid=16359311457293672633',
        'Content-Type': 'application/json;charset=UTF-8',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res=requests.get(url=url,headers=headers).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')


def taskGetUrl_2(functionId,taskid,cookie):
    url=f'https://m.jingxi.com/pgcenter/task/{functionId}?sceneval=2&taskid={taskid}&_stk=sceneval%2Ctaskid&_ste=1&h5st=20211103214909260%3B4806829085285162%3B10012%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3Bf2cb292190ef76be705d90f485c94fe00bd0194368c5e4c1baac318ef14ff2e7&_={gettimestamp()}&g_login_type=1&callback=jsonpCBKM&g_ty=ls'
    headers={
        'Cookie': cookie,
        'Host': 'm.jingxi.com',
        'Connection': 'keep-alive',
        'referer': 'https://st.jingxi.com/pingou/taskcenter/index.html?_close=1&jxsid=16359311457293672633',
        'Content-Type': 'application/json;charset=UTF-8',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res=requests.get(url=url,headers=headers).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')


def taskGetUrl_3(functionId,cookie):
    url=f'https://m.jingxi.com/pgcenter/sign/{functionId}?sceneval=2&source=&_stk=sceneval%2Csource&_ste=1&h5st=20211103221911280%3B4806829085285162%3B10012%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3Bc6b79c4849ab31a4f07f9b8819b7e7dfc9043038bf951ebbb4a5706e7332a9c5&sceneval=2&g_login_type=1&g_ty=ajax'
    headers={
        'Cookie': cookie,
        'Host': 'm.jingxi.com',
        'origin': 'https://st.jingxi.com',
        'Connection': 'keep-alive',
        'referer': 'https://st.jingxi.com/pingou/taskcenter/index.html?_close=1&jxsid=16359311457293672633',
        'Content-Type': 'application/json;charset=UTF-8',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res=requests.get(url=url,headers=headers).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')


def taskGetUrl_4(functionId,token,cookie):
    url=f'https://m.jingxi.com/pgcenter/sign/{functionId}?sceneval=2&token={token}&flag=0&_stk=flag%2Csceneval%2Ctoken&_ste=1&h5st=20211103220947785%3B4806829085285162%3B10012%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3B2adf03a2058b5fc2e8b14f83f5b7728edb82d06fb602fc7be65c6a38d42dba06&sceneval=2&g_login_type=1&g_ty=ajax'
    headers={
        'Cookie': cookie,
        'Host': 'm.jingxi.com',
        'origin': 'https://st.jingxi.com',
        'Connection': 'keep-alive',
        'referer': f'https://st.jingxi.com/pingou/taskcenter/index.html?shareid={token}&mtag=139381.9.1&sharePin=1&ptag=139022.1.2&srv=jinshusongjin_https%3A%2F%2Fwq.jd.com%2Fcube%2Ffront%2FactivePublish%2Fhbwall%2F526082.html_jing',
        'Content-Type': 'application/json;charset=UTF-8',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res=requests.get(url=url,headers=headers).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')


def taskGetUrl_5(functionId,cookie):
    url=f'https://m.jingxi.com/pgcenter/active/LuckyTwistDraw?sceneval=2&active=rwjs_fk1111&activedesc=%E5%B9%B8%E8%BF%90%E6%89%AD%E8%9B%8B%E6%9C%BA%E6%8A%BD%E5%A5%96&_stk=active%2Cactivedesc%2Csceneval&_ste=1&h5st=20211103222414935%3B4806829085285162%3B10012%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3B3ea97a60e8372d14129c4b57897bc443a52e2b53505bd5ee7e1535e5fc10ac2e&_={gettimestamp()}&sceneval=2&g_login_type=1&callback=jsonpCBKF&g_ty=ls'
    headers={
        'Cookie': cookie,
        'Host': 'm.jingxi.com',
        'Connection': 'keep-alive',
        'referer': 'https://st.jingxi.com/pingou/taskcenter/lucky_twist/index.html?_close=1',
        'Content-Type': 'application/json;charset=UTF-8',
        "User-Agent": ua(),
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
    }
    for n in range(3):
        try:
            res=requests.get(url=url,headers=headers).text
            return res
        except:
            if n==2:
                msg('API请求失败，请检查网路重试❗\n')


# 任务列表
taskId_findall=re.compile(r'"taskId":(.+?),')
taskName_findall=re.compile(r'"taskName":"(.*?)"')
def QueryPgTaskCfg(cookie):
    res=taskGetUrl("QueryPgTaskCfg", cookie)
    if not res:
        return
    if taskId_list:=taskId_findall.findall(res):
        taskName_list=taskName_findall.findall(res)
        return [taskId_list,taskName_list]
    else:
        msg(f"获取数据失败\n{res}\n")


# 做任务
errMsg_findall=re.compile(r'"errMsg" : "(.*?)"')
def drawUserTask(cookie,taskId,taskName):
    msg(f"开始 {taskName}")
    res=taskGetUrl_2("drawUserTask",taskId,cookie)
    if not res:
        return
    if errMsg:=errMsg_findall.findall(res):
        if (errMsg:=errMsg[0])=='success':
            msg("任务成功")
            return True
        else:
            msg(f"任务失败\n{errMsg}\n")
    else:
        msg(f"任务失败\n{res}\n")


# 领取奖励
errMsg_findall=re.compile(r'"errMsg" : "(.*?)"')
pingouJin_findall=re.compile(r'"pingouJin" : (.*?),')
def UserTaskFinish(cookie,taskId):
    res=taskGetUrl_2("UserTaskFinish", taskId, cookie)
    if not res:
        return
    if errMsg:=errMsg_findall.findall(res):
        if (errMsg:=errMsg[0])=='success':
            msg(f"获得金币 {pingouJin_findall.findall(res)[0]}\n")
        else:
            msg(f"获取奖励失败\n{errMsg}\n")
    else:
        msg(f"获取奖励失败\n{res}\n")


#  获取助力码
token_findall=re.compile(r'"token":"(.+?)"')
def UserSignNew(cookie):
    global inviteCode_list
    res=taskGetUrl_3("UserSignNew", cookie)
    if not res:
        return  
    if token:=token_findall.findall(res):
        token=token[0]
        inviteCode_list.append(token)
        msg(f"账号 {get_pin(cookie)} 的牛牛福利社助力码为 {token}\n")
    else:
        msg(f"获取助力码失败\n{res}\n")
     
# 助力
errMsg_2_findall=re.compile(r'"errMsg":"(.*?)"')
def helpSign(cookie,token):
    msg(f'账号 {get_pin(cookie)} 去助力{token}')
    res=taskGetUrl_4('helpSign',token,cookie)
    if not res:
        return
    if errMsg:=errMsg_2_findall.findall(res):
        if (errMsg:=errMsg[0])=='success':
            msg(f"助力成功\n")
        else:
            msg(f"助力失败\n{errMsg}\n")
    else:
        msg(f"助力失败\n{res}\n")

   
# 幸运扭蛋机/抽奖
errMsg_2_findall=re.compile(r'"errMsg":"(.*?)"')
prizename_findall=re.compile(r'"prizename":"(.*?)"')
def LuckyTwistDraw(cookie):
    msg('开始抽奖')
    res=taskGetUrl_5("LuckyTwistDraw",cookie)
    if not res:
        return
    if errMsg:=errMsg_2_findall.findall(res):
        if (errMsg:=errMsg[0])=='success':
            msg(f"获得 {prizename_findall.findall(res)[0]}\n")
            return LuckyTwistDraw(cookie)
        else:
            msg(f"抽奖失败\n{errMsg}\n")
    else:
        msg(f"抽奖失败\n{res}\n")



def main():
    msg('🔔牛牛福利社，开始！\n')
    msg(f'====================共{len(cookie_list)}京东个账号Cookie=========\n')

    global inviteCode_list
    inviteCode_list=list()

    for e,cookie in enumerate(cookie_list,start=1):
        msg(f'******开始【账号 {e}】 {get_pin(cookie)} *********\n')

        a=QueryPgTaskCfg(cookie)
        if not a:
            continue
        taskId_list=a[0]
        taskName_list=a[1]

        for f,taskId in enumerate(taskId_list):
            if drawUserTask(cookie,taskId,taskName_list[f]):
                UserTaskFinish(cookie,taskId)

        UserSignNew(cookie)
        if get_env('nnfls_Lucky') != 'no':
            LuckyTwistDraw(cookie)

    msg(f'====================助力=========\n')
    for inviteCode in inviteCode_list:
        for cookie in cookie_list:
            helpSign(cookie,inviteCode)
            
    msg('作者：wuye9999\n')
    msg('地址:https://github.com/wuye999/myScripts')
    if run_send=='yes':
        send('牛牛福利社')   # 通知服务


if __name__ == '__main__':
    main()



