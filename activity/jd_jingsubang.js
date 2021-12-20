/*
tgchannel：https://t.me/Ariszy8028
github：https://github.com/Ariszy/Private-Script
boxjs：https://raw.githubusercontent.com/Ariszy/Private-Script/master/Ariszy.boxjs.json

[task_local]
#手机竞猜
0 0 * * * https://raw.githubusercontent.com/Ariszy/Private-Script/master/JD/zy_sjjc.js, tag= 手机竞猜
================Loon==============
[Script]
cron "0 0 * * *" script-path= https://raw.githubusercontent.com/Ariszy/Private-Script/master/JD/zy_sjjc.js,tag= 手机竞猜
===============Surge=================
手机竞猜 = type=cron,cronexp="0 0 * * *",wake-system=1,timeout=3600,script-path= https://raw.githubusercontent.com/Ariszy/Private-Script/master/JD/zy_sjjc.js
============小火箭=========
sjjc = type=cron,script-path= https://raw.githubusercontent.com/Ariszy/Private-Script/master/JD/zy_sjjc.js, cronexpr="0 0 * * *", timeout=3600, enable=true
*/
const Ariszy = '手机竞猜'
const $ = Env(Ariszy)
const notify = $.isNode() ?require('./sendNotify') : '';
cookiesArr = []
CodeArr = []
cookie = ''
var brandlistArr = [],shareidArr = []
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invite=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行
if ($.isNode()) {
     Object.keys(jdCookieNode).forEach((item) => {
          cookiesArr.push(jdCookieNode[item])
     })
     if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
     cookiesArr = [
          $.getdata("CookieJD"),
          $.getdata("CookieJD2"),
          ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
    
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i =0; i < cookiesArr.length; i++) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      message = ''
      $.isLogin = true;
      $.index = i + 1;
       console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
      await getlist()
      await quiz()
      await Zy()
  }
for(let i = 0; i < cookiesArr.length; i++){
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      message = ''
      $.isLogin = true;
      $.index = i + 1;
       console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}助力模块*********\n`);
      await control()
      await zy()
      await formatcode()
}

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    

function PostRequest(uri,body) {
  const url = `https://api.m.jd.com/api/${uri}`;
  const method = `POST`;
  const headers = {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "application/x-www-form-urlencoded","Cookie": cookie,"Host": "api.m.jd.com","Origin": "https://electricsuper.jd.com","Referer": "https://electricsuper.jd.com/?lng=121.406936&lat=31.363832&sid=8610c0280494250aa210ed252f7ad28w&un_area=13_1016_47166_57860","User-Agent": "jdapp;iPhone;10.2.2;14.4;0bcbcdb2a68f16cf9c9ad7c9b944fd141646a849;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/2377723269;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}
  return {url: url, method: method, headers: headers, body: body};
}
function PostRequests(body) {
  const url = `https://api.m.jd.com/api`;
  const method = `POST`;
  const headers = {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Content-Type": "application/x-www-form-urlencoded","Cookie": cookie,"Host": "api.m.jd.com","Origin": "https://electricsuper.jd.com","Referer": "https://electricsuper.jd.com/?lng=121.406936&lat=31.363832&sid=8610c0280494250aa210ed252f7ad28w&un_area=13_1016_47166_57860","User-Agent": "jdapp;iPhone;10.2.2;14.4;0bcbcdb2a68f16cf9c9ad7c9b944fd141646a849;M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/2377723269;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"}
  return {url: url, method: method, headers: headers, body: body};
}
function GetRequest(uri) {
  const url = `https://brandquiz.m.jd.com/api/${uri}`;
  const method = `GET`;
  const headers = {"Accept": "application/json, text/plain, */*","Accept-Encoding": "gzip, deflate, br","Accept-Language": "zh-cn","Connection": "keep-alive","Cookie": cookie,"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"};
  return {url: url, method: method, headers: headers};
}


async function quiz(){
 const body = `appid=apple-jd-aggregate&functionId=brandquiz_prod&body={"quizId":3,"quizStr":"${distinct(brandlistArr)}","predictId":null,"apiMapping":"/api/index/quiz"}&t=1635840868162&loginType=2`
 const MyRequest = PostRequest(`index/quiz`,body)
 return new Promise((resolve) => {
   $.post(MyRequest,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result && result.code && result.code == 200){
           console.log("\n竞猜成功，获得"+result.data.beanNum+"豆豆\n开奖时间为:"+data.match(/\d+月\d+日/)+" 10:00 \n下轮竞猜时间为："+result.data.nextQuizDate)
   await $.wait(8000)
        }else{
           $.log(result.msg+"\n")
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function control(){
      await first()
      await getshareid()
}
async function first(){
const body = `appid=apple-jd-aggregate&functionId=brandquiz_prod&body=%7B%22quizId%22:3,%22apiMapping%22:%22/api/support/getSupport%22%7D&t=${new Date().getTime()}&loginType=2`
 const MyRequest = PostRequests(body)
 return new Promise((resolve) => {
    $.post(MyRequest,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function getshareid(){
 const body = `appid=apple-jd-aggregate&functionId=brandquiz_prod&body={"quizId":3,"apiMapping":"/api/support/getSupport"}&t=${new Date().getTime()}&loginType=2`
 const MyRequest = PostRequests(body)
 return new Promise((resolve) => {
    $.post(MyRequest,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result && result.code && result.code == 200){
         
$.log("互助码："+result.data.shareId+"\n")
shareidArr.push(result.data.shareId)
await $.wait(8000)
//await zy()
        }else{
           $.log("😫"+result.msg+"\n")
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }

async function Zy(){
   brandlistArr.splice(0,brandlistArr.length);
}

async function dosupport(shareid){
 const body = `appid=apple-jd-aggregate&functionId=brandquiz_prod&body={"shareId":"${shareid}","apiMapping":"/api/support/doSupport"}&t=${new Date().getTime()}&loginType=2`
 const MyRequest = PostRequests(body)
 return new Promise((resolve) => {
    $.post(MyRequest,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        $.log(data)
        if(result && result.code && result.code == 200 && result.data == 7){
         console.log("助力成功\n")
        }else if(result.data == 1){
           $.log("😫助力失败,不能助力自己\n")
        }else if(result.data == 3){
           $.log("😫助力失败,已经助力过了\n")
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function zy(){
for(let i = 0; i < distinct(shareidArr).length;i++){
console.log("开始内部助力"+shareidArr[i]+"\n")
await dosupport(shareidArr[i])
await $.wait(8000)
}
}
async function getlist(){
 const body = `appid=apple-jd-aggregate&functionId=brandquiz_prod&body={"apiMapping":"/api/index/indexInfo"}&t=${new Date().getTime()}&loginType=2`
 const MyRequest = PostRequests(body)
 return new Promise((resolve) => {
    $.post(MyRequest,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result && result.code && result.code == 200){
       
       console.log(result.data.listName+"\n")
      for(let i = 0; i < 5; i++){
       let numberid = result.data.brandWall[i].id.match(/\w+/)
       brandlistArr.push(numberid)
      }
$.log("榜单获取成功"+distinct(brandlistArr))
await $.wait(8000)
        }else{
           $.log("😫"+result.msg+"\n")
        }
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }

//showmsg
//boxjs设置tz=1，在12点<=20和23点>=40时间段通知，其余时间打印日志

async function showmsg() {
    if (tz == 1) {
      if ($.isNode()) {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          await notify.sendNotify($.name, message)
        } else {
          $.log(message)
        }
      } else {
        if ((hour == 12 && minute <= 20) || (hour == 23 && minute >= 40)) {
          $.msg(zhiyi, '', message)
        } else {
          $.log(message)
        }
      }
    } else {
      $.log(message)
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
function distinct(array){
 return Array.from(new Set(array));
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
