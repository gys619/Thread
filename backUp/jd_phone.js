/*
Phone狂制噪吧 [jd_phone.js]

第一个账号助力作者 其他依次助力CK1
————————————————
入口：[ Phone狂制噪吧 (https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/activity/131545?activityId=dz2110100000406501&shareUuid=df6902838eb44de2bffc61dbc7afa610)]
请求太频繁会被黑ip
过10分钟再执行
============Quantumultx===============
[task_local]
#Phone狂制噪吧
7 0,12 * * * https://raw.githubusercontent.com/he1pu/JDHelp/main/jd_phone.js, tag=Phone狂制噪吧, enabled=true
*/
const $ = new Env('Phone狂制噪吧');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [];
Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
})
let activityID = '',cookie = '',userName = '';
let token = '',LZ_TOKEN_KEY = '',LZ_TOKEN_VALUE = '',Referer = '',nickname = '';
let Host = '', venderId = ``,shopId = ``,pin =  ``,lz_jdpin_token = ``;
let hotFlag = false;
let attrTouXiang = '';
$.shareUuid = '';
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    
    $.shareUuid = 'df6902838eb44de2bffc61dbc7afa610';
    let activityList = [{'id':'dz2110100000406501','endTime':'1638287999000'},];
    for (let i = 0; i < cookiesArr.length; i++) {
        let index = i + 1;
        $.index = index;
        cookie = cookiesArr[i];
        userName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        console.log(`\n*****开始【京东账号${index}】${userName}*****\n`);
        hotFlag = false;
        for (let j = 0; j < activityList.length && !hotFlag; j++) {
            let nowTime = Date.now();
            if(nowTime < activityList[j].endTime){
                activityID = activityList[j].id;
                //console.log(`\n活动ID：`+ activityID);
                try{
                    await main();
                }catch (e) {
                    console.log(`异常：`+JSON.stringify(e));
                }
                console.log(`防止黑IP，等待30秒`);
                await $.wait(30000);
            }else{
                console.log(`\n活动ID：${activityID},已过期`)
            }
        }
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
});

async function main() {
    Host = `lzdz1-isv.isvjcloud.com`;
    Referer = `https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/activity/dz2110100000406501?activityId=${activityID}&shareUuid=${$.shareUuid}`;
    console.log(`活动地址：${Referer}`);
    token = '',LZ_TOKEN_KEY='',LZ_TOKEN_VALUE='',lz_jdpin_token = ``,venderId = ``,shopId = ``,pin =  ``,nickname = '';
    token = await getToken();
    if(!token){console.log(`获取token失败`);return;}
    await getWxCommonInfoToken('https://lzdz1-isv.isvjcloud.com/wxCommonInfo/token');
    if(!LZ_TOKEN_KEY || !LZ_TOKEN_VALUE){
        console.log(`初始化失败`);return;
    }
    await takePostRequest('getSimpleActInfoVo');
    if (venderId === ``) {console.log(`获取venderId失败`);return;}
    console.log(`venderId :${venderId}`);
    await getMyPing('https://lzdz1-isv.isvjd.com/customer/getMyPing');
    if (pin === ``) {hotFlag = true;console.log(`获取pin失败,该账号可能是黑号`);return;}
    await accessLogWithAD('https://lzdz1-isv.isvjd.com/common/accessLogWithAD');
    attrTouXiang = 'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
    await getUserInfo('https://lzdz1-isv.isvjd.com/wxActionCommon/getUserInfo');
    await getHtml();
    $.activityData = {};
    await takePostRequest('activityContent');
    console.log(`获取活动详情成功`);
    console.log(`助力码：${$.activityData.actorUuid}`);
    await doTask();
    await $.wait(3000);
    await takePostRequest('activityContent');
    //await $.wait(2000);
    //await takePostRequest('guafen');
    let score = $.activityData.score;
    console.log(`可投票次数：`+score);
    let scoreFlag = false;
    $.canScore = true;
    let aa = 0;
    for (let i = 0; i < score && $.canScore && aa < 20; i++) {
        scoreFlag = true;
        console.log(`进行第${i+1}次投票`);
        await takePostRequest('insxintiao');
        await $.wait(1500);
        aa++;
    }
    if(scoreFlag){
        await $.wait(1000);
        await takePostRequest('activityContent');
        await $.wait(1000);
    }
    let score2 = $.activityData.score2;
    console.log(`可扭蛋次数：`+score2);
    if(score2 > 0){
        await takePostRequest('drawContent');
        await $.wait(1000);
    }
    for (let i = 0; i < score2 && i < 10; i++) {
        console.log(`进行第${i+1}次扭蛋`);
        await takePostRequest('draw');
        await $.wait(1500);
    }
    if($.index == 1){$.shareUuid = $.activityData.actorUuid;}
}
async function doTask(){
    $.taskValue = '';
    if(!$.activityData.signStatus){
        console.log(`去签到`);
        $.taskType=0;
        await takePostRequest('saveTask');
        await $.wait(1000);
    }else{
        console.log(`已签到`);
    }
    if(!$.activityData.followShopStatus){
        console.log(`去关注店铺`);
        $.taskType=23;
        await takePostRequest('saveTask');
        await $.wait(1000);
    }else{
        console.log(`已关注`);
    }
    if(!$.activityData.addCartStatus && ['car','card'].includes(process.env.FS_LEVEL)){
        console.log(`去执行加购`);
        $.taskType=21;
        await takePostRequest('saveTask');
        await $.wait(1000);
    }else{
        console.log(`已执行加购或未设置FS_LEVEL`);
    }
    let toMainData = $.activityData.toMainData;
    for (let i = 0; i < toMainData.length; i++) {
        $.taskType=12;
        if(!toMainData[i].toMainStatus){
            console.log(`去执行浏览会场`);
            $.taskValue = toMainData[i].value;
            await takePostRequest('saveTask');
            await $.wait(1000);
        }
    }
    let toShopStatus = $.activityData.toShopStatus;
    for (let i = 0; i < toShopStatus.length; i++) {
        $.taskType=14;
        if(!toShopStatus[i].toShopStatus){
            console.log(`去执行浏览店铺`);
            $.taskValue = toShopStatus[i].value;
            await takePostRequest('saveTask');
            await $.wait(1000);
        }
    }
    let viewViewData = $.activityData.viewViewData;
    for (let i = 0; i < viewViewData.length; i++) {
        $.taskType=31;
        if(!viewViewData[i].viewViewStatus){
            console.log(`去执行浏览视频`);
            $.taskValue = viewViewData[i].value;
            await takePostRequest('saveTask');
            await $.wait(1000);
        }
    }
    // if(!$.activityData.zhiboStatus){
    //     console.log(`去观看直播`);
    //     $.taskType=10;
    //     $.taskValue=10;
    //     await takePostRequest('saveTask');
    //     await $.wait(1000);
    // }else{
    //     console.log(`已观看直播`);
    // }
}
function takePostRequest(type) {
    let url = '';
    let body = ``;
    switch (type) {
        case 'getSimpleActInfoVo':
            url = 'https://lzdz1-isv.isvjd.com/dz/common/getSimpleActInfoVo';
            body = `activityId=${activityID}`;
            break;
        case 'activityContent':
            url = 'https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/activityContent';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}&pinImg=${encodeURIComponent(attrTouXiang)}&nick=${encodeURIComponent(nickname)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareUuid}`;
            break;
        case 'saveTask':
            url= 'https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/saveTask';
            body = `pin=${encodeURIComponent(pin)}&activityId=${activityID}&taskType=${$.taskType}&actorUuid=${$.activityData.actorUuid}&shareUuid=${$.shareUuid}&taskValue=${$.taskValue}`;
            break;
        case 'insxintiao':
            url= 'https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/insxintiao';
            body = `pin=${encodeURIComponent(pin)}&activityId=${activityID}&playerId=39`;
            break;
        case 'draw':
            url= 'https://lzdz1-isv.isvjd.com/dingzhi/vivo/iqoojieyapa/draw';
            body = `activityId=${activityID}&uuid=${$.activityData.actorUuid}&pin=${encodeURIComponent(pin)}`;
            break;
        case 'drawContent':
            url= 'https://lzdz1-isv.isvjd.com/dingzhi/taskact/common/drawContent';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}`;
            break;
        case 'guafen':
            url= 'https://lzdz1-isv.isvjcloud.com/dingzhi/vivo/iqoojieyapa/guafen';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}&playerId=15`;
            break;
        default:
            console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body);
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                dealReturn(type, data);
            } catch (e) {
                console.log(data);
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function dealReturn(type, data) {
    if(type === 'drawContent'){
        return;
    }
    try {
        data = JSON.parse(data);
    } catch (e) {
        console.log(`执行任务异常`);
        console.log(data);
    }
    switch (type) {
        case 'getSimpleActInfoVo':
            if (data.result) {
                shopId = data.data.shopId;
                venderId = data.data.venderId;
            }
            break;
        case 'activityContent':
            if (data.data && data.result && data.count === 0) {
                $.activityData = data.data;
            } else {
                console.log(JSON.stringify(data));
            }
            break;
        case 'saveTask':
            if (data.result === true && data.count === 0) {
                console.log(`执行成功,获得京豆：${data.data.beans || 0}`);
            } else {
                console.log(JSON.stringify(data))
            }
            //console.log(JSON.stringify(data))
            break;
        case 'insxintiao':
            if (data.result === true && data.count === 0) {
                console.log(`投票成功`);
            }else{
                $.canScore = false;
                console.log(JSON.stringify(data));
            }
            break;
        case 'draw':
            if (data.result === true && data.count === 0) {
                let wdsrvo = data.data.wdsrvo;
                if(wdsrvo.drawInfoType === 6){
                    console.log(`获得京豆：${wdsrvo.name}`);
                }else if(wdsrvo.drawInfoType === 0){
                    console.log(`啥都没有抽到`);
                }else{
                    console.log(`获得其他`);
                }
            } else {
                //console.log(JSON.stringify(data))
            }
            console.log(JSON.stringify(data))
            break;
        case 'insertCrmPageVisit':
            console.log(JSON.stringify(data))
            break;
        case 'guafen':
            if (data.result === true && data.count === 0) {
                console.log(`瓜分获得：${data.data.beans || '0'}`)
            }
            console.log(JSON.stringify(data))
            break;
        default:
            console.log(JSON.stringify(data));
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getHtml() {
    let config ={
        url:Referer,
        headers: {
            'Host':Host,
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Cookie': `IsvToken=${token};${cookie} LZ_TOKEN_KEY=${LZ_TOKEN_KEY}; LZ_TOKEN_VALUE=${LZ_TOKEN_VALUE}; AUTH_C_USER=${pin}; ${lz_jdpin_token}`,
            "User-Agent": 'jdapp;iPhone;10.1.4;14.6;5a8a5743a5d2a4110a8ed396bb047471ea120c6a;network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214111493;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Accept-Language':'zh-cn',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection':'keep-alive'
        }
    }
    return new Promise(resolve => {
        $.get(config, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {

                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function getUserInfo(url) {
    const body = `pin=${encodeURIComponent(pin)}`;
    let myRequest = getPostRequest(url, body);
    return new Promise(resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                }
                else {
                    if(data){
                        data = JSON.parse(data);
                        if(data.count === 0 && data.result){
                            if(data.data.yunMidImageUrl){
                                attrTouXiang = data.data.yunMidImageUrl
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function accessLogWithAD(url) {
    let body = `venderId=${venderId}&code=99&pin=${encodeURIComponent(pin)}&activityId=${activityID}&pageUrl=${encodeURIComponent(Referer)}&subType=app&adSource=null`
    let myRequest = getPostRequest(url, body);
    return new Promise(resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    let setcookie = resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || ''
                    if(setcookie){
                        let LZTOKENKEY = setcookie.filter(row => row.indexOf("LZ_TOKEN_KEY") !== -1)[0]
                        if(LZTOKENKEY && LZTOKENKEY.indexOf("LZ_TOKEN_KEY=") > -1){
                            LZ_TOKEN_KEY = LZTOKENKEY.split(';') && (LZTOKENKEY.split(';')[0]) || ''
                            LZ_TOKEN_KEY = LZ_TOKEN_KEY.replace('LZ_TOKEN_KEY=','')
                        }
                        let LZTOKENVALUE = setcookie.filter(row => row.indexOf("LZ_TOKEN_VALUE") !== -1)[0]
                        if(LZTOKENVALUE && LZTOKENVALUE.indexOf("LZ_TOKEN_VALUE=") > -1){
                            LZ_TOKEN_VALUE = LZTOKENVALUE.split(';') && (LZTOKENVALUE.split(';')[0]) || ''
                            LZ_TOKEN_VALUE = LZ_TOKEN_VALUE.replace('LZ_TOKEN_VALUE=','')
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function getPostRequest(url, body) {
    const headers = {
        'X-Requested-With' : `XMLHttpRequest`,
        'Connection' : `keep-alive`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Content-Type' : `application/x-www-form-urlencoded`,
        'Origin' : `https://${Host}`,
        "User-Agent": `jdapp;iPhone;10.1.4;14.6;5a8a5743a5d2a4110a8ed396bb047471ea120c6a;network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214111493;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
        'Cookie': `${cookie} LZ_TOKEN_KEY=${LZ_TOKEN_KEY}; LZ_TOKEN_VALUE=${LZ_TOKEN_VALUE}; AUTH_C_USER=${pin}; ${lz_jdpin_token}`,
        'Host' : Host,
        'Referer' : Referer,
        'Accept-Language' : `zh-cn`,
        'Accept' : `application/json`
    };
    return {url: url, method: `POST`, headers: headers, body: body};
}
function getMyPing(url) {
    let body = `userId=${venderId}&token=${encodeURIComponent(token)}&fromType=APP`;
    let myRequest = getPostRequest(url, body);
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                let setcookie = resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || ''
                if(setcookie){
                    let lzjdpintoken = setcookie.filter(row => row.indexOf("lz_jdpin_token") !== -1)[0]
                    if(lzjdpintoken && lzjdpintoken.indexOf("lz_jdpin_token=") > -1){
                        lz_jdpin_token = lzjdpintoken.split(';') && (lzjdpintoken.split(';')[0] + ';') || ''
                    }
                    let LZTOKENVALUE = setcookie.filter(row => row.indexOf("LZ_TOKEN_VALUE") !== -1)[0]
                    if(LZTOKENVALUE && LZTOKENVALUE.indexOf("LZ_TOKEN_VALUE=") > -1){
                        LZ_TOKEN_VALUE = LZTOKENVALUE.split(';') && (LZTOKENVALUE.split(';')[0]) || ''
                        LZ_TOKEN_VALUE = LZ_TOKEN_VALUE.replace('LZ_TOKEN_VALUE=','')
                    }
                }
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    console.log(`执行任务异常`);
                    console.log(data);
                }
                if (data.data && data.data.secretPin) {
                    pin = data.data.secretPin
                    nickname = data.data.nickname
                } else {
                    console.log(JSON.stringify(data));
                }
            } catch (e) {
                console.log(data);
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
function getWxCommonInfoToken (url) {
    const method = `POST`;
    const headers = {
        'X-Requested-With' : `XMLHttpRequest`,
        'Connection' : `keep-alive`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Content-Type' : `application/x-www-form-urlencoded`,
        'Origin' : `https://${Host}`,
        'User-Agent' : `jdapp;iPhone;10.1.4;14.6;5a8a5743a5d2a4110a8ed396bb047471ea120c6a;network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214111493;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
        'Cookie' : cookie,
        'Host' : Host,
        'Referer' : Referer,
        'Accept-Language' : `zh-cn`,
        'Accept' : `application/json`
    };
    const body = ``;
    const myRequest = {url: url, method: method, headers: headers, body: body};
    return new Promise(resolve => {
        $.post(myRequest, async (err, resp, data) => {
            try {
                let res = $.toObj(data);
                if(typeof res == 'object' && res.result === true){
                    if(typeof res.data.LZ_TOKEN_KEY != 'undefined') LZ_TOKEN_KEY = res.data.LZ_TOKEN_KEY;
                    if(typeof res.data.LZ_TOKEN_VALUE != 'undefined') LZ_TOKEN_VALUE = res.data.LZ_TOKEN_VALUE;
                }else if(typeof res == 'object' && res.errorMessage){
                    console.log(`token ${res.errorMessage || ''}`)
                }else{
                    console.log(data)
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function getToken() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
        body: 'body=%7B%22url%22%3A%22https%3A%5C/%5C/lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167863&client=apple&clientVersion=10.2.2&d_brand=apple&d_model=iPhone9%2C2&ef=1&eid=eidI42470115RDhDRjM1NjktODdGQi00RQ%3D%3DB3mSBu%2BcGp7WhKUUyye8/kqi1lxzA3Dv6a89ttwC7YFdT6JFByyAtAfO0TOmN9G2os20ud7RosfkMq80&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22wifiBssid%22%3A%22ENcmCwPtZWYzCzK0DwTvZQZsY2S5YwVwC2CzCWHsDQU%3D%22%2C%22osVersion%22%3A%22CJGkDq%3D%3D%22%2C%22area%22%3A%22Cv8yENCmXzUnENS4XzK%3D%22%2C%22openudid%22%3A%22DWO4YJU3DNDrDWGyYJGnCJLrEQVuCzu2YwSmDNc0DzPvYJOyCQC2YG%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1636080197%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%7D&isBackground=N&joycious=88&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=390d7ee95da368f4141370ece33795e3&st=1636081272930&sv=110',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': cookie
        }
    }
    return new Promise(resolve => {
        $.post(config, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data['token'] || '');
            }
        })
    })
}
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

