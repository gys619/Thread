#!/bin/env python3
# -*- coding: utf-8 -*
'''
项目名称: JD-Script / jd_blueCoin
Author: Curtin
功能: 东东超市商品兑换
Date: 2021/4/17 上午11:22
update: 2021/11/08 20:30
建议cron: 59 23 * * *  python3 jd_blueCoin.py
new Env('东东超市商品兑换');
'''
################【参数】######################
# ck 优先读取【JDCookies.txt】 文件内的ck  再到 ENV的 变量 JD_COOKIE='ck1&ck2' 最后才到脚本内 cookies=ck
#ENV设置：export JD_COOKIE='cookie1&cookie2'
cookies = ''
#【填写您要兑换的商品】ENV设置： export coinToBeans='京豆包'
coinToBeans = ''

#多账号并发，默认关闭 ENV设置开启： export blueCoin_Cc=True
blueCoin_Cc = False
#单击次数，同时发生点击兑换按钮次数，适当调整。
dd_thread = 5
###############################################

import time, datetime, os, sys, random
import requests, re, json
from urllib.parse import quote, unquote
import threading
requests.packages.urllib3.disable_warnings()
try:
    from utils.JDCookie import getJDCookie
    getCk = getJDCookie()
except:
    print("请先下载依赖脚本，放至utils文件夹内，\n下载链接：https://raw.githubusercontent.com/he1pu/JDHelp/main/utils/JDCookie.py")
    sys.exit(3)

pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
# timestamp = int(round(time.time() * 1000))
script_name = '东东超市商品兑换'
title = ''
prizeId = ''
blueCost = ''
inStock = ''
UserAgent = ''
periodId = ''
#最长抢兑结束时间
endtime='00:00:10.00000000'
today = datetime.datetime.now().strftime('%Y-%m-%d')
unstartTime = datetime.datetime.now().strftime('%Y-%m-%d 23:55:00.00000000')
tomorrow = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')
starttime = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d 00:00:00.00000000')


def printf(s):
    print("[{0}]: {1}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), s))
    sys.stdout.flush()

def getEnvs(label):
    try:
        if label == 'True' or label == 'yes' or label == 'true' or label == 'Yes':
            return True
        elif label == 'False' or label == 'no' or label == 'false' or label == 'No':
            return False
    except:
        pass
    try:
        if '.' in label:
            return float(label)
        elif '&' in label:
            return label.split('&')
        elif '@' in label:
            return label.split('@')
        else:
            return int(label)
    except:
        return label




if "coinToBeans" in os.environ:
    if len(os.environ["coinToBeans"]) > 1:
        coinToBeans = os.environ["coinToBeans"]
        printf(f"已获取并使用Env环境 coinToBeans:{coinToBeans}")
if "blueCoin_Cc" in os.environ:
    if len(os.environ["blueCoin_Cc"]) > 1:
        blueCoin_Cc = getEnvs(os.environ["blueCoin_Cc"])
        printf(f"已获取并使用Env环境 blueCoin_Cc:{blueCoin_Cc}")
if "dd_thread" in os.environ:
    if len(os.environ["dd_thread"]) > 1:
        dd_thread = getEnvs(os.environ["dd_thread"])
        printf(f"已获取并使用Env环境 dd_thread:{dd_thread}")
class TaskThread(threading.Thread):
    """
    处理task相关的线程类
    """
    def __init__(self, func, args=()):
        super(TaskThread, self).__init__()
        self.func = func  # 要执行的task类型
        self.args = args  # 要传入的参数

    def run(self):
        # 线程类实例调用start()方法将执行run()方法,这里定义具体要做的异步任务
        # printf("start func {}".format(self.func.__name__))  # 打印task名字　用方法名.__name__
        self.result = self.func(*self.args)  # 将任务执行结果赋值给self.result变量

    def get_result(self):
        # 改方法返回task函数的执行结果,方法名不是非要get_result
        try:
            return self.result
        except Exception as ex:
            printf(ex)
            return "ERROR"

def userAgent():
    """
    随机生成一个UA
    :return: jdapp;iPhone;9.4.8;14.3;xxxx;network/wifi;ADID/201EDE7F-5111-49E8-9F0D-CCF9677CD6FE;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone13,4;addressid/2455696156;supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1
    """
    if not UserAgent:
        uuid = ''.join(random.sample('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 40))
        addressid = ''.join(random.sample('1234567898647', 10))
        iosVer = ''.join(
            random.sample(["14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.7", "13.1.2", "13.1.1"], 1))
        iosV = iosVer.replace('.', '_')
        iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
        ADID = ''.join(random.sample('0987654321ABCDEF', 8)) + '-' + ''.join(
            random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(
            random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 12))
        return f'jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/{ADID};supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone{iPhone},1;addressid/{addressid};supportBestPay/0;appBuild/167629;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS {iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    else:
        return UserAgent

## 获取通知服务
class msg(object):
    def __init__(self, m=''):
        self.str_msg = m
        self.message()
    def message(self):
        global msg_info
        printf(self.str_msg)
        try:
            msg_info = "{}\n{}".format(msg_info, self.str_msg)
        except:
            msg_info = "{}".format(self.str_msg)
        sys.stdout.flush()
    def getsendNotify(self, a=0):
        if a == 0:
            a += 1
        try:
            url = 'https://gitee.com/curtinlv/Public/raw/master/sendNotify.py'
            response = requests.get(url)
            if 'curtinlv' in response.text:
                with open('sendNotify.py', "w+", encoding="utf-8") as f:
                    f.write(response.text)
            else:
                if a < 5:
                    a += 1
                    return self.getsendNotify(a)
                else:
                    pass
        except:
            if a < 5:
                a += 1
                return self.getsendNotify(a)
            else:
                pass
    def main(self):
        global send
        cur_path = os.path.abspath(os.path.dirname(__file__))
        sys.path.append(cur_path)
        if os.path.exists(cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except:
                self.getsendNotify()
                try:
                    from sendNotify import send
                except:
                    printf("加载通知服务失败~")
        else:
            self.getsendNotify()
            try:
                from sendNotify import send
            except:
                printf("加载通知服务失败~")
        ###################
msg().main()


def setHeaders(cookie):
    headers = {
        'Origin': 'https://jdsupermarket.jd.com',
        'Cookie': cookie,
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://jdsupermarket.jd.com/game/?tt={}'.format(int(round(time.time() * 1000))-314),
        'Host': 'api.m.jd.com',
        'User-Agent': userAgent(),
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn'
    }
    return headers

#查询东东超市蓝币数量
def getBlueCoinInfo(headers):
    try:
        url='https://api.m.jd.com/api?appid=jdsupermarket&functionId=smtg_newHome&clientVersion=8.0.0&client=m&body=%7B%22channel%22:%2218%22%7D&t={0}'.format(int(round(time.time() * 1000)))
        respon = requests.get(url=url, verify=False, headers=headers)
        result = respon.json()
        if result['data']['bizCode'] == 0:
            totalBlue = result['data']['result']['totalBlue']
            shopName = result['data']['result']['shopName']
            return totalBlue, shopName
        else:
            totalBlue = 0
            shopName = result['data']['bizMsg']
            return totalBlue, shopName
    except Exception as e:
        printf(e)


#查询所有用户蓝币、等级
def getAllUserInfo(userName):
    id_num = 1
    for ck in cookies:
        headers = setHeaders(ck)
        try:
            totalBlue,shopName = getBlueCoinInfo(headers)
            url = 'https://api.m.jd.com/api?appid=jdsupermarket&functionId=smtg_receiveCoin&clientVersion=8.0.0&client=m&body=%7B%22type%22:4,%22channel%22:%2218%22%7D&t={0}'.format(int(round(time.time() * 1000)))
            respon = requests.get(url=url, verify=False,  headers=headers)
            result = respon.json()
            level = result['data']['result']['level']
            printf("【用户{4}:{5}】: {0} {3}\n【等级】: {1}\n【蓝币】: {2}万\n------------------".format(shopName, level, totalBlue / 10000,totalBlue, id_num,userName))
        except Exception as e:
            # printf(e)
            printf(f"账号{id_num}【{userName}】异常请检查ck是否正常~")
        id_num += 1
#查询商品
def smtg_queryPrize(headers, coinToBeans):
    url = 'https://api.m.jd.com/api?appid=jdsupermarket&functionId=smt_queryPrizeAreas&clientVersion=8.0.0&client=m&body=%7B%22channel%22:%2218%22%7D&t={}'.format(int(round(time.time() * 1000)))
    try:
        respone = requests.get(url=url, verify=False, headers=headers)
        result = respone.json()
        allAreas = result['data']['result']['areas']
        for alist in allAreas:
            for x in alist['prizes']:
                if coinToBeans in x['name']:
                    areaId = alist['areaId']
                    periodId = alist['periodId']
                    if alist['areaId'] != 6:
                        skuId = x['skuId']
                    else:
                        skuId = 0
                    title = x['name']
                    prizeId = x['prizeId']
                    blueCost = x['cost']
                    status = x['status']
                    return title, prizeId, blueCost, status, skuId, areaId, periodId
        # printf("请检查设置的兑换商品名称是否正确？")
        # return 0, 0, 0, 0, 0
    except Exception as e:
        printf(e)


#判断设置的商品是否存在 存在则返回 商品标题、prizeId、蓝币价格、是否有货
def isCoinToBeans(coinToBeans,headers):
    if coinToBeans.strip() != '':
        try:
            title, prizeId, blueCost, status, skuId, areaId, periodId = smtg_queryPrize(headers,coinToBeans)
            return title, prizeId, blueCost, status, skuId, areaId, periodId
        except Exception as e:
            printf(e)
            pass
    else:
        printf("1.请检查设置的兑换商品名称是否正确?")
        exit(0)
#抢兑换
def smtg_obtainPrize(prizeId, areaId, periodId, headers, username):
    body = {
        "connectId": prizeId,
        "areaId": areaId,
        "periodId": periodId,
        "informationParam": {
            "eid": "",
            "referUrl": -1,
            "shshshfp": "",
            "openId": -1,
            "isRvc": 0,
            "fp": -1,
            "shshshfpa": "",
            "shshshfpb": "",
            "userAgent": -1
        },
        "channel": "18"
    }

    timestamp = int(round(time.time() * 1000))
    url = f'https://api.m.jd.com/api?appid=jdsupermarket&functionId=smt_exchangePrize&clientVersion=8.0.0&client=m&body={quote(json.dumps(body))}&t={timestamp}'
    try:
        respon = requests.post(url=url, verify=False, headers=headers)
        result = respon.json()
        printf(result)
        success = result['data']['success']
        bizMsg = result['data']['bizMsg']
        if success:
            printf(f"【{username}】{bizMsg}...恭喜兑换成功！")
            return 0
        else:
            printf(f"【{username}】{bizMsg}")
            return 999
    except Exception as e:
        printf(e)
        return 999


def issmtg_obtainPrize(ck, user_num, prizeId, areaId, periodId, title):

    try:
        userName = userNameList[cookiesList.index(ck)]
        t_num = range(dd_thread)
        threads = []
        for t in t_num:
            thread = TaskThread(smtg_obtainPrize, args=(prizeId, areaId, periodId, setHeaders(ck), userName))
            threads.append(thread)
            thread.start()
        for thread in threads:
            thread.join()
            result = thread.get_result()
            if result == 0:
                msg(f"账号{user_num}：{userName} 成功兑换【{title}】")
                return 0
        nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f8')
        if nowtime > qgendtime:
            title, prizeId, blueCost, status, skuId, areaId, periodId = isCoinToBeans(coinToBeans, setHeaders(ck))
            if status == 2:
                printf("{1}, 你好呀~【{0}】 当前没货了......".format(title, userName))
                return 2
            else:
                return 0
        else:
            return 0


    except Exception as e:
        printf(e)
        return 1

def checkUser(cookies,): #返回符合条件的ck list
    global title, prizeId, blueCost, status, skuId, areaId, periodId
    cookieList=[]
    user_num=1
    a = 0
    for i in cookies:
        headers = setHeaders(i)
        userName = userNameList[cookiesList.index(i)]
        try:
            totalBlue, shopName = getBlueCoinInfo(headers)
            if totalBlue != 0:
                if a == 0:
                    a = 1
                    title, prizeId, blueCost, status, skuId, areaId, periodId = isCoinToBeans(coinToBeans,headers)
            totalBlueW = totalBlue / 10000
            if user_num == 1:
                printf("您已设置兑换的商品：【{0}】 需要{1}w蓝币".format(title, blueCost / 10000))
                printf("********** 首先检测您是否有钱呀 ********** ")
            if totalBlue > blueCost:
                cookieList.append(i)
                printf(f"账号{user_num}:【{userName}】蓝币:{totalBlueW}万...yes")
            else:
                printf(f"账号{user_num}:【{userName}】蓝币:{totalBlueW}万...no")
        except Exception as e:
            printf(f"账号{user_num}:【{userName}】，该用户异常，查不到商品关键词【{coinToBeans}】")
        user_num += 1

    if len(cookieList) >0:
        printf("共有{0}个账号符合兑换条件".format(len(cookieList)))
        return cookieList
    else:
        printf("共有{0}个账号符合兑换条件...已退出，请继续加油赚够钱再来~".format(len(cookieList)))
        exit(0)

#Start
def start():
    try:
        global cookiesList, userNameList, cookies, qgendtime
        printf("{} Start".format(script_name))
        cookiesList, userNameList = getCk.iscookie()
        cookies = checkUser(cookiesList)
        qgendtime = '{} {}'.format(tomorrow, endtime)
        if blueCoin_Cc:
            msg("并发模式：多账号")
        else:
            msg("并发模式：单账号")
        printf(f"开始抢兑时间[{starttime}]")
        a = 0
        while True:
            nowtime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f8')
            if nowtime > starttime:
                if blueCoin_Cc:
                    ttt = []
                    user_num = 1
                    for ck in cookies:
                        thread = TaskThread(issmtg_obtainPrize, args=(ck, user_num, prizeId, areaId, periodId, title))
                        ttt.append(thread)
                        thread.start()
                        user_num += 1
                    for thread in ttt:
                        thread.join()
                        result = thread.get_result()
                        if result == 2:
                            break
                    if result == 2:
                        break
                else:
                    user_num = 1
                    for ck in cookies:
                        response = issmtg_obtainPrize(ck, user_num, prizeId, areaId, periodId, title)
                        user_num += 1
                        if response == 2:
                            break
                    if response == 2:
                        break
            elif nowtime > qgendtime:
                break
            elif nowtime < unstartTime:
                printf("Sorry，还没到时间。")
                printf("建议cron: 59 23 * * *  python3 jd_blueCoin.py")
                break
            else:
                if a == 0:
                    a = 1
                    printf(f"正在等待，请勿终止退出...")
    except Exception as e:
        printf(e)
if __name__ == '__main__':
    start()
    try:
        if '成功兑换' in msg_info:
            send(script_name, msg_info)
    except:
        pass
