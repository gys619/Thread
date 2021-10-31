/*
* 活动地址:https://ddsj-dz.isvjcloud.com/dd-world/load_app/load_app.html
*
* 环境变量：兑换京豆变量：DDEXCHANGE，默认999
* DDEXCHANGE="999"京豆从多到少兑换，先兑换1000，1000兑换完后兑换500
* DDEXCHANGE="6"只兑换1000京豆
* DDEXCHANGE="5"只兑换500京豆
* DDEXCHANGE="1"只兑换200京豆
* */
const $ = new Env('东东世界');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const exchangeId = $.isNode() ? (process.env.DDEXCHANGE ? process.env.DDEXCHANGE : "999"):"999";
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
let authorization = {};
let invitelist = [];
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        $.index = i + 1;
        $.cookie = cookiesArr[i];
        $.isLogin = true;
        $.nickName = '';
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        //await TotalBean();
        console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}*****\n`);
        // if (!$.isLogin) {
        //     $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        //
        //     if ($.isNode()) {
        //         await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        //     }
        //     continue
        // }
        await main();
    }
    console.log(JSON.stringify(invitelist));
    cookiesArr = getRandomArrayElements(cookiesArr,cookiesArr.length);
    console.log(`\n\n====================开始脚本内互助===============================`);
    for (let i = 0; i < cookiesArr.length; i++) {
        $.index = i + 1;
        $.cookie = cookiesArr[i];
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if(!authorization[$.UserName]){
            continue;
        }
        $.canHelp = true;
        $.accessToken = authorization[$.UserName];
        for (let j = 0; j < invitelist.length && $.canHelp; j++) {
            $.oneInvite = invitelist[j];
            if( $.oneInvite.user === $.UserName  ||   $.oneInvite.needTime === 0){
                continue;
            }
            console.log(`\n${$.UserName}去助力${$.oneInvite.user},助力码:${$.oneInvite.inviter_id}`);
            await takePostRequest('do_assist_task');
        }
        await $.wait(2000);
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

async function main() {
    $.token = ``;
    await getToken();
    if ($.token === ``) {console.log(`获取token失败`);return;}
    $.accessToken = 'undefined';
    await takePostRequest('jd-user-info');
    if (!$.accessToken || $.accessToken === 'undefined') {console.log(`获取accessToken失败`);return;}
    authorization[$.UserName] = $.accessToken;
    $.userInfo = {};
    await takeGetRequest('get_user_info');
    console.log(`助力码：${$.userInfo.openid}`)
    $.taskInfo = {};
    $.taskList = [];
    await takeGetRequest('get_task');
    await $.wait(2000);
    await doTask();
    await $.wait(2000);
    console.log(`\n`);
    await takeGetRequest('get_task');
    let userScore = $.taskInfo.userScore;
    $.exChangeList = []
    await takeGetRequest('get_exchange');
    for (let i = $.exChangeList.length -1; i >= 0 ; i--) {
        let oneExchange = $.exChangeList[i];
        console.log(`奖励：${oneExchange.name}，库存：${oneExchange.stock}`);
        if(exchangeId !== '999' && Number(exchangeId) !== oneExchange.id){
            continue;
        }
        if(userScore >= oneExchange.coins && oneExchange.stock >0 && oneExchange.times_limit !== oneExchange.exchange_total){
            console.log(`兑换${oneExchange.name}`);
            $.changeId = oneExchange.id;
            await takePostRequest('do_exchange');
            break;
        }else{
            if(oneExchange.stock >0){
                console.log(`当前积分：${userScore},需要${oneExchange.coins}积分才能兑换${oneExchange.name}`);
            }else{
                console.log(`兑换${oneExchange.name},库存不足,不能兑换`);
            }
        }
        if(oneExchange.times_limit !== oneExchange.exchange_total && exchangeId === '999'){
            break;
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

async function doTask(){
    $.taskDetailList = []
    for (let i = 0; i < $.taskList.length; i++) {
        $.oneTask = $.taskList[i];
        $.taskDetailList = $.oneTask.simpleRecordInfoVo || $.oneTask.browseShopVo || $.oneTask.shoppingActivityVos || $.oneTask.productInfoVos ||$.oneTask.assistTaskDetailVo;
        console.log(`任务：${$.oneTask.taskName},需要完成${$.oneTask.maxTimes}次，已完成${$.oneTask.times}次`);
        if($.oneTask.status === 2){
            continue;
        }
        if($.oneTask.taskType === 6){
            invitelist.push({
                'user':$.UserName,
                'inviter_id':$.userInfo.openid,
                'taskToken':$.taskDetailList.taskToken,
                'needTime':Number($.oneTask.maxTimes) - Number($.oneTask.times)
            })
            continue;
        }
        if($.oneTask.taskType === 12){
            if(Array.isArray($.taskDetailList)){
                $.info = $.taskDetailList[0];
            }else{
                $.info = $.taskDetailList;
            }
            console.log('111:'+JSON.stringify($.info ))
            console.log(`任务：${$.oneTask.taskName} 去执行`);
            await takePostRequest('do_task');
            await $.wait(1000);
            continue;
        }
        for (let j = 0; j < $.taskDetailList.length; j++) {
            $.info = $.taskDetailList[j];
            if($.info.status !== 1){
                continue;
            }
            let waitDuration = 2;
            if(Number($.oneTask.waitDuration) > 0){
                waitDuration = $.oneTask.waitDuration;
            }
            console.log(`任务：${$.oneTask.taskName} 去执行,等待${waitDuration}秒`);
            await takePostRequest('do_task');
            await $.wait(waitDuration*1000);
        }
    }
}

async function takePostRequest(type) {
    let body = ``;
    switch (type) {
        case 'jd-user-info':
            body = `token=${$.token}&source=01`;
            break;
        case 'do_task':
            body = `taskToken=${$.info.taskToken}&task_id=${$.oneTask.taskId}&task_type=${$.oneTask.taskType}`;
            break;
        case 'do_assist_task':
            body = `taskToken=${$.oneInvite.taskToken}&inviter_id=${$.oneInvite.inviter_id}`;
            break;
        case 'do_exchange':
            body = `id=${$.changeId}`;
            break;
        default:
            console.log(`错误${type}`);
    }
    let myRequest = {
        'url':`https://ddsj-dz.isvjcloud.com/dd-api/${type}`,
        'headers':{
            'Origin' : `ddsj-dz.isvjcloud.com`,
            'Connection' : `keep-alive`,
            'Accept' : `application/json, text/plain, */*`,
            'Authorization':`Bearer ${$.accessToken}`,
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Content-Type':'application/x-www-form-urlencoded',
            'Referer' : `https://ddsj-dz.isvjcloud.com/dd-world/logined_jd/`,
            'Accept-Encoding' : `gzip, deflate`,
            'Accept-Language' : `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
            'Cookie': 'dd-world=${$.accessToken};'+$.cookie,
            'Host' : `ddsj-dz.isvjcloud.com`,
            'X-Requested-With':'com.jingdong.app.mall'
        },
        body:body
    }
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                dealReturn(type, data);
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
async function takeGetRequest(type) {
    let myRequest = {
        'url':`https://ddsj-dz.isvjcloud.com/dd-api/${type}`,
        'headers':{
            'Origin' : `ddsj-dz.isvjcloud.com`,
            'Connection' : `keep-alive`,
            'Accept' : `application/json, text/plain, */*`,
            'Authorization':`Bearer ${$.accessToken ?? 'undefined'}`,
            'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Content-Type':'application/x-www-form-urlencoded',
            'Referer' : `https://ddsj-dz.isvjcloud.com/dd-world/logined_jd/`,
            'Accept-Encoding' : `gzip, deflate`,
            'Accept-Language' : `zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7`,
            'Cookie': 'dd-world=${$.accessToken};'+$.cookie,
            'Host' : `ddsj-dz.isvjcloud.com`,
            'X-Requested-With':'com.jingdong.app.mall'
        },
    }
    return new Promise(async resolve => {
        $.get(myRequest, (err, resp, data) => {
            try {
                dealReturn(type, data);
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function dealReturn(type, data) {
    try {
        data = JSON.parse(data);
    } catch (e) {
        console.log(`返回异常：${data}`);
        return;
    }
    switch (type) {
        case 'jd-user-info':
            if (data.access_token) {
                $.accessToken = data.access_token;
            }
            break;
        case 'get_user_info':
            $.userInfo = data;
            break;
        case 'get_task':
            if (data.bizCode === '0') {
                $.taskList = data.result.taskVos;
                $.taskInfo = data.result;
            }
            break;
        case 'do_task':
            if(data.score){
                console.log(`执行成功,获得积分:${data.score}`)
            }else{
                console.log(`执行成功`);
            }
            break;
        case 'do_assist_task':
            $.canHelp = false;
            if(data.score){
                console.log(`助力成功`);
                $.oneInvite.needTime --;
            }else if(data.status_code === 422){
                console.log(`助力次数已用完`);
            }
            break;
        case 'get_exchange':
            if(data.length > 0 ){
                $.exChangeList = data;
            }
            break;
        case 'do_exchange':
            console.log(JSON.stringify(data));
            break;
        default:
            console.log('异常');
            console.log(JSON.stringify(data));
    }
}
async function getToken() {
    let config = {
        url: 'https://api.m.jd.com/client.action',
        body: 'functionId=isvObfuscator&body=%7B%22id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Fddsj-dz.isvjcloud.com%22%7D&uuid=5162ca82aed35fc52e8&client=apple&clientVersion=10.0.10&st=1631884203742&sv=112&sign=fd40dc1c65d20881d92afe96c4aec3d0',
        headers: {
            'Host': 'api.m.jd.com',
            'accept': '*/*',
            'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
            'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': $.cookie
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
                    $.token = data['token']
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": $.cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

