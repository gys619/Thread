//28 19 */3 * * m_jd_delete_coupon.js
//问题反馈:https://t.me/Wall_E_Channel
const {Env} = require('./magic');
const $ = new Env('M优惠券删除');
//1.支持删除自定义关键词 @符号分割 例如 棉拖@扫把@瓜子
let blacklist = process.env.COUPON_BLACKLIST
    ? process.env.COUPON_BLACKLIST.split('@') : '占位符无须理会'.split('@');
//2.不删除 全品@运费@话费@信用卡@云闪付@数字人民币@京东金融@仅可购买活动@限指定商品使用@仅可购买部分
let whitelist = process.env.COUPON_WHITELIST
    ? process.env.COUPON_WHITELIST.split('@') : '占位符无须理会'.split('@');
$.logic = async function () {
    //强制排除的类别 不要改这里 出问题不负责
    whitelist += '@全品@运费@话费@信用卡@云闪付@数字人民币@京东金融@仅可购买活动@限指定商品使用@仅可购买部分'
    whitelist = whitelist.split('@')
    $.log('黑名单:', JSON.stringify(blacklist))
    $.log('白名单：', JSON.stringify(whitelist))
    let list = await queryjdcouponlistwithfinance();
    $.log('删除前优惠券个数', list.length);
    let groupBy = $.groupBy(list, (o) => o.limitStr);
    a:for (let key in groupBy) {
        for (let i = 0; i < whitelist.length; i++) {
            let w = whitelist[i];
            if (w && key.includes(w)) {
                continue a;
            }
        }
        if (blacklist) {
            for (let i = 0; i < blacklist.length; i++) {
                let b = blacklist[i];
                if (b && key.includes(b)) {
                    for (const ele of groupBy[key]) {
                        await deletecoupon(ele, '黑名单1删除');
                    }
                    break;
                }
            }
        }
        let groupByTitle = $.groupBy(groupBy[key], (o) => o.couponTitle);
        for (let j in groupByTitle) {
            let element = groupByTitle[j];
            if (blacklist) {
                for (let i = 0; i < blacklist.length; i++) {
                    let b = blacklist[i];
                    if (b && j.includes(b)) {
                        for (const ele of element) {
                            await deletecoupon(ele, '黑名单2删除');
                        }
                    }
                }
            }
            if (element.length > 1) {
                let sort = element.sort((a, b) => b.end - a.end);
                for (let k = 1; k < sort.length; k++) {
                    await deletecoupon(sort[k], '重复删除');
                }
            }
        }
    }
    list = await queryjdcouponlistwithfinance();
    await $.wait(2000, 3000)
    for (let coupon of list) {
        let d = true;
        if (coupon.shopId * 1 > 1 && blacklist) {
            for (let i = 0; i < blacklist.length; i++) {
                let b = blacklist[i];
                if (b && coupon.shopName.includes(b)) {
                    await deletecoupon(coupon, `店铺名称删除[${b}]`);
                    d = false;
                }
            }

        }
        if (d && coupon.canBeShare) {//可分享的一般都是垃圾
            await deletecoupon(coupon, '可分享删除');
        }
    }
    list = await queryjdcouponlistwithfinance();
    $.log('删除后优惠券个数', list.length);
};
$.run({filename: __filename, wait: [2000, 3000], random: true}).catch(
    reason => $.log(reason));

async function deletecoupon(ele, tip) {
    if (ele.couponTitle !== '首购礼金') {
        $.log(tip || "删除", ele.limitStr, ele.couponTitle, ele.shopName);
        await deletecouponlistwithfinance(ele.couponid)
        await $.wait(4000, 6000)
    }
}

// noinspection DuplicatedCode
async function queryjdcouponlistwithfinance() {
    let headers = {
        'authority': 'wq.jd.com',
        "user-agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN',
        'accept': '*/*',
        'referer': 'https://wqs.jd.com/',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cookie': $.cookie
    }
    let url = `https://wxa.jd.com/wq.jd.com/activeapi/queryjdcouponlistwithfinance?state=1&wxadd=1&filterswitch=1&sceneval=2&g_login_type=1&g_ty=ls`
    let data = await $.get(url, headers)
    if (data?.errorCode === 0) {
        return data?.coupon?.useable
    }
    return false;
}

// noinspection DuplicatedCode
async function deletecouponlistwithfinance(couponId) {
    let headers = {
        'authority': 'wq.jd.com',
        "user-agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN',
        'accept': '*/*',
        'referer': 'https://wqs.jd.com/',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cookie': $.cookie
    }
    let url = `https://wq.jd.com/activeapi/deletecouponlistwithfinance?couponinfolist=${escape(
        `${couponId},1,0`)}&_=${Date.now()}&sceneval=2&g_login_type=1&callback=jsonpCBKC&g_ty=ls`

    let data = await $.get(url, headers)
    if (data?.errorCode === 0) {
        return data?.coupon?.useable
    }
    return false;
}