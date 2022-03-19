//40,45 23 * * * m_jd_duobao.js
/*
[task_local]
京豆夺宝
40,45 23 * * * jd_duobao.js, tag=京豆夺宝, enabled=true
================Loon==============
[Script]
cron "40,45 23 * * *" script-path=jd_duobao.js,tag=京豆夺宝
*/
const {Env} = require('./utils/magic');
const $ = new Env('M京豆夺宝');
$.logic = async function () {
    let ex = await queryexpirejingdou();
    if (ex === 0) {
        $.log('你没有过期的京豆，退出')
        return;
    }
    let tk = await userToken()
    await $.wait(100, 200)
    let {lkToken} = await encryptPin()
    await $.wait(100, 200)
    await verifyDomain()
    await $.wait(100, 200)
    let {id, token} = await login(lkToken, tk);
    await $.wait(100, 200)
    let list = await dbList(id, token);
    let joins = await dbJoinProgressList(id, token);
    await $.wait(100, 200)
    for (const ele of list) {
        $.log('参与', ele.actTitle);
        if (joins.includes(ele._id)) {
            $.log(ele.actTitle, `你已经参与了夺宝`)
            continue;
        }
        await dbJoin(id, token, ele._id)
        await dbDetail(id, token, ele._id)
        await $.wait(5000, 8000)
        await finishTask(id, token, ele._id)
    }
    //看看中奖没
    if (await joinAwardedList(id, token)) {
        $.putMsg('你好像中奖了，自己去看看吧，我还没中过，不知道怎么过滤')
    }
};

$.run({wait: [2000, 3000]}).catch(
    reason => console.log(reason));

async function queryexpirejingdou() {
    let url = `https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=${Date.now()}&g_login_type=1&sceneval=2`
    let headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": "wq.jd.com",
        "Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
        'Cookie': $.cookie
    }
    let data = await $.get(url, headers);
    if (data.ret === 0) {
        return data?.expirejingdou[0]?.expireamount;
    }
    return 0;
}

async function finishTask(id, token, activeid) {
    let body = {"id": id, "token": token, "type": "share", "activeid": activeid}
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/finishTask`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.data;
    }
    return false;
}

async function joinAwardedList(id, token) {
    let body = {"id": id, "token": token}
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/joinAwardedList`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.result?.list?.length > 0;
    }
    return false;
}

async function dbDetail(id, token, activeid) {
    let body = {"id": id, "token": token, "activeid": activeid}
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/detail`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.data;
    }
    return false;
}

async function dbJoin(id, token, activeid) {
    let body = {"id": id, "token": token, "activeid": activeid}
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/join`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.data;
    }
    return false;
}

async function dbList(id, token) {
    let body = {
        "id": id,
        "token": token,
        "pageSize": 10,
        "page": 1,
        "status": "progress"
    }
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/list`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.result?.list?.filter(
            o => $.timestamp() < o.endTime && o.status === 'open');
    }
    return false;
}

async function dbJoinProgressList(id, token) {
    let body = {
        "id": id,
        "token": token,
        "pageSize": 10,
        "page": 1
    }
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/joinProgressList`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        let arr = [];
        for (let ele of data?.result?.list) {
            arr.push(ele._id)
        }
        return arr;
    }
    return false;
}

async function login(lkToken, token) {
    let body = {
        "refid": "zjd",
        "lkToken": lkToken,
        "token": token,
        "returnurl": "https://prodev.m.jd.com/mall/active/xiPStZsNkPxpQFXqVRuTv1QGr3x/index.html?showhead=no",
        "tttparams": "iX8N8eyJsbmciOiIiLCJnTGF0IjoiMzkuODc2NDcyIiwibGF0IjoiIiwiZ0xuZyI6IjExNi43MDM3MDUiLCJncHNfYXJlYSI6IjFfMF8wXzAiLCJ1bl9hcmVhIjoiMV8yODA5XzUxMjMwXzAifQ5==",
        "lng": "0.000000",
        "lat": "0.000000",
        // "sid": "b59edad20152c00f119fb614ed06cf7w",
        "un_area": "1_2809_51230_0",
        "showhead": "no",
        "inviterSource": ""
    }
    let headers = {
        'Origin': 'https://game-cdn.moxigame.cn',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Host': 'pf.moxigame.cn',
        'Referer': 'https://game-cdn.moxigame.cn/miniapp/jingdouduobao/index.html',
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://pf.moxigame.cn/jddb/duobao/login`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data
    }
    return false;
}

async function userToken(param = {}) {
    let body = '';
    let headers = {
        'Origin': 'https://prodev.m.jd.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://prodev.m.jd.com/mall/active/xiPStZsNkPxpQFXqVRuTv1QGr3x/index.html',
        'Host': 'jdjoy.jd.com',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br'
    }
    // noinspection DuplicatedCode
    headers['Cookie'] = $.cookie
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://jdjoy.jd.com/saas/framework/user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com`
    let data = await $.post(url, body, headers)
    if (data?.success === true) {
        return data?.data
    }
    return false;
}

async function encryptPin(param = {}) {
    let body = '';
    let headers = {
        'Origin': 'https://prodev.m.jd.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://prodev.m.jd.com/mall/active/xiPStZsNkPxpQFXqVRuTv1QGr3x/index.html',
        'Host': 'jdjoy.jd.com',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br'
    }
    // noinspection DuplicatedCode
    headers['Cookie'] = $.cookie
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79`
    let data = await $.post(url, body, headers)
    if (data?.success) {
        return data?.data
    }
    return false;
}

async function verifyDomain(param = {}) {
    let body = '';
    let headers = {
        'Origin': 'https://prodev.m.jd.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://prodev.m.jd.com/mall/active/xiPStZsNkPxpQFXqVRuTv1QGr3x/index.html',
        'Host': 'jdjoy.jd.com',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br'
    }

    // noinspection DuplicatedCode
    headers['Cookie'] = $.cookie
    headers['User-Agent'] = `jdapp;iPhone;10.2.0;14.4.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/0;appBuild/167853;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let url = `https://jdjoy.jd.com/saas/verify/domain?domain=game-cdn.moxigame.cn&appId=dafbe42d5bff9d82298e5230eb8c3f79`
    let data = await $.post(url, body, headers)
    if (data?.code === 0) {
        return data?.data
    }
    return false;
}


