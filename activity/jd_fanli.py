"""
const $ = new Env("京东饭粒");
京东饭粒任务
活动入口：https://u.jd.com/ytWx4w0
每天60豆小毛，爱要不要

cron:
46 1,19 * * * jd_fanli.py
"""
import json
import sys
import os
import time
import re
import requests
import random

proxies = {"http": None, "https": None}


def printf(text):
    print(text)
    sys.stdout.flush()


def randomstr(num):
    randomstr = ""
    for i in range(num):
        randomstr = randomstr + random.choice("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
    return randomstr


def randomstr1():
    randomstr = ""
    for i in range(16):
        randomstr = randomstr + random.choice("0123456789")
    randomstr += "-"
    for i in range(16):
        randomstr = randomstr + random.choice("0123456789")
    return randomstr


def getheader(ck):
    return {
        "Host": "ifanli.m.jd.com",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "Cache-Control": "no-cache",
        "User-Agent": "jdapp;android;10.2.2;11;%s;model/Mi 10;osVer/30;appBuild/91077;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045715 Mobile Safari/537.36" % randomstr1(),
        "Sec-Fetch-Mode": "cors",
        "X-Requested-With": "com.jingdong.app.mall",
        "Sec-Fetch-Site": "same-origin",
        "Referer": "https://ifanli.m.jd.com/rebate/earnBean.html?paltform=null",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": ck,
        "Content-Type": "application/json;charset=UTF-8"
    }


def getTaskList(ck):
    url = "https://ifanli.m.jd.com/rebateapi/task/getTaskList"
    headers = getheader(ck)
    r = requests.get(url, headers=headers, proxies=proxies)
    # printf(r.text)
    return r.json()["content"]


def getTaskFinishCount(ck):
    url = "https://ifanli.m.jd.com/rebateapi/task/getTaskFinishCount"
    headers = getheader(ck)
    r = requests.get(url, headers=headers, proxies=proxies)
    printf(
        '已完成任务次数：' + str(r.json()["content"]["finishCount"]) + '   总任务次数：' + str(r.json()["content"]["maxTaskCount"]))
    return r.json()["content"]


def saveTaskRecord(ck, taskId, taskType):
    url = "https://ifanli.m.jd.com/rebateapi/task/saveTaskRecord"
    headers = getheader(ck)
    data = '{"taskId":%s,"taskType":%s}' % (taskId, taskType)
    r = requests.post(url, headers=headers, data=data, proxies=proxies)
    # printf(r.text)
    return r.json()["content"]["uid"], r.json()["content"]["tt"]


def saveTaskRecord1(ck, taskId, uid, tt, taskType):
    # tt=int(time.time()*1000)
    url = "https://ifanli.m.jd.com/rebateapi/task/saveTaskRecord"
    headers = getheader(ck)
    data = '{"taskId":%s,"taskType":%s,"uid":"%s","tt":%s}' % (taskId, taskType, uid, tt)
    # printf(data)
    r = requests.post(url, headers=headers, data=data, proxies=proxies)
    printf(r.json()["content"]["msg"])


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
            count = getTaskFinishCount(ck)
            if count["finishCount"] < count["maxTaskCount"]:
                for times in range(count["maxTaskCount"] - count["finishCount"]):
                    tasks = getTaskList(ck)
                    for i in tasks:
                        if i["statusName"] != "活动结束":
                            printf("开始做任务：" + i["taskName"])
                            uid, tt = saveTaskRecord(ck, i["taskId"], i["taskType"])
                            time.sleep(10)
                            saveTaskRecord1(ck, i["taskId"], uid, tt, i["taskType"])
                            break
        except:
            printf("发生异常错误")
