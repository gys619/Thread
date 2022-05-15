#!/bin/env python3
# -*- coding: utf-8 -*
'''

感谢CurtinLV提供的其他脚本供我参考
感谢aburd ch大佬的指导抓包
项目名称:jd_health_exchange.py
Author: 一风一燕
功能：健康兑换
Date: 2021-12-19
cron: 1 0 0 * * * jd_health_exchange.py
new Env('健康兑换');

2022-1-7 updata:兑换改版，更新脚本

2022-1-9 updata:
更新多线程兑换，对于exchange_jkd_numb=4的人更加友好。


****************滴滴出行APP*******************


【教程】：

青龙变量exchange_jkd_numb="1"的话，兑换100健康豆，1福利金
青龙变量exchange_jkd_numb="2"的话，兑换5000健康豆，50福利金
青龙变量exchange_jkd_numb="3"的话，兑换10000健康豆，100福利金
青龙变量exchange_jkd_numb="4"的话，兑换150000健康豆，150福利金

需要自行用手机抓取Didi_jifen_token。
在青龙变量中添加变量Didi_jifen_token
多个账号时，Didi_jifen_token，用&隔开，例如Didi_jifen_token="xxxxx&xxxx"

手机抓包后，手动点击多看多赚，签到一次后，查看URL，https://res.xiaojukeji.com/sigma/api/step/sign/v2?wsgsig=
再查看表头，ticket就是需要抓的变量了

在青龙变量中添加变量Didi_jifen_token="xxxx",xxx就是上面抓的ticker复制下来就OK了



cron时间填写：1 0 0 * * *


'''


Didi_jifen_token = ''
exchange_jkd_numb = 2
total_exchange = 5000
FLJ = 50
'''


=================================以下代码不懂不要随便乱动=================================


'''
tokens = ''
account = 1

try:
    import requests
    import json,sys,os,re
    import time,datetime
    from urllib.parse import quote, unquote
    import threading
except Exception as e:
    print(e)

requests.packages.urllib3.disable_warnings()


pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
path = pwd + "env.sh"
today = datetime.datetime.now().strftime('%Y-%m-%d')
tomorrow=(datetime.datetime.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')

#开始抢兑时间
starttime='00:01:00.00000000'
#结束时间
endtime='00:01:20.00000000'

qgtime = '{} {}'.format (today, starttime)
qgendtime = '{} {}'.format (today, endtime)




def printT(s):
    print("[【{0}】]: {1}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), s))
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

##############      在pycharm测试ql环境用，实际用下面的代码运行      #########

# with open(path, "r+", encoding="utf-8") as f:
#    ck = f.read()
#    tokens = ck
#    if "Didi_jifen_token" in ck:
#        r = re.compile (r'Didi_jifen_token="(.*?)"', re.M | re.S | re.I)
#        tokens = r.findall(ck)
#        tokens = tokens[0].split ('&')
#        if len (tokens) == 1:
#            Didi_jifen_token = tokens[0]
#            tokens = ''
#            # print(tokens)
#            # tokens = cookies[3]
#        else:
#            pass
#    printT ("已获取并使用ck环境 token")

########################################################################

if "Didi_jifen_token" in os.environ:
    print(len (os.environ["Didi_jifen_token"]))
    if len (os.environ["Didi_jifen_token"]) > 319:
        tokens = os.environ["Didi_jifen_token"]
        tokens = tokens.split ('&')
        # tokens = tokens.split ('&')
        # cookies = temporary[0]
        printT ("已获取并使用Env环境Didi_jifen_token")
    else:
        Didi_jifen_token = os.environ["Didi_jifen_token"]
else:
    print("检查变量Didi_jifen_token是否已填写")

if "exchange_jkd_numb" in os.environ:
    exchange_jkd_numb = os.environ["exchange_jkd_numb"]
    if exchange_jkd_numb == '1':
        total_exchange = 100
        FLJ = 1
    elif exchange_jkd_numb == '2':
        total_exchange = 5000
        FLJ = 50
    elif exchange_jkd_numb == '3':
        total_exchange = 10000
        FLJ = 100
    elif exchange_jkd_numb == '4':
        total_exchange = 15000
        FLJ = 150
    else:
        printT (f"环境变量exchange_jkd_numb填写错误")
        exit(0)
    printT (f"已获取并使用Env环境exchange_jkd_numb，兑换{FLJ}福利金，需要{total_exchange}健康豆")
else:
    print("变量exchange_jkd_numb未填写，默认兑换500福利金，需要5000健康豆")

## 获取通知服务
class msg(object):
    def __init__(self, m=''):
        self.str_msg = m
        self.message()
    def message(self):
        global msg_info
        printT(self.str_msg)
        try:
            msg_info = "{}\n{}".format(msg_info, self.str_msg)
        except:
            msg_info = "{}".format(self.str_msg)
        sys.stdout.flush()           #这代码的作用就是刷新缓冲区。
                                     # 当我们打印一些字符时，并不是调用print函数后就立即打印的。一般会先将字符送到缓冲区，然后再打印。
                                     # 这就存在一个问题，如果你想等时间间隔的打印一些字符，但由于缓冲区没满，不会打印。就需要采取一些手段。如每次打印后强行刷新缓冲区。
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
                    printT("加载通知服务失败~")
        else:
            self.getsendNotify()
            try:
                from sendNotify import send
            except:
                printT("加载通知服务失败~")
        ###################
msg().main()


#获取xpsid
def get_xpsid():
    try:
        url = f'https://v.didi.cn/p/DpzAd35?appid=10000&lang=zh-CN&clientType=1&trip_cityid=21&datatype=101&imei=99d8f16bacaef4eef6c151bcdfa095f0&channel=102&appversion=6.2.4&trip_country=CN&TripCountry=CN&lng=113.812538&maptype=soso&os=iOS&utc_offset=480&access_key_id=1&deviceid=99d8f16bacaef4eef6c151bcdfa095f0&phone=UCvMSok42+5+tfafkxMn+A==&model=iPhone11&lat=23.016271&origin_id=1&client_type=1&terminal_id=1&sig=8503d986c0349e40ea10ff360f75d208c78c989a'
        heards = {
            "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
        }
        response = requests.head (url=url, headers=heards, verify=False)    #获取响应请求头
        result = response.headers['Location']                                  #获取响应请求头
        # print(result)
        r = re.compile (r'root_xpsid=(.*?)&appid', re.M | re.S | re.I)
        xpsid = r.findall (result)
        xpsid = xpsid[0]
        print(xpsid)
        return xpsid
    except Exception as e:
        print(e)
        msg("获取xpsid失败，可能是表达式错误")


#兑换福利金
def exchange(Didi_jifen_token,xpsid,account,exchange_jkd_numb):
    flag2 = 0
    flag3 = 0
    url2 = r'https://res.xiaojukeji.com/sigma/api/coin/exchange?wsgsig=dd03-874lYEiaW6E3VTgICTc9U%2FXEkxU6r1QcAIfA%2FhQDkxU5U574bTzeUAtbVME5UTgaGPb2X9XbVxdJkHs0AHDb%2FVm0hO51WOKcDx7AWAvg%2F1FIWTbGDY0fh9vbh69E'
    url3 = r'https://res.xiaojukeji.com/sigma/api/coin/exchange?wsgsig=dd03-m4G1HNtCTeCohKleO1Nzf3igzlsPlyLbPLKTAvv9zlsO%2FuY3vOsYdJiBoFCO%2FKh9pS%2Bkg3mBoVmyqoEGPHJxA3C2pVDwhoTHRHfud3tevejx%2FNUFzHjTB%2Bvcv%2Fgv'
    heards = {
        "Host": "res.xiaojukeji.com",
        "Accept":"application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Origin": "https://page.udache.com",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection":"keep-alive",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "ticket":f"{Didi_jifen_token}",
        "User-Agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
        "Referer": "https://page.udache.com/",
        # "Content-Length": "1013"
    }
    data2 = r'{"xbiz":"240300","prod_key":"","xpsid":"6da937105bd14a54a450a08bcdbe7430","dchn":"DpzAd35","xoid":"31685f47-0baa-4c2e-8636-ebff93f65c4a","uid":"281474990465673","xenv":"passenger","xspm_from":"","xpsid_root":"6da937105bd14a54a450a08bcdbe7430","xpsid_from":"409c8422dcdb4449a3598102f1008ca3","xpsid_share":"","version":1,"source_from":"app","city_id":21,"env":{"ticket":"teo9SzpY2n5ivDQiGC0WeayO8BC5UI9gF3vBKuu5bEAkzDmOAkEMQNG7_Nhq2bW5yunkc4cZaJakkEBELe6OaPKntzGVIC-6KMI0woSZCFNVFWYmzOtILRdrPY0szEJYK70WrzkJsxL8_CL8ESD8E6lb8TKGllabZ-FIDGElNh635_2wEvoSTnul7rZXZwLLtWvvzbUhXL7l9cPfAQAA__8=","cityId":"21","longitude":113.81221218532986,"latitude":23.016388346354166,"newAppid":10000,"isHitButton":true,"ddfp":"99d8f16bacaef4eef6c151bcdfa095f0","deviceId":"99d8f16bacaef4eef6c151bcdfa095f0","appVersion":"6.2.4","userAgent":"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0","fromChannel":"1"},"type":4,"extra_number":2}'
    data3 = r'{"xbiz":"240300","prod_key":"ut-walk-bonus","xpsid":"8135e26398034cb1aeede503aef54f26","dchn":"aXxR1oB","xoid":"ba403e62-5f97-4b65-a213-b389f7ed0792","uid":"281474990465673","xenv":"passenger","xspm_from":"","xpsid_root":"8135e26398034cb1aeede503aef54f26","xpsid_from":"43f880c6cfae43d1a77a6ad37bfbea94","xpsid_share":"","version":1,"source_from":"app","city_id":21,"env":{"ticket":"w-8z4gvdnylZ3fDWaIPcqhm3n2fux0T3k8oIR9valmskzDmOAkEMQNG7_Nhq2eVanU4-d5iBZkkKCUTU4u6IJn96G1MJfNFFEaYRJsxEmKqqMJ2wVkaqnq32NFyYmbCah3b3PIRZCH5-Ef4IEP6J1C23PIbmWmpz4UiYCSux8bg974eV0Jdw2i9zbft1JjAvXXuvTSvC5XteP_wdAAD__w==","cityId":"21","longitude":113.81221218532986,"latitude":23.016388346354166,"newAppid":10000,"isHitButton":true,"ddfp":"99d8f16bacaef4eef6c151bcdfa095f0","deviceId":"99d8f16bacaef4eef6c151bcdfa095f0","appVersion":"6.2.4","userAgent":"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0","fromChannel":"1"},"type":4,"extra_number":3}'
    # print(data)
    printT("抢兑换开始时间为：{}".format (qgtime))
    printT (f"正在等待兑换时间，请勿终止退出...")
    try:
        while True:
            nowtime = datetime.datetime.now ().strftime ('%Y-%m-%d %H:%M:%S.%f8')
            if nowtime > qgtime:
                if exchange_jkd_numb == '2':
                    response = requests.post (url=url2, headers=heards,verify=False,data=data2)
                    # print(response.text)
                    result = response.json()
                    print(result)
                    errmsg = result['errmsg']
                    if errmsg == 'success':
                        msg("【账号{0}】已兑换{1}健康豆，获得福利金{2}".format(account,total_exchange,FLJ))
                        flag2 = 1
                        break
                    elif "代币兑换错误" in errmsg:
                        print("【账号{0}】今日兑换【50】福利金可能已达上限".format(account))
                        if flag2 == 1:
                            break
                elif exchange_jkd_numb == '3':
                    response = requests.post (url=url3, headers=heards, verify=False, data=data3)
                    result = response.json ()
                    print (result)
                    errmsg = result['errmsg']
                    if errmsg == 'success':
                        msg ("【账号{0}】已兑换{1}健康豆，获得福利金{2}".format (account, total_exchange, FLJ))
                        flag3 = 1
                        break
                    elif "代币兑换错误" in errmsg:
                        print ("【账号{0}】今日兑换【100】福利金可能已达上限".format(account))
                        if flag3 == 1:
                            break
                elif exchange_jkd_numb == '4':
                    response = requests.post (url=url2, headers=heards, verify=False, data=data2)
                    result = response.json ()
                    print (result)
                    errmsg = result['errmsg']
                    if errmsg == 'success':
                        msg ("【账号{0}】已兑换5000健康豆，获得福利金50".format (account))
                        flag2 = 1
                    elif "代币兑换错误" in errmsg:
                        print ("【账号{0}】今日兑换【50福利金】可能已达上限".format(account))
                    response = requests.post (url=url3, headers=heards, verify=False, data=data3)
                    result = response.json ()
                    print (result)
                    errmsg = result['errmsg']
                    if errmsg == 'success':
                        msg ("【账号{0}】已兑换10000健康豆，获得福利金100".format (account))
                        flag3 = 1
                    elif "代币兑换错误" in errmsg:
                        print ("【账号{0}】今日兑换【100福利金】可能已达上限".format(account))

            if nowtime > qgendtime:
                if flag2 == 0 and flag3 == 0:
                    msg ("【账号{0}】脚本执行完毕，兑换失败".format (account))
                    break
                elif flag2 == 1 and flag3 == 1:
                    msg("【账号{0}】脚本执行完毕，共获得福利金150".format(account))
                    break
                elif flag2 == 0 and flag3 == 1:
                    msg ("【账号{0}】脚本执行完毕，共获得福利金100".format(account))
                    break
                elif flag2 == 1 and flag3 == 0:
                    msg ("【账号{0}】脚本执行完毕，共获得福利金50".format(account))
                    break
    except Exception as e:
        print (e)


if __name__ == '__main__':
    print("============脚本只支持青龙新版=============\n")
    print("具体教程以文本模式打开文件，查看顶部教程\n")
    print("============执行滴滴多走多赚兑换脚本==============")
    # print(Didi_jifen_token)
    if Didi_jifen_token != '':
        xpsid = get_xpsid ()
        exchange (Didi_jifen_token, xpsid, account, exchange_jkd_numb)
    elif tokens == '' :
        print("检查变量Didi_jifen_token是否已填写")
    elif len(tokens) > 1 :
        account = 1
        ttt = []
        for i in tokens:             #同时遍历两个list，需要用ZIP打包
            xpsid = get_xpsid ()
            thread = threading.Thread(target=exchange, args=(i, xpsid, account, exchange_jkd_numb))
            ttt.append (thread)
            thread.start ()
            account += 1
        for thread in ttt:
            thread.join ()
    if "已兑换" in msg_info:
        send("滴滴多走多赚兑换", msg_info)
    elif "过期" in msg_info:
        send("滴滴多走多赚兑换", msg_info)
