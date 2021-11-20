#!/bin/env python3
# -*- coding: utf-8 -*
'''

感谢CurtinLV提供的其他脚本供我参考
感谢aburd ch大佬的指导抓包
项目名称:xF_didi_Sign.py
Author: 一风一燕
功能：滴滴出行积分签到+抽奖
Date: 2021-11-4
cron: 22 5,10 * * * xF_didi_Sign.py
new Env('滴滴app积分签到+抽奖');

updata:11-15
内容：无需抓取抽奖lid。但是是否抽奖变量保留


****************滴滴出行APP*******************


【教程】：需要自行用手机抓取Didi_jifen_token。
在青龙变量中添加变量Didi_jifen_token
多个账号时，Didi_jifen_token，用&隔开，例如Didi_jifen_token=xxxxx&xxxx

手机抓包后，积分签到一次，查看URL，https://gsh5act.xiaojukeji.com/dpub_data_api/activities/9612/signin?signin_user_token=xxxx
其中URL中的9612，这数字是会变的，以前每期签到都不一样，但是你按照我的路径去找，就能找到token
搜索signin_user_token=，就是你需要的token。

如果想用积分抽奖，在青龙变量中添加变量do_lottery=true，默认是false。


cron时间填写：22 7,10 * * *

'''


Didi_jifen_token = ''
do_lottery = 'false'


'''


=================================以下代码不懂不要随便乱动=================================


'''
tokens = ''
accout = 1
id = ''
try:
    import requests
    import json,sys,os,re
    import time,datetime
except Exception as e:
    print(e)

requests.packages.urllib3.disable_warnings()


pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
path = pwd + "env.sh"
today = datetime.datetime.now().strftime('%Y-%m-%d')
mor_time ='08:00:00.00000000'
moringtime = '{} {}'.format (today, mor_time)









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
    if len (os.environ["Didi_jifen_token"]) > 419:
        tokens = os.environ["Didi_jifen_token"]
        # tokens = tokens.split ('&')
        # cookies = temporary[0]
        printT ("已获取并使用Env环境Didi_jifen_token")
    else:
        Didi_jifen_token = os.environ["Didi_jifen_token"]
else:
    print("检查变量Didi_jifen_token是否已填写")


if "do_lottery" in os.environ:
    do_lottery = os.environ["do_lottery"]
    printT ("已获取并使用Env环境do_lottery")
else:
    print("do_lottery为fasle，不进行积分抽奖")

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
nowtime = int(round(time.time() * 1000))


uid = ''

if tokens != '':
    # if "Didi_jifen_token" in tokens:
        # r = re.compile (r'Didi_jifen_token="(.*?)"', re.M | re.S | re.I)
        # tokens = r.findall (ck)
        tokens = tokens.split ('&')
        # print(tokens)
        if len (tokens) == 1:
            Didi_jifen_token = tokens[0]

        else:
            pass

#获取签到ID
def get_id():
    try:
        day = time.localtime ()
        day = time.strftime ("%w", day)  # 今天星期几，0代表星期天
        day = int (day)
        url = f'https://dpubstatic.udache.com/static/dpubimg/9755028658f0cb006cb11685879e01ab/index.html?channel_id=72%2C278%2C80537&dchn=K0gkogR&entrance_channel=7227880537&prod_key=custom&xbiz=&xenv=passenger&xpsid=9ef4ad1c8e3d42fab6d9823bc4f9838b&xpsid_from=&xpsid_root=9ef4ad1c8e3d42fab6d9823bc4f9838b&xsc=&xspm_from='
        heards = {
            "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Referer": "https://page.udache.com/",
            "Host": "dpubstatic.udache.com",
            "Origin": "https://dpubstatic.udache.com",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        }
        response = requests.get (url=url, headers=heards,verify=False)
        result = response.content.decode('utf-8')
        # print (result)
        r = re.compile (r',"activity_id":"(.*?)","dpubConfigId":5702}', re.M | re.S | re.I)
        numb = r.findall (result)
        numb = numb[0]
        # print(numb)
        if int (day) == 0:
            day = int (day) + 7
        if day == 1 or day == 2:
            r = re.compile (r'{"day":1,"prize_type":2,"prize_id":"(.*?)"', re.M | re.S | re.I)
            id = r.findall (result)
            id = id[0]
        elif day == 3:
            r = re.compile (r'{"day":3,"prize_type":2,"prize_id":"(.*?)"', re.M | re.S | re.I)
            id = r.findall (result)
            id = id[0]
        elif day == 4:
            r = re.compile (r'{"day":4,"prize_type":2,"prize_id":"(.*?)"', re.M | re.S | re.I)
            id = r.findall (result)
            id = id[0]
        elif day == 5 or day == 6:
            r = re.compile (r'{"day":5,"prize_type":2,"prize_id":"(.*?)"', re.M | re.S | re.I)
            id = r.findall (result)
            id = id[0]
        else:
            r = re.compile (r'{"day":7,"prize_type":2,"prize_id":"(.*?)"', re.M | re.S | re.I)
            id = r.findall (result)
            id = id[0]
        return numb,id,day
    except Exception as e:
        print (e)
        msg ("【账号{0}】获取签到ID失败,可能是表达式错误".format (accout))

#获取个人信息
def get_activity_info(Didi_jifen_token,day,numb,accout):
    try:
        do_sign_url = f'https://gsh5act.xiaojukeji.com/dpub_data_api/activities/{numb}/signin'
        data = r'{"signin_day":' + f"{day}" + r',"signin_type":0,"signin_user_token":' + '"' + f'{Didi_jifen_token}' + r'"}'
        # print(data)
        do_sign_heards = {
            "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Referer": "https://dpubstatic.udache.com/",
            "Host": "gsh5act.xiaojukeji.com",
            "Origin": "https://dpubstatic.udache.com",
            "Accept-Language": "zh-cn",
        }
        response = requests.post (url=do_sign_url, headers=do_sign_heards, data=data, verify=False)
        do_sign_ = response.json ()
        # print (do_sign_)
        code = do_sign_['errmsg']
        if "已结束" in code:
            msg("【账号{}】获取签到ID异常".format(accout))
        elif "已经" in code:
            print (do_sign_)
            msg ("【账号{}】今日已签到，跳过签到环节".format(accout))


    except Exception as e:
        print (e)
        msg ("【账号{0}】获取签到信息失败,可能是cookies过期".format (accout))

#获取积分
def reward(Didi_jifen_token,day,numb,accout):
    try:
        nowtime = int (round (time.time () * 1000))
        info_url = f'https://gsh5act.xiaojukeji.com/dpub_data_api/activities/{numb}/reward_lottery'
        info_headers = {
            "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "Referer": "https://dpubstatic.udache.com",
            "Host": "gsh5act.xiaojukeji.com",
            "Origin": "https://dpubstatic.udache.com",
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "content-type":"application/json; charset=utf-8",
            "content-length":"272",
        }
        data = '{'+ f'"user_token":"{Didi_jifen_token}","signin_day":{day},"lottery_id":"{id}"' +'}'
        # print(data)
        response = requests.post(url=info_url, headers=info_headers, verify=False,data=data)
        list = response.json()
        print(list)
        flag = list['errmsg']
        if "签到当天奖励" in flag:
            pass
        else:
            reward = list['lottery']['prize']['name']
            # print(reward)
            total_reward = list['lottery']['userinfo']['current_point']  #总积分
            # print(total_reward)
            msg("【账号{2}】本次签到获取{0},账号共有{1}积分".format(reward,total_reward,accout))
    except Exception as e:
        print(e)
        msg ("【账号{0}】获取获取积分失败,可能是cookies过期".format(accout))

#获取抽奖lid
def get_lid():
    try:
        nowtime = int (round (time.time () * 1000))     #13位
        info_url = f'https://dpubstatic.udache.com/static/dpubimg/dpub2_project_1261596/index_bbnGG.json?r=0.07526362250404772?ts={nowtime}&app_id=common'
        info_headers = {
            "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
            "Accept": "application/json, text/plain, */*",
            "Referer": "https://page.udache.com/",
            "Host": "dpubstatic.udache.com",
            "Origin": "https://page.udache.com",
        }
        response = requests.get(url=info_url, headers=info_headers, verify=False)
        result = response.json()
        # print(result)
        activity_id = result['activity_id']
        return activity_id
    except Exception as e:
        print(e)
        msg ("【账号{0}】获取获取抽奖lid失败,可能是cookies过期".format(accout))


#抽奖活动
def do_Lottery(Didi_jifen_token,activity_id,accout):
    try:
        flag = 6
        # nowtime = int (round (time.time () * 1000))
        while True:
            do_Lottery_url = f'https://bosp-api.xiaojukeji.com/bosp-api/lottery/draw?lid={activity_id}&token={Didi_jifen_token}&env=%7B%22longitude%22%3A113.81251003689236%2C%22latitude%22%3A23.016395128038194%2C%22cityId%22%3A%2221%22%2C%22deviceId%22%3A%2299d8f16bacaef4eef6c151bcdfa095f0%22%2C%22ddfp%22%3A%2299d8f16bacaef4eef6c151bcdfa095f0%22%2C%22appVersion%22%3A%226.2.4%22%2C%22wifi%22%3A1%2C%22model%22%3A%22iPhone%2011%22%2C%22timeCost%22%3A637425%2C%22userAgent%22%3A%22Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2015_0%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Mobile%2F15E148%20didi.passenger%2F6.2.4%20FusionKit%2F1.2.20%20OffMode%2F0%22%2C%22isHitButton%22%3Atrue%7D'
            do_Lottery_headers = {
                "user-agent": f"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/6.2.4 FusionKit/1.2.20 OffMode/0",
                "Accept-Encoding": "gzip, deflate, br",
                # "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "Referer": "https://page.udache.com/",
                "Host": "bosp-api.xiaojukeji.com",
                "Origin": "https://page.udache.com",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                # "content-type":"application/json; charset=utf-8",
                # "content-length":"272",
            }
            response = requests.get(url=do_Lottery_url, headers=do_Lottery_headers, verify=False)
            result = response.json()
            print(result)
            code = result['code']
            if code == 20003:
                msg("【账号{}】抽奖次数已达上限，跳出抽奖环节".format(accout))
                break
            elif code == 20017:
                msg("【账号{}】抽奖操作过频，稍后再试".format(accout))
                break
            elif code == 20008:
                msg("【账号{}】抽奖lid过期，请重新抓包更新".format(accout))
                break
            elif code == 20010:
                msg ("【账号{}】积分不足9分，跳出抽奖环节".format (accout))
                break
            else:
                draw_times = result['data']['userinfo']['draw_times']
                flag = 6 - int(draw_times)
                name = result['data']['prize']['name']
                current_point = result['data']['userinfo']['current_point']
                msg("【账号{3}】第{0}次抽奖获得{1},现账号共有{2}积分".format(flag,name,current_point,accout))
                time.sleep(5)
    except Exception as e:
        print(e)
        msg ("【账号{0}】抽奖失败,可能是cookies过期".format(accout))


if __name__ == '__main__':
    global msg_info
    print("============脚本只支持青龙新版=============\n")
    print("具体教程以文本模式打开文件，查看顶部教程\n\n")
    print("============执行滴滴积分签到脚本==============")
    print(Didi_jifen_token)
    numb,id,day = get_id()
    if Didi_jifen_token != '':
        get_activity_info(Didi_jifen_token,day,numb,accout)
        reward(Didi_jifen_token,day,numb,accout)
        activity_id = get_lid ()
        if do_lottery == 'true':
            do_Lottery (Didi_jifen_token,activity_id,accout)

    elif tokens == '' :
        print("检查变量Didi_jifen_token，DD_cookies是否已填写")
    elif len(tokens) > 1 :
        accout = 1
        for i in tokens:             #同时遍历两个list，需要用ZIP打包
            get_activity_info (i, day,numb,accout)
            reward (i, day,numb,accout)
            activity_id = get_lid()
            if do_lottery == 'true':
                do_Lottery (i,activity_id,accout)
            accout += 1

    if "签到" in msg_info:
        send("滴滴积分签到", msg_info)
    elif "过期" in msg_info:
        send("滴滴积分签到", msg_info)
