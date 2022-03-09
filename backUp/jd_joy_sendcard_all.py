# -*- coding:utf-8 -*-

"""
cron: 10 11 * * * jd_joy_sendcard_all.py
new Env('萌虎摇摇乐匀卡');
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

### 1,2,3卡互相匀一下





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

def get_remarkinfo():
    cks = []

    url='http://127.0.0.1:5700/api/envs'
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
                cks.append(json.loads(response.text)['data'][i]['value'])

                # printf('\n')
                # printf(str(json.loads(response.text)['data'][i]))
                # try:
                #     if json.loads(response.text)['data'][i]['remarks'].find('@@')==-1:
                #         remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].replace('remark=','')
                #     else:
                #         remarkinfos[json.loads(response.text)['data'][i]['value'].split(';')[1].replace('pt_pin=','')]=json.loads(response.text)['data'][i]['remarks'].split("@@")[0].replace('remark=','').replace(';','')
                # except:
                #     pass
        # print(cks)

    except:
        print('读取auth.json文件出错，跳过获取备注')

    return cks




def getcardinfo(ck):

    card_count = []

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
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count']) 
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='肉肉转移卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='升职加薪卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='一键美颜卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='无痕摸鱼卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='逢考必过卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='宇宙旅行卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='一秒脱单卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='水逆退散卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])
            if json.loads(response.text)['data']['cardList'][i]['cardName']=='时间暂停卡':
                card_count.append(json.loads(response.text)['data']['cardList'][i]['count'])

        printf('\n{}持卡情况:'.format(ck.split(';')[1].split("=")[1]))
        printf('有'+str(card_count[0])+'张万物更新卡')
        printf('其他卡片分布情况如下\n')
        printf(str(card_count[1])+'   '+str(card_count[2])+'   '+str(card_count[3]))
        printf(str(card_count[4])+'   '+str(card_count[5])+'   '+str(card_count[6]))
        printf(str(card_count[7])+'   '+str(card_count[8])+'   '+str(card_count[9])+'')
    except:
        printf('获取卡片信息出错')
    return card_count


def sendcard(ck,cardId):
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
    data='appid=china-joy&functionId=collect_bliss_cards_prod&body={"cardId":'+str(cardId)+',"apiMapping":"/api/card/share"}&t='+str(round(time.time() * 1000))+'&loginType=2'
    response=requests.post(url=url,headers=headers,data=data)
    carduuid=json.loads(response.text)['data']
    return carduuid
def recivecard(ck,carduuid):
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
    data='appid=china-joy&functionId=collect_bliss_cards_prod&body={"uuid":"'+carduuid+'","apiMapping":"/api/card/receiveCard"}&t='+str(round(time.time() * 1000))+'&loginType=2'
    response=requests.post(url=url,headers=headers,data=data)
    print(json.loads(response.text)['data'])
if __name__ == '__main__':
    #肉肉769 升职770 美颜771
    #摸鱼772 逢考773 宇宙774
    #脱单775 水逆776 时间777

    mycardlist = []

    UserAgent=randomuserAgent()

    cks = get_remarkinfo()

    all_cardtable = []

    # 获取所有账号的卡列表，便于后边检索谁有卡
    for ck in cks:
        all_cardtable.append(getcardinfo(ck))

    printf("\n\n\n当所有账号卡情况")
    t = 0
    for n in all_cardtable:
        t += 1
        printf("第{}个账号情况\n{}".format(str(t), str(n)))


    printf("\n\n\n开始匀卡")

    # 看每个账号缺卡情况，然后去别人那找有多余卡的
    for idx in range(len(cks)):
        for i in range(1,9 + 1):
            # 找没卡的
            if all_cardtable[idx][i] == 0:
                for j in range(len(cks)):
                    if all_cardtable[j][i] > 1:
                        id = 768 + i
                        ck_t = cks[j]
                        printf("【{}】{}有卡{}，{}张".format(str(j), ck_t.split(';')[1].split("=")[1], str(id), str(all_cardtable[j][i])))
                        carduuid=sendcard(ck_t, id)
                        printf("carduuid:" + str(carduuid))
                        recivecard(cks[idx], carduuid)
                        all_cardtable[j][i] -= 1
                        all_cardtable[idx][i] += 1
                        break
    printf("匀卡结束\n\n\n\n")

    t = 0
    for n in all_cardtable:
        t += 1
        printf("第{}个账号情况\n{}".format(str(t), str(n)))