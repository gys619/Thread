/*
脚本加密,不喜欢勿跑

*/
const $ = new Env("雅诗兰黛");
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let ownCode = null;
let authorCodeList = []
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}

console.log("脚本部份加密,不喜欢勿跑!!!,10次抽奖机会,3个助力一次抽奖,入口 https://lzkjdz-isv.isvjcloud.com/esteelauder/inviteNew/activityPage?activityId=2203100037674501")
!(async () => {
    $.getAuthorCodeListerr = false
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    authorCodeList = await getAuthorCodeList('https://gitee.com/fatelight/Code/raw/master/lzkjdz.json')
    if ($.getAuthorCodeListerr === false) {
        authorCodeList = [
            '44f4b33fb82a41a2a70e700727474ccb',
        ]
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i]
            originCookie = cookiesArr[i]
            newCookie = ''
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            await checkCookie();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                // if ($.isNode()) {
                //     await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                // }
                continue
            }
            $.bean = 0;
            $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
            $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            // authorCodeList = [
            //     '44f4b33fb82a41a2a70e700727474ccb',
            // ]
            // $.authorCode = authorCodeList[random(0, authorCodeList.length)]
            $.authorCode = ownCode ? ownCode : authorCodeList[random(0, authorCodeList.length)]
            $.authorNum = `${random(1000000, 9999999)}`
            $.randomCode = random(1000000, 9999999)
            $.activityId = '2203100037674501'
            $.activityShopId = '1000376745'
            $.activityUrl = `https://lzkjdz-isv.isvjcloud.com/esteelauder/inviteNew/activityPage?activityId=${$.activityId}&inviterUuid=${encodeURIComponent($.authorCode)}&shareuserid4minipg=${encodeURIComponent($.secretPin)}&sid=&un_area=`
            await member();
            await $.wait(5000)
            if ($.bean > 0) {
                message += `\n【京东账号${$.index}】${$.nickName || $.UserName} \n       └ 获得 ${$.bean} 京豆。`
            }
        }
    }
    if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', `\n`);
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })


async function member() {
    $.token = null;
    $.secretPin = null;
    $.openCardActivityId = null
    lz_cookie = {}
    await getFirstLZCK()
    await getToken();
    await task('customer/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    // console.log($.token)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            console.log("去助力 -> " + $.authorCode)
            await taskaccessLog('common/accessLogWithAD', `venderId=${$.activityShopId}&code=99&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=null`, 1);
            // await task('wxActionCommon/getUserInfo', `pin=${encodeURIComponent($.secretPin)}`, 1)
            await $.wait(5000)
            if ($.index === 1) {
                await task('inviteNew/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&inviterUuid=${encodeURIComponent($.authorCode)}`, 0, 1)
            } else {
                await task('inviteNew/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&inviterUuid=${encodeURIComponent($.authorCode)}`)
            }
            $.log("加入店铺会员")
            await getShopOpenCardInfo({ "venderId": `${$.activityShopId}`, "channel": "401" }, $.activityShopId)
            await bindWithVender({ "venderId": `${$.activityShopId}`, "bindByVerifyCodeFlag": 1, "registerExtend": {}, "writeChildFlag": 0, "activityId": $.openCardActivityId, "channel": 7012 }, $.activityShopId)
            await $.wait(5000)
            if ($.index === 1) {
                await task('inviteNew/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&inviterUuid=${encodeURIComponent($.authorCode)}`, 0, 1)
            } else {
                await task('inviteNew/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&inviterUuid=${encodeURIComponent($.authorCode)}`)
            }
        }
    }
}

function task(function_id, body, isCommon = 0, own = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.result) {
                            switch (function_id) {
                                case 'customer/getSimpleActInfoVo':
                                    console.log(data)
                                    break;
                                case 'wxActionCommon/getUserInfo':
                                    break;
                                case 'inviteNew/activityContent':
                                    console.log(data.data.userRecord.uuid)
                                    if ($.index === 1) {
                                        ownCode = data.data.userRecord.uuid
                                        // console.log(ownCode)
                                    }
                                    break;
                                default:
                                    // $.log(JSON.stringify(data))
                                    break;
                            }
                        } else {
                            // $.log(JSON.stringify(data))
                        }
                    } else {
                        // $.log("京东没有返回数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function taskaccessLog(function_id, body, isCommon = 0) {
    return new Promise(resolve => {
        $.post(taskUrl(function_id, body, isCommon), async (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    // console.log(resp);
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie};`
                        for (let sk of resp['headers']['set-cookie']) {
                            lz_cookie[sk.split(";")[0].substr(0, sk.split(";")[0].indexOf("="))] = sk.split(";")[0].substr(sk.split(";")[0].indexOf("=") + 1)
                        }
                        for (const vo of Object.keys(lz_cookie)) {
                            cookie += vo + '=' + lz_cookie[vo] + ';'
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}

function getAuthorCodeList(url) {
    return new Promise(resolve => {
        const options = {
            url: `${url}?${new Date()}`, "timeout": 10000, headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    // $.log(err)
                    $.getAuthorCodeListerr = false
                } else {
                    if (data) data = JSON.parse(data)
                    $.getAuthorCodeListerr = true
                }
            } catch (e) {
                $.logErr(e, resp)
                data = null;
            } finally {
                resolve(data);
            }
        })
    })
}

function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzkjdz-isv.isvjcloud.com/${function_id}` : `https://lzkjdz-isv.isvjcloud.com/esteelauder/${function_id}`,
        headers: {
            Host: 'lzkjdz-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkjdz-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie
        },
        body: body

    }
}

function getMyPing() {
    let opt = {
        url: `https://lzkjdz-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzkjdz-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzkjdz-isv.isvjcloud.com',
            'User-Agent': `jdapp;iPhone;9.5.4;13.6;${$.UUID};network/wifi;ADID/${$.ADID};model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
            Connection: 'keep-alive',
            Referer: $.activityUrl,
            Cookie: cookie,
        },
        body: `userId=${$.activityShopId}&token=${$.token}&fromType=APP&riskType=1`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie}`
                        if ($.isNode()) {
                            for (let sk of resp['headers']['set-cookie']) {
                                cookie = `${cookie}${sk.split(";")[0]};`
                            }
                        } else {
                            for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                                cookie = `${cookie}${ck.split(";")[0]};`
                            }
                        }
                    }
                    if (resp['headers']['Set-Cookie']) {
                        cookie = `${originCookie}`
                        if ($.isNode()) {
                            for (let sk of resp['headers']['set-cookie']) {
                                cookie = `${cookie}${sk.split(";")[0]};`
                            }
                        } else {
                            for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                                cookie = `${cookie}${ck.split(";")[0]};`
                            }
                        }
                    }
                    if (data) {
                        data = JSON.parse(data)
                        if (data.result) {
                            $.log(`你好：${data.data.nickname}`)
                            $.pin = data.data.nickname;
                            $.secretPin = data.data.secretPin;
                            cookie = `${cookie};AUTH_C_USER=${data.data.secretPin}`
                        } else {
                            $.log(data.errorMessage)
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }

        })
    })
}
function getFirstLZCK() {
    return new Promise(resolve => {
        $.get({ url: $.activityUrl ,headers:{"user-agent":$.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")}}, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err)
                } else {
                    if (resp['headers']['set-cookie']) {
                        cookie = `${originCookie}`
                        if ($.isNode()) {
                            for (let sk of resp['headers']['set-cookie']) {
                                cookie = `${cookie}${sk.split(";")[0]};`
                            }
                        } else {
                            for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                                cookie = `${cookie}${ck.split(";")[0]};`
                            }
                        }
                    }
                    if (resp['headers']['Set-Cookie']) {
                        cookie = `${originCookie}`
                        if ($.isNode()) {
                            for (let sk of resp['headers']['set-cookie']) {
                                cookie = `${cookie}${sk.split(";")[0]};`
                            }
                        } else {
                            for (let ck of resp['headers']['Set-Cookie'].split(',')) {
                                cookie = `${cookie}${ck.split(";")[0]};`
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function getToken() {
    let opt = {
        url: `https://api.m.jd.com/client.action?functionId=isvObfuscator`,
        headers: {
            Host: 'api.m.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
            Connection: 'keep-alive',
            Cookie: cookie,
            'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1',
            'Accept-Encoding': 'gzip, deflate, br',
        },
        body: `body=%7B%22url%22%3A%20%22https%3A//lzkj-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=hjudwgohxzVu96krv&client=apple&clientVersion=9.4.0&st=1620476162000&sv=111&sign=f9d1b7e3b943b6a136d54fe4f892af05`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    $.log(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.code === "0") {
                            $.token = data.token
                        }
                    } else {
                        $.log("京东返回了空数据")
                    }
                }
            } catch (error) {
                $.log(error)
            } finally {
                resolve();
            }
        })
    })
}
function random(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}
function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}
function checkCookie() {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            "Host": "me-api.jd.com",
            "Accept": "*/*",
            "Connection": "keep-alive",
            "Cookie": cookie,
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1",
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br",
        }
    };
    return new Promise(resolve => {
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.retcode === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data.retcode === "0" && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
var _0xodO='jsjiami.com.v6',_0xodO_=['‮_0xodO'],_0x2909=[_0xodO,'\x63\x33\x6c\x55\x5a\x6b\x77\x3d','\x5a\x32\x56\x30','\x54\x6c\x42\x76\x51\x30\x51\x3d','\x59\x55\x56\x7a\x62\x56\x49\x3d','\x51\x6b\x52\x6c\x56\x30\x73\x3d','\x55\x32\x52\x42\x59\x30\x6f\x3d','\x57\x48\x56\x48\x64\x46\x41\x3d','\x56\x33\x4a\x44\x65\x6c\x51\x3d','\x61\x6b\x39\x31\x61\x32\x34\x3d','\x63\x6b\x78\x74\x57\x56\x63\x3d','\x62\x47\x39\x6e','\x63\x47\x46\x79\x63\x32\x55\x3d','\x63\x33\x56\x6a\x59\x32\x56\x7a\x63\x77\x3d\x3d','\x65\x47\x64\x4c\x61\x31\x6f\x3d','\x55\x6d\x70\x57\x64\x45\x6b\x3d','\x53\x32\x56\x5a\x54\x45\x67\x3d','\x59\x6d\x6c\x75\x5a\x46\x64\x70\x64\x47\x68\x57\x5a\x57\x35\x6b\x5a\x58\x4a\x74\x5a\x58\x4e\x7a\x59\x57\x64\x6c','\x62\x57\x56\x7a\x63\x32\x46\x6e\x5a\x51\x3d\x3d','\x63\x6d\x56\x7a\x64\x57\x78\x30','\x61\x57\x35\x30\x5a\x58\x4a\x6c\x63\x33\x52\x7a\x55\x6e\x56\x73\x5a\x55\x78\x70\x63\x33\x51\x3d','\x5a\x6d\x52\x54\x55\x6b\x55\x3d','\x62\x33\x42\x6c\x62\x6b\x4e\x68\x63\x6d\x52\x42\x59\x33\x52\x70\x64\x6d\x6c\x30\x65\x55\x6c\x6b','\x61\x57\x35\x30\x5a\x58\x4a\x6c\x63\x33\x52\x7a\x53\x57\x35\x6d\x62\x77\x3d\x3d','\x59\x57\x4e\x30\x61\x58\x5a\x70\x64\x48\x6c\x4a\x5a\x41\x3d\x3d','\x56\x55\x70\x4a\x61\x32\x49\x3d','\x64\x31\x52\x36\x62\x6e\x63\x3d','\x56\x6b\x4e\x72\x53\x48\x51\x3d','\x64\x33\x6c\x44\x51\x57\x49\x3d','\x52\x56\x68\x75\x55\x6b\x6f\x3d','\x53\x6c\x42\x69\x62\x30\x38\x3d','\x5a\x6e\x4a\x68\x53\x6c\x67\x3d','\x65\x55\x74\x76\x57\x6b\x49\x3d','\x59\x6d\x6c\x75\x5a\x46\x64\x70\x64\x47\x68\x57\x5a\x57\x35\x6b\x5a\x58\x49\x3d','\x63\x55\x64\x35\x53\x47\x49\x3d','\x54\x57\x68\x32\x56\x30\x59\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x47\x6b\x75\x62\x53\x35\x71\x5a\x43\x35\x6a\x62\x32\x30\x76\x59\x32\x78\x70\x5a\x57\x35\x30\x4c\x6d\x46\x6a\x64\x47\x6c\x76\x62\x6a\x38\x3d','\x59\x6d\x39\x6b\x65\x51\x3d\x3d','\x63\x6b\x46\x6d\x63\x48\x45\x3d','\x55\x32\x68\x53\x51\x30\x4d\x3d','\x59\x6b\x31\x72\x51\x58\x51\x3d','\x53\x56\x4e\x6d\x5a\x55\x6f\x3d','\x66\x53\x5a\x6a\x61\x47\x46\x75\x62\x6d\x56\x73\x50\x54\x51\x77\x4d\x53\x5a\x79\x5a\x58\x52\x31\x63\x6d\x35\x56\x63\x6d\x77\x39','\x53\x48\x6c\x43\x53\x48\x55\x3d','\x55\x30\x74\x74\x5a\x32\x67\x3d','\x5a\x45\x78\x6e\x52\x58\x6f\x3d','\x51\x6b\x74\x6b\x54\x30\x73\x3d','\x52\x45\x64\x6e\x62\x30\x34\x3d','\x56\x45\x4e\x79\x61\x6b\x51\x3d','\x64\x30\x6c\x54\x61\x45\x4d\x3d','\x65\x47\x70\x45\x51\x32\x38\x3d','\x62\x31\x56\x5a\x55\x46\x55\x3d','\x59\x32\x52\x49\x63\x55\x49\x3d','\x52\x56\x70\x6c\x63\x45\x73\x3d','\x55\x57\x6c\x73\x62\x45\x77\x3d','\x57\x6d\x39\x31\x64\x6c\x49\x3d','\x56\x32\x68\x79\x51\x55\x67\x3d','\x65\x48\x6c\x4c\x63\x48\x6f\x3d','\x52\x47\x5a\x48\x61\x6c\x55\x3d','\x54\x45\x52\x46\x51\x31\x55\x3d','\x35\x72\x4b\x68\x35\x70\x79\x4a\x36\x4c\x2b\x55\x35\x5a\x75\x65\x35\x70\x57\x77\x35\x6f\x32\x75','\x52\x32\x74\x45\x54\x47\x45\x3d','\x53\x47\x46\x78\x57\x45\x6f\x3d','\x62\x6d\x35\x79\x51\x30\x38\x3d','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x61\x6e\x4e\x76\x62\x67\x3d\x3d','\x61\x6d\x52\x66\x63\x32\x68\x76\x63\x46\x39\x74\x5a\x57\x31\x69\x5a\x58\x49\x3d','\x4f\x53\x34\x79\x4c\x6a\x41\x3d','\x4f\x47\x46\x6b\x5a\x6d\x49\x3d','\x4d\x79\x34\x77','\x61\x48\x52\x30\x63\x44\x6f\x76\x4c\x7a\x45\x78\x4e\x43\x34\x78\x4d\x7a\x49\x75\x4e\x44\x49\x75\x4d\x54\x45\x36\x4d\x7a\x41\x77\x4d\x43\x39\x6f\x4e\x58\x4e\x30','\x53\x6d\x78\x68\x55\x6e\x6b\x3d','\x57\x55\x4a\x52\x61\x6b\x4d\x3d','\x59\x32\x64\x43\x56\x57\x67\x3d','\x59\x6b\x56\x73\x51\x33\x51\x3d','\x63\x48\x4e\x74\x54\x32\x55\x3d','\x63\x58\x64\x44\x59\x57\x51\x3d','\x5a\x30\x46\x68\x61\x30\x49\x3d','\x54\x46\x46\x6d\x62\x6b\x67\x3d','\x63\x47\x39\x7a\x64\x41\x3d\x3d','\x52\x30\x46\x47\x52\x55\x73\x3d','\x63\x57\x52\x54\x62\x6c\x49\x3d','\x62\x47\x39\x6e\x52\x58\x4a\x79','\x62\x6d\x46\x74\x5a\x51\x3d\x3d','\x49\x45\x46\x51\x53\x65\x69\x76\x74\x2b\x61\x78\x67\x75\x57\x6b\x73\x65\x69\x30\x70\x65\x2b\x38\x6a\x4f\x69\x76\x74\x2b\x61\x6a\x67\x4f\x61\x66\x70\x65\x65\x39\x6b\x65\x69\x33\x72\x2b\x6d\x48\x6a\x65\x69\x76\x6c\x51\x3d\x3d','\x54\x6d\x35\x6b\x56\x46\x6b\x3d','\x5a\x48\x68\x71\x53\x57\x55\x3d','\x59\x55\x31\x72\x64\x33\x59\x3d','\x61\x31\x4a\x4a\x63\x6e\x63\x3d','\x54\x47\x4a\x52\x52\x6b\x49\x3d','\x56\x30\x46\x78\x54\x31\x45\x3d','\x52\x55\x35\x4c\x54\x45\x51\x3d','\x55\x57\x39\x6c\x5a\x58\x6f\x3d','\x52\x56\x4a\x49\x52\x55\x67\x3d','\x55\x55\x39\x34\x63\x56\x51\x3d','\x56\x45\x4e\x58\x63\x6b\x34\x3d','\x53\x55\x56\x73\x65\x6d\x34\x3d','\x54\x58\x70\x33\x63\x33\x45\x3d','\x52\x46\x4a\x70\x55\x55\x49\x3d','\x59\x58\x42\x70\x4c\x6d\x30\x75\x61\x6d\x51\x75\x59\x32\x39\x74','\x4b\x69\x38\x71','\x61\x32\x56\x6c\x63\x43\x31\x68\x62\x47\x6c\x32\x5a\x51\x3d\x3d','\x65\x6d\x67\x74\x59\x32\x34\x3d','\x5a\x33\x70\x70\x63\x43\x77\x67\x5a\x47\x56\x6d\x62\x47\x46\x30\x5a\x53\x77\x67\x59\x6e\x49\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x47\x6b\x75\x62\x53\x35\x71\x5a\x43\x35\x6a\x62\x32\x30\x76\x59\x32\x78\x70\x5a\x57\x35\x30\x4c\x6d\x46\x6a\x64\x47\x6c\x76\x62\x6a\x39\x68\x63\x48\x42\x70\x5a\x44\x31\x71\x5a\x46\x39\x7a\x61\x47\x39\x77\x58\x32\x31\x6c\x62\x57\x4a\x6c\x63\x69\x5a\x6d\x64\x57\x35\x6a\x64\x47\x6c\x76\x62\x6b\x6c\x6b\x50\x57\x64\x6c\x64\x46\x4e\x6f\x62\x33\x42\x50\x63\x47\x56\x75\x51\x32\x46\x79\x5a\x45\x6c\x75\x5a\x6d\x38\x6d\x59\x6d\x39\x6b\x65\x54\x30\x3d','\x63\x55\x4e\x68\x63\x31\x4d\x3d','\x63\x33\x52\x79\x61\x57\x35\x6e\x61\x57\x5a\x35','\x4a\x6d\x4e\x73\x61\x57\x56\x75\x64\x44\x31\x49\x4e\x53\x5a\x6a\x62\x47\x6c\x6c\x62\x6e\x52\x57\x5a\x58\x4a\x7a\x61\x57\x39\x75\x50\x54\x6b\x75\x4d\x69\x34\x77\x4a\x6e\x56\x31\x61\x57\x51\x39\x4f\x44\x67\x34\x4f\x44\x67\x3d','\x52\x32\x52\x44\x54\x55\x30\x3d','\x59\x32\x31\x46\x57\x47\x34\x3d','\x51\x57\x39\x71\x62\x56\x6f\x3d','\x61\x6d\x52\x68\x63\x48\x41\x37\x61\x56\x42\x6f\x62\x32\x35\x6c\x4f\x7a\x6b\x75\x4e\x53\x34\x30\x4f\x7a\x45\x7a\x4c\x6a\x59\x37','\x56\x56\x56\x4a\x52\x41\x3d\x3d','\x4f\x32\x35\x6c\x64\x48\x64\x76\x63\x6d\x73\x76\x64\x32\x6c\x6d\x61\x54\x74\x42\x52\x45\x6c\x45\x4c\x77\x3d\x3d','\x51\x55\x52\x4a\x52\x41\x3d\x3d','\x4f\x32\x31\x76\x5a\x47\x56\x73\x4c\x32\x6c\x51\x61\x47\x39\x75\x5a\x54\x45\x77\x4c\x44\x4d\x37\x59\x57\x52\x6b\x63\x6d\x56\x7a\x63\x32\x6c\x6b\x4c\x7a\x41\x37\x59\x58\x42\x77\x51\x6e\x56\x70\x62\x47\x51\x76\x4d\x54\x59\x33\x4e\x6a\x59\x34\x4f\x32\x70\x6b\x55\x33\x56\x77\x63\x47\x39\x79\x64\x45\x52\x68\x63\x6d\x74\x4e\x62\x32\x52\x6c\x4c\x7a\x41\x37\x54\x57\x39\x36\x61\x57\x78\x73\x59\x53\x38\x31\x4c\x6a\x41\x67\x4b\x47\x6c\x51\x61\x47\x39\x75\x5a\x54\x73\x67\x51\x31\x42\x56\x49\x47\x6c\x51\x61\x47\x39\x75\x5a\x53\x42\x50\x55\x79\x41\x78\x4d\x31\x38\x32\x49\x47\x78\x70\x61\x32\x55\x67\x54\x57\x46\x6a\x49\x45\x39\x54\x49\x46\x67\x70\x49\x45\x46\x77\x63\x47\x78\x6c\x56\x32\x56\x69\x53\x32\x6c\x30\x4c\x7a\x59\x77\x4e\x53\x34\x78\x4c\x6a\x45\x31\x49\x43\x68\x4c\x53\x46\x52\x4e\x54\x43\x77\x67\x62\x47\x6c\x72\x5a\x53\x42\x48\x5a\x57\x4e\x72\x62\x79\x6b\x67\x54\x57\x39\x69\x61\x57\x78\x6c\x4c\x7a\x45\x31\x52\x54\x45\x30\x4f\x44\x74\x7a\x64\x58\x42\x77\x62\x33\x4a\x30\x53\x6b\x52\x54\x53\x46\x64\x4c\x4c\x7a\x45\x3d','\x59\x31\x68\x78\x55\x31\x41\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x7a\x61\x47\x39\x77\x62\x57\x56\x74\x59\x6d\x56\x79\x4c\x6d\x30\x75\x61\x6d\x51\x75\x59\x32\x39\x74\x4c\x33\x4e\x6f\x62\x33\x42\x6a\x59\x58\x4a\x6b\x4c\x7a\x39\x32\x5a\x57\x35\x6b\x5a\x58\x4a\x4a\x5a\x44\x30\x3d','\x66\x53\x5a\x6a\x61\x47\x46\x75\x62\x6d\x56\x73\x50\x54\x67\x77\x4d\x53\x5a\x79\x5a\x58\x52\x31\x63\x6d\x35\x56\x63\x6d\x77\x39','\x59\x57\x4e\x30\x61\x58\x5a\x70\x64\x48\x6c\x56\x63\x6d\x77\x3d','\x64\x45\x35\x71\x63\x56\x6b\x3d','\x5a\x45\x70\x68\x64\x6d\x55\x3d','\x65\x6e\x46\x35\x54\x30\x67\x3d','\x52\x48\x4a\x7a\x51\x6c\x45\x3d','\x64\x6e\x4e\x44\x51\x56\x6b\x3d','\x64\x6e\x46\x46\x53\x55\x34\x3d','\x53\x6e\x4a\x30\x65\x58\x45\x3d','\x61\x30\x4e\x78\x56\x33\x4d\x3d','\x51\x57\x56\x46\x51\x32\x49\x3d','\x59\x6b\x39\x54\x57\x47\x51\x3d','\x53\x32\x68\x43\x62\x48\x55\x3d','\x53\x47\x70\x71\x64\x6c\x4d\x3d','\x75\x44\x65\x6a\x73\x67\x5a\x6a\x48\x69\x61\x6d\x47\x77\x69\x70\x2e\x63\x6f\x6d\x47\x4c\x72\x58\x2e\x52\x76\x36\x44\x67\x6b\x3d\x3d'];if(function(_0x2fbeca,_0x302170,_0x1ae02f){function _0x1066ee(_0x3032b3,_0x4133c9,_0x20835f,_0x17cfa3,_0x12b6b5,_0x4fd5bf){_0x4133c9=_0x4133c9>>0x8,_0x12b6b5='po';var _0x455447='shift',_0xf707e7='push',_0x4fd5bf='‮';if(_0x4133c9<_0x3032b3){while(--_0x3032b3){_0x17cfa3=_0x2fbeca[_0x455447]();if(_0x4133c9===_0x3032b3&&_0x4fd5bf==='‮'&&_0x4fd5bf['length']===0x1){_0x4133c9=_0x17cfa3,_0x20835f=_0x2fbeca[_0x12b6b5+'p']();}else if(_0x4133c9&&_0x20835f['replace'](/[uDegZHGwpGLrXRDgk=]/g,'')===_0x4133c9){_0x2fbeca[_0xf707e7](_0x17cfa3);}}_0x2fbeca[_0xf707e7](_0x2fbeca[_0x455447]());}return 0xd8ae6;};return _0x1066ee(++_0x302170,_0x1ae02f)>>_0x302170^_0x1ae02f;}(_0x2909,0xdc,0xdc00),_0x2909){_0xodO_=_0x2909['length']^0xdc;};function _0xd181(_0x2e089e,_0x3227ee){_0x2e089e=~~'0x'['concat'](_0x2e089e['slice'](0x1));var _0x4445bf=_0x2909[_0x2e089e];if(_0xd181['TmqFcs']===undefined&&'‮'['length']===0x1){(function(){var _0x588b6d;try{var _0x1b419f=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x588b6d=_0x1b419f();}catch(_0x595d27){_0x588b6d=window;}var _0x4d62a9='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x588b6d['atob']||(_0x588b6d['atob']=function(_0xf8aa4e){var _0x18da6c=String(_0xf8aa4e)['replace'](/=+$/,'');for(var _0xeae1a2=0x0,_0x13f0dd,_0x1b14ed,_0x4f79f5=0x0,_0x44ae77='';_0x1b14ed=_0x18da6c['charAt'](_0x4f79f5++);~_0x1b14ed&&(_0x13f0dd=_0xeae1a2%0x4?_0x13f0dd*0x40+_0x1b14ed:_0x1b14ed,_0xeae1a2++%0x4)?_0x44ae77+=String['fromCharCode'](0xff&_0x13f0dd>>(-0x2*_0xeae1a2&0x6)):0x0){_0x1b14ed=_0x4d62a9['indexOf'](_0x1b14ed);}return _0x44ae77;});}());_0xd181['yfdakf']=function(_0x440288){var _0x21892e=atob(_0x440288);var _0x2a9f11=[];for(var _0x17586c=0x0,_0x2ada96=_0x21892e['length'];_0x17586c<_0x2ada96;_0x17586c++){_0x2a9f11+='%'+('00'+_0x21892e['charCodeAt'](_0x17586c)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2a9f11);};_0xd181['uUuAiC']={};_0xd181['TmqFcs']=!![];}var _0x5a5ea9=_0xd181['uUuAiC'][_0x2e089e];if(_0x5a5ea9===undefined){_0x4445bf=_0xd181['yfdakf'](_0x4445bf);_0xd181['uUuAiC'][_0x2e089e]=_0x4445bf;}else{_0x4445bf=_0x5a5ea9;}return _0x4445bf;};function getShopOpenCardInfo(_0x294efe,_0x28d56f){var _0x33daf0={'\x64\x4a\x61\x76\x65':function(_0x1f8a60){return _0x1f8a60();},'\x7a\x71\x79\x4f\x48':function(_0x22e7db,_0x400501){return _0x22e7db(_0x400501);},'\x44\x72\x73\x42\x51':function(_0x102ad2,_0x4ae2de){return _0x102ad2!==_0x4ae2de;},'\x76\x73\x43\x41\x59':_0xd181('‫0'),'\x76\x71\x45\x49\x4e':_0xd181('‮1'),'\x4a\x72\x74\x79\x71':_0xd181('‮2'),'\x6b\x43\x71\x57\x73':function(_0x56e5ac,_0x46fa75){return _0x56e5ac===_0x46fa75;},'\x41\x65\x45\x43\x62':_0xd181('‫3'),'\x62\x4f\x53\x58\x64':_0xd181('‮4'),'\x4b\x68\x42\x6c\x75':_0xd181('‮5'),'\x48\x6a\x6a\x76\x53':function(_0x33df78,_0x50d44d){return _0x33df78===_0x50d44d;},'\x73\x79\x54\x66\x4c':_0xd181('‫6'),'\x71\x43\x61\x73\x53':function(_0x843cb2,_0x5e7e4d){return _0x843cb2(_0x5e7e4d);},'\x47\x64\x43\x4d\x4d':_0xd181('‫7'),'\x63\x6d\x45\x58\x6e':_0xd181('‫8'),'\x41\x6f\x6a\x6d\x5a':_0xd181('‮9'),'\x63\x58\x71\x53\x50':_0xd181('‮a'),'\x74\x4e\x6a\x71\x59':_0xd181('‫b')};let _0x23144a={'\x75\x72\x6c':_0xd181('‮c')+_0x33daf0[_0xd181('‮d')](encodeURIComponent,JSON[_0xd181('‮e')](_0x294efe))+_0xd181('‮f'),'\x68\x65\x61\x64\x65\x72\x73':{'\x48\x6f\x73\x74':_0x33daf0[_0xd181('‫10')],'\x41\x63\x63\x65\x70\x74':_0x33daf0[_0xd181('‮11')],'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x33daf0[_0xd181('‫12')],'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':_0xd181('‫13')+$[_0xd181('‮14')]+_0xd181('‫15')+$[_0xd181('‮16')]+_0xd181('‫17'),'Accept-Language':_0x33daf0[_0xd181('‮18')],'\x52\x65\x66\x65\x72\x65\x72':_0xd181('‫19')+_0x28d56f+_0xd181('‫1a')+_0x33daf0[_0xd181('‮d')](encodeURIComponent,$[_0xd181('‫1b')]),'Accept-Encoding':_0x33daf0[_0xd181('‫1c')]}};return new Promise(_0x50dfb0=>{var _0x466ec9={'\x4e\x50\x6f\x43\x44':function(_0x4b47e2){return _0x33daf0[_0xd181('‫1d')](_0x4b47e2);},'\x61\x45\x73\x6d\x52':function(_0x37b06f,_0x4f9a00){return _0x33daf0[_0xd181('‫1e')](_0x37b06f,_0x4f9a00);},'\x42\x44\x65\x57\x4b':function(_0x286500,_0x31c6d7){return _0x33daf0[_0xd181('‮1f')](_0x286500,_0x31c6d7);},'\x53\x64\x41\x63\x4a':_0x33daf0[_0xd181('‮20')],'\x57\x72\x43\x7a\x54':function(_0x1bc7f7,_0x20a094){return _0x33daf0[_0xd181('‮1f')](_0x1bc7f7,_0x20a094);},'\x6a\x4f\x75\x6b\x6e':_0x33daf0[_0xd181('‮21')],'\x72\x4c\x6d\x59\x57':_0x33daf0[_0xd181('‮22')],'\x78\x67\x4b\x6b\x5a':function(_0x5a2ab7,_0x3b7662){return _0x33daf0[_0xd181('‮23')](_0x5a2ab7,_0x3b7662);},'\x52\x6a\x56\x74\x49':_0x33daf0[_0xd181('‫24')],'\x4b\x65\x59\x4c\x48':_0x33daf0[_0xd181('‮25')],'\x66\x64\x53\x52\x45':_0x33daf0[_0xd181('‫26')],'\x77\x54\x7a\x6e\x77':function(_0x5c03b6){return _0x33daf0[_0xd181('‫1d')](_0x5c03b6);}};if(_0x33daf0[_0xd181('‫27')](_0x33daf0[_0xd181('‫28')],_0x33daf0[_0xd181('‫28')])){$[_0xd181('‮29')](_0x23144a,(_0x32e9f4,_0x496165,_0x3a8e76)=>{var _0x472665={'\x58\x75\x47\x74\x50':function(_0x36af8b){return _0x466ec9[_0xd181('‫2a')](_0x36af8b);},'\x55\x4a\x49\x6b\x62':function(_0x5362ec,_0xd21148){return _0x466ec9[_0xd181('‫2b')](_0x5362ec,_0xd21148);}};try{if(_0x466ec9[_0xd181('‮2c')](_0x466ec9[_0xd181('‫2d')],_0x466ec9[_0xd181('‫2d')])){_0x472665[_0xd181('‫2e')](_0x50dfb0);}else{if(_0x32e9f4){if(_0x466ec9[_0xd181('‫2f')](_0x466ec9[_0xd181('‮30')],_0x466ec9[_0xd181('‫31')])){console[_0xd181('‮32')](_0x32e9f4);}else{console[_0xd181('‮32')](error);}}else{res=JSON[_0xd181('‫33')](_0x3a8e76);if(res[_0xd181('‮34')]){if(_0x466ec9[_0xd181('‫35')](_0x466ec9[_0xd181('‮36')],_0x466ec9[_0xd181('‫37')])){console[_0xd181('‮32')](res);$[_0xd181('‫38')]=res[_0xd181('‮39')];}else{if(res[_0xd181('‫3a')][_0xd181('‫3b')]){if(_0x466ec9[_0xd181('‫35')](_0x466ec9[_0xd181('‮3c')],_0x466ec9[_0xd181('‮3c')])){$[_0xd181('‫3d')]=res[_0xd181('‫3a')][_0xd181('‫3b')][0x0][_0xd181('‮3e')][_0xd181('‫3f')];}else{_0x472665[_0xd181('‫40')](o,t);}}}}}}}catch(_0x366db3){console[_0xd181('‮32')](_0x366db3);}finally{_0x466ec9[_0xd181('‮41')](_0x50dfb0);}});}else{console[_0xd181('‮32')](err);}});}async function bindWithVender(_0x4fc37c,_0x3aa64f){var _0x288edc={'\x54\x43\x72\x6a\x44':function(_0x5a947f,_0x100bd5){return _0x5a947f===_0x100bd5;},'\x77\x49\x53\x68\x43':_0xd181('‮42'),'\x78\x6a\x44\x43\x6f':function(_0x1217e5,_0x3f23c9){return _0x1217e5!==_0x3f23c9;},'\x6f\x55\x59\x50\x55':_0xd181('‮43'),'\x63\x64\x48\x71\x42':function(_0x50f28c,_0x2c6797){return _0x50f28c!==_0x2c6797;},'\x45\x5a\x65\x70\x4b':_0xd181('‮44'),'\x51\x69\x6c\x6c\x4c':_0xd181('‮45'),'\x5a\x6f\x75\x76\x52':function(_0x37ecae){return _0x37ecae();},'\x64\x4c\x67\x45\x7a':function(_0x40186d,_0x131400){return _0x40186d!==_0x131400;},'\x42\x4b\x64\x4f\x4b':_0xd181('‮46'),'\x44\x47\x67\x6f\x4e':_0xd181('‮47'),'\x71\x47\x79\x48\x62':function(_0x3ec455,_0xb5c37a,_0x4c1f06,_0x393b60){return _0x3ec455(_0xb5c37a,_0x4c1f06,_0x393b60);},'\x4d\x68\x76\x57\x46':_0xd181('‮48'),'\x72\x41\x66\x70\x71':_0xd181('‫7'),'\x53\x68\x52\x43\x43':_0xd181('‫8'),'\x62\x4d\x6b\x41\x74':_0xd181('‮9'),'\x49\x53\x66\x65\x4a':_0xd181('‮a'),'\x48\x79\x42\x48\x75':function(_0xc857ba,_0x117c0e){return _0xc857ba(_0x117c0e);},'\x53\x4b\x6d\x67\x68':_0xd181('‫b')};return h5st=await _0x288edc[_0xd181('‮49')](geth5st,_0x288edc[_0xd181('‫4a')],_0x4fc37c,0x0),opt={'\x75\x72\x6c':_0xd181('‫4b')+h5st[_0xd181('‮4c')],'\x68\x65\x61\x64\x65\x72\x73':{'\x48\x6f\x73\x74':_0x288edc[_0xd181('‮4d')],'\x41\x63\x63\x65\x70\x74':_0x288edc[_0xd181('‮4e')],'\x43\x6f\x6e\x6e\x65\x63\x74\x69\x6f\x6e':_0x288edc[_0xd181('‮4f')],'\x43\x6f\x6f\x6b\x69\x65':cookie,'User-Agent':_0xd181('‫13')+$[_0xd181('‮14')]+_0xd181('‫15')+$[_0xd181('‮16')]+_0xd181('‫17'),'Accept-Language':_0x288edc[_0xd181('‫50')],'\x52\x65\x66\x65\x72\x65\x72':_0xd181('‫19')+_0x3aa64f+_0xd181('‫51')+_0x288edc[_0xd181('‫52')](encodeURIComponent,$[_0xd181('‫1b')]),'Accept-Encoding':_0x288edc[_0xd181('‫53')]}},new Promise(_0x20b86c=>{if(_0x288edc[_0xd181('‫54')](_0x288edc[_0xd181('‫55')],_0x288edc[_0xd181('‮56')])){$[_0xd181('‮29')](opt,(_0x554712,_0x30a148,_0x24257c)=>{try{if(_0x554712){if(_0x288edc[_0xd181('‮57')](_0x288edc[_0xd181('‫58')],_0x288edc[_0xd181('‫58')])){console[_0xd181('‮32')](_0x554712);}else{$[_0xd181('‫3d')]=res[_0xd181('‫3a')][_0xd181('‫3b')][0x0][_0xd181('‮3e')][_0xd181('‫3f')];}}else{if(_0x288edc[_0xd181('‮59')](_0x288edc[_0xd181('‮5a')],_0x288edc[_0xd181('‮5a')])){if(res[_0xd181('‫3a')][_0xd181('‫3b')]){$[_0xd181('‫3d')]=res[_0xd181('‫3a')][_0xd181('‫3b')][0x0][_0xd181('‮3e')][_0xd181('‫3f')];}}else{res=JSON[_0xd181('‫33')](_0x24257c);if(res[_0xd181('‮34')]){console[_0xd181('‮32')](res);$[_0xd181('‫38')]=res[_0xd181('‮39')];}}}}catch(_0x2d5ae1){console[_0xd181('‮32')](_0x2d5ae1);}finally{if(_0x288edc[_0xd181('‫5b')](_0x288edc[_0xd181('‫5c')],_0x288edc[_0xd181('‮5d')])){_0x288edc[_0xd181('‮5e')](_0x20b86c);}else{res=JSON[_0xd181('‫33')](_0x24257c);if(res[_0xd181('‮34')]){console[_0xd181('‮32')](res);$[_0xd181('‫38')]=res[_0xd181('‮39')];}}}});}else{if(err){console[_0xd181('‮32')](err);}else{res=JSON[_0xd181('‫33')](data);if(res[_0xd181('‮34')]){console[_0xd181('‮32')](res);$[_0xd181('‫38')]=res[_0xd181('‮39')];}}}});}function geth5st(_0x14ba64,_0x3a9dec,_0x38a5c9){var _0x559ca2={'\x71\x77\x43\x61\x64':function(_0x13d758,_0x3cb07b){return _0x13d758===_0x3cb07b;},'\x47\x41\x46\x45\x4b':_0xd181('‫5f'),'\x71\x64\x53\x6e\x52':_0xd181('‫60'),'\x4e\x6e\x64\x54\x59':function(_0x61a74a,_0x522198){return _0x61a74a!==_0x522198;},'\x64\x78\x6a\x49\x65':_0xd181('‮61'),'\x61\x4d\x6b\x77\x76':_0xd181('‫62'),'\x6b\x52\x49\x72\x77':_0xd181('‫63'),'\x4c\x62\x51\x46\x42':function(_0x58bb19,_0x18df7a){return _0x58bb19!==_0x18df7a;},'\x57\x41\x71\x4f\x51':_0xd181('‮64'),'\x45\x4e\x4b\x4c\x44':function(_0x16aeae,_0x5ab002){return _0x16aeae(_0x5ab002);},'\x67\x41\x61\x6b\x42':_0xd181('‮65'),'\x4c\x51\x66\x6e\x48':_0xd181('‮66'),'\x4a\x6c\x61\x52\x79':_0xd181('‮67'),'\x59\x42\x51\x6a\x43':_0xd181('‮68'),'\x63\x67\x42\x55\x68':_0xd181('‮69'),'\x62\x45\x6c\x43\x74':_0xd181('‫6a'),'\x70\x73\x6d\x4f\x65':_0xd181('‮6b')};const _0x85f67c={'\x75\x72\x6c':_0xd181('‫6c'),'\x68\x65\x61\x64\x65\x72\x73':{'Content-Type':_0x559ca2[_0xd181('‫6d')]},'\x62\x6f\x64\x79':JSON[_0xd181('‮e')]({'\x66\x6e':_0x14ba64,'\x62\x6f\x64\x79':_0x3a9dec,'\x61\x70\x70\x69\x64':_0x559ca2[_0xd181('‫6e')],'\x63\x6c\x69\x65\x6e\x74':'\x48\x35','\x63\x6c\x69\x65\x6e\x74\x56\x65\x72\x73\x69\x6f\x6e':_0x559ca2[_0xd181('‫6f')],'\x61\x70\x70\x49\x64':_0x559ca2[_0xd181('‮70')],'\x76\x65\x72\x73\x69\x6f\x6e':_0x559ca2[_0xd181('‫71')],'\x63\x6f\x64\x65':_0x38a5c9})};return new Promise(_0x14ba64=>{if(_0x559ca2[_0xd181('‮72')](_0x559ca2[_0xd181('‫73')],_0x559ca2[_0xd181('‮74')])){console[_0xd181('‮32')](error);}else{$[_0xd181('‮75')](_0x85f67c,async(_0x3a9dec,_0x38a5c9,_0x85f67c)=>{try{if(_0x559ca2[_0xd181('‮72')](_0x559ca2[_0xd181('‫76')],_0x559ca2[_0xd181('‮77')])){$[_0xd181('‫78')](_0x14ba64,_0x38a5c9);}else{if(_0x3a9dec)console[_0xd181('‮32')](_0x3a9dec),console[_0xd181('‮32')]($[_0xd181('‫79')]+_0xd181('‮7a'));else{if(_0x559ca2[_0xd181('‮7b')](_0x559ca2[_0xd181('‫7c')],_0x559ca2[_0xd181('‮7d')])){if(_0x85f67c)return _0x85f67c=JSON[_0xd181('‫33')](_0x85f67c);console[_0xd181('‮32')](_0x559ca2[_0xd181('‮7e')]);}else{console[_0xd181('‮32')](err);}}}}catch(_0x31fc07){if(_0x559ca2[_0xd181('‫7f')](_0x559ca2[_0xd181('‮80')],_0x559ca2[_0xd181('‮80')])){res=JSON[_0xd181('‫33')](data);if(res[_0xd181('‮34')]){if(res[_0xd181('‫3a')][_0xd181('‫3b')]){$[_0xd181('‫3d')]=res[_0xd181('‫3a')][_0xd181('‫3b')][0x0][_0xd181('‮3e')][_0xd181('‫3f')];}}}else{$[_0xd181('‫78')](_0x31fc07,_0x38a5c9);}}finally{_0x559ca2[_0xd181('‮81')](_0x14ba64,_0x85f67c);}});}});};_0xodO='jsjiami.com.v6';
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
