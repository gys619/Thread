/*
骁龙
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
更新地址  https://raw.githubusercontent.com/star261/jd/main/scripts/jd_xiaolong.js
=================================Quantumultx=========================
[task_local]
#骁龙
10 1,21 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xiaolong.js, tag=骁龙, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "10 1,21 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xiaolong.js,tag=骁龙
===================================Surge================================
骁龙 = type=cron,cronexp="10 1,21 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xiaolong.js
====================================小火箭=============================
骁龙 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xiaolong.js, cronexpr="10 1,21 * * *", timeout=3600, enable=true
 */
const $ = new Env('骁龙');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
})
let activityID = '',cookie = '',userName = '';
let token = '',LZ_TOKEN_KEY = '',LZ_TOKEN_VALUE = '',Referer = '',nickname = '';
let Host = '', venderId = ``,shopId = ``,pin =  ``,lz_jdpin_token = ``;
let hotFlag = false;
let attrTouXiang = '',actorUuid = '';
let hotList = [];
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    $.shareUuid = '';
    let shareList = [];
    if(shareList.length > 0){
        $.shareUuid = getRandomArrayElements(shareList,1)[0];
    }
    let activityList = [{'id':'bc48caef4ff94713a9b0596e256c29bf','endTime':'1671033599000'}];
    for (let i = 0; i < cookiesArr.length; i++) {
        let index = i + 1;
        cookie = cookiesArr[i];
        userName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if(hotList.indexOf(userName) !== -1){
            continue;
        }
        console.log(`\n*****开始【京东账号${index}】${userName}*****\n`);
        hotFlag = false;
        for (let j = 0; j < activityList.length && !hotFlag; j++) {
            let nowTime = Date.now();
            if(nowTime < activityList[j].endTime){
                activityID = activityList[j].id;
                console.log(`\n活动ID：`+ activityID);
                await main();
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
    $.UA =  $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0");
    Host = `lzdz-isv.isvjcloud.com`;
    Referer = `https://lzdz-isv.isvjcloud.com/unify/common/activity/bc48caef4ff94713a9b0596e256c29bf?activityId=bc48caef4ff94713a9b0596e256c29bf&shareUuid=${$.shareUuid}`;
    console.log(`活动地址：${Referer}`);
    token = '',LZ_TOKEN_KEY='',LZ_TOKEN_VALUE='',lz_jdpin_token = ``,venderId = ``,shopId = ``,pin =  ``,nickname = '',actorUuid = '';
    token = await getToken();
    if(!token){console.log(`获取token失败`);return;}
    await getHtml();
    if(!LZ_TOKEN_KEY || !LZ_TOKEN_VALUE){
        console.log(`初始化失败`);return;
    }
    await takePostRequest('getSimpleActInfoVo');
    venderId = '707261'
    console.log(`venderId :${venderId}`);
    await getMyPing('https://lzdz-isv.isvjcloud.com/customer/getMyPing');
    if (pin === ``) {hotFlag = true;console.log(`获取pin失败,该账号可能是黑号`);return;}
    await accessLogWithAD('https://lzdz-isv.isvjcloud.com/common/accessLogWithAD');
    attrTouXiang = 'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
    await getUserInfo('https://lzdz-isv.isvjcloud.com/wxActionCommon/getUserInfo');
    $.activityData = {};
    await takePostRequest('activityContent');
    if(JSON.stringify($.activityData) === '{}'){
        console.log(`获取活动信息失败`);
        return ;
    }
    console.log(`获取活动信息成功`);
    actorUuid = $.activityData.actorUuid;
    console.log(`助力码：${actorUuid}`)
    await $.wait(1000);
    await takePostRequest('getDrawContent');
    if($.shareUuid){
        console.log(`去助力：${$.shareUuid}`);
        $.taskType = 21;
        $.param = '';
        await takePostRequest('doTask');
        await $.wait(2000);
    }else{
        $.shareUuid = actorUuid;
    }
    await $.wait(2000);
    await doTask();
    let drawTime = Number($.activityData.drawTimes) - Number($.activityData.hasDrawTimes);
    for (let i = 0; i < drawTime; i++) {
        console.log(`进行一次抽奖`);
        await takePostRequest('lottery');
        await $.wait(3000);
    }
}
async function doTask(){
    await takePostRequest('doTask2');
    $.taskList = [];
    await takePostRequest('getTaskList');
    await $.wait(3000);
    for (let i = 0; i < $.taskList.length; i++) {
        $.oneTask = $.taskList[i];
        if(!$.oneTask.status){
            console.log(`任务：${$.oneTask.taskName},已完成`)
            continue;
        }
        if($.oneTask.taskType === 20 || $.oneTask.taskType === 21 || $.oneTask.taskType === 0){
            continue;
        }
        console.log(`任务：${$.oneTask.taskName},去执行`);
        $.taskType = $.oneTask.taskType;
        $.param = '';
        await takePostRequest('doTask');
        await $.wait(3000);
    }
}
function takePostRequest(type) {
    let url = '';
    let body = ``;
    switch (type) {
        case 'getSimpleActInfoVo':
            url = 'https://lzdz-isv.isvjcloud.com/dz/common/getSimpleActInfoVo';
            body = `activityId=${activityID}`;
            break;
        case 'activityContent':
            url = 'https://lzdz-isv.isvjcloud.com/unify/cardTaskDraw/activityContent';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}&pinImg=${encodeURIComponent(attrTouXiang)}&nick=${encodeURIComponent(nickname)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareUuid}`;
            break;
        case 'getDrawContent':
            url = 'https://lzdz-isv.isvjcloud.com/unify/common/getDrawContent';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}`;
            break;
        case 'doTask':
            url = 'https://lzdz-isv.isvjcloud.com/unify/cardTaskDraw/doTask';
            body = `activityId=${activityID}&actorUuid=${actorUuid}&param=${$.param}&taskType=${$.taskType}&pin=${encodeURIComponent(pin)}&shareUuid=${$.shareUuid}`;
            break;
        case 'doTask2':
            let aa = ['24cd40992bc54a0da19cdd9f9d13fa5d','a2d5f34cec864a22ae0eac379bdc8f20'];
            let code = getRandomArrayElements(aa,1)[0]
            url = 'https://lzdz-isv.isvjcloud.com/unify/cardTaskDraw/doTask';
            body = `activityId=${activityID}&actorUuid=${actorUuid}&param=${$.param}&taskType=20&pin=${encodeURIComponent(pin)}&shareUuid=${code}`;
            break;
        case 'getTaskList':
            url = 'https://lzdz-isv.isvjcloud.com/unify/common/getTaskList';
            body = `actorUuid=${actorUuid}&activityId=${activityID}`;
            break;
        case 'lottery':
            url = 'https://lzdz-isv.isvjcloud.com/unify/cardTaskDraw/lottery';
            body = `activityId=${activityID}&pin=${encodeURIComponent(pin)}`;
            break;
        default:
            console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body);
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                deakCK(resp)
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
    if(type === 'drawContent' || type ===  'getSimpleActInfoVo'){
        return;
    }
    try {
        data = JSON.parse(data);
    } catch (e) {
        console.log(`执行任务异常`);
        console.log(data);
    }
    if (data.data && data.result && data.count === 0) {
    } else {
        console.log(`\n${type},执行异常`);
        console.log(JSON.stringify(data));
    }
    switch (type) {
        case 'getSimpleActInfoVo':
            shopId = data.data.shopId;
            venderId = data.data.venderId;
            break;
        case 'activityContent':
            $.activityData = data.data;
            break;
        case 'doTask':
        case 'lottery':
            console.log(JSON.stringify(data));
            break;
        case 'getDrawContent':
        case 'doTask2':
            break;
        case 'getTaskList':
            $.taskList = data.data;
            break;
        default:
            console.log(JSON.stringify(data));
    }
}
function getHtml() {
    let config ={
        url:Referer,
        headers: {
            'Host':Host,
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Cookie': `IsvToken=${token};${cookie} LZ_TOKEN_KEY=${LZ_TOKEN_KEY}; LZ_TOKEN_VALUE=${LZ_TOKEN_VALUE}; AUTH_C_USER=${pin}; ${lz_jdpin_token}`,
            "User-Agent": $.UA,
            'Accept-Language':'zh-cn',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection':'keep-alive'
        }
    }
    return new Promise(resolve => {
        $.get(config, (err, resp, data) => {
            deakCK(resp);
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
                    deakCK(resp)
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
        "User-Agent": $.UA,
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
                deakCK(resp)
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
function getToken() {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
        body: 'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988',
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
function deakCK(resp) {
    let setcookie = resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || ''
    if(setcookie){
        let lzjdpintoken = setcookie.filter(row => row.indexOf("lz_jdpin_token") !== -1)[0]
        if(lzjdpintoken && lzjdpintoken.indexOf("lz_jdpin_token=") > -1){
            lz_jdpin_token = lzjdpintoken.split(';') && (lzjdpintoken.split(';')[0] + ';') || ''
        }
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
