/*
京享值PK

需手动开宝箱
能用且用
 */
const $ = new Env('京享值PK');

!function(n){"use strict";function r(n,r){var t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function t(n,r){return n<<r|n>>>32-r}function u(n,u,e,o,c,f){return r(t(r(r(u,n),r(o,f)),c),e)}function e(n,r,t,e,o,c,f){return u(r&t|~r&e,n,r,o,c,f)}function o(n,r,t,e,o,c,f){return u(r&e|t&~e,n,r,o,c,f)}function c(n,r,t,e,o,c,f){return u(r^t^e,n,r,o,c,f)}function f(n,r,t,e,o,c,f){return u(t^(r|~e),n,r,o,c,f)}function i(n,t){n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;var u,i,a,h,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;for(u=0;u<n.length;u+=16)i=l,a=d,h=v,g=C,d=f(d=f(d=f(d=f(d=c(d=c(d=c(d=c(d=o(d=o(d=o(d=o(d=e(d=e(d=e(d=e(d,v=e(v,C=e(C,l=e(l,d,v,C,n[u],7,-680876936),d,v,n[u+1],12,-389564586),l,d,n[u+2],17,606105819),C,l,n[u+3],22,-1044525330),v=e(v,C=e(C,l=e(l,d,v,C,n[u+4],7,-176418897),d,v,n[u+5],12,1200080426),l,d,n[u+6],17,-1473231341),C,l,n[u+7],22,-45705983),v=e(v,C=e(C,l=e(l,d,v,C,n[u+8],7,1770035416),d,v,n[u+9],12,-1958414417),l,d,n[u+10],17,-42063),C,l,n[u+11],22,-1990404162),v=e(v,C=e(C,l=e(l,d,v,C,n[u+12],7,1804603682),d,v,n[u+13],12,-40341101),l,d,n[u+14],17,-1502002290),C,l,n[u+15],22,1236535329),v=o(v,C=o(C,l=o(l,d,v,C,n[u+1],5,-165796510),d,v,n[u+6],9,-1069501632),l,d,n[u+11],14,643717713),C,l,n[u],20,-373897302),v=o(v,C=o(C,l=o(l,d,v,C,n[u+5],5,-701558691),d,v,n[u+10],9,38016083),l,d,n[u+15],14,-660478335),C,l,n[u+4],20,-405537848),v=o(v,C=o(C,l=o(l,d,v,C,n[u+9],5,568446438),d,v,n[u+14],9,-1019803690),l,d,n[u+3],14,-187363961),C,l,n[u+8],20,1163531501),v=o(v,C=o(C,l=o(l,d,v,C,n[u+13],5,-1444681467),d,v,n[u+2],9,-51403784),l,d,n[u+7],14,1735328473),C,l,n[u+12],20,-1926607734),v=c(v,C=c(C,l=c(l,d,v,C,n[u+5],4,-378558),d,v,n[u+8],11,-2022574463),l,d,n[u+11],16,1839030562),C,l,n[u+14],23,-35309556),v=c(v,C=c(C,l=c(l,d,v,C,n[u+1],4,-1530992060),d,v,n[u+4],11,1272893353),l,d,n[u+7],16,-155497632),C,l,n[u+10],23,-1094730640),v=c(v,C=c(C,l=c(l,d,v,C,n[u+13],4,681279174),d,v,n[u],11,-358537222),l,d,n[u+3],16,-722521979),C,l,n[u+6],23,76029189),v=c(v,C=c(C,l=c(l,d,v,C,n[u+9],4,-640364487),d,v,n[u+12],11,-421815835),l,d,n[u+15],16,530742520),C,l,n[u+2],23,-995338651),v=f(v,C=f(C,l=f(l,d,v,C,n[u],6,-198630844),d,v,n[u+7],10,1126891415),l,d,n[u+14],15,-1416354905),C,l,n[u+5],21,-57434055),v=f(v,C=f(C,l=f(l,d,v,C,n[u+12],6,1700485571),d,v,n[u+3],10,-1894986606),l,d,n[u+10],15,-1051523),C,l,n[u+1],21,-2054922799),v=f(v,C=f(C,l=f(l,d,v,C,n[u+8],6,1873313359),d,v,n[u+15],10,-30611744),l,d,n[u+6],15,-1560198380),C,l,n[u+13],21,1309151649),v=f(v,C=f(C,l=f(l,d,v,C,n[u+4],6,-145523070),d,v,n[u+11],10,-1120210379),l,d,n[u+2],15,718787259),C,l,n[u+9],21,-343485551),l=r(l,i),d=r(d,a),v=r(v,h),C=r(C,g);return[l,d,v,C]}function a(n){var r,t="",u=32*n.length;for(r=0;r<u;r+=8)t+=String.fromCharCode(n[r>>5]>>>r%32&255);return t}function h(n){var r,t=[];for(t[(n.length>>2)-1]=void 0,r=0;r<t.length;r+=1)t[r]=0;var u=8*n.length;for(r=0;r<u;r+=8)t[r>>5]|=(255&n.charCodeAt(r/8))<<r%32;return t}function g(n){return a(i(h(n),8*n.length))}function l(n,r){var t,u,e=h(n),o=[],c=[];for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),t=0;t<16;t+=1)o[t]=909522486^e[t],c[t]=1549556828^e[t];return u=i(o.concat(h(r)),512+8*r.length),a(i(c.concat(u),640))}function d(n){var r,t,u="";for(t=0;t<n.length;t+=1)r=n.charCodeAt(t),u+="0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r);return u}function v(n){return unescape(encodeURIComponent(n))}function C(n){return g(v(n))}function A(n){return d(C(n))}function m(n,r){return l(v(n),v(r))}function s(n,r){return d(m(n,r))}function b(n,r,t){return r?t?m(r,n):s(r,n):t?C(n):A(n)}$.md5=b}();

$.appId = 'dafbe42d5bff9d82298e5230eb8c3f79';
$.appMD5Key = '34e1e81ae8122ca039ec5738d33b4eee';

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
    cookie = "",
    message;

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...jsonParse($.getdata("CookiesJD") || "[]").map((item) => item.cookie),
    ].filter((item) => !!item);
}

const JD_API_HOST = "https://api.m.jd.com/client.action";
$.helpAuthor = true;
!(async () => {
    if (!cookiesArr[0]) {
        $.msg(
            $.name,
            "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取",
            "https://bean.m.jd.com/", {
                "open-url": "https://bean.m.jd.com/"
            }
        );
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(
                cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
            );
            $.index = i + 1;
            message = "";
            console.log(`\n******开始【京东账号${$.index}】${$.UserName}*********\n`);
            $.canPk = true;
            $.pin = '';
            $.lkToken = '';
            await main()
        }
    }
})()
    .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
    })
    .finally(() => {
        $.done();
    });

function showMsg() {
    return new Promise(resolve => {
        $.log($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
        resolve()
    })
}

async function main() {
    await getToken();
    console.log("当前token：" + $.token);
    if ($.token) {
        await getPin();
        if ($.pin) {
            console.log("当前pin（pk码）：" + $.pin);
        }
        await checkRisk();

        let myScore = await getScore($.pin);
        console.log("我的京享值:" + myScore);
        $.pinList = await getFriendPinList();
        let winCnt = 0;
        if ($.pinList.length > 0) {
            console.log("待pk的pin list:\n" + $.pinList);
            for (let i = 0; i < $.pinList.length; i++) {
                let pin = $.pinList[i];
                console.log('别人的的pin：' + pin);
                let fscore = await getScore(pin);
                console.log("别人的京享值:" + fscore);
                if (fscore < myScore) {
                    await launchBattleNew(pin);
                    if (!$.canPk) {
                        break;
                    }
                    winCnt++;
                    // if (winCnt >= 30) {
                    //     break;
                    // }
                }
                await $.wait(1000);
            }
        }

        // if (winCnt > 0) {
        //     await getBoxRewardInfo();
        //     console.log("去开宝箱");
        //     if ($.awards) {
        //         for (let index = 0; index < $.awards.length; index++) {
        //             let item = $.awards[index];
        //             if (item.received == 0) {
        //                 if ($.totalWins >= item.wins) {
        //                     await sendBoxReward(item.id);
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}

function checkRisk() {
    console.log("检查风险");
    return new Promise((resolve) => {
        let options = {
            "url": `https://pengyougou.m.jd.com/like/jxz/checkRisk?actId=9&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.pin}`,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            }
        };

        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        console.log(data);
                    } else {
                        $.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        });
    });
}

async function getFriendPinList() {
    console.log("获取好友Pk列表");
    let allFriends = [];
    for (let i = 0; i < 25; i++) {
        let friends = await getUserFriendsPage(i + 1);
        if (friends.length === 0) {
            break;
        }
        for (let j = 0; j < friends.length; j++) {
            let item = friends[j];
            // 可以接受pk, 并且未pk的好友
            if (item.leftAcceptPkNum > 0 && item.pkStatus !== 4) {
                allFriends.push(item.friendPin);
            }
        }
    }
    return allFriends;
}

function getUserFriendsPage(pageNo = 1, pageSize = 10) {
    console.log(`获取好友分页列表 pageNo: ${pageNo}, pageSize: ${pageSize}`);
    return new Promise(resolve => {
        let options = {
            "url": `https://pengyougou.m.jd.com/like/jxz/getUserFriendsPage?actId=9&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.pin}&pageNo=${pageNo}&pageSize=${pageSize}`,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            }
        };
        let result = [];
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        result = data.datas;
                    } else {
                        $.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve(result);
            }
        });
    });
}

function launchBattleNew(fpin) {
    console.log(`发起挑战: ${fpin}`);
    return new Promise((resolve) => {
        let body = {
            'actId': 9,
            'recipient': fpin,
            'relation': 2
        };
        let bodyStr = JSON.stringify(body);
        let timestamp = Date.now();
        let sign = pkSign(bodyStr, timestamp);
        let options = {
            "url": `https://pengyougou.m.jd.com/open/api/like/jxz/launchBattle?appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=${$.pin}&lkToken=${$.lkToken}&sign=${sign}&t=${timestamp}`,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            },
            'body': bodyStr
        };

        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        console.log(data);
                        data = JSON.parse(data);
                        let bizData = data.data;
                        if (bizData.state === 3 && bizData.msg === '今日次数已耗尽') {
                            $.canPk = false; // pk次数耗尽
                        }
                    } else {
                        $.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        });
    });
}

function pkSign(body, timestamp) {
    // timestamp = 1623470148350; // sign=a45cb6667750320e9f5c53102817654d
    let str = `${$.appId}_${$.appMD5Key}_${body}_${timestamp}`;
    return $.md5(str);
}

function getScore(fpin) {
    console.log("查询" + fpin + "分数");
    return new Promise((resolve) => {
        let options = {
            "url": "https://pengyougou.m.jd.com/like/jxz/getScore?actId=9&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=" + fpin,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            }
        };

        $.get(options, (err, resp, res) => {
            let score = 0;
            try {
                if (res) {
                    let data = JSON.parse(res);
                    if (data) {
                        score = data.data
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(score);
            }
        })
    });
}

function getBoxRewardInfo() {
    return new Promise((resolve) => {
        let options = {
            "url": "https://pengyougou.m.jd.com/like/jxz/getBoxRewardInfo?actId=9&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=" + $.pin,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            }
        };

        $.get(options, (err, resp, res) => {
            try {
                console.log(res);
                if (res) {
                    let data = JSON.parse(res);
                    if (data.success) {
                        $.awards = data.data.awards;
                        $.totalWins = data.data.totalWins;
                        console.log("总胜场:" + data.data.totalWins);
                    }

                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(res);
            }
        })
    });
}


function sendBoxReward(rewardConfigId) {
    return new Promise((resolve) => {
        let options = {
            "url": "https://pengyougou.m.jd.com/like/jxz/sendBoxReward?rewardConfigId=" + rewardConfigId + "&actId=9&appId=dafbe42d5bff9d82298e5230eb8c3f79&lkEPin=" + $.pin,
            "headers": {
                "Referer": "https://game-cdn.moxigame.cn/ClickEliminate/IntegralPK_jd/thirdapp/index.html?&token=AAFgwYjmADD1CrUNjDlWrIKSUE5xguJH3wmor9ZeStzbDq5cXG2Me0PSQgXJvT5bAgJv_DErW1E&returnurl=https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F45njQg88Vym1s2EGp9aV6cPvqecw%2Findex.html%3Ftttparams%3DImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%253D%253D%26babelChannel%3Dttt1%26qdsource%3Dapp%26lng%3D114.362856%26lat%3D30.577543%26sid%3Dab2735c8cec04b1db8d32b4f406fef7w%26un_area%3D17_1381_50717_52133%23%2Findex&tttparams=ImfQnGideyJnTG5nIjoiMTE0LjM3OTc2NiIsImdMYXQiOiIzMC42MDE0NzEifQ8%3D%3D&babelChannel=ttt1&lng=114.362856&lat=30.577543&sid=ab2735c8cec04b1db8d32b4f406fef7w&un_area=17_1381_50717_52133&friendPin=109912ce317991bcdcca46aae737b4f2",
                "Host": "pengyougou.m.jd.com",
                "Content-Type": "application/json",
                "Origin": "https://game-cdn.moxigame.cn",
                "Connection": "keep-alive",
                "Accept": " */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Encoding": "gzip,deflate,br",
                "Accept-Language": "zh-cn",
            }
        };

        $.get(options, (err, resp, res) => {
            try {
                console.log(res);
                if (res) {
                    let data = JSON.parse(res);
                    if (data.success) {
                        $.openAwards = data.datas;
                        if ($.openAwards) {
                            $.openAwards.forEach(item => {
                                console.log('获得奖励:' + JSON.stringify(item));
                            });
                        }
                    }

                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(res);
            }
        })
    });
}

function getPin() {
    return new Promise((resolve) => {
        let options = {
            "url": "https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79",
            "headers": {
                "Host": "jdjoy.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Cookie": cookie,
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Language": "zh-cn",
                "Referer": "https://prodev.m.jd.com/mall/active/4HTqMAvser7ctEBEdhK4yA7fXpPi/index.html?babelChannel=ttt9&tttparams=AeOIMwdeyJnTG5nIjoiMTE3LjAyOTE1NyIsImdMYXQiOiIyNS4wOTUyMDcifQ7%3D%3D&lng=00.000000&lat=00.000000&sid=&un_area="
            }
        }

        $.post(options, (err, resp, res) => {
            try {
                console.log(res);
                if (res) {
                    let data = JSON.parse(res);
                    if (data) {
                        // $.pin = data.data;
                        $.pin = data.data.lkEPin;
                        $.lkToken = data.data.lkToken;
                    }

                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(res);
            }
        })
    });
}

function getToken() {
    return new Promise((resolve) => {
        let options = {
            "url": "https://jdjoy.jd.com/saas/framework/user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com",
            "headers": {
                "Host": "jdjoy.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Cookie": cookie,
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
                "Accept-Language": "zh-cn",
                "Referer": "https://prodev.m.jd.com/mall/active/4HTqMAvser7ctEBEdhK4yA7fXpPi/index.html?babelChannel=ttt9&tttparams=AeOIMwdeyJnTG5nIjoiMTE3LjAyOTE1NyIsImdMYXQiOiIyNS4wOTUyMDcifQ7%3D%3D&lng=00.000000&lat=00.000000&sid=&un_area="
            }
        }
        $.post(options, (err, resp, res) => {
            try {
                if (res) {
                    let data = JSON.parse(res);
                    if (data) {
                        $.token = data.data
                    }

                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve(res);
            }
        })
    });
}


function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie");
            return [];
        }
    }
}

function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
