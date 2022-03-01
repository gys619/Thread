/*
12.20～12.26 联合开卡 [jd_opencardLH36.js]
开卡脚本，一次性脚本

1.邀请一人20豆(有可能没有豆
2.开11张 成功开1张 可能获得5京豆
  全部开完获得1次抽奖
3.关注10京豆 获得1次抽奖
4.加购5京豆 获得1次抽奖
5.抽奖 
第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 12.20～12.26 联合开卡 (https://3.cn/103-Mi73p)]

请求太频繁会被黑ip
过10分钟再执行


cron:40 0,7 24,25,26 12 *
============Quantumultx===============
[task_local]
#12.20～12.26 联合开卡
40 0,7 24,25,26 12 * https://raw.githubusercontent.com/he1pu/JDHelp/main/jd_opencardLH36.js, tag=12.20～12.26 联合开卡, enabled=true

*/

const $ = new Env('12.20～12.26 联合开卡');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  // return
  $.appkey = '51B59BB805903DA4CE513D29EC448375'
  $.userId = '10299171'
  $.actId = '82243a5746d04_1220'
  $.MixNicks = ''
  $.inviteNick = 'P2sTlitT1/47lgUP4KvMwF4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w=='
  console.log(`活动地址:https://3.cn/103-Mi73p`)
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      message = ""
      $.bean = 0
      $.hotFlag = false
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      await getUA()
      await run();
      if(i == 0 && !$.MixNick) break
      if($.outFlag || $.activityEnd) break
    }
  }
  if($.outFlag) {
    let msg = '此ip已被限制，请过10分钟后再执行脚本'
    $.msg($.name, ``, `${msg}`);
    if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
  try {
    $.hasEnd = true
    $.endTime = 0
    lz_jdpin_token_cookie = ''
    $.Token = ''
    $.Pin = ''
    $.MixNick = ''
    let flag = false
    if($.activityEnd) return
    if($.outFlag){
      console.log('此ip已被限制，请过10分钟后再执行脚本\n')
      return
    }
    await takePostRequest('isvObfuscator');
    if($.Token == ''){
      console.log('获取[token]失败！')
      return
    }
    await takePostRequest('activity_load');
    if($.hotFlag) return
    if(Date.now() > $.endTime){
      $.MixNick = ''
      $.activityEnd = true
      console.log('活动结束')
      return
    }
    if ($.MixNick == '') {
      console.log(`获取cookie失败`); return;
    }
    // console.log($.MixNick)
    // return
    $.toBind = 0
    $.openList = []
    await takePostRequest('绑定');
    await takePostRequest('shopList');
    for(o of $.openList){
      $.missionType = 'openCard'
      if(o.open != true && o.openCardUrl){
        $.openCard = false
        $.joinVenderId = o.userId
        await takePostRequest('mission');
        await $.wait(parseInt(Math.random() * 3000 + 3000, 10))
        if($.openCard == true){
          await joinShop()
          await takePostRequest('activity_load');
          await $.wait(parseInt(Math.random() * 3000 + 3000, 10))
          // break
        }
        $.joinVenderId = ''
      }
    }
    $.joinVenderId = ''
    if($.hasCollectShop === 0){
      // 关注
      $.missionType = 'uniteCollectShop'
      await takePostRequest('mission');
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
    }else{
      console.log('已经关注')
    }
    $.missionType = 'uniteAddCart'
    await takePostRequest('mission');
    await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
    
    await takePostRequest('activity_load');
      $.runFalag = true
      let count = parseInt($.usedChance, 10)
      console.log(`抽奖次数为:${count}`)
      for(m=1;count--;m++){
        console.log(`第${m}次抽奖`)
        await takePostRequest('抽奖');
        if($.runFalag == false) break
        if(Number(count) <= 0) break
        if(m >= 10){
          console.log("抽奖太多次，多余的次数请再执行脚本")
          break
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
      }
    await takePostRequest('myAward');
    await takePostRequest('missionInviteList');
    console.log($.MixNick)
    console.log(`当前助力:${$.inviteNick}`)
    if($.index == 1){
      $.inviteNick = $.MixNick
      console.log(`后面的号都会助力:${$.inviteNick}`)
    }
    await $.wait(parseInt(Math.random() * 1000 + 5000, 10))
    if(flag) await $.wait(parseInt(Math.random() * 1000 + 10000, 10))
    
    if($.index % 3 == 0) console.log('休息1分钟，别被黑ip了\n可持续发展')
    if($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 60000, 10))
    
  } catch (e) {
    console.log(e)
  }
}

async function takePostRequest(type) {
  if($.outFlag) return
  let domain = 'https://jinggengjcq-isv.isvjcloud.com';
  let body = ``;
  let method = 'POST'
  let admJson = ''
  switch (type) {
    case 'isvObfuscator':
      url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`;
      body = `body=%7B%22url%22%3A%22https%3A//jinggengjcq-isv.isvjcloud.com/fronth5/%3Flng%3D0%26lat%3D0%26sid%3D49687cd64aca2ae93aa43748a04e8f6w%26un_area%3D16_1315_1316_53522%23/pages/unitedCardNew20211010-ka/unitedCardNew20211010-ka%3FactId%3D9150e1d16b9d40_10101%22%2C%22id%22%3A%22%22%7D&uuid=b9b4ce69d42dacb64084279d51cdee764d7781fa&client=apple&clientVersion=10.1.4&st=1634100732991&sv=111&sign=67e254ffbcb13be9e12a9782c9cdf398`;
      break;
      case 'activity_load':
        url = `${domain}/dm/front/openCardNew/activity_load?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"jdToken": $.Token, "source": "01", "inviteNick":($.inviteNick || "")}
        if($.joinVenderId) admJson = {...admJson, "shopId": `${$.joinVenderId}`}
        body = taskPostUrl("/openCardNew/activity_load", admJson);
        break;
      case 'shopList':
        url = `${domain}/dm/front/openCardNew/shopList?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {}
        body = taskPostUrl("/openCardNew/shopList", admJson);
        break;
      case '绑定':
        url = `${domain}/dm/front/openCardNew/complete/mission?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"missionType": "relationBind", "inviterNick":($.inviteNick || "")}
        body = taskPostUrl("/openCardNew/complete/mission", admJson);
        break;
      case 'mission':
        url = `${domain}/dm/front/openCardNew/complete/mission?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"missionType": $.missionType}
        if($.joinVenderId) admJson = {...admJson, "shopId": $.joinVenderId}
        body = taskPostUrl("/openCardNew/complete/mission", admJson);
        break;
      case '抽奖':
        url = `${domain}/dm/front/openCardNew/draw/post?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"dataType": "draw", "usedGameNum": "2"}
        body = taskPostUrl("/openCardNew/draw/post", admJson);
        break;
      case 'followShop':
        url = `${domain}/dm/front/openCardNew/followShop?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"actId": $.actId, "missionType": "collectShop"}
        body = taskPostUrl("/openCardNew/followShop", admJson);
        break;
      case 'addCart':
        url = `${domain}/dm/front/openCardNew/addCart?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"actId": $.actId, "missionType": "addCart"}
        body = taskPostUrl("/openCardNew/addCart", admJson);
        break;
      case 'myAward':
        url = `${domain}/dm/front/openCardNew/myAwards?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"pageNo": 1,"pageSize":9999}
        body = taskPostUrl("/openCardNew/myAwards", admJson);
        break;
      case 'missionInviteList':
        url = `${domain}/dm/front/openCardNew/missionInviteList?mix_nick=${$.MixNick || $.MixNicks || ""}`;
        admJson = {"inviteListRequest":{"actId":$.actId,"userId":10299171,"missionType":"shareAct","inviteType": 1,"buyerNick":($.MixNick || '')}}
        body = taskPostUrl("/openCardNew/missionInviteList", admJson);
        break;
      default:
        console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body, method);
    return new Promise(async resolve => {
      $.post(myRequest, (err, resp, data) => {
        try {
          if (err) {
            if(resp && resp.statusCode && resp.statusCode == 493){
              console.log('此ip已被限制，请过10分钟后再执行脚本\n')
              $.outFlag = true
            }
            console.log(`${$.toStr(err,err)}`)
            console.log(`${type} API请求失败，请检查网路重试`)
          } else {
            dealReturn(type, data);
          }
        } catch (e) {
          // console.log(data);
          console.log(e, resp)
        } finally {
          resolve();
        }
      })
    })
  }
  
async function dealReturn(type, data) {
  let res = ''
  try {
    if(type != 'accessLogWithAD' || type != 'drawContent'){
      if(data){
        res = JSON.parse(data);
      }
    }
  } catch (e) {
    console.log(`${type} 执行任务异常`);
    console.log(data);
    $.runFalag = false;
  }
  try {
    let title = ''
    switch (type) {
      case 'isvObfuscator':
        if(typeof res == 'object'){
          if(res.errcode == 0){
            if(typeof res.token != 'undefined') $.Token = res.token
          }else if(res.message){
            console.log(`${type} ${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
        break;
      case 'accessLogWithAD':
      case 'drawContent':
        break;
      case 'activity_load':
      case 'mission':
      case 'shopList':
      case 'loadUniteOpenCard':
      case 'setMixNick':
      case 'uniteOpenCardOne':
      case 'checkOpenCard':
      case 'followShop':
      case 'addCart':
      case 'myAward':
      case 'missionInviteList':
      case '抽奖':
        title = ''
        if(type == "followShop") title = '关注'
        if(type == "addCart") title = '加购'
        if(typeof res == 'object'){
          if(res.success && res.success === true && res.data){
            if(res.data.status && res.data.status == 200){
              res = res.data
              if(type != "setMixNick" && (res.msg || res.data.isOpenCard || res.data.remark)) console.log(`${title && title+":" || ""}${res.msg || res.data.isOpenCard || res.data.remark || ''}`)
              if(type == "activity_load"){
                if(res.msg || res.data.isOpenCard) {
                  if((res.msg || res.data.isOpenCard || '').indexOf('绑定成功') > -1) $.toBind = 1
                }
                if(res.data){
                  $.endTime = res.data.cusActivity.endTime || 0
                  $.MixNick = res.data.buyerNick || ""
                  $.usedChance = res.data.missionCustomer.usedChance || 0
                  $.hasCollectShop = res.data.missionCustomer.hasCollectShop || 0
                }
              }else if(type == "shopList"){
                $.openList = res.data.cusShops || []
              }else if(type == "mission"){
                if(res.data.remark.indexOf('不是会员') > -1){
                  $.openCard = true
                }else{
                  $.openCard = false
                }
              }else if(type == "uniteOpenCardOne"){
                $.uniteOpenCar = res.msg || res.data.msg || ''
              }else if(type == "myAward"){
                console.log(`我的奖品：`)
                let num = 0
                let value = 0
                for(let i in res.data.list || []){
                  let item = res.data.list[i]
                  if(item.awardDes == '20'){
                    num++
                    value = item.awardDes
                  }else{
                    console.log(`${item.awardName}`)
                  }
                }
                if(num > 0) console.log(`邀请好友(${num}):${num*parseInt(value, 10) || 30}京豆`)
              }else if(type == "missionInviteList"){
                console.log(`邀请人数(${res.data.invitedLogList.total})`)
              }
            }else if(res.data.msg){
              console.log(`${title || type} ${res.data.msg || ''}`)
            }else if(res.errorMessage){
              if(res.errorMessage.indexOf('火爆') >-1 ){
                $.hotFlag = true
              }
              console.log(`${title || type} ${res.errorMessage || ''}`)
            }else{
              console.log(`${title || type} ${data}`)
            }
          }else if(res.errorMessage){
            console.log(`${title || type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${title || type} ${data}`)
          }
        }else{
          console.log(`${title || type} ${data}`)
        }
        break;
      default:
        console.log(`${title || type}-> ${data}`);
    }
    if(typeof res == 'object'){
      if(res.errorMessage){
        if(res.errorMessage.indexOf('火爆') >-1 ){
          $.hotFlag = true
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function getPostRequest(url, body, method="POST") {
  let headers = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  }
  if(url.indexOf('https://jinggengjcq-isv.isvjcloud.com') > -1){
    headers["Origin"] = `https://jinggengjcq-isv.isvjcloud.com`
    headers["Content-Type"] = `application/json; charset=utf-8`
    delete headers["Cookie"]
  }
  // console.log(headers)
  // console.log(headers.Cookie)
  return  {url: url, method: method, headers: headers, body: body, timeout:60000};
}


function taskPostUrl(url, t) {
  
  const b = {
    "jsonRpc": "2.0",
    "params": {
      "commonParameter": {
        "appkey": $.appkey,
        "m": "POST",
        "timestamp": Date.now(),
        "userId": $.userId
      },
      "admJson": {
        "actId": $.actId,
        "userId": $.userId,
        ...t,
        "method": url,
        "buyerNick": ($.MixNick || ''),
      }
    },
  }
  if(url.indexOf('missionInviteList') > -1){
    delete b.params.admJson.actId
  }
  return $.toStr(b,b)
}
async function getUA(){
  $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
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

function joinShop() {
  if(!$.joinVenderId) return
  return new Promise(async resolve => {
    $.shopactivityId = ''
    await $.wait(1000)
    await getshopactivityId()
    let activityId = ``
    if($.shopactivityId) activityId = `,"activityId":${$.shopactivityId}`
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"${$.joinVenderId}","shopId":"${$.joinVenderId}","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0${activityId},"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        // console.log(data)
        let res = $.toObj(data);
        if(typeof res == 'object'){
          if(res.success === true){
            console.log(res.message)
            if(res.result && res.result.giftInfo){
              for(let i of res.result.giftInfo.giftList){
                console.log(`入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
              }
            }
          }else if(typeof res == 'object' && res.message){
            console.log(`${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getshopactivityId() {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${$.joinVenderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        let res = $.toObj(data);
        if(res && res.success == true){
          // console.log($.toStr(res.result))
          console.log(`入会:${res.result.shopMemberCardInfo.venderCardName || ''}`)
          $.shopactivityId = res.result.interestsRuleList && res.result.interestsRuleList[0] && res.result.interestsRuleList[0].interestsInfo && res.result.interestsRuleList[0].interestsInfo.activityId || ''
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
