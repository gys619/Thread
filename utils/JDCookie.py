#!/usr/bin/env python3
# -*- coding: utf-8 -*
'''
### 获取Cookie

# cookie格式：pt_key=xxx;pt_pin=xxx;

# 优先读取顺序：
    1、JDcookies.txt （多账号一行一个，由正则获取）
    2、系统变量或面板配置文件

# 调用方法：
    from jd_cookie import getJDCookie
    # 启动获取cookie方法
    getCk = getJDCookie()
    # 获取ck列表、用户名列表
    cookiesList, pinNameList = getCk.iscookie()

# 关闭cookie有效检测：
export JD_COOKIE_CHECK="false"

'''
import os, re, sys
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
from urllib.parse import unquote
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
cookies = ''

if "JD_COOKIE_CHECK" in os.environ:
    if len(os.environ["JD_COOKIE_CHECK"]) > 1:
        JD_COOKIE_CHECK = os.environ["JD_COOKIE_CHECK"]
else:
    JD_COOKIE_CHECK = "true"

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
        url = 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder'
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn'
        }
        try:
            if sys.platform == 'ios':
                requests.packages.urllib3.disable_warnings()
                resp = requests.get(url=url, verify=False, headers=headers, timeout=60).json()
            else:
                resp = requests.get(url=url, headers=headers, timeout=60).json()

            if resp['retcode'] == 0:
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
        self.getCookie()
        cookiesList = []
        userNameList = []
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
                    if JD_COOKIE_CHECK == "true":
                    # 获取账号名
                        ck, nickname = self.getUserInfo(i, pinName, u)
                        if nickname != False:
                            cookiesList.append(ck)
                            userNameList.append(nickname)
                        else:
                            u += 1
                            continue
                        u += 1
                    else:
                        cookiesList.append(i)
                        userNameList.append(pinName)

                if len(cookiesList) > 0 and len(userNameList) > 0:
                    return cookiesList, userNameList
                else:
                    print("没有可用Cookie，已退出")
                    print("\n如果您的cookie正常，可跳过ck检测。\n设置 export JD_COOKIE_CHECK=\"false\"")
                    exit(3)
            else:
                print("cookie 格式错误！...本次操作已退出")
                exit(4)
        else:
            print("cookie 格式错误！...本次操作已退出")
            exit(4)


if __name__ == '__main__':
    getCk = getJDCookie()
    cookiesList, pinNameList = getCk.iscookie()
    a = 1
    if os.path.exists("ok_cookies.txt"):
        os.remove("ok_cookies.txt")
    for ck, pin in zip(cookiesList, pinNameList):
        with open('ok_cookies.txt', "a+", encoding="utf-8") as f:
            f.write(f"{a}, {pin}, {ck}\n")
        a += 1
    print("可用cookie：", len(cookiesList))
