# 京乐玩-瓜分京豆 通用模板 create by doubi
# openid 留空即可，不建议青龙使用，青龙玩不动，最好本地，本地在同目录下创建一个‘cklist.txt，将ck放在里面’
# 目前新号助力10豆/人 老号助力2豆/人 
from secrets import choice
import sys
import re
import random, asyncio, datetime, json, time, random, hashlib, os
from unittest import result

import httpx
from urllib.parse import quote_plus, unquote_plus
from functools import partial
import logging
from requests import ConnectTimeout

activatyname = "京乐玩-瓜分京豆"
salt = "cXRofWK6"
me = ""  # 小程序openid 留空
group_size = 200 # 并发数建议 50-1500 

inveteck = ''  # 车头子ck

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(lineno)d %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(activatyname)

httpx_client = httpx.AsyncClient()

# 随机ua
def randomuserAgent():
    # global uuid, addressid, iosVer, iosV, clientVersion, iPhone, area, ADID, lng, lat
    uuid = "".join(
        random.sample(
            [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "a",
                "b",
                "c",
                "z",
            ],
            40,
        )
    )
    addressid = "".join(random.sample("1234567898647", 10))
    iosVer = "".join(
        random.sample(["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1"], 1)
    )
    iosV = iosVer.replace(".", "_")
    clientVersion = "".join(random.sample(["10.3.0", "10.2.7", "10.2.4"], 1))
    iPhone = "".join(random.sample(["8", "9", "10", "11", "12", "13"], 1))
    area = (
        "".join(random.sample("0123456789", 2))
        + "_"
        + "".join(random.sample("0123456789", 4))
        + "_"
        + "".join(random.sample("0123456789", 5))
        + "_"
        + "".join(random.sample("0123456789", 4))
    )
    ADID = (
        "".join(random.sample("0987654321ABCDEF", 8))
        + "-"
        + "".join(random.sample("0987654321ABCDEF", 4))
        + "-"
        + "".join(random.sample("0987654321ABCDEF", 4))
        + "-"
        + "".join(random.sample("0987654321ABCDEF", 4))
        + "-"
        + "".join(random.sample("0987654321ABCDEF", 12))
    )
    lng = "119.31991256596" + str(random.randint(100, 999))
    lat = "26.1187118976" + str(random.randint(100, 999))
    UserAgent = ""
    if not UserAgent:
        return f"jdapp;iPhone;10.0.4;{iosVer};{uuid};network/wifi;ADID/{ADID};model/iPhone{iPhone},1;addressid/{addressid};appBuild/167707;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS {iosV} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/null;supportJDSHWK/1"
    else:
        return UserAgent


# 检测ck状态
async def check(ua, ck):
    try:
        url = "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion"
        header = {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": ck,
            "User-Agent": ua,
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate",
        }
        result = (await httpx_client.get(url=url, headers=header)).text
        codestate = json.loads(result)
        if codestate["retcode"] == "1001":
            msg = "当前ck已失效，请检查"
            return {"code": 1001, "data": msg}
        elif codestate["retcode"] == "0" and "userInfo" in codestate["data"]:
            nickName = codestate["data"]["userInfo"]["baseInfo"]["nickname"]
            return {"code": 200, "name": nickName, "ck": ck}
    except Exception as e:
        return {"code": 0, "data": e}


# 格式化时间
def get_time():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


# 时间戳
def get_now():
    return round(time.time() * 1000)


# 获取京乐玩直播信息
async def index(ck, ua):
    while 1:
        try:
            url = "https://jnk.m.jd.com/mission/user/index"
            headers = {
                "Accept-Encoding": "gzip,compress,br,deflate",
                "Connection": "keep-alive",
                "Host": "jnk.m.jd.com",
                "Cookie": ck,
                "Referer": "https://servicewechat.com/wx5afd69b196301a2f/135/page-frame.html",
                "User-Agent": ua,
                "content-type": "application/json",
            }
            body = {}
            res = (await httpx_client.post(url=url, headers=headers, data=json.dumps(body))).text
            res_json = json.loads(res)
            if res_json["success"]:
                data = res_json["data"]
                for key in data:
                    if "live" in key.keys():
                        return {"success": True, "data": key["live"]}
            else:
                return {"success": False}
        except:
            pass


def get_viewId(pin, actId):
    tt = str(get_now())  # (new Date).getTime() 第一个tt生成viewid,然后viewid不变
    bePromotion = "1"
    pin = unquote_plus(pin)
    viewId = hashlib.md5(
        quote_plus(pin + actId + tt + salt + bePromotion).encode("utf-8")
    ).hexdigest()
    token = gettoken(viewId, actId)
    msg = {
        "viewId": str(viewId),
        "tt": int(tt),
        "tokenVersion": 2,
        "token": str(token),
        "actId": int(actId),
        "bePromotion": 1,
    }
    logger.info(msg)
    return msg


def gettoken(viewId, actId):
    tt = str(get_now())
    token = hashlib.md5(
        quote_plus(viewId + actId + tt + salt).encode("utf-8")
    ).hexdigest()
    return token


def get_token(viewId, actId):
    tt = str(get_now())
    token = hashlib.md5(
        quote_plus(viewId + actId + tt + salt).encode("utf-8")
    ).hexdigest()
    msg = {
        "viewId": str(viewId),
        "tt": int(tt),
        "tokenVersion": 2,
        "token": str(token),
        "actId": int(actId),
        "bePromotion": 1,
    }
    return msg


# promotion/invite
async def post_url(def_id, ck, body):
    while 1:
        try:
            url = "https://jnk.m.jd.com/" + def_id
            headers = {
                "Cookie": f"{ck}wxclient=gxhwx;ie_ai=1;",
                "content-type": "application/json",
                "Connection": "keep-alive",
                "Accept-Encoding": "gzip,compress,br,deflate",
                "Referer": "https://servicewechat.com/wx5afd69b196301a2f/135/page-frame.html",
                "Host": "jnk.m.jd.com",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.18(0x1800123f) NetType/WIFI Language/zh_CN",
            }
            bdoy = json.dumps(body)
            res = (await httpx_client.post(url=url, headers=headers, data=json.dumps(body))).text
            pin = re.findall(r"(pt_pin=([^; ]+)(?=;?))", ck)[0][1]
            logger.info(f'post_url:{unquote_plus(pin)}:{res}')
            res_json = json.loads(res)
            # return json.dumps(res_json,indent=2,ensure_ascii=False)
            return res_json
        except:
            pass

# 检查pin
def checkpin(cks: list, pin):
     for ck in cks:
         if pin in ck:
             return ck
         else:
             None

async def task(ck, promotionId):
    pin = re.findall(r"(pt_pin=([^; ]+)(?=;?))", ck)[0][1]
    logger.info(f"您好[{pin}]")
    result = await post_url(
        "mission/user/promotion/status", ck, {"promotionId": promotionId}
    )
    res = get_viewId(pin, str(promotionId))
    viewId = res["viewId"]
    result = await post_url("viewlog/user/recordLog", ck, res)
    await asyncio.sleep(25)
    success = 0
    while True:
        token = get_token(viewId, str(promotionId))
        result = await post_url("viewlog/user/recordLog", ck, token)
        if result['code']==-100 or '未登录' in str(result):
            return
        if result["code"] == 0 and success == 5:
            logger.info(result["msg"])
            break
        if success == 2 or success == 3:
            result = await post_url(
                "mission/user/promotion/join",
                ck,
                {
                    "promotionId": promotionId,
                    "nickName": "微信用户",
                    "avatarUrl": "https://static-alias-1.360buyimg.com/jzt/mp/images/default_user_img.png",
                    "openId": "",
                },
            )
            if result['code']==1:
                break
            else:
                success += 1
                continue
        else:
            success += 1
            continue
    await post_url("mission/user/promotion/status", ck, {"promotionId": promotionId})
    await post_url(
        "mission/user/promotion/join",
        ck,
        {
            "promotionId": promotionId,
            "nickName": "微信用户",
            "avatarUrl": "https://static-alias-1.360buyimg.com/jzt/mp/images/default_user_img.png",
            "openId": "",
        },
    )

async def promotionCreate(ck):
    number = '123456789'
    sa = []
    for i in range(6):
        sa.append(choice(number))
    numbers = ''.join(sa)
    body = {"nickName":"微信用户",
            "avatarUrl":"https://static-alias-1.360buyimg.com/jzt/mp/images/default_user_img.png",
            "openId":"",
            "cellphone":f"15214{str(numbers)}"
            }
    result = await post_url('mission/user/promotion/create',ck,body)
    return result

async def search(ck,ua):
    while 1:
        try:
            result = await index(ck, ua)  # 获取频道信息
            if not result["success"]:
                logger.warn("目前没有任何直播间信息")
                return [],None
            liveres = []
            for n, live in enumerate(result["data"], 1):
                liveId = live["liveId"]  # 直播id
                result = await post_url('mission/user/promotion/invite',ck,{
                                                                                "nickName":"微信用户",
                                                                                "avatarUrl":"https://static-alias-1.360buyimg.com/jzt/mp/images/default_user_img.png",
                                                                                "openId":str(''),"liveId":liveId})
                if result['success']:
                    if result['msg'] is None:
                        liveId = result['data']['liveId']
                        liveres.append(str(liveId))
                    if '未注册' in str(result):
                        result = await promotionCreate(ck)
                        if result['success']:
                            print('注册成功')
                        else:
                            print('注册失败log:'+str(result))
                else:
                    print(result['msg'])
                    continue
                
            return liveres
        except:
            pass

# 主程序
async def main():
    try:
        cks = os.environ["JD_COOKIE"].split("&")
    except:
        with open('cklist.txt','r') as f:
            cks = f.read().split('\n')
    logger.info(f"共:{len(cks)}个CK")
    
    while True:
        logger.info("------轮询------")
        logger.info(f"轮询ck")
        rand_ck = choice(cks[5:15])
        ua = randomuserAgent()  # 随机ua
        if inveteck == '':
            logger.info(f"没有配置车头子ck，快去填写吧")
            return
        liveres = await search(rand_ck, ua)
        if len(liveres) == 0:
            logger.info("暂无活动,等待")
            await asyncio.sleep(5)   # 等待时间
            continue
        
        liveId1 = liveres[0]
        while 1:
            result = await post_url(
                "mission/user/promotion/invite",
                inveteck,
                {
                    "nickName": "微信用户",
                    "avatarUrl": "https://static-alias-1.360buyimg.com/jzt/mp/images/default_user_img.png",
                    "openId": str(me),
                    "liveId": liveId1,
                },
            )
            logger.info(f'result:{result}')
            if '未注册' in str(result):
                result = await promotionCreate(inveteck)
                if result['success']:
                    print('注册成功')
                    break
            if '火爆' in str(result):
                continue
            if "promotionId" in result["data"]:
                promotionId = result["data"]["promotionId"]
                break
            else:
                logger.info(result["msg"])
                return

        cks = cks[1:]
        for idx in range(0, len(cks), group_size):
            logger.info(f"开始执行第{idx//group_size + 1}组")
            group = cks[idx : idx + group_size]
            done, pending = await asyncio.wait(
                [asyncio.create_task(task(ck, promotionId)) for ck in group], timeout=None
            ) 

if __name__ == "__main__":
    asyncio.run(main())
