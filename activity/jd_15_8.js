/*
极速版抢卷

============Quantumultx===============
[task_local]
#极速版抢卷
58 59 8,11,14,16,19 * * * https://raw.githubusercontent.com/KingRan/KR/main/jd_29_8.js, tag=极速版抢卷, enabled=true
================Loon==============
[Script]
cron "58 59 8,11,14,16,19 * * *" script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_29_8.js,tag=极速版抢卷
===============Surge=================
极速版抢卷 = type=cron,cronexp="58 59 8,11,14,16,19 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_29_8.js
============小火箭=========
极速版抢卷 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_29_8.js, cronexpr="58 59 8,11,14,16,19 * * *", timeout=3600, enable=true
 */
const $ = new Env('抢极速版全品卷15-8');
const moment = require('moment');
//进容器安装依赖： npm install -g moment
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送
const randomCount = $.isNode() ? 30 : 5;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action?';
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  await wait(100)
  for (let j = 0; j < randomCount; ++j)
    for (let i = 0;  i < 7; i++) {
      if (cookiesArr[i]) {
        cookie = cookiesArr[i];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.index = i + 1;
        console.log(`*********京东账号${$.index} ${$.UserName}*********`)
        $.isLogin = true;
        $.nickName = '';
        message = '';
        await qiang();
      }
    }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function qiang() {
  await exchange()
}

function exchange() {
  return new Promise(resolve => {
    $.post(taskUrl('functionId=lite_newBabelAwardCollection'), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} user/exchange/bean API请求失败，请检查网路重试\n`)
        } else {
          console.log(moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
          console.log(data);
          if (safeGet(data)) {
            data = JSON.parse(data);
            console.log(`抢券结果：${JSON.stringify(data)}\n`)
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

var _0xodK='jsjiami.com.v6',_0xodK_=['_0xodK'],_0xc073=[_0xodK,'\x68\x74\x74\x70\x73\x3a\x2f\x2f\x61\x70\x69\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x63\x6c\x69\x65\x6e\x74\x2e\x61\x63\x74\x69\x6f\x6e\x3f\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64\x3d\x6e\x65\x77\x42\x61\x62\x65\x6c\x41\x77\x61\x72\x64\x43\x6f\x6c\x6c\x65\x63\x74\x69\x6f\x6e\x26\x63\x6c\x69\x65\x6e\x74\x3d\x77\x68\x35','\x2a\x2f\x2a','\x67\x7a\x69\x70\x2c\x20\x64\x65\x66\x6c\x61\x74\x65\x2c\x20\x62\x72','\x7a\x68\x2d\x63\x6e','\x6b\x65\x65\x70\x2d\x61\x6c\x69\x76\x65','\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x78\x2d\x77\x77\x77\x2d\x66\x6f\x72\x6d\x2d\x75\x72\x6c\x65\x6e\x63\x6f\x64\x65\x64','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x72\x6f\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d','\x68\x74\x74\x70\x73\x3a\x2f\x2f\x70\x72\x6f\x2e\x6d\x2e\x6a\x64\x2e\x63\x6f\x6d\x2f\x6a\x64\x6c\x69\x74\x65\x2f\x61\x63\x74\x69\x76\x65\x2f\x33\x48\x38\x38\x35\x76\x41\x34\x73\x51\x6a\x36\x63\x74\x59\x7a\x7a\x50\x56\x69\x78\x34\x69\x69\x59\x4e\x32\x50\x2f\x69\x6e\x64\x65\x78\x2e\x68\x74\x6d\x6c\x3f\x6c\x6e\x67\x3d\x31\x30\x36\x2e\x34\x37\x36\x36\x31\x37\x26\x6c\x61\x74\x3d\x32\x39\x2e\x35\x30\x32\x36\x37\x34\x26\x73\x69\x64\x3d\x66\x62\x63\x34\x33\x37\x36\x34\x33\x31\x37\x66\x35\x33\x38\x62\x39\x30\x65\x30\x66\x39\x61\x62\x34\x33\x63\x38\x32\x38\x35\x77\x26\x75\x6e\x5f\x61\x72\x65\x61\x3d\x34\x5f\x35\x30\x39\x35\x32\x5f\x31\x30\x36\x5f\x30','\x69\x73\x4e\x6f\x64\x65','\x65\x6e\x76','\x4a\x44\x5f\x55\x53\x45\x52\x5f\x41\x47\x45\x4e\x54','\x2e\x2f\x55\x53\x45\x52\x5f\x41\x47\x45\x4e\x54\x53','\x55\x53\x45\x52\x5f\x41\x47\x45\x4e\x54','\x67\x65\x74\x64\x61\x74\x61','\x4a\x44\x55\x41','\x6a\x64\x61\x70\x70\x3b\x69\x50\x68\x6f\x6e\x65\x3b\x39\x2e\x34\x2e\x34\x3b\x31\x34\x2e\x33\x3b\x6e\x65\x74\x77\x6f\x72\x6b\x2f\x34\x67\x3b\x4d\x6f\x7a\x69\x6c\x6c\x61\x2f\x35\x2e\x30\x20\x28\x69\x50\x68\x6f\x6e\x65\x3b\x20\x43\x50\x55\x20\x69\x50\x68\x6f\x6e\x65\x20\x4f\x53\x20\x31\x34\x5f\x33\x20\x6c\x69\x6b\x65\x20\x4d\x61\x63\x20\x4f\x53\x20\x58\x29\x20\x41\x70\x70\x6c\x65\x57\x65\x62\x4b\x69\x74\x2f\x36\x30\x35\x2e\x31\x2e\x31\x35\x20\x28\x4b\x48\x54\x4d\x4c\x2c\x20\x6c\x69\x6b\x65\x20\x47\x65\x63\x6b\x6f\x29\x20\x4d\x6f\x62\x69\x6c\x65\x2f\x31\x35\x45\x31\x34\x38\x3b\x73\x75\x70\x70\x6f\x72\x74\x4a\x44\x53\x48\x57\x4b\x2f\x31','\x62\x6f\x64\x79\x3d\x25\x37\x42\x25\x32\x32\x61\x63\x74\x69\x76\x69\x74\x79\x49\x64\x25\x32\x32\x25\x33\x41\x25\x32\x32\x33\x48\x38\x38\x35\x76\x41\x34\x73\x51\x6a\x36\x63\x74\x59\x7a\x7a\x50\x56\x69\x78\x34\x69\x69\x59\x4e\x32\x50\x25\x32\x32\x25\x32\x43\x25\x32\x32\x73\x63\x65\x6e\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x31\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x72\x67\x73\x25\x32\x32\x25\x33\x41\x25\x32\x32\x6b\x65\x79\x25\x33\x44\x37\x39\x46\x36\x31\x36\x36\x44\x36\x46\x39\x42\x42\x31\x31\x43\x39\x45\x44\x39\x36\x39\x36\x43\x36\x45\x33\x30\x44\x39\x43\x31\x44\x33\x39\x32\x43\x32\x37\x37\x46\x39\x42\x37\x39\x41\x42\x35\x35\x39\x45\x39\x38\x36\x38\x45\x31\x45\x45\x30\x39\x31\x30\x33\x30\x38\x31\x38\x39\x44\x31\x42\x32\x43\x39\x38\x38\x33\x46\x43\x35\x35\x36\x30\x45\x44\x41\x30\x43\x44\x30\x30\x32\x39\x38\x35\x5f\x62\x69\x6e\x67\x6f\x25\x32\x43\x72\x6f\x6c\x65\x49\x64\x25\x33\x44\x43\x36\x44\x43\x45\x39\x34\x45\x31\x34\x43\x30\x42\x45\x45\x34\x35\x34\x45\x41\x39\x36\x34\x35\x30\x39\x46\x34\x42\x32\x36\x43\x5f\x62\x69\x6e\x67\x6f\x25\x32\x43\x73\x74\x72\x65\x6e\x67\x74\x68\x65\x6e\x4b\x65\x79\x25\x33\x44\x31\x39\x46\x35\x31\x32\x44\x43\x44\x38\x45\x45\x33\x34\x41\x42\x45\x39\x43\x34\x46\x42\x34\x41\x39\x32\x43\x32\x46\x34\x32\x41\x33\x45\x34\x46\x31\x44\x32\x32\x37\x46\x31\x36\x42\x43\x33\x32\x36\x34\x34\x39\x37\x42\x32\x30\x42\x35\x34\x44\x33\x33\x46\x35\x5f\x62\x69\x6e\x67\x6f\x25\x32\x32\x25\x37\x44','\x72\x4b\x77\x4d\x6a\x73\x6a\x69\x64\x61\x78\x6d\x57\x5a\x69\x2e\x66\x49\x63\x6f\x62\x6d\x2e\x76\x56\x78\x36\x4a\x3d\x3d'];function _0x32eb(_0x28afc8,_0x8f2f62){_0x28afc8=~~'0x'['concat'](_0x28afc8['slice'](0x0));var _0x4a8489=_0xc073[_0x28afc8];return _0x4a8489;};(function(_0x6420b6,_0xe336fe){var _0x36d291=0x0;for(_0xe336fe=_0x6420b6['shift'](_0x36d291>>0x2);_0xe336fe&&_0xe336fe!==(_0x6420b6['pop'](_0x36d291>>0x3)+'')['replace'](/[rKwMdxWZfIbVxJ=]/g,'');_0x36d291++){_0x36d291=_0x36d291^0xdc10a;}}(_0xc073,_0x32eb));function taskUrl(_0x26a320,_0x474a3c={}){return{'\x75\x72\x6c':_0x32eb('0'),'\x68\x65\x61\x64\x65\x72\x73':{'Accept':_0x32eb('1'),'Accept-Encoding':_0x32eb('2'),'Accept-Language':_0x32eb('3'),'Connection':_0x32eb('4'),'Content-Type':_0x32eb('5'),'origin':_0x32eb('6'),'Referer':_0x32eb('7'),'Cookie':cookie,'User-Agent':$[_0x32eb('8')]()?process[_0x32eb('9')][_0x32eb('a')]?process[_0x32eb('9')][_0x32eb('a')]:require(_0x32eb('b'))[_0x32eb('c')]:$[_0x32eb('d')](_0x32eb('e'))?$[_0x32eb('d')](_0x32eb('e')):_0x32eb('f')},'\x62\x6f\x64\x79':_0x32eb('10')};};_0xodK='jsjiami.com.v6';

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
        "Cookie": cookie,
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
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
