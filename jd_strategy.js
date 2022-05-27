
/*
京东电器巨超值
活动入口：京东电器
活动时间：5月23-5月28 8:0:0
只有今晚了
0 20 * * * jd_strategy.js
移植HW佬
 */

const $ = new Env('电器巨超值-部分加密');

const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;
let cookiesArr = [], cookie = '', message = '';
let shareCode = []
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const JD_API_HOST = 'https://api.m.jd.com/api';
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }
  console.log('自行测试，晚八点看吧。。。')
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await strategy();
	  await $.wait(1000)
    }
  }

    for (let i = 0; i < cookiesArr.length; i++) {
	  if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      try {
        for (let code of shareCode) {
          console.log(`账号${$.index} ${$.UserName} 去助力 ${code.code}`)
          let data = await api({"shareId": code.code, "type": code.type, "apiMapping": "/api/supportTask/doSupport"})
          console.log(data.msg, data.data.status)
        }
      } catch (e) {
        console.log('error', e)
      }
    }
	}

    for (let i = 0; i < cookiesArr.length; i++) {
	  if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      try {
        console.log(`账号${$.index} ${$.UserName}`)
        let res = await api({"apiMapping": "/api/index/indexInfo"})
        for (let t of res.data.track) {
          data = await api({"type": t.type, "apiMapping": "/api/lottery/lottery"})
          console.log('抽奖', data.msg, data.data)
        }
      } catch (e) {
        console.log('error', e)
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


async function strategy() {
  try {
    sign = new QQ00OOO("f093b", "jdltapp;", "7063407705917609");
    await sign.__genAlgo()      
    let  flag = false
    let res = await api({"apiMapping": "/api/index/indexInfo"})
    for (let t of res.data.track) {
      try {
        if (!t.jbeanSuccess && new Date().getHours() > 19) {
          let i = 1
          for (let tp of t.skuList) {
            let data = await api({"type": t.type, "like": 1, "skuId": tp.skuId, "index": i, "apiMapping": "/api/index/vote"})
            console.log(t.type,'投票', data.msg,i)
            if (data.msg.includes('火爆')) {
              flag = true
              break
            }
            i++
          }
          if (!flag) {
            data = await api({"type": t.type, "apiMapping": "/api/lottery/lottery"})
            console.log('抽奖', data.msg, data.data)
          }
        } else {
          console.log(`${t.type} 已完成`)
        }
        data = await api({"type": t.type, "apiMapping": "/api/supportTask/getShareId"})
        console.log(`${t.type} 助力码`, data.data)
        shareCode.push({type: t.type, code: data.data})
      } catch (e) {
        console.log('error', e)
      }
    }
  } catch (e) {
    $.logErr(e)
  }

}


async function api(body) {
  return new Promise(async (resolve) => {
    $.post(taskUrl(body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`doInteractiveAssignment API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            } else {
              console.log(data.msg);
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data)
      }
    })
  })
}

function taskUrl(body = {}) {
let timestamp = Date.now()
let h5st = sign.__genH5st({
    appid: 'reinforceints',
    body: JSON.stringify(body),
    functionId: 'strategy_vote_prod',
    t: timestamp.toString(),
  })
  return {
    url: `${JD_API_HOST}?appid=reinforceints&functionId=strategy_vote_prod&body=${JSON.stringify(body)}&t=${timestamp}&h5st=${h5st}&loginType=2}`,
    headers: {
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://appliances-activity.jd.com',
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Referer': 'https://appliances-activity.jd.com',
      'Cookie': cookie
    }
  }
}


function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2",
      headers: {
        Host: "wq.jd.com",
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
            if (data['retcode'] === 1001) {
              $.isLogin = false; 
              return;
            }
            if (data['retcode'] === 0 && data.data && data.data.hasOwnProperty("userInfo")) {
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
function showMsg() {
  return new Promise(resolve => {
    if (!jdNotify) {
      $.msg($.name, '', `${message}`);
    } else {
      $.log(`京东账号${$.index}${$.nickName}\n${message}`);
    }
    resolve()
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

var OＯ0$='jsjiami.com.v6',OＯ0$_=['‮OＯ0$'],QO$00O=[OＯ0$,'w7QMOMOg','QMKZw6BGEQ==','w6QxVg==','wpRWQUc=','bMKAw4XDpMKww74=','wo8nBcKc','wpvDp1lCFg==','CMOdwo7ConM4w5QK','wpPDqE4=','w54AUsO/w6LDt8Kuw45z','VzNbwpU=','wrxqPMKvfGMQw5M=','wpYmAMKtLcOmDMK+Qw==','OzfCncKCHA==','wpdaCMK+YEEbw40=','wrd9w5w=','ZcKdw6w=','wpbCrD5B','IF9rw6Vefg==','QTNswphqwojDhyA=','SMKWw7c=','wpJTUQ==','w6LCh8KwcSo=','wr3Dlgg5w6AFwonDhxbDnQ==','w6LDkjrDlcOPCcK2bQ==','wr7DtcKw','IcKOBQ==','wq5fRDhDw5Yqw7HCkQ==','woAWw7k2Gw==','wpYgPsK8LMO7A8K0','ecO5OxoC','w6gqFMOz','woHDlDouw4EkwqbCkg==','wrtOQDJD','w7giDcOzwqjCjjnDog==','w5o0w4bDjcKnwph0cW8=','R3wKJBY=','wqLCliBXw5zDm8KR','wo/DnjnDtQ7CtUI=','cCMucHIOakfCp8Om','w6PCisK3diBk','MMKZw73CgBVC','OcOtwp4=','w4LCpsOEeXo=','HcKVck9XPktIIw==','TsO9NcKRw6gRw6/DncKuw6HCkcOQw6fClcK+wpkX','cSlA','w6nCqMK/','w7LCisK6Zjp6w7LCmyzChlNhJw==','w5DCusOddnbCrsKEwr0RPRZgXQjCnXk=','wpvCqMKVHg==','P2rDmw==','T8Oewr5Uw7rDo8OMMyc=','RX7DnsKo','wo3CpjRG','wp3Djx0qw4B3w6fDmkDCisOJw4vCiTVXw7RawrUKU8OBwpIZcsO2wobCkT/DgMOSwqrDnjsPUFLCv1JfwoVZw4J6wqc=','PcKMw6PCrgU=','UsOSwolywoTCk1vDgA==','w7XCisKtcw==','eMOPI3kgw4A=','esKEw4LDsA==','wpAqHsK9MsOm','jsjYiwtamxuiB.cYomS.EvH6uJANd=='];if(function(_0xc5a4ad,_0x4c573c,_0x365fd6){function _0x12917f(_0xf1fa6c,_0x4c5b8,_0x32ac71,_0x56713d,_0x1561ff,_0x549295){_0x4c5b8=_0x4c5b8>>0x8,_0x1561ff='po';var _0x453cad='shift',_0x2913e1='push',_0x549295='‮';if(_0x4c5b8<_0xf1fa6c){while(--_0xf1fa6c){_0x56713d=_0xc5a4ad[_0x453cad]();if(_0x4c5b8===_0xf1fa6c&&_0x549295==='‮'&&_0x549295['length']===0x1){_0x4c5b8=_0x56713d,_0x32ac71=_0xc5a4ad[_0x1561ff+'p']();}else if(_0x4c5b8&&_0x32ac71['replace'](/[YwtxuBYSEHuJANd=]/g,'')===_0x4c5b8){_0xc5a4ad[_0x2913e1](_0x56713d);}}_0xc5a4ad[_0x2913e1](_0xc5a4ad[_0x453cad]());}return 0xe9c91;};function _0x2119e2(){var _0x4a3871={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x1352be,_0x44aa0e,_0x4cfae8,_0x2873c3){_0x2873c3=_0x2873c3||{};var _0x21fbfc=_0x44aa0e+'='+_0x4cfae8;var _0xcda959=0x0;for(var _0xcda959=0x0,_0x4327ca=_0x1352be['length'];_0xcda959<_0x4327ca;_0xcda959++){var _0x160bc9=_0x1352be[_0xcda959];_0x21fbfc+=';\x20'+_0x160bc9;var _0x5c0ef9=_0x1352be[_0x160bc9];_0x1352be['push'](_0x5c0ef9);_0x4327ca=_0x1352be['length'];if(_0x5c0ef9!==!![]){_0x21fbfc+='='+_0x5c0ef9;}}_0x2873c3['cookie']=_0x21fbfc;},'removeCookie':function(){return'dev';},'getCookie':function(_0x48065c,_0x581cc2){_0x48065c=_0x48065c||function(_0x4ec428){return _0x4ec428;};var _0x4bf41e=_0x48065c(new RegExp('(?:^|;\x20)'+_0x581cc2['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x11bdeb=typeof OＯ0$=='undefined'?'undefined':OＯ0$,_0x3e7637=_0x11bdeb['split'](''),_0x29c8eb=_0x3e7637['length'],_0x53c2f3=_0x29c8eb-0xe,_0x18f347;while(_0x18f347=_0x3e7637['pop']()){_0x29c8eb&&(_0x53c2f3+=_0x18f347['charCodeAt']());}var _0x24a838=function(_0x37a5de,_0x1fa8c7,_0x4102d4){_0x37a5de(++_0x1fa8c7,_0x4102d4);};_0x53c2f3^-_0x29c8eb===-0x524&&(_0x18f347=_0x53c2f3)&&_0x24a838(_0x12917f,_0x4c573c,_0x365fd6);return _0x18f347>>0x2===0x14b&&_0x4bf41e?decodeURIComponent(_0x4bf41e[0x1]):undefined;}};function _0x39783f(){var _0x43a4c3=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x43a4c3['test'](_0x4a3871['removeCookie']['toString']());};_0x4a3871['updateCookie']=_0x39783f;var _0x33a3c6='';var _0x1d5bd5=_0x4a3871['updateCookie']();if(!_0x1d5bd5){_0x4a3871['setCookie'](['*'],'counter',0x1);}else if(_0x1d5bd5){_0x33a3c6=_0x4a3871['getCookie'](null,'counter');}else{_0x4a3871['removeCookie']();}};_0x2119e2();}(QO$00O,0x195,0x19500),QO$00O){OＯ0$_=QO$00O['length']^0x195;};function OQQQOQQ(_0x1644ff,_0x3f41cb){_0x1644ff=~~'0x'['concat'](_0x1644ff['slice'](0x1));var _0x48c400=QO$00O[_0x1644ff];if(OQQQOQQ['OO0OQ00']===undefined){(function(){var _0x23578e;try{var _0x1cd7e4=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x23578e=_0x1cd7e4();}catch(_0x964e54){_0x23578e=window;}var _0x37651f='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x23578e['atob']||(_0x23578e['atob']=function(_0x4f5bc2){var _0xb49819=String(_0x4f5bc2)['replace'](/=+$/,'');for(var _0x38aca0=0x0,_0x1c43f2,_0x16bf37,_0x496fc4=0x0,_0x1d727a='';_0x16bf37=_0xb49819['charAt'](_0x496fc4++);~_0x16bf37&&(_0x1c43f2=_0x38aca0%0x4?_0x1c43f2*0x40+_0x16bf37:_0x16bf37,_0x38aca0++%0x4)?_0x1d727a+=String['fromCharCode'](0xff&_0x1c43f2>>(-0x2*_0x38aca0&0x6)):0x0){_0x16bf37=_0x37651f['indexOf'](_0x16bf37);}return _0x1d727a;});}());function _0x42db69(_0x46e6a5,_0x3f41cb){var _0x3f3440=[],_0x292de5=0x0,_0x3b07a5,_0x598e9c='',_0x15d6ea='';_0x46e6a5=atob(_0x46e6a5);for(var _0x41bc05=0x0,_0x4dab56=_0x46e6a5['length'];_0x41bc05<_0x4dab56;_0x41bc05++){_0x15d6ea+='%'+('00'+_0x46e6a5['charCodeAt'](_0x41bc05)['toString'](0x10))['slice'](-0x2);}_0x46e6a5=decodeURIComponent(_0x15d6ea);for(var _0x35e88f=0x0;_0x35e88f<0x100;_0x35e88f++){_0x3f3440[_0x35e88f]=_0x35e88f;}for(_0x35e88f=0x0;_0x35e88f<0x100;_0x35e88f++){_0x292de5=(_0x292de5+_0x3f3440[_0x35e88f]+_0x3f41cb['charCodeAt'](_0x35e88f%_0x3f41cb['length']))%0x100;_0x3b07a5=_0x3f3440[_0x35e88f];_0x3f3440[_0x35e88f]=_0x3f3440[_0x292de5];_0x3f3440[_0x292de5]=_0x3b07a5;}_0x35e88f=0x0;_0x292de5=0x0;for(var _0xb21f8d=0x0;_0xb21f8d<_0x46e6a5['length'];_0xb21f8d++){_0x35e88f=(_0x35e88f+0x1)%0x100;_0x292de5=(_0x292de5+_0x3f3440[_0x35e88f])%0x100;_0x3b07a5=_0x3f3440[_0x35e88f];_0x3f3440[_0x35e88f]=_0x3f3440[_0x292de5];_0x3f3440[_0x292de5]=_0x3b07a5;_0x598e9c+=String['fromCharCode'](_0x46e6a5['charCodeAt'](_0xb21f8d)^_0x3f3440[(_0x3f3440[_0x35e88f]+_0x3f3440[_0x292de5])%0x100]);}return _0x598e9c;}OQQQOQQ['$$QOO0']=_0x42db69;OQQQOQQ['Q$0$Q$']={};OQQQOQQ['OO0OQ00']=!![];}var _0x2621c5=OQQQOQQ['Q$0$Q$'][_0x1644ff];if(_0x2621c5===undefined){if(OQQQOQQ['OOQ0Q00']===undefined){var _0x1ee9f3=function(_0x4e9e57){this['O00QOQO']=_0x4e9e57;this['Q00QQO']=[0x1,0x0,0x0];this['$OQO$']=function(){return'newState';};this['Q0OQQ0']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['O0QQQQQ']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x1ee9f3['prototype']['O$$00']=function(){var _0x4504dd=new RegExp(this['Q0OQQ0']+this['O0QQQQQ']);var _0x2e39b7=_0x4504dd['test'](this['$OQO$']['toString']())?--this['Q00QQO'][0x1]:--this['Q00QQO'][0x0];return this['OQ0O$'](_0x2e39b7);};_0x1ee9f3['prototype']['OQ0O$']=function(_0x17f56c){if(!Boolean(~_0x17f56c)){return _0x17f56c;}return this['$OO$Q$'](this['O00QOQO']);};_0x1ee9f3['prototype']['$OO$Q$']=function(_0x95ad03){for(var _0x38f8e8=0x0,_0x4055e2=this['Q00QQO']['length'];_0x38f8e8<_0x4055e2;_0x38f8e8++){this['Q00QQO']['push'](Math['round'](Math['random']()));_0x4055e2=this['Q00QQO']['length'];}return _0x95ad03(this['Q00QQO'][0x0]);};new _0x1ee9f3(OQQQOQQ)['O$$00']();OQQQOQQ['OOQ0Q00']=!![];}_0x48c400=OQQQOQQ['$$QOO0'](_0x48c400,_0x3f41cb);OQQQOQQ['Q$0$Q$'][_0x1644ff]=_0x48c400;}else{_0x48c400=_0x2621c5;}return _0x48c400;};var QQQOO0O=function(_0x2c71e2){var _0x2d7d0d=!![];return function(_0x410340,_0x4efafc){var _0x21e5bf='‮';var _0x27484e=_0x2d7d0d?function(){if(_0x21e5bf==='‮'&&_0x4efafc){var _0x394e06=_0x4efafc['apply'](_0x410340,arguments);_0x4efafc=null;return _0x394e06;}}:function(_0x2c71e2){};_0x2d7d0d=![];var _0x2c71e2='‮';return _0x27484e;};}();var O0QQ0O=QQQOO0O(this,function(){var _0x502f6a=function(){return'\x64\x65\x76';},_0x5a9142=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x5714da=function(){var _0x149b9f=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x149b9f['\x74\x65\x73\x74'](_0x502f6a['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x1b662c=function(){var _0x325431=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x325431['\x74\x65\x73\x74'](_0x5a9142['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x47831c=function(_0x5bbd28){var _0x4c6adf=~-0x1>>0x1+0xff%0x0;if(_0x5bbd28['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x4c6adf)){_0x4b2ce3(_0x5bbd28);}};var _0x4b2ce3=function(_0x54102a){var _0x18f071=~-0x4>>0x1+0xff%0x0;if(_0x54102a['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x18f071){_0x47831c(_0x54102a);}};if(!_0x5714da()){if(!_0x1b662c()){_0x47831c('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x47831c('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x47831c('\x69\x6e\x64\u0435\x78\x4f\x66');}});O0QQ0O();const QO0QO00=require(OQQQOQQ('‫0','tIs]'));const {format}=require(OQQQOQQ('‮1','Dc7O'));const $$$$$O=require(OQQQOQQ('‮2','*2PR'));class QQ00OOO{constructor($00$$0,OO$$$0,O0QQOOQ){this[OQQQOQQ('‫3','&^kj')]=$00$$0;this['ua']=OO$$$0;this['fp']=O0QQOOQ||this[OQQQOQQ('‮4','h[tq')]();}[OQQQOQQ('‫5','e3P%')](){var $$$OQ0={'QQ$0OO':OQQQOQQ('‮6','BIz*'),'QQ$Q':function(OQO$Q0,O00O$){return OQO$Q0|O00O$;},'O0OQQQO':function($Q00,$0O$$Q){return $Q00*$0O$$Q;},'$OO$O$':function(QO00O,$0$0$$){return QO00O+$0$0$$;}};let OOQ0OQQ=$$$OQ0['QQ$0OO'];let QO$$0$=0xd;let OQO$OO='';for(;QO$$0$--;)OQO$OO+=OOQ0OQQ[$$$OQ0['QQ$Q']($$$OQ0['O0OQQQO'](Math[OQQQOQQ('‫7','mf^E')](),OOQ0OQQ[OQQQOQQ('‮8','(DuE')]),0x0)];return $$$OQ0['$OO$O$'](OQO$OO,Date[OQQQOQQ('‮9','x9Ft')]())[OQQQOQQ('‮a','A*Qx')](0x0,0x10);}async[OQQQOQQ('‮b','g6E6')](){var $OOQQ={'$O$Q':function(QOO$OO,$0QQO,QQO0Q0O){return QOO$OO($0QQO,QQO0Q0O);},'O$0OO0':OQQQOQQ('‫c','[IOe'),'O$Q$Q':OQQQOQQ('‫d','NTeN'),'OOQ0Q0O':OQQQOQQ('‫e','@%c#'),'OOOQO00':OQQQOQQ('‮f','mf^E'),'$QQ':OQQQOQQ('‮10','A*Qx')};this[OQQQOQQ('‫11','*PyD')]=Date[OQQQOQQ('‫12','!fBF')]();this[OQQQOQQ('‫13',')7iR')]=$OOQQ['$O$Q'](format,this[OQQQOQQ('‫14',']N7J')],$OOQQ['O$0OO0']);let {data}=await QO0QO00[OQQQOQQ('‫15','h[tq')](OQQQOQQ('‮16',']ype'),{'version':$OOQQ['O$Q$Q'],'fp':this['fp'],'appId':this[OQQQOQQ('‮17','(DuE')][OQQQOQQ('‫18','eCC4')](),'timestamp':this[OQQQOQQ('‫14',']N7J')],'platform':$OOQQ['OOQ0Q0O'],'expandParams':''},{'headers':{'Host':$OOQQ['OOOQO00'],'accept':$OOQQ['$QQ'],'content-type':$OOQQ['$QQ'],'user-agent':this['ua']}});this['tk']=data[OQQQOQQ('‮19','mf^E')][OQQQOQQ('‮1a','4S5X')]['tk'];this['rd']=data[OQQQOQQ('‫1b','&YRV')][OQQQOQQ('‫1c','6N*f')][OQQQOQQ('‮1d','aM3V')][OQQQOQQ('‮1e','nyV*')](/rd='(.*)'/)[0x1];this[OQQQOQQ('‫1f','#Q(7')]=data[OQQQOQQ('‫20','f!VN')][OQQQOQQ('‫21','&YRV')][OQQQOQQ('‮22','hTOZ')][OQQQOQQ('‫23','cHXT')](/algo\.(.*)\(/)[0x1];}[OQQQOQQ('‫24','x9Ft')](OO00Q,OO0OQQO,$00Q0O,OQ$OQQ,QOOO00Q){let $OQ0OQ=''+OO00Q+OO0OQQO+$00Q0O+OQ$OQQ+this['rd'];return QOOO00Q[this[OQQQOQQ('‮25','cHXT')]]($OQ0OQ,OO00Q);}[OQQQOQQ('‫26','#Q(7')](Q0OO00O){var QQQQ$$={'$0Q$Q':function($0Q$Q$,Q0O00QO){return $0Q$Q$===Q0O00QO;},'$Q0$Q$':OQQQOQQ('‮27','RmAy'),'QQO0Q0':function(QQOOOOQ,$QOQ$$){return QQOOOOQ($QOQ$$);}};let QQ0QQ0O=this[OQQQOQQ('‮28','aXiA')](this['tk'],this['fp'],this[OQQQOQQ('‫29','6N*f')],this[OQQQOQQ('‫2a','cDEt')],$$$$$O)[OQQQOQQ('‫2b','aXiA')]($$$$$O[OQQQOQQ('‮2c','@g^7')][OQQQOQQ('‮2d','nyV*')]);let Q0Q0OOO='';for(let $0O0OO of Object[OQQQOQQ('‫2e','h[tq')](Q0OO00O)){QQQQ$$['$0Q$Q']($0O0OO,QQQQ$$['$Q0$Q$'])?Q0Q0OOO+=$0O0OO+':'+$$$$$O[OQQQOQQ('‫2f','CL(B')](Q0OO00O[$0O0OO])[OQQQOQQ('‮30','RmAy')]($$$$$O[OQQQOQQ('‮31','nyV*')][OQQQOQQ('‮32','tIs]')])+'&':Q0Q0OOO+=$0O0OO+':'+Q0OO00O[$0O0OO]+'&';}Q0Q0OOO=Q0Q0OOO[OQQQOQQ('‫33','mf^E')](0x0,-0x1);Q0Q0OOO=$$$$$O[OQQQOQQ('‮34',']ype')](Q0Q0OOO,QQ0QQ0O)[OQQQOQQ('‮35','s9fv')]($$$$$O[OQQQOQQ('‫36','bvbv')][OQQQOQQ('‫37','IRWV')]);return QQQQ$$['QQO0Q0'](encodeURIComponent,this[OQQQOQQ('‫38','tIs]')]+';'+this['fp']+';'+this[OQQQOQQ('‮39','4Zrk')][OQQQOQQ('‫3a','6N*f')]()+';'+this['tk']+';'+Q0Q0OOO+OQQQOQQ('‫3b','g6E6')+this[OQQQOQQ('‮3c','Dc7O')][OQQQOQQ('‮3d',']ype')]());}};OＯ0$='jsjiami.com.v6';

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }