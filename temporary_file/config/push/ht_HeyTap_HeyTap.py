# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/9/12
# @Author  : 2984922017@qq.com
# @File    : HeyTap.py
# @Software: PyCharm
'''
cron:  25 5,12 * * * HeyTap.py
new Env('欢太任务中心');
'''
import os
import sys
import json
import time
import random
import logging

# 配置文件
from htconfig import admin, accounts, HeyTap_LOG_PATH

# 日志模块
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logFormat = logging.Formatter("%(message)s")
LOG_FILE = os.path.join(HeyTap_LOG_PATH if HeyTap_LOG_PATH != "" else os.path.dirname(os.path.abspath(__file__)) ,f"{os.path.basename(__file__)[:-3]}.log")

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
logger.info(f"任务:{'任务中心'}\n时间:{time.strftime('%Y-%m-%d %H:%M:%S',time.localtime())}")

class HeyTap:
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

    # 任务中心
    # 位置:我的 -> 任务中心
    # 函数作用:获取任务数据以及判断CK是否正确
    def getTaskList(self):
        url = 'https://store.oppo.com/cn/oapi/credits/web/credits/show'
        headers = {
            'Host': 'store.oppo.com',
            'Connection': 'keep-alive',
            'source_type': '501',
            'clientPackage': 'com.oppo.store',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9',
            'X-Requested-With': 'com.oppo.store',
            'Referer': 'https://store.oppo.com/cn/app/taskCenter/index?us=gerenzhongxin&um=hudongleyuan&uc=renwuzhongxin'
        }
        response = self.sess.get(url=url,headers=headers).json()
        if response['code'] == 200:
            self.taskData = response['data']
            return True
        else:
            logger.info(f"{self.dic['user']}\t失败原因:{response['errorMessage']}")
            return False

    # 每日签到
    # 位置: APP → 我的 → 签到
    def clockIn(self):
        self.dailyTask()            # 获取签到和每日任务的数据
        if self.clockInData['status'] == 0 :
            for each in self.clockInData['gifts']:
                if each['today'] == True:
                    url = 'https://store.oppo.com/cn/oapi/credits/web/report/immediately'
                    headers = {
                        'Host': 'store.oppo.com',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Connection': 'keep-alive',
                        'Accept-Language': 'zh-CN,en-US;q=0.9',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'referer':'https://store.oppo.com/cn/app/taskCenter/index'
                    }
                    data = {
                        'amount': each['credits']
                    }
                    while True:
                        response = self.sess.post(url=url, headers=headers,data=data).json()
                        if response['code'] == 200:
                            logger.info(f"{self.dic['user']}\t签到结果:{response['data']['message']}")
                            break
                        elif response['code'] == 1000005:
                            data = {
                                'amount': each['credits'],
                                'type': each['type'],
                                'gift': each['gift']
                            }
                        else:
                            logger.info(f"{self.dic['user']}\t签到结果:{response['errorMessage']}")
                            break
        elif self.clockInData['status'] == 1:
            logger.info(f"{self.dic['user']}\t今日已签到")
        else:
            logger.info(f"{self.dic['user']}\t未知错误")

    # 秒杀详情页获取商品数据
    def getGoodMess(self,count=10):
        taskUrl = f'https://msec.opposhop.cn/goods/v1/SeckillRound/goods/{random.randint(100,250)}'    # 随机商品
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
            'pageSize':count + random.randint(1,3)
        }
        response = self.sess.get(url=taskUrl,headers=headers,params=params).json()
        if response['meta']['code'] == 200:
            return response

    # 整合每日浏览、分享、推送数据
    def dailyTask(self):
        self.clockInData = self.taskData['userReportInfoForm']  # 签到数据源
        for eachTask in self.taskData['everydayList']:          # 每日任务数据源
            if eachTask['marking'] == 'daily_viewgoods':
                self.viewData = eachTask
            elif eachTask['marking'] == 'daily_sharegoods':
                self.shareData = eachTask
            # elif eachTask['marking'] == 'daily_viewpush':
            #     self.pushData = eachTask

    # 浏览任务
    def runViewTask(self):
        if self.viewData['completeStatus'] == 0:
            self.viewGoods(count=self.viewData['times'] - self.viewData['readCount'], flag=1)
        elif self.viewData['completeStatus'] == 1:
            self.cashingCredits(self.viewData['name'],self.viewData['marking'], self.viewData['type'],self.viewData['credits'])
        elif self.viewData['completeStatus'] == 2:
            logger.info(f"[{self.viewData['name']}]\t已完成，奖励已领取")
            time.sleep(random.randint(1,3))


    # 浏览商品
    def viewGoods(self, count,flag,dic=None):
        headers = {
            'clientPackage': 'com.oppo.store',
            'Host': 'msec.opposhop.cn',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Connection': 'keep-alive',
            'User-Agent': 'okhttp/3.12.12.200sp1',
            'Accept-Encoding': 'gzip'
        }
        result = self.getGoodMess(count=count)    # 秒杀列表存在商品url
        if result['meta']['code'] == 200:
            for each in result['detail']:
                url = f"https://msec.opposhop.cn/goods/v1/info/sku?skuId={each['skuid']}"
                self.sess.get(url=url,headers=headers)
                logger.info(f"正在浏览商品id:{each['skuid']}...")
                time.sleep(random.randint(7,10))
            if flag == 1:       # 来源任务中心的浏览任务
                self.cashingCredits(self.viewData['name'], self.viewData['marking'], self.viewData['type'],self.viewData['credits'])
            elif flag == 2:     # 来源赚积分的浏览任务
                self.getLottery(dic)

    # 分享任务
    def runShareTask(self):
        if self.shareData['completeStatus'] == 0:
            self.shareGoods(flag=1,count=self.shareData['times'] - self.shareData['readCount'])
        elif self.shareData['completeStatus'] == 1:
            self.cashingCredits(self.shareData['name'],self.shareData['marking'], self.shareData['type'],self.shareData['credits'])
        elif self.shareData['completeStatus'] == 2:
            logger.info(f"[{self.shareData['name']}]\t已完成，奖励已领取")
            time.sleep(random.randint(1,3))

    # 分享商品
    def shareGoods(self, flag,count):
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
        if flag == 1: # 来源任务中心
            self.cashingCredits(self.shareData['name'],self.shareData['marking'], self.shareData['type'],self.shareData['credits'])


    # 浏览推送任务
    def runViewPush(self):
        if self.pushData['completeStatus'] == 0:
            self.viewPush(self.pushData['times'] - self.pushData['readCount'])
        elif self.pushData['completeStatus'] == 1:
            self.cashingCredits(self.pushData['name'], self.pushData['marking'], self.pushData['type'],self.pushData['credits'])
        elif self.pushData['completeStatus'] == 2:
            logger.info(f"[{self.pushData['name']}]\t已完成，奖励已领取")
            time.sleep(random.randint(1,3))

    # 点击推送
    def viewPush(self,count):
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
            'marking': 'daily_viewpush'
        }
        for i in range(count + random.randint(1,3)):
            self.sess.get(url=url,headers=headers,params=params)
            logger.info(f"正在点击第{i+1}次信息推送...")
            time.sleep(random.randint(7,10))
        self.cashingCredits(self.pushData['name'], self.pushData['marking'], self.pushData['type'],self.pushData['credits'])

    # 领取奖励
    def cashingCredits(self,name,marking,type,amount):
        url = 'https://store.oppo.com/cn/oapi/credits/web/credits/cashingCredits'
        headers = {
            'Host': 'store.oppo.com',
            'Connection': 'keep-alive',
            'Origin': 'https://store.oppo.com',
            'clientPackage': 'com.oppo.store',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9',
            'Referer':'https://store.oppo.com/cn/app/taskCenter/index?us=gerenzhongxin&um=hudongleyuan&uc=renwuzhongxin'
        }
        data = {
            'marking':marking,
            'type':str(type),
            'amount':str(amount)
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['code'] == 200:
            logger.info(f'{name}\t已领取奖励')
        else:
            logger.info(f'{name}\t领取失败')
        time.sleep(random.randint(1,3))

    # 赚积分(抽奖)任务
    def runEarnPoint(self):
        aid = 1418  # 抓包结果为固定值:1418
        self.total = []
        url = 'https://hd.oppo.com/task/list'
        headers = {
            'Host':'hd.oppo.com',
            'Connection': 'keep-alive',
            'Referer':'https://hd.oppo.com/act/m/2021/jifenzhuanpan/index.html?us=gerenzhongxin&um=hudongleyuan&uc=yingjifen',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9',
        }
        params = {
            'aid':aid
        }
        response = self.sess.get(url=url,headers=headers,params=params).json()
        if response['no'] == '200':
            for each in response['data']:
                dic = {
                    'title':each['title'],
                    'aid': aid,
                    't_index': each['t_index'],
                    't_status': each['t_status'],
                    'number': each['number']
                }
                if dic['t_status'] != 2:
                    self.total.append(dic)
            if len(self.total):
                self.earnPoint()
            else:
                logger.info("[赚积分]\t已完成，奖励已领取")
        time.sleep(random.randint(1,3))

    # 赚积分(抽奖)
    def earnPoint(self):
        self.sum = 0
        for each in self.total:
            if each['title'] == '每日签到':
                if each['t_status'] == 0:
                    self.signIn(each)
                elif each['t_status'] == 1:
                    self.getLottery(each)
                elif each['t_status'] == 2:
                    logger.info("每日任务\t抽奖次数已领取")
            elif each['title'] == '浏览商详':
                if each['t_status'] == 0:
                    self.viewGoods(count=6,flag=2,dic=each)     # 调用浏览任务的函数，且抓包结果来看，固定6次
                elif each['t_status'] == 1:
                    self.getLottery(each)
                elif each['t_status'] == 2:
                    logger.info("浏览商详\t抽奖次数已领取")
            time.sleep(random.randint(1,3))
        self.earnPointLottery()

    # 赚积分 -> 每日打卡
    def signIn(self,dic):
        url = 'https://hd.oppo.com/task/finish'
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
            'aid': dic['aid'],
            't_index': dic['t_index']
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['no'] == '200':
            logger.info(f"{dic['title']}\t签到成功")
            self.getLottery(dic)
        else:
            logger.info(f"{dic['title']}\t签到失败")

    # 领取抽奖机会
    def getLottery(self,dic):
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
            'aid': dic['aid'],
            't_index': dic['t_index']
        }
        response = self.sess.post(url=url,headers=headers,data=data).json()
        if response['no'] == '200':
            logger.info(f"{dic['title']}\t领取成功")
            self.sum = self.sum + int(dic['number'])
        else:
            logger.info(f"{dic['title']}\t领取失败")

    # 赚积分抽奖
    def earnPointLottery(self):
        url = 'https://hd.oppo.com/platform/lottery'
        headers = {
            'Host': 'hd.oppo.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Origin': 'https://hd.oppo.com',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://hd.oppo.com/act/m/2021/jifenzhuanpan/index.html?us=gerenzhongxin&um=hudongleyuan&uc=yingjifen',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        data = {
            'aid':1418,
            'lid':1307,
            'mobile':'',
            'authcode':'',
            'captcha':'',
            'isCheck':0,
            'source_type':501,
            'sku':'',
            'spu':''
        }
        for index in range(self.sum):
            response = self.sess.post(url=url,headers=headers,data=data).json()
            if response['no'] == '0':
                if response['data']['goods_name']:
                    logger.info(f"赚积分转盘\t抽奖结果:{response['data']['goods_name']}")
                else:
                    logger.info(f"赚积分转盘\t抽奖结果:空气")
            elif response['no'] == '-8':
                logger.info(f"赚积分转盘\t抽奖失败:{response['msg']}")
                break
            else:
                logger.info(f"赚积分转盘\t抽奖失败:{response}")
            time.sleep(random.randint(1,3))

    # 天天积分翻倍
    def doubledLottery(self):
        url = 'https://hd.oppo.com/platform/lottery'
        headers = {
            'Host': 'hd.oppo.com',
            'Connection': 'keep-alive',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Origin': 'https://hd.oppo.com',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://hd.oppo.com/act/m/2019/jifenfanbei/index.html?us=qiandao&um=task',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.9'
        }
        data = {
            'aid':675,
            'lid':1289,
            'mobile':'',
            'authcode':'',
            'captcha':'',
            'isCheck':0,
            'source_type':501,
            's_channel':'xiaomi',
            'sku':'',
            'spu':''
        }
        for index in range(3):
            response = self.sess.post(url=url,headers=headers,data=data).json()
            if response['no'] == '0':
                if response['data']['goods_name']:
                    logger.info(f"翻倍转盘\t抽奖结果:{response['data']['goods_name']}")
                else:
                    logger.info(f"翻倍转盘\t抽奖结果:空气")
            elif response['no'] == '-11':
                logger.info(f"翻倍转盘\t抽奖失败:{response['msg']}")
                break
            else:
                logger.info(f"翻倍转盘\t抽奖失败:{response}")
            time.sleep(random.randint(1,3))

    # 跑任务中心
    # 位置:我的 -> 任务中心
    def runTaskCenter(self):
        self.clockIn()              # 签到打卡
        self.runViewTask()          # 浏览任务
        self.runShareTask()         # 分享任务
        # self.runViewPush()          # 浏览推送任务
        self.runEarnPoint()         # 赚积分活动
        # self.doubledLottery()       # 天天积分翻倍，基本上抽不中

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
            if self.getTaskList() == True:              # 获取任务中心数据，判断CK是否正确(登录可能成功，但无法跑任务)
                self.runTaskCenter()                    # 运行任务中心
            logger.info('*' * 40 + '\n')

if __name__ == '__main__':
    for each in accounts:
        if each['CK'] != "" and each['UA'] != "":
            heyTap = HeyTap(each)
            for count in range(3):
                try:
                    time.sleep(random.randint(2,5))    # 随机延时
                    heyTap.start()
                    break
                except requests.exceptions.ConnectionError:
                    logger.info(f"{heyTap.dic['user']}\t请求失败，随机延迟后再次访问")
                    time.sleep(random.randint(2,5))
                    continue
            else:
                logger.info(f"账号: {heyTap.dic['user']}\n状态: 取消登录\n原因: 多次登录失败")
                break
    HeyTap.sendForPush()
