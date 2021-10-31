let common = require("./function/common");
let $ = new common.env('京东超级盒子');
let min = 10,
    help = $.config[$.filename(__filename)] || Math.min(min, $.config.JdMain) || min;
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com/babelDiy/Zeus/3ugedFa7yA6NhxLN5gw2L3PF9sQC/index.html',
    }
});
$.readme = `
12 0 * * * task ${$.runfile}
`
eval(common.eval.mainEval($));
async function prepare() {
    $.linkId = 'DQFdr1ttvWWzn0wsQ7JDZQ'
}
async function main(p) {
    let cookie = p.cookie
    await $.curl({
        'url': `https://api.m.jd.com/?functionId=superboxSupBoxHomePage&body={"taskId":"332","linkId":"${$.linkId}","encryptPin":""}&_t=1635586254297&appid=activities_platform`,
        // 'form':``,
        cookie
    }, 'u')
    let pin = $.u.data.encryptPin;
    // 助力
    await $.curl({
        'url': `https://api.m.jd.com/?functionId=superboxSupBoxHomePage&body={"taskId":"332","linkId":"${$.linkId}","encryptPin":"${pin}"}&_t=1635586254297&appid=activities_platform`,
        // 'form':``,
        cookie: taskCookie[p.index] || taskCookie[0]
    })
    await $.curl({
        url: `https://api.m.jd.com/?functionId=apTaskList&body={\"linkId\":\"${$.linkId}\",\"encryptPin\":\"\"}&_t=1635133026504&appid=activities_platform`,
        cookie
    }, 's')
    for (let i of $.s.data) {
        if (i.taskLimitTimes > 1 && i.taskLimitTimes != i.taskDoTimes) {
            await $.curl({
                'url': `https://api.m.jd.com/?functionId=apTaskDetail&body={"taskId":${i.id},"taskType":"BROWSE_SHOP","channel":4,"linkId":"${$.linkId}","encryptPin":""}&_t=1635133141666&appid=activities_platform`,
                cookie
            }, 'ss')
            for (let j of $.ss.data.taskItemList) {
                await $.curl({
                    'url': 'https://api.m.jd.com/',
                    'form': `functionId=apDoTask&body={"taskId":${i.id},"taskType":"BROWSE_SHOP","channel":4,"itemId":"${j.itemId}","linkId":"${$.linkId}","encryptPin":""}&_t=1635133142014&appid=activities_platform`,
                    cookie
                }, 'sss')
                console.log($.sss.data.awardInfo);
            }
        }
    }
    for (let i of Array(10)) {
        await $.curl({
            'url': `https://api.m.jd.com/?functionId=superboxOrdinaryLottery&body={"linkId":"${$.linkId}","encryptPin":""}&_t=1635134002941&appid=activities_platform`,
            cookie
        }, 'ssss')
        console.log('抽奖中', $.ssss);
        if ($.ssss.errMsg == '没有抽奖次数') {
            break
        }
    }
    await $.curl({
        'url': `https://api.m.jd.com/?functionId=superboxRealBigLottery&body={"linkId":"${$.linkId}","encryptPin":""}&_t=1635587400273&appid=activities_platform`,
        cookie
    }, 'c')
    console.log('任务做完抽奖', $.c.data)
}
