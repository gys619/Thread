/*
注意：活动时间就剩一天，看见的自己玩，不要搬运，人一多会卡服务器
不开卡，会加购，助力貌似是坏的
* * */
const jdCookieNode = require('./jdCookie.js');
const $ = new Env('翻翻');
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
    if(Date.now() > 1641052800000){
        console.log(`活动结束`);
        return ;
    }
    $.inviteUserId = '';
    $.needTime = 0;
    $.allCodeList = [];
    for (let i = 0; i < cookiesArr.length; i++) {
        $.index = i+1;
        await main(cookiesArr[i]);
    }
})().catch((e) => {$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')}).finally(() => {$.done();})

async function  main(ck) {
    let userName = decodeURIComponent(ck.match(/pt_pin=(.+?);/) && ck.match(/pt_pin=(.+?);/)[1]);
    console.log(`\n********开始【京东账号${$.index}】${userName}********\n`);
    if((!$.inviteUserId  || $.needTime < 0) && $.allCodeList.length > 0){
        $.oneShareInfo = $.allCodeList.shift();
        $.inviteUserId = $.oneShareInfo.code;
        $.needTime = $.oneShareInfo.need;
    }
    if($.inviteUserId){
        //console.log(`去助力助力码：${$.inviteUserId},需要被助力：${$.needTime}次`);
        $.needTime--;
    }
    $.cookie = ck;
    $.token = '';
    $.UA =  require('./USER_AGENTS').USER_AGENT;
    $.token = await getToken($);
    $.thisActivityUrl = `https://jiandandian-isv.isvjcloud.com/3c-newyear-prod/?inviteUserId=${$.inviteUserId}`;
    await getHtml($);
    let allInfo = await takeRequest(ck,'activity/get_val?key=HOME_BANNER');
    let mainInfo = await takeRequest(ck,'buyer/info/query');
    if(JSON.stringify(mainInfo) === '{}' || JSON.stringify(allInfo) === '{}'){
        console.log(`${userName},初始化失败`);
    }
    console.log(`助力码：${mainInfo.userId}`)
    await doTask(ck,mainInfo);
    let second = 0;
    do {
        second =  await takeRequest(ck,'buyer/activity/open_quilt/home_surplus_seconds');
        console.log(`\n剩余时长：${second}`);
        await $.wait(2000);
        if(second > 0){
            console.log(`开始翻被`);
            let is_new = await takeRequest(ck,'buyer/activity/open_quilt/is_new');
            console.log(`is_new：${JSON.stringify(is_new)}`);
            let start = await takeRequest(ck,'buyer/activity/open_quilt/start');
            console.log(`开始：${JSON.stringify(start)}`);
            let surplus_seconds = await takeRequest(ck,'buyer/activity/open_quilt/surplus_seconds');
            console.log(`时间：${JSON.stringify(surplus_seconds)}`);
            let toOpen = await takeRequest(ck,'buyer/activity/open_quilt/to_open');
            console.log(`open：${JSON.stringify(toOpen)}`);
            for (let i = 1; i < 40; i++) {
                let open = await takeRequest(ck,`buyer/activity/open_quilt/open?index=${i}`);
                console.log(`被子${i}：${JSON.stringify(open)}`);
                if(open.prizeType === 3){
                    let continueInfo = await takeRequest(ck,`buyer/activity/open_quilt/continue_game`);
                    console.log(`继续：${JSON.stringify(continueInfo)}`);
                }
                if(open.prizeType !== -1 && open.prizeType !== 3){
                    break;
                }
            }
            let state = await takeRequest(ck,'buyer/activity/open_quilt/state');
            console.log(`state：${JSON.stringify(state)}`);
        }else {
            console.log(`剩余时长：${second}，不执行游戏`);
        }
    }while (second > 0);

    let prizeList = await takeRequest(ck,'buyer/activity/draw_user/my_prize');
    for (let i = 0; i < prizeList.length; i++) {
        let onePrize = prizeList[i];
        if(onePrize.prizeType === 1 && onePrize.state === 0){
            console.log(`领取京豆`);
            let receive = await takeRequest(ck,`buyer/activity/draw_user/receive?prizeId=${onePrize.myPrizeId}`);
            console.log(`${JSON.stringify(receive)}`);
            await $.wait(3000);
        }
        console.log(`奖品：${onePrize.prizeName}`);
    }
}

async function doTask(ck,mainInfo){
    let runFlag = true;
    for (let j = 0; j < 15 && runFlag; j++) {
        runFlag = false;
        let taskList = await takeRequest(ck,'buyer/activity_task/list');
        await $.wait(2000)
        for (let i = 0; i < taskList.length; i++) {
            let oneTask = taskList[i];
            if(oneTask.total === oneTask.finished){
                console.log(`\n任务：${oneTask.taskTypeName},已完成`);
                continue;
            }
            if(oneTask.taskTypeCode === 'FOLLOW_SHOP' || oneTask.taskTypeCode === 'BROWSE_SHOP' || oneTask.taskTypeCode === 'BROWSE_GOODS'){
                let taskInfo = oneTask.taskDataDTO;
                if(taskInfo){
                    console.log(`\n任务：${oneTask.taskTypeName},${oneTask.taskName}去执行`)
                    let body = `{"taskTypeCode":"${oneTask.taskTypeCode}","taskId":"${oneTask.id}","shopId":"${taskInfo.shopId || ''}","skuId":"${taskInfo.skuId || ''}","addCartList":[],"id":"${taskInfo.id || ''}"}`;
                    let doInfo = await takePostRequest(ck,'buyer/activity_task/do/task',body);
                    console.log(JSON.stringify(doInfo));
                    await $.wait(1000);
                    runFlag = true;
                }
            }else if(oneTask.taskTypeCode === 'ADD_CART'){
                console.log(`\n任务：${oneTask.taskTypeName},${oneTask.taskName}去执行`);
                let addCartList = await takeRequest(ck,`buyer/activity_task/items?taskId=${oneTask.id}`);
                if(addCartList.length > 0){
                    let body = {
                        "taskTypeCode":oneTask.taskTypeCode,
                        "taskId":oneTask.id,
                        "shopId":"","skuId":"",
                        "addCartList":addCartList,
                        "id":""};
                    let doInfo = await takePostRequest(ck,'buyer/activity_task/do/task',JSON.stringify(body));
                    console.log(JSON.stringify(doInfo));
                    await $.wait(1000);
                    runFlag = true;
                }else{
                    console.log(`获取加购列表失败`)
                }
            }else if(oneTask.taskTypeCode === 'INVITE_FRIENDS' && j === 0){
                let need = oneTask.total - oneTask.finished
                if(need > 0){
                    $.allCodeList.push({'code':mainInfo.userId,'need':need});
                }
            }
        }
    }
}

async function takeRequest(cookie,functionID){
    let url = `https://jiandandian-isv.isvjcloud.com/kx-activity-3c-prod/activity_3c/${functionID}`;
    const headers = {
        'Host' : `jiandandian-isv.isvjcloud.com`,
        'inviteUserId':$.inviteUserId,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Cookie' : cookie ,
        'Accept' : `application/json, text/plain, */*`,
        'User-Agent':$.UA,
        'Referer' : `https://jiandandian-isv.isvjcloud.com/3c-newyear-prod/?inviteUserId=${$.inviteUserId}`,
        'Token': $.token,
        'Accept-Language':'zh-cn'
    };
    let myRequest =  {url: url, headers: headers,timeout: 10000};
    return new Promise(async resolve => {
        $.get(myRequest, (err, resp, data) => {
            try {
                if(err){
                    console.log(err);
                }else{
                    data = JSON.parse(data);
                }
            } catch (e) {
                console.log(data);
                $.logErr(e, resp)
            } finally {
                resolve(data.data || {});
            }
        })
    })
}

async function takePostRequest(cookie,functionID,body){
    let url = `https://jiandandian-isv.isvjcloud.com/kx-activity-3c-prod/activity_3c/${functionID}`;
    const headers = {
        'Host' : `jiandandian-isv.isvjcloud.com`,
        'Accept' : `application/json, text/plain, */*`,
        'Accept-Language':'zh-cn',
        'Accept-Encoding' : `gzip, deflate, br`,
        'Token': $.token,
        'Content-Type':'application/json',
        'Origin':'https://jiandandian-isv.isvjcloud.com',
        'User-Agent':$.UA,
        'inviteUserId':$.inviteUserId,
        'Cookie' : cookie ,
        'Referer' : `https://jiandandian-isv.isvjcloud.com/3c-newyear-prod/?inviteUserId=${$.inviteUserId}`,
    };
    let myRequest =  {url: url, headers: headers,body:body,timeout: 10000};
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                if(err){
                    console.log(err);
                }else{
                    data = JSON.parse(data);
                }
            } catch (e) {
                console.log(data);
                $.logErr(e, resp)
            } finally {
                resolve(data.data || {});
            }
        })
    })
}

async function getToken($) {
    let config = {
        url: 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
        body: 'body=%7B%22url%22%3A%22https%3A%2F%2Fjiandandian-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&clientVersion=9.2.2&build=89568&client=android&uuid=543dfed18ccf0a61a8a6b8d059e6f121ca7e27e0&st=1641028197916&sign=189ea15b05992111193f763877f10a0a&sv=111',
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
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data['token'] || '');
            }
        })
    })
}

async function getHtml($) {
    let config ={
        url:$.thisActivityUrl,
        headers: {
            'Host':'jiandandian-isv.isvjcloud.com',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Cookie': `IsvToken=${$.token};${$.cookie}`,
            "User-Agent": $.UA,
            'Accept-Language':'zh-cn',
            'Accept-Encoding':'gzip, deflate, br',
            'Connection':'keep-alive'
        }
    }
    return new Promise(resolve => {
        $.get(config, (err, resp, data) => {
            try {
                //dealCK($,resp);
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
