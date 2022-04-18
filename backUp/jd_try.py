# 日志不会实时显示，需运行一会才会有日志
# 不建议太多账号同时执行，可能出现未知问题
# -*- encoding:utf-8 -*-

"""
cron: 35 4-20/4 * * *
new Env('京东试用PY版');
"""

import time
import os
import requests
import json
import re


class jd:

    # 获取一些下面函数需要的数据数据
    price = 50#过滤价格
    page = 30#加载的页数
    tabId = 3#设置类别{"tabName":"精选","tabId":"103"},{"tabName":"免费试","tabId":"104"},{"tabName":"母婴玩具","tabId":"9"},{"tabName":"美妆护肤","tabId":"7"},{"tabName":"生鲜美食","tabId":"10"},{"tabName":"图书音像","tabId":"11"},{"tabName":"钟表奢品","tabId":"12"},{"tabName":"个人护理","tabId":"13"},{"tabName":"家庭清洁","tabId":"14"},{"tabName":"食品饮料","tabId":"15"},{"tabName":"家用电器","tabId":"3"},{"tabName":"手机数码","tabId":"4"},{"tabName":"电脑办公","tabId":"5"},{"tabName":"家居家装","tabId":"6"},{"tabName":"服饰鞋包","tabId":"8"},{"tabName":"更多惊喜","tabId":"16"}
    des = ["甲醛","海信","拳击","皮鞋","一双","膜","手机壳","职业装","工装","护腿","胸罩","背心","流量卡","文胸","儿童","牙刷头","适配","课","手术","一对一","1对1","游戏","外教","炒股","资源","万门","小班","优惠券","学习","辅导","你拍","自营","眼科","视频","咨询","日租卡","腾讯大王","5ML","5ml","10ml","指南","服务","痔疮","两片","体验","软件","系统","时时彩","1粒","1颗","一粒","一颗","单片","1片","止泻药","股票","教学","方案","计划","中国移动","中国联通","中国电信","日租卡","大王卡","上网卡","流量卡","电话卡","手机卡","米粉卡","会员卡","验孕","早早孕","二维码","口语","教程","三好网","辅导","数学","语文","化学","物理","视频","试学","脚气","鸡眼","勿拍","在线","四级","六级","四六级","英语","俄语","佑天兰","癣","灰指甲","远程","评估","手册","家政","妊娠","编程","足贴","装修","牙刷头","手机壳","保护","卡","钢化膜","过滤","刷子","墨盒","墨粉","内裤","文胸","刷头","镜片","众福缘","挂饰","领带","鞋垫","牛角","刮痧","充电线","滤芯","挂架","膜","工装","职业装","西服","工作服","赠品","一双","帽子","抵扣","皮鞋","拳击"]
    # 申请的数据
    applyId= []
    # 添加cookie  os.environ["JD_COOKIE"].split("&")
    cookie = os.environ["JD_COOKIE"].split("&")# 青龙面板的cookie获取
    # cookie = ["pt_key=AAJiV433ADA7ixoHjAK2TwFPT58RHxcFBn46UlzQml_6JO1p3PIoLYTUUV42RRcMmCZDM0oHQ20;pt_pin=jd_SdgQSvIEmZir;","pt_key=AAJiVhlLADAKH8IXFZTHiJi37pXybjB71bJ1-UXxoAhyZoTGIXyZPHsEm51bjoensstoCZTHga4;pt_pin=jd_580733dce44ac;"]#添加cookie
    #查询数据申请的标题和商品id
    def query_num(self,page,tabId):
        data2 = 'ext={"prstate":"0"}&appid=newtry&functionId=try_feedsList&uuid=0333464346265636-3653664323631603&clientVersion=10.5.0&client=wh5&osVersion=10&area=22_1930_49322_49429&networkType=wifi&body={"geo":{"lng":103.997301,"lat":30.517789},"tabId":'+str(tabId)+',"page":'+str(page)+',"version":2,"source":"default","client":"app","previewTime":""}'
        res = self.home(data2)
        res_json = json.loads(res)
        feedList = res_json["data"]["feedList"]
        # print(res)
        # 循环遍历数据，获取试用id和标题
        for i in range(0,len(feedList)):
            trialActivityId = feedList[i]["trialActivityId"]
            skuTitle=feedList[i]["skuTitle"]
            sku_price = float(feedList[i]["jdPrice"])
            # print(sku_price)
            self.filter(trialActivityId,skuTitle,sku_price)

    # 程序的主入口，都是基于这个api执行的
    def home(self,data):
        response = requests.post("https://api.m.jd.com/client.action HTTP/1.1",headers=self.header,data=data)
        # print(response.text)
        return response.text

    # 过滤商品和价格，并把要试用的商品添加到applyid
    def filter(self,trialActivityId,skuTitle,sku_price):
        if(self.price>sku_price):
            return ""
        else:
            for tel in self.des:
                if(tel in skuTitle):
                    return print("过滤"+str(trialActivityId))
                else:
                    for i in self.applyId:
                       if(i["trialActivityId"]==trialActivityId):
                           return ""
                    goods_list={"trialActivityId":trialActivityId,"skuTitle":skuTitle,"sku_price":sku_price}
                    return self.applyId.append(goods_list)
    #申请商品
    def apply_goods(self,goods_ids):
        for i in goods_ids:
            goods_id = i["trialActivityId"]
            for c in self.cookie:
                self.header["Cookie"] = c.strip()
                apply_header = self.header
                # print(apply_header)
                data='appid=newtry&functionId=try_apply&uuid=0333464346265636-3653664323631603&clientVersion=10.5.0&client=wh5&osVersion=10&area=22_1930_49322_49429&networkType=wifi&body={"geo":{"lng":103.997301,"lat":30.517789},"activityId":'+str(goods_id)+',"previewTime":""}'
                res = requests.post("https://api.m.jd.com/client.action HTTP/1.1", headers=apply_header, data=data)
                patter = "pt_pin=(.*?);"
                pt_pin=re.compile(patter).findall(apply_header["Cookie"])
                time.sleep(5)
                print(i["skuTitle"]+"---"+str(pt_pin)+"---"+json.loads(res.text)["message"])

    def __init__(self):
            self.header = {
                'Host':'api.m.jd.com',
                'Accept':'application/json, text/plain, */*',
                'Connection': 'keep-alive',
                "Sec-Fetch-Mode":"cors",
                "Accept-Encoding": "gzip, deflate, br",
                "X-Requested-With":"com.jingdong.app.mall",
                "Sec-Fetch-Site": "same-site",
                "Origin": "https://prodev.m.jd.com",
                "Referer":"https://prodev.m.jd.com/mall/active/G7sQ92vWSBsTHzk4e953qUGWQJ4/index.html?babelChannel=ttt14&has_native=0&tttparams=8wlC8eyJnTGF0IjoiMzAuOTI2MzE4IiwiZ0xuZyI6IjEwMy44MTk1NzEiLCJncHNfYXJlYSI6IjIyXzE5MzBfNDkzMjRfNTI1MTMiLCJsYXQiOjMwLjUxNzU2NSwibG5nIjoxMDMuOTk3Mjc3LCJtb2RlbCI6Ik1JIDgiLCJwcnN0YXRlIjoiMCIsInVuX2FyZWEiOiIyMl8xOTMwXzQ5MzIyXzQ5NDI5In50%3D&sid=7063f0659f66a5d7ac1dffd13e85eefw&un_area=22_1930_49322_49429",
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'jdapp;android;10.5.0;;;appBuild/95837;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1650000135503%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJK%3D%22%2C%22ad%22%3A%22CNDuDQHsZWDtDWY0CtZrCK%3D%3D%22%2C%22od%22%3A%22CtqmCwYyEJOzCtO1DJGmCK%3D%3D%22%2C%22ov%22%3A%22Ctu%3D%22%2C%22ud%22%3A%22CNDuDQHsZWDtDWY0CtZrCK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045745 Mobile Safari/537.36',
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cookie": self.cookie[0]
            }

            for i in range(0,self.page):
                self.query_num(i,self.tabId)
            # print(self.applyId)
            self.apply_goods(self.applyId)
jd()
