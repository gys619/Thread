/**
 电竞预言家瓜分京豆，链接： u.jd.com/3wyVFhp
 必须得做完任务才能参与竞猜，有加购，没开卡，参与竞猜后，如果猜对了，第二天可以瓜分京豆（蚊子腿。。。）
 暂时还有24号和25号  2场，，，
 cron 23 10,11 * * * https://raw.githubusercontent.com/star261/jd/main/scripts/jd_lol.js
 环境变量：ANSWERCODE, 选择哪一个队伍,默认随机； 例：ANSWERCODE="A" 选择第一个队伍，ANSWERCODE="B" 选择第二个队伍
 PS:只有押对队伍才能在第二天瓜分豆子。如果觉得哪个队伍胜率大，可以自己修改环境变量，梭哈一个队伍
 */
const $ = new Env('电竞预言家');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [];
// 环境变量：ANSWERCODE, 选择哪一个队伍,默认随机； 例：ANSWERCODE="A" 选择第一个队伍，ANSWERCODE="B" 选择第二个队伍
let answerCode = $.isNode() ? (process.env.ANSWERCODE ? process.env.ANSWERCODE : `999`):`999`;
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
} else {
    cookiesArr = [
        $.getdata("CookieJD"),
        $.getdata("CookieJD2"),
        ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
let shareList = [];
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }
    if(Date.now() > '1635177600000'){
        console.log(`活动已结束`);
        return ;
    }
    const promiseArr = cookiesArr.map((ck, index) => main(ck));
    await Promise.all(promiseArr);
    console.log(JSON.stringify(shareList));
    if(shareList.length === 0){return;}
    let allShareList = [];
    for (let i = 0; i < cookiesArr.length; i++) {
        let cookie = cookiesArr[i];
        let userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
        for (let j = 0; j < shareList.length; j++) {
            if(shareList[j].user === userName){
                allShareList.push(shareList[j]);
                break;
            }
        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        let cookie = cookiesArr[i];
        let userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
        let canHelp = true;
        let helpTime = 0;
        for (let j = 0; j < allShareList.length && canHelp && helpTime < 5; j++) {
            let oneCodeInfo = allShareList[j];
            if(oneCodeInfo.user === userName || oneCodeInfo.need === 0){
                continue;
            }
            console.log(`${userName}去助力:${oneCodeInfo.user},助力码：${oneCodeInfo.code}`);
            let doSupport = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"shareId":"${oneCodeInfo.code}","apiMapping":"/api/doSupport"}&t=${Date.now()}&loginType=2`);
            if(doSupport.status === 7){
                console.log(`助力成功`);
                oneCodeInfo.need--;
                helpTime++;
            }else if(doSupport.status === 5){
                console.log(`助力次数已用完`);
                canHelp=false;
            }
            console.log(`助力结果：${JSON.stringify(doSupport)}`);
            await $.wait(2000);
        }
    }
})().catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
    $.done();
});

async function main(cookie) {
    let userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
    await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/activityRules"}&t=${Date.now()}&loginType=2`);
    let homePage = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/homePage"}&t=${Date.now()}&loginType=2`);
    let getTaskList = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/task/getTaskList"}&t=${Date.now()}&loginType=2`);
    await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/isRisk"}&t=${Date.now()}&loginType=2`);
    if(JSON.stringify(homePage) === '{}' || JSON.stringify(getTaskList) === '{}'){
        console.log(`${userName},获取活动详情失败`);
        return ;
    }
    console.log(`${userName},获取活动详情成功`);
    await $.wait(2000);
    let time = 0;
    let runFlag = false;
    do {
        runFlag = false;
        for (let i = 0; i < getTaskList.length; i++) {
            let oneTask = getTaskList[i];
            if(oneTask.totalNum === oneTask.finishNum){
                console.log(`${userName},任务：${oneTask.taskName},已完成`);
                continue;
            }
            console.log(`${userName},任务：${oneTask.taskName},去执行`);
            if(oneTask.type === 'JOIN_SHOPPING_CART'){
                let getReward = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"parentId":"${oneTask.parentId}","taskId":"${oneTask.taskId}","activityDate":"${homePage.activityDate}","apiMapping":"/api/task/getReward"}&t=${Date.now()}&loginType=2`);
                console.log(`${userName},执行结果：${JSON.stringify(getReward)}`);
                await $.wait(2000);
            }
            if(oneTask.type === 'BROWSE_TASK' || oneTask.type === 'FOLLOW_CHANNEL_TASK'){
                let doInfo = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"parentId":"${oneTask.parentId}","taskId":"${oneTask.taskId}","activityDate":"${homePage.activityDate}","apiMapping":"/api/task/doTask"}&t=${Date.now()}&loginType=2`);
                let time = 2;
                if(oneTask.browseTime > 0){
                    time = oneTask.browseTime;
                }
                await $.wait(time*1000);
                let getReward = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"parentId":"${oneTask.parentId}","taskId":"${oneTask.taskId}","timeStamp":${doInfo.timeStamp},"activityDate":"${homePage.activityDate}","apiMapping":"/api/task/getReward"}&t=${Date.now()}&loginType=2`);
                console.log(`${userName},执行结果：${JSON.stringify(getReward)}`);
            }
            if(oneTask.type === 'FOLLOW_SHOP_TASK'){
                let doTask = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"parentId":"${oneTask.parentId}","taskId":"${oneTask.taskId}","activityDate":"${homePage.activityDate}","apiMapping":"/api/task/doTask"}&t=${Date.now()}&loginType=2`);
                console.log(`${userName},执行结果：${JSON.stringify(doTask.rewardVo)}`);
            }
            runFlag = true;
        }
        time ++;
        if(runFlag && time < 2){
            await $.wait(1000);
            getTaskList = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/task/getTaskList"}&t=${Date.now()}&loginType=2`);
        }
    }while (runFlag && time < 2);
    let questions = homePage.questions;
    let questionInfo = {};
    for (let i = 0; i < questions.length; i++) {
        questionInfo[questions[i].answerCode] = questions[i].skuName;
    }
    if(answerCode === '999'){
        answerCode =  Math.round((Math.random()*10))%2 === 0 ? "A" : "B";
        console.log(`\n没有设置环境变量ANSWERCODE，随机选择队伍:${answerCode}\n`)
    }
    if(answerCode){
        if(homePage.userAnswerCode === null){
            await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"activityDate":"${homePage.activityDate}","apiMapping":"/api/checkGuess"}&t=${Date.now()}&loginType=2`);

            await $.wait(1000);
            console.log(`${userName},选择队伍：${questionInfo[answerCode]}`);
            let guessAnswer = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"activityDate":"${homePage.activityDate}","answerCode":"${answerCode}","apiMapping":"/api/guessAnswer"}&t=${Date.now()}&loginType=2`);
            console.log(`${userName},选择返回：${JSON.stringify(guessAnswer)}`);
            await $.wait(1000);
            homePage = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"apiMapping":"/api/homePage"}&t=${Date.now()}&loginType=2`);

        }
    }else if(homePage.userAnswerCode === null){
        console.log(`${userName},没有选择答案`);
    }else{
        console.log(`${userName},已选择队伍：${questionInfo[homePage.userAnswerCode]}`);
    }
    await $.wait(1000);
    if(homePage.lotteryButtonStatus === 1){
        console.log(`${userName},进行一次抽奖`);
        let lottery = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"activityDate":"${homePage.activityDate}","apiMapping":"/api/lottery/lottery"}&t=${Date.now()}&loginType=2`);
        console.log(`${userName},抽奖结果：${JSON.stringify(lottery)}`);
    }
    let shareId = homePage.shareId;
    if(shareId){
        let initSupport = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"shareId":"${shareId}","apiMapping":"/api/initSupport"}&t=${Date.now()}&loginType=2`);
        console.log(`\n${userName},助力码：${shareId},已被助力：${initSupport.supportedNum}次,需要被助力：${initSupport.supportNeedNum}次，当前倍数：${initSupport.doubleNum}倍`);
        let need = Number(initSupport.supportNeedNum) - Number(initSupport.supportedNum);
        if(need > 0){
            shareList.push({'user':userName,'code':shareId,'need':need});
        }
    }
    let activityDateList = homePage.activityDateList;
    for (let i = 0; i < activityDateList.length; i++) {
        let activityDate = activityDateList[i];
        let homePage = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"activityDate":${activityDate},"apiMapping":"/api/homePage"}&t=${Date.now()}&loginType=2`);
        await $.wait(2000);
        if(homePage.lotteryButtonStatus === 2){
            console.log(`领取${activityDate}竞猜奖励`);
            let lotteryInfo = await takeRequest(cookie,`appid=china-joy&functionId=champion_game_prod&body={"activityDate":"${activityDate}","apiMapping":"/api/lottery"}&t=${Date.now()}&loginType=2`);
            console.log(JSON.stringify(lotteryInfo));
            await $.wait(2000);
        }
    }
}
async function takeRequest(cookie,body){
    let url = 'https://api.m.jd.com/api';
    const headers = {
        'Origin' : `https://dnsm618-100million.m.jd.com`,
        'Cookie' : cookie ,
        'Connection' : `keep-alive`,
        'Accept' : `application/json, text/plain, */*`,
        'Referer' : `https://dnsm618-100million.m.jd.com/`,
        'Host' : `api.m.jd.com`,
        'user-agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        'Accept-Language' : `zh-cn`,
        'Accept-Encoding' : `gzip, deflate, br`
    };
    let myRequest =  {url: url, headers: headers,body:body};
    return new Promise(async resolve => {
        $.post(myRequest, (err, resp, data) => {
            try {
                if(err){
                    console.log(err);
                }else{
                    data = JSON.parse(data);
                    if(data && data.data && JSON.stringify(data.data) === '{}'){
                        console.log(JSON.stringify(data))
                    }
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



function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
