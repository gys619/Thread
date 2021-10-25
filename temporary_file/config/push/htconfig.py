# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2021/9/12
# @Author  : 2984922017@qq.com
# @File    : config.py
# @Software: PyCharm
import os

## Push Plus发信平台
## 官方网站：http://www.pushplus.plus
## 填写您的Token，微信扫码登录后一对一推送或一对多推送下面的token

# "pushGroup" :{
#     "pushToken": "",    # Push Plus Token,非必要,可单独使用
#     "pushTopic": ""     # Push Plus群组编码,非必要
# }

## CK和UA信息需自行抓包,欢太商城 -> 我的 -> 任务中心 -> 领券中心
# 抓包地址:【https://store.oppo.com/cn/oapi/users/web/checkPeople/isNewPeople】

## 参数说明
# {
#     'user':'',        # 备注,必要
#     'CK':'',          # Cookie,必要
#     'UA':''           # User-Agent,必要
# },


## 管理员设置
admin = {
    "pushGroup" :{
        "pushToken": "d154da74191c4ec3b042dc2beb53b9dd",    # Push Plus Token
        "pushTopic": ""                                 # Push Plus群组编码
    },
    "mask":['','']                                   # 屏蔽某些脚本的通知功能，如:['HeyTap','dailyCash']
}

## 账号管理
accounts = [
    {
        'user':'gys',
        'CK':'sa_distinct_id=akxxb2ZnSWxCdWhxNTRFcHpzZWQ4UT09;TOKENSID=TOKEN_eyJhbGciOiJFQ0RTQSIsInYiOiIxIn0.eyJleHAiOjE2MzE5MzI3MzQxMjksImlkIjoiNzUxNTA1MTA5IiwiaWRjIjoic2hvdW1pbmciLCJ0aWQiOiJBQWhtRzRBVnhLQUsvSGtJTm5yMkxuVHJJWjdxeWs0M0Ewa3dLTFUrUFpMTmJGUjE4QzVYaXlwOVBENGxqOGdKRUMwZGNJOGpiN2srOHVBWnlRL0FhYkczenhUeWxlelorTmZkeWtmUHhnOD0ifQ.MEYCIQD-INTQLIDFocYGIrNURzqO-aazcSjJa4UexWJuRkqv-gIhAK-TRh1uKMlyu5yJgLgi2zPtdUKnqRGd_Igbu3h8jIVs;ENCODE_TOKENSID=TOKEN_eyJhbGciOiJFQ0RTQSIsInYiOiIxIn0.eyJleHAiOjE2MzE5MzI3MzQxMjksImlkIjoiNzUxNTA1MTA5IiwiaWRjIjoic2hvdW1pbmciLCJ0aWQiOiJBQWhtRzRBVnhLQUsvSGtJTm5yMkxuVHJJWjdxeWs0M0Ewa3dLTFUrUFpMTmJGUjE4QzVYaXlwOVBENGxqOGdKRUMwZGNJOGpiN2srOHVBWnlRL0FhYkczenhUeWxlelorTmZkeWtmUHhnOD0ifQ.MEYCIQD-INTQLIDFocYGIrNURzqO-aazcSjJa4UexWJuRkqv-gIhAK-TRh1uKMlyu5yJgLgi2zPtdUKnqRGd_Igbu3h8jIVs;app_param={"model":"Redmi Note 7 Pro","brand":"xiaomi","rom":"MIUI","guid":"","ouid":"","duid":"","udid":"","apid":"","sa_device_id":"ec258403d20d9578","romVersion":"V125","apkPkg":"com.oppo.store"}',
        'UA':'Mozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro Build/QKQ1.190915.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 oppostore/200804 MIUI/V125 brand/xiaomi model/Redmi Note 7 ProMozilla/5.0 (Linux; Android 10; Redmi Note 7 Pro Build/QKQ1.190915.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 oppostore/200804 MIUI/V125 brand/xiaomi model/Redmi Note 7 Pro'
    }
]


## 账号管理

## 日志文件
HeyTap_LOG_PATH = ""        # 欢太任务中心脚本日志存放路径,非必要
dailyCash_LOG_PATH = ""     # 欢太天天现金脚本日志存放路径,非必要
timeCash_LOG_PATH = ""      # 欢太定时红包日志存放路径,非必要
ClockIn_LOG_PATH = ""       # 欢太早睡打卡日志存放路径,非必要
Battle_LOG_PATH = ""        # 积分大作战日志存放路径,非必要

## 初始化日志路径(不用管)
if (HeyTap_LOG_PATH != "") and (not os.path.exists(HeyTap_LOG_PATH)):
    os.mkdir(HeyTap_LOG_PATH)
if (dailyCash_LOG_PATH != "") and (not os.path.exists(dailyCash_LOG_PATH)):
    os.mkdir(dailyCash_LOG_PATH)
if (timeCash_LOG_PATH != "") and (not os.path.exists(timeCash_LOG_PATH)):
    os.mkdir(timeCash_LOG_PATH)
if (ClockIn_LOG_PATH != "") and (not os.path.exists(ClockIn_LOG_PATH)):
    os.mkdir(ClockIn_LOG_PATH)
if (Battle_LOG_PATH != "") and (not os.path.exists(Battle_LOG_PATH)):
    os.mkdir(Battle_LOG_PATH)
