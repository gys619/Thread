/*
京东超级盲盒
活动入口：京东APP --我的--超级盲盒
更新时间：2022-06-03
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#京东超级盲盒
0 20 3,17 6 * jd_supermh.js, tag=京东超级盲盒, img-url=https://raw.githubusercontent.com/tsukasa007/icon/master/jd_joypark_task.png, enabled=true
*/

const $ = new Env('京东超级盲盒');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
const linkId = 'Jim-Gu6R_lyd4LT6nz69ow';
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => { cookiesArr.push(jdCookieNode[item]) })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
$.invitePinTaskList = []
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { "open-url": "https://bean.m.jd.com/" }); return;
  }

  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      UA = await getUa();
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await run();
    }
  }

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


async function run() {
  try {
    info = await starShopPageInfo();
    if (info.planDrawTime <= (new Date).getTime()) {
      console.log('开始抽奖拉！');
      await starShopDraw()
    } else {
      console.log('还没有到开奖时间');
    }
    if (info.currentGoodRoleValue != info.goodRoleValue) {
      await getTaskList();
      // 签到 / 逛会场 / 浏览商品
      for (const task of $.taskList) {
        if (task.taskType === 'SIGN') {
          $.log(`${task.taskTitle} 签到`)
          await apDoTask(task.id, task.taskType, undefined);
          // $.log(`${task.taskTitle} 领取签到奖励`)
          // await apTaskDrawAward(task.id, task.taskType);
        }
        if (task.taskType === 'BROWSE_CHANNEL') {
          $.log(`${task.taskTitle} `)
          await apDoTask(task.id, task.taskType, encodeURIComponent(task.taskSourceUrl));
          // $.log(`${task.taskTitle} 领取奖励`)
          // await apTaskDrawAward(task.id, task.taskType);
        }
        if (task.taskType === 'BROWSE_PRODUCT') {
          let productList = await apTaskDetail(task.id, task.taskType);
          let productListNow = 0;
          if (productList.length === 0) {
            let resp = await apTaskDrawAward(task.id, task.taskType);
            if (!resp.success) {
              $.log(`${task.taskTitle} 领取完成!`)
              productList = await apTaskDetail(task.id, task.taskType);

            }
          }
          //做
          while (task.taskLimitTimes - task.taskDoTimes >= 0) {
            if (productList.length === 0) {
              $.log(`${task.taskTitle} 活动火爆，素材库没有素材，我也不知道啥回事 = = `);
              break;
            }
            $.log(`${task.taskTitle} ${task.taskDoTimes}/${task.taskLimitTimes}`);
            let resp = await apDoTask(task.id, task.taskType, productList[productListNow].itemId, productList[productListNow].appid);
            if (resp.code === 2005 || resp.code === 0) {
              $.log(`${task.taskTitle} 任务完成！`)
            } else {
              $.log(`${resp.echo} 任务失败！`)
            }
            await $.wait(1000)
            productListNow++;
            task.taskDoTimes++;
            if (!productList[productListNow]) {
              break
            }
          }
          //领
          for (let j = 0; j < task.taskLimitTimes; j++) {
            let resp = await apTaskDrawAward(task.id, task.taskType);
            if (!resp.success) {
              $.log(`${task.taskTitle} 领取完成!`)
              break
            }
          }
        }
      }
    } else {
      console.log('你已经做完任务等待开奖吧！');
    }
  } catch (error) {
    console.log(error)
  }
}

//任务列表
function getTaskList() {
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl('apTaskList', { "linkId": linkId }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          $.taskList = data.data
          if (data.success) {
            $.log('=== 任务列表 start ===')
            for (const row of $.taskList) {
              $.log(`${row.taskTitle} ${row.taskDoTimes}/${row.taskLimitTimes}`)
            }
            $.log('=== 任务列表 end  ===')
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

function apDoTask(taskId, taskType, itemId = '') {
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl('apDoTask', { "taskType": taskType, "taskId": taskId, "channel": 4, "linkId": linkId, "itemId": itemId }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code == 0) {
            console.log('任务完成，成功！');
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

function apTaskDetail(taskId, taskType) {
  //await $.wait(20)
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl('apTaskDetail', { "taskType": taskType, "taskId": taskId, "channel": 4, "linkId": linkId }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`apTaskDetail API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (!data.success) {
            $.taskDetailList = []
          } else {
            $.taskDetailList = data.data.taskItemList;
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        if (!data.success) {
          resolve([]);
        } else {
          resolve(data.data.taskItemList);
        }
      }
    })
  })
}

function apTaskDrawAward(taskId, taskType) {
  return new Promise(resolve => {
    $.post(taskPostClientActionUrl('apTaskDrawAward', { "taskType": taskType, "taskId": taskId, "linkId": linkId }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`apTaskDrawAward API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          $.log("领取奖励")
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function starShopPageInfo() {
  body = { "taskId": "", "encryptionPin": "", "linkId": linkId }
  opt = {
    url: `https://api.m.jd.com/?functionId=starShopPageInfo&appid=activities_platform&body=${encodeURIComponent(JSON.stringify(body))}&_t=${(new Date).getTime()}&cthr=1`,
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Origin': 'https://pro.m.jd.com/',
      'Referer': `https://pro.m.jd.com/`,
      'Cookie': cookie + "cid=3",
    }
  }
  return new Promise(resolve => {
    $.get(opt, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`starShopPageInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code == 0) {
            res = data.data
          } else {
            console.log(`失败原因: ${data.errMsg}`);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(res);
      }
    })
  })
}

function starShopDraw() {
  body = { "linkId": linkId }
  opt = {
    url: `https://api.m.jd.com/?functionId=starShopDraw&appid=activities_platform&body=${encodeURIComponent(JSON.stringify(body))}&_t=${(new Date).getTime()}&cthr=1`,
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Origin': 'https://pro.m.jd.com/',
      'Referer': `https://pro.m.jd.com/`,
      'Cookie': cookie + "cid=3",
    }
  }
  return new Promise(resolve => {
    $.get(opt, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`starShopDraw API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.code == 0) {
            console.log(data.data);
          } {
            console.log(`失败原因: ${data.errMsg}`);
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

function taskPostClientActionUrl(functionId, body, time = (new Date).getTime(), h5st) {
  bodyinfo = `${functionId ? `functionId=${functionId}` : ``}&appid=activities_platform&body=${JSON.stringify(body)}&t=${time}&cthr=1`
  if (h5st) {
    bodyinfo += `&h5st=${encodeURIComponent(h5st)}`
  }
  return {
    url: `https://api.m.jd.com`,
    body: bodyinfo,
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Origin': 'https://pro.m.jd.com/',
      'Referer': `https://pro.m.jd.com/`,
      'Cookie': cookie + "cid=3",
    }
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

async function getUa() {
  for (var t = "", n = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", r = 0; r < 16; r++) {
    var i = Math.round(Math.random() * (n.length - 1));
    t += n.substring(i, i + 1)
  }
  uuid = Buffer.from(t, 'utf8').toString('base64')
  ep = encodeURIComponent(JSON.stringify({ "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=", "ts": (new Date).getTime(), "ridx": -1, "cipher": { "sv": "CJK=", "ad": uuid, "od": "CNKmCNKmCNKjCNKmCM0mCNKmBJKmCNKjCNKmCNKmCNKmCNKm", "ov": "Ctu=", "ud": uuid }, "ciphertype": 5, "version": "1.2.0", "appname": "com.jd.jdlite" }))
  return `jdltapp;android;3.8.16;;;appBuild/2314;ef/1;ep/${ep};Mozilla/5.0 (Linux; Android 10; WLZ-AN01 Build/HUAWEIWLZ-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045837 Mobile Safari/537.36`
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,a]=i.split("@"),n={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),a=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(a);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:a}=t,n=s.decode(a,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:a}=t,n=i.decode(a,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:a,body:n},n)},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}