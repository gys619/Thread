//20 8 1 1 * jd_farm_automation.js
//二次修改by dylan
//https://github.com/11111129/jdpro.git
console.log('默认种植4级水果，如需调整请配置 M_JD_FARM_LEVEL\n使用率不高，建议手动运行，指定（用desi）需要领水果的账号运行\n')
const {Env} = require('./function/magic');
const $ = new Env('农场自动兑红包种水果');
let level = process.env.M_JD_FARM_LEVEL ? process.env.M_JD_FARM_LEVEL * 1 : 4
$.logic = async function () {
    let info = await api('initForFarm',{"version":11,"channel":3,"babelChannel":0});
    if (!info?.farmUserPro?.treeState) {
        $.log('可能还没开通农场')
    }
    if (info.farmUserPro.treeState === 1) return
    if (info.farmUserPro.treeState === 2) {
        await $.wait(1000, 3000)
        $.log(`${info.farmUserPro.name},种植时间：${$.formatDate(info.farmUserPro.createTime)}`);
        //成熟了
        let coupon = await api('gotCouponForFarm',{"version":11,"channel":3,"babelChannel":0});
        $.log(coupon)
        info = await api('initForFarm',{"version":11,"channel":3,"babelChannel":0});
    }
    if (info.farmUserPro.treeState !== 3) {return }
    let hongBao = info.myHongBaoInfo.hongBao;
    $.putMsg(`\n已兑换红包：${hongBao.discount}，有效期至：${$.formatDate(hongBao.endTime)}`)
    let element = info.farmLevelWinGoods[level][0];
    await $.wait(1000, 3000)
    info = await api('choiceGoodsForFarm',{"imageUrl":'',"nickName":'',"shareCode":'',"goodsType":element.type,"type":"0","version":11,"channel":3,"babelChannel":0});
    if (info.code*1 === 0) {
        $.putMsg(`\n再次种植【${info.farmUserPro.name}】成功`)
    }
    await api('gotStageAwardForFarm',{"type":"4","version":11,"channel":3,"babelChannel":0});
    await api('waterGoodForFarm',{"type":"","version":11,"channel":3,"babelChannel":0});
    await api('gotStageAwardForFarm',{"type":"1","version":11,"channel":3,"babelChannel":0});
};

$.run({
    whitelist: [1], blacklist: []
}).catch(reason => $.log(reason));

// noinspection DuplicatedCode
async function api(fn,body) {
    let url = `https://api.m.jd.com/client.action?functionId=${fn}&body=${JSON.stringify(body)}&client=apple&clientVersion=10.0.4&osVersion=13.7&appid=wh5&loginType=2&loginWQBiz=interact`
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓请求头↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    let headers = {
        "Cookie": $.cookie,
        "Connection": "keep-alive",
        "Accept": "*/*",
        "Host": "api.m.jd.com",
        'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN miniProgram`,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn"
    }
    let {data} = await $.request(url, headers)
    await $.wait(1000, 3000)
    return data;
}

