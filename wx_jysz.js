/*

软件名称:微信_金银手指

项目注册地址(微信扫码):https://www.juan920.com/1348.html

(偷别人的,没有就拉下这个脚本)需要依赖 crypto-js.js ，文件地址：https://raw.githubusercontent.com/shaolin-kongfu/js_scripts/main/crypto-js.js

变量抓取:

打开小黄鸟抓包,微信进金银手指界面 找有http://apponlie.sahaj.cn的连接
点进去他的请求头中token 和 User-Agent

必要变量:
soy_wx_jysz_token

可选变量
soy_wx_jysz_User_Agent

多个token用 @ 或 # 或 换行 隔开

v2p配置如下：

【REWRITE】
匹配链接（正则表达式） http://apponlie.sahaj.cn/user/myInfo

对应重写目标   wx_jysz.js

【MITM】  
apponlie.sahaj.cn


cron 0 8-22/1 * * *

*/


const $ = new Env('微信_金银手指');
const notify = $.isNode() ? require('./sendNotify') : '';
const CryptoJS = $.isNode() ? require('./crypto-js'): ''
const app_soy_wx_jysz_token = []
let subTitle = ``;
let status;
status = (status = ($.getval("gk_status") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let soy_wx_jysz_token = $.getdata('soy_wx_jysz_token')

!(async () => {

if ($.isNode()) {
apptz = process.env.apptz;
apptx = process.env.apptx;
appyq = process.env.appyq;
    
    if(!process.env.soy_wx_jysz_token&&process.env.soy_wx_jysz_token==''){
        console.log(`\n【${$.name}】：未填写相对应的变量`);
        return;
    }
        
    if (process.env.soy_wx_jysz_token && process.env.soy_wx_jysz_token.indexOf('@') > -1) {
        soy_wx_jysz_token = process.env.soy_wx_jysz_token.split('@');
    } else if (process.env.soy_wx_jysz_token && process.env.soy_wx_jysz_token.indexOf('\n') > -1) {
        soy_wx_jysz_token = process.env.soy_wx_jysz_token.split('\n');
    } else if(process.env.soy_wx_jysz_token && process.env.soy_wx_jysz_token.indexOf('#') > -1){
        soy_wx_jysz_token = process.env.soy_wx_jysz_token.split('#');
    }else{
        soy_wx_jysz_token = process.env.soy_wx_jysz_token.split();
    };
    
    Object.keys(soy_wx_jysz_token).forEach((item) => {
        if (soy_wx_jysz_token[item]) {
            app_soy_wx_jysz_token.push(soy_wx_jysz_token[item]);
        };
    });

    soy_wx_jysz_User_Agent = process.env.soy_wx_jysz_User_Agent.split()
    
    
}else{
	if (typeof $request !== "undefined") {
    await get_appdata()
  } else{
  app_soy_wx_jysz_token.push($.getdata('soy_wx_jysz_token'))
  soy_wx_jysz_User_Agent = $.getdata('soy_wx_jysz_User_Agent')
  apptz = $.getdata('apptz');
apptx = $.getdata('apptx');
appyq = $.getdata('appyq');
    
    let jyszcount = ($.getval('jyszcount') || '1');
  for (let i = 2; i <= jyszcount; i++) {
    app_soy_wx_jysz_token.push($.getdata(`soy_wx_jysz_token${i}`))
   
}
  }

}
    console.log(
        `\n=== 脚本执行 - 北京时间：${new Date(
        new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
      ).toLocaleString()} ===\n`
    );
    console.log(`===【共 ${app_soy_wx_jysz_token.length} 个账号】===\n`);
    if(!apptz){apptz=true};
    if(!apptx){apptx=true};
      
for (i = 0; i < app_soy_wx_jysz_token.length; i++) {
    soy_wx_jysz_token=app_soy_wx_jysz_token[i]
    
    if(!soy_wx_jysz_User_Agent){
        soy_wx_jysz_User_Agent='Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.13(0x18000d31) NetType/WIFI Language/zh_CN'
    }
    soy_wx_jysz_headers= {"Host": "apponlie.sahaj.cn","Accept": "application/json","Origin": "http://ppllmm.zhuwentao52.top","User-Agent": `${soy_wx_jysz_User_Agent}`,"token": `${soy_wx_jysz_token}`,
      "X-Requested-With": "com.tencent.mm","Referer": "http://ppllmm.zhuwentao52.top/"} 
    
    
    $.index = i + 1;
    
    console.log(`\n开始【第 ${$.index} 个账号任务】`);
    
        await soy_jysz_Info()
        await soy_jysz_fetchTask()
        await soy_jysz_TX_state()
        //await soy_jysz_TX()
    
    
};


//if(apptz){if ($.isNode() ){await notify.sendNotify($.name, subTitle)}};


})()
.catch((e) => $.logErr(e))
.finally(() => $.done());


//获取ck
function get_appdata() {
    //http://apponlie.sahaj.cn/user/myInfo
   if ($request.url.indexOf("myInfo") > -1) {
       const soy_wx_jysz_token = $request.headers.token
   if(soy_wx_jysz_token){
       $.setdata(soy_wx_jysz_token,`soy_wx_jysz_token${status}`)
       //$.log(soy_wx_jysz_token)
   }
   
  const soy_wx_jysz_User_Agent = $request.headers.User-Agent
   if(soy_wx_jysz_User_Agent){
       
       $.setdata(soy_wx_jysz_User_Agent,`soy_wx_jysz_User_Agent${status}`)
       //$.log(soy_wx_jysz_token)
   } 
   
  } 
}

function soy_jysz_Info(){
    return new Promise((resolve, reject) => {
        $.get({
            url : `http://apponlie.sahaj.cn/user/myInfo`,
            headers : soy_wx_jysz_headers,
            //body : "",
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            if(result.code==0){
                gold=result.data.goldNow
                credit = result.data.credit
                txgold=gold/4000*0.4
                //console.log(Math.floor(gold/4000*0.4))
                console.log(`\n【${$.name}---账号 ${$.index} 用户信息】: \n---用户昵称：${result.data.nameNick}\n---用户信用：${credit}\n---当前剩余金币：${gold}\n---可提现金额：${txgold.toFixed(1)}`)
               
            }else{
                console.log(`\n【${$.name}---账号 ${$.index} 用户信息】: ${result.msg}`)
            }
            
            resolve()
        })
    })

}

function soy_jysz_fetchTask() {
    return new Promise((resolve, reject) => {
        $.get({
            url : `http://apponlie.sahaj.cn/task/fetchTask?taskType=1`,
            headers : soy_wx_jysz_headers,
            //body : "",
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            if(result.code==0){
                taskId = result.data.taskId
                TodayCount = result.data.completeTodayCount
                TodayGold = result.data.completeTodayGold
                console.log(`\n【${$.name}---账号 ${$.index} 阅读状态】: \n---今日阅读次数:${TodayCount}\n---今日金币：${TodayGold}`)
                if (TodayCount == 25) {
                    await soy_jysz_taskSeq(1)
                }
                if (TodayCount == 70) {
                    await soy_jysz_taskSeq(2)
                }
                if (taskId == null&&result.data.bizCode==30){
                    console.log(`\n【${$.name}---账号 ${$.index} 阅读状态】:下批文章将在24小时后到来,请自行手动过检测在执行`)
                }
                if (taskId == null&&result.data.bizCode==11){
                    console.log(`\n【${$.name}---账号 ${$.index} 阅读状态】:当天达到上限`)
                }
                if (taskId == null&&result.data.bizCode==10){
                    console.log(`\n【${$.name}---账号 ${$.index} 阅读状态】:下批文章将在60分钟后到达`)
                }
                
                if (taskId !== null) {
                    let key = CryptoJS.enc.Utf8.parse("5kosc7jy2w0fxx3s")
                    let plaintText = `{"taskId":${taskId}}`
                    let jm = CryptoJS.AES.encrypt(plaintText, key, {mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7})
                    await $.wait(Math.floor(Math.random()*(12000-8000+1000)+8000))
                    await soy_jysz_task(jm)
                    
                } 
                
                
            }else{
                console.log(`\n【${$.name}---账号 ${$.index} 阅读状态】: ${result.msg}`)
            }
            resolve()
        })
    })
}

function soy_jysz_taskSeq(type) {
    return new Promise((resolve, reject) => {
        $.post({
            url : `http://apponlie.sahaj.cn/sign/todayAwardGain?taskSeq=${type}`,
            headers : soy_wx_jysz_headers,
            //body : "",
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            console.log(`\n【${$.name}---账号 ${$.index} 每日任务】: ${result.msg}`)

            resolve()
        })
    })
}


function soy_jysz_task(data) {
    return new Promise((resolve, reject) => {
        $.post({
            url : `http://apponlie.sahaj.cn/task/completeTask`,
            headers : {"Accept": "application/json","Content-Type": "application/json;charset=UTF-8","Host": "apponlie.sahaj.cn","Origin": "http://ppllmm.zhuwentao52.top","Referer": "http://ppllmm.zhuwentao52.top","token": soy_wx_jysz_token,"User-Agent": soy_wx_jysz_User_Agent,"X-Requested-With": "com.tencent.mm"
            },
            body : `${data}`,
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            if(result.code==0){
                console.log(`\n【${$.name}---账号 ${$.index} 阅读第${TodayCount+1}次文章】: 获得 ${result.data.goldAward} 金币`)
                await $.wait(Math.floor(Math.random()*(50000-2000+1000)+2000))
                await soy_jysz_fetchTask()
            }else{
              console.log(`\n【${$.name}---账号 ${$.index} 阅读第${TodayCount}次文章】: ${result.msg}`)
            }
            
            resolve()
        })
    })
}

/*
function soy_jysz_TX(txbody) {
    return new Promise((resolve, reject) => {
        $.post({
            url : `http://apponlie.sahaj.cn/task/completeTask`,
            headers : {"Accept": "application/json","Content-Type": "application/json;charset=UTF-8","Host": "apponlie.sahaj.cn","Origin": "http://jjuuii.sahaj.cn","Referer": "http://jjuuii.sahaj.cn","token": soy_wx_jysz_token,"User-Agent": soy_wx_jysz_User_Agent,"X-Requested-With": "com.tencent.mm"},
            body : `${txbody}`,
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            if(result.code==0){
                console.log(`\n【${$.name}---账号 ${$.index} 提现】: 提现成功`)
            }else{
              console.log(`\n【${$.name}---账号 ${$.index} 提现】: ${result.msg}`)
            }
            
            resolve()
        })
    })
}
*/

async function soy_jysz_TX(txbody) {
  return new Promise((resolve) => {
    let tx_url = {
      url: `http://apponlie.sahaj.cn/user/pickAuto`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Host": "apponlie.sahaj.cn",
        "Origin": "http://dd.e-zine.top",
        "Referer": "http://dd.e-zine.top",
        "token": soy_wx_jysz_token,
        "User-Agent": soy_wx_jysz_User_Agent
      },
      body: `${txbody}`,

    }
    $.post(tx_url, async (error, response, data) => {
      try {
        const result = JSON.parse(data)
        //console.log(data)
        if (result.code == 0) {
          console.log(`\n【${$.name}---账号 ${$.index} 提现】: 提现 ${txgold} 元成功`)
        } else {
            console.log(`\n【${$.name}---账号 ${$.index} 提现】: ${result.msg}`)
        }

      } catch (e) {
        //$.logErr(e, response);
      } finally {
        resolve();
      }
    })
  })
}


async function soy_jysz_TX_state() {
    return new Promise((resolve, reject) => {
        $.get({
            url : `http://apponlie.sahaj.cn/user/myInfo`,
            headers : soy_wx_jysz_headers,
            //body : "",
        }, async(error, response, data) => {
            //console.log(data)
            let result = JSON.parse(data)
            if(result.code==0){
                gold=result.data.goldNow
                if (gold >= 4000){
                    /*if(gold>=1.2/0.4*4000){
                    txgold=1.2
                }else if(gold>=0.8/0.4*4000){
                    txgold=0.8
                }else{
                    txgold=0.4
                }*/
                   txgold = Math.floor(gold/4000)*0.4
                   txgold = txgold.toFixed(1)
                    let key = CryptoJS.enc.Utf8.parse("5kosc7jy2w0fxx3s")
                    let plaintText = `{"moneyPick":${txgold}}`
                    let jm = CryptoJS.AES.encrypt(plaintText, key, {mode: CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7})
                    await soy_jysz_TX(jm)
                    
                }else{
                   console.log(`\n【${$.name}---账号 ${$.index} 提现】: 余额不足,无法提现`) 
                }
                
            }else{
                console.log(`\n【${$.name}---账号 ${$.index} 提现信息】: ${result.msg}`)
            }
            
            resolve()
        })
    })
    
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
      } catch {}
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
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
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
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
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
    get(t, e = (() => {})) {
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
    post(t, e = (() => {})) {
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