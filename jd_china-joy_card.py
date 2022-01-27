# -*- coding:utf-8 -*-
"""
cron: 10 10 * * *
new Env('萌虎摇摇乐卡片信息');
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
    global uuid,addressid,iosVer,iosV,clientVersion,iPhone,ADID,area,lng,lat
    
    uuid=''.join(random.sample(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','a','b','c','z'], 40))
    addressid = ''.join(random.sample('1234567898647', 10))
    iosVer = ''.join(random.sample(["15.1.1","14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1"], 1))
    iosV = iosVer.replace('.', '_')
    clientVersion=''.join(random.sample(["10.3.0", "10.2.7", "10.2.4"], 1))
    iPhone = ''.join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
    ADID = ''.join(random.sample('0987654321ABCDEF', 8)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 4)) + '-' + ''.join(random.sample('0987654321ABCDEF', 12))
    
    
    area=''.join(random.sample('0123456789', 2)) + '_' + ''.join(random.sample('0123456789', 4)) + '_' + ''.join(random.sample('0123456789', 5)) + '_' + ''.join(random.sample('0123456789', 4))
    lng='119.31991256596'+str(random.randint(100,999))
    lat='26.1187118976'+str(random.randint(100,999))
    
    
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
        with open('/ql/config/auth.json', 'r') as f:
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
                        remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].replace('remark=','')
                    else:
                        remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].split("@@")[0].replace('remark=','').replace(';','')
                except:
                    pass
    except:
        print('读取auth.json文件出错，跳过获取备注')

def getcardinfo(ck):
    url='https://api.m.jd.com/api'
    headers={
            'accept':'application/json, text/plain, */*',
            'content-type':'application/x-www-form-urlencoded',
            'origin':'https://yearfestival.jd.com',
            'content-length':'139',
            'accept-language':'zh-CN,zh-Hans;q=0.9',
            'user-agent':UserAgent,
            'referer':'https://yearfestival.jd.com/',
            'accept-encoding':'gzip, deflate, br',
            'cookie':ck
        }
    data='appid=china-joy&functionId=collect_bliss_cards_prod&body={"apiMapping":"/api/card/list"}&t='+str(round(time.time() * 1000))+'&loginType=2&loginWQBiz=rdcactivity'
    try:
        response=requests.post(url=url,headers=headers,data=data)
        for i in range(len(json.loads(response.text)['data']['cardList'])):
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='万物更新卡':
                wwgxk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='肉肉转移卡':
                rrzyk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='升职加薪卡':
                szjxk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='一键美颜卡':
                yjmyk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='无痕摸鱼卡':
                whmyk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='逢考必过卡':
                fkbgk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='宇宙旅行卡':
                yzlxk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='一秒脱单卡':
                ymtdk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='水逆退散卡':
                sntsk=json.loads(response.text)['data']['cardList'][i]['count']
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='时间暂停卡':
                sjztk=json.loads(response.text)['data']['cardList'][i]['count']
        printf('有'+str(wwgxk)+'张万物更新卡')
        printf('其他卡片分布情况如下\n')
        printf(str(rrzyk)+'   '+str(szjxk)+'   '+str(yjmyk))
        printf(str(whmyk)+'   '+str(fkbgk)+'   '+str(yzlxk))
        printf(str(ymtdk)+'   '+str(sntsk)+'   '+str(sjztk)+'\n\n')
    except:
        printf('获取卡片信息出错')

if __name__ == '__main__':
    printf('游戏入口:https://yearfestival.jd.com\n\n\n')
    remarkinfos={}
    get_remarkinfo()#获取备注
    try:
        cks = os.environ["JD_COOKIE"].split("&")#获取cookie
    except:
        f = open("/jd/config/config.sh", "r", encoding='utf-8')
        cks = re.findall(r'Cookie[0-9]*="(pt_key=.*?;pt_pin=.*?;)"', f.read())
        f.close()
    for ck in cks:
        ptpin = re.findall(r"pt_pin=(.*?);", ck)[0]
        try:
            if remarkinfos[ptpin]!='':
                printf("--账号:" + remarkinfos[ptpin] + "--")
            else:
                printf("--无备注账号:" + urllib.parse.unquote(ptpin) + "--")
        except:
            printf("--账号:" + urllib.parse.unquote(ptpin) + "--")
    
        UserAgent=randomuserAgent()#执行前先随机获取一个UserAgent
        getcardinfo(ck)