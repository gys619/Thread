/*
愤怒的锦鲤-本地log版-定时自定义
https://github.com/11111129/ 优化版：
2022.5.15 本地log，其他优化
默认按ck顺序助力，也可在设置变量kios中填入需要助力的pt_pin，有多个请用@符号连接
风之凌殇 魔改版：
2021.11.27 修复不能正常先满足第一个账号的问题，并添加车头和公平模式
2021.11.29 增加自动开红包的功能
#雨露均沾，若配置，则车头外的ck随机顺序，可以等概率的随到前面来
export  KOI_FAIR_MODE="true"
## 设置1个车头，如果有更多个车头，就写对应数目。仅当车头互助满，才会助力后面的。
export KOI_TOP_NUM="1"
5 10 17 5 * https://raw.githubusercontent.com/11111129/jdpro/main/jd_jinliRed.js
*/
const $ = new Env("锦鲤红包-本地log")
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let fair_mode = process.env.KOI_FAIR_MODE == "true" ? true : false
let TOP_NUM = process.env.KOI_TOP_NUM ? Number(process.env.KOI_TOP_NUM) : 0
var kois = process.env.kois ?? ""
let cookiesArr = []
var tools = []
const {logs} = $.isNode() ? require('./function/jinlilog') : '';
let notify, allMessage = '';

if (logs.length < 1) {console.log('本地无log，请配置');return}
!(async () => {
    await requireConfig()
    console.log(`当前配置的车头数：${TOP_NUM}，是否开启公平模式：${fair_mode}`)
    console.log("开始获取用于助力的账号列表")
    for (let i in cookiesArr) {
        // 将用于助力的账号加入列表
        let s = parseInt(i) + 1
        tools.push({id: s, assisted: false, cookie: cookiesArr[i]})
    }
    console.log(`用于助力的CK ${tools.length}个`)
    allMessage += `用于助力的CK ${tools.length}个\n`

    console.log(`根据配置，计算互助顺序`)
    let cookieIndexOrder = []
    if (fair_mode) {
        // 若开启了公平模式，则车头固定在前面
        for (let i = 0; i < TOP_NUM; i++) {
            cookieIndexOrder.push(i+1)
        }
        // 后面的随机顺序
        let otherIndexes = []
        for (let i = TOP_NUM; i < cookiesArr.length; i++) {
            otherIndexes.push(i+1)
        }
        shuffle(otherIndexes)
        cookieIndexOrder = cookieIndexOrder.concat(otherIndexes)
    } else {
        let otherIndexes = []
        for (let idx = 0; idx < cookiesArr.length; idx++) {
            var cookie = cookiesArr[idx];
            
            if (kois.indexOf(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]) != -1) {
                otherIndexes.push(idx+1)
            }else{
                cookieIndexOrder.push(idx+1)
            }
        }
        cookieIndexOrder = otherIndexes.concat(cookieIndexOrder)
    }
    console.log(`最终互助顺序如下（优先互助满前面的）：\n${cookieIndexOrder}`)
    //allMessage += `本次互助顺序(车头优先，其余等概率随机，每次运行都不一样): ${cookieIndexOrder}\n\n`

    console.log("\n开始助力。。。")
    // 最多尝试2*账号数目次，避免无限尝试，保底
    let remainingTryCount = 2 * cookiesArr.length
    let helpIndex = 0
    let htimes = 1
    while (helpIndex < cookiesArr.length && tools.length > 0 && remainingTryCount > 0) {
        let cookieIndex = cookieIndexOrder[helpIndex]-1
        try {
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
                       // console.log(`跳过自己助力`)
                        if (tools.length == 1) {
                            // 用于互助的队列只剩下自己了，说明自己已经尝试完了，可以留着给下一个人（若有）
                            break
                        } else {
                            // 还有其他的互助码，可以继续尝试本账号
                            continue
                        }
                    }

                    console.debug(`尝试用 ${tool.id} 账号助力 ${help.id} 账号，用于互助的CK剩余 ${tools.length}`)

                    await helpThisUser(help, tool)
                    if (!tool.assisted) {
                        // 如果没有助力成功，则放入互助列表头部
                        tools.unshift(tool)
                    }
                    if (help.assist_full) {
                        console.info(`账号 ${help.id} 助力完成，累计获得 ${help.helpCount} 次助力，尝试下一个账号`)
                        break
                    }

                    remainingTryCount -= 1

                    // 等待一会，避免频繁请求
                    await $.wait(parseInt(Math.random() * 5000 + 40000))
                    //console.log(htimes)
                    if (htimes  % 6 == 0){
                        //console.log('\n休息一下，太快403\n')
                        //await $.wait(parseInt(Math.random() * 5000 + 20000))
                    }
                    htimes++
                }
            } else {
                // 获取失败，跳过
                console.info(`账号 ${cookieIndex} 获取信息失败，具体原因见上一行，将尝试下一个账号`)
            }

            await appendRewardInfoToNotify(cookieIndex, cookiesArr[cookieIndex])
        } catch (error) {
            // 额外捕获异常
            console.error(`${error}`)
        }

        console.info('\n----------------------------\n')
        helpIndex++
    }

    allMessage += "上述就是本次锦鲤红包助力情况\n"

    allMessage += "（请以今日0点后第一次运行的消息为准。后续运行只是为了保底，避免第一次因各种未知异常而未完成运行）"

    // 发送通知
    if ($.isNode() && allMessage) {
        //await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
    .finally(() => {
        $.done();
    })


function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

async function getHelpInfoForCk(cookieIndex, cookie) {
    console.log(`开始获取第 ${cookieIndex+1} 个账号信息`)

    let data;
    let MAX_TRY = 3

    let log = logs[Math.floor(Math.random() * (0,logs.length - 1))]

    // 尝试开启今日的红包活动
    for (let tryIdex = 1; tryIdex <= MAX_TRY; tryIdex++) {
        var num = "";
        for (var g = 0; g < 6; g++) {
            num += Math.floor(Math.random() * 10);
        }
        data = await requestApi('h5launch', cookie, {
            "followShop": 0,
            "random": log.match(/"random":"(\d+)"/)[1],
            "log": log.match(/"log":"(.*)"/)[1],
            "sceneid": "JLHBhPageh5"
        });

        if (data) {
            break
        }

        console.error(`[${tryIdex}/${MAX_TRY}] h5launch 请求时似乎出错了，有可能是网络波动，将最多试三次`)
        await $.wait(5000)
    }

    switch (data?.data?.result?.status) {
        case 1://火爆
            console.debug(`h5launch 被风控，可能黑号了, data=${JSON.stringify(data)}`)
            return;
        case 2://已经发起过
            break;
        default:
            if (data?.data?.result?.redPacketId) {
                // 加入help队列
                return {
                    redPacketId: data.data.result.redPacketId,
                    assist_full: false,
                    id: cookieIndex+1,
                    cookie: cookie,
                    helpCount: 0
                }
            }
    }

    // 已开启活动，尝试查询具体信息
    for (let tryIdex = 1; tryIdex <= MAX_TRY; tryIdex++) {
        data = await requestApi('h5activityIndex', cookie, {
            "isjdapp": 1
        });

        if (data) {
            break
        }

        console.error(`[${tryIdex}/${MAX_TRY}] h5activityIndex 请求似乎出错，可能网络波动，将最多试三次`)
        await $.wait(5000)
    }


    if (data?.data?.result?.redpacketConfigFillRewardInfo) {
        // 打印今日红包概览
        let info = data.data.result
        let headmanNickName = "", packetTotalSum = 0;
        if (info.redpacketInfo) {
            headmanNickName = info.redpacketInfo.headmanNickName
            packetTotalSum = info.redpacketInfo.packetTotalSum || 0
        }
        console.info(`【京东账号${cookieIndex + 1}】 ${headmanNickName} 已获取红包 ${packetTotalSum}，剩余可拆红包为 ${calcCanTakeRedpacketCount(info)}`)

        for (let packetIdx = 0; packetIdx < info.redpacketConfigFillRewardInfo.length; packetIdx++) {
            let packetInfo = info.redpacketConfigFillRewardInfo[packetIdx]

            let status = "已获取"
            if (packetInfo.hasAssistNum < packetInfo.requireAssistNum) {
                status = "未获取"
            }

            console.info(`红包 ${packetIdx + 1} 助力 ${packetInfo.hasAssistNum}/${packetInfo.requireAssistNum} ${status} ${packetInfo.packetAmount || "未开启"}/${packetInfo.operationWord}`)
        }
    } else {console.log('\n未获取到信息!')}

    switch (data?.data?.code) {
        case 20002://已达拆红包数量限制
            console.debug("已领取今天全部红包")
            break;
        case 10002://活动正在进行，火爆号
            console.debug(`h5activityIndex 被风控，可能黑号了, data=${JSON.stringify(data)}`)
            break;
        case 20001://红包活动正在进行，可拆
            // 加入help队列
            return {
                redPacketId: data.data.result.redpacketInfo.id,
                assist_full: false,
                id: cookieIndex+1,
                cookie: cookie,
                helpCount: 0
            }
        default:
            break;
    }
}

async function appendRewardInfoToNotify(cookieIndex, cookie) {
    let data = await requestApi('h5activityIndex', cookie, {
        "isjdapp": 1
    });

    // 判断是否有红包可以领
    if (calcCanTakeRedpacketCount(data?.data?.result) > 0) {
        let info = data.data.result
        let headmanNickName = "";
        if (info.redpacketInfo) {
            headmanNickName = info.redpacketInfo.headmanNickName
        }

        let canTakeCount = calcCanTakeRedpacketCount(info)
        console.info(`【京东账号${cookieIndex + 1}】 ${headmanNickName} 剩余可拆红包为 ${canTakeCount} 个，将尝试领取`)
        for (let packetIdx = 0; packetIdx < canTakeCount; packetIdx++) {
            console.info(`[${packetIdx + 1}/${canTakeCount}] 尝试领取红包`)
            await openRedPacket(cookie)

            // 等待一会，避免请求过快
            await $.wait(1000)
        }

        console.info(`领取完毕，重新查询最新锦鲤红包信息`)
        data = await requestApi('h5activityIndex', cookie, {
            "isjdapp": 1
        });
    }

    // 打印今日红包概览
    if (data?.data?.result?.redpacketConfigFillRewardInfo) {
        let info = data.data.result
        let headmanNickName = "", packetTotalSum = 0;
        if (info.redpacketInfo) {
            headmanNickName = info.redpacketInfo.headmanNickName
            packetTotalSum = info.redpacketInfo.packetTotalSum
        }
        allMessage += `【京东账号${cookieIndex + 1}】 ${headmanNickName} 已获取红包 ${packetTotalSum} 元，可拆红包为 ${calcCanTakeRedpacketCount(info)} 个（如开红包流程顺利，这里应该永远是0）\n`

        let totalAssistNum = 0
        let totalRequireAssistNum = 0
        for (let packetIdx = 0; packetIdx < info.redpacketConfigFillRewardInfo.length; packetIdx++) {
            let packetInfo = info.redpacketConfigFillRewardInfo[packetIdx]

            let status = ""
            if (packetInfo.hasAssistNum < packetInfo.requireAssistNum) {
                status = "未获取"
            } else {
                status = "已获取"
            }

            totalAssistNum += packetInfo.hasAssistNum
            totalRequireAssistNum += packetInfo.requireAssistNum
            allMessage += `红包 ${packetIdx + 1} 助力 ${packetInfo.hasAssistNum}/${packetInfo.requireAssistNum} ${status} ${packetInfo.packetAmount || "未开启"}/${packetInfo.operationWord}\n`
        }

        allMessage += `总计获得助力 ${totalAssistNum}/${totalRequireAssistNum}\n`

        allMessage += `\n`
    }
}

function calcCanTakeRedpacketCount(info) {
    if (!info?.redpacketConfigFillRewardInfo) {
        return 0
    }

    let count = 0
    for (let packetIdx = 0; packetIdx < info.redpacketConfigFillRewardInfo.length; packetIdx++) {
        let packetInfo = info.redpacketConfigFillRewardInfo[packetIdx]

        if (packetInfo.hasAssistNum >= packetInfo.requireAssistNum && !packetInfo.packetAmount) {
            count++
        }
    }

    return count
}

async function openRedPacket(cookie) {
    var num = "";
    for (var g = 0; g < 6; g++) {
        num += Math.floor(Math.random() * 10);
    }
  	let log = logs[Math.floor(Math.random() * (0,logs.length - 1))]
    let resp = await requestApi('h5receiveRedpacketAll', cookie, {
        "random": log.match(/"random":"(\d+)"/)[1],
        "log": log.match(/"log":"(.*)"/)[1],
        "sceneid": "JLHBhPageh5"
    });
    if (resp?.data?.biz_code == 0) {
        console.info(`领取到 ${resp.data.result?.discount} 元红包`)
    } else {
        console.error(`领取红包失败，结果为 ${JSON.stringify(resp)}`)
    }
}

async function helpThisUser(help, tool) {
    let log = logs[Math.floor(Math.random() * (0,logs.length - 1))]
    // 实际发起请求
    await requestApi('jinli_h5assist', tool.cookie, {
        "redPacketId": help.redPacketId,
        "followShop": 0,
        "random": log.match(/"random":"(\d+)"/)[1],
        "log": log.match(/"log":"(.*)"/)[1],
        "sceneid": "JLHBhPageh5"
    }).then(function (data) {
        let desc = data?.data?.result?.statusDesc
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
        console.log(`${tool.id}->${help.id}`, desc)
        } else {
            // undefined
            //tool.assisted = true
        console.log(`${tool.id}->${help.id}`, '失败了：貌似403了')
        }
    })
}

async function requestApi(functionId, cookie, body = {}) {
    return new Promise(resolve => {
        $.post({
            url: `${JD_API_HOST}/api?appid=jinlihongbao&functionId=${functionId}&loginType=2&client=jinlihongbao&clientVersion=10.2.4&osVersion=AndroidOS&d_brand=Xiaomi&d_model=Xiaomi`,
            headers: {
                "Cookie": cookie,
                "origin": "https://happy.m.jd.com",
                "referer": "https://happy.m.jd.com/babelDiy/zjyw/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html",
                'Content-Type': 'application/x-www-form-urlencoded',
                "X-Requested-With": "com.jingdong.app.mall",
                "User-Agent": [
      "Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn; Mi Note 2 Build/OPR1.170623.032) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.1.1",
      "MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
    ][Math.floor(Math.random() * 2)],
            },
            body: `body=${escape(JSON.stringify(body))}`,
        }, (_, resp, data) => {
            try {
                data = JSON.parse(data)
            } catch (e) {
                $.logErr('Error: ', e, resp)
                console.warn(`请求${functionId}失败，resp=${JSON.stringify(resp)}，data=${JSON.stringify(data)}, e=${JSON.stringify(e)}`)
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
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
