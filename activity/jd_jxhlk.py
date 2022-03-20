# -*- coding: utf8 -*-
"""
cron: 55 1 * * *
new Env('京喜欢乐砍');
活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html
"""
import requests,os,json
def env(key):
    return os.environ.get(key)

# Cookie
cookies = []
if env("JD_COOKIE"):
    cookies.extend(env("JD_COOKIE").split('&'))
    
# launchid=os.environ['launchid']
# print ("环境变量:export launchi=\"\"")

print ("活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html")
print ("进入活动页面后选择需要砍价的商品，然后运行脚本即可")
print ("脚本会自动查找CK1下面的砍价商品进行砍价，如有剩余助力次数则会助力作者")
print ("可以设置为禁用，需要的时候运行即可")

headers={
    "Host":"m.jingxi.com",
    "Connection":"keep-alive",
    "Sec-Fetch-Mode":"no-cors",
    "User-Agent":"jdpingou;android;5.8.0;11;58f90d6af88fe89f;network/wifi;model/Mi 10;appBuild/19037;partner/xiaomi;;session/199;aid/58f90d6653589f;oaid/60446b553564e;pap/JA2019_3111789;brand/;eu/53836346635;35636fv/6563656853666;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36",
    "Accept":"*/*",
    "X-Requested-With":"com.jd.pingou",
    "Sec-Fetch-Site":"same-site",
    "Referer":"https://st.jingxi.com/sns/202103/20/jxhlk/record.html?newwebview=1",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cookie":cookies[0]
    }

res=requests.get("https://m.jingxi.com/kjactive/jxhlk/jxhlk_myonline?t=1634969716452&_=1634969716452&sceneval=2&g_login_type=1&callback=jsonpCBKA&g_ty=ls",headers=headers).text
x = slice(10, -1)
data=json.loads(res[x])
if data["data"]["onling"] != []:
    launchid=data["data"]["onling"][0]["launchid"]
    print("你当前商品邀请码："+launchid)
else:
    print("账号1未选择商品！")

for i in cookies:
    headers={
    "Host":"m.jingxi.com",
    "Connection":"keep-alive",
    "Sec-Fetch-Mode":"no-cors",
    "User-Agent":"jdpingou;android;5.8.0;11;58f90d6af88fe89f;network/wifi;model/Mi 10;appBuild/19037;partner/xiaomi;;session/186;aid/58f90d6af88fe14f;oaid/60446b582895464e;pap/JA2019_3111789;brand/;eu/5383669303466316;fv/6683836656839366;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36",
    "Accept":"*/*",
    "X-Requested-With":"com.jd.pingou",
    "Sec-Fetch-Site":"same-site",
    "Referer":"https://st.jingxi.com/sns/202103/20/jxhlk/list.html?launchid="+launchid+"=139022.1.2&srv=jx_cxyw_https%3A%2F%2Fwq.jd.com%2Fcube%2Ffront%2FactivePublish%2Fjxhlkv2%2F486449.html_jing",
    "Accept-Encoding":"gzip, deflate, br",
    "Accept-Language":"zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cookie":i
    }
    try:
        res=requests.get("https://m.jingxi.com/kjactive/jxhlk/jxhlk_queryhelp?launchid="+launchid+"&clicktype=0&nomoving=1&_stk=clicktype%2Claunchid%2Cnomoving&_ste=1&h5st=20211022212829803%3B0265027467319163%3B10029%3Btk01wc6341d3830nxrLb%2FUIVQp4wf3n7VRx5NUooArjZTUCs3pdnDbigVtSczYSc%2B3fu2%2BtrlWLO9CuLwzUOU6zStqPq%3Bfb2561fe9086095abb45032f148c54fbaa3cc308307e6f52716969b32bab452c&t=1634909309853&_=1634909309853&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_ty=ls",headers=headers).text
        x = slice(10, -1)
        data=json.loads(res[x])
        msg=data["data"]["guestinfo"]["contenttips"]
        print(msg)
        if "我已经拿走了" in msg:
            launchid=requests.get("https://gitee.com/KingRan521/JD-Scripts/raw/master/shareCodes/jxhlk.json").text
    except:
        print("错误")