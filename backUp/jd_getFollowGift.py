#!/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_getFollowGift 
Author: Curtin
功能：
Date: 2021/6/6 上午7:57
建议cron: 0 9 * * *  python3 jd_getFollowGift.py
new Env('关注有礼');
'''
##################################
#cookie填写，注意：#ck 优先读取【JDCookies.txt】 文件内的ck  再到 ENV的 变量 JD_COOKIE='ck1&ck2' 最后才到脚本内 cookies=ck
cookies = ''
#TG 推送
# tg机器人token
TG_BOT_TOKEN = ''
#tg用户id
TG_USER_ID = ''
TG_PROXY_IP = ''
TG_PROXY_PORT = ''
TG_API_HOST = ''
#微信推送加
PUSH_PLUS_TOKEN = ''
#Bark 推送
BARK = ''
#企业微信推送
QYWX_AM = ''

#######################################
version = 'v1.0.0 Beta'
readmes = """
# JD 关注有礼

# 
    @Last Version: %s

    @Last Time: 2021-06-06 07:57

    @Author: Curtin
#### **仅以学习交流为主，请勿商业用途、禁止违反国家法律!** 

# End.
[回到顶部](#readme)
""" % version

################################ 【Main】################################
import time, os, sys, datetime
import requests
import re, json, base64
from urllib.parse import unquote, quote_plus

# 获取当前工作目录
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep

# 定义一些要用到参数
requests.packages.urllib3.disable_warnings()
scriptHeader = """
════════════════════════════════════════
║                                      ║
║      JD   关   注   有   礼           ║
║                                      ║
════════════════════════════════════════
@Version: {}""".format(version)
remarks = ''
######JD Cookie (多账号&分隔)




#######
notify_mode = []
message_info = ''''''
usergetGiftinfo = {}



class getJDCookie(object):
    # 适配各种平台环境ck
    def getckfile(self):
        if os.path.exists(pwd + 'JDCookies.txt'):
            return pwd + 'JDCookies.txt'
        elif os.path.exists('/ql/config/env.sh'):
            print("当前环境青龙面板新版")
            return '/ql/config/env.sh'
        elif os.path.exists('/ql/config/cookie.sh'):
            print("当前环境青龙面板旧版")
            return '/ql/config/env.sh'
        elif os.path.exists('/jd/config/config.sh'):
            print("当前环境V4")
            return '/jd/config/config.sh'
        elif os.path.exists(pwd + 'JDCookies.txt'):
            return pwd + 'JDCookies.txt'
        return pwd + 'JDCookies.txt'

    # 获取cookie
    def getCookie(self):
        global cookies
        ckfile = self.getckfile()
        try:
            if os.path.exists(ckfile):
                with open(ckfile, "r", encoding="utf-8") as f:
                    cks = f.read()
                    f.close()
                if 'pt_key=' in cks and 'pt_pin=' in cks:
                    r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
                    cks = r.findall(cks)
                    if len(cks) > 0:
                        if 'JDCookies.txt' in ckfile:
                            print("当前获取使用 JDCookies.txt 的cookie")
                        cookies = ''
                        for i in cks:
                            cookies += i
                        return
            else:
                with open(pwd + 'JDCookies.txt', "w", encoding="utf-8") as f:
                    cks = "#多账号换行，以下示例：（通过正则获取此文件的ck，理论上可以自定义名字标记ck，也可以随意摆放ck）\n账号1【Curtinlv】cookie1;\n账号2【TopStyle】cookie2;"
                    f.write(cks)
                    f.close()
            if "JD_COOKIE" in os.environ:
                if len(os.environ["JD_COOKIE"]) > 10:
                    cookies = os.environ["JD_COOKIE"]
                    print("已获取并使用Env环境 Cookie")
        except Exception as e:
            print(f"【getCookie Error】{e}")

    # 检测cookie格式是否正确
    def getUserInfo(self, ck, pinName, userNum):
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion'
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Accept-Language': 'gzip, deflate, br'
        }
        try:
            resp = requests.get(url=url, verify=False, headers=headers, timeout=60).text
            #r = re.compile(r'GetJDUserInfoUnion.*?\((.*?)\)')
            #result = r.findall(resp)
            userInfo = json.loads(resp)
            nickname = userInfo['data']['userInfo']['baseInfo']['nickname']
            return ck, nickname
        except Exception:
            context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
            print(context)
            return ck, False

    def iscookie(self):
        """
        :return: cookiesList,userNameList,pinNameList
        """
        cookiesList = []
        userNameList = []
        pinNameList = []
        if 'pt_key=' in cookies and 'pt_pin=' in cookies:
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            result = r.findall(cookies)
            if len(result) >= 1:
                print("您已配置{}个账号".format(len(result)))
                u = 1
                for i in result:
                    r = re.compile(r"pt_pin=(.*?);")
                    pinName = r.findall(i)
                    pinName = unquote(pinName[0])
                    # 获取账号名
                    ck, nickname = self.getUserInfo(i, pinName, u)
                    if nickname != False:
                        cookiesList.append(ck)
                        userNameList.append(nickname)
                        pinNameList.append(pinName)
                    else:
                        u += 1
                        continue
                    u += 1
                if len(cookiesList) > 0 and len(userNameList) > 0:
                    return cookiesList, userNameList, pinNameList
                else:
                    print("没有可用Cookie，已退出")
                    exit(3)
            else:
                print("cookie 格式错误！...本次操作已退出")
                exit(4)
        else:
            print("cookie 格式错误！...本次操作已退出")
            exit(4)
getCk = getJDCookie()
getCk.getCookie()


# 获取TG_BOT_TOKEN
if "TG_BOT_TOKEN" in os.environ:
    if len(os.environ["TG_BOT_TOKEN"]) > 1:
        TG_BOT_TOKEN = os.environ["TG_BOT_TOKEN"]
        print("已获取并使用Env环境 TG_BOT_TOKEN")
# 获取TG_USER_ID
if "TG_USER_ID" in os.environ:
    if len(os.environ["TG_USER_ID"]) > 1:
        TG_USER_ID = os.environ["TG_USER_ID"]
        print("已获取并使用Env环境 TG_USER_ID")
# 获取代理ip
if "TG_PROXY_IP" in os.environ:
    if len(os.environ["TG_PROXY_IP"]) > 1:
        TG_PROXY_IP = os.environ["TG_PROXY_IP"]
        print("已获取并使用Env环境 TG_PROXY_IP")
# 获取TG 代理端口
if "TG_PROXY_PORT" in os.environ:
    if len(os.environ["TG_PROXY_PORT"]) > 1:
        TG_PROXY_PORT = os.environ["TG_PROXY_PORT"]
        print("已获取并使用Env环境 TG_PROXY_PORT")
    elif not TG_PROXY_PORT:
        TG_PROXY_PORT = ''
# 获取TG TG_API_HOST
if "TG_API_HOST" in os.environ:
    if len(os.environ["TG_API_HOST"]) > 1:
        TG_API_HOST = os.environ["TG_API_HOST"]
        print("已获取并使用Env环境 TG_API_HOST")
# 获取pushplus+ PUSH_PLUS_TOKEN
if "PUSH_PLUS_TOKEN" in os.environ:
    if len(os.environ["PUSH_PLUS_TOKEN"]) > 1:
        PUSH_PLUS_TOKEN = os.environ["PUSH_PLUS_TOKEN"]
        print("已获取并使用Env环境 PUSH_PLUS_TOKEN")
# 获取企业微信应用推送 QYWX_AM
if "QYWX_AM" in os.environ:
    if len(os.environ["QYWX_AM"]) > 1:
        QYWX_AM = os.environ["QYWX_AM"]
        print("已获取并使用Env环境 QYWX_AM")
if "BARK" in os.environ:
    if len(os.environ["BARK"]) > 1:
        BARK = os.environ["BARK"]
        print("已获取并使用Env环境 BARK")



def message(str_msg):
    global message_info
    print(str_msg)
    message_info = "{}\n{}".format(message_info,str_msg)
    sys.stdout.flush()

def exitCodeFun(code):
    try:
        # exitCode = input()
        if sys.platform == 'win32' or sys.platform == 'cygwin':
            print("进程睡眠10分钟后自动退出。")
            time.sleep(600)
        exit(code)
    except:
        time.sleep(3)
        exit(code)

def nowtime():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

#获取通知，
if PUSH_PLUS_TOKEN:
    notify_mode.append('pushplus')
if TG_BOT_TOKEN and TG_USER_ID:
    notify_mode.append('telegram_bot')
if BARK:
    notify_mode.append('bark')
if QYWX_AM:
    notify_mode.append('wecom_app')
#tg通知
def telegram_bot(title, content):
    try:
        print("\n")
        bot_token = TG_BOT_TOKEN
        user_id = TG_USER_ID
        if not bot_token or not user_id:
            print("tg服务的bot_token或者user_id未设置!!\n取消推送")
            return
        print("tg服务启动")
        if TG_API_HOST:
            url = f"{TG_API_HOST}/bot{TG_BOT_TOKEN}/sendMessage"
        else:
            url = f"https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage"

        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        payload = {'chat_id': str(TG_USER_ID), 'text': f'{title}\n\n{content}', 'disable_web_page_preview': 'true'}
        proxies = None
        if TG_PROXY_IP and TG_PROXY_PORT:
            proxyStr = "http://{}:{}".format(TG_PROXY_IP, TG_PROXY_PORT)
            proxies = {"http": proxyStr, "https": proxyStr}
        try:
            response = requests.post(url=url, headers=headers, params=payload, proxies=proxies).json()
        except:
            print('推送失败！')
        if response['ok']:
            print('推送成功！')
        else:
            print('推送失败！')
    except Exception as e:
        print(e)

# 企业微信 APP 推送
def wecom_app(title, content):
    try:
        if not QYWX_AM:
            print("QYWX_AM 并未设置！！\n取消推送")
            return
        QYWX_AM_AY = re.split(',',QYWX_AM)
        if 4 < len(QYWX_AM_AY) > 5:
            print("QYWX_AM 设置错误！！\n取消推送")
            return
        corpid=QYWX_AM_AY[0]
        corpsecret=QYWX_AM_AY[1]
        touser=QYWX_AM_AY[2]
        agentid=QYWX_AM_AY[3]
        try:
            media_id=QYWX_AM_AY[4]
        except :
            media_id=''
        wx=WeCom(corpid, corpsecret, agentid)
        # 如果没有配置 media_id 默认就以 text 方式发送
        if not media_id:
            message=title + '\n\n' + content
            response=wx.send_text(message, touser)
        else:
            response=wx.send_mpnews(title, content, media_id, touser)
        if response == 'ok':
            print('推送成功！')
        else:
            print('推送失败！错误信息如下：\n',response)
    except Exception as e:
        print(e)

class WeCom:
    def __init__(self, corpid, corpsecret, agentid):
        self.CORPID = corpid
        self.CORPSECRET = corpsecret
        self.AGENTID = agentid
    def get_access_token(self):
        url = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken'
        values = {'corpid': self.CORPID,
                  'corpsecret': self.CORPSECRET,
                  }
        req = requests.post(url, params=values)
        data = json.loads(req.text)
        return data["access_token"]
    def send_text(self, message, touser="@all"):
        send_url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + self.get_access_token()
        send_values = {
            "touser": touser,
            "msgtype": "text",
            "agentid": self.AGENTID,
            "text": {
                "content": message
                },
            "safe": "0"
            }
        send_msges=(bytes(json.dumps(send_values), 'utf-8'))
        respone = requests.post(send_url, send_msges)
        respone = respone.json()
        return respone["errmsg"]
    def send_mpnews(self, title, message, media_id, touser="@all"):
        send_url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=' + self.get_access_token()
        send_values = {
            "touser": touser,
            "msgtype": "mpnews",
            "agentid": self.AGENTID,
            "mpnews": {
               "articles":[
                   {
                       "title": title,
                       "thumb_media_id": media_id,
                       "author": "Author",
                       "content_source_url": "",
                       "content": message.replace('\n','<br/>'),
                       "digest": message
                    }
               ]
            }
        }
        send_msges=(bytes(json.dumps(send_values), 'utf-8'))
        respone = requests.post(send_url, send_msges)
        respone = respone.json()
        return respone["errmsg"]
#push推送
def pushplus_bot(title, content):
    try:
        print("\n")
        if not PUSH_PLUS_TOKEN:
            print("PUSHPLUS服务的token未设置!!\n取消推送")
            return
        print("PUSHPLUS服务启动")
        url = 'http://www.pushplus.plus/send'
        data = {
            "token": PUSH_PLUS_TOKEN,
            "title": title,
            "content": content
        }
        body = json.dumps(data).encode(encoding='utf-8')
        headers = {'Content-Type':'application/json'}
        response = requests.post(url=url, data=body, headers=headers).json()
        if response['code'] == 200:
            print('推送成功！')
        else:
            print('推送失败！')
    except Exception as e:
        print(e)
# BARK
def bark_push(title, content):
    print("\n")
    if not BARK:
        print("bark服务的bark_token未设置!!\n取消推送")
        return
    print("bark服务启动")
    try:
        response = requests.get('''https://api.day.app/{0}/{1}/{2}'''.format(BARK,title,quote_plus(content))).json()
        if response['code'] == 200:
            print('推送成功！')
        else:
            print('推送失败！')
    except Exception as e:
        print(e)
        print('Bark推送失败！')

def send(title, content):
    """
    使用 bark, telegram bot, dingding bot, serverJ 发送手机推送
    :param title:
    :param content:
    :return:
    """
    content = content + "\n\n" + footer
    for i in notify_mode:

        if i == 'telegram_bot':
            if TG_BOT_TOKEN and TG_USER_ID:
                telegram_bot(title=title, content=content)
            else:
                print('未启用 telegram机器人')
            continue
        elif i == 'pushplus':
            if PUSH_PLUS_TOKEN:
                pushplus_bot(title=title, content=content)
            else:
                print('未启用 PUSHPLUS机器人')
            continue
        elif i == 'bark':
            if BARK:
                bark_push(title=title, content=content)
            else:
                print('未启用Bark APP应用消息推送')
            continue
        elif i == 'wecom_app':
            if QYWX_AM:
                wecom_app(title=title, content=content)
            else:
                print('未启用企业微信应用消息推送')
            continue
        else:
            print('此类推送方式不存在')




# 检查是否有更新版本

def gettext(url):
    try:
        resp = requests.get(url, timeout=60).text
        if '该内容无法显示' in resp or '违规' in resp:
            return gettext(url)
        return resp
    except Exception as e:
        print(e)


def isUpdate():
    global footer,readme,uPversion,scriptName
    url = base64.decodebytes(
        b"aHR0cHM6Ly9naXRlZS5jb20vY3VydGlubHYvUHVibGljL3Jhdy9tYXN0ZXIvRm9sbG93R2lmdHMvdXBkYXRlLmpzb24=")
    try:
        result = gettext(url)
        result = json.loads(result)
        scriptName = result['name']
        isEnable = result['isEnable']
        uPversion = result['version']
        info = result['info']
        readme = ""
        pError = result['m']
        footer = ""
        getWait = result['s']
        if isEnable > 50 and isEnable < 150:
            if version != uPversion:
                print(f"\n当前最新版本：【{uPversion}】\n\n{info}\n")
                message(f"{readme}")
                exitCodeFun(888)
            else:
                message(f"{readme}")
                time.sleep(getWait)
        else:
            print(pError)
            exitCodeFun(888)

    except:
        message("请检查您的环境/版本是否正常！")
        exitCodeFun(888)

def outfile(filename, context):
    with open(filename, "w+", encoding="utf-8") as f1:
        f1.write(context)
        f1.close()


def getRemoteShopid():
    url = base64.decodebytes(
        b"aHR0cHM6Ly9naXRlZS5jb20vY3VydGlubHYvUHVibGljL3Jhdy9tYXN0ZXIvRm9sbG93R2lmdHMvc2hvcGlkLnR4dA==")
    try:
        rShopid = gettext(url)
        rShopid = rShopid.split("\n")
        return rShopid
    except:
        print("无法从远程获取shopid")
        exitCodeFun(999)
def createShopidList():
    global shopidNum ,shopidList
    shopidList = []
    shopids = getRemoteShopid()
    shopidNum = len(shopids) - 1
    for i in range(shopidNum):
        shopid = shopids[i]
        shopid = eval(shopid)
        shopidList.append(shopid)
def memoryFun(pinName,bean):
    global usergetGiftinfo
    try:
        try:

            usergetGiftinfo['{}'.format(pinName)]
            usergetGiftinfo['{}'.format(pinName)] += bean
        except:
            usergetGiftinfo['{}'.format(pinName)] = bean
    except Exception as e:
        print(e)

def buildBody(data):
    shopid = data['shopid']
    venderId = data['venderId']
    activityId = data['activityId']
    signbody = data['signbody']
    body = 'body={"follow":0,"shopId":"' + shopid + '","activityId":"' + activityId + '","sourceRpc":"shop_app_home_window","venderId":"'+ venderId + '"}&build=167863&client=apple&clientVersion=10.2.2&d_brand=apple&d_model=iPhone8,1&ef=1&eid=&ep={"ciphertype":5,"cipher":{"screen":"DzUmAtOzCzG=","area":"CJvpCJYmCV8zDtCzXzYzCtGz","wifiBssid":"","osVersion":"CJCkDm==","uuid":"aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09","adid":"","openudid":"Y2O2ZWS5CWO4ENrsZJG4EQYnEJHsEWG5CtO2Y2Y3CJPuZNPsCtSnYG=="},"ts":1636156765,"hdid":"","version":"","appname":"","ridx":-1}&' + signbody
    return body

def drawShopGift(cookie, data):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=drawShopGift'
        body = data
        headers = {
            'J-E-H' : '%7B%22ciphertype%22:5,%22cipher%22:%7B%22User-Agent%22:%22IuG0aVLeb25vBzO2Dzq2CyUyCMrfUQrlbwU7TJSmaU9JTJSmCJCkDzivCtLJY2PiZI8yBtKmAG==%22%7D,%22ts%22:1636156765,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdmobile%22,%22ridx%22:-1%7D',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': cookie,
            'Connection': 'close',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Host': 'api.m.jd.com',
            'User-Agent': 'JD4iPhone/167685 (iPhone; iOS 14.3; Scale/3.00)',
            'Referer': '',
            'J-E-C' : '%7B%22ciphertype%22:5,%22cipher%22:%7B%22pin%22:%22TUU5TJuyTJvQTUU3TUOnTJu1TUU1TUSmTUSnTUU2TJu4TUPQTUU0TUS4TJrOTUU1TUSmTJq2TUU1TUSmTUSn%22%7D,%22ts%22:1636157606,%22hdid%22:%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=%22,%22version%22:%221.0.3%22,%22appname%22:%22com.360buy.jdmobile%22,%22ridx%22:-1%7D',
            'Accept-Language': 'zh-Hans-CN;q=1'
        }
        response = requests.post(url, headers=headers, verify=False, data=body, timeout=60)
        if 'isSuccess' in response.text:
            return response.json()
        else:
            return 9
    except Exception as e:
        print(e)
        return 9
def getGiftresult(result, nickname, pinName, uNum):
    try:
        if result['isSuccess']:
            if result['result']:
                followDesc = result['result']['followDesc']
                giftDesc = result['result']['giftDesc']
                print(f"\t└账号{uNum}【{nickname}】{followDesc}>{giftDesc}")
                if result['result']['giftCode'] == '200':
                    try:
                        alreadyReceivedGifts = result['result']['alreadyReceivedGifts']
                        for g in alreadyReceivedGifts:
                            if g['prizeType'] == 4:
                                bean = g['redWord']
                                memoryFun(pinName, int(bean))
                            print(f"\t\t└获得{g['rearWord']}:{g['redWord']}")
                    except:
                        pass
    except Exception as e:
        print(f"getGiftresult Error {e}")


def start():
    print(scriptHeader)
    isUpdate()
    outfile("Readme.md", readmes)
    cookiesList, userNameList, pinNameList = getCk.iscookie()
    userNum = len(cookiesList)
    message(f"有效账号{userNum}个")
    message(f"开始：{scriptName}")
    createShopidList()
    message(f"获取到店铺：{shopidNum}")
    # print(shopidList)
    starttime = time.perf_counter()  # 记录时间开始
    for i in shopidList:
        body = buildBody(i)
        print(f"关注店铺【{i['shopid']}】")
        uNum = 1
        for ck, nickname, pinName in zip(cookiesList, userNameList, pinNameList):
           result = drawShopGift(ck, body)
           if result != 9:
               getGiftresult(result, nickname, pinName, uNum)
           else:
               uNum += 1
               break
           uNum += 1
    endtime = time.perf_counter()  # 记录时间结束
    message("\n###【本次统计 {}】###\n".format(nowtime()))
    all_get_bean = 0
    n = 1
    for name, pinname in zip(userNameList, pinNameList):
        try:
            userCountBean = usergetGiftinfo['{}'.format(pinname)]
            message(f"账号{n}:【{name}】\n\t└收获 {userCountBean} 京豆")
            all_get_bean += userCountBean
        except Exception as e:
            message(f"账号{n}:【{name}】\n\t└收获 0 京豆")
        n += 1
    message(f"\n本次总累计获得：{all_get_bean} 京豆")
    message("\n------- 总耗时 : %.03f 秒 seconds -------" % (endtime - starttime))
    print("{0}\n{1}\n{2}".format("*" * 30, scriptHeader, remarks))
    send(f"【{scriptName}】", message_info)
    exitCodeFun(0)

if __name__ == '__main__':
    start()
