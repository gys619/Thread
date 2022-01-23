/*
写情书抽京豆
更新时间：2021-12.12
活动入口：写情书抽京豆

已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#写情书抽京豆
1 1,14 12-25 12 * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xqscjd.js, tag=写情书抽京豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true

================Loon==============
[Script]
cron "1 1,14 12-25 12 *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xqscjd.js,tag=写情书抽京豆

===============Surge=================
写情书抽京豆 = type=cron,cronexp="1 1,14 12-25 12 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xqscjd.js

============小火箭=========
写情书抽京豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_xqscjd.js, cronexpr="1 1,14 12-25 12 *", timeout=3600, enable=true

*/
const $ = new Env('写情书抽京豆');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', secretp = '', joyToken = "";
$.shareCoseList = [];
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let receiveBean = 0
const JD_API_HOST = `https://xinrui2-isv.isvjcloud.com`;
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  await getToken();
  cookiesArr = cookiesArr.map(ck => ck  + `joyytoken=50084${joyToken};`)
  $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS
  //做任务
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      $.letterList = [];
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        continue
      }
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      console.log(`\n入口：京东APP主页 ==> 京豆美妆 ==> 右边悬浮 => 写情书抽京豆\n`);
      $.canDo = true
      $.user_id = ""
      $.letterList.length = 0 ;
      receiveBean = 0;
      await getMyToken(`user/token`,`&client=m&url=pengyougou.m.jd.com`);
      $.token = $.tokenList.data
      console.log(`Token:${$.token}\n`)
      //做任务
      await main()
    }
  };
  //助力
if (cookiesArr.length > 1 && $.shareCoseList.length > 0){
    let ran = Math.floor(0+Math.random()*(cookiesArr.length-0));
        let result =[];
        for (let m = result.length; m < cookiesArr.length; m++){
            if (result.indexOf(ran) === -1){
                result.push(ran)
            }else{
                ran = Math.floor(0+Math.random()*(cookiesArr.length-0));
                m--
            }
        }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[result[i]];
        $.haveSeenId = $.UserName;
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = result[i] + 1;
            $.isLogin = true;
            $.nickName = '';
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
                continue
            }
            console.log(`\n******开始内部互助【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            await getMyToken(`user/token`,`&client=m&url=pengyougou.m.jd.com`);
            $.token = $.tokenList.data
            await logIn(`{"token": "${$.token}","source": "01"}`)
            await $.wait(500)
            //console.log(`Token:${$.token}\n`)
            //助力
            for (let y = 0; y < $.shareCoseList.length; y++){
                var judge = "";
                if ($.shareCoseList[y].user === $.UserName || $.shareCoseList[y].seen === true || $.haveSeenId === $.shareCoseList[y].user){
                console.log(`${JSON.stringify($.shareCoseList[y])},${$.haveSeenId}`)
                }else{
                    console.log(`${$.UserName}去助力${$.shareCoseList[y].user},${$.shareCoseList[y].user_id},${$.shareCoseList[y].code_id}`)
                    await getHelp($.shareCoseList[y].user_id, $.shareCoseList[y].code_id, y)
                    /*if (judge === "已被看"){
                        $.shareCoseList[y].seen = true
                        $.haveSeenId = $.shareCoseList[y].user
                    }else if (judge === "今天您已经看过TA的情书"){
                        $.haveSeenId = $.shareCoseList[y].user
                    }*/
                    await $.wait(1000)
                }
                //await $.wait(1000)
            }
        }
    };
}
  if ($.message) await notify.sendNotify(`${$.name}`, `${message}\n`);
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

async function main() {
    try{
        await logIn(`{"token": "${$.token}","source": "01"}`)
        await $.wait(500)
        await getHomePage()
        await getUserInfo()
        await $.wait(500)
        await getTaskList(`task_state`)
        await $.wait(500)
        await getTaskList(`task_info`)
        await $.wait(500)
        if ($.friendNum < 5){
            let r = $.friendNum;
            await getOldshareCose('send_letter_record?page=1&page_num=10')
            for (let q = 1; q * 10 < $.letterNum; q++){
                await getOldshareCose(`send_letter_record?page=${q+1}&page_num=10`)
                await $.wait(300)
            };
            for (let w = 0; w < $.letterList.length; w++){
                for (let e = 0; e < $.letterList[w].length; e++){
                    if($.letterList[w][e].receive_user_id === 0 && r < 5){
                        r++
                        console.log(`助力码：==> 用户ID：${$.user_id},助力码：${$.letterList[w][e].send_id}\n`)
                        $.shareCoseList.push(
                            {
                                "user": $.UserName,
                                "user_id": $.user_id,
                                "code_id": $.letterList[w][e].send_id,
                                "seen": false
                            }
                        )
                    }
                }
            }
            for (let y = r; y < 5; y++){
                await getshareCose('send_love_letter?title=&content=%E6%9D%A5%E5%B8%AE%E5%8A%A9%E6%88%91%E5%90%A7%EF%BC%81&footer=')
                console.log(`助力码：==> 用户ID：${$.code_user},助力码：${$.code_id}\n`)
                $.shareCoseList.push(
                    {
                        "user": $.UserName,
                        "user_id": $.user_id,
                        "code_id": $.code_id,
                        "seen": false
                    }
                )
            }
            //console.log(JSON.stringify($.shareCoseList))
        }
        await $.wait(500)
        for (let doit of $.channel){
            if ($.channelNum < $.channel.length && $.canDo === true){
                console.log(`去关注${doit.name}`)
                await getRewardList(`fertilizer_chanel_view?channel_id=${doit.id}`)
                await $.wait(500)
            } 
        };
        $.canDo = true
        for (let doit of $.shops){
            if ($.shopsNum < $.shops.length && $.canDo === true){
                console.log(`去关注${doit.name}`)
                await getRewardList(`shop_view?shop_id=${doit.id}`)
                await $.wait(500)
            } 
        };
        $.canDo = true
        for (let doit of $.meetingplaces){
            if ($.meetingplacesNum < $.meetingplaces.length && $.canDo === true){
                console.log(`去逛逛${doit.name}`)
                await getRewardList(`meetingplace_view?meetingplace_id=${doit.id}`)
                await $.wait(500)
            } 
        };
        $.canDo = true
        for (let doit of $.prodcuts){
            if ($.prodcutsNum < $.prodcuts.length && $.canDo === true){
                console.log(`去加购${doit.name}`)
                await getRewardList(`product_view?product_id=${doit.id}`)
                await $.wait(500)
            } 
        };
        await getUserInfo()
        await $.wait(500)
        console.log(`可抽奖${$.lottery_number}次`)
        for (let i = 0; i < $.lottery_number; i++){
            console.log(`第${i+1}次抽奖`)
            await lottery();
            await $.wait(1500)
        }
        if (receiveBean !== 0){
            console.log(`【京东账号${$.index}】，本次总共获得${receiveBean}京豆`)
        }
    }catch (e) {
    $.logErr(e)
    }
}

//助力
async function getHelp(send_user_id, send_id, num) {
    try{
        await doHelp(`accept_love_letter?send_user_id=${send_user_id}&send_id=${send_id}`, num)
    }catch (e) {
    $.logErr(e)
    }
}

//登录
function logIn(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("authorized_to_log_in", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} logIn API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            $.access_token = data.access_token
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
};

//活动主页
function getHomePage(body) {
  return new Promise((resolve) => {
    $.get(taskGetUrl('get_home_info?type=1',body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getHomePage API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data);
            //console.log(JSON.stringify(data))
            if (data.new_letter.length !== 0){
              console.log(`有新信件${data.new_letter.name}\n`)
            };
            if (data.new_msg_help.length !== 0){
                //for (let nam of data.new_msg_help){
                    console.log(`有新信件${JSON.stringify(data.new_msg_help)}\n`)
                    //console.log(`有新信件${JSON.stringify(data.new_msg_help)}\n`)
                //}
            }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//用户信息
function getUserInfo(body) {
  return new Promise((resolve) => {
    $.get(taskGetUrl('get_user_info',body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getHomePage API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          //console.log(JSON.stringify(data))
          $.lottery_number = data.lottery_number
          $.user_id = data.id
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//获取助力码
function getshareCose(function_id, body) {
  return new Promise((resolve) => {
    $.post(taskGetUrl(function_id, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} lottery API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data);
            //console.log(JSON.stringify(data)+"<br>")
            $.code_user = data.send_user_id
            $.code_id = data.send_id
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//获取助力码2
function getOldshareCose(function_id, body) {
  return new Promise((resolve) => {
    $.get(taskGetUrl(function_id, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} lottery API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data);
            //console.log(JSON.stringify(data))
            $.letterNum = data.total
            $.letterList.push(data.list)
            //console.log(JSON.stringify($.letterList))
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
//获取列表
function getTaskList(function_id,body) {
  return new Promise((resolve) => {
    $.get(taskGetUrl(function_id,body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getTaskList API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          //console.log(JSON.stringify(data))
          if (function_id === `task_info`){
            $.shops = data.shops;
            $.prodcuts = data.prodcuts;
            $.meetingplaces = data.meetingplaces;
            $.open_card_shops = data.open_card_shops;
            $.channel = data.channel;
          }
          if (function_id === `task_state`){
            $.shopsNum = data.view_shop.length;
            $.prodcutsNum = data.view_product.length;
            $.meetingplacesNum = data.view_meetingplace.length;
            $.open_card_shopsNum = data.open_card.length;
            $.channelNum = data.channel_view.length;
            $.friendNum = data.friend.length
          }
          /*if (data.code === 1) {
              $.allList = data.content
              //console.log(JSON.stringify($.allList));
          } else {
            console.log(`getTaskList：${JSON.stringify(data)}\n`);
          }*/
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//抽奖
function lottery(body) {
  return new Promise((resolve) => {
    $.post(taskGetUrl('lottery',body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} lottery API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data);
            if (data.prize.type === 1){
                console.log(`获得${data.prize.setting.beans_num}京豆\n`)
                receiveBean += parseInt(data.prize.setting.beans_num)
            }else if (data.prize.type === 5){
                console.log(`获得${data.prize.setting.entity_description}\n`)
            }else if (data.prize.type === 0){
                console.log(`获得空气！！\n`)
            }else if (data.prize.type === 2 || data.prize.type === 3){
                console.log(`获得${data.prize.name}优惠券\n`)
            }else{
                console.log(JSON.stringify(data))
            }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//做任务
function getRewardList(functionId) {
  return new Promise((resolve) => {
    $.get(taskGetUrl(functionId,), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getRewardList API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`${JSON.stringify(data)}\n共有${data.lottery_number}次抽奖机会\n`);
          if (data.lottery_number === $.lottery_number){
              $.canDo = false;
            }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//助力
function doHelp(functionId, num) {
  return new Promise((resolve) => {
    $.post(taskGetUrl(functionId), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} lottery API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data);
            //console.log(JSON.stringify(data)+`\n`)
            if (data.is_jump_home === 0 && data.send_info.length !== 0){
                console.log(`助力成功\n`)
                //judge = "已被看"
                $.shareCoseList[num].seen = true
            }else if (data.is_jump_home === 0 && data.msg === "情书已被人抢先一步查看"){
                console.log(`${data.msg}\n`)
                $.shareCoseList[num].seen = true
            }else if (data.is_jump_home === 0 && data.msg === "今天您已经看过TA的情书"){
                console.log(`${data.msg}\n`)
                //judge = "今天您已经看过TA的情书"
                $.haveSeenId = $.shareCoseList[num].user
            }else{
                console.log(JSON.stringify(data))
            }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

function getToken(timeout = 0){
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : `https://bh.m.jd.com/gettoken`,
        headers : {
          'Content-Type' : `text/plain;charset=UTF-8`
        },
        body : `content={"appname":"50084","whwswswws":"","jdkey":"","body":{"platform":"1"}}`
      }
      $.post(url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          joyToken = data.joyytoken;
          console.log(`joyToken = ${data.joyytoken}`)
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

function getMyToken(function_id, body = "") {
  return new Promise(async resolve => {
    const opt = {
      url: `https://jdjoy.jd.com/saas/framework/${function_id}?appId=dafbe42d5bff9d82298e5230eb8c3f79${body}`,
      headers: {
        authority: "jdjoy.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        origin: "https://prodev.m.jd.com",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://prodev.m.jd.com/mall/active/2tqdREcm3YLC8pbNPdvofdAwd8te/index.html?tttparams=&sid=&un_area=",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.post(opt, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
            data = JSON.parse(data);
            if (data.errorCode === null) {
                $.tokenList = data
                //console.log(JSON.stringify(data))
            } else {
                console.log(`失败：${JSON.stringify(data)}`);
            }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}

function taskGetUrl(functionId, body = {}) {
  return {
    url: `${JD_API_HOST}/api/${functionId}`,
    //body: body,
    headers: {
        "Host": "xinrui2-isv.isvjcloud.com",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "Authorization": `Bearer ${$.access_token}`,
        "Cache-Control": "no-cache",
        "User-Agent": "jdapp;android;10.2.2;11;%s;model/Mi 10;osVer/30;appBuild/91077;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045715 Mobile Safari/537.36",
        "Sec-Fetch-Mode": "cors",
        "X-Requested-With": "com.jingdong.app.mall",
        "Sec-Fetch-Site": "same-origin",
        "Referer": "https://xinrui2-isv.isvjcloud.com/beauty-christmas2021",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": cookie,
        "Content-Type": "application/json;charset=UTF-8"
    }
  }
}

function taskPostUrl(functionId, body) {
  return {
    url: `${JD_API_HOST}/api/${functionId}`,
    body: body,
        headers: {
        "Host": "xinrui2-isv.isvjcloud.com",
        "Connection": "keep-alive",
        "Accept": "application/json, text/plain, */*",
        "Authorization": "Bearer undefined",
        "Cache-Control": "no-cache",
        "User-Agent": "jdapp;android;10.2.2;11;%s;model/Mi 10;osVer/30;appBuild/91077;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Mi 10 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045715 Mobile Safari/537.36",
        "Sec-Fetch-Mode": "cors",
        "X-Requested-With": "com.jingdong.app.mall",
        "Sec-Fetch-Site": "same-origin",
        "Referer": "https://xinrui2-isv.isvjcloud.com/beauty-christmas2021",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": cookie,
        "Content-Type": "application/json;charset=UTF-8"
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

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
