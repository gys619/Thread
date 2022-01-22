import os,re,time,asyncio
import sys
sys.path.append(os.path.abspath('../../tmp'))
sys.path.append(os.path.abspath('.'))
try:
    import aiohttp
except Exception as e:
    print(e, "\n请更新pip版本：pip3 install --upgrade pip \n缺少aiohttp 模块，请执行命令安装: pip3 install aiohttp\n")
    exit(3)  

# 调试
# 京喜财富岛兑换111红包
# 59 59 * * * * new
# 环境变量wy_debug_pin，多账号用&分割,
'''
# 环境变量
export wy_debug_cycless="50"          # 重复请求次数
export wy_debug_sleep="0.05"          # 请求间隔为0.05秒
export wy_debug_pin="jd_997eefxx29"                # 需要请求的账号coookie的pin,多账号用&分割
'''

# 环境变量优先于脚本内部变量,不填的项默认脚本内部变量
wy_debug_url=f'https://m.jingxi.com/jxbfd/user/ExchangePrize?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1636019052939&ptag=7155.9.47&dwType=3&dwLvl=9&ddwPaperMoney=111000&strPoolName=jxcfd2_exchange_hb_202111&strPgtimestamp=1636019052791&strPhoneID=48cfb189fc66ca09&strPgUUNum=64182db8d7b256398c651fcf2e90510c&_stk=_cfd_t%2CbizCode%2CddwPaperMoney%2CdwEnv%2CdwLvl%2CdwType%2Cptag%2Csource%2CstrPgUUNum%2CstrPgtimestamp%2CstrPhoneID%2CstrPoolName%2CstrZone&_ste=1&h5st=20211104174412939%3B4806829085285162%3B10032%3Btk01w78e51ba630nVD60s8BL94Uv6vkZjMjSOmrJf53ICGsMS%2FbaV33WITJwFxNBuTQ%2BWxqiCvt2IovjIUhdSXWUeG6b%3Bd808e0e13166d0727ee14bf75933a1148f7317e0ea16cb31a9590f99f66d2772&_=1636019052943&sceneval=2&g_login_type=1&callback=jsonpCBKN&g_ty=ls'       # 京喜财富岛111红包api
wy_debug_headers="Host=m.jingxi.com&accept=*/*&x-requested-with=com.jd.pingou&sec-fetch-mode=no-cors&sec-fetch-site=same-site&accept-encoding=gzip, deflate, br&accept-language=zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7&referer=https://st.jingxi.com/fortune_island/index2.html?ptag=7155.9.47"         
wy_debug_manner='get'           
wy_debug_postdata=''            
wy_debug_cycless = '50'         
wy_debug_sleep = '0.05'         
wy_debug_pin=''                 


# 获取pin
cookie_findall=re.compile(r'pt_pin=(.+?);')
def get_pin(cookie):
    try:
        return cookie_findall.findall(cookie)[0]
    except:
        print('ck格式不正确，请检查')

# ua
def ua():
    try:
        from jdEnv import USER_AGENTS as a
    except:
        a='jdpingou;android;5.5.0;11;network/wifi;model/M2102K1C;appBuild/18299;partner/lcjx11;session/110;pap/JA2019_3111789;brand/Xiaomi;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.159 Mobile Safari/537.36'
    return a


# 读取环境变量
def get_env(env):
    try:
        if env in os.environ:
            a=os.environ[env]
        elif '/ql' in os.path.abspath(os.path.dirname(__file__)):
            try:
                a=v4_env(env,'/ql/config/config.sh')
            except:
                a=eval(env)
        elif '/jd' in os.path.abspath(os.path.dirname(__file__)):
            try:
                a=v4_env(env,'/jd/config/config.sh')
            except:
                a=eval(env)
        else:
            a=eval(env)
    except:
        a=''
    return a

# v4
def v4_env(env,paths):
    b=re.compile(r'(?:export )?'+env+r' ?= ?[\"\'](.*?)[\"\']', re.I)
    with open(paths, 'r') as f:
        for line in f.readlines():
            try:
                c=b.match(line).group(1)
                break
            except:
                pass
    return c 


## 获取cooie
class Judge_env(object):
    def main_run(self):
        if '/jd' in os.path.abspath(os.path.dirname(__file__)):
            cookie_list=self.v4_cookie()
        else:
            cookie_list=os.environ["JD_COOKIE"].split('&')       # 获取cookie_list的合集
        if len(cookie_list)<1:
            msg('请填写环境变量JD_COOKIE\n')    
        return cookie_list

    def v4_cookie(self):
        a=[]
        b=re.compile(r'Cookie'+'.*?=\"(.*?)\"', re.I)
        with open('/jd/config/config.sh', 'r') as f:
            for line in f.readlines():
                try:
                    regular=b.match(line).group(1)
                    a.append(regular)
                except:
                    pass
        return a
cookie_list=Judge_env().main_run()


async def get_url(cookie,n):
    await asyncio.sleep(sleep*n)
    headers = {
        'user-agent': ua,
        'cookie': cookie,
    }
    headers={**headers,**headers_env}
    try:      
        async with session.get(url, headers=headers) as res:
            res =await res.text(encoding="utf-8")
        print('请求完成')
        print(f'{res}\n')
    except:
        print('请求失败\n')
        return
    sys.stdout.flush()


async def post_url(cookie,n):
    await asyncio.sleep(sleep*n)
    headers = {
        'user-agent': ua,
        'cookie': cookie,
    }
    headers={**headers,**headers_env}
    if not data:
        try:      
            async with session.post(url, headers=headers) as res:
                res =await res.text(encoding="utf-8")
            print('请求完成')
            print(f'{res.text}\n')
        except:
            print('请求失败\n')
            return
    else:
        try: 
            async with session.post(url, headers=headers, data=data) as res:
                res =await res.text(encoding="utf-8")
            print('请求完成')
            print(f'{res.text}\n')
        except:
            print('请求失败\n')
            return    
    sys.stdout.flush()


async def asyncclass():
    tasks=list()

    global session
    async with aiohttp.ClientSession() as session:
        cycless=int(get_env('wy_debug_cycless'))
        if (manner:=get_env('wy_debug_manner'))=='get':
            for n in range(cycless):
                for cookie in cookie_list:
                    tasks.append(get_url(cookie,n))

        elif manner=='post':
            for n in range(cycless):
                for cookie in cookie_list:
                    tasks.append(post_url(cookie,n))

        else:
            print(f"不支持的请求方式 {manner}")

        await asyncio.wait(tasks)


if __name__ == '__main__':
    ua=ua()
    debug_pin=get_env('wy_debug_pin')
    cookie_list=[cookie for cookie in cookie_list if get_pin(cookie) in debug_pin]
    url=get_env('wy_debug_url') 
    try:
        headers_env = {header.split("=")[0]:''.join(header.split("=")[1:]) for header in get_env('wy_debug_headers').split('&')}
    except:
        headers_env=dict()
    data=get_env('wy_debug_postdata')
    sleep=float(get_env('wy_debug_sleep'))

    asyncio.run(asyncclass())
  
