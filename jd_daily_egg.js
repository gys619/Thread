/*
Last Modified time: 2020-11-20 14:11:01
活动入口：京东金融-天天提鹅
定时收鹅蛋,兑换金币
cron "10 * * * *" jd_daily_egg.js
*/
const $ = new Env('天天提鹅');
let cookiesArr = [], cookie = '';
const JD_API_HOST = 'https://ms.jr.jd.com/gw/generic/uc/h5/m';
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const dailyEggUrl = "https://active.jd.com/forever/btgoose/?channelLv=yxjh&jrcontainer=h5&jrlogin=true"
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const { JSDOM } = $.isNode() ? require('jsdom') : '';
const { window } = new JSDOM(``, { url: dailyEggUrl, runScripts: "outside-only", pretentToBeVisual: true, resources: "usable" })
const Faker = require('./utils/JDSignValidator.js')
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  window.eval(evalStr())
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      $.stopNext = false
      await TotalBean();
      console.log(`\n***********开始【京东账号${$.index}】${$.nickName || $.UserName}********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      const fakerBody = Faker.getBody(dailyEggUrl)
      $.fp = fakerBody.fp
      $.eid = await getClientData(fakerBody)
      $.token = (await downloadUrl("https://gia.jd.com/m.html")).match(/var\s*?jd_risk_token_id\s*?=\s*["`'](\S*?)["`'];?/)?.[1] || ""
      await jdDailyEgg();
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
async function jdDailyEgg() {
  await toDailyHome()
  if ($.stopNext) return
  await toWithdraw()
  await toGoldExchange();
}

function toGoldExchange() {
  return new Promise(async resolve => {
    const body = getBody()
    $.get(taskUrl('toGoldExchange', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            // console.log(data)
            data = JSON.parse(data);
            if (data.resultCode === 0) {
              if (data.resultData.code === '0000') {
                console.log(`兑换金币:${data.resultData.data.cnumber}`);
                console.log(`当前总金币:${data.resultData.data.goldTotal}`);
              } else if (data.resultData.code !== '0000') {
                console.log(`兑换金币失败:${data.resultData.msg}`)
              }
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
function toWithdraw() {
  return new Promise(async resolve => {
    const body = getBody()
    $.get(taskUrl('toWithdraw', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            // console.log(data)
            data = JSON.parse(data);
            if (data.resultCode === 0) {
              if (data.resultData.code === '0000') {
                console.log(`收取鹅蛋:${data.resultData.data.eggTotal}个成功`);
                console.log(`当前总鹅蛋数量:${data.resultData.data.userLevelDto.userHaveEggNum}`);
              } else if (data.resultData.code !== '0000') {
                console.log(`收取鹅蛋失败:${data.resultData.msg}`)
              }
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
function toDailyHome() {
  return new Promise(async resolve => {
    const body = getBody(false)
    $.get(taskUrl('toDailyHome', body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            // console.log(data)
            data = JSON.parse(data);
            if (data.resultData.code !== "0000") {
              $.stopNext = true
              console.log($.name+"："+data.resultData.msg)
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
function getBody(withSign = true) {
  const riskDeviceInfo = JSON.stringify({
    eid: $.eid,
    fp: $.fp,
    token: $.token
  })
  const signData = {
    channelLv: "yxjh",
    environment: "jrApp",
    riskDeviceInfo,
    shareUuid: "uuid",
  }
  if (!withSign) {
    return {
      ...signData,
      timeSign: Math.random(),
    }
  }
  $.aar = new window.AAR()
  const nonce = $.aar.nonce()
  const signature = $.aar.sign(JSON.stringify(signData), nonce)
  return {
    ...signData,
    timeSign: Math.random(),
    nonce,
    signature,
  }
}

function taskUrl(function_id, body) {
  return {
    url: `${JD_API_HOST}/${function_id}?reqData=${JSON.stringify(body)}`,
    headers: {
      'Accept' : `application/json`,
      'Origin' : `https://active.jd.com`,
      'Accept-Encoding' : `gzip, deflate, br`,
      'Cookie' : cookie,
      'Content-Type' : `application/x-www-form-urlencoded;charset=UTF-8`,
      'Host' : `ms.jr.jd.com`,
      'Connection' : `keep-alive`,
      'User-Agent' : $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Referer' : dailyEggUrl,
      'Accept-Language' : `zh-cn`
    }
  }
}
function getClientData(fakerBody) {
  return new Promise(resolve => {
    const options = {
      url: `https://gia.jd.com/fcf.html?a=${fakerBody.a}`,
      body: `d=${fakerBody.d}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${JSON.stringify(arguments)}: API查询请求失败 ‼️‼️`)
          throw new Error(err);
        } else {
          if (data.indexOf("*_*") > 0) {
            data = data.split("*_*", 2);
            data = JSON.parse(data[1]).eid;
          } else {
            console.log(`京东api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data || "");
      }
    })
  })
}
function downloadUrl(url) {
  return new Promise(resolve => {
    const options = {
      url, "timeout": 10000, followRedirect: false, headers: {
        'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      }
    };
    $.get(options, async (err, resp, data) => {
      let res = ""
      try {
        if (err) {
          console.log(`⚠️网络请求失败`);
        } else {
          res = data;
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(res);
      }
    })
  })
}
function evalStr() {
  return `var _0x3823=['padding','199185QuttXH','iterate','floor','prototype','utf8StrToBytes','ffj','intArrayToByteArray','593374kRBQQV','charCodeAt','cycleLeft','longToByte','encode','12fwElZO','dataBuf','ivByte','update','BLOCK_BYTE_LEN','toCharCodeArray','65147nNfFIK','length','744599cVhpRh','1EiSzxy','1jqjAnx','ggj','ceil','expand','doFinal','join','40042ROkuIV','intToByte','vbuf','random','3318840JyJLCj','byteToInt','452844zJegOP','arrayCopy','byteArrayToIntArray','now','dataBufLen','totalLen'];var _0x59f2=function(_0x4651b4,_0x42db5a){_0x4651b4=_0x4651b4-0x88;var _0x382327=_0x3823[_0x4651b4];return _0x382327;};var _0x44dc76=_0x59f2;(function(_0x18e1aa,_0x3bb8ec){var _0x896a1d=_0x59f2;while(!![]){try{var _0x412956=parseInt(_0x896a1d(0x88))*-parseInt(_0x896a1d(0x8e))+-parseInt(_0x896a1d(0xa5))+-parseInt(_0x896a1d(0x92))*parseInt(_0x896a1d(0x90))+-parseInt(_0x896a1d(0x9e))+-parseInt(_0x896a1d(0x98))+-parseInt(_0x896a1d(0xac))*parseInt(_0x896a1d(0x91))+parseInt(_0x896a1d(0x9c));if(_0x412956===_0x3bb8ec)break;else _0x18e1aa['push'](_0x18e1aa['shift']());}catch(_0x599f97){_0x18e1aa['push'](_0x18e1aa['shift']());}}}(_0x3823,0x7bc98));function AAR(){var _0x38eee4=_0x59f2;this[_0x38eee4(0x8a)]=new Array(0x73,0x80,0x16,0x6f,0x49,0x14,0xb2,0xb9,0x17,0x24,0x42,0xd7,0xda,0x8a,0x6,0x0,0xa9,0x6f,0x30,0xbc,0x16,0x31,0x38,0xaa,0xe3,0x8d,0xee,0x4d,0xb0,0xfb,0xe,0x4e),this['iv']=Decoder[_0x38eee4(0xa0)](this['ivByte']),this['tj']=new Array(0x40),this[_0x38eee4(0x8c)]=0x40,this['vbuf']=new Array(0x8),this[_0x38eee4(0x89)]=new Array(0x40),this[_0x38eee4(0xa2)]=0x0,this[_0x38eee4(0xa3)]=0x0;for(var _0x2dee27=0x0;_0x2dee27<0x40;_0x2dee27++){_0x2dee27<=0xf?this['tj'][_0x2dee27]=0x79cc4519:this['tj'][_0x2dee27]=0x7a879d8a;}Decoder[_0x38eee4(0x9f)](this['iv'],0x0,this[_0x38eee4(0x9a)],0x0,this[_0x38eee4(0x9a)][_0x38eee4(0x8f)]);}AAR[_0x44dc76(0xa8)]={'ffj':function(_0x19947d,_0x1726ef,_0x5c911f,_0x2d9e8a){var _0x42a126;return _0x2d9e8a<=0xf?_0x42a126=_0x19947d^_0x1726ef^_0x5c911f:_0x42a126=_0x19947d&_0x1726ef|_0x19947d&_0x5c911f|_0x1726ef&_0x5c911f,_0x42a126;},'ggj':function(_0xe25e0e,_0x5ea652,_0x5ca54f,_0x42f8c7){var _0x524292=0x0;return _0x42f8c7<=0xf?_0x524292=_0xe25e0e^_0x5ea652^_0x5ca54f:_0x524292=_0xe25e0e&_0x5ea652|~_0xe25e0e&_0x5ca54f,_0x524292;},'p0':function(_0x15e5aa){return _0x15e5aa^(_0x15e5aa<<0x9|_0x15e5aa>>>0x20-0x9)^(_0x15e5aa<<0x11|_0x15e5aa>>>0x20-0x11);},'p1':function(_0x49417f){return _0x49417f^(_0x49417f<<0xf|_0x49417f>>>0x20-0xf)^(_0x49417f<<0x17|_0x49417f>>>0x20-0x17);},'cycleLeft':function(_0x4a7de6,_0x49b7aa){return _0x4a7de6<<_0x49b7aa|_0x4a7de6>>>0x20-_0x49b7aa;},'padding':function(_0x350854){var _0x36a38d=_0x44dc76,_0x21f769=0x0,_0x268667=_0x350854['length'],_0x1e6231;return _0x21f769=0x40-(_0x268667+0x1+0x8)%0x40,_0x21f769>=0x40&&(_0x21f769=0x0),_0x1e6231=new Array(_0x21f769+0x1+_0x268667+0x8),_0x1e6231[_0x268667]=0x1<<0x7,Decoder[_0x36a38d(0x9f)](_0x350854,0x0,_0x1e6231,0x0,_0x268667),Decoder[_0x36a38d(0x9f)](Decoder[_0x36a38d(0xaf)](this[_0x36a38d(0xa3)]<<0x3),0x0,_0x1e6231,_0x268667+_0x21f769+0x1,0x8),_0x1e6231;},'iterate':function(_0x293a95){var _0x43bbd9=_0x44dc76,_0x449a18=_0x293a95[_0x43bbd9(0x8f)],_0x22a315=parseInt(_0x449a18/0x10),_0x18259b,_0x122239,_0x392dce;_0x18259b=this[_0x43bbd9(0x9a)],_0x122239=new Array(0x10);for(var _0x2f7ba7=0x0;_0x2f7ba7<_0x22a315;_0x2f7ba7++){Decoder[_0x43bbd9(0x9f)](_0x293a95,_0x2f7ba7*0x10,_0x122239,0x0,_0x122239[_0x43bbd9(0x8f)]),_0x392dce=this[_0x43bbd9(0x95)](_0x122239),_0x18259b=this['cf'](_0x18259b,_0x392dce[0x0],_0x392dce[0x1]);}Decoder[_0x43bbd9(0x9f)](_0x18259b,0x0,this[_0x43bbd9(0x9a)],0x0,_0x18259b[_0x43bbd9(0x8f)]);},'expand':function(_0x4fb93d){var _0x26de5a=_0x44dc76,_0x3967ae=new Array(0x44),_0x41ecb8=new Array(0x40);Decoder[_0x26de5a(0x9f)](_0x4fb93d,0x0,_0x3967ae,0x0,_0x4fb93d['length']);for(var _0x2aac13=0x10;_0x2aac13<_0x3967ae[_0x26de5a(0x8f)];_0x2aac13++){_0x3967ae[_0x2aac13]=this['p1'](_0x3967ae[_0x2aac13-0x10]^_0x3967ae[_0x2aac13-0x9]^this['cycleLeft'](_0x3967ae[_0x2aac13-0x3],0xf))^this[_0x26de5a(0xae)](_0x3967ae[_0x2aac13-0xd],0x7)^_0x3967ae[_0x2aac13-0x6];}for(var _0x2aac13=0x0;_0x2aac13<_0x41ecb8[_0x26de5a(0x8f)];_0x2aac13++){_0x41ecb8[_0x2aac13]=_0x3967ae[_0x2aac13]^_0x3967ae[_0x2aac13+0x4];}return new Array(_0x3967ae,_0x41ecb8);},'cf':function(_0x52da6e,_0x389661,_0x2155c2){var _0x342848=_0x44dc76,_0x47776e,_0x54cc28,_0x40ee23,_0x2c3878,_0x28f1e3,_0x129754,_0xfe52ef,_0x370ab3,_0x286eeb,_0x1221de,_0x68c96c,_0x3d6bf4,_0x515f8a;_0x54cc28=_0x52da6e[0x0],_0x40ee23=_0x52da6e[0x1],_0x2c3878=_0x52da6e[0x2],_0x28f1e3=_0x52da6e[0x3],_0x129754=_0x52da6e[0x4],_0xfe52ef=_0x52da6e[0x5],_0x370ab3=_0x52da6e[0x6],_0x286eeb=_0x52da6e[0x7];for(var _0x400fbf=0x0;_0x400fbf<0x40;_0x400fbf++){_0x1221de=this[_0x342848(0xae)](this[_0x342848(0xae)](_0x54cc28,0xc)+_0x129754+this['cycleLeft'](this['tj'][_0x400fbf],_0x400fbf),0x7),_0x68c96c=_0x1221de^this['cycleLeft'](_0x54cc28,0xc),_0x3d6bf4=this[_0x342848(0xaa)](_0x54cc28,_0x40ee23,_0x2c3878,_0x400fbf)+_0x28f1e3+_0x68c96c+_0x2155c2[_0x400fbf],_0x515f8a=this[_0x342848(0x93)](_0x129754,_0xfe52ef,_0x370ab3,_0x400fbf)+_0x286eeb+_0x1221de+_0x389661[_0x400fbf],_0x28f1e3=_0x2c3878,_0x2c3878=this[_0x342848(0xae)](_0x40ee23,0x9),_0x40ee23=_0x54cc28,_0x54cc28=_0x3d6bf4,_0x286eeb=_0x370ab3,_0x370ab3=this[_0x342848(0xae)](_0xfe52ef,0x13),_0xfe52ef=_0x129754,_0x129754=this['p0'](_0x515f8a);}return _0x47776e=new Array(0x8),_0x47776e[0x0]=_0x54cc28^_0x52da6e[0x0],_0x47776e[0x1]=_0x40ee23^_0x52da6e[0x1],_0x47776e[0x2]=_0x2c3878^_0x52da6e[0x2],_0x47776e[0x3]=_0x28f1e3^_0x52da6e[0x3],_0x47776e[0x4]=_0x129754^_0x52da6e[0x4],_0x47776e[0x5]=_0xfe52ef^_0x52da6e[0x5],_0x47776e[0x6]=_0x370ab3^_0x52da6e[0x6],_0x47776e[0x7]=_0x286eeb^_0x52da6e[0x7],_0x47776e;},'digest':function(_0x468e24){var _0x58d055=_0x44dc76,_0x216056,_0x4cf359=this[_0x58d055(0xa4)](_0x468e24),_0x29dbde=Decoder[_0x58d055(0xa0)](_0x4cf359);this[_0x58d055(0xa6)](_0x29dbde);var _0x5613ae=this['vbuf'];return _0x216056=Decoder['intArrayToByteArray'](_0x5613ae),_0x216056;},'update':function(_0x59e3b5,_0x2de2b1,_0x6845bf){var _0x19dd02=_0x44dc76,_0x4956ba=parseInt((_0x6845bf+this[_0x19dd02(0xa2)])/0x40);this['totalLen']+=_0x6845bf;if(_0x6845bf+this[_0x19dd02(0xa2)]<this['BLOCK_BYTE_LEN'])Decoder[_0x19dd02(0x9f)](_0x59e3b5,0x0,this[_0x19dd02(0x89)],this[_0x19dd02(0xa2)],_0x6845bf),this['dataBufLen']=_0x6845bf+this['dataBufLen'];else{var _0x224fe6;Decoder[_0x19dd02(0x9f)](_0x59e3b5,0x0,this['dataBuf'],this[_0x19dd02(0xa2)],this[_0x19dd02(0x8c)]-this[_0x19dd02(0xa2)]),_0x224fe6=Decoder[_0x19dd02(0xa0)](this[_0x19dd02(0x89)]),this[_0x19dd02(0xa6)](_0x224fe6);for(var _0x475931=0x1;_0x475931<_0x4956ba;_0x475931++){Decoder[_0x19dd02(0x9f)](_0x59e3b5,_0x475931*this[_0x19dd02(0x8c)]-this[_0x19dd02(0xa2)],this[_0x19dd02(0x89)],0x0,this[_0x19dd02(0x8c)]),_0x224fe6=Decoder['byteArrayToIntArray'](this[_0x19dd02(0x89)]),this['iterate'](_0x224fe6);}Decoder[_0x19dd02(0x9f)](_0x59e3b5,_0x4956ba*this['BLOCK_BYTE_LEN']-this[_0x19dd02(0xa2)],this['dataBuf'],0x0,_0x6845bf-(_0x4956ba*this[_0x19dd02(0x8c)]-this[_0x19dd02(0xa2)])),this[_0x19dd02(0xa2)]=_0x6845bf-(_0x4956ba*this[_0x19dd02(0x8c)]-this[_0x19dd02(0xa2)]);}},'doFinal':function(){var _0x5c70fb=_0x44dc76,_0x249729,_0x9bfc73=new Array(this['dataBufLen']);Decoder[_0x5c70fb(0x9f)](this[_0x5c70fb(0x89)],0x0,_0x9bfc73,0x0,this[_0x5c70fb(0xa2)]);var _0x80f671=this[_0x5c70fb(0xa4)](_0x9bfc73),_0x3d1bbb=Decoder[_0x5c70fb(0xa0)](_0x80f671);this[_0x5c70fb(0xa6)](_0x3d1bbb);var _0x34b324=this[_0x5c70fb(0x9a)];return _0x249729=Decoder[_0x5c70fb(0xab)](_0x34b324),_0x249729;},'sign':function(_0x5e5987,_0x1373cc){var _0x23f404=_0x44dc76,_0x30c6b2=Decoder[_0x23f404(0xa9)](_0x5e5987),_0x37b8e3=Decoder[_0x23f404(0xa9)](_0x1373cc);this['update'](_0x30c6b2,0x0,_0x30c6b2[_0x23f404(0x8f)]),this['update'](this[_0x23f404(0x8a)],0x0,this['ivByte'][_0x23f404(0x8f)]),this[_0x23f404(0x8b)](_0x37b8e3,0x0,_0x37b8e3[_0x23f404(0x8f)]);var _0x755bea=this[_0x23f404(0x96)]();return Decoder['encode'](_0x755bea,0x0,_0x755bea[_0x23f404(0x8f)]);},'nonce':function(){var _0x3176be=_0x44dc76;return Math[_0x3176be(0x94)](Math[_0x3176be(0x9b)]()*0x7fffffff)+''+Math[_0x3176be(0xa7)](Date[_0x3176be(0xa1)]()/0x3e8);}};function Decoder(){}Decoder[_0x44dc76(0xb0)]=function(_0xf4206b,_0x51c2f4,_0x46c172){var _0x54b317=_0x44dc76,_0x2bbfdb=new Array(_0x46c172*0x2),_0x381e73=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');for(var _0x32a251=_0x51c2f4,_0x35b1ae=0x0;_0x32a251<_0x46c172+_0x51c2f4;_0x32a251++,_0x35b1ae++){_0x2bbfdb[_0x35b1ae]=_0x381e73[(_0xf4206b[_0x32a251]&0xff)>>0x4],_0x2bbfdb[++_0x35b1ae]=_0x381e73[_0xf4206b[_0x32a251]&0xf];}return _0x2bbfdb[_0x54b317(0x97)]('');},Decoder['utf8StrToBytes']=function(_0x206c14){var _0x1ba2e5=_0x44dc76,_0x458320=encodeURIComponent(_0x206c14),_0x28769a=unescape(_0x458320),_0x21fbb8=_0x28769a[_0x1ba2e5(0x8f)],_0x56f8c8=[];for(var _0x136a2b=0x0;_0x136a2b<_0x21fbb8;_0x136a2b++){_0x56f8c8[_0x136a2b]=_0x28769a[_0x1ba2e5(0xad)](_0x136a2b);}return _0x56f8c8;},Decoder[_0x44dc76(0x8d)]=function(_0x1c01dc){var _0x5b2993=_0x44dc76,_0x3defb3=new Array(_0x1c01dc[_0x5b2993(0x8f)]);for(var _0x22b0a9=0x0;_0x22b0a9<_0x1c01dc[_0x5b2993(0x8f)];_0x22b0a9++){_0x3defb3[_0x22b0a9]=_0x1c01dc[_0x5b2993(0xad)](_0x22b0a9);}return _0x3defb3;},Decoder[_0x44dc76(0x9f)]=function(_0x1e55c0,_0x4ec325,_0x44720e,_0x4626f0,_0x27a211){var _0x3b5b6c=_0x44dc76,_0xc3a002=_0x27a211;if(_0x4ec325+_0x27a211>_0x1e55c0['length']&&_0x4626f0+_0x27a211<=_0x44720e[_0x3b5b6c(0x8f)])_0xc3a002=_0x1e55c0[_0x3b5b6c(0x8f)]-_0x4ec325;else{if(_0x4626f0+_0x27a211>_0x44720e[_0x3b5b6c(0x8f)]&&_0x4ec325+_0x27a211<=_0x1e55c0['length'])_0xc3a002=_0x44720e['length']-_0x4626f0;else{if(_0x4ec325+_0x27a211<=_0x1e55c0[_0x3b5b6c(0x8f)]&&_0x4626f0+_0x27a211<=_0x44720e['length'])_0xc3a002=_0x27a211;else _0x44720e['length']<_0x1e55c0[_0x3b5b6c(0x8f)]?_0xc3a002=_0x44720e[_0x3b5b6c(0x8f)]-_0x4626f0:_0xc3a002=_0x1e55c0[_0x3b5b6c(0x8f)]-_0x4626f0;}}for(var _0x2a5aa8=0x0;_0x2a5aa8<_0xc3a002;_0x2a5aa8++){_0x44720e[_0x2a5aa8+_0x4626f0]=_0x1e55c0[_0x2a5aa8+_0x4ec325];}},Decoder[_0x44dc76(0xaf)]=function(_0x5c2c07){return new Array(0x0,0x0,0x0,0x0,_0x5c2c07>>0x18&0xff,_0x5c2c07>>0x10&0xff,_0x5c2c07>>0x8&0xff,_0x5c2c07&0xff);},Decoder[_0x44dc76(0x99)]=function(_0x5a6969){return new Array(_0x5a6969>>0x18&0xff,_0x5a6969>>0x10&0xff,_0x5a6969>>0x8&0xff,_0x5a6969&0xff);},Decoder[_0x44dc76(0xab)]=function(_0x406ed6){var _0x5944e2=_0x44dc76,_0x198d3e=new Array(_0x406ed6['length']*0x4);for(var _0x240b98=0x0;_0x240b98<_0x406ed6[_0x5944e2(0x8f)];_0x240b98++){Decoder['arrayCopy'](Decoder[_0x5944e2(0x99)](_0x406ed6[_0x240b98]),0x0,_0x198d3e,_0x240b98*0x4,0x4);}return _0x198d3e;},Decoder[_0x44dc76(0x9d)]=function(_0x2275d1,_0x5aab70){var _0x5c48f2=_0x44dc76;if(_0x5aab70+0x3<_0x2275d1[_0x5c48f2(0x8f)])return _0x2275d1[_0x5aab70]<<0x18|_0x2275d1[_0x5aab70+0x1]<<0x10|_0x2275d1[_0x5aab70+0x2]<<0x8|_0x2275d1[_0x5aab70+0x3];else{if(_0x5aab70+0x2<_0x2275d1[_0x5c48f2(0x8f)])return _0x2275d1[_0x5aab70+0x1]<<0x10|_0x2275d1[_0x5aab70+0x2]<<0x8|_0x2275d1[_0x5aab70+0x3];else return _0x5aab70+0x1<_0x2275d1['length']?_0x2275d1[_0x5aab70]<<0x8|_0x2275d1[_0x5aab70+0x1]:_0x2275d1[_0x5aab70];}},Decoder[_0x44dc76(0xa0)]=function(_0x5a20be){var _0x18bcc2=_0x44dc76,_0x50a070=Math['ceil'](_0x5a20be['length']/0x4),_0x391fbf=new Array(_0x50a070);for(var _0x1f6132=0x0;_0x1f6132<_0x5a20be['length'];_0x1f6132++){_0x5a20be[_0x1f6132]=_0x5a20be[_0x1f6132]&0xff;}for(var _0x1f6132=0x0;_0x1f6132<_0x391fbf['length'];_0x1f6132++){_0x391fbf[_0x1f6132]=Decoder[_0x18bcc2(0x9d)](_0x5a20be,_0x1f6132*0x4);}return _0x391fbf;};`;
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
