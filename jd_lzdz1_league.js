/**
11.11超店会员福利社

**/

const $ = new Env("11.11超店会员福利社");
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let ownCode = null;
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
!(async () => {
    $.getAuthorCodeListerr = false
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
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
                console.log('更新ck');
                continue
            }
            $.bean = 0;
            $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
            $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            authorCodeList = [
                'e20b42da77f14ce794f58d9b3373444a',
                // 'bc8c2618444f4b64baee1497a8418870',
                // '12958ed848ea42c9a0d9d8df6e9199ad',
            ]
            // $.authorCode = authorCodeList[random(0, authorCodeList.length)]
            $.authorCode = ownCode ? ownCode : authorCodeList[random(0, authorCodeList.length)]
            $.authorNum = `${random(1000000, 9999999)}`
            $.activityId = 'dz38624f02475b8fea41a59f20shop'
            $.activityShopId = '1000077045'
            $.activityUrl = `https://lzdz1-isv.isvjcloud.com/dingzhi/shop/league/activity/${$.authorNum}?activityId=${$.activityId}&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null&shareuserid4minipg=${encodeURIComponent($.secretPin)}&shopid=${$.activityShopId}&lng=00.000000&lat=00.000000&sid=&un_area=`
            await league();
            await $.wait(2000);
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


async function league() {
    $.token = null;
    $.secretPin = null;
    $.openCardActivityId = null
    await getFirstLZCK()
    await getToken();
    await task('dz/common/getSimpleActInfoVo', `activityId=${$.activityId}`, 1)
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            console.log("去助力 -> "+$.authorCode)
            await task("taskact/common/drawContent", `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}`)
            await task('common/accessLogWithAD', `venderId=${$.activityShopId}&code=99&pin=${encodeURIComponent($.secretPin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=null`, 1);
            await task('wxActionCommon/getUserInfo', `pin=${encodeURIComponent($.secretPin)}`, 1)
            await task('shop/league/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&pinImg=${encodeURIComponent($.pinImg)}&nick=${encodeURIComponent($.pin)}&cjyxPin=&cjhyPin=&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null`)
            if ($.activityContent) {
                await task('shop/league/checkOpenCard', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&shareUuid=${encodeURIComponent($.authorCode)}&actorUuid=${$.actorUuid}`)
                $.log("\n关注店铺")
                if (!$.activityContent['followShop'].allStatus) {
                    await task('shop/league/saveTask', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&actorUuid=${$.actorUuid}&shareUuid=${encodeURIComponent($.authorCode)}&taskType=1&taskValue=1`)
                } else {
                    $.log("已经关注过了\n")
                    await $.wait(2000);
                    // return
                }
                $.log("\n加入店铺会员");
                if ($.openCardStatus.cardList) {
                    // console.log($.openCardStatus.cardList)
                    taskList = $.openCardStatus.cardList.filter((x) => !x.status);
                    console.log(taskList.length)
                    for (const vo of taskList) {
                        $.log(`去加入${vo.name}`);
                        console.log(vo.value)
                        await getShopOpenCardInfo({ venderId: `${vo.value}`, channel: "401" }, vo.value);
                        // console.log($.openCardActivityId)
                        await bindWithVender({ venderId: `${vo.value}`, bindByVerifyCodeFlag: 1, registerExtend: {}, writeChildFlag: 0, activityId: 2329491, channel: 401 }, vo.value);
                        await $.wait(500);
                        // await $.wait(1000);
                    }
                    // await getFirstLZCK()
                    // await getToken();
                    $.log("\n绑定助力");
                    await task(
                        "shop/league/checkOpenCard",
                        `activityId=${$.activityId}&actorUuid=${$.actorUuid}&shareUuid=${$.authorCode
                        }&pin=${encodeURIComponent($.secretPin)}`
                    );
                    await task('shop/league/activityContent', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&pinImg=${encodeURIComponent($.pinImg)}&nick=${encodeURIComponent($.pin)}&cjyxPin=&cjhyPin=&shareUuid=${encodeURIComponent($.authorCode)}&adsource=null`)
                    // await getFirstLZCK()
                    // await getToken();
                    // $.log("\n加入购物车")
                    // if (!$.activityContent['addSku'].allStatus) {
                    //     await task('shop/league/saveTask', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&actorUuid=${$.actorUuid}&shareUuid=${encodeURIComponent($.authorCode)}&taskType=2&taskValue=2`)
                    // } else {
                    //     $.log("已经加入过了\n")
                    // }

                    // $.log("\c抽奖")
                    // await task('shop/league/startDraw', `activityId=${$.activityId}&pin=${encodeURIComponent($.secretPin)}&actorUuid=${$.actorUuid}`)
                } else {
                    $.log("没有获取到对应的任务。\n");
                }
            } else {
                $.log("无法顺利的获取到活动信息。")
            }
        } else {
            $.log("没有成功获取到用户信息")
        }
    } else {
        $.log("没有成功获取到用户鉴权信息")
    }
}

function task(function_id, body, isCommon = 0) {
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
                                case 'dz/common/getSimpleActInfoVo':
                                    $.jdActivityId = data.data.jdActivityId;
                                    $.venderId = data.data.venderId;
                                    // console.log($.venderId)
                                    break;
                                case 'wxActionCommon/getUserInfo':
                                    if (data.data.yunMidImageUrl) {
                                        // if ($.index === 1) {
                                        //     ownCode['pinImg'] = data.data.yunMidImageUrl
                                        //     ownCode['nickname'] = data.data.nickname
                                        // }
                                        $.pinImg = data.data.yunMidImageUrl
                                    } else {
                                        // if ($.index === 1) {
                                        //     ownCode['pinImg'] = 'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png'
                                        //     ownCode['nickname'] = data.data.nickname
                                        // }
                                        $.pinImg = 'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png'
                                    }
                                    break;
                                case 'shop/league/activityContent':
                                    if (!data.data.hasEnd) {
                                        if ($.index === 1) {
                                            $.log(`开启【${data.data.activityName}】活动`)
                                            // $.log("-------------------")
                                            ownCode = data.data.actorUuid
                                            console.log("你的助力码 -> "+ownCode)
                                        }
                                        $.activityContent = data.data;
                                        $.actorUuid = data.data.actorUuid;
                                    } else {
                                        $.log("活动已经结束");
                                    }
                                    break;
                                case 'shop/league/checkOpenCard':
                                    $.openCardStatus = data.data;
                                    break;
                                case 'shop/league/startDraw':
                                    console.log(data.data)
                                    break;
                                case 'shop/league/saveTask':
                                    if (data.data) {
                                        if (data.data.addBeanNum) {
                                            $.bean += data.data.addBeanNum;
                                            $.log(`获得【${data.data.addBeanNum}】京豆\n`)
                                        }
                                        if (data.data.addScore) {
                                            $.log(`获得【${data.data.addScore}】积分\n`)
                                        }
                                    }
                                    break;
                                default:
                                    $.log(JSON.stringify(data))
                                    break;
                            }
                        } else {
                            $.log(JSON.stringify(data))
                        }
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

function taskUrl(function_id, body, isCommon) {
    return {
        url: isCommon ? `https://lzdz1-isv.isvjcloud.com/${function_id}` : `https://lzdz1-isv.isvjcloud.com/dingzhi/${function_id}`,
        headers: {
            Host: 'lzdz1-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzdz1-isv.isvjcloud.com',
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
        url: `https://lzdz1-isv.isvjcloud.com/customer/getMyPing`,
        headers: {
            Host: 'lzdz1-isv.isvjcloud.com',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-cn',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: 'https://lzdz1-isv.isvjcloud.com',
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
var _0xod0='jsjiami.com.v6',_0xod0_=['‮_0xod0'],_0x2df1=[_0xod0,'cGdqRVY=','cWdqdXE=','d0pTVWw=','aFBzVk4=','aGZCelY=','dG5MSG0=','WkR3RlA=','c1Fnc2k=','eXdldXA=','VGdPU3c=','bUZnRVE=','dlp3cFo=','UVBoRW4=','Z1luRXU=','anpDdG0=','Sk1qRXk=','dkZQemk=','dXlGaFk=','eVlpelU=','aGZ3T1U=','V3ZCWlc=','Y3JkZEw=','eWlrQlQ=','dmJxckI=','bkdtQ20=','WElTb0k=','TW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxM18yXzMgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzEzLjAuMyBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSBFZGcvODcuMC40MjgwLjg4','T3ZtVmw=','aXVUREM=','U0VoYW4=','a2VRUFk=','WkRWZng=','ekFuUUQ=','bGNMd2w=','YmhtWUI=','aHR0cHM6Ly9jZG4ubnoubHUvZGRv','Yk9KYlY=','UFRtRWw=','V2dTUHI=','VmNiR2o=','TnZFVlA=','TWpIemk=','REpmSUo=','eXVRcm0=','cUViRFg=','QWxjQXc=','YWpiZlQ=','aGxWWU4=','R1dJRXE=','QWdFZ28=','S2NQVUM=','YXBpLm0uamQuY29t','Ki8q','emgtY24=','aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj9hcHBpZD1qZF9zaG9wX21lbWJlciZmdW5jdGlvbklkPWdldFNob3BPcGVuQ2FyZEluZm8mYm9keT0=','c3RyaW5naWZ5','JmNsaWVudD1INSZjbGllbnRWZXJzaW9uPTkuMi4wJnV1aWQ9ODg4ODg=','YnVxVEY=','UHdnRmw=','a2VlcC1hbGl2ZQ==','amRhcHA7aVBob25lOzkuNS40OzEzLjY7','VVVJRA==','O25ldHdvcmsvd2lmaTtBRElELw==','QURJRA==','O21vZGVsL2lQaG9uZTEwLDM7YWRkcmVzc2lkLzA7YXBwQnVpbGQvMTY3NjY4O2pkU3VwcG9ydERhcmtNb2RlLzA7TW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxM182IGxpa2UgTWFjIE9TIFgpIEFwcGxlV2ViS2l0LzYwNS4xLjE1IChLSFRNTCwgbGlrZSBHZWNrbykgTW9iaWxlLzE1RTE0ODtzdXBwb3J0SkRTSFdLLzE=','TUZRTkg=','aHR0cHM6Ly9zaG9wbWVtYmVyLm0uamQuY29tL3Nob3BjYXJkLz92ZW5kZXJJZD0=','fSZjaGFubmVsPTgwMSZyZXR1cm5Vcmw9','ckpKenQ=','YWN0aXZpdHlVcmw=','Z3ppcCwgZGVmbGF0ZSwgYnI=','Z2V0','dkdWSkw=','Pj4+IA==','THZmU2s=','WkptZlA=','RVNlVmI=','bG9n','cGFyc2U=','c3VjY2Vzcw==','VVVZT04=','cmVzdWx0','aW50ZXJlc3RzUnVsZUxpc3Q=','blNyQUw=','QVlSWG4=','Z1hvWWI=','b3BlbkNhcmRBY3Rpdml0eUlk','aW50ZXJlc3RzSW5mbw==','YWN0aXZpdHlJZA==','bmFtZQ==','IGdldFNpZ24gQVBJ6K+35rGC5aSx6LSl77yM6K+35qOA5p+l572R6Lev6YeN6K+V','Y0p1dms=','bWFWS3c=','c3ZTb2Y=','Z1dTaHU=','bWVzc2FnZQ==','YmluZFdpdGhWZW5kZXJtZXNzYWdl','5Lqs5Lic6L+U5Zue5LqG56m65pWw5o2u','dHNpaWc=','YlVBV3c=','YmluZFdpdGhWZW5kZXI=','aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj8=','Ym9keQ==','Z0Vyb1g=','QkVRVWk=','QkVVaHA=','fSZjaGFubmVsPTQwMSZyZXR1cm5Vcmw9','QlBNREg=','UnVyQUM=','ZExYcUE=','bG9nRXJy','SndxZHI=','bU5MTHQ=','TnViYng=','R0xRVVM=','dEllbFk=','a0hOTWk=','Y29kZQ==','dG9rZW4=','RGJ6anA=','cnFaaVk=','SW50am4=','dEN6Tk4=','S1hHcm8=','OGFkZmI=','amRfc2hvcF9tZW1iZXI=','OS4yLjA=','amRzaWduLmV1Lm9yZw==','WnZHYVo=','YXBwbGljYXRpb24vanNvbg==','Q3ZRU3g=','dEtwTGU=','SFVadUk=','Y0dibE8=','RUJBZEc=','aXFkSlo=','ZW52','U0lHTl9VUkw=','UnpiamI=','RlFGekU=','RUNPelQ=','Zmxvb3I=','cmFuZG9t','bGVuZ3Ro','aHR0cHM6Ly9jZG4ubnoubHUvZ2V0aDVzdA==','TEdrVno=','RGJSdXU=','cG9zdA==','Y1pqU2E=','YXBwbHk=','ZmJKcHc=','aUNtWEY=','QlJUUHc=','cnVmZVA=','eE9xWW8=','ZXpUY3k=','aHR0cHM6Ly9semR6MS1pc3YuaXN2amNsb3VkLmNvbQ==','YXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVk','SkQ0aVBob25lLzE2NzY1MCAoaVBob25lOyBpT1MgMTMuNzsgU2NhbGUvMy4wMCk=','emgtSGFucy1DTjtxPTE=','RkFwVUM=','aXN2T2JmdXNjYXRvcg==','YWpPeWM=','aHR0cHM6Ly9hcGkubS5qZC5jb20vY2xpZW50LmFjdGlvbj9mdW5jdGlvbklkPWlzdk9iZnVzY2F0b3I=','ZEdYa2o=','WmJiVUk=','T0pScHE=','bGVkSEc=','Zm9pUk8=','Z0VRV3Y=','VjsjWiamhUi.cIofnmxX.vrt6COgM=='];if(function(_0x41b5ff,_0xff9ae8,_0x3e8ff1){function _0x567b53(_0x3bd701,_0x32f5b6,_0x2a3795,_0x28eaaa,_0x1c4cb2,_0x5b1c13){_0x32f5b6=_0x32f5b6>>0x8,_0x1c4cb2='po';var _0x2e726d='shift',_0x58dd02='push',_0x5b1c13='‮';if(_0x32f5b6<_0x3bd701){while(--_0x3bd701){_0x28eaaa=_0x41b5ff[_0x2e726d]();if(_0x32f5b6===_0x3bd701&&_0x5b1c13==='‮'&&_0x5b1c13['length']===0x1){_0x32f5b6=_0x28eaaa,_0x2a3795=_0x41b5ff[_0x1c4cb2+'p']();}else if(_0x32f5b6&&_0x2a3795['replace'](/[VWhUIfnxXrtCOgM=]/g,'')===_0x32f5b6){_0x41b5ff[_0x58dd02](_0x28eaaa);}}_0x41b5ff[_0x58dd02](_0x41b5ff[_0x2e726d]());}return 0x10f04d;};return _0x567b53(++_0xff9ae8,_0x3e8ff1)>>_0xff9ae8^_0x3e8ff1;}(_0x2df1,0xd9,0xd900),_0x2df1){_0xod0_=_0x2df1['length']^0xd9;};function _0x4970(_0x509bc4,_0x28a5dc){_0x509bc4=~~'0x'['concat'](_0x509bc4['slice'](0x1));var _0x5596f1=_0x2df1[_0x509bc4];if(_0x4970['jyshjM']===undefined&&'‮'['length']===0x1){(function(){var _0xacd467=function(){var _0x8c848b;try{_0x8c848b=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x139ccf){_0x8c848b=window;}return _0x8c848b;};var _0x5dd842=_0xacd467();var _0x4aed33='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x5dd842['atob']||(_0x5dd842['atob']=function(_0x22293a){var _0xcb8810=String(_0x22293a)['replace'](/=+$/,'');for(var _0xd5cadf=0x0,_0x2c9cb9,_0x3f97af,_0x1e9c00=0x0,_0x36e892='';_0x3f97af=_0xcb8810['charAt'](_0x1e9c00++);~_0x3f97af&&(_0x2c9cb9=_0xd5cadf%0x4?_0x2c9cb9*0x40+_0x3f97af:_0x3f97af,_0xd5cadf++%0x4)?_0x36e892+=String['fromCharCode'](0xff&_0x2c9cb9>>(-0x2*_0xd5cadf&0x6)):0x0){_0x3f97af=_0x4aed33['indexOf'](_0x3f97af);}return _0x36e892;});}());_0x4970['rGOdmu']=function(_0x582aa0){var _0x5acab9=atob(_0x582aa0);var _0x1f6d4c=[];for(var _0x3d2465=0x0,_0x4251f9=_0x5acab9['length'];_0x3d2465<_0x4251f9;_0x3d2465++){_0x1f6d4c+='%'+('00'+_0x5acab9['charCodeAt'](_0x3d2465)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1f6d4c);};_0x4970['AKkYLJ']={};_0x4970['jyshjM']=!![];}var _0x528206=_0x4970['AKkYLJ'][_0x509bc4];if(_0x528206===undefined){_0x5596f1=_0x4970['rGOdmu'](_0x5596f1);_0x4970['AKkYLJ'][_0x509bc4]=_0x5596f1;}else{_0x5596f1=_0x528206;}return _0x5596f1;};function getShopOpenCardInfo(_0x50078e,_0x1ebba8){var _0x5383d0={'vGVJL':function(_0xea3452,_0x5952ad){return _0xea3452+_0x5952ad;},'LvfSk':function(_0x2114b8,_0x4f7b80){return _0x2114b8!==_0x4f7b80;},'ZJmfP':_0x4970('‫0'),'ESeVb':_0x4970('‫1'),'UUYON':_0x4970('‫2'),'nSrAL':function(_0x5a5faf,_0x548eec){return _0x5a5faf===_0x548eec;},'AYRXn':_0x4970('‮3'),'buqTF':_0x4970('‫4'),'PwgFl':_0x4970('‮5'),'MFQNH':_0x4970('‮6'),'rJJzt':function(_0x51907f,_0x28837f){return _0x51907f(_0x28837f);}};let _0x42e567={'url':_0x4970('‮7')+encodeURIComponent(JSON[_0x4970('‫8')](_0x50078e))+_0x4970('‫9'),'headers':{'Host':_0x5383d0[_0x4970('‮a')],'Accept':_0x5383d0[_0x4970('‮b')],'Connection':_0x4970('‮c'),'Cookie':cookie,'User-Agent':_0x4970('‫d')+$[_0x4970('‫e')]+_0x4970('‮f')+$[_0x4970('‫10')]+_0x4970('‮11'),'Accept-Language':_0x5383d0[_0x4970('‫12')],'Referer':_0x4970('‫13')+_0x1ebba8+_0x4970('‫14')+_0x5383d0[_0x4970('‮15')](encodeURIComponent,$[_0x4970('‮16')]),'Accept-Encoding':_0x4970('‫17')}};return new Promise(_0x3315b2=>{$[_0x4970('‫18')](_0x42e567,(_0xb211aa,_0x42e346,_0x5110cf)=>{var _0x529b2b={'svSof':function(_0x840bbd,_0x5c028d){return _0x5383d0[_0x4970('‫19')](_0x840bbd,_0x5c028d);},'gWShu':_0x4970('‫1a')};try{if(_0x5383d0[_0x4970('‫1b')](_0x5383d0[_0x4970('‮1c')],_0x5383d0[_0x4970('‫1d')])){if(_0xb211aa){console[_0x4970('‫1e')](_0xb211aa);}else{res=JSON[_0x4970('‮1f')](_0x5110cf);if(res[_0x4970('‫20')]){if(_0x5383d0[_0x4970('‫21')]===_0x4970('‫2')){if(res[_0x4970('‫22')][_0x4970('‫23')]){if(_0x5383d0[_0x4970('‫24')](_0x5383d0[_0x4970('‮25')],_0x4970('‫26'))){console[_0x4970('‫1e')](_0xb211aa);}else{$[_0x4970('‮27')]=res[_0x4970('‫22')][_0x4970('‫23')][0x0][_0x4970('‫28')][_0x4970('‫29')];}}}else{if(res[_0x4970('‫22')][_0x4970('‫23')]){$[_0x4970('‮27')]=res[_0x4970('‫22')][_0x4970('‫23')][0x0][_0x4970('‫28')][_0x4970('‫29')];}}}}}else{if(_0xb211aa){console[_0x4970('‫1e')](''+JSON[_0x4970('‫8')](_0xb211aa));console[_0x4970('‫1e')]($[_0x4970('‫2a')]+_0x4970('‮2b'));}else{}}}catch(_0x3a2746){console[_0x4970('‫1e')](_0x3a2746);}finally{if(_0x5383d0[_0x4970('‫24')](_0x4970('‮2c'),_0x4970('‮2d'))){if(_0xb211aa){console[_0x4970('‫1e')](_0xb211aa);}else{res=JSON[_0x4970('‮1f')](_0x5110cf);if(res[_0x4970('‫20')]){console[_0x4970('‫1e')](_0x529b2b[_0x4970('‮2e')](_0x529b2b[_0x4970('‮2f')],res[_0x4970('‮30')]));$[_0x4970('‫31')]=res[_0x4970('‮30')];}}}else{_0x3315b2();}}});});}async function bindWithVender(_0x236bde,_0xcf8ba7){var _0x5269e9={'Jwqdr':function(_0x1ee098,_0x46d528){return _0x1ee098===_0x46d528;},'mNLLt':_0x4970('‮32'),'Nubbx':function(_0x29681f,_0x2e7cf1){return _0x29681f===_0x2e7cf1;},'rqZiY':function(_0x430421){return _0x430421();},'RurAC':function(_0x44712a,_0x2ad7fc){return _0x44712a!==_0x2ad7fc;},'dLXqA':_0x4970('‫33'),'bUAWw':function(_0xbfb41e,_0x3840c9,_0x5cd8bf,_0x316828){return _0xbfb41e(_0x3840c9,_0x5cd8bf,_0x316828);},'gEroX':_0x4970('‫4'),'BEQUi':_0x4970('‮5'),'BEUhp':_0x4970('‮c'),'BPMDH':_0x4970('‫17')};return h5st=await _0x5269e9[_0x4970('‫34')](geth5st,_0x4970('‮35'),_0x236bde,0x0),opt={'url':_0x4970('‮36')+h5st[_0x4970('‮37')],'headers':{'Host':_0x5269e9[_0x4970('‮38')],'Accept':_0x5269e9[_0x4970('‫39')],'Connection':_0x5269e9[_0x4970('‮3a')],'Cookie':cookie,'User-Agent':_0x4970('‫d')+$[_0x4970('‫e')]+_0x4970('‮f')+$[_0x4970('‫10')]+_0x4970('‮11'),'Accept-Language':_0x4970('‮6'),'Referer':_0x4970('‫13')+_0xcf8ba7+_0x4970('‫3b')+encodeURIComponent($[_0x4970('‮16')]),'Accept-Encoding':_0x5269e9[_0x4970('‫3c')]}},new Promise(_0x1b598b=>{if(_0x5269e9[_0x4970('‮3d')](_0x5269e9[_0x4970('‫3e')],_0x5269e9[_0x4970('‫3e')])){$[_0x4970('‫3f')](e,resp);}else{$[_0x4970('‫18')](opt,(_0x378286,_0x7b395f,_0x596cb0)=>{var _0x27022d={'kHNMi':function(_0x2e0e4a,_0x496c2f){return _0x5269e9[_0x4970('‮40')](_0x2e0e4a,_0x496c2f);},'Dbzjp':_0x5269e9[_0x4970('‫41')]};try{if(_0x378286){console[_0x4970('‫1e')](_0x378286);}else{res=JSON[_0x4970('‮1f')](_0x596cb0);if(res[_0x4970('‫20')]){console[_0x4970('‫1e')](_0x4970('‫1a')+res[_0x4970('‮30')]);$[_0x4970('‫31')]=res[_0x4970('‮30')];}}}catch(_0x9a166a){console[_0x4970('‫1e')](_0x9a166a);}finally{if(_0x5269e9[_0x4970('‮42')](_0x4970('‫43'),_0x4970('‫44'))){if(_0x596cb0){_0x596cb0=JSON[_0x4970('‮1f')](_0x596cb0);if(_0x27022d[_0x4970('‮45')](_0x596cb0[_0x4970('‫46')],'0')){$[_0x4970('‮47')]=_0x596cb0[_0x4970('‮47')];}}else{$[_0x4970('‫1e')](_0x27022d[_0x4970('‫48')]);}}else{_0x5269e9[_0x4970('‫49')](_0x1b598b);}}});}});}function geth5st(_0x3688e6,_0x1b6c30){var _0x1b021c={'cZjSa':function(_0x491b51){return _0x491b51();},'fbJpw':_0x4970('‮4a'),'CvQSx':function(_0x22be63,_0xd0301f){return _0x22be63===_0xd0301f;},'iCmXF':_0x4970('‮4b'),'tKpLe':_0x4970('‫4c'),'HUZuI':_0x4970('‮4d'),'cGblO':_0x4970('‫4e'),'EBAdG':_0x4970('‫4f'),'iqdJZ':_0x4970('‫50'),'Rzbjb':function(_0x229a73,_0x2b17d2){return _0x229a73!==_0x2b17d2;},'ECOzT':_0x4970('‮51'),'LGkVz':_0x4970('‮52'),'DbRuu':function(_0x185f05,_0x494558){return _0x185f05*_0x494558;}};return new Promise(async _0x5a8bfd=>{if(_0x1b021c[_0x4970('‮53')](_0x1b021c[_0x4970('‮54')],_0x1b021c[_0x4970('‮54')])){let _0xb36873={'appId':_0x1b021c[_0x4970('‮55')],'body':{'appid':_0x1b021c[_0x4970('‫56')],'functionId':_0x3688e6,'body':JSON[_0x4970('‫8')](_0x1b6c30),'clientVersion':_0x1b021c[_0x4970('‫57')],'client':'H5','activityId':$[_0x4970('‫29')]},'callbackAll':!![]};let _0xcc98e3='';let _0x4b5c78=[_0x1b021c[_0x4970('‫58')]];if(process[_0x4970('‮59')][_0x4970('‮5a')]){if(_0x1b021c[_0x4970('‮5b')](_0x4970('‮5c'),_0x1b021c[_0x4970('‮5d')])){_0xcc98e3=process[_0x4970('‮59')][_0x4970('‮5a')];}else{_0xb36873=JSON[_0x4970('‮1f')](_0xb36873);if(_0xb36873[_0x4970('‫46')]==='0'){$[_0x4970('‮47')]=_0xb36873[_0x4970('‮47')];}}}else{_0xcc98e3=_0x4b5c78[Math[_0x4970('‮5e')](Math[_0x4970('‫5f')]()*_0x4b5c78[_0x4970('‮60')])];}let _0x5a01bd={'url':_0x4970('‮61'),'body':JSON[_0x4970('‫8')](_0xb36873),'headers':{'Host':_0xcc98e3,'Content-Type':_0x1b021c[_0x4970('‮62')]},'timeout':_0x1b021c[_0x4970('‫63')](0x1e,0x3e8)};$[_0x4970('‮64')](_0x5a01bd,async(_0x3b411b,_0x4d8a9d,_0xb36873)=>{var _0x1fb03b={'rufeP':function(_0x1cdcf2){return _0x1b021c[_0x4970('‫65')](_0x1cdcf2);}};try{if(_0x3b411b){_0xb36873=await geth5st[_0x4970('‮66')](this,arguments);}else{}}catch(_0x4000a3){if(_0x4970('‮4a')!==_0x1b021c[_0x4970('‮67')]){_0xcc98e3=process[_0x4970('‮59')][_0x4970('‮5a')];}else{$[_0x4970('‫3f')](_0x4000a3,_0x4d8a9d);}}finally{if(_0x1b021c[_0x4970('‮53')](_0x1b021c[_0x4970('‫68')],_0x4970('‮69'))){_0x1fb03b[_0x4970('‮6a')](_0x5a8bfd);}else{_0x5a8bfd(_0xb36873);}}});}else{$[_0x4970('‫1e')](err);}});}async function getToken(){var _0x295b06={'pgjEV':function(_0x38e2a7,_0x39f5d2){return _0x38e2a7===_0x39f5d2;},'hfBzV':_0x4970('‫6b'),'ZDwFP':function(_0x34ac9c,_0x20f9cd){return _0x34ac9c!==_0x20f9cd;},'sQgsi':_0x4970('‫6c'),'FApUC':function(_0x38012e,_0x105fe0,_0x2ded2f){return _0x38012e(_0x105fe0,_0x2ded2f);},'ajOyc':_0x4970('‫6d'),'dGXkj':_0x4970('‫4'),'ZbbUI':_0x4970('‫6e'),'OJRpq':_0x4970('‮5'),'ledHG':_0x4970('‮c'),'foiRO':_0x4970('‫6f'),'gEQWv':_0x4970('‮70')};let _0x4f57fe=await _0x295b06[_0x4970('‮71')](getSign,_0x4970('‫72'),{'id':'','url':_0x295b06[_0x4970('‫73')]});let _0x18f04f={'url':_0x4970('‮74'),'headers':{'Host':_0x295b06[_0x4970('‮75')],'Content-Type':_0x295b06[_0x4970('‫76')],'Accept':_0x295b06[_0x4970('‫77')],'Connection':_0x295b06[_0x4970('‫78')],'Cookie':cookie,'User-Agent':_0x295b06[_0x4970('‫79')],'Accept-Language':_0x295b06[_0x4970('‫7a')],'Accept-Encoding':_0x4970('‫17')},'body':_0x4f57fe};return new Promise(_0x143b5d=>{var _0xba7320={'gYnEu':function(_0x59f346,_0x4cc69b){return _0x59f346*_0x4cc69b;},'TgOSw':function(_0x42a358,_0x24553f){return _0x295b06[_0x4970('‮7b')](_0x42a358,_0x24553f);},'mFgEQ':_0x4970('‮7c'),'QPhEn':_0x4970('‮7d'),'jzCtm':_0x4970('‮7e'),'vFPzi':_0x295b06[_0x4970('‫7f')],'yYizU':_0x4970('‫80'),'hfwOU':_0x4970('‮32'),'WvBZW':function(_0x5d0be2,_0x2f416a){return _0x295b06[_0x4970('‮81')](_0x5d0be2,_0x2f416a);},'crddL':_0x295b06[_0x4970('‮82')],'yikBT':_0x4970('‫83')};$[_0x4970('‮64')](_0x18f04f,(_0x299174,_0x47d12e,_0x5668ff)=>{if(_0xba7320[_0x4970('‫84')](_0xba7320[_0x4970('‮85')],_0x4970('‫86'))){$[_0x4970('‮27')]=res[_0x4970('‫22')][_0x4970('‫23')][0x0][_0x4970('‫28')][_0x4970('‫29')];}else{try{if(_0x299174){if(_0xba7320[_0x4970('‫84')](_0xba7320[_0x4970('‫87')],_0xba7320[_0x4970('‫87')])){$[_0x4970('‫1e')](_0x299174);}else{Host=HostArr[Math[_0x4970('‮5e')](_0xba7320[_0x4970('‮88')](Math[_0x4970('‫5f')](),HostArr[_0x4970('‮60')]))];}}else{if(_0xba7320[_0x4970('‫89')]!==_0x4970('‮8a')){if(_0x5668ff){if(_0xba7320[_0x4970('‮8b')]!==_0x4970('‮8c')){_0x5668ff=JSON[_0x4970('‮1f')](_0x5668ff);if(_0xba7320[_0x4970('‫84')](_0x5668ff[_0x4970('‫46')],'0')){if(_0xba7320[_0x4970('‫84')](_0xba7320[_0x4970('‫8d')],_0xba7320[_0x4970('‫8d')])){$[_0x4970('‮47')]=_0x5668ff[_0x4970('‮47')];}else{_0x143b5d(_0x5668ff);}}}else{Host=HostArr[Math[_0x4970('‮5e')](Math[_0x4970('‫5f')]()*HostArr[_0x4970('‮60')])];}}else{$[_0x4970('‫1e')](_0xba7320[_0x4970('‫8e')]);}}else{$[_0x4970('‮47')]=_0x5668ff[_0x4970('‮47')];}}}catch(_0xc8d8cd){$[_0x4970('‫1e')](_0xc8d8cd);}finally{if(_0xba7320[_0x4970('‮8f')](_0xba7320[_0x4970('‮90')],_0xba7320[_0x4970('‫91')])){_0x143b5d();}else{console[_0x4970('‫1e')](error);}}}});});}function getSign(_0x4491ba,_0x3a8d25){var _0x43ebfa={'OvmVl':function(_0x55fe47,_0x5939eb){return _0x55fe47(_0x5939eb);},'SEhan':_0x4970('‮92'),'keQPY':function(_0x123312,_0x2d427a){return _0x123312===_0x2d427a;},'ZDVfx':_0x4970('‫93'),'zAnQD':_0x4970('‫50'),'lcLwl':_0x4970('‮94'),'bOJbV':_0x4970('‮95'),'PTmEl':function(_0x287de8,_0x20a5e3){return _0x287de8*_0x20a5e3;}};return new Promise(async _0x3821ee=>{var _0x1b7638={'NvEVP':function(_0x30f2e7,_0xcfb425){return _0x30f2e7+_0xcfb425;},'MjHzi':_0x4970('‫1a'),'qEbDX':function(_0x5adad3,_0x33f4de){return _0x43ebfa[_0x4970('‮96')](_0x5adad3,_0x33f4de);},'VcbGj':_0x4970('‫97'),'DJfIJ':function(_0x46792f,_0x56a2ba){return _0x46792f!==_0x56a2ba;},'yuQrm':_0x43ebfa[_0x4970('‫98')],'AlcAw':function(_0x1cbd6f,_0x54ee45){return _0x43ebfa[_0x4970('‫99')](_0x1cbd6f,_0x54ee45);},'ajbfT':_0x43ebfa[_0x4970('‫9a')]};let _0x51e87d={'functionId':_0x4491ba,'body':JSON[_0x4970('‫8')](_0x3a8d25),'activityId':$[_0x4970('‫29')]};let _0x30f23c='';let _0x5a82cf=[_0x43ebfa[_0x4970('‫9b')]];if(process[_0x4970('‮59')][_0x4970('‮5a')]){if(_0x43ebfa[_0x4970('‮9c')]!==_0x4970('‫9d')){_0x30f23c=process[_0x4970('‮59')][_0x4970('‮5a')];}else{_0x3821ee();}}else{_0x30f23c=_0x5a82cf[Math[_0x4970('‮5e')](Math[_0x4970('‫5f')]()*_0x5a82cf[_0x4970('‮60')])];}let _0x3f133d={'url':_0x4970('‮9e'),'body':JSON[_0x4970('‫8')](_0x51e87d),'headers':{'Host':_0x30f23c,'User-Agent':_0x43ebfa[_0x4970('‫9f')]},'timeout':_0x43ebfa[_0x4970('‫a0')](0x1e,0x3e8)};$[_0x4970('‮64')](_0x3f133d,(_0x41c5a9,_0x133ecf,_0x51e87d)=>{try{if(_0x4970('‮a1')===_0x1b7638[_0x4970('‫a2')]){res=JSON[_0x4970('‮1f')](_0x51e87d);if(res[_0x4970('‫20')]){console[_0x4970('‫1e')](_0x1b7638[_0x4970('‫a3')](_0x1b7638[_0x4970('‫a4')],res[_0x4970('‮30')]));$[_0x4970('‫31')]=res[_0x4970('‮30')];}}else{if(_0x41c5a9){console[_0x4970('‫1e')](''+JSON[_0x4970('‫8')](_0x41c5a9));console[_0x4970('‫1e')]($[_0x4970('‫2a')]+_0x4970('‮2b'));}else{}}}catch(_0x387619){if(_0x1b7638[_0x4970('‮a5')](_0x1b7638[_0x4970('‫a6')],_0x1b7638[_0x4970('‫a6')])){_0x1b7638[_0x4970('‮a7')](_0x3821ee,_0x51e87d);}else{$[_0x4970('‫3f')](_0x387619,_0x133ecf);}}finally{if(_0x1b7638[_0x4970('‮a8')](_0x1b7638[_0x4970('‫a9')],_0x1b7638[_0x4970('‫a9')])){_0x3821ee(_0x51e87d);}else{$[_0x4970('‫3f')](e,_0x133ecf);}}});});};_0xod0='jsjiami.com.v6';
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
