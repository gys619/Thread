#Source: https://github.com/Hyper-Beast

"""
cron: 20 20 * * *
new Env('京东试用成功通知');
"""

import requests
import json
import time
import os
import re
import sys
import random
import string


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


def printf(text):
    print(text)
    sys.stdout.flush()

def getinfo(ck):
    url='https://api.m.jd.com/client.action'
    headers={
    'accept':'application/json, text/plain, */*',
    'content-type':'application/x-www-form-urlencoded',
    'origin':'https://prodev.m.jd.com',
    'content-length':'249',
    'accept-language':'zh-CN,zh-Hans;q=0.9',
    'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    'referer':'https://prodev.m.jd.com/',
    'accept-encoding':'gzip, deflate, br',
    'cookie':ck
	    }
    uuid=''.join(random.sample(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','a','b','c','z'], 40)).replace(" ","")
    data='appid=newtry&functionId=try_MyTrials&uuid='+uuid+'&clientVersion=10.3.0&client=wh5&osVersion=15.1.1&area=16_1303_48712_48758&networkType=wifi&body=%7B%22page%22%3A1%2C%22selected%22%3A2%2C%22previewTime%22%3A%22%22%7D'
    response=requests.post(url=url,headers=headers,data=data)
    isnull=True
    try:
        for i in range(len(json.loads(response.text)['data']['list'])):
            if(json.loads(response.text)['data']['list'][i]['text']['text']).find('试用资格将保留')!=-1:
                print(json.loads(response.text)['data']['list'][i]['trialName'])
                send("京东试用待领取物品通知",'账号名称：'+ptpin+'\n'+'商品名称:'+json.loads(response.text)['data']['list'][i]['trialName']+"\n"+"商品链接:https://item.jd.com/"+json.loads(response.text)['data']['list'][i]['skuId']+".html")
                isnull=False
            i+=1
        if isnull==True:
            print("没有在有效期内待领取的试用品")
    except:
        pass
if __name__ == '__main__':
    try:
        cks = os.environ["JD_COOKIE"].split("&")
    except:
        f = open("/jd/config/config.sh", "r", encoding='utf-8')
        cks = re.findall(r'Cookie[0-9]*="(pt_key=.*?;pt_pin=.*?;)"', f.read())
        f.close()
    for ck in cks:
        ptpin = re.findall(r"pt_pin=(.*?);", ck)[0]
        printf("--账号:" + ptpin + "--")
        getinfo(ck)