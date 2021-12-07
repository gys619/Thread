# 好物摇一摇打卡活动
# 入口>京东首页>领券中心>券后9.9>右侧中间1元拿好物
# 活动内容为打卡7天获得1元购的优惠券
# 脚本功能为自动打卡签到，如为选择商品，会自动选择可乐，然后打卡。
import time
import os
import re
import requests
import sys
requests.packages.urllib3.disable_warnings()


# 随机ua
def ua_random():
    try:
        from jdEnv import USER_AGENTS as ua
    except:
        ua='jdpingou;android;5.5.0;11;network/wifi;model/M2102K1C;appBuild/18299;partner/lcjx11;session/110;pap/JA2019_3111789;brand/Xiaomi;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.159 Mobile Safari/537.36'
    return ua


## 判断运行环境
class Judge_env(object):
    ## 判断文件位置
    def getcodefile(self):
        global sys
        if '/ql' in os.path.abspath(os.path.dirname(__file__)):
            print("当前环境青龙\n")
            sys.path.append('/ql/scripts')
            if os.path.exists('/ql/log/.ShareCode'):
                return '/ql/log/.ShareCode'
            else:
                return '/ql/log/code'
        elif '/jd' in os.path.abspath(os.path.dirname(__file__)):
            print("当前环境V4\n")
            sys.path.append('/jd/scripts')
            return '/jd/log/jcode'
        else:
            print('自行配置path,cookie\n')

    ## 批量提取pin,输出ckkk,path,pin_list
    def main_run(self):
        path=self.getcodefile()
        if path != '/jd/log/jcode':
            cookie_list=os.environ["JD_COOKIE"].split('&')       # 获取cookie_list的合集
        else:
            cookie_list=self.v4_cookie()     # 获取cookie_list的合集
        pin_list=[re.match(r'pt_key=(.+);pt_pin=(.+);', cookie).group(2) for cookie in cookie_list]  # 提取cookie中的pin
        ckkk=len(cookie_list)      
        return path,cookie_list,pin_list,ckkk

    def v4_cookie(self):
        a=[]
        with open('/jd/config/config.sh', 'r') as f:
            for line in f.readlines():
                try:
                    regular=re.match(r'Cookie'+'.*?=\"(.*?)\"', line).group(1)
                    a.append(regular)
                except:
                    pass
        return a


# 打卡
def ask_api(cookie):
    pin=re.match(r'pt_key=(.+);pt_pin=(.+);', cookie).group(2)
    msg(f'账号 {pin} 开始打卡')
    for n in range(3):
        a=0
        time.sleep(0.5)
        url='https://api.m.jd.com/client.action?appid=XPMSGC2019&monitorSource=&eu=D243836646163&fv=3039353566366&functionId=doDailyPopUpWindowSign&body=%7B%22platformType%22%3A%221%22%2C%22skuId%22%3A%2210029588285090%22%2C%22encryptProjectId%22%3A%222S9p4qVQ3j2bNZchK3wQT77xW4kY%22%2C%22encryptAssignmentId%22%3A%223gBkrNBYRVmSjbHCUa6xfdsJePDP%22%2C%22itemId%22%3A%221%22%7D&client=m&clientVersion=4.6.0&area=4_134_19915_0&geo=%5Bobject%20Object%5D'       
        headers = {
            'Host': 'api.m.jd.com',
            'content-length': '0',
            'accept': 'application/json, text/plain, */*',
            'origin': 'https://h5.m.jd.com',
            'user-agent': ua,
            'sec-fetch-mode': 'cors',
            'x-requested-with': 'com.jingdong.app.mall',
            'sec-fetch-site': 'same-site',
            'referer': 'https://h5.m.jd.com/babelDiy/Zeus/2fDwtAwAQX1PJh51f3UXzLhKiD86/index.html?channel=homeicon&isImmerse=0&v=20210518&sourceFrom=XiachenIcon&sid=7f13c8541877956b79007e6436a2a26w&un_area=4_134_19915_0',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'cookie': cookie
            }  
        data=''
        try:      
            res = requests.post(url=url, headers=headers, timeout=2,verify=False).json()
            a=1
            break
        except:
            msg('请求失败,正在重试')
    if a==1:
        msg(f'{res["message"]}\n')
    else:
        msg(f'账号 {pin} 打卡失败放弃\n')
        


# 检查账号有效性
def getUserInfo(cookie_list):
    a=[]
    for cookie in cookie_list:
        try:
            pin=re.match(r'pt_key=(.+);pt_pin=(.+);', cookie).group(2)
        except:
            msg('有一个cookie 格式出错')
            continue
        time.sleep(0.2)
        url = 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion?orgFlag=JD_PinGou_New&callSource=mainorder&channel=4&isHomewhite=0&sceneval=2&sceneval=2&callback='
        headers = {
            'Cookie': cookie,
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://home.m.jd.com/myJd/home.action',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'me-api.jd.com',
            'User-Agent': ua,
            'Accept-Language': 'zh-cn'
        }
        try:
            if sys.platform == 'ios':
                resp = requests.get(url=url, verify=False, headers=headers, timeout=60).json()
            else:
                resp = requests.get(url=url, headers=headers, timeout=60).json()
            if resp['retcode'] == "0":
                nickname = resp['data']['userInfo']['baseInfo']['nickname']  # 账号名
                a.append(cookie)
            else:
                msg(f"账号 {pin} Cookie 已失效！请重新获取。")
        except Exception:
            msg(f"账号 {pin} Cookie 已失效！请重新获取。")
    return a

## 获取通知服务
class msg(object):
    def __init__(self, m):
        self.str_msg = m
        self.message()
    def message(self):
        global msg_info
        print(self.str_msg)
        try:
            msg_info = f'{msg_info}\n{self.str_msg}'
        except:
            msg_info = f'{self.str_msg}'
        sys.stdout.flush()
    def getsendNotify(self, a=0):
        if a == 0:
            a += 1
        try:
            url = 'https://ghproxy.com/https://raw.githubusercontent.com/wuye999/jd/main/sendNotify.py'
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
        cur_path = os.path.abspath('.')
        sys.path.append(cur_path)
        if os.path.exists(cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except:
                self.getsendNotify()
                try:
                    from sendNotify import send
                except:
                    print("加载通知服务失败~")
        else:
            self.getsendNotify()
            try:
                from sendNotify import send
            except:
                print("加载通知服务失败~")
msg("").main()  # 初始化通知服务


if __name__ == '__main__':
    print('### 7天签到 ###')
    ua=ua_random()
    path,cookie_list,pin_list,ckkk=Judge_env().main_run()
    cookie_list=getUserInfo(cookie_list)
    list(map(ask_api,cookie_list))
    send('### 7天签到 ###', msg_info)   # 启用通知服务

