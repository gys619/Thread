# !/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
项目名称: JD-Script / jd_Evaluation
Author: qiu_lzsnmb
功能：全自动完成评价+晒单，提高京享值，满足强迫症
cron: 0 6 */3 * *
new Env('京东全自动评价');
'''

################【参数】######################
# [填写您要批量评价的范围]  ENV设置： export Ev_Scope='1,2,4-5'
#  目前只支持逗号(,)和减号(-),默认只评价前3个(1-3)
import json.decoder

Ev_Scope = ''

# 晒单图片更换 ，默认两张裂图随机 ENV设置： export Ev_img='//img30.360buyimg.com/shaidan/······.jpg'
Ev_img = ''

# 评价星级，评论是好评，星级默认4-5随机。只支持逗号 ENV设置： export Ev_xing='4,5'
Ev_xing = '4,5'
###############################################

import os
import random
import re
import sys
import time
from urllib.parse import unquote

# noinspection PyUnresolvedReferences
from sendNotify import send

try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：pip3 install requests")
    exit(3)

try:
    import jieba.analyse

    jieba.setLogLevel(jieba.logging.INFO)
except Exception as e:
    print(e, "\n缺少jieba 模块，请执行命令安装：pip3 install jieba")
    exit(3)

pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep


def printf(text):
    print(text)
    sys.stdout.flush()


def getEnvs(label):
    try:
        if label == 'True' or label == 'yes' or label == 'true' or label == 'Yes':
            return True
        elif label == 'False' or label == 'no' or label == 'false' or label == 'No':
            return False
    except Exception as e:
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


if "Ev_Scope" in os.environ:
    if len(os.environ["Ev_Scope"]) > 1:
        Ev_Scope = os.environ["Ev_Scope"]
        printf(f"已获取并使用Env环境 Ev_Scope:{Ev_Scope}")

if "Ev_img" in os.environ:
    if len(os.environ["Ev_img"]) > 1:
        blueCoin_Cc = getEnvs(os.environ["Ev_img"])
        printf(f"已获取并使用Env环境 Ev_img:{Ev_img}")

if "Ev_xing" in os.environ:
    if len(os.environ["Ev_xing"]) > 1:
        blueCoin_Cc = getEnvs(os.environ["Ev_xing"])
        printf(f"已获取并使用Env环境 Ev_xing:{Ev_xing}")

try:
    xing = []
    for i in Ev_xing.split(','):
        xing.append(i)
except ValueError:
    print('星级参数设置错误')
    exit(3)

Scope = []

# 范围配置！！
try:
    if Ev_Scope == '':
        Scope = [1, 2, 3]
    else:
        for Sco in Ev_Scope.split(','):
            if '-' in Sco:
                b = Sco.split('-')
                for x in range(int(b[0]), int(b[1]) + 1):
                    Scope.append(x)
            else:
                Scope.append(int(Sco))
except ValueError:
    print('当前Ev_Scope出错，程序终止！')
    exit(3)


class getJDCookie(object):
    # 适配各种平台环境ck

    def getckfile(self):
        global v4f
        curf = pwd + 'JDCookies.txt'
        v4f = '/jd/config/config.sh'
        ql_new = '/ql/config/env.sh'
        ql_old = '/ql/config/cookie.sh'
        if os.path.exists(curf):
            with open(curf, "r", encoding="utf-8") as f:
                cks = f.read()
                f.close()
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            cks = r.findall(cks)
            if len(cks) > 0:
                return curf
            else:
                pass
        if os.path.exists(ql_new):
            printf("当前环境青龙面板新版")
            return ql_new
        elif os.path.exists(ql_old):
            printf("当前环境青龙面板旧版")
            return ql_old
        elif os.path.exists(v4f):
            printf("当前环境V4")
            return v4f
        return curf

    # 获取cookie
    def getCookie(self):
        global cookies
        ckfile = self.getckfile()
        try:
            if os.path.exists(ckfile):
                with open(ckfile, "r", encoding="utf-8") as f:
                    cks = f.read()
                    f.close()
                if 'pt_key=' in cks and 'pt_pin=' in cks:
                    r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
                    cks = r.findall(cks)
                    if len(cks) > 0:
                        if 'JDCookies.txt' in ckfile:
                            printf("当前获取使用 JDCookies.txt 的cookie")
                        cookies = ''
                        for i in cks:
                            if 'pt_key=xxxx' in i:
                                pass
                            else:
                                cookies += i
                        return
            else:
                with open(pwd + 'JDCookies.txt', "w", encoding="utf-8") as f:
                    cks = "#多账号换行，以下示例：（通过正则获取此文件的ck，理论上可以自定义名字标记ck，也可以随意摆放ck）\n账号1【Curtinlv】cookie1;\n账号2【TopStyle】cookie2;"
                    f.write(cks)
                    f.close()
            if "JD_COOKIE" in os.environ:
                if len(os.environ["JD_COOKIE"]) > 10:
                    cookies = os.environ["JD_COOKIE"]
                    printf("已获取并使用Env环境 Cookie")
        except Exception as e:
            printf(f"【getCookie Error】{e}")

        # 检测cookie格式是否正确

    def getUserInfo(self, ck, pinName, userNum):
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback='
        headers = {
            'Cookie': ck,
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn'
        }
        try:
            if sys.platform == 'ios':
                resp = requests.get(url=url, verify=False, headers=headers, timeout=60).json()
            else:
                resp = requests.get(url=url, headers=headers, timeout=60).json()
            if resp['retcode'] == "0":
                nickname = resp['data']['userInfo']['baseInfo']['nickname']
                return ck, nickname
            else:
                context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
                printf(context)
                return ck, False
        except Exception:
            context = f"账号{userNum}【{pinName}】Cookie 已失效！请重新获取。"
            printf(context)
            return ck, False

    def iscookie(self):
        """
        :return: cookiesList,userNameList,pinNameList
        """
        cookiesList = []
        userNameList = []
        pinNameList = []
        if 'pt_key=' in cookies and 'pt_pin=' in cookies:
            r = re.compile(r"pt_key=.*?pt_pin=.*?;", re.M | re.S | re.I)
            result = r.findall(cookies)
            if len(result) >= 1:
                printf("您已配置{}个账号".format(len(result)))
                u = 1
                for i in result:
                    r = re.compile(r"pt_pin=(.*?);")
                    pinName = r.findall(i)
                    pinName = unquote(pinName[0])
                    # 获取账号名
                    ck, nickname = self.getUserInfo(i, pinName, u)
                    if nickname:
                        cookiesList.append(ck)
                        userNameList.append(nickname)
                        pinNameList.append(pinName)
                    else:
                        u += 1
                        continue
                    u += 1
                if len(cookiesList) > 0 and len(userNameList) > 0:
                    return cookiesList, userNameList, pinNameList
                else:
                    printf("没有可用Cookie，已退出")
                    exit(3)
            else:
                printf("cookie 格式错误！...本次操作已退出")
                exit(4)
        else:
            printf("cookie 格式错误！...本次操作已退出")
            exit(4)


getCk = getJDCookie()
getCk.getCookie()
# 获取v4环境 特殊处理
if os.path.exists(v4f):
    try:
        with open(v4f, 'r', encoding='utf-8') as f:
            curenv = locals()
            for i in f.readlines():
                r = re.compile(r'^export\s(.*?)=[\'\"]?([\w\.\-@#!&=_,\[\]\{\}\(\)]{1,})+[\'\"]{0,1}$', re.M | re.S | re.I)
                r = r.findall(i)
                if len(r) > 0:
                    for i in r:
                        if i[0] != 'JD_COOKIE':
                            curenv[i[0]] = getEnvs(i[1])
    except:
        pass

if "qjd_zlzh" in os.environ:
    if len(os.environ["qjd_zlzh"]) > 1:
        qjd_zlzh = os.environ["qjd_zlzh"]
        qjd_zlzh = qjd_zlzh.replace('[', '').replace(']', '').replace('\'', '').replace(' ', '').split(',')
        # printf("已获取并使用Env环境 qjd_zlzh:", qjd_zlzh)


# 评价生成
def generation(pname, _class=0, _type=1):
    # 0是追评 1是评价
    # class 0是评价 1是提取id
    try:
        name = jieba.analyse.textrank(pname, topK=5, allowPOS='n')[0]
    except:
        name = "宝贝"
    if _class == 1:
        return name
    else:
        datas = {
            1: {
                "开始": [
                    "考虑买这个$之前我是有担心过的，因为我不知道$的质量和品质怎么样，但是看了评论后我就放心了。",
                    "买这个$之前我是有看过好几家店，最后看到这家店的评价不错就决定在这家店买 ",
                    "看了好几家店，也对比了好几家店，最后发现还是这一家的$评价最好。",
                    "看来看去最后还是选择了这家。",
                    "之前在这家店也买过其他东西，感觉不错，这次又来啦。",
                    "这家的$的真是太好用了，用了第一次就还想再用一次。"
                ],
                "中间": [
                    "收到货后我非常的开心，因为$的质量和品质真的非常的好！",
                    "拆开包装后惊艳到我了，这就是我想要的$!",
                    "快递超快！包装的很好！！很喜欢！！！",
                    "包装的很精美！$的质量和品质非常不错！",
                    "收到快递后迫不及待的拆了包装。$我真的是非常喜欢",
                    "真是一次难忘的购物，这辈子没见过这么好用的东西！！"
                ],
                "结束": [
                    "经过了这次愉快的购物，我决定如果下次我还要买$的话，我一定会再来这家店买的。",
                    "不错不错！",
                    "我会推荐想买$的朋友也来这家店里买",
                    "真是一次愉快的购物！",
                    "大大的好评!以后买$再来你们店！(￣▽￣)",
                    "大家可以买来试一试，真的是太爽了，一晚上都沉浸在爽之中"
                ]
            },
            0: {
                "开始": [
                    "用了这么久的 $ ,东西是真的好用，真的难忘上一次购买时使用的激动，",
                    "使用了几天 $ ",
                    "这是我买到的最好用的$ ",
                    "我草，是真的好用啊，几天的体验下来，真是怀恋当初购买时下单的那一刻的激动!!!!!!!!!",
                    "我草，用了几天下来，$ 变得好大好大，这精致的外观，这细腻的皮肤，摸上去，真是令人激动！",
                    "$  这小家伙，真是太令人愉悦了，用了都说好好好好！",
                    "不用睡不着觉，这家店的 $ 真是太好用了。",
                    "真是牛逼啊，一天不用难受一天，用了一天难受一年！"
                ],
                "中间": [
                    "东西还行,",
                    "确实是好东西，推荐大家购买,",
                    "$  的质量真的非常不错！",
                    "$  真是太好用了，真是个宝贝，难忘的宝贝!!",
                    "$  短短几天的体验，令人一生难忘",
                    "$  用了这么久了，它长的真是太可爱了",
                    "这可真是个小宝贝！",
                    "五星好评，安排上，太好用拉！！！"
                ],
                "结束": [
                    "推荐大家来尝试",
                    "这家店给我对于$能做成这样刷新了世界观!",
                    "真是一次愉快的购物！",
                    "以后买$还来这家店，就没见过这么好用的东西！",
                    "下次还来这家店买 $ ，就没见过这么牛逼的东西",
                    "东西很好，孩子很喜欢",
                    "现在睡觉都抱着  $  睡觉，真是太好用了",
                    "令人难玩的一次购物"
                ]
            }
        }
        if _type == 1:
            # return 5, '东西很好，孩子很喜欢，每天晚上不抱着碎觉，就完全睡不着。买的时候看见评论里都说好就买了，看到发货的时候挺激动的，到了之后，满怀期待一激动得从快递员那里拿回了寝室，试一下，结果挺不错啊！而且客服小姐姐也特别的好，很有礼貌，客服小姐姐也是秒回我的疑问呢，嘻嘻，下次还会回购哒。'
            comments = datas[_type]
            return (
                    random.choice(comments["开始"]) + random.choice(comments["中间"]) + random.choice(comments["结束"])).replace("$", name)
        elif _type == 0:
            comments = datas[_type]
            return (
                    random.choice(comments["开始"]) + random.choice(comments["中间"]) + random.choice(comments["结束"])).replace("$", name)


def start():
    Cent = {}

    def op(headers, _type=True):
        Ci = []
        if not _type:
            url = 'https://wq.jd.com/bases/orderlist/list?order_type=6&start_page=1&page_size=10'
        he = headers
        he['referer'] = 'https://wqs.jd.com/order/orderlist_merge.shtml?jxsid=16355625882984298965&orderType=all&ptag=7155.1.11'
        # try:
        if True:
            page = 1
            judgmentAndEvaluation = 0  # 判断是否评价完成
            OUT = True
            while OUT:
                req = requests.get(f'https://wq.jd.com/bases/orderlist/list?order_type=6&start_page={page}&last_page=0&page_size=10', headers=he)
                data = req.json()
                for i, da in enumerate(data['orderList']):
                    oid = da['orderId']
                    if len(da['productList']) == 1:  # 单订单
                        pid = da['productList'][0]['skuId']
                        name = da['productList'][0]['title']
                        cname = None
                        for j in da['buttonList']:
                            if j['id'] == 'toComment':
                                cname = j['name']  # 评价按钮名字
                        if cname is None:
                            # printf("没获得到按钮数据，跳过这个商品！")
                            continue
                        elif cname == '查看评价':
                            judgmentAndEvaluation += 1
                            if judgmentAndEvaluation == 20:
                                OUT = False
                            continue
                        else:
                            judgmentAndEvaluation = 0
                        Ci.append({'name': name, 'oid': oid, 'pid': pid, 'cname': cname, 'multi': False})
                    else:
                        # 针对多订单的处理
                        odd_url = 'https://api.m.jd.com/api?body={"orderId":"%s"}&appid=jd-cphdeveloper-m&functionId=getEvalPage' % oid
                        odd_req = requests.get(odd_url, headers=he)
                        odd_data = odd_req.json()
                        for odd_da in odd_data['data']['jingdong_club_voucherbyorderid_get_response']['userCommentVoList']:
                            pid = odd_da['productId']
                            name = odd_da['productSolrInfo']['fullName']
                            after = odd_da['afterDiscussionStatus']
                            append = odd_da['append']
                            cname = "评价晒单" if after == 0 else "追加评价" if append == 1 else "查看评价"
                            if cname == "查看评价":
                                continue
                            Ci.append({'name': name, 'oid': oid, 'pid': pid, 'cname': cname, 'multi': True})
                # break

                page += 1
            # exit()
        # except:
        #     printf('获取评价出错，可能ck失效')
        #     exit()
        return Ci

    # 评价和服务评价
    def ordinary(headers, ce):
        """

        :param headers: 验证头
        :param ce: 用户信息
        :return:
        """
        url = "https://wq.jd.com/eval/SendEval?g_login_type=0&g_ty=ajax"
        for i, da in enumerate(op(headers)):
            he = headers

            def pjsj():
                data = {
                    'productId': da['pid'],
                    'orderId': da['oid'],
                    'score': int(random.choice(xing)),
                    'content': generation(da['name']),
                    'commentTagStr': 1,
                    'userclient': 29,
                    'scence': 101100000
                }
                req = requests.post(url, headers=he, data=data)
                if req.json()['errMsg'] == 'success':
                    # printf("\t普通评价成功！！")
                    Cent[ce]['评价'] += 1
                else:
                    printf("\t普通评价失败了.......")
                    printf(req.json())
                    printf(data)

            def pjfw():
                se_url = f'https://wq.jd.com/eval/SendDSR'
                se_data = {
                    'userclient': '29',
                    'orderId': da["oid"],
                    'otype': random.randint(3, 5),
                    'DSR1': random.randint(3, 5),
                    'DSR2': random.randint(3, 5),
                    'DSR3': random.randint(3, 5),
                    'DSR4': random.randint(3, 5),
                    'g_login_type': '0',
                    'g_ty': 'ls'
                }
                se_req = requests.get(se_url, headers=he, params=se_data)
                if se_req.json()['errMsg'] == 'success':
                    # printf("\t服务评价成功！！")
                    Cent[ce]['服务评价'] += 1
                else:
                    printf("\t服务评价失败了.......")
                    printf(se_data)

            def zjpj():
                zj_url = 'https://wq.jd.com/eval/AppendComment?appid=jd-cphdeveloper-m&functionId=appendComment'
                zj_data = {
                    "productId": da['pid'],
                    "orderId": da['oid'],
                    "content": generation(da['name'], _type=0),
                    'userclient': 29
                }
                zj_req = requests.post(zj_url, headers=he, data=zj_data)
                if zj_req.json()['errMsg'] == 'success':
                    # printf("\t追加评价成功！！")
                    Cent[ce]['追加评价'] += 1
                else:
                    printf("\t追加评价失败了.......")
                    printf(zj_data)

            printf(f'开始评论{i}[当前类型：{da["cname"]}]\t[{da["oid"]}]')

            if da['cname'] == "评价晒单":
                pjsj()
                pjfw()
            elif da['cname'] == '评价服务':
                pjfw()
            elif da['cname'] == '追加评价':
                zjpj()
            else:
                printf(da['cname'])
            # printf('等待5秒-可持续发展！')
            time.sleep(5)

    # 晒单
    def sunbw(headers, ce):
        global Ev_img
        url = "https://wq.jd.com/eval/SendEval?g_login_type=0&g_ty=ajax"
        for i, da in enumerate(op(headers, _type=False)):
            if da['cname'] == "追加评价":
                context = generation(da['name'], _type=0)
                printf(f'开始晒单{i}\t[{da["oid"]}]')
                if da['multi']:
                    # printf('\t多个商品跳过！')
                    continue
                url = 'https://comment-api.jd.com/comment/appendComment?sceneval=2&g_login_type=1&g_ty=ajax'
                if Ev_img == '':
                    Ev_img = random.sample(
                        ['//img30.360buyimg.com/shaidan/jfs/t1/139511/17/26249/850/61852a35Ea7906339/f7eb6b9438917f30.jpg', '//img30.360buyimg.com/shaidan/jfs/t1/143995/15/24443/5327/61860ba4Ecba97817/d7faafa606f76b1f.jpg'], 1)
                data = {
                    'productId': da['pid'],
                    'orderId': da['oid'],
                    'content': context,
                    'userclient': 29,
                    'imageJson': Ev_img
                }
                req = requests.post(url, headers=headers, data=data)
                try:
                    if req.json().get('data').get('result') != {}:
                        # printf("\t晒单成功！！！")
                        Cent[ce]['晒单'] += 1
                        time.sleep(10)
                    else:
                        printf("\t晒单失败...")
                        printf(req.json())
                    # printf('等待5秒-可持续发展！')
                    time.sleep(20)
                except (KeyError, json.decoder.JSONDecodeError):
                    printf(f'当前无数据！返回，可能被风控，返回的数据：{req.json()}')
                    return

    printf('### 开始批量评价 ###')
    global cookiesList, userNameList, pinNameList, ckNum, beanCount, userCount
    cookiesList, userNameList, pinNameList = getCk.iscookie()

    for i, ck, user, pin in zip(range(1, len(cookiesList) + 1), cookiesList, userNameList, pinNameList):
        if i not in Scope:
            continue
        printf(f"\n\n** 开始[账号{i}]-{user} **")
        headers = {
            'cookie': ck,
            'user-agent': 'jdltapp;android;1.0.0;9;860105045422157-bce2658d9db5;network/wifi;model/JKM-AL00a;addressid/0;aid/5d84f5872ec4e5c8;oaid/51fe75e7-7e5d-aefc-fbed-ffffdf7f6bd2;osVer/28;appBuild/694;psn/860105045422157-bce2658d9db5|3;psq/26;uid/860105045422157-bce2658d9db5;adk/;ads/;pap/JA2020_3112531|1.0.0|ANDROID',
        }
        Cent[f'账号{i}[{user}]'] = {'评价': 0, '晒单': 0, '服务评价': 0, '追加评价': 0}
        printf('开始评价与服务评价！')
        ordinary(headers, f'账号{i}[{user}]')
        printf('评价与服务完成！！\n')

        printf('开始晒单！')
        sunbw(headers, f'账号{i}[{user}]')
        printf('晒单完成！！。等待10秒开始下一个账号\n')
        time.sleep(10)

    msg = ''
    for i in Cent:
        msg += f'{i}\n{Cent[i]}\n\n'
    send('京东全自动评价', msg)
    # print('京东全自动评价', msg)


if __name__ == '__main__':
    start()
