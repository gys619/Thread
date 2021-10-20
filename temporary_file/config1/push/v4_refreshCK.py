import requests
import json
import re


def getconfig():
    f = open("/jd/config/config.sh", "r")
    cks = re.findall(r"\"(pt_key=.*?;pt_pin=.*?;)\"", f.read())
    f = open("/jd/config/config.sh", "r")
    wskeys = re.findall(r"export wskeys=\"(.*?)\"", f.read())[0].split("@")
    f.close()
    return cks, wskeys


def wstopt(wskey):
    try:
        url = "https://signer.nz.lu/getck"
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
        }
        data = {"wskey": wskey, "key": "xb3z4z2m3n847"}
        r = requests.post(url, headers=headers, data=json.dumps(data), verify=False)
        return r
    except:
        return "error"


if __name__ == '__main__':
    cks, wskeys = getconfig()
    for i in cks:
        pin = re.findall(r"pt_(pin=.*?);", i)[0]
        for ii in wskeys:
            if pin in ii:
                try:
                    r = wstopt(ii)
                    ptck = r.text
                    if r.status_code == 429:
                        print("您的ip请求api过于频繁，已被流控")
                        exit()
                    else:
                        if ptck == "wskey错误":
                            print("有一个wskey可能过期了,%s" % pin)
                        elif ptck == "未知错误" or ptck == "error":
                            print("有一个wskey发生了未知错误,%s" % pin)
                        elif "</html>" in ptck:
                            print("你的ip被cloudflare拦截")
                        else:
                            with open('/jd/config/config.sh', '+r') as f:
                                t = f.read()
                                t = t.replace(i, ptck)
                                f.seek(0, 0)
                                f.write(t)
                                f.truncate()
                            print(pin + "更新成功！")
                except:
                    print("发生了未知错误")
