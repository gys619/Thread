//28 19 * * * m_jd_yfcoupon.js
const {Env} = require('./magic');
const $ = new Env('M运费券提醒');
let yfcoupon_days = process.env.YFCOUPON_DAYS ? process.env.YFCOUPON_DAYS * 1
    : 7 || 3
$.logic = async function () {
    let list = await queryjdcouponlistwithfinance();
    let groupBy = $.groupBy(list, (o) => o.limitStr);
    for (let key in groupBy) {
        if (key.includes('运费')) {
            let days = (new Date(groupBy[key][0].endTime * 1) - new Date())
                / (24 * 60 * 60 * 1000)
            let n = days.toFixed(0);
            if (n <= yfcoupon_days) {
                $.putMsg(`当前拥有${groupBy[key].length}张运费券, 距离过期还有${n}天`)
            } else {
                $.log(`不推送 当前拥有${groupBy[key].length}张运费券, 距离过期还有${n}天`)
            }
            break;
        }
    }
};
$.run({filename: __filename, wait: [2000, 3000], random: true}).catch(
    reason => $.log(reason));

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
