# -*- coding: utf-8 -*-
# @Time    : 2021/8/17
# @Author  : hwkxk(丶大K丶)
# @Email   : k@hwkxk.cn

import requests,json,time,logging,traceback,os,random,notify,datetime,configparser

#用户登录全局变量
client = None
session = None
#日志基础配置
# 创建一个logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)
# 创建一个handler，用于写入日志文件
# w 模式会记住上次日志记录的位置
fh = logging.FileHandler('./log.txt', mode='a', encoding='utf-8')
fh.setFormatter(logging.Formatter("%(message)s"))
logger.addHandler(fh)
# 创建一个handler，输出到控制台
ch = logging.StreamHandler()
ch.setFormatter(logging.Formatter("[%(asctime)s]:%(levelname)s:%(message)s"))
logger.addHandler(ch)

#读取用户配置信息
def readConfig():
    try:
        #用户配置信息
        global userconfig
        userconfig = configparser.RawConfigParser()
        path ="./config.ini"
        userconfig.read(path,encoding="utf-8")
        return userconfig
    except Exception as e:
        print(traceback.format_exc())
        logging.error('1.请检查是否在目录下建立了config.ini')

#获取个人信息，判断登录状态
def get_infouser(HT_cookies,HT_UA):
    flag = False
    global session
    session = requests.Session()
    headers = {
        'Host': 'www.heytap.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'User-Agent': HT_UA,
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'cookie': HT_cookies
    }
    response = session.get('https://www.heytap.com/cn/oapi/users/web/member/info', headers=headers)
    response.encoding='utf-8'
    try:
        result = response.json()
        if result['code'] == 200:
            logger.info('==== 欢太商城任务 ====')
            logger.info('【登录成功】: ' + result['data']['realName'])
            flag = True
        else:
            logger.info('【登录失败】: ' + result['errorMessage'])
    except Exception as e:
        print(traceback.format_exc())
        logger.error('【登录】: 发生错误，原因为: ' + str(e))
    if flag:
        return session
    else:
        return False

#任务中心列表，获取任务及任务状态
def taskCenter():
    headers = {
    'Host': 'store.oppo.com',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'User-Agent': HT_UserAgent,
    'Accept-Language': 'zh-cn',
    'Accept-Encoding': 'gzip, deflate, br',
    'cookie': HT_cookies,
    'referer':'https://store.oppo.com/cn/app/taskCenter/index'
    }
    res1 = client.get('https://store.oppo.com/cn/oapi/credits/web/credits/show', headers=headers)
    res1 = res1.json()
    return res1
        

#每日签到
#位置: APP → 我的 → 签到
def daySign_task():
    try:
        dated = time.strftime("%Y-%m-%d")
        headers = {
        'Host': 'store.oppo.com',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'User-Agent': HT_UserAgent,
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'cookie': HT_cookies,
        'referer':'https://store.oppo.com/cn/app/taskCenter/index'
        }
        res = taskCenter()
        status = res['data']['userReportInfoForm']['status']
        if status == 0:
            res = res['data']['userReportInfoForm']['gifts']
            for data in res:
                if data['date'] == dated:
                    qd = data
            if qd['today'] == False:
                data = "amount=" + str(qd['credits'])
                res1 = client.post('https://store.oppo.com/cn/oapi/credits/web/report/immediately', headers=headers,data=data)
                res1 = res1.json()
                if res1['code'] == 200:
                    logger.info('【每日签到成功】: ' + res1['data']['message'])
                else:
                    logger.info('【每日签到失败】: ' + str(res1))
            else:
                print(str(qd['credits']),str(qd['type']),str(qd['gift']))
                if len(str(qd['type'])) < 1 :
                    data = "amount=" + str(qd['credits'])
                else:
                    data = "amount=" + str(qd['credits']) + "&type=" + str(qd['type']) + "&gift=" + str(qd['gift'])
                res1 = client.post('https://store.oppo.com/cn/oapi/credits/web/report/immediately',  headers=headers,data=data)
                res1 = res1.json()
                if res1['code'] == 200:
                    logger.info('【每日签到成功】: ' + res1['data']['message'])
                else:
                    logger.info('【每日签到失败】: ' + str(res1))
        else:
            logger.info('【每日签到】: 已经签到过了！' )   
        time.sleep(1)
    except Exception as e:
        print(traceback.format_exc())
        logging.error('【每日签到】: 错误，原因为: ' + str(e))



#浏览商品 10个sku +20 分
#位置: APP → 我的 → 签到 → 每日任务 → 浏览商品
def daily_viewgoods():
    try:
        headers = {
        'clientPackage': 'com.oppo.store',
        'Host': 'msec.opposhop.cn',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'User-Agent': 'okhttp/3.12.12.200sp1',
        'Accept-Encoding': 'gzip',
        'cookie': HT_cookies,
        }
        res = taskCenter()
        res = res['data']['everydayList']
        for data in res:
            if data['name'] == '浏览商品':
                qd = data
        if qd['completeStatus'] == 0:
            shopList = client.get('https://msec.opposhop.cn/goods/v1/SeckillRound/goods/115?pageSize=10&currentPage=1')
            res = shopList.json()
            if res['meta']['code'] == 200:
                for skuinfo in res['detail']:
                    skuid = skuinfo['skuid']
                    print('正在浏览商品ID：', skuid)
                    client.get('https://msec.opposhop.cn/goods/v1/info/sku?skuId='+ str(skuid), headers=headers)
                    time.sleep(5)
                    
                res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
                if res2 == True:
                    logger.info('【每日浏览商品】: ' + '任务完成！积分领取+' + str(qd['credits']))
                else:
                    logger.info('【每日浏览商品】: ' + "领取积分奖励出错！")
            else:
                logger.info('【每日浏览商品】: ' + '错误，获取商品列表失败')
        elif qd['completeStatus'] == 1:
            res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
            if res2 == True:
                logger.info('【每日浏览商品】: ' + '任务完成！积分领取+' + str(qd['credits']))
            else:
                logger.info('【每日浏览商品】: ' + '领取积分奖励出错！')
        else:
            logger.info('【每日浏览商品】: ' + '任务已完成！')
    except Exception as e:
        print(traceback.format_exc())
        logging.error('【每日浏览任务】: 错误，原因为: ' + str(e))

def daily_sharegoods():
    try:
        headers = {
        'clientPackage': 'com.oppo.store',
        'Host': 'msec.opposhop.cn',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'User-Agent': 'okhttp/3.12.12.200sp1',
        'Accept-Encoding': 'gzip',
        'cookie': HT_cookies,
        }
        daySignList = taskCenter()
        res = daySignList
        res = res['data']['everydayList']
        for data in res:
            if data['name'] == '分享商品到微信':
                qd = data
        if qd['completeStatus'] == 0:
            count = qd['readCount']
            endcount = qd['times']
            while (count <= endcount):
                client.get('https://msec.opposhop.cn/users/vi/creditsTask/pushTask?marking=daily_sharegoods', headers=headers)
                count += 1
            res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
            if res2 == True:
                logger.info('【每日分享商品】: ' + '任务完成！积分领取+' + str(qd['credits']))
            else:
                logger.info('【每日分享商品】: ' + '领取积分奖励出错！')
        elif qd['completeStatus'] == 1:
            res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
            if res2 == True:
                logger.info('【每日分享商品】: ' + '任务完成！积分领取+' + str(qd['credits']))
            else:
                logger.info('【每日分享商品】: ' + '领取积分奖励出错！')
        else:
            logger.info('【每日分享商品】: ' + '任务已完成！')
    except Exception as e:
        print(traceback.format_exc())
        logging.error('【每日分享商品】: 错误，原因为: ' + str(e))

def daily_viewpush():
    try:
        headers = {
        'clientPackage': 'com.oppo.store',
        'Host': 'msec.opposhop.cn',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Connection': 'keep-alive',
        'User-Agent': 'okhttp/3.12.12.200sp1',
        'Accept-Encoding': 'gzip',
        'cookie': HT_cookies,
        }
        daySignList = taskCenter()
        res = daySignList
        res = res['data']['everydayList']
        for data in res:
            if data['name'] == '点推送消息':
                qd = data
        if qd['completeStatus'] == 0:
            count = qd['readCount']
            endcount = qd['times']
            while (count <= endcount):
                client.get('https://msec.opposhop.cn/users/vi/creditsTask/pushTask?marking=daily_viewpush', headers=headers)
                count += 1
            res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
            if res2 == True:
                logger.info('【每日点推送】: ' + '任务完成！积分领取+' + str(qd['credits']))
            else:
                logger.info('【每日点推送】: ' + '领取积分奖励出错！')
        elif qd['completeStatus'] == 1:
            res2 = cashingCredits(qd['marking'],qd['type'],qd['credits'])
            if res2 == True:
                logger.info('【每日点推送】: ' + '任务完成！积分领取+' + str(qd['credits']))
            else:
                logger.info('【每日点推送】: ' + '领取积分奖励出错！')
        else:
            logger.info('【每日点推送】: ' + '任务已完成！')
    except Exception as e:
        print(traceback.format_exc())
        logging.error('【每日推送消息】: 错误，原因为: ' + str(e))


#执行完成任务领取奖励
def cashingCredits(info_marking,info_type,info_credits):
    headers = {
    'Host': 'store.oppo.com',
    'clientPackage': 'com.oppo.store',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'User-Agent': HT_UserAgent,
    'Accept-Language': 'zh-cn',
    'Accept-Encoding': 'gzip, deflate, br',
    'cookie': HT_cookies,
    'Origin': 'https://store.oppo.com',
    'X-Requested-With': 'com.oppo.store',
    'referer':'https://store.oppo.com/cn/app/taskCenter/index?us=gerenzhongxin&um=hudongleyuan&uc=renwuzhongxin'
    }

    data = "marking=" + str(info_marking) + "&type=" + str(info_type) + "&amount=" + str(info_credits)
    res = client.post('https://store.oppo.com/cn/oapi/credits/web/credits/cashingCredits', data=data, headers=headers)
    res = res.json()
    if res['code'] == 200:
        return True
    else:
        return False

#函数入口
def main(event, context):

    users = readConfig()
    #清空上一个用户的日志记录
    open('./log.txt',mode='w',encoding='utf-8')
    global client
    global HT_cookies
    global HT_UserAgent
    HT_cookies = users.get("config","cookies")
    HT_UserAgent = users.get("config","User-Agent")
    #print(HT_cookies,HT_UserAgent)
    client = get_infouser(HT_cookies,HT_UserAgent)

    #如果不想做特定任务可以手动注释
    if client != False:
        daySign_task() #执行每日签到
        daily_viewgoods() #执行每日商品浏览任务
        daily_sharegoods() #执行每日商品分享任务
        daily_viewpush() #执行每日点推送任务

    if users.has_option("dingding", 'dingtalkWebhook'):
        notify.sendDing(users.get("dingding","dingtalkWebhook"),users.get("dingding","dingtalksecret")) #钉钉推送日记
    if users.has_option("telegramBot", 'tgToken'):
        notify.sendTg(users.get("telegramBot","tgToken"),users.get("telegramBot","tgUserId"),users.get("telegramBot","tghost")) #TG机器人推送日记
    if users.has_option("pushplus", 'pushplusToken'):
        notify.sendPushplus(users.get("pushplus","pushplusToken")) #push+ 推送日记
    if users.has_option("enterpriseWechat", 'id'):
        notify.sendWechat(users.get("enterpriseWechat","id"),users.get("enterpriseWechat","secret"),users.get("enterpriseWechat","agentld")) #企业微信通知
    if users.has_option("IFTTT", 'apiKey'):
        notify.sendIFTTT(users.get("IFTTT","apiKey"),users.get("IFTTT","eventName")) #IFTTT 推送日记
    if users.has_option("Bark", 'Barkkey'):
        notify.sendBark(users.get("Bark","Barkkey"),users.get("Bark","Barksave")) #Bark推送助手
       
#主函数入口
if __name__ == '__main__':
    main("","")
