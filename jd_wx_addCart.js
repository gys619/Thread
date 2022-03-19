let mode = __dirname.includes('magic')
const {Env} = mode ? require('../magic') : require('./magic')
const $ = new Env('M加购有礼');
$.lz = 'LZ_TOKEN_KEY=lztokef1eb8494b0af868bd18bdaf8;LZ_TOKEN_VALUE=Aa5RE8RuY4X3zA==;';
$.activityUrl = process.env.M_WX_ADD_CART_URL
    ? process.env.M_WX_ADD_CART_URL
    : '';
if (mode) {
    // $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/12945e62d4334a6a9fd76253941d7c08?activityId=12945e62d4334a6a9fd76253941d7c08'
    // $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/2f3c55901805489ab47b7cb657ce7a7f?activityId=2f3c55901805489ab47b7cb657ce7a7f'
    $.activityUrl = 'https://cjhy-isv.isvjcloud.com/wxCollectionActivity/activity?activityId=d138c19abad74f3391ae862d089ab667'
    //一键加购
    $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/c3058177366745e08a7884382290b344?activityId=c3058177366745e08a7884382290b344'
}

$.s = 1
if ($.activityUrl.includes('activityId') > -1) {
    $.activityId = $.activityUrl.match(/activityId=([^&]+)/)
        && $.activityUrl.match(
            /activityId=([^&]+)/)[1] || ''
}
$.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(
    /https?:\/\/([^/]+)/)[1] || ''
let stop = false;
$.shopName = '';
$.shareMpTitle = '';
$.logic = async function () {
    if (stop) {
        return;
    }
    $.activityUrl = $.activityUrl.replace("#","&")
    if (!$.activityId || !$.activityUrl) {
        stop = true;
        $.log(`活动不存在`);
        return
    }
    $.log(`活动地址: ${$.activityUrl}`)
    $.UA = `jdapp;iPhone;10.2.2;13.1.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
    let lzToken = await getLzToken();
    if (typeof lzToken.data == 'string') {
        if (lzToken.data.match(/(活动已经结束)/) && lzToken.data.match(/(活动已经结束)/)[1]
            || '') {
            $.putMsg('活动已结束');
            stop = true
            return
        }
    }
    let token = await getToken();
    if (token.code !== '0') {
        $.putMsg(`获取Token失败`);
        return
    }
    $.Token = token?.token
    let actInfo = await api('customer/getSimpleActInfoVo',
        `activityId=${$.activityId}`);
    if (!actInfo.result) {
        $.putMsg(`获取活动信息失败`);
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
    await api('common/accessLogWithAD',
        `venderId=${$.venderId}&code=${$.activityType}&pin=${encodeURIComponent(
            $.Pin)}&activityId=${$.activityId}&pageUrl=${$.activityUrl}&subType=app&adSource=`);
    let activityContent = await api('wxCollectionActivity/activityContent',
        `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`);
    if (!activityContent.result) {
        $.putMsg('获取不到活动信息,结束运行')
        stop = true;
        return
    }
    let content = activityContent.data;
    delete content.rule
    if (!content.drawInfo.name.includes('京豆')) {
        $.log('不是京豆,不再跑脚本')
        stop = true;
        return;
    }
    let shopInfo = await api('wxCollectionActivity/shopInfo',
        `activityId=${$.activityId}`)
    if (shopInfo.result) {
        $.shopName = shopInfo.data.shopName;
        $.log('shopInfo', shopInfo.data.sid, shopInfo.data.shopName);
    }
    await api('wxCommonInfo/getActMemberInfo',
        `venderId=${$.venderId}&activityId=${$.activityId}&pin=${$.Pin}`)
    await api('wxActionCommon/getUserInfo', `pin=${$.Pin}`)
    let info = await api(
        `miniProgramShareInfo/getInfo?activityId=${$.activityId}`);
    if (content.needFollow && !content.hasFollow) {
        await api(`wxActionCommon/followShop`,
            `userId=${$.venderId}&activityId=${$.activityId}&buyerNick=${encodeURIComponent(
                $.Pin)}&activityType=${$.activityType}`)
        await $.wait(350, 700)
    }
    let needCollectionSize = content.needCollectionSize;
    let hasCollectionSize = content.hasCollectionSize;
    let oneKeyAddCart = content.oneKeyAddCart * 1 === 1;
    if (hasCollectionSize >= needCollectionSize) {
        $.putMsg('已经加购过了')
        return
    }
    //$.log(`needCollectionSize:${needCollectionSize} needFollow:${needFollow}`, );
    $.log('drawInfo', JSON.stringify(content.drawInfo));
    let productIds = [];
    for (let cpvo of $.randomArray(content.cpvos)) {
        if (oneKeyAddCart) {
            productIds.push(cpvo.skuId)
            continue
        }
        try {
            let carInfo = await api('wxCollectionActivity/addCart',
                `activityId=${$.activityId}&pin=${encodeURIComponent(
                    $.Pin)}&productId=${cpvo.skuId}`)
            if (carInfo.result) {
                if (carInfo.data.hasAddCartSize >= needCollectionSize) {
                    $.log(`加购完成，本次加购${carInfo.data.hasAddCartSize}个商品`)
                    break;
                }
            } else {
                $.log(carInfo)
                break
            }
            await $.wait(1500, 1800)
        } catch (e) {
        }
    }
    if (oneKeyAddCart) {
        let carInfo = await api('wxCollectionActivity/oneKeyAddCart',
            `activityId=${$.activityId}&pin=${encodeURIComponent(
                $.Pin)}&productIds=${encodeURIComponent(JSON.stringify(productIds))}`)
        if (carInfo.data.hasAddCartSize >= needCollectionSize) {
            $.log(`加购完成，本次加购${carInfo.data.hasAddCartSize}个商品`)
        } else {
            console.log(JSON.stringify(carInfo))
            return
        }
    }
    let prize = await api('wxCollectionActivity/getPrize',
        `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`);
    if (prize.result && prize.data.drawOk) {
        $.putMsg(`获得 ${prize.data.name}`);
    } else {
        $.putMsg(`${prize.errorMessage}`);
    }
}
$.after = async function () {
    if ($.msg.length === 0) {
        return
    }
    $.msg.push(`\n${$.shopName}\n${$.shareMpTitle}\n`);
    $.msg.push($.activityUrl)
}
$.run({filename: __filename}).catch(
    reason => $.log(reason));

async function api(fn, body) {
    let url = `https://${$.domain}/${fn}`
    let headers = {
        "Host": $.domain,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": `https://${$.domain}`,
        "Cookie": $.lz + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""),
        "Referer": `${$.activityUrl}&sid=&un_area=1_2809_51230_0`,
        "User-Agent": $.UA,
    }
    let {data} = await $.request(url, headers, body)
    $.log(fn, typeof data === 'string' ? '' : JSON.stringify(data))
    await $.wait(300, 500)
    return data;
}

async function getToken() {
    let url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`
    let body = $.activityUrl.includes('cjhy-isv.isvjcloud.com')
        ? 'body=%7B%22url%22%3A%22https%3A//cjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=920cd9b12a1e621d91ca2c066f6348bb5d4b586b&client=apple&clientVersion=10.1.4&st=1633916729623&sv=102&sign=9eee1d69b69daf9e66659a049ffe075b'
        : 'body=%7B%22url%22%3A%22https%3A//lzkj-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=925ce6441339525429252488722251fff6b10499&client=apple&clientVersion=10.1.4&st=1633777078141&sv=111&sign=00ed6b6f929625c69f367f1a0e5ad7c7'
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
    let headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': $.UA,
        'Accept-Language': 'zh-cn',
        'Cookie': ''
    }
    let {data} = await $.request($.activityUrl, headers)
    return data;
}

