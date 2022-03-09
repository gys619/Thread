let mode = __dirname.includes('magic')
//const {Env} = mode ? require('../magic') : require('./magic')
const {Env} = mode ? require('./function/magic') : require('./function/magic')
const $ = new Env('M集卡抽奖');
$.lz = 'LZ_TOKEN_KEY=lztokef1eb8494b0af868bd18bdaf8;LZ_TOKEN_VALUE=Aa5RE8RuY4X3zA==;';
$.activityUrl = process.env.M_WX_COLLECT_CARD_URL
    ? process.env.M_WX_COLLECT_CARD_URL
    : '';
if (mode) {
    $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxShopGift/activity?activityId=c7b4a4cc87c3439687c0c8554c89d84a&sid=073f36c2b24e46ac655895387ed0e8fw&un_area=1_2809_51230_0'
}
$.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(
    /https?:\/\/([^/]+)/)[1] || ''
$.activityUrl = $.activityUrl.replace("#", "&")
$.activityId = $.getQueryString($.activityUrl, 'activityId')
let stop = false;
let shopInfo = ''
$.logic = async function () {
    if (stop) {
        return;
    }
    if (!$.activityId || !$.activityUrl) {
        stop = true;
        $.putMsg(`activityId|activityUrl不存在`);
        return
    }
    $.log(`活动id: ${$.activityId}`, `活动url: ${$.activityUrl}`)
    $.UA = `jdapp;iPhone;10.2.2;13.1.2;${$.uuid()};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`

}

$.run({whitelist: [1, 2, 3, 4, 5]}).catch(
    reason => $.log(reason));