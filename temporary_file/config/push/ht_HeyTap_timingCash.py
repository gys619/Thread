# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/9/12
# @Author  : 2984922017@qq.com
# @File    : timingCash.py
# @Software: PyCharm
'''
cron:  */30 * * * * timingCash.py
new Env('欢太定时现金');
'''

import os
import sys
import json
import time
import random
import logging

# 配置文件
from htconfig import admin, accounts, timeCash_LOG_PATH

# 日志模块
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logFormat = logging.Formatter("%(message)s")
LOG_FILE = os.path.join(timeCash_LOG_PATH if timeCash_LOG_PATH != "" else os.path.dirname(os.path.abspath(__file__)) ,f"{os.path.basename(__file__)[:-3]}.log")

try:
    import requests
except ModuleNotFoundError:
    print("缺少requests依赖！程序将尝试安装依赖！")
    os.system("pip3 install requests -i https://pypi.tuna.tsinghua.edu.cn/simple")
    os.execl(sys.executable, 'python3', __file__, *sys.argv)

# 日志文件
file = logging.FileHandler(LOG_FILE, mode='w', encoding='utf-8')
file.setFormatter(logFormat)
logger.addHandler(file)

# 日志输出流
stream = logging.StreamHandler()
stream.setFormatter(logFormat)
logger.addHandler(stream)

# 日志录入时间
logger.info(f"任务:{'定时现金'}\n时间:{time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())}")

class TimingCash:
    def __init__(self,dic):
        self.dic = dic
        self.sess = requests.session()

    # 登录验证
    def login(self):
        url = 'https://store.oppo.com/cn/oapi/users/web/member/check'
        headers = {
            'Host': 'store.oppo.com',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
        response = self.sess.get(url=url,headers=headers).json()
        if response['code'] == 200:
            logger.info(f"{self.dic['user']}\t登录成功")
            return True
        else:
            logger.info(f"{self.dic['user']}\t登录失败")
            return False

    # 天天领取现金
    def getDailyCashTask(self):
        url = 'https://store.oppo.com/cn/oapi/omp-web/web/dailyCash/queryActivityReward'
        headers = {
            'Host': 'store.oppo.com',
            'Connection': 'keep-alive',
            'source_type': '501',
            'clientPackage': 'com.oppo.store',
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://store.oppo.com/cn/app/cashRedEnvelope?activityId=1&us=shouye&um=xuanfu&uc=xianjinhongbao',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        params = {
            'activityId':1
        }
        response = self.sess.get(url=url,headers=headers,params=params).json()
        if response['code'] == 200:
            self.timingRewardList = response['data']['timingRewardList']
            return True
        elif response['code'] == 1000001:
            logger.info(f"[定时红包]\t{response['errorMessage']}")
            return False

    def getCash(self,dic):
        url = 'https://store.oppo.com/cn/oapi/omp-web/web/dailyCash/drawReward'
        headers = {
            'Host': 'store.oppo.com',
            'Connection': 'keep-alive',
            'Origin': 'https://store.oppo.com',
            'source_type': '501',
            'clientPackage': 'com.oppo.store',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json, text/plain, */*',
            'Referer': 'https://store.oppo.com/cn/app/cashRedEnvelope?activityId=1&us=shouye&um=xuanfu&uc=xianjinhongbao',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        data = {
            'activityId':1,
            'channel':1,
            'channelRewardId':dic['id']
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['code'] == 200:
            logger.info(f"[定时红包]\t第{dic['id']}个红包:{response['data']['amount']}")
        elif response['code'] == 1000001:
            logger.info(f"[定时红包]\t第{dic['id']}个红包:{response['errorMessage']}")

    def runtimeReward(self):
        for each in self.timingRewardList:
            if each['hasDraw'] == False:
                self.getCash(dic=each)
                break

    # pushPlus配信
    @staticmethod
    def sendForPush():
        if [each for each in admin['mask'] if each == os.path.basename(__file__)[:-3]] == []:
            with open(file=LOG_FILE,mode='r',encoding='utf-8') as f:
                content = f.read()
            url = 'http://www.pushplus.plus/send'
            data = {
                "token": admin['pushGroup']['pushToken'],
                "title":"欢太任务通知",
                "content":content,
                "template":"txt"
            }
            if admin['pushGroup']['pushToken'] != "":
                if admin['pushGroup']['pushTopic'] != "":
                    data['topic'] = admin['pushGroup']['pushTopic']
                response = requests.post(url=url,data=json.dumps(data)).json()
                if response['code'] == 200:
                    logger.info(f"Push Plus发信成功！\n")
                else:
                    logger.info(f"Push Plus发信失败！\t失败原因:{response['msg']}")
            else:
                logger.info(f"未配置pushPlus Token,取消配信！")
        else:
            logger.info(f"{os.path.basename(__file__)[:-3]}\t发信功能被屏蔽")

    # 执行欢太商城实例对象
    def start(self):
        self.sess.headers.update({
            "User-Agent":self.dic['UA']
        })
        self.sess.cookies.update({
            "Cookie": f"source_type=501;{self.dic['CK']}"
        })
        if self.login() == True:
            if self.getDailyCashTask() == True:
                self.runtimeReward()
        logger.info('*' * 40 + '\n')

if __name__ == '__main__':
    for each in accounts:
        if each['CK'] != "" and each['UA'] != "":
            timingCash = TimingCash(each)
            for count in range(3):
                try:
                    time.sleep(random.randint(2,5))    # 随机延时
                    timingCash.start()
                    break
                except requests.exceptions.ConnectionError:
                    logger.info(f"{timingCash.dic['user']}\t请求失败，随机延迟后再次访问")
                    time.sleep(random.randint(2,5))
                    continue
            else:
                logger.info(f"账号: {timingCash.dic['user']}\n状态: 取消登录\n原因: 多次登录失败")
                break
    TimingCash.sendForPush()
