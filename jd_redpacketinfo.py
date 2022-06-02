# -*- coding:utf-8 -*-
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

def getnowtime():
    t=str(round(time.time() * 1000))
    return t

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


def checkday(timestamp):#判断时间戳是不是今天
    t1 = time.time()
    t1_str = time.strftime("%Y-%m-%d", time.localtime(t1))
    t2_str = time.strftime("%Y-%m-%d", time.localtime(timestamp))
    if t1_str==t2_str:
        return True
    else:
        return False



def redpacketinfo(ck,name):
    url='https://m.jingxi.com/user/info/QueryUserRedEnvelopesV2?type=1&orgFlag=JD_PinGou_New&page=1&cashRedType=1&redBalanceFlag=1&channel=1&_='+getnowtime()+'&sceneval=2&g_login_type=1&g_ty=ls'
    headers={
        'Host': 'm.jingxi.com',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Accept-Language': 'zh-cn',
        'Referer': 'https://st.jingxi.com/my/redpacket.shtml?newPg=App&jxsid=16156262265849285961',
        'Accept-Encoding': 'gzip, deflate, br',
        "Cookie": ck,
        'User-Agent':UserAgent
    }
    jdamount=0
    jxamount=0
    jsamount=0
    try:
        response=requests.get(url=url,headers=headers).json()
        for i in range(len(response['data']['useRedInfo']['redList'])):
            if checkday(response['data']['useRedInfo']['redList'][i]['endTime']):#先判断是不是今天过期
                if response['data']['useRedInfo']['redList'][i]['orgLimitStr'].find('京东')!=-1 and response['data']['useRedInfo']['redList'][i]['orgLimitStr'].find('极速版')==1:
                    jdamount+=float(response['data']['useRedInfo']['redList'][i]['balance'])
                elif response['data']['useRedInfo']['redList'][i]['orgLimitStr'].find('京喜')!=-1:
                    jxamount+=float(response['data']['useRedInfo']['redList'][i]['balance'])
                elif response['data']['useRedInfo']['redList'][i]['orgLimitStr'].find('极速')!=-1:
                    jsamount+=float(response['data']['useRedInfo']['redList'][i]['balance'])
        printf('今天过期的红包总金额为'+response['data']['expiredBalance']+'元,其中')
        printf('京东红包金额:'+str(jdamount)[0:5]+'元')
        printf('京喜红包金额:'+str(jxamount)[0:5]+'元')
        printf('极速红包金额:'+str(jsamount)[0:5]+'元\n')
        if float(response['data']['expiredBalance'])>=expiredBalance:
            send('京东红包过期通知','账号:'+name+'今天有'+response['data']['expiredBalance']+'元的红包即将过期\n即将过期的京东红包'+str(jdamount)[0:5]+'元\n即将过期的京喜红包'+str(jxamount)[0:5]+'元\n即将过期的极速红包'+str(jsamount)[0:5]+'元')
    except:
        printf('获取红包信息出错')

if __name__ == '__main__':
    remarkinfos={}
    get_remarkinfo()#获取备注
    expiredBalance=5#默认过期金额超过5块发送通知
    try:
        expiredBalance=float(os.environ['JDexpiredBalance'])
        printf('当前设置过期通知金额为'+str(expiredBalance)+'元\n')
    except:
        printf('未读取到环境变量JDexpiredBalance，使用默认值5，当账户当天过期红包超过5块时会发送通知,如需自定义请设置export JDexpiredBalance=想要设置的数字(例如export JDexpiredBalance="10)"\n')
    try:
        cks = os.environ["JD_COOKIE"].split("&")#获取cookie
        cks[::-1]
    except:
        f = open("/jd/config/config.sh", "r", encoding='utf-8')
        cks = re.findall(r'Cookie[0-9]*="(pt_key=.*?;pt_pin=.*?;)"', f.read())
        f.close()
    for ck in cks:
        ptpin = re.findall(r"pt_pin=(.*?);", ck)[0]
        name=''
        try:
            if remarkinfos[ptpin]!='':
                printf("--账号:" + remarkinfos[ptpin] + "--")
                name=remarkinfos[ptpin]
            else:
                printf("--无备注账号:" + urllib.parse.unquote(ptpin) + "--")
                name=urllib.parse.unquote(ptpin)
        except:
            printf("--账号:" + urllib.parse.unquote(ptpin) + "--")
            name=urllib.parse.unquote(ptpin)
        #主程序部分
        UserAgent=randomuserAgent()#执行前先随机获取一个UserAgent
        redpacketinfo(ck,name)
        time.sleep(5)
        #主程序部分