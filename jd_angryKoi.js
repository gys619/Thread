/*
愤怒的锦鲤
更新时间：2021-7-11
备注：高速并发请求，专治偷助力。在kois环境变量中填入需要助力的pt_pin，有多个请用@符号连接

风之凌殇 魔改版：
改用以下变量
#雨露均沾，若配置，则车头外的ck随机顺序，这样可以等概率的随到前面来
export  FAIR_MODE="true"
## 设置1个车头，如果有更多个车头，就写对应数目。仅当车头互助满，才会尝试后面的。
export CHETOU_NUMBER="1"

TG学习交流群：https://t.me/cdles
5 0 * * * https://raw.githubusercontent.com/cdle/jd_study/main/jd_angryKoi.js
*/
const $ = new Env("愤怒的锦鲤")
const JD_API_HOST = 'https://api.m.jd.com/client.action';
const ua = `jdltapp;iPhone;3.1.0;${Math.ceil(Math.random() * 4 + 10)}.${Math.ceil(Math.random() * 4)};${randomString(40)}`
let fair_mode = process.env.FAIR_MODE == "true" ? true : false
let chetou_number = process.env.CHETOU_NUMBER ? Number(process.env.CHETOU_NUMBER) : 0
let cookiesArr = []
var tools = []

let notify, allMessage = '';

!(async () => {
    await requireConfig()

    console.log(`当前配置的车头数目：${chetou_number}，是否开启公平模式：${fair_mode}`)

    console.log("开始获取用于助力的账号列表")
    for (let i in cookiesArr) {
        // 将用于助力的账号加入列表
        tools.push({id: i, assisted: false, cookie: cookiesArr[i]})
    }
    console.log(`用于助力的数目为 ${tools.length}`)
    allMessage += `用于助力的数目为 ${tools.length}\n`

    console.log(`根据配置，计算互助顺序`)
    cookieIndexOrder = []
    if (fair_mode) {
        // 若开启了互助模式，则车头固定在前面
        for (let i = 0; i < chetou_number; i++) {
            cookieIndexOrder.push(i)
        }
        // 后面的随机顺序
        otherIndexes = []
        for (let i = chetou_number; i < cookiesArr.length; i++) {
            otherIndexes.push(i)
        }
        shuffle(otherIndexes)
        cookieIndexOrder = cookieIndexOrder.concat(otherIndexes)
    } else {
        // 未开启公平模式，则按照顺序互助，前面的先互助满
        for (let idx = 0; idx < cookiesArr.length; idx++) {
            cookieIndexOrder.push(idx)
        }
    }
    console.log(`最终互助顺序如下（优先互助满前面的）：\n${cookieIndexOrder}`)
    allMessage += `今日互助顺序(车头优先，其余等概率随机): ${cookieIndexOrder}\n\n`

    console.log("开始助力")
    // 最多尝试2*账号数目次，避免无限尝试，保底
    let remainingTryCount = 2 * cookiesArr.length
    let helpIndex = 0
    while (helpIndex < cookiesArr.length && tools.length > 0 && remainingTryCount > 0) {
        cookieIndex = cookieIndexOrder[helpIndex]

        // 按需获取账号的锦鲤信息
        let help = await getHelpInfoForCk(cookieIndex, cookiesArr[cookieIndex])
        if (help) {
            while (tools.length > 0 && remainingTryCount > 0) {
                console.info('')

                // 从互助列表末尾取出一个账号，用于尝试助力第一个需要互助的账号
                let tool = tools.pop()

                // 特殊处理自己的账号
                if (tool.id == help.id) {
                    tools.unshift(tool)
                    console.log(`跳过自己，不尝试使用本账号自己互助（因为必定失败）`)
                    if (tools.length == 1) {
                        // 用于互助的队列只剩下自己了，说明自己已经尝试完了，可以留着给下一个人（若有）
                        break
                    } else {
                        // 还有其他的互助码，可以继续尝试本账号
                        continue
                    }
                }

                console.debug(`尝试用 ${tool.id} 账号助力 ${help.id} 账号，用于互助的账号剩余 ${tools.length}`)

                await helpThisUser(help, tool)
                if (!tool.assisted) {
                    // 如果没有助力成功，则放入互助列表头部
                    tools.unshift(tool)
                }
                if (help.assist_full) {
                    console.info(`账号 ${help.id} 助力完成，累计获得 ${help.helpCount} 次互助，将尝试下一个账号`)
                    break
                }

                remainingTryCount -= 1

                // 等待一会，避免频繁请求
                await $.wait(500)
            }
        } else {
            // 获取失败，跳过
            console.info(`账号 ${cookieIndex} 获取信息失败，具体原因见上一行，将尝试下一个账号`)
        }

        await appendRewardInfoToNotify(cookiesArr[cookieIndex])

        console.info('\n----------------------------\n')
        helpIndex++
    }

    allMessage += "上述今日轮到互助的账号请记得前往 京东app/领券/锦鲤红包 里面手动领取红包"

    // 发送通知
    if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
    .finally(() => {
        $.done();
    })

// https://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function getHelpInfoForCk(idx, cookie) {
    console.log(`开始请求第 ${idx} 个账号的信息`)

    var num = "";
    for (var g = 0; g < 6; g++) {
        num += Math.floor(Math.random() * 10);
    }
    var data = await requestApi('h5launch', cookie, {
        "followShop": 0,
        "random": num,
        "log": "42588613~8,~0iuxyee",
        "sceneid": "JLHBhPageh5"
    });
    switch (data?.data?.result?.status) {
        case 1://火爆
            console.debug("被风控，变成黑号了")
            return;
        case 2://已经发起过
            break;
        default:
            if (data?.data?.result?.redPacketId) {
                // 加入help队列
                return {
                    redPacketId: data.data.result.redPacketId,
                    assist_full: false,
                    id: idx,
                    cookie: cookie,
                    helpCount: 0
                }
            }
    }
    data = await requestApi('h5activityIndex', cookie, {
        "isjdapp": 1
    });

    // 打印今日红包概览
    if (data?.data?.result?.redpacketConfigFillRewardInfo) {
        let info = data.data.result
        console.info(`${info.actName} ${info.redpacketInfo.headmanNickName} 已获取红包 ${info.redpacketInfo.packetTotalSum}，剩余可拆红包为 ${info.remainRedpacketNumber}`)

        for (let packetIdx = 0; packetIdx < info.redpacketConfigFillRewardInfo.length; packetIdx++) {
            let packetInfo = info.redpacketConfigFillRewardInfo[packetIdx]

            console.info(`红包 ${packetIdx + 1} 助力 ${packetInfo.hasAssistNum}/${packetInfo.requireAssistNum} 已获取 ${packetInfo.packetAmount}/${packetInfo.operationWord}`)
        }
    }

    switch (data?.data?.code) {
        case 20002://已达拆红包数量限制
            console.debug("已领取今天全部红包")
            break;
        case 10002://活动正在进行，火爆号
            console.debug("被风控，变成黑号了")
            break;
        case 20001://红包活动正在进行，可拆
            // 加入help队列
            return {
                redPacketId: data.data.result.redpacketInfo.id,
                assist_full: false,
                id: idx,
                cookie: cookie,
                helpCount: 0
            }
        default:
            break;
    }
}

async function appendRewardInfoToNotify(cookie) {
    data = await requestApi('h5activityIndex', cookie, {
        "isjdapp": 1
    });

    // 打印今日红包概览
    if (data?.data?.result?.redpacketConfigFillRewardInfo) {
        let info = data.data.result
        allMessage += `${info.actName} ${info.redpacketInfo.headmanNickName} 已获取红包 ${info.redpacketInfo.packetTotalSum}，剩余可拆红包为 ${info.remainRedpacketNumber}\n`

        let totalAssistNum = 0
        let totalRequireAssistNum = 0
        for (let packetIdx = 0; packetIdx < info.redpacketConfigFillRewardInfo.length; packetIdx++) {
            let packetInfo = info.redpacketConfigFillRewardInfo[packetIdx]

            totalAssistNum += packetInfo.hasAssistNum
            totalRequireAssistNum += packetInfo.requireAssistNum
            allMessage += `红包 ${packetIdx + 1} 助力 ${packetInfo.hasAssistNum}/${packetInfo.requireAssistNum} 已获取 ${packetInfo.packetAmount}/${packetInfo.operationWord}\n`
        }

        allMessage += `总计获得助力 ${totalAssistNum}/${totalRequireAssistNum}\n`

        allMessage += `\n`
    }

}

async function helpThisUser(help, tool) {
    // 计算一个用于请求的随机参数
    var num = "";
    for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
    }

    // 实际发起请求
    await requestApi('jinli_h5assist', tool.cookie, {
        "redPacketId": help.redPacketId,
        "followShop": 0,
        "random": num,
        "log": "42588613~8,~0iuxyee",
        "sceneid": "JLHBhPageh5"
    }).then(function (data) {
        desc = data?.data?.result?.statusDesc
        if (desc) {
            if (desc.indexOf("助力成功") != -1) {
                help.helpCount += 1
                tool.assisted = true
            } else if (desc.indexOf("TA的助力已满") != -1) {
                help.assist_full = true
            } else {
                // 不能重复为好友助力哦
                // 今日助力次数已满
                // 活动太火爆啦~去看看其他活动吧~
                tool.assisted = true
            }
        } else {
            // undefined
            tool.assisted = true
        }
        console.log(`${tool.id}->${help.id}`, desc)
    })
}

async function requestApi(functionId, cookie, body = {}) {
    return new Promise(resolve => {
        $.post({
            url: `${JD_API_HOST}/api?appid=jd_mp_h5&functionId=${functionId}&loginType=2&client=jd_mp_h5&clientVersion=10.0.5&osVersion=AndroidOS&d_brand=Xiaomi&d_model=Xiaomi`,
            headers: {
                "Cookie": cookie,
                "origin": "https://h5.m.jd.com",
                "referer": "https://h5.m.jd.com/babelDiy/Zeus/2NUvze9e1uWf4amBhe1AV6ynmSuH/index.html",
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-Requested-With": "com.jingdong.app.mall",
                "User-Agent": ua,
            },
            body: `body=${escape(JSON.stringify(body))}`,
        }, (_, resp, data) => {
            try {
                data = JSON.parse(data)
            } catch (e) {
                $.logErr('Error: ', e, resp)
            } finally {
                resolve(data)
            }
        })
    })
}

async function requireConfig() {
    return new Promise(resolve => {
        notify = $.isNode() ? require('./sendNotify') : '';
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookiesArr.push(jdCookieNode[item])
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
            };
        } else {
            cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
        }
        console.log(`共${cookiesArr.length}个京东账号\n`)
        resolve()
    })
}

function randomString(e) {
    e = e || 32;
    let t = "abcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GIT_HUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch (e) {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch (e) {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
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

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
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

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
