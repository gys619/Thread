/*
关注有礼-自动解析通用
环境变量 样例
export whx_drawShopGift="https://u.jd.com/VtcZjCp"
7 7 7 7 7 jd_whx_drawShopGift.js
*/
const $ = new Env('关注有礼-自动解析通用');
const notify = $.isNode() ? require('./sendNotify') : '';
const axios = require("axios")
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '';
let jfurl = process.env.whx_drawShopGift ?? "";

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
    return;
  }

  for (let i = 0; i < cookiesArr.length; i++) {
    if (jfurl === '') {
      console.log("无活动")
      break
    }
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        if ($.isNode()) {
          // await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      $.jfurl = jfurl
      $.hrl = ''
      $.shopId = ''
      $.gx = ''
      $.utm_campaign = ''
      $.utm_term = ''
      $.activityId = ''
      await main()
      await $.wait(2000);
    }
  }
})().catch((e) => { $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '') }).finally(() => { $.done(); })

async function main(){
  await getShorttoLong()
  await whx_getShopHomeActivityInfo()
  if ($.activityId) {
    await whx_drawShopGift()
  }
}

async function getShort(short) {
  try {
      let { data } = await axios.get(short);
      if (data) {
          let jump = data.match(/hrl=\'(.*)\';var.ua/)[1];
          if (jump) {
              return await axios
                  .get(jump)
                  .then((res) => {
                      return res.request?._redirectable?._currentUrl;
                  })
                  .catch((err) => {
                      return err.request?._redirectable?._currentUrl;
                  });
          } else {
              return null;
          }
      } else {
          return null;
      }
  } catch (error) {
      return null;
  }
}

async function getShorttoLong() {
  return getShort($.jfurl).then(long=>{
      // console.log(long);
      $.hrl = long
  })
}
var _0xodJ='jsjiami.com.v6',_0xodJ_=['‮_0xodJ'],_0x3aa2=[_0xodJ,'w59HOSPClB7CiQRQwpLDoAsqw7/Cqk3DmxcfYD7Dux8lagbDnsO7w4TCtEE8acOmVmPDgVHDgRfDp3nDi8O3bsOBwqXCu8OXw5HDnXrDk8OGwrDDlV3CjcObVgLCpMO9wpzDoGnDkQzDscO8wpZ5f8OVLcKMwp3CvcOzwqQAw4HDhGvDtsKQwoPDpcO2WTp6UMOFw7DDph4PwqjDoTTCq1rDtxIOwqEzUcKfw4rDssKow5PDjcOJwqV1NMKWAMKCw41Ww4jDmMK2fcOHZ1vCjl/DosKdTcKcEsOE','w7bDrgI=','dQU/w45IIH/Doi8=','cCLCgcOvYw==','MmRQw7HDhcK9','YRgrw5NkJnHDgDfDgsO0wpvCq8KFwpAceg==','w7DDq8K+NMKI','wpzDvFkUw6A=','wpBqw7hyGA==','VhTCksO5dQ==','CMKywrdmTEFlwqpSIBvDv1LCrG7Dnw==','w7xFw4FKFcKzw6J1Ig==','w6LCm8KA','HsOGb8KHSw==','wqZFw6llw50Qw7Apw4A=','w6/CtWVfGVbDlws=','ZU12IMKRwrp/e1PDtQ==','CcOPwpMzEMKU','J8ORQcKMGGrDgAlsFHRMw43DqsKRZGk=','WsOuRFtq','w4ETwpEmTg==','QsKlw5vCgH/DscKLc8OtPQ==','wrkYwr9NOX0=','SMO7IXXCgQ==','H8KmHg==','wrJSw51bCMOnwqg2bMOsP8Kgw75Cw6ddw67CvMOtw6vDv1s=','Z8OjwqJtwo3DkA==','wozDsMOow5/CmA==','w647wqk4QkVJw6bDsA==','ZMOCU09v','TcOPwq5twp4=','w6JZw57ChiA=','IcKBSA9m','bMOvwqxuwoE=','KHVXw7TDmsOzw6cOw6wBw7gTYhXDhz5uLMOvYHk6wp7DsjfDr8OLw5U1D0gmwrhNSRnDr8KhRhrCh8K2w4IMbsKOAH/DqcOLwqzCmCHDlsOnw74pwq7DusOkYmIZw6cqcivDnQ==','DUgoHn8=','wrtzw7dsw5A=','OMO9w4XDmgfDgCwMQMKew53ChV0/w6fDv8OrPcOg','Sx43w45KK3fCq2PCmMKlw6nDpsKfwrUYYcKYw43CmcOWwocaazbCoMOBezFqYFJabMOiAjZIwrvCjS0mKDBKwpdIW8KBw7rCunvDhsK0w7dZCMK5dMOGSsKGwpFEesK6wrlhw6vDr8KOe2lWX3c/ZgtqfcKkw7fCisKcRFTDqCl5TTHCqzdsw43DsxjDh8KyM8OIw7B3P8K2RsK6AsKZwrRqCsK5wo9CwrbCiATDpgAgw67CqjdhI8KMwp/DiCViN1HDuhzDkcO/w5E=','PcKTwqJzeg==','MsOfwrMsDQ==','cWJhH8Ks','wqVsw6RXw7M=','QcK7Kg==','w707wqA5UQ==','wrZRw6B6NQ==','LMOxX8KhMg==','eMKyOMOheA==','dBQ+w5JKMw==','ccOHG0rCljvDhyNBZmHCkMOswpddRsKuw4vDjTU=','MsOdVMKNNn8=','w7NEMS/CmRbCkXkAw5/CtUJ0w7PCnmLDnR8OKA==','wpXCmcO6BRDCpw==','w7vDrRc2wqXCocK+w6lkwr0tJ8K5CMOww7/Cs8OuIsOr','wpfDhsOyw5/CtA==','X8KxPsORQzA=','YsOOCF3CoDDDjBU=','wrxPw6A=','bcORwqZJwoA=','w6bCpF03w7HCtcKvesKOwp8kcz8aKcOJw4jCl8K1Kg==','wofDmsKkwpliwqI=','KsO2w5PCocOfw6xew7VDwqXCl2XDlSzDuSZsTcOoeQ==','CcOPwoE0K8KPw4RR','bCzClA==','M8KwGRnDgA==','w7LCnGXClRo=','PCFO','w6rCtsK8','5LmL5Lq75p6N5YiN5Zq56L2X5Zq456qZ5pWM5o+S','wovDiMOn','w5PDlcKCPMKAJ3vDlMOh','bwnDlTTDsg==','w5jCt1NzOw==','O8O7w5PCt8Ob','w5tZQhLDrMKOwq9Hw53DswjDni9wPMOn','wqhDw5peF8Kp','w4fDiMKWIcKsIXXDtsO5NMOcw64sE8KmMsOM','WcOsQltBQMODel0DclFzwoLDjAY=','E8OqXF9DdMODZA8=','CcO2ecKpVg==','NMOwwobDvSzCnh8A','dcOowrl0wrLDncKVwoFfw7Y=','H8OHFMKETsKW','J2hFw7DDq8Kowq9lw6wFw7BvakjDmDY0','PsOPw7vClcOM','wqLCkMORHAg=','wroDNykrwrAqwozDqMKy','5Luz5Lul5p2s5Yuh5ZuA6Ly25ZiM56mo5pWh5o+1','wrZJw45uCcKv','bCzClMOZdG0=','JcOvwoHDqWXDjDIBC8K6w53Cn0sowrbCoMKp','w7zCscO2WzPCkETDj8OHwpRBwrrCp8KRwrZxd8OnNQ==','w7fDh8O6wr4nDsOzw4zDp8KW','d8OTVA==','wobDgMKUCsKBJC8=','w4wRHRvDrmxOw4bDvWkHw5LCog==','wobDlMKEOMKxNHfDgMO1fQ==','woPDkmQdw40Iw68ewpo=','wqYfwrl6Lg==','w57DhMKPfRErXVrCkxA=','BcOQCw==','wrPDiUtyGw==','w4LDh8Kd','wr7DlcO+wrY/','aMKow6fCgX8=','Xm/Dqw==','HMOAHsKGUw==','ZFzDjMKCCQ==','RcKmIQ==','w6ACOQPDng==','w4rCscKiAsKw','w7PCrcK2RwnDmUzDig==','wrJUw4U=','wrMVw5nDoMOD','wrRJw54=','V8K0w5rCjA==','M2lMw7TDoMKt','woN5UcKaw4fChsOIecOVfDBZ','wqzCkMOLFQY=','wqADwrVXP2rCo8Oe','w7rCvmDCvgs=','Vn9OB8KP','w6LCiMKqexw=','w5ERBDTDvjcMwpnDvXAJwpLDshkSwojDgFvCr3HCuBHDq2gQwr1bAcO0HcK6wqFGb8OVwoLDi0LChAfDth89LMKGw5TDmUIYw5AmwqfDryVKc3/CjRvChTRBw48tw6TChADDqAgNwpojw4hww4XDoMKuTzg=','woFDw6Rqw4s=','PiFe','wqzDtsOx','w68bwo49dA==','w742woUoQA==','UG1GCsKN','wqnCncO+FRI=','HdjfskUjiaqOmi.comUQBu.v6fR=='];if(function(_0x237a81,_0x3e7cc3,_0x2d0d5a){function _0x50ab5a(_0x4ffd2c,_0x7d1356,_0x624440,_0x3d5e47,_0x3ea4c5,_0xc225a1){_0x7d1356=_0x7d1356>>0x8,_0x3ea4c5='po';var _0x281bb8='shift',_0x39bb2a='push',_0xc225a1='‮';if(_0x7d1356<_0x4ffd2c){while(--_0x4ffd2c){_0x3d5e47=_0x237a81[_0x281bb8]();if(_0x7d1356===_0x4ffd2c&&_0xc225a1==='‮'&&_0xc225a1['length']===0x1){_0x7d1356=_0x3d5e47,_0x624440=_0x237a81[_0x3ea4c5+'p']();}else if(_0x7d1356&&_0x624440['replace'](/[HdfkUqOUQBufR=]/g,'')===_0x7d1356){_0x237a81[_0x39bb2a](_0x3d5e47);}}_0x237a81[_0x39bb2a](_0x237a81[_0x281bb8]());}return 0x101712;};return _0x50ab5a(++_0x3e7cc3,_0x2d0d5a)>>_0x3e7cc3^_0x2d0d5a;}(_0x3aa2,0x1e3,0x1e300),_0x3aa2){_0xodJ_=_0x3aa2['length']^0x1e3;};function _0x5cf4(_0x5cde17,_0x41a55d){_0x5cde17=~~'0x'['concat'](_0x5cde17['slice'](0x1));var _0x4f48d8=_0x3aa2[_0x5cde17];if(_0x5cf4['ocZVZR']===undefined){(function(){var _0x32e587=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x212a47='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x32e587['atob']||(_0x32e587['atob']=function(_0x4f553c){var _0x51772c=String(_0x4f553c)['replace'](/=+$/,'');for(var _0x1bbdbb=0x0,_0x13e2e8,_0x148818,_0x1eaec4=0x0,_0x5c8eae='';_0x148818=_0x51772c['charAt'](_0x1eaec4++);~_0x148818&&(_0x13e2e8=_0x1bbdbb%0x4?_0x13e2e8*0x40+_0x148818:_0x148818,_0x1bbdbb++%0x4)?_0x5c8eae+=String['fromCharCode'](0xff&_0x13e2e8>>(-0x2*_0x1bbdbb&0x6)):0x0){_0x148818=_0x212a47['indexOf'](_0x148818);}return _0x5c8eae;});}());function _0x246a1d(_0xe26bd6,_0x41a55d){var _0x496c4b=[],_0x319da3=0x0,_0x4cd4b1,_0x359f9f='',_0x1619d3='';_0xe26bd6=atob(_0xe26bd6);for(var _0x49f774=0x0,_0x2d998c=_0xe26bd6['length'];_0x49f774<_0x2d998c;_0x49f774++){_0x1619d3+='%'+('00'+_0xe26bd6['charCodeAt'](_0x49f774)['toString'](0x10))['slice'](-0x2);}_0xe26bd6=decodeURIComponent(_0x1619d3);for(var _0x2ecbe3=0x0;_0x2ecbe3<0x100;_0x2ecbe3++){_0x496c4b[_0x2ecbe3]=_0x2ecbe3;}for(_0x2ecbe3=0x0;_0x2ecbe3<0x100;_0x2ecbe3++){_0x319da3=(_0x319da3+_0x496c4b[_0x2ecbe3]+_0x41a55d['charCodeAt'](_0x2ecbe3%_0x41a55d['length']))%0x100;_0x4cd4b1=_0x496c4b[_0x2ecbe3];_0x496c4b[_0x2ecbe3]=_0x496c4b[_0x319da3];_0x496c4b[_0x319da3]=_0x4cd4b1;}_0x2ecbe3=0x0;_0x319da3=0x0;for(var _0x18fa1b=0x0;_0x18fa1b<_0xe26bd6['length'];_0x18fa1b++){_0x2ecbe3=(_0x2ecbe3+0x1)%0x100;_0x319da3=(_0x319da3+_0x496c4b[_0x2ecbe3])%0x100;_0x4cd4b1=_0x496c4b[_0x2ecbe3];_0x496c4b[_0x2ecbe3]=_0x496c4b[_0x319da3];_0x496c4b[_0x319da3]=_0x4cd4b1;_0x359f9f+=String['fromCharCode'](_0xe26bd6['charCodeAt'](_0x18fa1b)^_0x496c4b[(_0x496c4b[_0x2ecbe3]+_0x496c4b[_0x319da3])%0x100]);}return _0x359f9f;}_0x5cf4['tfGDOO']=_0x246a1d;_0x5cf4['FsNjJD']={};_0x5cf4['ocZVZR']=!![];}var _0x2d7475=_0x5cf4['FsNjJD'][_0x5cde17];if(_0x2d7475===undefined){if(_0x5cf4['GbjfBx']===undefined){_0x5cf4['GbjfBx']=!![];}_0x4f48d8=_0x5cf4['tfGDOO'](_0x4f48d8,_0x41a55d);_0x5cf4['FsNjJD'][_0x5cde17]=_0x4f48d8;}else{_0x4f48d8=_0x2d7475;}return _0x4f48d8;};async function whx_getShopHomeActivityInfo(){var _0x203da5={'PJNaf':function(_0x360ce9,_0x51e2ad){return _0x360ce9===_0x51e2ad;},'VWaes':function(_0x46ef41,_0x2f4907,_0x34d75e,_0x4b0d85){return _0x46ef41(_0x2f4907,_0x34d75e,_0x4b0d85);},'ogpeG':function(_0x2b036d,_0x3edea2){return _0x2b036d+_0x3edea2;},'YMVzi':'activityId\x20','oqGCT':function(_0x33f40d){return _0x33f40d();},'dQqca':function(_0x1221a3){return _0x1221a3();},'Qccks':function(_0x1252c1,_0xc376ab){return _0x1252c1(_0xc376ab);},'wEIaS':'https://shop.m.jd.com','fhBtg':_0x5cf4('‫0','^bqx'),'TCDCj':_0x5cf4('‫1','94(T'),'Nawen':'https://shop.m.jd.com/','QbRup':'shopId=','MECMy':_0x5cf4('‮2','v5Og'),'KnHhv':'shopId\x20','EATwQ':_0x5cf4('‫3','u!RB'),'qbywq':_0x5cf4('‮4','vRsy'),'RAKgA':function(_0x3d2425,_0x72c9ae,_0x515b44,_0x48add0){return _0x3d2425(_0x72c9ae,_0x515b44,_0x48add0);},'YgIGS':_0x5cf4('‫5','BJ10'),'DEEKQ':_0x5cf4('‮6','vRsy'),'LhIkI':_0x5cf4('‫7','IPdm'),'opLVw':_0x5cf4('‫8','APd@'),'KlBez':'jingfen','pbPyX':'kong','dkjcW':_0x5cf4('‫9','oIBn'),'RQLNh':'m-shop'};$['shopId']=_0x203da5['VWaes'](getSubstr,$[_0x5cf4('‫a','n!hM')],_0x203da5['QbRup'],_0x203da5[_0x5cf4('‮b','zvOX')]);console[_0x5cf4('‫c','oIBn')](_0x203da5[_0x5cf4('‮d','v5Og')](_0x203da5[_0x5cf4('‫e','xbLu')],$['shopId']));$['gx']=getSubstr($[_0x5cf4('‮f','cu*Y')],_0x203da5['EATwQ'],_0x203da5[_0x5cf4('‫10','n!hM')]);$['utm_campaign']=_0x203da5[_0x5cf4('‫11','cu*Y')](getSubstr,$[_0x5cf4('‫12','jvwq')],_0x203da5[_0x5cf4('‫13','BJ10')],_0x203da5[_0x5cf4('‮14','oBF1')]);$[_0x5cf4('‫15','94(T')]=$[_0x5cf4('‮16','fHUK')]['split'](_0x203da5[_0x5cf4('‫17','lU[e')])[0x1];$['now']=Date[_0x5cf4('‫18','fHUK')]();const _0x437a8a={'ad_od':_0x203da5['opLVw'],'cu':_0x5cf4('‫19','xbLu'),'gx':$['gx'],'shopId':$[_0x5cf4('‫1a','5]Zk')],'utm_campaign':$[_0x5cf4('‮1b','b&FO')],'utm_medium':_0x203da5[_0x5cf4('‫1c','Lri6')],'utm_source':_0x203da5['pbPyX'],'utm_term':$[_0x5cf4('‫1d','APd@')],'utm_user':_0x203da5[_0x5cf4('‮1e',']AOK')],'source':_0x203da5[_0x5cf4('‮1f','4mPf')]};return new Promise(async _0x2bafee=>{var _0x2d862d={'JLQYc':function(_0x562633){return _0x203da5[_0x5cf4('‮20','94(T')](_0x562633);}};const _0x3cf88d={'url':_0x5cf4('‫21','BJ10')+_0x203da5[_0x5cf4('‫22','5#2H')](encodeURIComponent,JSON['stringify'](_0x437a8a))+'&_t='+$[_0x5cf4('‮23','4Kv^')]+'&appid=shop_view&clientVersion=11.0.0&client=wh5&area=&uuid=','headers':{'Accept':_0x5cf4('‫24','94(T'),'Origin':_0x203da5[_0x5cf4('‮25','thb&')],'Accept-Encoding':_0x203da5[_0x5cf4('‫26','thb&')],'Accept-Language':_0x203da5[_0x5cf4('‮27','4mPf')],'Cookie':cookie,'Referer':_0x203da5[_0x5cf4('‫28','Lri6')],'User-Agent':_0x5cf4('‮29','(JkI')}};$['get'](_0x3cf88d,(_0x4571fb,_0x19511a,_0x3f9e14)=>{try{if(_0x4571fb){console[_0x5cf4('‫2a','R6^n')](''+JSON[_0x5cf4('‫2b','7kfb')](_0x4571fb));}else{if(_0x3f9e14){_0x3f9e14=JSON[_0x5cf4('‫2c','OdTd')](_0x3f9e14);if(_0x3f9e14[_0x5cf4('‮2d','5]Zk')]['levelZeroMenuUrl']&&_0x3f9e14['result'][_0x5cf4('‫2e','7kfb')]){if(_0x203da5[_0x5cf4('‮2f','vRsy')]('WrlyM',_0x5cf4('‫30','IPdm'))){_0x2d862d[_0x5cf4('‮31','fHUK')](_0x2bafee);}else{$['venderId']=_0x203da5[_0x5cf4('‮32','OdTd')](getSubstr,_0x3f9e14['result'][_0x5cf4('‫33','&150')],'venderId=',_0x5cf4('‮34','fHUK'));console[_0x5cf4('‮35','oBF1')](_0x203da5[_0x5cf4('‫36','Vj$9')](_0x5cf4('‫37','5#2H'),$[_0x5cf4('‮38','@a!3')]));$[_0x5cf4('‮39','4mPf')]=_0x3f9e14[_0x5cf4('‫3a','$Vju')][_0x5cf4('‫3b','wNiY')]['activityId'];console['log'](_0x203da5[_0x5cf4('‫3c','veKb')](_0x203da5[_0x5cf4('‮3d','thb&')],$[_0x5cf4('‮3e','xbLu')]));}}}else{console[_0x5cf4('‫2a','R6^n')]('京东服务器返回空数据');}}}catch(_0xaa1c83){$[_0x5cf4('‫3f','APd@')](_0xaa1c83,_0x19511a);}finally{_0x203da5['oqGCT'](_0x2bafee);}});});}async function whx_drawShopGift(){var _0x18b2aa={'kWhsI':function(_0x412a5d,_0x4837a3){return _0x412a5d+_0x4837a3;},'QKgqB':function(_0x4b7979,_0x45deee){return _0x4b7979===_0x45deee;},'OCNWI':function(_0x4fd9a8,_0x33bcf6){return _0x4fd9a8===_0x33bcf6;},'xdasE':_0x5cf4('‫40','u!RB'),'YOCrC':function(_0x412405,_0x2b62a7){return _0x412405!==_0x2b62a7;},'VDoYt':'ZnWzQ','boBNs':'uPcuc','RjNAe':function(_0x37ffda){return _0x37ffda();},'vKSjT':function(_0x160366,_0x5111d0){return _0x160366(_0x5111d0);},'ywUMW':_0x5cf4('‮41','veKb'),'kSpmh':'https://shop.m.jd.com','GmGQk':_0x5cf4('‮42','fHUK')};$['now']=Date['now']();const _0x417e02={'shopId':$[_0x5cf4('‮43','p$yD')],'venderId':$['venderId'],'activityId':$['activityId']};return new Promise(async _0x184fc0=>{var _0x5beaab={'yZkTD':function(_0x12994b,_0x3499d0){return _0x18b2aa[_0x5cf4('‮44','MP$2')](_0x12994b,_0x3499d0);},'xWfKZ':_0x5cf4('‫45','thb&'),'uUZQr':function(_0x4740ca,_0x439210){return _0x4740ca+_0x439210;},'ElXlt':'activityId\x20','inwtV':function(_0x4a32f7,_0x1b555d){return _0x18b2aa[_0x5cf4('‫46','veKb')](_0x4a32f7,_0x1b555d);},'IuSjq':_0x5cf4('‫47','p$yD'),'KxTAS':function(_0x516a01,_0xcd0a2f){return _0x18b2aa[_0x5cf4('‮48','Po)&')](_0x516a01,_0xcd0a2f);},'uLcVK':_0x5cf4('‫49','VFtS'),'eegev':function(_0x51966e,_0x22f6bf){return _0x18b2aa['OCNWI'](_0x51966e,_0x22f6bf);},'lwIQN':_0x18b2aa[_0x5cf4('‮4a','p$yD')],'lIxYh':function(_0x4743aa,_0x2f4a58){return _0x18b2aa['YOCrC'](_0x4743aa,_0x2f4a58);},'amDgm':_0x18b2aa['VDoYt'],'AgXHG':_0x18b2aa['boBNs'],'uSrbn':function(_0x51bffa){return _0x18b2aa['RjNAe'](_0x51bffa);}};const _0x237a69={'url':_0x5cf4('‫4b','5]Zk')+_0x18b2aa['vKSjT'](encodeURIComponent,JSON['stringify'](_0x417e02))+'&_t='+$['now']+'&appid=shop_view&clientVersion=11.0.0&client=wh5&area=&uuid=','headers':{'Accept':_0x18b2aa[_0x5cf4('‮4c','L##C')],'Origin':_0x18b2aa[_0x5cf4('‮4d','5#2H')],'Accept-Encoding':'gzip,\x20deflate,\x20br','Accept-Language':_0x5cf4('‫4e','^bqx'),'Cookie':cookie,'Referer':_0x18b2aa['GmGQk'],'User-Agent':_0x5cf4('‮4f','7kfb')}};$['get'](_0x237a69,(_0x1c8d10,_0x17df51,_0x1569ae)=>{if(_0x5beaab['inwtV'](_0x5cf4('‮50','&150'),_0x5beaab[_0x5cf4('‮51','$Vju')])){try{if(_0x1c8d10){if(_0x5beaab['KxTAS'](_0x5beaab[_0x5cf4('‮52','4mPf')],_0x5beaab[_0x5cf4('‮53','5#2H')])){console[_0x5cf4('‫54','jvwq')](''+JSON['stringify'](_0x1c8d10));}else{console['log']('京东服务器返回空数据');}}else{if(_0x5beaab[_0x5cf4('‮55','thb&')](_0x5beaab[_0x5cf4('‮56','fHUK')],_0x5beaab['lwIQN'])){if(_0x1569ae){if(_0x5beaab[_0x5cf4('‫57','wNiY')](_0x5cf4('‮58','jvwq'),_0x5beaab['amDgm'])){_0x1569ae=JSON['parse'](_0x1569ae);if(_0x1569ae[_0x5cf4('‫59','7kfb')][_0x5cf4('‫5a','u!RB')][0x0]['rearWord']){console['log'](_0x1569ae[_0x5cf4('‮5b','wNiY')][_0x5cf4('‮5c','(JkI')][0x0]['redWord']+'\x20'+_0x1569ae[_0x5cf4('‫5d','Lri6')][_0x5cf4('‮5e','R6^n')][0x0]['rearWord']);}else{console['log'](_0x1569ae);}}else{_0x1569ae=JSON[_0x5cf4('‮5f','MP$2')](_0x1569ae);if(_0x1569ae[_0x5cf4('‮60','jvwq')]['alreadyReceivedGifts'][0x0][_0x5cf4('‫61','u!RB')]){console[_0x5cf4('‫62','5#2H')](_0x5beaab[_0x5cf4('‫63','p$yD')](_0x5beaab['yZkTD'](_0x1569ae[_0x5cf4('‮60','jvwq')][_0x5cf4('‫64','#&n*')][0x0]['redWord'],'\x20'),_0x1569ae[_0x5cf4('‫65','J9jC')][_0x5cf4('‮66','uyLS')][0x0][_0x5cf4('‫67','$Vju')]));}else{console[_0x5cf4('‫68','OdTd')](_0x1569ae);}}}else{if(_0x5beaab[_0x5cf4('‮69','KNfj')]('lIoHF',_0x5cf4('‮6a',']AOK'))){console[_0x5cf4('‮6b','4Kv^')](''+JSON['stringify'](_0x1c8d10));}else{console[_0x5cf4('‮6c','94(T')](_0x5cf4('‫6d','MP$2'));}}}else{console[_0x5cf4('‮6e','MP$2')](''+JSON[_0x5cf4('‮6f','vRsy')](_0x1c8d10));}}}catch(_0x1b8032){if(_0x5cf4('‮70','*v5Q')!==_0x5beaab[_0x5cf4('‮71','@a!3')]){if(_0x1569ae){_0x1569ae=JSON[_0x5cf4('‮72','uyLS')](_0x1569ae);if(_0x1569ae[_0x5cf4('‫65','J9jC')][_0x5cf4('‫73','8(YD')]&&_0x1569ae[_0x5cf4('‮74','fHUK')][_0x5cf4('‫75','vRsy')]){$['venderId']=getSubstr(_0x1569ae[_0x5cf4('‫65','J9jC')][_0x5cf4('‫76','veKb')],'venderId=',_0x5cf4('‮77','veKb'));console['log'](_0x5beaab[_0x5cf4('‮78','Vj$9')]+$[_0x5cf4('‮79','^bqx')]);$[_0x5cf4('‫7a','p$yD')]=_0x1569ae[_0x5cf4('‮7b','n!hM')][_0x5cf4('‫7c','5]Zk')]['activityId'];console[_0x5cf4('‮35','oBF1')](_0x5beaab[_0x5cf4('‫7d','uyLS')](_0x5beaab[_0x5cf4('‮7e','Lri6')],$[_0x5cf4('‫7f','YBob')]));}}else{console['log'](_0x5cf4('‫80','KNfj'));}}else{$[_0x5cf4('‮81','fHUK')](_0x1b8032,_0x17df51);}}finally{_0x5beaab['uSrbn'](_0x184fc0);}}else{$[_0x5cf4('‫82','OdTd')](e,_0x17df51);}});});};_0xodJ='jsjiami.com.v6';

// prettier-ignore
function getSubstr(str, leftStr, rightStr){
  let left = str.indexOf(leftStr);
  let right = str.indexOf(rightStr, left);
  if(left < 0 || right < left) return '';
  return str.substring(left + leftStr.length, right);
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
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1"
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
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
