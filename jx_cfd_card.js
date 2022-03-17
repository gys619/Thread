//32 7-22 * * * m_jx_cfd_card.js
//问题反馈:https://t.me/Wall_E_Channel
const {Env} = require('./magic');
const $ = new Env('M财富岛加速');
$.logic = async function () {
    let {coincard, richcard} = await GetPropCardCenterInfo();
    await $.wait(5000, 8000)
    let ucs = coincard.filter(o => o.dwCardState === 2);
    let cc = $.randomArray(
        coincard.filter(o => o.dwCardNums > 0 && o.dwCardState !== 2), 1)[0];
    if (ucs.length === 0 && cc) {
        $.log('去使用', cc.strCardName)
        await UsePropCard(cc)
    } else {
        if (ucs[0]) {
            $.log(`正在使用`, ucs[0]?.strCardName)
        } else {
            $.log('你没有京币加速卡')
        }
    }
    await $.wait(5000, 8000)
    let rcs = richcard.filter(o => o.dwCardState === 2);
    let rc = $.randomArray(
        richcard.filter(o => o.dwCardNums > 0 && o.dwCardState !== 2), 1)[0];
    if (rcs.length === 0 && rc) {
        $.log('去使用', rc.strCardName)
        await UsePropCard(rc)
    } else {
        if (rcs[0]) {
            $.log(`正在使用`, rcs[0]?.strCardName)
        } else {
            $.log('你没有财富加成卡')
        }
    }
};
$.run({filename: __filename, wait: [2000, 3000], random: true}).catch(
    reason => console.log(reason));

async function GetPropCardCenterInfo() {
    let url = `https://m.jingxi.com/jxbfd/user/GetPropCardCenterInfo?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1637112026720&ptag=138631.135.2&_stk=_cfd_t%2CbizCode%2CdwEnv%2Cptag%2Csource%2CstrZone&_ste=1&h5st=20211117092026721%3B5590711643310161%3B10032%3Btk01we31b1d8130n4uXrOnCeapoup57PzCaRIqBPRiBh9ljkpyzI2ounYT3gSkpCoCujo6eFwmBf5e4BZzYC4RpGicPv%3Bb5df06fbd4f613994c30a2ea310e6cbf220895670d4da5a628e68f192b68d6d0&_=1637112026722&sceneval=2&g_login_type=1&callback=jsonpCBKEEE&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/fortune_island/index2.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.uuid()};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.iRet === 0) {
        return data?.cardInfo
    }
    return false;
}

/**
 * 道具卡使用
 *
 * jsonpCBKFFF({"ddwBalance":0,"ddwCardTargetTm":1637115652,"ddwCollect":0,"dwCardType":2,"dwIsChangeCardType":0,"iRet":0,"sErrMsg":""}
 )
 */
// noinspection DuplicatedCode
async function UsePropCard(card) {
    let url = `https://m.jingxi.com/jxbfd/user/UsePropCard?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=1637112052122&ptag=138631.135.2&dwCardType=${card.strCardTypeIndex.split(
        '_')[0]}&strCardTypeIndex=${encodeURIComponent(
        card.strCardTypeIndex)}&_stk=_cfd_t%2CbizCode%2CdwCardType%2CdwEnv%2Cptag%2Csource%2CstrCardTypeIndex%2CstrZone&_ste=1&h5st=20211117092052123%3B5590711643310161%3B10032%3Btk01we31b1d8130n4uXrOnCeapoup57PzCaRIqBPRiBh9ljkpyzI2ounYT3gSkpCoCujo6eFwmBf5e4BZzYC4RpGicPv%3B596f25b131a14c89ec1ebeaa171c9b53205d50d53f0fff4d772fe13e2342f303&_=1637112052126&sceneval=2&g_login_type=1&callback=jsonpCBKFFF&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/fortune_island/index2.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.uuid()};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.iRet === 0) {
        return data?.data
    }
    return false;
}
