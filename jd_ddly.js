/*
东东乐园@wenmoux
活动入口：东东农场->东东乐园(点大风车
好像没啥用 就20💧
更新地址：https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/jd_ddnc_farmpark.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#东东乐园
30 7 * * * https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/jd_ddnc_farmpark.js, tag=东东乐园, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "30 7 * * *" script-path=https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/jd_ddnc_farmpark.js tag=东东乐园

===============Surge=================
东东乐园 = type=cron,cronexp="30 7 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/jd_ddnc_farmpark.js

============小火箭=========
东东乐园 = type=cron,script-path=https://raw.githubusercontent.com/Wenmoux/scripts/wen/jd/jd_ddnc_farmpark.js, cronexpr="30 7 * * *", timeout=3600, enable=true

 */
const $ = new Env('东东乐园');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

const randomCount = $.isNode() ? 20 : 5;
const notify = $.isNode() ? require('./sendNotify') : '';
let merge = {}
let codeList = []
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = `https://api.m.jd.com/client.action`;

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i];
        if (cookie) {
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.beans = 0
            $.taskList = []
            message = ''
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
            await parkInit()
            for (task of $.taskList) {
                if (task.topResource.task.status == 3) {
                    console.log(`任务 ${task.topResource.title} 已完成`)
                } else {
                    console.log("去浏览：" + task.topResource.title)
                    let index = task.name.match(/\d+/)[0] - 1
                    console.log(task.topResource.task.advertId, index, task.type)
                    await browse(task.topResource.task.advertId)
                    await $.wait(1000);
                    await browseAward(task.topResource.task.advertId, index, task.type)
                }
            }
            console.log(`\n集勋章得好礼  By：【888888】`)
            console.log(`\n由于我自己写这个脚本的时候已经手动开启活动了\n所以不知道开启活动的代码\n没有开启的手动开启吧，活动入口：东东农场->水车\n`)
            await collect()
        }
    }


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
//获取活动信息




function browseAward(id, index, type) {
    return new Promise(async (resolve) => {
        const options = taskUrl("ddnc_farmpark_browseAward", `{"version":"1","channel":1,"advertId":"${id}","index":${index},"type":${type}}`)
        //  console.log(options)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    //    console.log(data)
                    if (data.result) {
                        console.log("领取奖励成功,获得💧" + data.result.waterEnergy)
                    } else {
                        console.log(JSON.stringify(data))
                    }

                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function browse(id) {
    return new Promise(async (resolve) => {
        const options = taskUrl("ddnc_farmpark_markBrowser", `{"version":"1","channel":1,"advertId":"${id}"}`)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    console.log(`浏览 ${id}  : ${data.success}`)
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


function parkInit() {
    return new Promise(async (resolve) => {
        const options = taskUrl("ddnc_farmpark_Init", `{"version":"1","channel":1}`)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    //    console.log(data)
                    if (data.buildings) {
                        $.taskList = data.buildings.filter(x => x.topResource.task)
                    } else {
                        console.log("获取任务列表失败,你不会是黑鬼吧")
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


var _0xodx='jsjiami.com.v6',_0xodx_=['‮_0xodx'],_0x35fe=[_0xodx,'w41oT8KZwotLwqvDiTJQU8KcJ2I=','BsKKNMKJdA==','w6HDv04ewo4=','LFlDV8KkNsKYwotzwrI=','fxEN6LSV5Yyd','I07DrSbDowxfDA==','44Cj5LiS5Lqx6La55Y6a','AMKJSMOOeg==','R+mboeWJheeqreW8uuWkkOekjua1kuWLhuW1iOmZkem9jeWHhOmDvOWIsOeqlkjorpTlibTlvJnmt4PliJfmirvliLDlkbfmi4rpo5fljJ/lp7flkZXChua2reWLp+WEr+WPi++8nOS7v+S7nVLDujzDhFTkuJbku4vlhLblnKlnbOWNs1XCkumYqOWLjueqmj/mmJjlpr/ohIPmnKjvvLTDqMKAw5DDvQnColHCqUTCgMK8w5BQexYTw751w745w77DmDIfw6vClcKABMKWw4rCvsO+w67CmMKFwobDi8OeecKyfQ==','w5Ircg==','44Ci5Yih56i45beZ54Ga5LmC','worDhF04wpo=','w63Cv8OuPgVw','VMOFw47Ds8KWI381w5o/EsOwJFQ=','w4jDv1gvwq4=','w7LCv8O5KgVKwrVtw6Q=','Iw/CuAvCjUDDpULDlA==','IMK/wrAiOU4=','A27DlcOIw6k=','w5/DjMKsCcK9','JMO7w40=','44G45Yis56uM5p6B54K75LqX','fuOApuaDveWVp+S9j+W1gue4ieastOS4n+S4kO++lOWOveeDouiCt+WTtOOCuE8=','McOBasKxwp0hHMKdwo4=','44OT5YuJ56q65bW654Kc5LiL','IAPCiBzCpw==','RsOSw5vDrsKVOQ==','MMOLaQ==','wpLDl00owr3DocKWwqpW','wprDj2bCvcKdBsKpEQ==','WcOJw50=','w4jjgJLmgLfllJTkvYXltZfnu5jmrZnkuZ/kuoHvv77ljb3ngqvogo/lkr7jg6TDtw==','IUjDqQ==','w6boj6nlj7PliZroo5Hlp6Xot7XvvJo=','JMOTEiYdUD/CkX0=','IgXCuy/Ck3s=','NURkZ8Kw','XMKFwr5Jwq4=','MsKfNMK0Ww==','McOdLg0a','w43DiV8Hwos=','Rg8icx8=','EHNeVsKy','worCjcOu','W8Kvw4HCiMKSw6PDpF7ChQ==','Yw4W','PT7Dqidi','BDdhL1Apw6x1Cxh9wqXDtg==','w6/CtcOuPw==','Cm3Dgw==','wphQw4XCuyhpaCDDuQ==','E8O/w73DluiumuayouWmu+i1j++8r+itsuahhuaclee8rei1mOmHk+isvA==','VSc9Qik=','w5wgZ3pc','NHxHS8Kew7LCpw==','w6XCrCfDs13Cmw==','jYhsjLiQWRMamAFHi.KcoHFBm.vB6MB=='];if(function(_0x22a3f5,_0xb3cf8,_0x3e9e0a){function _0x2d0699(_0x3126e0,_0x48955b,_0x136a4e,_0x5a3237,_0xe0b8d6,_0x49a119){_0x48955b=_0x48955b>>0x8,_0xe0b8d6='po';var _0x21570a='shift',_0x508434='push',_0x49a119='‮';if(_0x48955b<_0x3126e0){while(--_0x3126e0){_0x5a3237=_0x22a3f5[_0x21570a]();if(_0x48955b===_0x3126e0&&_0x49a119==='‮'&&_0x49a119['length']===0x1){_0x48955b=_0x5a3237,_0x136a4e=_0x22a3f5[_0xe0b8d6+'p']();}else if(_0x48955b&&_0x136a4e['replace'](/[YhLQWRMAFHKHFBBMB=]/g,'')===_0x48955b){_0x22a3f5[_0x508434](_0x5a3237);}}_0x22a3f5[_0x508434](_0x22a3f5[_0x21570a]());}return 0xb886a;};return _0x2d0699(++_0xb3cf8,_0x3e9e0a)>>_0xb3cf8^_0x3e9e0a;}(_0x35fe,0x1e5,0x1e500),_0x35fe){_0xodx_=_0x35fe['length']^0x1e5;};function _0x33fe(_0x51dc87,_0x5c30f1){_0x51dc87=~~'0x'['concat'](_0x51dc87['slice'](0x1));var _0x1bb8b1=_0x35fe[_0x51dc87];if(_0x33fe['bwKhFD']===undefined){(function(){var _0x3b320a=function(){var _0x16951c;try{_0x16951c=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5ba40f){_0x16951c=window;}return _0x16951c;};var _0x1a6fd4=_0x3b320a();var _0x124189='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1a6fd4['atob']||(_0x1a6fd4['atob']=function(_0x22ae93){var _0xef21f0=String(_0x22ae93)['replace'](/=+$/,'');for(var _0x3dedf2=0x0,_0x1063b0,_0x2575c2,_0x339fb0=0x0,_0x49dbbf='';_0x2575c2=_0xef21f0['charAt'](_0x339fb0++);~_0x2575c2&&(_0x1063b0=_0x3dedf2%0x4?_0x1063b0*0x40+_0x2575c2:_0x2575c2,_0x3dedf2++%0x4)?_0x49dbbf+=String['fromCharCode'](0xff&_0x1063b0>>(-0x2*_0x3dedf2&0x6)):0x0){_0x2575c2=_0x124189['indexOf'](_0x2575c2);}return _0x49dbbf;});}());function _0x3b46e0(_0x5453cd,_0x5c30f1){var _0x3c34c5=[],_0x5ad51f=0x0,_0x5d878b,_0x48fee3='',_0x272cb8='';_0x5453cd=atob(_0x5453cd);for(var _0x2be715=0x0,_0x13f6ae=_0x5453cd['length'];_0x2be715<_0x13f6ae;_0x2be715++){_0x272cb8+='%'+('00'+_0x5453cd['charCodeAt'](_0x2be715)['toString'](0x10))['slice'](-0x2);}_0x5453cd=decodeURIComponent(_0x272cb8);for(var _0x1d60e2=0x0;_0x1d60e2<0x100;_0x1d60e2++){_0x3c34c5[_0x1d60e2]=_0x1d60e2;}for(_0x1d60e2=0x0;_0x1d60e2<0x100;_0x1d60e2++){_0x5ad51f=(_0x5ad51f+_0x3c34c5[_0x1d60e2]+_0x5c30f1['charCodeAt'](_0x1d60e2%_0x5c30f1['length']))%0x100;_0x5d878b=_0x3c34c5[_0x1d60e2];_0x3c34c5[_0x1d60e2]=_0x3c34c5[_0x5ad51f];_0x3c34c5[_0x5ad51f]=_0x5d878b;}_0x1d60e2=0x0;_0x5ad51f=0x0;for(var _0x43e92c=0x0;_0x43e92c<_0x5453cd['length'];_0x43e92c++){_0x1d60e2=(_0x1d60e2+0x1)%0x100;_0x5ad51f=(_0x5ad51f+_0x3c34c5[_0x1d60e2])%0x100;_0x5d878b=_0x3c34c5[_0x1d60e2];_0x3c34c5[_0x1d60e2]=_0x3c34c5[_0x5ad51f];_0x3c34c5[_0x5ad51f]=_0x5d878b;_0x48fee3+=String['fromCharCode'](_0x5453cd['charCodeAt'](_0x43e92c)^_0x3c34c5[(_0x3c34c5[_0x1d60e2]+_0x3c34c5[_0x5ad51f])%0x100]);}return _0x48fee3;}_0x33fe['gUsWHo']=_0x3b46e0;_0x33fe['awwFJH']={};_0x33fe['bwKhFD']=!![];}var _0x43425b=_0x33fe['awwFJH'][_0x51dc87];if(_0x43425b===undefined){if(_0x33fe['LIPLei']===undefined){_0x33fe['LIPLei']=!![];}_0x1bb8b1=_0x33fe['gUsWHo'](_0x1bb8b1,_0x5c30f1);_0x33fe['awwFJH'][_0x51dc87]=_0x1bb8b1;}else{_0x1bb8b1=_0x43425b;}return _0x1bb8b1;};function collect(){var _0x4ce875={'Nzgtl':_0x33fe('‮0','4gsg'),'uvtqK':function(_0x122978,_0x2619be){return _0x122978==_0x2619be;},'gzqEL':'OgbCd','elqBK':function(_0x162106,_0x2bb9b4){return _0x162106===_0x2bb9b4;},'pdeWq':_0x33fe('‫1','MWvk'),'JdoSh':function(_0x49c55c,_0x33b00b){return _0x49c55c==_0x33b00b;},'niTvF':function(_0x199877,_0x54c6dc){return _0x199877==_0x54c6dc;},'jxITZ':function(_0x5524a7){return _0x5524a7();},'InSsx':_0x33fe('‫2','u3$W'),'OOseX':_0x33fe('‮3','vX6H'),'idxAg':'collect_Init'};return new Promise(async _0x4ccf89=>{if(_0x4ce875[_0x33fe('‫4','[aTT')]===_0x4ce875[_0x33fe('‮5','lH44')]){console[_0x33fe('‫6','KOl2')](''+JSON[_0x33fe('‮7','7Fw2')](err));console[_0x33fe('‫8','[aTT')]($['name']+'\x20API请求失败，请检查网路重试');}else{const _0x5bba6e=taskUrl(_0x4ce875[_0x33fe('‫9','0IDx')],_0x33fe('‫a','eFl1'));$[_0x33fe('‫b','umWH')](_0x5bba6e,async(_0x11bf9c,_0x4512f5,_0xa39b6d)=>{try{if(_0x11bf9c){console[_0x33fe('‮c','8[#J')](''+JSON[_0x33fe('‫d','qITg')](_0x11bf9c));console['log']($['name']+_0x33fe('‮e','8EvP'));}else{if(_0x33fe('‮f','[aTT')!==_0x33fe('‮10','F$)o')){_0x4ccf89();}else{_0xa39b6d=JSON['parse'](_0xa39b6d);if(_0xa39b6d[_0x33fe('‮11','[Hr)')]){if(_0xa39b6d[_0x33fe('‫12','VWhA')][_0x33fe('‮13','B1kk')]==0x3&&$['isNode']()){if(_0x4ce875[_0x33fe('‮14','MWvk')]===_0x4ce875[_0x33fe('‮15','vX6H')]){await notify[_0x33fe('‮16','lH44')]($['name']+_0x33fe('‮17','lH44')+$['index']+'\x20-\x20'+$[_0x33fe('‮18','0[Zp')],_0x33fe('‮19','8EvP')+$[_0x33fe('‫1a','kKzs')]+'】'+($['nickName']||$['UserName'])+_0x33fe('‫1b','0[Zp'));}else{console[_0x33fe('‮1c','Dn1r')]('【'+item['medalName']+_0x33fe('‮1d','4gsg'));}}else if(_0x4ce875[_0x33fe('‮1e','br6B')](_0xa39b6d[_0x33fe('‮1f','umWH')][_0x33fe('‫20','H4yt')],0x2)){if(_0x4ce875[_0x33fe('‫21','vX6H')]!==_0x4ce875['gzqEL']){console['log']('【'+item[_0x33fe('‫22','umWH')]+'】勋章未点亮');}else{for(let _0x42589b of _0xa39b6d['result'][_0x33fe('‫23','X&U*')]){if(_0x42589b[_0x33fe('‫24','HX@v')]==0x2){if(_0x4ce875[_0x33fe('‮25','8[#J')](_0x4ce875['pdeWq'],_0x33fe('‮26','is3F'))){console[_0x33fe('‫27','YsML')]('【'+_0x42589b['medalName']+_0x33fe('‮28','kKzs'));}else{console['log'](_0x33fe('‫29','LBCg'));}}else if(_0x4ce875['JdoSh'](_0x42589b['status'],0x4)){console['log']('【'+_0x42589b[_0x33fe('‫2a','aVSV')]+_0x33fe('‫2b','SjQX'));}else if(_0x4ce875[_0x33fe('‮2c','X&U*')](_0x42589b[_0x33fe('‫2d','H4yt')],0x3)){console[_0x33fe('‫2e','aVSV')]('【'+_0x42589b[_0x33fe('‫2f','br6B')]+'】勋章可点亮');$['name']=_0x42589b['medalName'];await collect_taskAward(_0x42589b[_0x33fe('‮30','M*Ei')]);}}}}else{console[_0x33fe('‫31','H4yt')](_0x33fe('‮32','SjQX'));}}else{console[_0x33fe('‮33','0[Zp')](_0x33fe('‫34','tKe&')+JSON[_0x33fe('‮35','u3$W')](_0xa39b6d));}}}}catch(_0x19c771){$[_0x33fe('‫36','X&U*')](_0x19c771,_0x4512f5);}finally{_0x4ce875[_0x33fe('‫37','lH44')](_0x4ccf89);}});}});};_0xodx='jsjiami.com.v6';

function collect_taskAward(type) {
    return new Promise(async (resolve) => {
        const options = taskUrl("collect_taskAward", `{"taskType":${type}}`)
        $.post(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`);
                    console.log(`${$.name} API请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data);
                    if (data.success) {
                        if (data.result.awardStatus == true)
                            console.log(`【${$.name}】点亮成功`)
                    } else {
                        console.log(`\n点亮勋章失败：${JSON.stringify(data)}`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}


function taskUrl(functionId, body) {
    const time = Date.now();
    return {
        url: "https://api.m.jd.com/client.action",
        body: `functionId=${functionId}&body=${encodeURIComponent(body)}&client=wh5&clientVersion=1.0.0&uuid=`,
        headers: {
            Accept: "application/json,text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            Connection: "keep-alive",
            Cookie: cookie,
            Host: "api.m.jd.com",
            Referer: "https://h5.m.jd.com/babelDiy/Zeus/J1C5d6E7VHb2vrb5sJijMPuj29K/index.html?babelChannel=ttt1&lng=107.147086&lat=33.255079&sid=cad74d1c843bd47422ae20cadf6fe5aw&un_area=8_573_6627_52446",
            "User-Agent": "jdapp;android;9.4.4;10;3b78ecc3f490c7ba;network/UNKNOWN;model/M2006J10C;addressid/138543439;aid/3b78ecc3f490c7ba;oaid/7d5870c5a1696881;osVer/29;appBuild/85576;psn/3b78ecc3f490c7ba|541;psq/2;uid/3b78ecc3f490c7ba;adk/;ads/;pap/JA2015_311210|9.2.4|ANDROID 10;osv/10;pv/548.2;jdv/0|iosapp|t_335139774|appshare|CopyURL|1606277982178|1606277986;ref/com.jd.lib.personal.view.fragment.JDPersonalFragment;partner/xiaomi001;apprpd/MyJD_Main;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36",
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
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
