# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/9/16
# @Author  : 2984922017@qq.com
# @File    : PointsBattle.py
# @Software: PyCharm
'''
cron:  40 5,12 * * * PointsBattle.py
new Env('欢太积分大乱斗');
'''
import os
import sys
import json
import time
import random
import logging

# 配置文件
from htconfig import admin, accounts, Battle_LOG_PATH

# 日志模块
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logFormat = logging.Formatter("%(message)s")
LOG_FILE = os.path.join(Battle_LOG_PATH if Battle_LOG_PATH != "" else os.path.dirname(os.path.abspath(__file__)) ,f"{os.path.basename(__file__)[:-3]}.log")

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
logger.info(f"任务:{'积分大乱斗'}\n时间:{time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())}")

class PointsBattle:
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

    def receiveAward(self,dic):
        aid = 1582
        url = 'https://hd.oppo.com/task/award'
        headers = {
            'Host': 'hd.oppo.com',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Origin': 'https://hd.oppo.com',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://hd.oppo.com/act/m/2021/jifenzhuanpan/index.html?us=gerenzhongxin&um=hudongleyuan&uc=yingjifen',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        data = {
            'aid': aid,
            't_index': dic['t_index']
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['no'] == '200':
            logger.info(f"[{dic['title']}]\t{response['msg']}")
        else:
            logger.info(f"[{dic['title']}]\t{response['msg']}")
        time.sleep(random.randint(3,5))

    def shareGoods(self,count=2,flag=None,dic=None):
        url = 'https://msec.opposhop.cn/users/vi/creditsTask/pushTask'
        headers = {
            'clientPackage': 'com.oppo.store',
            'Host': 'msec.opposhop.cn',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'User-Agent': 'okhttp/3.12.12.200sp1',
            'Accept-Encoding': 'gzip',
        }
        params = {
            'marking': 'daily_sharegoods'
        }
        for i in range(count + random.randint(1,3)):
            self.sess.get(url=url,headers=headers,params=params)
            logger.info(f"正在执行第{i+1}次微信分享...")
            time.sleep(random.randint(7,10))
        if flag == 1: #来源积分大乱斗
            self.receiveAward(dic=dic)
        time.sleep(random.randint(3,5))

    # # 直播,宠粉，浏览商品
    def runViewTask(self,dic=None):
        aid = 1582
        url = 'https://hd.oppo.com/task/finish'
        headers = {
            'Host': 'hd.oppo.com',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Origin': 'https://hd.oppo.com',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://hd.oppo.com/act/m/2021/2021/realmejifendalu/index.html',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        data = {
            'aid': aid,
            't_index': dic['t_index']
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['no'] == '200':
            logger.info(f"[{dic['title']}]\t{response['msg']}")
            self.receiveAward(dic)
        else:
            logger.info(f"[{dic['title']}]\t{response['msg']}")
        time.sleep(random.randint(3,5))

    def getBattleList(self):
        aid = 1582  # 抓包结果为固定值:1582
        url = 'https://hd.oppo.com/task/list'
        headers = {
            'Host':'hd.oppo.com',
            'Connection': 'keep-alive',
            'Referer':'https://hd.oppo.com/act/m/2021/2021/realmejifendalu/index.html',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9',
        }
        params = {
            'aid':aid
        }
        response = self.sess.get(url=url,headers=headers,params=params).json()
        if response['no'] == '200':
            self.taskData = response['data']
            return True
        else:
            logger.info(f"{response['msg']}")
            return False
        time.sleep(random.randint(3,5))

    def runBattleTask(self):
        for each in self.taskData:
            if each['title'] == '分享商品':
                if each['t_status'] == 0:
                    self.shareGoods(flag=1,count=2,dic=each)
                elif each['t_status'] == 1:
                    self.receiveAward(each)
                elif each['t_status'] == 2:
                    logger.info(f"[{each['title']}]\t领取成功")
            elif each['title'] == '参与欢太超级宠粉':
                if each['t_status'] == 0:
                    self.runViewTask(dic=each)
                elif each['t_status'] == 1:
                    self.receiveAward(each)
                elif each['t_status'] == 2:
                    logger.info(f"[{each['title']}]\t任务完成")
            elif each['title'] == '观看直播':
                if each['t_status'] == 0:
                    self.runViewTask(dic=each)
                elif each['t_status'] == 1:
                    self.receiveAward(each)
                elif each['t_status'] == 2:
                    logger.info(f"[{each['title']}]\t任务完成")
            elif each['title'] == '浏览realme专区':
                if each['t_status'] == 0:
                    self.runViewTask(dic=each)
                elif each['t_status'] == 1:
                    self.receiveAward(each)
                elif each['t_status'] == 2:
                    logger.info(f"[{each['title']}]\t任务完成")

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
            if self.getBattleList() == True:              # 获取任务中心数据，判断CK是否正确(登录可能成功，但无法跑任务)
                self.runBattleTask()                        # 运行任务中心
            logger.info('*' * 40 + '\n')

if __name__ == '__main__':
    for each in accounts:
        if each['CK'] != "" and each['UA'] != "":
            pointsBattle = PointsBattle(each)
            for count in range(3):
                try:
                    time.sleep(random.randint(2,5))    # 随机延时
                    pointsBattle.start()
                    break
                except requests.exceptions.ConnectionError:
                    logger.info(f"{pointsBattle.dic['user']}\t请求失败，随机延迟后再次访问")
                    time.sleep(random.randint(2,5))
                    continue
            else:
                logger.info(f"账号: {pointsBattle.dic['user']}\n状态: 取消登录\n原因: 多次登录失败")
                break
    pointsBattle.sendForPush()
