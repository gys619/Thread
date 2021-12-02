//59 19 11-30 11 * m_jx_mc_zn_exchange.js
//问题反馈:https://t.me/Wall_E_Channel
const {Env} = require('./magic');
const $ = new Env('M牧场助农兑换');
$.logic = async function () {
    let {goodslist} = await GetLoveGoodsList();
    //红包商品
    let items = $.randomArray(goodslist.filter(o => o.neednum === 0), 3)
    await $.countdown();
    for (let i = 0; i < items.length; i++) {
        if (!await LoveExchange(items[i].token)) {
            break;
        }
        await $.wait(1000)
    }
}
$.run({filename: __filename}).catch(
    reason => console.log(reason));

/**
 * 助农列表
 *
 * jsonpCBKH({"data":{"goodslist":[{"apponly":false,"bingolevel":2,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"","nomial":"","nostock":0,"price":0,"prizepool":"jxmc_2110hbzn0050","prizevalue":0,"showtype":false,"skuid":"","token":"0834f22ecdfcb2a089d32e5dcee3445c","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、甘肃、宁夏、青海、内蒙古、海南、吉林、辽宁、黑龙江、湖南、河北、四川、陕西、贵州、北京、云南、河南、湖北、河北","nomial":"无","nostock":0,"price":690,"prizepool":"jxzn_FLmiju2111","prizevalue":0,"showtype":true,"skuid":"10038952016713","token":"256b24f7e5f1cf0e15f7c3d3a61c45df","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、青海、云南及疫情地区","nomial":"无","nostock":0,"price":990,"prizepool":"jxzn_FLbeibeing2110","prizevalue":0,"showtype":true,"skuid":"10038619025045","token":"2fbdd03368eca18b90002c9440db83ad","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"山东、上海、重庆、黑龙江、甘肃、河北、贵州、海南、北京、陕西、河南、湖北、湖南、云南、山西、江苏、海南、新疆、西藏、内蒙古、宁夏、青海、港澳台疫情地区","nomial":"无","nostock":0,"price":500,"prizepool":"jxzn_FLyutou2110","prizevalue":0,"showtype":true,"skuid":"10038619323117","token":"335df1acd5796027a507aefc5da406f0","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"贵州、河北、北京、山东、黑龙江、新疆、西藏、甘肃、青海、宁夏、内蒙古","nomial":"无","nostock":0,"price":990,"prizepool":"jxzn_FLyiner2110","prizevalue":0,"showtype":true,"skuid":"10038635904253","token":"3d6e69cd02d6cf910280e8a02eda4cc2","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"山东、上海、重庆、黑龙江、甘肃、河北、贵州、湖南、北京、陕西、河南、湖北、云南、山西、江苏、海南、新疆、西藏、内蒙古、宁夏、青海、港澳台","nomial":"无","nostock":0,"price":500,"prizepool":"jxzn_FLtudou2110","prizevalue":0,"showtype":true,"skuid":"10038617942345","token":"3f6648a3833975c44309d2815a5e7cc8","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、青海、内蒙古、宁夏、甘肃、海南、黑龙江、吉林、辽宁及疫情管控区","nomial":"无","nostock":0,"price":820,"prizepool":"jxzn_FL8mjidan2111","prizevalue":0,"showtype":true,"skuid":"10024753307299","token":"6ae8243fa7e9150d2cbe6f22d168858b","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、甘肃、宁夏、青海、内蒙古、海南、吉林、辽宁、黑龙江、湖南、河北、四川、陕西、贵州、北京、云南、河南、湖北、河北","nomial":"无","nostock":0,"price":950,"prizepool":"jxzn_FLgdcheng2111","prizevalue":0,"showtype":true,"skuid":"10038378703514","token":"73c8f4e611d6bd0e4490bb7100446134","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"河北、湖南、上海、重庆、河北、广东、江苏、四川、陕西、安徽、浙江、山东、新疆、西藏、青海、海南、贵州、云南、甘肃、宁夏、北京、内蒙、东三省、福建等疫区管控地区","nomial":"无","nostock":0,"price":2290,"prizepool":"jxzn_FL30mjidan2111","prizevalue":0,"showtype":true,"skuid":"10033818891191","token":"899ac930fe1d896301c4649c3467c72f","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、海南、内蒙古、宁夏、青海、甘肃及疫情地区","nomial":"无","nostock":0,"price":1090,"prizepool":"jxzn_FLmihoutao2110","prizevalue":0,"showtype":true,"skuid":"10038619540878","token":"a732ed3a5c9d1d3ab72f24c4a3687fa3","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、青海、云南及疫情地区","nomial":"无","nostock":0,"price":990,"prizepool":"jxzn_FLhamigua2110","prizevalue":0,"showtype":true,"skuid":"10038618482052","token":"c74e05c31e20bab45707e06b395f3ac0","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"","nomial":"","nostock":0,"price":0,"prizepool":"jxmc_2110hbzn0050","prizevalue":0,"showtype":false,"skuid":"","token":"c933f26e7f6dcbc31eb5d03809d0d2aa","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、海南、内蒙古、宁夏、青海及疫情地区","nomial":"无","nostock":0,"price":690,"prizepool":"jxzn_FLdajiang2111","prizevalue":0,"showtype":true,"skuid":"10039360334391","token":"e4513db5ad7aec932d61871da8d409ae","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"黑龙江、甘肃、河北、贵州、湖南、北京、云南、新疆、西藏、青海、内蒙古","nomial":"无","nostock":0,"price":690,"prizepool":"jxzn_FLtangshanli2110","prizevalue":0,"showtype":true,"skuid":"10034971277327","token":"eb50985aee90f16ca548bfa6bc31e8ae","zhunongflag":1},{"apponly":false,"bingolevel":3,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"","nomial":"","nostock":0,"price":0,"prizepool":"jxmc_2110hbzn0050","prizevalue":0,"showtype":false,"skuid":"","token":"ed6587ba74167e3e4807b6ec12618efa","zhunongflag":1},{"apponly":false,"bingolevel":1,"neednum":0,"newguide":false,"newuserflag":false,"nodeliver":"新疆、西藏、海南、青海、内蒙、港澳台及海外、宁夏银川、山东、黑龙江、甘肃省、河北省、贵州省、湖南、北京、陕西、河南、湖北、云南、山西、东北三省","nomial":"无","nostock":0,"price":900,"prizepool":"jxzn_FLshanyao2110","prizevalue":0,"showtype":true,"skuid":"10038620266645","token":"f7cfd7a663a8510ae318e00efb75929e","zhunongflag":1}]},"message":"成功","ret":0}
 )
 */
// noinspection DuplicatedCode
async function GetLoveGoodsList() {
    let url = `https://m.jingxi.com/jxmc/queryservice/GetLoveGoodsList?channel=7&sceneid=1001&activeid=jxmc_active_0001&activekey=null&jxmc_jstoken=d553d2ccd27c2dadee3221fd88365e25&timestamp=1636520670139&phoneid=49c2325a8c0c182ad094eb2893799f8003ca57f6&_stk=activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp&_ste=1&h5st=20211110130431654%3B5590711643310161%3B10028%3Btk01wcce11c3230niZbuhwQQ%2FWbwErnPZexlw%2FqX0PIqECZbS%2Bl0TvYcCGl8zk5OOuaZzlAFWRHJ05L2ce01yzBE%2Ft2q%3B4da71d9c3778f1ae6c2633198b6e3fc196c5d09a384f7b3644db0e45bab8668e&_=1636520671655&sceneval=2&g_login_type=1&callback=jsonpCBKH&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/pingou/jxmc/index.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.randomString(
        40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.ret === 0) {
        return data?.data
    }
    return false;
}

/**
 * 兑换
 *
 * jsonpCBKJ({"data":{},"message":"抱歉，兑换活动未开始","ret":2916}
 )
 */
// noinspection DuplicatedCode
async function LoveExchange(token) {
    let url = `https://m.jingxi.com/jxmc/operservice/LoveExchange?channel=7&sceneid=1001&activeid=jxmc_active_0001&activekey=null&type=11&token=${token}&jxmc_jstoken=fc751eac2189b34dd13f1bfa8ed4304f&timestamp=1636520682485&phoneid=49c2325a8c0c182ad094eb2893799f8003ca57f6&_stk=activeid%2Cactivekey%2Cchannel%2Cjxmc_jstoken%2Cphoneid%2Csceneid%2Ctimestamp%2Ctoken%2Ctype&_ste=1&h5st=20211110130442490%3B5590711643310161%3B10028%3Btk01wcce11c3230niZbuhwQQ%2FWbwErnPZexlw%2FqX0PIqECZbS%2Bl0TvYcCGl8zk5OOuaZzlAFWRHJ05L2ce01yzBE%2Ft2q%3Ba135c3dc215708ede7424f2482394d8847341a0b2781ae7825a6623d18be55d9&_=1636520682492&sceneval=2&g_login_type=1&callback=jsonpCBKJ&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/pingou/jxmc/index.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.randomString(
        40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.ret === 0) {
        $.putMsg(data)
        return true;
    } else if (data?.message.includes("火爆") || data?.message.includes(
        "还没到兑换时间")) {
        $.log('火爆或时间还没到')
        return false;
    }
    return true;
}