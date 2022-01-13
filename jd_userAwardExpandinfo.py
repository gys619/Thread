# -*- coding:utf-8 -*-

#Source: https://github.com/Hyper-Beast

"""
cron: 10 20 * * *
new Env('京东膨胀红包通知');
"""

import requests
import json
import time
import os
import re
import sys
import random
import string
import urllib


#以下部分参考Curtin的脚本：https://github.com/curtinlv/JD-Script


def randomuserAgent():
    global uuid,addressid,iosVer,iosV,clientVersion,iPhone,area,ADID
    uuid=''.join(random.sample(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','a','b','c','z'], 40))
    addressid = ''.join(random.sample('1234567898647', 10))
    iosVer = ''.join(random.sample(["15.1.1","14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1"], 1))
    iosV = iosVer.replace('.', '_')
    clientVersion=''.join(random.sample(["10.3.0", "10.2.7", "10.2.4"], 1))
    iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
    area=''.join(random.sample('0123456789', 2)) + '_' + ''.join(random.sample('0123456789', 4)) + '_' + ''.join(random.sample('0123456789', 5)) + '_' + ''.join(random.sample('0123456789', 4))
    ADID = ''.join(random.sample('0987654321ABCDEF', 8)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 12))
    UserAgent=''
    if not UserAgent:
        return f'jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/{ADID};model/iPhone{iPhone},1;addressid/{addressid};appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS {iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1'
    else:
        return UserAgent

#以上部分参考Curtin的脚本：https://github.com/curtinlv/JD-Script

def printf(text):
    print(text)
    sys.stdout.flush()


def load_send():
    global send
    cur_path = os.path.abspath(os.path.dirname(__file__))
    sys.path.append(cur_path)
    if os.path.exists(cur_path + "/sendNotify.py"):
        try:
            from sendNotify import send
        except:
            send=False
            print("加载通知服务失败~")
    else:
        send=False
        print("加载通知服务失败~")
load_send()

    
def get_remarkinfo():
    url='http://127.0.0.1:5600/api/envs'
    try:
        with open(os.getcwd().replace('scripts','config')+'/auth.json', 'r') as f:
            token=json.loads(f.read())['token']
        headers={
            'Accept':'application/json',
            'authorization':'Bearer '+token,
            }
        response=requests.get(url=url,headers=headers)

        for i in range(len(json.loads(response.text)['data'])):
            if json.loads(response.text)['data'][i]['name']=='JD_COOKIE':
                try:
                    if json.loads(response.text)['data'][i]['remarks'].find('@@')==-1:
                        remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].replace('remark=','').replace(';','')
                    else:
                        remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].split("@@")[0].replace('remark=','').replace(';','')
                except:
                    pass
    except:
        printf('读取auth.json文件出错，跳过获取备注\n')

def getinfo(ck):
    global sendnotifycation
    global userAwardExpand
    sendnotifycation=False
    userAwardExpand=0
    url='https://api.m.jd.com/client.action?functionId=tigernian_pk_getAmountForecast'
    headers={
        'content-type':'application/x-www-form-urlencoded',
        'accept':'application/json, text/plain, */*',
        'accept-language':'zh-cn',
        'accept-encoding':'gzip, deflate, br',
        'origin':'https://wbbny.m.jd.com',
        'user-agent':UserAgent,
        'referer':'https://wbbny.m.jd.com/',
        'content-length':'80',
        'request-from':'native',
        'cookie':ck
        }
    data='functionId=tigernian_pk_getAmountForecast&body={}&client=wh5&clientVersion=1.0.0'
    response=requests.post(url=url,headers=headers,data=data)
    try:
        printf('可膨胀金额：'+json.loads(response.text)['data']['result']['userAwardExpand']+'\n\n')
        if(float(json.loads(response.text)['data']['result']['userAwardExpand'])>=10):
            sendnotifycation=True
            userAwardExpand=float(json.loads(response.text)['data']['result']['userAwardExpand'])
    except:
        printf('获取失败，黑号或者没有参加5人以上的队伍\n\n')
if __name__ == '__main__':
    remarkinfos={}
    get_remarkinfo()#获取备注
    try:
        cks = os.environ["JD_COOKIE"].split("&")#获取cookie
    except:
        f = open("/jd/config/config.sh", "r", encoding='utf-8')
        cks = re.findall(r'Cookie[0-9]*="(pt_key=.*?;pt_pin=.*?;)"', f.read())
        f.close()
    for ck in cks:
        UserAgent=randomuserAgent()
        ptpin = re.findall(r"pt_pin=(.*?);", ck)[0]
        try:
            if remarkinfos[ptpin]!='':
                printf("--账号:" + remarkinfos[ptpin] + "--")
            else:
                printf("--无备注账号:" + urllib.parse.unquote(ptpin) + "--")
        except:
            printf("--账号:" + urllib.parse.unquote(ptpin) + "--")
        getinfo(ck)
        if sendnotifycation:
            try:
                send(remarkinfos[ptpin]+f'的膨胀红包金额为{userAwardExpand}元','1.进入京东app\n2.点击首页右下角悬浮图标(或搜索栏搜索-全民炸年兽)\n3.点击去组队赚红包右上角即可看到!')
            except:
                send(ptpin+f'的膨胀红包金额为{userAwardExpand}元','1.进入京东app\n2.点击首页右下角悬浮图标(或搜索栏搜索-全民炸年兽)\n3.点击去组队赚红包右上角即可看到!')