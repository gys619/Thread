let common = require("./function/common");
let $ = new common.env('京东沸腾之夜助力');
let min = 3,
    help = $.config[$.filename(__filename)] || Math.min(min, $.config.JdMain) || min
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com/babelDiy/Zeus/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html',
    }
});
$.readme = `
0 0 * * * task ${$.runfile}
exprot ${$.runfile}=2  # 如需修改被助力账号个数,请自行修改环境变量
`
eval(common.eval.mainEval($));
async function prepare() {
    for (let i of cookies['help']) {
        let s = await $.curl({
            'url': `https://api.m.jd.com/client.action?advId=party1031_init`,
            'form': `functionId=party1031_init&body={}&client=wh5&clientVersion=1.0.0&appid=o2_act&uuid=cf7d66dca8a794007c133227f504a8e2aff131e7`,
            cookie: i
        },'s')
        try {
            $.sharecode.push($.compact($.s.data.result, ['inviteCode']))
        } catch (e) {}
    }
}
async function main(p) {
    let cookie = p.cookie
    await $.curl({
        'url': `https://api.m.jd.com/client.action?advId=party1031_assist`,
        'form': `functionId=party1031_assist&client=wh5&clientVersion=1.0.0&appid=o2_act&_stk=appid,body,client,clientVersion,functionId&_ste=1&h5st=&body={"inviteCode":"${p.inviteCode}"}&uuid=cf7d66dca8a794007c133227f504a8e2aff131e7`,
        cookie
    },'s')
    console.log($.s.data);
}
