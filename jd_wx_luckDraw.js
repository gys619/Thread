let mode = __dirname.includes('/home/magic/Work/wools/magic/raw')
const {Env} = mode ? require('../magic') : require('./magic')
const $ = new Env('M幸运抽奖');
$.lz = 'LZ_TOKEN_KEY=lztokef1eb8494b0af868bd18bdaf8;LZ_TOKEN_VALUE=Aa5RE8RuY4X3zA==;';
$.activityUrl = process.env.M_WX_LUCK_DRAW_URL ? process.env.M_WX_LUCK_DRAW_URL
    : '';
if (mode) {
    $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxDrawActivity/activity?activityId=3df02d007f4a474986d048036ef643e2'
}
let stop = false;
$.s = 1
$.logic = async function () {
    if (stop) {
        return;
    }
    $.activityUrl = $.activityUrl.replace("#","&")
    $.activityId = $.getQueryString($.activityUrl, 'activityId')
    if (!$.activityId || !$.activityUrl) {
        $.log(`活动id不存在`);
        return
    }
    $.log(`活动id: ${$.activityId}`, `活动url: ${$.activityUrl}`)
    $.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(
        /https?:\/\/([^/]+)/)[1] || ''
    $.UA = `jdapp;iPhone;10.2.2;13.1.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let lzToken = await getLzToken()
    debugger
    if (typeof lzToken.data == 'string') {
        if (lzToken.data.match(/(活动已经结束)/)
            && lzToken.data.match(
                /(活动已经结束)/)[1]
            || '') {
            $.putMsg('活动已结束');
        } else {
            console.log(lzToken);
        }
        stop = true;
        return
    }
    $.domain.includes('lzkj-isv.isvjcloud.com') ? await api(
        'wxCommonInfo/initActInfo', `activityId=${$.activityId}`) : ''
    let token = await getToken();
    if (token.code !== '0') {
        $.putMsg(`获取Token失败`);
        return
    }
    $.Token = token?.token
    let actInfo = await api('customer/getSimpleActInfoVo',
        `activityId=${$.activityId}`);
    if (!actInfo.result || !actInfo.data) {
        $.log(`获取活动信息失败`);
        return
    }
    $.jdActivityId = actInfo.data.jdActivityId;
    $.venderId = actInfo.data.venderId;
    $.shopId = actInfo.data.shopId;
    $.activityType = actInfo.data.activityType;
    let myPing = await api('customer/getMyPing',
        `userId=${$.venderId}&token=${$.Token}&fromType=APP`)
    if (!myPing.result) {
        $.putMsg(`获取pin失败`);
        return
    }
    $.Pin = myPing.data.secretPin;

    let shopInfo = await api('wxDrawActivity/shopInfo',
        `activityId=${$.activityId}`, true);
    if (!shopInfo.result) {
        $.putMsg('获取不到店铺信息,结束运行')
        return

    }
    $.userId = shopInfo?.data?.userId
    $.shopName = shopInfo?.data?.shopName
    await api('common/accessLogWithAD',
        `venderId=${$.venderId}&code=${$.activityType}&pin=${encodeURIComponent(
            $.Pin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=`);
    let activityContent = await api(
        'wxDrawActivity/activityContent',
        `activityId=${$.activityId}&pin=${encodeURIComponent(
            $.Pin)}`, true);
    if (!activityContent.result) {
        $.putMsg('获取不到活动信息,结束运行')
        return
    }

    $.hasFollow = activityContent.data.hasFollow || ''
    $.needFollow = activityContent.data.needFollow || false
    $.canDrawTimes = activityContent.data.canDrawTimes || 0
    $.content = activityContent.data.content || []
    $.drawConsume = activityContent.data.drawConsume || 0
    $.startTime = activityContent.data.startTime || 0
    $.endTime = activityContent.data.endTime || 0
    if ($.startTime > 0 && $.startTime > $.timestamp()) {
        $.putMsg(`抽奖活动开始时间${$.formatDate($.startTime, 'yyyy-MM-dd HH:mm:ss')}`)
        stop = true;
        return;
    }
    if ($.endTime !== 0 && ($.timestamp() > $.endTime)) {
        $.putMsg(`活动已结束于${$.formatDate($.endTime, 'yyyy-MM-dd HH:mm:ss')}`)
        stop = true;
        return;
    }
    $.log(
        `抽奖次数 ${$.canDrawTimes} ${$.drawConsume > 0 && $.drawConsume + "积分抽奖一次"
        || ''}`)
    if ($.canDrawTimes === 0) {
        return
    }
    $.log(`可抽奖次数:${$.canDrawTimes}`)
    if ($.needFollow && !$.hasFollow) {
        let fallow = await api($.domain.includes('cjhy-isv.isvjcloud.com')
                ? '/wxActionCommon/newFollowShop'
                : '/wxActionCommon/followShop',
            $.domain.includes('cjhy-isv.isvjcloud.com')
                ? `venderId=${$.userId}&activityId=${$.activityId}&buyerPin=${encodeURIComponent(
                    encodeURIComponent($.Pin))}&activityType=${$.activityType}`
                : `userId=${$.userId}&activityId=${$.activityId}&buyerNick=${encodeURIComponent(
                    $.Pin)}&activityType=${$.activityType}`);
        if (fallow.result) {
            $.log('关注成功')
        } else {
            $.log(JSON.stringify(fallow));
        }
        await $.wait(2000);
    }
    for (let m = 1; $.canDrawTimes--; m++) {
        let prize = await api('/wxDrawActivity/start',
            $.domain.includes('cjhy-isv.isvjcloud.com')
                ? `activityId=${$.activityId}&pin=${encodeURIComponent(
                    encodeURIComponent($.Pin))}`
                : `activityId=${$.activityId}&pin=${encodeURIComponent(
                    $.Pin)}`);
        if (prize.result && prize.data.drawOk) {
            $.canDrawTimes = prize.data.canDrawTimes
            $.putMsg(`获得 ${prize.data.name}`);
        } else {
            $.putMsg(`${prize.errorMessage}`);
            break
        }
        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
        if (Number($.canDrawTimes) <= 0 || m >= 5) {
            break
        }
    }
}
$.after = async function () {
    if ($.msg.length > 0) {
        let message = `${$.shopName}奖品\n`;
        for (let ele of $.content) {
            if (ele.name.includes('谢谢') || ele.name.includes('再来')) {
                continue;
            }
            message += `    ${ele.name}\n`
        }
        $.msg.push(message)
        $.msg.push($.activityUrl);
    }
}
$.run({filename: __filename}).catch(
    reason => $.log(reason));

async function api(fn, body, isv) {
    let url = `https://${$.domain}/${fn}`
    let ck = $.lz + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "")
    ck = isv ? `IsvToken=${$.Token};` + ck : ck;
    let headers = {
        "Host": $.domain,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": `https://${$.domain}`,
        "Cookie": ck,
        "Referer": `${$.activityUrl}`,
        "User-Agent": $.UA
    }
    let {data} = await $.request(url, headers, body)
    // $.log(fn, typeof data === 'string' ? '' : JSON.stringify(data))
    await $.wait(200, 300)
    return data;
}

async function getToken() {
    let url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`
    let body = ''
    switch ($.domain) {
        case 'cjhy-isv.isvjcloud.com':
            body = 'body=%7B%22url%22%3A%22https%3A//cjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=920cd9b12a1e621d91ca2c066f6348bb5d4b586b&client=apple&clientVersion=10.1.4&st=1633916729623&sv=102&sign=9eee1d69b69daf9e66659a049ffe075b'
            break
        case 'lzkj-isv.isvjcloud.com':
            body = 'body=%7B%22url%22%3A%22https%3A//lzkj-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=925ce6441339525429252488722251fff6b10499&client=apple&clientVersion=10.1.4&st=1633777078141&sv=111&sign=00ed6b6f929625c69f367f1a0e5ad7c7'
            break
        case 'cjhydz-isv.isvjcloud.com':
            body = 'adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2'
            break
        default:
            body = '';
    }
    let headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "api.m.jd.com",
        "Cookie": $.cookie,
        "User-Agent": $.UA,
    }
    let {data} = await $.request(url, headers, body)
    return data;
}

async function getLzToken() {
    let url = $.activityUrl.includes('cjhy-isv.isvjcloud.com')
        ? `https://${$.domain}/wxDrawActivity/activity?activityId=${$.activityId}`
        : `https://${$.domain}/wxCommonInfo/token`
    let headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': $.UA,
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    let {data} = await $.request(url, headers)
    return data;
}

async function getshopactivityId(venderId) {
    let url = `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${venderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`;
    let headers = {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Referer': `https://shopmember.m.jd.com/shopcard/?venderId=${venderId}&shopId=${venderId}&venderType=5&channel=401`,
        'Cookie': $.cookie
    }
    let data = await $.get(url, headers);
    if (data.success) {
        $.shopactivityId = data.result.interestsRuleList
            && data.result.interestsRuleList[0]
            && data.result.interestsRuleList[0].interestsInfo
            && data.result.interestsRuleList[0].interestsInfo.activityId || ''
    }
}

async function join(venderId) {
    $.shopactivityId = ''
    await $.wait(2000)
    await getshopactivityId(venderId)
    let req = ruhui(`${venderId}`);
    let data = await $.get(req.url, req.headers);
    if (data.success) {
        if (data.result && data.result.giftInfo) {
            for (let i of data.result.giftInfo.giftList) {
                $.log(
                    `入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
            }
        }
    } else if (data.message) {
        $.log(`${data.message || ''}`)
    } else {
        $.log(data)
    }
}

function ruhui(functionId) {
    let activityId = ``
    if ($.shopactivityId) {
        activityId = `,"activityId":${$.shopactivityId}`
    }
    return {
        url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${functionId}","shopId":"${functionId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888`,
        headers: {
            'Content-Type': 'text/plain; Charset=UTF-8',
            'Origin': 'https://api.m.jd.com',
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'User-Agent': $.UA,
            'content-type': 'application/x-www-form-urlencoded',
            'Referer': `https://shopmember.m.jd.com/shopcard/?venderId=${functionId}&shopId=${functionId}&venderType=5&channel=401`,
            'Cookie': $.cookie
        }
    }
}

function taskPostUrl(url, body) {
    let Referer = activityUrl.includes('cjhy-isv.isvjcloud.com')
        ? `${activityUrl}/wxDrawActivity/activity?activityId=${activityId}`
        : `${activityUrl}/lzclient/${activityId}/cjwx/common/entry.html?activityId=${activityId}`
    return {
        url: `${activityUrl}${url}`,
        body: body,
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": Referer,
            "Cookie": $.lz + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""),
            "User-Agent": $.UA,
        }
    }
}

