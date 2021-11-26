let common = require("./function/common");
let $ = new common.env('京东7天内过期京豆兑换喜豆');
let min = 5,
    help = $.config[$.filename(__filename)] || Math.min(min, $.config.JdMain) || min;
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com/babelDiy/Zeus/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html',
    }
});
eval(common.eval.mainEval($));
async function prepare() {}
async function main(id) {
    await $.curl({
        'url': 'https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=1637926089761&g_login_type=0&callback=jsonpCBKC&g_tk=353098972&g_ty=ls&sceneval=2&g_login_type=1',
        cookie: id.cookie
    })
    let sum = 0
    for (let i of $.source?.expirejingdou || []) {
        sum += i.expireamount
    }

    if (sum) {
        await $.curl({
            'url': `https://m.jingxi.com/deal/mactionv3/jd2xd?use=${sum}&pingouchannel=1&bizkey=pingou&g_ty=ls&sceneval=2&g_login_type=1`,
            'cookie': id.cookie
        })
        console.log($.source.errMsg || `成功兑换 ${sum}个喜豆`)
    } else {
        console.log("最近7天没有过期京豆")
    }
}
