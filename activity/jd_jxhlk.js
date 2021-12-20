/*
#惊喜欢乐砍
##惊喜欢乐砍 自定义变量 入口惊喜APP我的 惊喜欢乐砍
export launchid="4559dd7b3f555c9260393166e0674875" ##你的邀请码
export first="false"
活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html

[task_local]
#惊喜欢乐砍
0 7,15 * * * jd_jxhlk.js, tag=惊喜欢乐砍, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
*/
const $ = new Env('惊喜欢乐砍-JS版');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '',
    message;
// const active = '';
let first = false;
let launchid

// if (process.env.active) {
//     active = process.env.active;
// }

if (process.env.first) {
    first = true;
}

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';

!(async () => {
	console.log('请自行打开京喜APP-惊喜欢乐砍')
	console.log('活动入口:https://st.jingxi.com/sns/202103/20/jxhlk/list.html')
    console.log('环境变量添加：export launchid="4559dd7b3f555c9260393166e0674875" ##你的邀请码')
    console.log('环境变量添加：export first="false"')
	console.log('请自行添加环境变量，否则将助力作者，账号太少的可以禁用"')
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    const link = Math.random() > 0.5 ? 'https://gitee.com/KingRan521/JD-Scripts/raw/master/shareCodes/kyd.json' : 'https://gitee.com/KingRan521/JD-Scripts/raw/master/shareCodes/kyd.json'
    launchid = await getAuthorShareCode(link) || []
    if (process.env.launchid) {
        launchid = process.env.launchid.split('@');
    }
    if (launchid.length == 0 && !first) {
        return
    }
    // console.debug(launchid)
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            if (first == true) {
                // await info()
                // await checkaddress()
                // await join()
                await test()
                await help_all()
            } else {
                await help_all()
            }
        }
    }
})()
.catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
async function help_all() {
    for (let i = 0; i < launchid.length; i++) {
        $.signle_launchid = launchid[i]
        // console.debug($.signle_launchid)
        await help()
        await $.wait(3000)
    }
}

function getAuthorShareCode(url) {
    return new Promise(async resolve => {
        const options = {
            url: `${url}?${new Date()}`,
            "timeout": 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
            const tunnel = require("tunnel");
            const agent = {
                https: tunnel.httpsOverHttp({
                    proxy: {
                        host: process.env.TG_PROXY_HOST,
                        port: process.env.TG_PROXY_PORT * 1
                    }
                })
            }
            Object.assign(options, { agent })
        }
        $.get(options, async (err, resp, data) => {
            try {
                resolve(JSON.parse(data))
            } catch (e) {
                // $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
        await $.wait(10000)
        resolve();
    })
}

function info() {
    return new Promise(async (resolve) => {

        let options = {
            url: `https://m.jingxi.com/kjactive/jxhlk/jxhlk_showpage?pageindex=1&pagenum=10&launchid=&_stk=launchid%2Cpageindex%2Cpagenum&_ste=1&h5st=20210611124834764%3B9239928912872162%3B10029%3Btk01wbcaa1c9ba8nd2QzQ1ZoLzNtk5KzYYdDSHRhFzz7%2FRM9cwNQBA92KZHoHeloSktjcQEdy%2FEXtm5u1WsoLf%2F6pNyP%3B05df15c1c37911547393fc59f29a13f564d1f0fb7d7da9d6d0c2b0b6a7c9ffdc&t=1623386914770&_=1623386914770&sceneval=2&g_login_type=1&g_ty=ls`,
            //dS%2Bp85VyjydPuAOOnFP%2Faw%3D%3D
            // body: `functionId=cutPriceByUser&body={"activityId":"852797097823596544","userName":"","followShop":1,"shopId":52021,"userPic":""}&client=wh5&clientVersion=1.0.0`,
            headers: {
                "Referer": "https://st.jingxi.com/sns/202103/20/jxhlk/list.html?ptag=7155.9.89",
                "Host": "m.jingxi.com",
                "User-Agent": "jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Cookie": cookie,
            }
        }

        $.get(options, async (err, resp, data) => {
            try {
                // console.debug(data)
                data = data.match(/(\{[^()]+\}.+)/)[1]

                const reust = JSON.parse(data)
                //console.log(reust)
                if (reust.errcode == 0) {
                    list = reust.data.discountzone
                    for (let i = 0; i < list.length; i++) {
                        $.log(`商品：${list[i].skutitle}\n商品iD：${list[i].active}\n需要邀请：${list[i].needhelpnum}人 免费带回家`)

                    }
                } else

                    console.log(data.msg)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function test() {
    return new Promise(async (resolve) => {
        let options = {
            url: `https://m.jingxi.com/kjactive/jxhlk/jxhlk_myonline?&t=1623387225130&_=1623387225131&sceneval=2&g_login_type=1&g_ty=ls`,
            headers: {
                "Referer": "https://st.jingxi.com/sns/202103/20/jxhlk/list.html?ptag=7155.9.89",
                "Host": "m.jingxi.com",
                "User-Agent": "jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Cookie": cookie,
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                data = data.match(/(\{[^()]+\}.+)/)[1]
                data = JSON.parse(data)
                // console.debug(data)
                const temp = data.data.onling
                // console.debug(temp)
                for (let i = 0; i < temp.length; i++) {
                    console.debug(temp[i])
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

// function checkaddress() {
//     return new Promise(async (resolve) => {

//         let options = {
//             url: `https://m.jingxi.com/kjactive/jxhlk/jxhlk_checkaddress?active=${active}&addressid=&t=1623387225130&_=1623387225131&sceneval=2&g_login_type=1&g_ty=ls`,
//             //dS%2Bp85VyjydPuAOOnFP%2Faw%3D%3D
//             // body: `functionId=cutPriceByUser&body={"activityId":"852797097823596544","userName":"","followShop":1,"shopId":52021,"userPic":""}&client=wh5&clientVersion=1.0.0`,
//             headers: {
//                 "Referer": "https://st.jingxi.com/sns/202103/20/jxhlk/list.html?ptag=7155.9.89",
//                 "Host": "m.jingxi.com",
//                 "User-Agent": "jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
//                 "Cookie": cookie,
//             }
//         }

//         $.get(options, async (err, resp, data) => {
//             try {

//                 data = data.match(/(\{[^()]+\}.+)/)[1]

//                 // console.debug(data)
//                 const reust = JSON.parse(data)
//                 //console.log(reust)
//                 if (reust.errcode == 0) {
//                     //list = reust.data.freezone
//                     //for (let i = 0; i < list.length; i++) {  
//                     $.provinceid = reust.data.provinceid
//                     $.cityid = reust.data.cityid
//                     $.countyid = reust.data.countyid
//                     $.log(`\n确认收货地址\n商品：${reust.data.skutitle}\n地址：${reust.data.address}`)

//                     // }
//                 } else

//                     console.log(data.msg)
//             } catch (e) {
//                 $.logErr(e, resp);
//             } finally {
//                 resolve();
//             }
//         });
//     });
// }

// function join() {
//     return new Promise(async (resolve) => {

//         let options = {
//             url: `https://m.jingxi.com/kjactive/jxhlk/jxhlk_launch?active=${active}&provinceid=${$.provinceid}&cityid=${$.cityid}&countyid=${$.countyid}&_stk=active,cityid,countyid,provinceid&_ste=1&h5st=20210611134802301;9239928912872162;10029;tk01wbcaa1c9ba8nd2QzQ1ZoLzNtk5KzYYdDSHRhFzz7/RM9cwNQBA92KZHoHeloSktjcQEdy/EXtm5u1WsoLf/6pNyP;9a5fc97afa527c0cfa083a7d2d948c0308bdb2d78413eb8ea5d17e336af71dc2&t=1623390482324&_=1623390482325&sceneval=2&g_login_type=1&callback=jsonpCBKD&g_ty=ls`,
//             //dS%2Bp85VyjydPuAOOnFP%2Faw%3D%3D
//             // body: `functionId=cutPriceByUser&body={"activityId":"852797097823596544","userName":"","followShop":1,"shopId":52021,"userPic":""}&client=wh5&clientVersion=1.0.0`,
//             headers: {
//                 "Referer": "https://st.jingxi.com/sns/202103/20/jxhlk/list.html?ptag=7155.9.89",
//                 "Host": "m.jingxi.com",
//                 "User-Agent": "jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
//                 "Cookie": cookie,
//             }
//         }

//         $.get(options, async (err, resp, data) => {
//             try {
//                 console.log(data)
//                 data = data.match(/(\{[^()]+\}.+)/)[1]

//                 //console.log(data)
//                 const reust = JSON.parse(data)
//                 //console.log(reust)
//                 if (reust.errcode == 0) {
//                     $.launchid = restlt.launchid
//                     $.log(`\n参加砍价成功 你当前商品邀请码：${restlt.launchid}`)

//                     // }
//                 } else

//                     console.log(data.msg)
//             } catch (e) {
//                 $.logErr(e, resp);
//             } finally {
//                 resolve();
//             }
//         });
//     });
// }


function help() {
    // console.debug($.signle_launchid)
    return new Promise(async (resolve) => {

        let options = {
            url: `https://m.jingxi.com/kjactive/jxhlk/jxhlk_queryhelp?launchid=${$.signle_launchid}&clicktype=1&nomoving=0&_stk=clicktype,launchid,nomoving&_ste=1&h5st=20210611141713782;4277367680239161;10029;tk01wea971d94a8nWUlYSjgyLzZKSU1igyCeoCUlN/xTTrRT7O3uvmUqievWdR1PWX5HYelOXXDFofE6gtFirtyXBLjY;787c9125d6eaf59d5fb81bcdea2b58481e4e395402191379b47fbec7470c67b3&t=1623392233807&_=1623392233808&sceneval=2&g_login_type=1&g_ty=ls`,

            headers: {
                "Referer": `https://st.jingxi.com/sns/202103/20/jxhlk/list.html?launchid=${$.signle_launchid}&ptag=139022.1.2&srv=jx_cxyw_https://wq.jd.com/cube/front/activePublish/jxhlkv2/486449.html?ptag=139022.1.2_jing`,
                "Host": "m.jingxi.com",
                "User-Agent": "jdpingou;iPhone;4.8.0;14.3;9714ccbf07209f246277896ef7c041f3bb571ca3;network/wifi;model/iPhone9,2;appBuild/100540;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/22;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Cookie": cookie,
            }
        }

        $.get(options, async (err, resp, data) => {
            try {

                data = data.match(/(\{[^()]+\}.+)/)[1]

                // console.debug(data)
                const reust = JSON.parse(data)
                //console.log(reust)
                if (reust.errcode == 0) {
                    //$.launchid=restlt.launchid
                    $.log(`\n${reust.data.guestinfo.contenttips}`)

                    // }
                } else

                    console.log(data.msg)
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function taskPostUrl(functionId, body) {
    return {
        url: `${JD_API_HOST}`,
        body: `functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0&appid=content_ecology&uuid=6898c30638c55142969304c8e2167997fa59eb54&t=1622588448365`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    }
}


async function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data["retcode"] === 13) {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data["retcode"] === 0) {
                            $.nickName = (data["base"] && data["base"].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName;
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}
// prettier-ignore

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    class s {
        constructor(t) { this.env = t }
        send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) }
        get(t) { return this.send.call(this.env, t) }
        post(t) { return this.send.call(this.env, t, "POST") }
    }
    return new class {
        constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) }
        isNode() { return "undefined" != typeof module && !!module.exports }
        isQuanX() { return "undefined" != typeof $task }
        isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon }
        isLoon() { return "undefined" != typeof $loon }
        toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } }
        toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try { s = JSON.parse(this.getdata(t)) } catch {}
            return s
        }
        setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } }
        getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) { e = "" }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null }
        setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null }
        initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) { this.logErr(t) }
            }).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => {
                const { message: s, response: i } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(t => {
                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                    e(null, { status: s, statusCode: i, headers: r, body: o }, o)
                }, t => {
                    const { message: s, response: i } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s }
                    }
                    if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }
        wait(t) { return new Promise(e => setTimeout(e, t)) }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
