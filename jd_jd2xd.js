//50,55 23 * * * m_jd_jd2xd.js
//抄AK大佬的
//如果有过期京豆,将以100的整数倍兑换
//问题反馈:https://t.me/Wall_E_Channel
const {Env} = require('./magic');
const $ = new Env('M京豆转喜豆');
$.logic = async function () {
    let headers = {
        'content-type': 'application/json',
        'user-agent': `jdapp;iPhone;9.4.6;14.2;${$.uuid(
            40)};network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
        'referer': 'https://happy.m.jd.com/babelDiy/Zeus/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html'
    }
    headers['Cookie'] = $.cookie
    let ex = await $.get(
        `https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=${$.timestamp()}&g_login_type=0&callback=jsonpCBKC&g_tk=353098972&g_ty=ls&sceneval=2&g_login_type=1`,
        headers);
    let sum = 0
    for (let e of ex?.expirejingdou || []) {
        sum += e.expireamount
    }
    sum = Math.ceil(sum / 100) * 100
    if (sum) {
        $.log(`将要转换${sum}喜豆`)
        let url = `https://m.jingxi.com/deal/mactionv3/jd2xd?use=${sum}&pingouchannel=1&bizkey=pingou&g_ty=ls&sceneval=2&g_login_type=1`
        await $.get(url, headers)
        $.putMsg('京豆转喜豆', sum)
    } else {
        $.log(`没有过期京豆`)
    }
};
$.run({filename: __filename, wait: [2000, 3000]}).catch(
    reason => console.log(reason));

