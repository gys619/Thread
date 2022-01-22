/*
萌虎摇摇乐
cron 0 10,20 * * * https://raw.githubusercontent.com/333333/jd/main/scripts/jd_mhyyl.js
* */
const $ = new Env('萌虎摇摇乐');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
let allInvite = [];
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
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    if(Date.now() > 1643587200000){
        console.log(`活动结束`);
        return ;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            $.cookie = cookiesArr[i];
            $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            console.log(`\n******开始【京东账号${$.index}】${$.UserName}*********\n`);
            await main($.cookie);
        }
    }
    if(allInvite.length > 0 ){
        console.log(`\n开始脚本内互助\n`);
    }
    let helpCodeList = [];
    for (let i = 0; i < cookiesArr.length; i++) {
        $.cookie = cookiesArr[i];
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        for (let j = 0; j < allInvite.length; j++) {
            if($.UserName ===  allInvite[j].user){
                helpCodeList.push(allInvite[j])
            }
        }
    }
    let otherCk = []
    cookiesArr = [...cookiesArr,...otherCk];
    cookiesArr = getRandomArrayElements(cookiesArr,cookiesArr.length);
    for (let i = 0; i < cookiesArr.length; i++) {
        let UA = `jdapp;iPhone;10.0.8;14.6;${randomWord(false,40,40)};network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222493;appBuild/168841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16E158;supportJDSHWK/1`;
        $.cookie = cookiesArr[i];
        $.canHelp = true;
        $.UserName = decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/) && $.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        for (let j = 0; j < helpCodeList.length && $.canHelp; j++) {
            $.codeInfo = helpCodeList[j];
            $.code = $.codeInfo.code;
            if($.UserName ===  $.codeInfo.user || $.codeInfo.need <= 0){
                continue;
            }
            console.log(`\n${$.UserName},去助力:${$.codeInfo.user },${$.code}`);
            let doSupport = await takePost(`{"shareId":"${$.code}","apiMapping":"/api/task/support/doSupport"}`,$.cookie,UA);
            if(doSupport.status === 7){
                console.log(`助力成功`);
                $.codeInfo.need--;
            }else if(doSupport.status === 3){
                console.log(`已助力过`);
            }else if(doSupport.status === 5){
                $.canHelp = false;
                console.log(`助力次数已用完`);
            }else if(doSupport.status === 4){
                $.codeInfo.need = 0;
                console.log(`助力已满`);
            }else{
                $.canHelp = false;
            }
            console.log(JSON.stringify(doSupport));
            await $.wait(1000);
        }
    }
})().catch((e) => {$.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')}).finally(() => {$.done();})

async function  main(ck) {
    let usName = decodeURIComponent(ck.match(/pt_pin=([^; ]+)(?=;?)/) && ck.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    let UA = `jdapp;iPhone;10.0.8;14.6;${randomWord(false,40,40)};network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222493;appBuild/168841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16E158;supportJDSHWK/1`;
    let mainInfo = await takePost('{"apiMapping":"/api/index/indexInfo"}',ck,UA);
    if(JSON.stringify(mainInfo) === '{}'){
        console.log(`\n${usName},获取活动详情失败`);
        return ;
    }
    console.log(`\n${usName},获取活动详情成功`);
    let tabList = await takePost('{"apiMapping":"/api/task/brand/tabs"}',ck,UA);
    let doFlag = true;
    let fresh = false;
    for (let i = 0; i < tabList.length; i++) {
        doFlag = true;
        await $.wait(3000);
        console.log(`\n${usName},去执行，${tabList[i].brandName}会场任务`);
        for (let k = 0; k < 20 && doFlag; k++) {
            doFlag = false;
            let taskList = await takePost(`{"taskGroupId":${tabList[i].taskGroupId},"apiMapping":"/api/task/brand/getTaskList"}`,ck,UA);
            for (let j = 0; j < taskList.length; j++) {
                let oneTask = taskList[j];
                if(oneTask.totalNum === oneTask.finishNum){
                    console.log(`${usName},任务：${oneTask.taskItemName || ''},已完成`);
                    continue;
                }
                let browseTime = oneTask.browseTime || 3;
                console.log(`${usName},任务：${oneTask.taskItemName || ''},去执行,等待：${browseTime}秒`);
                if(oneTask.taskType === 'FOLLOW_SHOP_TASK'){
                    let doTask = await takePost(`{"taskGroupId":${tabList[i].taskGroupId},"taskId":${oneTask.taskId},"taskItemId":${oneTask.taskItemId},"apiMapping":"/api/task/brand/doTask"}`,ck,UA);
                    if(doTask && doTask.rewardInfoVo){
                        console.log(`${usName},获得积分:${doTask.rewardInfoVo.integral},京豆：${doTask.rewardInfoVo.jbean}`);
                    }else{
                        await $.wait(browseTime*1000);
                        let getReward = await takePost(`{"taskGroupId":${tabList[i].taskGroupId},"taskId":${oneTask.taskId},"taskItemId":${oneTask.taskItemId},"timestamp":${doTask.timeStamp},"apiMapping":"/api/task/brand/getReward"}`,ck,UA);
                        if(getReward ){
                            console.log(`${usName},获得积分:${getReward.integral},京豆：${getReward.jbean}`);
                        }else{
                            console.log(`${usName},异常：${JSON.stringify(getReward)}`);
                        }
                    }
                    doFlag = true;
                    fresh = true;
                }else{
                    let doTask = await takePost(`{"taskGroupId":${tabList[i].taskGroupId},"taskId":${oneTask.taskId},"taskItemId":${oneTask.taskItemId},"apiMapping":"/api/task/brand/doTask"}`,ck,UA);
                    await $.wait(browseTime*1000);
                    let getReward = await takePost(`{"taskGroupId":${tabList[i].taskGroupId},"taskId":${oneTask.taskId},"taskItemId":${oneTask.taskItemId},"timestamp":${doTask.timeStamp},"apiMapping":"/api/task/brand/getReward"}`,ck,UA);
                    if(getReward ){
                        console.log(`${usName},获得积分:${getReward.integral},京豆：${getReward.jbean}`);
                    }else{
                        console.log(`${usName},异常：${JSON.stringify(getReward)}`);
                    }
                    doFlag = true;
                    fresh = true;
                }
            }
        }
    }
    if(fresh){
        mainInfo = await takePost('{"apiMapping":"/api/index/indexInfo"}',ck,UA);
    }
    let heatOwn = mainInfo.heatOwn;
    let chance = Math.floor(heatOwn/100);
    console.log(`${usName},福气值:${heatOwn},可以抽奖：${chance}次`);
    for (let i = 0; i < chance; i++) {
        console.log(`\n${usName},抽奖`);
        let lottery = await takePost('{"apiMapping":"/api/lottery/lottery"}',ck,UA);
        console.log(`${usName},获得：${lottery.prizeName || ''}`);
        console.log(JSON.stringify(lottery));
        await $.wait(3000);
    }

    let supportInfo = await takePost('{"apiMapping":"/api/task/support/list"}',ck,UA);
    if(supportInfo.supportNeedNum !== supportInfo.supportedNum){
        let need = supportInfo.supportNeedNum - supportInfo.supportedNum;
        await $.wait(2000);
        let shareId = await takePost('{"apiMapping":"/api/task/support/getShareId"}',ck,UA);
        console.log(`${usName},需要助力${need},助力码：${shareId}`);
        allInvite.push({'user':usName,'need':need,'code':shareId})
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
async function takePost(info,ck,UA){
    let body = `appid=china-joy&functionId=collect_bliss_cards_prod&body=${info}&t=${Date.now()}&loginType=2`
    let options = {
        url: `https://api.m.jd.com/api`,
        body:body,
        headers: {
            "Host":"api.m.jd.com",
            "Accept": "application/json, text/plain, */*",
            "Content-Type":"application/x-www-form-urlencoded",
            "Origin":"https://yearfestival.jd.com",
            'Cookie': ck,
            "Accept-Language": "zh-CN",
            "User-Agent": UA,
            "Referer": `https://yearfestival.jd.com/`,
            "Accept-Encoding": "gzip, deflate, br",
        }
    }
    return new Promise(resolve => {
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if(data){
                        data = JSON.parse(data);
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data['data'] || {});
            }
        })
    })
}
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
