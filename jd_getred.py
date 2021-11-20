"""
const $ = new Env("统计东哥历史红包");
统计东哥历史红包
"""

import requests
import sys
import re
import time
import os


def gettimestamp():
    return str(int(time.time() * 1000))


def printf(text):
    print(text)
    sys.stdout.flush()


def getinfo(ck):
    isNext = True
    page = 1
    sum = 0
    usedsum = 0
    count = 0
    while isNext:
        url = "https://wq.jd.com/user/info/QueryUserRedEnvelopesV2?type=2&orgFlag=JD_PinGou_New&page=%s&cashRedType=1&redBalanceFlag=0&channel=3&_=%s&sceneval=2&g_login_type=1&g_ty=ls" % (
            page, gettimestamp())
        headers = {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9',
            'dnt': '1',
            'referer': 'https://wqs.jd.com/',
            'sec-fetch-dest': 'script',
            'sec-fetch-mode': 'no-cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'cookie': ck
        }
        r = requests.get(url, headers=headers).json()
        # print(r)
        if r['data']['unUseRedInfo']['redList'] == None:
            print('累计红包总数', count, '累计红包总额 %.2f' % sum, '已使用红包总额 %.2f' % usedsum)
            isNext = False
        else:
            page += 1
            count = r['data']['unUseRedInfo']['count']
            for i in r['data']['unUseRedInfo']['redList']:
                sum += float(i['discount'])
                usedsum += (float(i['discount']) - float(i['balance']))


if __name__ == '__main__':
    try:
        cks = os.environ["JD_COOKIE"].split("&")
    except:
        f = open("/jd/config/config.sh", "r", encoding='utf-8')
        cks = re.findall(r'Cookie[0-9]*="(pt_key=.*?;pt_pin=.*?;)"', f.read())
        f.close()
    for ck in cks:
        ptpin = re.findall(r"pt_pin=(.*?);", ck)[0]
        printf("--------开始京东账号" + ptpin + "--------")
        try:
            getinfo(ck)
        except:
            print("发生异常错误")
