#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_hyj 
Author: Curtin
功能：环游记
    1、好友助力，默认按顺序助力，每个号6次助力机会
    2、浏览并关注任务
    3、待完成
Date: 2021/10/24 下午6:52
Update: 2021/10/24 下午11:52
TG交流 https://t.me/topstyle996
TG频道 https://t.me/TopStyle2021
cron: 0 0,23 * 10-11 *
new Env('环游记');
'''


# UA 可自定义你的, 默认随机生成UA。
UserAgent = ''

import os, re, sys
import random, json, time
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：pip3 install requests")
    exit(3)
from urllib.parse import unquote
##############

# requests.packages.urllib3.disable_warnings()
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep

###
def userAgent():
    """
    随机生成一个UA
    jdapp;iPhone;10.0.4;14.2;9fb54498b32e17dfc5717744b5eaecda8366223c;network/wifi;ADID/2CF597D0-10D8-4DF8-C5A2-61FD79AC8035;model/iPhone11,1;addressid/7785283669;appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1
    :return: ua
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.15(0x18000f29) NetType/WIFI Language/zh_CN'

    """
    uuid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 40))
    addressid = ''.join(random.sample('1234567898647', 10))
    iosVer = ''.join(random.sample(["14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.7", "13.1.2", "13.1.1"], 1))
    iosV = iosVer.replace('.', '_')
    iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
    ADID = ''.join(random.sample('0987654321ABCDEF', 8)) + '-' + ''.join(
        random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(
        random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 12))
    if not UserAgent:
        return f'jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/{ADID};model/iPhone{iPhone},1;addressid/{addressid};appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS {iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1'
    else:
        return UserAgent

class getJDCookie(object):
    # 适配各种平台环境ck
    def getckfile(self):
        global v4f
        curf = pwd + 'JDCookies.txt'
        v4f = '/jd/config/config.sh'
        ql_new = '/ql/config/env.sh'
        ql_old = '/ql/config/cookie.sh'
        if os.path.exists(curf):
            with open(curf, "r", encoding="utf-8") as f:
                cks = f.read()
                f.close()
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            cks = r.findall(cks)
            if len(cks) > 0:
                return curf
            else:
                pass
        if os.path.exists(ql_new):
            print("当前环境青龙面板新版")
            return ql_new
        elif os.path.exists(ql_old):
            print("当前环境青龙面板旧版")
            return ql_old
        elif os.path.exists(v4f):
            print("当前环境V4")
            return v4f
        return curf

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
                            if 'pt_key=xxxx' in i:
                                pass
                            else:
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
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback='
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': f'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn'
        }
        try:
            if sys.platform == 'ios':
                requests.packages.urllib3.disable_warnings()
                resp = requests.get(url=url, verify=False, headers=headers, timeout=60).json()
            else:
                resp = requests.get(url=url, headers=headers, timeout=60).json()
            if resp['retcode'] == "0":
                nickname = resp['data']['userInfo']['baseInfo']['nickname']
                return ck, nickname
            else:
                context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
                print(context)
                return ck, False
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


def buildHeaders(ck):
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Origin': 'https://wbbny.m.jd.com',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cookie': ck,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'User-Agent': userAgent(),
        # 'Referer': f'https://wbbny.m.jd.com/babelDiy/Zeus/2vVU4E7JLH9gKYfLQ5EVW6eN2P7B/index.html?babelChannel=jdappsyfc&shareType=taskHelp&inviteId=ZXASTT028Z1_cl4-8INRW9rJrQH-3oUxd6t1GFjRWn6u7zB55awQ&mpin=&from=sc&lng=113&lat=23&sid=&un_area=',
        'Referer': f'https://wbbny.m.jd.com/babelDiy/Zeus/2vVU4E7JLH9gKYfLQ5EVW6eN2P7B/index.html?babelChannel=jdappsyfc&shareType=taskHelp&inviteId=ZXASTT028Z1_cl4-8INRW9rJrQH-3oUxd6t1GFjRWn6u7zB55awQ&mpin=RnFsl2daPGGLzNTMDSugzOUmYgysBguS0mhHAIPkgjc&from=sc&lng=113.367454&lat=23.112787&sid=4d0c87024e75822e2940d31c251c1b0w&un_area=1_2901_55567_0',
        'Accept-Language': 'zh-cn'
    }
    return headers

def getHomeData(header):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_getHomeData'
        body = 'functionId=travel_getHomeData&body={"inviteId":""}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=header, data=body, timeout=10).json()
        secretp = resp['data']['result']['homeMainInfo']['secretp']
        return secretp
    except:
        return None

def getinviteId(ck):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_getTaskDetail'
        body = 'functionId=travel_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=buildHeaders(ck), data=body).json()
        return resp['data']['result']['inviteId']
    except:
        return 'ZXASTT018v_53RR4Y9lHfIBub1AFjRWn6u7zB55awQ'

# 获取任务list
def travel_getTaskDetail(header):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_getTaskDetail'
        body = 'functionId=travel_getTaskDetail&body={}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=header, data=body).json()
        taskVos = resp['data']['result']['taskVos']
        return taskVos
    except:
        return None
# 完成任务
def travel_collectScore(header, taskId, taskToken, secretp):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_collectScore'
        body = 'functionId=travel_collectScore&body={' + f'"taskId":"{taskId}","taskToken":"{taskToken}","actionType":1,' + f'%22ss%22:%22%7B%5C%22extraData%5C%22:%7B%5C%22log%5C%22:%5C%22%5C%22,%5C%22sceneid%5C%22:%5C%22HYJhPageh5%5C%22%7D,%5C%22secretp%5C%22:%5C%22{secretp}%5C%22,%5C%22random%5C%22:%5C%22%5C%22%7D%22%7D' + '&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=header, data=body).json()
    except:
        pass
    # print("##完成结果：", resp)
# 关注店铺
def followShop(header, shopId):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=followShop'
        body = 'functionId=followShop&body={"shopId":"'+ shopId + '","follow":true,"type":"0"}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=header, data=body).json()
        print("\t└",resp['msg'])
    except:
        pass
def qryCompositeMaterials(header, id):
    url = 'https://api.m.jd.com/client.action?functionId=qryCompositeMaterials'
    body = f'functionId=qryCompositeMaterials&body=%7B%22qryParam%22:%22%5B%7B%5C%22type%5C%22:%5C%22advertGroup%5C%22,%5C%22mapTo%5C%22:%5C%22taskPanelBanner%5C%22,%5C%22id%5C%22:%5C%22{id}%5C%22%7D%5D' +'","activityId":"2vVU4E7JLH9gKYfLQ5EVW6eN2P7B","pageId":"","reqSrc":"","applyKey":"jd_star"}&client=wh5&clientVersion=1.0.0&uuid='
    resp = requests.post(url=url, headers=header, data=body).json()
    print(resp)

def qryViewkitCallbackResult(header, taskToken):
    t = round(time.time() * 1000)
    url = 'https://api.m.jd.com/client.action?functionId=qryViewkitCallbackResult&client=wh5'
    body = 'body={"dataSource":"newshortAward","method":"getTaskAward","reqParams":"%7B%5C%22taskToken%5C%22%3A%5C%22' + taskToken + '%5C%22%7D","sdkVersion":"1.0.0","clientLanguage":"zh","onlyTimeId":' + str(t) + ',"riskParam":{"platform":"3","orgType":"2","openId":"-1","pageClickKey":"Babel_VKCoupon","eid":"","fp":"-1","shshshfp":"","shshshfpa":"","shshshfpb":"","childActivityUrl":"","userArea":"-1","client":"","clientVersion":"","uuid":"","osVersion":"","brand":"","model":"","networkType":"","jda":"-1"}}'
    resp = requests.post(url=url, headers=header, data=body).json()
    if 'success' in resp['msg']:
        print("\t\t└☺️", resp['toast']['subTitle'])
    else:
        print("\t\t└😓", resp)

def task(ck):
    header = buildHeaders(ck)
    taskVos = travel_getTaskDetail(header)
    secretp = getHomeData(header)
    for t in taskVos:
        t_status = t['status']
        if t_status == 1:
            taskId = t['taskId']
            taskType = t['taskType']
            if taskType == 7: # 浏览关注
                print("\n☺️###开始浏览关注8s任务")
                browseShopVo = t['browseShopVo']
                for o in browseShopVo:
                    if o['status'] == 1:
                        taskToken = o['taskToken']
                        shopId = o['shopId']
                        id = o['advGroupId']
                        print(f"\t└开始 {o['shopName']}")
                        followShop(header, shopId)
                        travel_collectScore(header, taskId, taskToken, secretp)
                        print("\t\t└停留8秒~")
                        time.sleep(8)
                        # qryCompositeMaterials(header, id)
                        qryViewkitCallbackResult(header, taskToken)



# 好友邀请助力
def friendsHelp(ck, inviteId, secretp, nickname):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_collectScore'
        body = 'functionId=travel_collectScore&body={"ss":"%7B%5C%22extraData%5C%22:%7B%5C%22log%5C%22:%5C%22%5C%22,%5C%22sceneid%5C%22:%5C%22HYGJZYh5%5C%22%7D,%5C%22secretp%5C%22:%5C%22'+ secretp + '%5C%22,%5C%22random%5C%22:%5C%22%5C%22%7D","inviteId":"' + inviteId + '"}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=buildHeaders(ck), data=body, timeout=10).json()
        isSuccess = resp['data']['success']
        result = resp['data']['bizMsg']
        bizCode = resp['data']['bizCode']

        if isSuccess:
            print(f"\t└😆用户【{nickname}】{result}")
        else:
            print(f"\t└😯用户【{nickname}】{result}")
        if bizCode == -201:
            return True
        else:
            return False
    except:
        pass

# 膨胀红包领取
def travel_pk_receiveAward(ck):
    try:
        url = 'https://api.m.jd.com/client.action?functionId=travel_pk_receiveAward'
        body = 'functionId=travel_pk_receiveAward&body={}&client=wh5&clientVersion=1.0.0'
        resp = requests.post(url=url, headers=buildHeaders(ck), data=body, timeout=10).json()
        print("👌成功领取红包🧧：",resp['data']['result']['value'])
    except:
        pass
# 膨胀红包助力
def travel_pk_collectPkExpandScore(ck, inviteId, secretp):
    url = 'https://api.m.jd.com/client.action?functionId=travel_pk_collectPkExpandScore'
    # body = 'functionId=travel_pk_collectPkExpandScore&body={"ss":"{\"extraData\":{\"log\":\"\",\"sceneid\":\"HYGJZYh5\"},\"secretp\":\"E7CRMI6DTcSTrabHO4r8_5la-GQ\",\"random\":\"35074436\"}","inviteId":"PKASTT018v_53RR4Y9lHfIBub1ACjRWnIaRzT0jeQOc"}&client=wh5&clientVersion=1.0.0'
    body = 'functionId=travel_pk_collectPkExpandScore&body={"ss":"%7B%5C%22extraData%5C%22:%7B%5C%22log%5C%22:%5C%22%5C%22,%5C%22sceneid%5C%22:%5C%22HYGJZYh5%5C%22%7D,%5C%22secretp%5C%22:%5C%22' + secretp + '%5C%22,%5C%22random%5C%22:%5C%22%5C%22%7D","inviteId":"' + inviteId + '"}&client=wh5&clientVersion=1.0.0'
    resp = requests.post(url=url, headers=buildHeaders(ck), data=body, timeout=10).json()
    bizCode = resp['data']['bizCode']
    bizMsg = resp['data']['bizMsg']
    print(f"\t└{bizMsg}")
    if bizCode == 103:
        return True
    else:
        return False

def start():
    try:
        scriptName = '### 环游记 ###'
        print(scriptName)
        cookiesList, userNameList, pinNameList = getCk.iscookie()
        # for ck in cookiesList:
        #     ss = 'PKASTT018v_53RR4Y9lHfIBub1ACjRWnIaRzT0jeQOc'
        #     if travel_pk_collectPkExpandScore(ck, ss, getHomeData(ck)):
        #         travel_pk_receiveAward(ck)
        # exit(3)
        for c,masterName in zip(cookiesList,userNameList):
            print(f"\n### ☺️开始助力 {masterName}")
            sharecode = getinviteId(c)
            for ck,nickname in zip(cookiesList,userNameList):
                if nickname == masterName:
                    print(f"\t└😓{masterName} 不能助力自己，跳过~")
                    continue
                if friendsHelp(ck, sharecode, getHomeData(buildHeaders(ck)), nickname):
                    print(f"\t└👌用户【{masterName}】助力任务已完成。")
                    break
            task(c)
    except Exception as e:
        print(e)

if __name__ == '__main__':
    start()

