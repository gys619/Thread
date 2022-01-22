/*
京东答题领金豆
活动入口：京东APP-》搜索 玩一玩-》瓜分20亿
活动时间：2021-10-21至2021-12-31
脚本更新时间：2021-11-23 17:00
9 10 * * * jd_dt.js
 */

const $ = new Env('京东答题领金豆');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0)
} else {
  cookiesArr = [
    $.getdata("CookieJD"),
    $.getdata("CookieJD2"),
    ...$.toObj($.getdata("CookiesJD") || "[]").map((item) => item.cookie)].filter((item) => !!item);
}
const JD_API_HOST = 'https://hserver.moxigame.cn';

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }

  console.log('活动入口：京东APP ==> 我的 ==> 签到领豆 ==> 兑权益 ==> 京豆答题\n' +
      '活动入口地址：https://prodev.m.jd.com/mall/active/2tqdREcm3YLC8pbNPdvofdAwd8te/index.html?tttparams= \n' +
      '活动时间：2021-05-24至2021-06-20\n' +
      '暂时不知道最多能答几次题先只答一次完成任务，答题答案随机选择'
      );

  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.isLogin = true;
      $.beans = 0
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      await $.wait(500)
      await gettoken(`user/token`,`&client=m&url=pengyougou.m.jd.com`);
      $.token = $.tokenList.data
      await $.wait(500)
      await gettoken(`encrypt/pin`);
      $.lkToken = $.tokenList.data.lkToken;
      $.lkEPin = $.tokenList.data.lkEPin;
      console.log(`Token:${$.token}\nlkToken:${$.lkToken}\nlkEPin:${$.lkEPin}\n`)
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, {"open-url": "https://bean.m.jd.com/"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        } else {
          $.setdata('', `CookieJD${i ? i + 1 : ""}`);//cookie失效，故清空cookie。$.setdata('', `CookieJD${i ? i + 1 : "" }`);//cookie失效，故清空cookie。
        }
        continue
      }else{
        await operation();
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
async function operation() {
  try {
        //登录
        await logIn(`{"activeId":"A_8943039_R_6_D_20211015","lkToken":"${$.lkToken}","token":"${$.token}","returnurl":"https://prodev.m.jd.com/mall/active/2tqdREcm3YLC8pbNPdvofdAwd8te/index.html?tttparams=","sid":"","un_area":"","tttparams":"","lkEPin":"${$.lkEPin}"}`)
        await $.wait(500);
        //获取任务列表
        await getTaskList(`id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`);
        await $.wait(500);
        //做任务
        for (i = 0; i < $.allTaskList.length; i++){
            if ([9].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                $.skuId = $.allTaskList[i].adInfo.sValue;
                let sleep = Number($.allTaskList[i].res.sTime)
                console.log(`去做${$.taskName}\t等待${sleep}秒`)
                await doTaskList(`{"api": "followSku","skuId": "${$.skuId}","id": "${$.id}","activeid": "A_8943039_R_6_D_20211015","activeId": "A_8943039_R_6_D_20211015","authcode": "${$.authcode}","token": "${$.taskToken}"}`)
                await $.wait(sleep * 1000)
            };
            if ([21].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                $.skuList = $.allTaskList[i].adInfo.sValue;
                let sleep = Number($.allTaskList[i].res.sTime)
                console.log(`去做${$.taskName}\t等待${sleep}秒`)
                await doTaskList(`{"api": "addProductToCart","skuList": "${$.skuList}","id": "${$.id}","activeid": "A_8943039_R_6_D_20211015","activeId": "A_8943039_R_6_D_20211015","authcode": "${$.authcode}","token": "${$.taskToken}"}`)
                await $.wait(sleep * 1000)
            };
            if ([11].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                $.skuId = $.allTaskList[i].adInfo.sValue;
                let sleep = Number($.allTaskList[i].res.sTime)
                console.log(`去做${$.taskName}\t等待${sleep}秒`)
                await doTaskList(`{"api": "followShop","shopId": "${$.skuId}","id": "${$.id}","activeid": "A_8943039_R_6_D_20211015","activeId": "A_8943039_R_6_D_20211015","authcode": "${$.authcode}","token": "${$.taskToken}"}`)
                await $.wait(sleep * 1000)
            };
            if ([26].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                $.skuId = $.allTaskList[i].adInfo.sValue;
                let sleep = Number($.allTaskList[i].res.sTime)
                console.log(`去做${$.taskName}\t等待${sleep}秒`)
                await doTaskList(`{"api": "followChannel","channelId": "${$.skuId}","id": "${$.id}","activeid": "A_8943039_R_6_D_20211015","activeId": "A_8943039_R_6_D_20211015","authcode": "${$.authcode}","token": "${$.taskToken}"}`)
                await $.wait(sleep * 1000)
            };
            if ([27].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                $.skuId = $.allTaskList[i].adInfo.sValue;
                let sleep = Number($.allTaskList[i].res.sTime)
                console.log(`去做${$.taskName}`)
                await doCardTask(`{"taskType":27,"value":1,"activeId":"A_8943039_R_6_D_20211015","lkToken":"${$.lkToken}","token":"${$.taskToken}","returnurl":"https://prodev.m.jd.com/mall/active/2tqdREcm3YLC8pbNPdvofdAwd8te/index.html?tttparams=","sid":"","un_area":"","tttparams":"","id":"${$.id}","activeid":"A_8943039_R_6_D_20211015","authcode":"${$.authcode}"}`)
                await $.wait(sleep * 1000)
            };
//             if ([10].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.value === 0){
//                 $.taskName = $.allTaskList[i].res.sName;
//                 let sleep = 1;
//                 console.log(`去做${$.taskName}\t等待${sleep}秒`)
//                 await $.wait(sleep * 1000);
//                 await doLottery(`{"id":"${$.id}","activeid":"A_8943039_R_6_D_20211015","activeId":"A_8943039_R_6_D_20211015","authcode":"${$.authcode}","token":"${$.taskToken}"}`)
//                 await $.wait(sleep * 1000);
//             };
            if (["匹配挑战"].includes($.allTaskList[i].res.sName) && $.allTaskList[i].state.value === 0){
                $.taskName = $.allTaskList[i].res.sName;
                console.log(`去做${$.taskName}\t等待答题完成`)
                await playlogIn(`{"info":${JSON.stringify($.info)},"inviterId":"inviterId"}`)
                await joinAnswer(`{"gameId":"${$.gameId}","token":"${$.playToken}"}`)
                await $.wait(5000);
                await doAnswer(`startAnswer`, `{"gameId":"${$.gameId}","token":"${$.playToken}"}`)
                console.log(`问题：${$.jjson.data.question.description}\n选项：\n${$.jjson.data.question.options.join(`\n`)}\n`)
                let answerBank = []
                for (j = 0; j <= 9; j++){
                    let d = Math.round(Math.random()*10);
                    while (d < 1 || d > 4){
                        d = Math.round(Math.random()*10);
                    }
                    await doAnswer(`submitChoice`, `{"userChoice":${d},"answerTime":1,"curQuesIndex":${j},"gameId":"${$.gameId}","token":"${$.playToken}"}`)
                    if (j < 9){
                        console.log(`问题：${$.jjson.data.question.description}\n选项：\n${$.jjson.data.question.options.join(`\n`)}\n`)
                    }else{
                        if ($.jjson.data.isWin === true){
                            console.log(`全部回答完毕并获得胜利！\n得到${$.jjson.data.income}金币`)
                        }else{
                            console.log(`全部回答完毕但是输了！\n`)
                        }
                    }
                    await $.wait(10000)
                }
            };
        }
        await $.wait(500)
        //领取任务奖励
        await getTaskList(`id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`);
        await $.wait(1000)
        for (i = 0; i < $.allTaskList.length; i++){
            //签到
            if ([22].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.iFreshTimes === 0){
                $.taskid = $.allTaskList[i].res.sID;
                await receiveTaskRewards(`taskid=${$.taskid}&id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`)
            };
            await $.wait(500)
            if ([9, 10, 21, 11, 26, 27, 41, 3].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.iFreshTimes === 0 && $.allTaskList[i].state.value === 1){
                $.taskid = $.allTaskList[i].res.sID;
                await receiveTaskRewards(`taskid=${$.taskid}&id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`)
                await $.wait(500)
            }
        };
        await redeemHomePage(`id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`);
        let condition = [2000, 4900, 62700, 149400]
        for (let k = $.exchangeList.length-1; k >= 0; k--){
            if ($.coin >= condition[k] && $.exchangeList[k].left === 1){
                consumeid = $.exchangeList[k].res.sID;
                console.log(`兑换${$.exchangeList[k].name}`)
                await exchange(`consumeid=${consumeid}&id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`)
                $.coin -= condition[k]
                await $.wait(500)
            }else{
                console.log(`已兑换过 或 金币不足不能兑换`)
            };
        }
        await getTaskList(`id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`);
        await $.wait(500)
        for (i = 0; i < $.allTaskList.length; i++){
            if ([3].includes($.allTaskList[i].res.eType) && $.allTaskList[i].state.iFreshTimes === 0 && $.allTaskList[i].state.value === 1){
                $.taskid = $.allTaskList[i].res.sID;
                await receiveTaskRewards(`taskid=${$.taskid}&id=${$.id}&activeid=A_8943039_R_6_D_20211015&activeId=A_8943039_R_6_D_20211015&authcode=${$.authcode}&token=${$.taskToken}`)
                await $.wait(500)
            }
        };
    } catch (e) {
        $.logErr(e)
    }
}

/*function showMsg() {
  return new Promise(resolve => {
    if ($.beans) {
      message += ``
      $.msg($.name, '', `【京东账号${$.index}】${$.UserName || $.nickName}\n${message}`);
    }
    resolve()
  })
}*/

//登录
function logIn(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jddb/active/role/login", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} logIn API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                $.info = data.info
                $.gameId = data.info.userId
                $.id = data.id;
                $.taskToken = data.token;
                $.authcode = data.authcode;
                console.log(`GameId:${$.gameId}`)
            }else{
                console.log(`logIn失败：${JSON.stringify(data)}`)
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
};

//获取任务列表
function getTaskList(body) {
  return new Promise(resolve => {
    $.get(taskGetUrl("/jddb//active/jingdong/gametasks", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} getTaskList API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                $.allTaskList = data.tasks;
                //console.log(JSON.stringify($.allTaskList))
            }else{
                console.log(`获取任务列表失败：${JSON.stringify(data)}`)
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

//做任务
function doTaskList(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jddb//active/jingdong/execute", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} doTaskList API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`成功`)
            }else{
                console.log(`做任务失败：${JSON.stringify(data)}`)
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

//浏览卡包
function doCardTask(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jddb//role/base/uploadtask", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} doCardTask API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`成功`)
            }else{
                console.log(`做任务失败：${JSON.stringify(data)}`)
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

//抽奖
function doLottery(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jddb//active/saas/jingdong/roll", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} doLottery API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`成功获得${data.item[0].count}金币`)
            }else{
                console.log(`做任务失败：${JSON.stringify(data)}`)
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

//领取任务奖励！
function receiveTaskRewards(body) {
  return new Promise(resolve => {
    $.get(taskGetUrl("jddb//active/jingdong/finishtask", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} receiveTaskRewards API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`领取${data.res.sName}`)
            }else{
                console.log(`领取任务奖励失败：${JSON.stringify(data)}`)
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

//兑换主页
function redeemHomePage(body) {
  return new Promise(resolve => {
    $.get(taskGetUrl("/jddb//active/role/marketgoods", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} redeemHomePage API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                $.exchangeList = data.list;
                $.coin = Number(data.money);
                console.log(`现有金币${$.coin}`)
            }else{
                console.log(`获取兑换主页失败：${JSON.stringify(data)}`)
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

//兑换
function exchange(body) {
  return new Promise(resolve => {
    $.get(taskGetUrl("/jddb//active/role/marketbuy", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} exchange API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`兑换成功`)
            }else{
                console.log(`兑换失败：${JSON.stringify(data)}`)
            }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
};

//答题登录
function playlogIn(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jdanswer/player/login", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} logIn API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                $.playToken = data.data.token;
                console.log(`答题登录成功`)
            }else{
                console.log(`playlogIn失败：${JSON.stringify(data)}`)
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

//参加答题
function joinAnswer(body) {
  return new Promise(resolve => {
    $.post(taskPostUrl("jdanswer/player/startMatching", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} joinAnswer API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                console.log(`参加答题成功\n`)
            }else{
                console.log(`参加答题失败：${JSON.stringify(data)}`)
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

//答题
function doAnswer(choose,body) {
  return new Promise(resolve => {
    $.post(taskPostUrl(`jdanswer/player/${choose}`, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} doAnswer API请求失败，请检查网路重试`)
        } else {
            data = JSON.parse(data)
            //console.log(JSON.stringify(data))
            if (data.code === 0){
                $.jjson = data
                //console.log(`${JSON.stringify(data)}\n`)
            }else{
                console.log(`答题失败：${JSON.stringify(data)}\n`)
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

function taskPostUrl(function_id, bod = {}, ) {
    return {
    url: `${JD_API_HOST}/${function_id}`,
    body: `${bod}`,
    headers: {
      "Accept": "*/*",
      "X-Requested-With":"com.jingdong.app.mall",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Origin":"https://game-cdn.moxigame.cn",
      "Content-Type": "application/json",
      "Host": "hserver.moxigame.cn",
      "Referer": `https://game-cdn.moxigame.cn/wuhangame/JD_Anaswer_v1_release/index.html?activeId=A_8943039_R_6_D_20211015`,
      "Cookie": cookie,
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
    }
  }
}

function taskGetUrl(function_id, bod = {}, ) {
    return {
    url: `${JD_API_HOST}/${function_id}?${bod}`,
    headers: {
      "Accept": "*/*",
      "X-Requested-With":"com.jingdong.app.mall",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Origin":"https://game-cdn.moxigame.cn",
      "Content-Type": "application/json",
      "Host": "hserver.moxigame.cn",
      "Referer": `https://game-cdn.moxigame.cn/wuhangame/JD_Anaswer_v1_release/index.html?activeId=A_8943039_R_6_D_20211015`,
      "Cookie": cookie,
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
    }
  }
}

function gettoken(function_id, body = "") {
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

function TotalBean() {
  return new Promise(async resolve => {
    const opt = {
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
    $.get(opt, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 1001) {
              $.isLogin = false; //cookie过期
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

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
