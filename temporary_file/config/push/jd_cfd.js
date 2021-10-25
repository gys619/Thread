/*
京喜财富岛
cron 5 * * * * jd_cfd.js
更新时间：2021-9-10
活动入口：京喜APP-我的-京喜财富岛
from：https://github.com/Aaron-lv/sync/tree/jd_scripts
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#京喜财富岛
5 * * * * jd_cfd.js, tag=京喜财富岛, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true

================Loon==============
[Script]
cron "5 * * * *" script-path=https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_cfd.js,tag=京喜财富岛

===============Surge=================
京喜财富岛 = type=cron,cronexp="5 * * * *",wake-system=1,timeout=3600,script-path=jd_cfd.js

============小火箭=========
京喜财富岛 = type=cron,script-path=jd_cfd.js, cronexpr="5 * * * *", timeout=3600, enable=true
 */

const $ = new Env("京喜财富岛");
const JD_API_HOST = "https://m.jingxi.com/";
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
$.showLog = $.getdata("cfd_showLog") ? $.getdata("cfd_showLog") === "true" : false;
$.notifyTime = $.getdata("cfd_notifyTime");
$.result = [];
$.shareCodes = [];
let cookiesArr = [], cookie = '', token = '';
let UA, UAInfo = {}
let nowTimes;
let codePool;

const randomCount = $.isNode() ? 3 : 3;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
$.appId = 10028;
!(async () => {
  await requireConfig();
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
  await requestAlgo();
  await $.wait(1000)
  
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.nickName = '';
      $.isLogin = true;
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      $.allTask = []
      $.info = {}
      UA = `jdpingou;iPhone;5.4.0;14.7.1;${randomString(40)};network/wifi;model/iPhone11,2;appBuild/100650;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
      token = await getJxToken()
      await shareCodesFormat()
      await cfd();
      await $.wait(2000);
      UAInfo[$.UserName] = UA
    }
  }
  for (let j = 0; j < cookiesArr.length; j++) {
    cookie = cookiesArr[j];
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
    $.canHelp = true
    UA = UAInfo[$.UserName]
    if ($.shareCodes && $.shareCodes.length) {
      console.log(`\n自己账号内部循环互助\n`);
      for (let id of $.shareCodes) {
        console.log(`账号${$.UserName} 去助力 ${id}`)
        await helpByStage(id)
        await $.wait(3000)
        if (!$.canHelp) break
      }
    }
    if (!$.canHelp) continue
    await readShareCode();
    //console.log(codePool)
    if (codePool && codePool.length) {
      console.log(`\n****助力池互助****\n`);
      for (let id of codePool) {
        console.log(`账号${$.UserName} 去助力 ${id}`)
        await helpByStage(id)
        if (!$.canHelp) break
        await $.wait(1000)
      }
    }else {
        console.log('助力池获取互助码失败，请稍后重试');
    }
  }
  await showMsg();
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());

async function cfd() {
  try {
    nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
    let beginInfo = await getUserInfo();
    if (beginInfo.LeadInfo.ddwFundTargTm === 2) {
      console.log(`还未开通活动，尝试初始化`)
      await noviceTask()
      await $.wait(2000)
      beginInfo = await getUserInfo(false);
      if (beginInfo.LeadInfo.ddwFundTargTm !== 2) {
        console.log(`初始化成功\n`)
      } else {
        console.log(`初始化失败\n`)
        return
      }
    }
    
     // 寻宝
    console.log(`寻宝`)
    let XBDetail = beginInfo.XbStatus.XBDetail.filter((x) => x.dwRemainCnt !== 0)
    if (XBDetail.length !== 0) {
      console.log(`开始寻宝`)
      for (let key of Object.keys(beginInfo.XbStatus.XBDetail)) {
        let vo = beginInfo.XbStatus.XBDetail[key]
        await $.wait(2000)
        await TreasureHunt(vo.strIndex)
      }
    } else {
      console.log(`暂无宝物`)
    }

    //每日签到
    await $.wait(2000)
    await getTakeAggrPage('sign')
    
    //小程序每日签到
     await $.wait(2000)
     await getTakeAggrPage('wxsign')

    //助力奖励
    await $.wait(2000)
    await getTakeAggrPage('helpdraw')

    console.log('')
    //卖贝壳
    // await $.wait(2000)
    // await querystorageroom('1')

    //升级建筑
    await $.wait(2000)
    for(let key of Object.keys($.info.buildInfo.buildList)) {
      let vo = $.info.buildInfo.buildList[key]
      let body = `strBuildIndex=${vo.strBuildIndex}`
      await getBuildInfo(body, vo)
      await $.wait(2000)
    }

    //合成月饼
    //if (nowTimes.getHours() >= 5) {
    //  await $.wait(2000)
    //  await composeGameState()
    //}

    //接待贵宾
    console.log(`接待贵宾`)
    if ($.info.StoryInfo.StoryList) {
      await $.wait(2000)
      for (let key of Object.keys($.info.StoryInfo.StoryList)) {
        let vo = $.info.StoryInfo.StoryList[key]
        if (vo.Special) {
          console.log(`请贵宾下船，需等待${vo.Special.dwWaitTime}秒`)
          await specialUserOper(vo.strStoryId, '2', vo.ddwTriggerDay, vo)
          await $.wait(vo.Special.dwWaitTime * 1000)
          await specialUserOper(vo.strStoryId, '3', vo.ddwTriggerDay, vo)
          await $.wait(2000)
        } else {
          console.log(`当前暂无贵宾\n`)
        }
      }
    } else {
      console.log(`当前暂无贵宾\n`)
    }

    //收藏家
    console.log(`收藏家`)
    if ($.info.StoryInfo.StoryList) {
      await $.wait(2000)
      for (let key of Object.keys($.info.StoryInfo.StoryList)) {
        let vo = $.info.StoryInfo.StoryList[key]
        if (vo.Collector) {
          console.log(`喜欢贝壳的收藏家来了，快去卖贝壳吧~`)
          await collectorOper(vo.strStoryId, '2', vo.ddwTriggerDay)
          await $.wait(2000)
          await querystorageroom('2')
          await $.wait(2000)
          await collectorOper(vo.strStoryId, '4', vo.ddwTriggerDay)
        } else {
          console.log(`当前暂无收藏家\n`)
        }
      }
    } else {
      console.log(`当前暂无收藏家\n`)
    }

    //美人鱼
    console.log(`美人鱼`)
    if ($.info.StoryInfo.StoryList) {
      await $.wait(2000)
      for (let key of Object.keys($.info.StoryInfo.StoryList)) {
        let vo = $.info.StoryInfo.StoryList[key]
        if (vo.Mermaid) {
          if (vo.Mermaid.dwIsToday === 1) {
            console.log(`可怜的美人鱼困在沙滩上了，快去解救她吧~`)
            await mermaidOper(vo.strStoryId, '1', vo.ddwTriggerDay)
          } else if (vo.Mermaid.dwIsToday === 0) {
            await mermaidOper(vo.strStoryId, '4', vo.ddwTriggerDay)
          }
        } else {
          console.log(`当前暂无美人鱼\n`)
        }
      }
    } else {
      console.log(`当前暂无美人鱼\n`)
    }

    //倒垃圾
    await $.wait(2000)
    await queryRubbishInfo()

    //雇导游
    await $.wait(2000);
    await employTourGuideInfo();

    console.log(`\n做任务`)
    //牛牛任务
    await $.wait(2000)
    await getActTask()

    //日常任务
    await $.wait(2000);
    await getTaskList(0);
    await $.wait(2000);
    await browserTask(0);

    //成就任务
    await $.wait(2000);
    await getTaskList(1);
    await $.wait(2000);
    await browserTask(1);

    await $.wait(2000);
    const endInfo = await getUserInfo(false);
    $.result.push(
        `【京东账号${$.index}】${$.nickName || $.UserName}`,
        `【🥇金币】${endInfo.ddwCoinBalance}`,
        `【💵财富值】${endInfo.ddwRichBalance}\n`,
    );

    // $.result.push(
    //     `【京东账号${$.index}】${$.nickName || $.UserName}`,
    //     `【💵财富值】任务前: ${beginInfo.ddwRichBalance}\n【💵财富值】任务后: ${endInfo.ddwRichBalance}`,
    //     `【💵财富值】净增值: ${endInfo.ddwRichBalance - beginInfo.ddwRichBalance}\n`
    // );
  } catch (e) {
    $.logErr(e)
  }
}

// 寻宝
function TreasureHunt(strIndex) {
   return new Promise((resolve) => {
     $.get(taskUrl(`user/TreasureHunt`, `strIndex=${strIndex}`), (err, resp, data) => {
       try {
         if (err) {
           console.log(`${JSON.stringify(err)}`)
           console.log(`${$.name} TreasureHunt API请求失败，请检查网路重试`)
         } else {
           data = JSON.parse(data);
           if (data.iRet === 0) {
             if (data.AwardInfo.dwAwardType === 0) {
               console.log(`${data.strAwardDesc}，获得 ${data.AwardInfo.ddwValue} 金币`)
             } else if (data.AwardInfo.dwAwardType === 1) {
               console.log(`${data.strAwardDesc}，获得 ${data.AwardInfo.ddwValue} 财富`)
             } else {
               console.log(JSON.stringify(data))
             }
           } else {
             console.log(`寻宝失败：${data.sErrMsg}`)
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

// 合成月饼
async function composeGameState(type = true) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/ComposePearlState`, ``, `&dwGetType=0`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} ComposeGameState API请求失败，请检查网路重试`)
        } else {
          $.ComposeGameState = JSON.parse(data);
          console.log(`当前已合成${$.ComposeGameState.dwCurProgress}颗月饼，总计获得${$.ComposeGameState.ddwVirHb / 100}元红包\n`);
          if ($.ComposeGameState.dayDrawInfo.dwIsDraw == 0) {
            let res = await getPearlDailyReward();
            if (res && res.iRet == 0 && res.strToken) {
                let res1 = await pearlDailyDraw(res);
                if(res1 && res1.iRet == 0){
                    if(res1.strPrizeName){
                        console.log(`抽奖获得:${res.strPrizeName || $.toObj(res,res)}`)
                    }else{
                        console.log(`抽奖获得:${$.toObj(res,res)}`)
                    }
                }else{
                    console.log("抽奖失败\n"+$.toObj(res,res))
                }
            }
          }

          if ($.ComposeGameState.strDT) {
            let b = 1;
            console.log(`合月饼${b}次 `)
            for(i=1;b--;i++){
                let n = Math.ceil(Math.random()*12+12)
                console.log(`上报次数${n}`)
                for(m=1;n--;m++){
                    console.log(`上报第${m}次`)
                    await $.wait(5000);
                    await pearlRealTmReport();
                    let s = Math.floor((Math.random()*3))
                    let n = 0
                    if(s == 1) n = 1
                    if(n === 1){
                        let res = await pearlComposePearlAward();
                        if(res && res.iRet == 0){
                            console.log(`上报得红包:${res.ddwAwardHb && '获得'+res.ddwAwardHb/100+"红包" || ''}${res.ddwVirHb && ' 当前有'+res.ddwVirHb/100+"红包" || ''}`)
                        }else {
                            console.log($.toObj(res,res))
                        }
                    }
                }
                console.log("合成月饼")
                let strLT = ($.ComposeGameState.oPT || [])[$.ComposeGameState.ddwCurTime % ($.ComposeGameState.oPT || []).length]
                let res = await pearlComposePearlAddProcess(strLT);
                if(res && res.iRet == 0){
                    console.log(`合成成功:${res.ddwAwardHb && '获得'+res.ddwAwardHb/100+"红包 " || ''}当前有${res.dwCurProgress}个月饼${res.ddwVirHb && ' '+res.ddwVirHb/100+"红包" || ''}`)
                }else{
                    console.log(JSON.stringify(res))
                }
                $.ComposeGameState = await checkPearl();  
            }
          }else {
            console.log(`今日已完成\n`)
          }
        for (let i of $.ComposeGameState.stagelist || []) {
            if (i.dwIsAward == 0 && $.ComposeGameState.dwCurProgress >= i.dwCurStageEndCnt) {
                await $.wait(2000)
                let res = await pearlComposeGameAward();
                await printRes(res,'月饼领奖')
            }
        }
          // if (type) {
          //   console.log(`合成珍珠`)
          //   if (data.iRet === 0) {
          //     if (data.dwCurProgress < data.stagelist[data.stagelist.length - 1].dwCurStageEndCnt && data.strDT) {
          //       let count = data.stagelist[data.stagelist.length - 1].dwCurStageEndCnt
          //       console.log(`当前已合成${data.dwCurProgress}颗珍珠，还需合成珍珠${count - data.dwCurProgress}颗\n`)
          //       for (let j = data.dwCurProgress; j < count; j++) {
          //         let num = Math.ceil(Math.random() * 12 + 12)
          //         console.log(`合成珍珠：模拟操作${num}次`)
          //         for (let v = 0; v < num; v++) {
          //           console.log(`模拟操作进度：${v + 1}/${num}`)
          //           await $.wait(2000)
          //           await realTmReport(data.strMyShareId)
          //         }
          //         let res = await composeGameAddProcess(data.strDT)
          //         if (res.iRet === 0) {
          //           console.log(`\n合成珍珠成功：${j + 1}/${count}\n`)
          //         } else {
          //           console.log(`\n合成珍珠失败：${data.sErrMsg}\n`)
          //         }
          //       }
          //       let composeGameStateRes = await composeGameState(false)
          //       console.log("合成珍珠领奖")
          //       for (let key of Object.keys(composeGameStateRes.stagelist)) {
          //         let vo = composeGameStateRes.stagelist[key]
          //         if (vo.dwIsAward == 0 && composeGameStateRes.dwCurProgress >= vo.dwCurStageEndCnt) {
          //           await $.wait(2000)
          //           await composeGameAward(vo.dwCurStageEndCnt)
          //         }
          //       }
          //     } else {
          //       console.log(`今日已完成\n`)
          //     }
          //   }
          // }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

function checkPearl() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/ComposePearlState`, ``, `&dwGetType=0`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function getPearlDailyReward() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/GetPearlDailyReward`, '__t,strZone', ``), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function pearlComposePearlAward() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/ComposePearlAward`, '__t,size,strBT,strZone,type', `__t=${Date.now()}&type=4&size=1&strBT=${$.ComposeGameState.strDT}`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function pearlDailyDraw(res) {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/PearlDailyDraw`, '__t,ddwSeaonStart,strToken,strZone', `&ddwSeaonStart=${$.ComposeGameState.ddwSeasonStartTm}&strToken=${res.strToken}`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function pearlRealTmReport() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/RealTmReport`, '', `&dwIdentityType=0&strBussKey=composegame&strMyShareId=${$.ComposeGameState.strMyShareId}&ddwCount=10`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function pearlComposePearlAddProcess(strLT) {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/ComposePearlAddProcess`, '__t,strBT,strLT,strZone', `&strBT=${$.ComposeGameState.strDT}&strLT=${strLT}`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}

function pearlComposeGameAward() {
    return new Promise((resolve) => {
        $.get(taskUrl(`user/ComposeGameAward`, '__t,dwCurStageEndCnt,strZone', `&dwCurStageEndCnt=${i.dwCurStageEndCnt}`), (err, resp, data) => {
            try {
                if (err) {
                  console.log(`${JSON.stringify(err)}`)
                  console.log(`${$.name} GetPearlDailyReward API请求失败，请检查网路重试`)
                } else {
                  data = JSON.parse(data);
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data || null);
            }
        })
    })
}
/*
function realTmReport(strMyShareId) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/RealTmReport`, `dwIdentityType=0&strBussKey=composegame&strMyShareId=${strMyShareId}&ddwCount=5`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} RealTmReport API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function composeGameAddProcess(strDT) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/ComposeGameAddProcess`, `strBT=${strDT}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} ComposeGameAddProcess API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function composeGameAward(dwCurStageEndCnt) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/ComposeGameAward`, `dwCurStageEndCnt=${dwCurStageEndCnt}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} ComposeGameAward API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) {
            if (data.dwPrizeType === 0) {
              console.log(`合成珍珠领奖成功：获得${data.ddwCoin}金币`)
            } else if (data.dwPrizeType === 1) {
              console.log(`合成珍珠领奖成功：获得${data.ddwMoney}财富\n`)
            }
          } else {
            console.log(`合成珍珠领奖失败：${data.sErrMsg}\n`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
*/
// 接待贵宾
function specialUserOper(strStoryId, dwType, ddwTriggerDay, StoryList) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/SpecialUserOper`, `strStoryId=${strStoryId}&dwType=${dwType}&triggerType=0&ddwTriggerDay=${ddwTriggerDay}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} SpecialUserOper API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (dwType === '2') {
            if (data.iRet === 0 || data.sErrMsg === "success") {
              console.log(`贵宾'${StoryList.Special.strName}'下船成功`)
            } else {
              console.log(`贵宾'${StoryList.Special.strName}'下船失败 ${data.sErrMsg}\n`)
            }
          } else if (dwType === '3') {
            if (data.iRet === 0 || data.sErrMsg === "success") {
              console.log(`贵宾'${StoryList.Special.strName}'用餐成功：获得${StoryList.Special.ddwCoin}金币\n`)
            } else {
              console.log(`贵宾'${StoryList.Special.strName}'用餐失败：${data.sErrMsg}\n`)
            }
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

// 收藏家
function collectorOper(strStoryId, dwType, ddwTriggerDay) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/CollectorOper`, `strStoryId=${strStoryId}&dwType=${dwType}&ddwTriggerDay=${ddwTriggerDay}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} CollectorOper API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

// 美人鱼
async function mermaidOper(strStoryId, dwType, ddwTriggerDay) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/MermaidOper`, `strStoryId=${strStoryId}&dwType=${dwType}&ddwTriggerDay=${ddwTriggerDay}`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} MermaidOper API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          switch (dwType) {
            case '1':
              if (data.iRet === 0 || data.sErrMsg === 'success') {
                console.log(`开始解救美人鱼`)
                dwType = '3'
                await mermaidOper(strStoryId, dwType, ddwTriggerDay)
                await $.wait(2000)
              } else {
                console.log(`开始解救美人鱼失败：${data.sErrMsg}\n`)
              }
              break
            case '2':
              break
            case '3':
              if (data.iRet === 0 || data.sErrMsg === 'success') {
                dwType = '2'
                let mermaidOperRes = await mermaidOper(strStoryId, dwType, ddwTriggerDay)
                console.log(`解救美人鱼成功：获得${mermaidOperRes.Data.ddwCoin || '0'}金币\n`)
              } else {
                console.log(`解救美人鱼失败：${data.sErrMsg}\n`)
              }
              break
            case '4':
              if (data.iRet === 0 || data.sErrMsg === 'success') {
                console.log(`昨日解救美人鱼领奖成功：获得${data.Data.Prize.strPrizeName}\n`)
              } else {
                console.log(`昨日解救美人鱼领奖失败：${data.sErrMsg}\n`)
              }             
              break
            default:
              break
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

// 卖贝壳
async function querystorageroom(dwSceneId) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/querystorageroom`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} querystorageroom API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`\n卖贝壳`)
          let bags = []
          for (let key of Object.keys(data.Data.Office)) {
            let vo = data.Data.Office[key]
            bags.push(vo.dwType)
            bags.push(vo.dwCount)
          }
          if (bags.length !== 0) {
            let strTypeCnt = ''
            for (let j = 0; j < bags.length; j++) {
              if (j % 2 === 0) {
                strTypeCnt += `${bags[j]}:`
              } else {
                strTypeCnt += `${bags[j]}|`
              }
            }
            await $.wait(2000)
            await sellgoods(`strTypeCnt=${strTypeCnt}&dwSceneId=${dwSceneId}`)
          } else {
            console.log(`背包是空的，快去捡贝壳吧\n`)
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
function sellgoods(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/sellgoods`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} sellgoods API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) {
            console.log(`贝壳出售成功：获得${data.Data.ddwCoin}金币 ${data.Data.ddwMoney}财富\n`)
          } else {
            console.log(`贝壳出售失败：${data.sErrMsg}\n`)
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

// 每日签到
async function getTakeAggrPage(type) {
  return new Promise(async (resolve) => {
    switch (type) {
      case 'sign':
        $.get(taskUrl(`story/GetTakeAggrPage`), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetTakeAggrPage API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
              console.log(`\n每日签到`)
              for (let key of Object.keys(data.Data.Sign.SignList)) {
                let vo = data.Data.Sign.SignList[key]
                if (vo.dwDayId === data.Data.Sign.dwTodayId) {
                  if (vo.dwStatus !== 1) {
                    const body = `ddwCoin=${vo.ddwCoin}&ddwMoney=${vo.ddwMoney}&dwPrizeType=${vo.dwPrizeType}&strPrizePool=${vo.strPrizePool}&dwPrizeLv=${vo.dwBingoLevel}&strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`
                    await rewardSign(body)
                    await $.wait(2000)
                  } else {
                    console.log(`今日已签到\n`)
                    break
                  }
                }
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      case 'wxsign':
         $.get(taskUrl(`story/GetTakeAggrPage`, '', 6), async (err, resp, data) => {
           try {
             if (err) {
               console.log(`${JSON.stringify(err)}`)
               console.log(`${$.name} GetTakeAggrPage API请求失败，请检查网路重试`)
             } else {
               data = JSON.parse(data);
               console.log(`小程序每日签到`)
               for (let key of Object.keys(data.Data.Sign.SignList)) {
                 let vo = data.Data.Sign.SignList[key]
                 if (vo.dwDayId === data.Data.Sign.dwTodayId) {
                   if (vo.dwStatus !== 1) {
                     const body = `ddwCoin=${vo.ddwCoin}&ddwMoney=${vo.ddwMoney}&dwPrizeType=${vo.dwPrizeType}&strPrizePool=${vo.strPrizePool}&dwPrizeLv=${vo.dwBingoLevel}&strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`
                     await rewardSign(body, 6)
                     await $.wait(2000)
                   } else {
                     console.log(`今日已签到\n`)
                     break
                   }
                 }
               }
             }
           } catch (e) {
             $.logErr(e, resp);
           } finally {
             resolve();
           }
         })
         break
      case 'helpdraw':
        $.get(taskUrl(`story/GetTakeAggrPage`), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetTakeAggrPage API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
              console.log(`领助力奖励`)
              let helpNum = []
              for (let key of Object.keys(data.Data.Employee.EmployeeList)) {
                let vo = data.Data.Employee.EmployeeList[key]
                if (vo.dwStatus !== 1) {
                  helpNum.push(vo.dwId)
                }
              }
              if (helpNum.length !== 0) {
                for (let j = 0; j < helpNum.length; j++) {
                  await helpdraw(helpNum[j])
                  await $.wait(2000)
                }
              } else {
                console.log(`暂无可领助力奖励`)
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      default:
        break
    }
  })
}
function rewardSign(body, dwEnv = 7) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/RewardSign`, body, dwEnv), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} RewardSign API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === "success") {
            if (data.Data.ddwCoin) {
              console.log(`签到成功：获得${data.Data.ddwCoin}金币\n`)
            } else if (data.Data.ddwMoney) {
              console.log(`签到成功：获得${data.Data.ddwMoney}财富\n`)
            } else if (data.Data.strPrizeName) {
              console.log(`签到成功：获得${data.Data.strPrizeName}\n`)
            } else {
              console.log(`签到成功：很遗憾未中奖~\n`)
            }
          } else {
            console.log(`签到失败：${data.sErrMsg}\n`)
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
function helpdraw(dwUserId) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/helpdraw`, `dwUserId=${dwUserId}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} helpdraw API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === "success") {
            if (data.Data.StagePrizeInfo) {
              console.log(`领取助力奖励成功：获得${data.Data.ddwCoin}金币 ${data.Data.StagePrizeInfo.ddwMoney}财富 ${(data.Data.StagePrizeInfo.strPrizeName && !data.Data.StagePrizeInfo.ddwMoney) ? data.Data.StagePrizeInfo.strPrizeName : `0元`}红包`)
            } else {
              console.log(`领取助力奖励成功：获得${data.Data.ddwCoin}金币`)
            }
          } else {
            console.log(`领取助力奖励失败：${data.sErrMsg}`)
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

// 倒垃圾
async function queryRubbishInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/QueryRubbishInfo`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} QueryRubbishInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`倒垃圾`)
          if (data.Data.StoryInfo.StoryList.length !== 0) {
            for (let key of Object.keys(data.Data.StoryInfo.StoryList)) {
              let vo = data.Data.StoryInfo.StoryList[key]
              if (vo.Rubbish) {
                await $.wait(2000)
                let rubbishOperRes = await rubbishOper('1')
                if (Object.keys(rubbishOperRes.Data.ThrowRubbish.Game).length) {
                  console.log(`获取垃圾信息成功：本次需要垃圾分类`)
                  for (let key of Object.keys(rubbishOperRes.Data.ThrowRubbish.Game.RubbishList)) {
                    let vo = rubbishOperRes.Data.ThrowRubbish.Game.RubbishList[key]
                    await $.wait(2000)
                    var rubbishOperTwoRes = await rubbishOper('2', `dwRubbishId=${vo.dwId}`)
                  }
                  if (rubbishOperTwoRes.iRet === 0) {
                    let AllRubbish = rubbishOperTwoRes.Data.RubbishGame.AllRubbish
                    console.log(`倒垃圾成功：获得${AllRubbish.ddwCoin}金币 ${AllRubbish.ddwMoney}财富\n`)
                  } else {
                    console.log(`倒垃圾失败：${rubbishOperTwoRes.sErrMsg}\n`)
                  }
                } else {
                  console.log(`获取垃圾信息成功：本次不需要垃圾分类`)
                  if (rubbishOperRes.iRet === 0 || rubbishOperRes.sErrMsg === "success") {
                    console.log(`倒垃圾成功：获得${rubbishOperRes.Data.ThrowRubbish.ddwCoin}金币\n`)
                  } else {
                    console.log(`倒垃圾失败：${rubbishOperRes.sErrMsg}\n`)
                  }
                }
              } else {
                console.log(`当前暂无垃圾\n`)
              }
            }
          } else {
            console.log(`当前暂无垃圾\n`)
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
function rubbishOper(dwType, body = '') {
  return new Promise((resolve) => {
    switch(dwType) {
      case '1':
        $.get(taskUrl(`story/RubbishOper`, `dwType=1&dwRewardType=0`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} RubbishOper API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve(data);
          }
        })
        break
      case '2':
        $.get(taskUrl(`story/RubbishOper`, `dwType=2&dwRewardType=0&${body}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} RubbishOper API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve(data);
          }
        })
        break
      default:
        break
    }
  })
}

// 牛牛任务
async function getActTask(type = true) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`story/GetActTask`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} GetActTask API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (type) {
            for (let key of Object.keys(data.Data.TaskList)) {
              let vo = data.Data.TaskList[key]
              if ([1, 2].includes(vo.dwOrderId) && (vo.dwCompleteNum !== vo.dwTargetNum)) {
                console.log(`开始【🐮牛牛任务】${vo.strTaskName}`)
                for (let i = vo.dwCompleteNum; i < vo.dwTargetNum; i++) {
                  console.log(`【🐮牛牛任务】${vo.strTaskName} 进度：${i + 1}/${vo.dwTargetNum}`)
                  await doTask(vo.ddwTaskId, 2)
                  await $.wait(2000)
                }
              }
            }
            data = await getActTask(false)
            for (let key of Object.keys(data.Data.TaskList)) {
              let vo = data.Data.TaskList[key]
              if ((vo.dwCompleteNum >= vo.dwTargetNum) && vo.dwAwardStatus !== 1) {
                await awardActTask('Award', vo)
                await $.wait(2000)
              }
            }
            data = await getActTask(false)
            if (data.Data.dwCompleteTaskNum >= data.Data.dwTotalTaskNum) {
              if (data.Data.dwStatus !== 4) {
                console.log(`【🐮牛牛任务】已做完，去开启宝箱`)
                await awardActTask('story/ActTaskAward')
                await $.wait(2000)
              } else {
                console.log(`【🐮牛牛任务】已做完，宝箱已开启`)
              }
            } else {
              console.log(`【🐮牛牛任务】未全部完成，无法开启宝箱\n`)
            }
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
function awardActTask(function_path, taskInfo = '') {
  const { ddwTaskId, strTaskName} = taskInfo
  return new Promise((resolve) => {
    switch (function_path) {
      case 'Award':
        $.get(taskListUrl(function_path, `taskId=${ddwTaskId}`, 'jxbfddch'), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} awardActTask API请求失败，请检查网路重试`)
            } else {
              const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
              let str = '';
              if (msg.indexOf('活动太火爆了') !== -1) {
                str = '任务为成就任务或者未到任务时间';
              } else {
                str = msg + prizeInfo ? `获得金币 ¥ ${JSON.parse(prizeInfo).ddwCoin}` : '';
              }
              console.log(`【🐮领牛牛任务奖励】${strTaskName} ${str}\n${$.showLog ? data : ''}`);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      case 'story/ActTaskAward':
        $.get(taskUrl(function_path), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} awardActTask API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
              if (data.iRet === 0 || data.sErrMsg === 'success') {
                console.log(`【🐮牛牛任务】开启宝箱成功：获得财富 ¥ ${data.Data.ddwBigReward}\n`)
              } else {
                console.log(`【🐮牛牛任务】开启宝箱失败：${data.sErrMsg}\n`)
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        })
        break
      default:
        break
    }
  })
}

// 导游
async function employTourGuideInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/EmployTourGuideInfo`), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} EmployTourGuideInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          console.log(`雇导游`)
          let minProductCoin = data.TourGuideList[0].ddwProductCoin
          for(let key of Object.keys(data.TourGuideList)) {
            let vo = data.TourGuideList[key]
            if (vo.ddwProductCoin < minProductCoin) {
              minProductCoin = vo.ddwProductCoin
            }
          }
          for(let key of Object.keys(data.TourGuideList)) {
            let vo = data.TourGuideList[key]
            let buildNmae;
            switch(vo.strBuildIndex) {
              case 'food':
                buildNmae = '京喜美食城'
                break
              case 'sea':
                buildNmae = '京喜旅馆'
                break
              case 'shop':
                buildNmae = '京喜商店'
                break
              case 'fun':
                buildNmae = '京喜游乐场'
              default:
                break
            }
            if(vo.ddwRemainTm === 0 && vo.ddwProductCoin !== minProductCoin) {
              let dwIsFree;
              if(vo.dwFreeMin !== 0) {
                dwIsFree = 1
              } else {
                dwIsFree = 0
              }
              console.log(`【${buildNmae}】雇佣费用：${vo.ddwCostCoin}金币 增加收益：${vo.ddwProductCoin}金币`)
              const body = `strBuildIndex=${vo.strBuildIndex}&dwIsFree=${dwIsFree}&ddwConsumeCoin=${vo.ddwCostCoin}`
              await employTourGuide(body, buildNmae)
            } else if (vo.ddwProductCoin !== minProductCoin) {
              console.log(`【${buildNmae}】无可雇佣导游`)
            }
            await $.wait(2000)
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
function employTourGuide(body, buildNmae) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/EmployTourGuide`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} EmployTourGuide API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) {
            console.log(`【${buildNmae}】雇佣导游成功`)
          } else {
            console.log(`【${buildNmae}】雇佣导游失败：${data.sErrMsg}`)
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

// 升级建筑
async function getBuildInfo(body, buildList, type = true) {
  let twobody = body
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/GetBuildInfo`, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} GetBuildInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (type) {
            let buildNmae;
            switch(buildList.strBuildIndex) {
              case 'food':
                buildNmae = '京喜美食城'
                break
              case 'sea':
                buildNmae = '京喜旅馆'
                break
              case 'shop':
                buildNmae = '京喜商店'
                break
              case 'fun':
                buildNmae = '京喜游乐场'
              default:
                break
            }
            if (data.dwBuildLvl === 0) {
              console.log(`创建建筑`)
              console.log(`【${buildNmae}】当前建筑还未创建，开始创建`)
              await createbuilding(`strBuildIndex=${data.strBuildIndex}`, buildNmae)
              await $.wait(2000)
              data = await getBuildInfo(twobody, buildList, false)
              await $.wait(2000)
            }
            console.log(`收金币`)
            const body = `strBuildIndex=${data.strBuildIndex}&dwType=1`
            let collectCoinRes = await collectCoin(body)
            console.log(`【${buildNmae}】收集${collectCoinRes.ddwCoin}金币`)
            await $.wait(2000)
            await getUserInfo(false)
            console.log(`升级建筑`)
            console.log(`【${buildNmae}】当前等级：${buildList.dwLvl}`)
            console.log(`【${buildNmae}】升级需要${data.ddwNextLvlCostCoin}金币，保留升级需要的3倍${data.ddwNextLvlCostCoin * 3}金币，当前拥有${$.info.ddwCoinBalance}金币`)
            if(data.dwCanLvlUp > 0 && $.info.ddwCoinBalance >= (data.ddwNextLvlCostCoin * 3)) {
              console.log(`【${buildNmae}】满足升级条件，开始升级`)
              const body = `ddwCostCoin=${data.ddwNextLvlCostCoin}&strBuildIndex=${data.strBuildIndex}`
              let buildLvlUpRes = await buildLvlUp(body)
              if (buildLvlUpRes.iRet === 0) {
                console.log(`【${buildNmae}】升级成功：获得${data.ddwLvlRich}财富\n`)
              } else {
                console.log(`【${buildNmae}】升级失败：${buildLvlUpRes.sErrMsg}\n`)
              }
            } else {
              console.log(`【${buildNmae}】不满足升级条件，跳过升级\n`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function collectCoin(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/CollectCoin`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} CollectCoin API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function buildLvlUp(body) {
  return new Promise((resolve) => {
    $.get(taskUrl(`user/BuildLvlUp`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} BuildLvlUp API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}
function createbuilding(body, buildNmae) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/createbuilding`, body), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} createbuilding API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0) console.log(`【${buildNmae}】创建成功`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// 助力
function helpByStage(shareCodes) {
  return new Promise((resolve) => {
    $.get(taskUrl(`story/helpbystage`, `strShareId=${shareCodes}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} helpbystage API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          if (data.iRet === 0 || data.sErrMsg === 'success') {
            console.log(`助力成功：获得${data.Data.GuestPrizeInfo.strPrizeName}`)
          } else if (data.iRet === 2232 || data.sErrMsg === '今日助力次数达到上限，明天再来帮忙吧~') {
            console.log(`助力失败：${data.sErrMsg}`)
            $.canHelp = false
          } else if (data.iRet === 9999 || data.sErrMsg === '您还没有登录，请先登录哦~') {
            console.log(`助力失败：${data.sErrMsg}`)
            $.canHelp = false
          } else if (data.iRet === 2229 || data.sErrMsg === '助力失败啦~') {
            console.log(`助力失败：您的账号或被助力的账号可能已黑，请联系客服`)
            // $.canHelp = false
          } else {
            console.log(`助力失败：${data.sErrMsg}`)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

// function getAuthorShareCode(url) {
//   return new Promise(async resolve => {
//     const options = {
//       url: `${url}?${new Date()}`, "timeout": 10000, headers: {
//         "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
//       }
//     };
//     if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
//       const tunnel = require("tunnel");
//       const agent = {
//         https: tunnel.httpsOverHttp({
//           proxy: {
//             host: process.env.TG_PROXY_HOST,
//             port: process.env.TG_PROXY_PORT * 1
//           }
//         })
//       }
//       Object.assign(options, { agent })
//     }
//     $.get(options, async (err, resp, data) => {
//       try {
//         resolve(JSON.parse(data))
//       } catch (e) {
//         // $.logErr(e, resp)
//       } finally {
//         resolve();
//       }
//     })
//     await $.wait(10000)
//     resolve();
//   })
// }

// 获取用户信息
function getUserInfo(showInvite = true) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryUserInfo`, `ddwTaskId=&strShareId=&strMarkList=${escape('guider_step,collect_coin_auth,guider_medal,guider_over_flag,build_food_full,build_sea_full,build_shop_full,build_fun_full,medal_guider_show,guide_guider_show,guide_receive_vistor,daily_task,guider_daily_task')}&strPgUUNum=${token['farm_jstoken']}&strPgtimestamp=${token['timestamp']}&strPhoneID=${token['phoneid']}`), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} QueryUserInfo API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data);
          const {
            buildInfo = {},
            ddwRichBalance,
            ddwCoinBalance,
            sErrMsg,
            strMyShareId,
            dwLandLvl,
            LeadInfo = {},
            StoryInfo = {},
            Business = {},
            XbStatus = {}
          } = data;
          if (showInvite) {
            console.log(`\n获取用户信息：${sErrMsg}\n${$.showLog ? data : ""}`);
            console.log(`\n当前等级:${dwLandLvl},金币:${ddwCoinBalance},财富值:${ddwRichBalance},连续营业天数:${Business.dwBussDayNum},离线收益:${Business.ddwCoin}\n`)
          }
          if (showInvite && strMyShareId) {
            console.log(`财富岛好友互助码每次运行都变化,旧的可继续使用`);
            console.log(`\n【京东账号${$.index}（${$.UserName}）的${$.name}好友互助码】${strMyShareId}\n\n`);
            $.shareCodes.push(strMyShareId)
            submitCode(strMyShareId, $.UserName);
          }
          $.info = {
            ...$.info,
            buildInfo,
            ddwRichBalance,
            ddwCoinBalance,
            strMyShareId,
            dwLandLvl,
            LeadInfo,
            StoryInfo,
            XbStatus
          };
          resolve({
            buildInfo,
            ddwRichBalance,
            ddwCoinBalance,
            strMyShareId,
            LeadInfo,
            StoryInfo,
            XbStatus
          });
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

//任务
function getTaskList(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType){
      case 0: //日常任务
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetUserTaskStatusList 日常任务 API请求失败，请检查网路重试`)
            } else {
              const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
              $.allTask = userTaskStatusList.filter((x) => x.awardStatus !== 1 && x.taskCaller === 1);
              if($.allTask.length === 0) {
                console.log(`【📆日常任务】已做完`)
              } else {
                console.log(`获取【📆日常任务】列表 ${msg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      case 1: //成就任务
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} GetUserTaskStatusList 成就任务 API请求失败，请检查网路重试`)
            } else {
              const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
              $.allTask = userTaskStatusList.filter((x) => (x.completedTimes >= x.targetTimes) && x.awardStatus !== 1 && x.taskCaller === 2);
              if($.allTask.length === 0) {
                console.log(`【🎖成就任务】没有可领奖的任务\n`)
              } else {
                console.log(`获取【🎖成就任务】列表 ${msg}，总共${$.allTask.length}个任务！\n${$.showLog ? data : ""}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      default:
        break;
    }
  });
}

//浏览任务 + 做任务 + 领取奖励
function browserTask(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType) {
      case 0://日常任务
        for (let i = 0; i < $.allTask.length; i++) {
          const start = $.allTask[i].completedTimes, end = $.allTask[i].targetTimes
          const taskinfo = $.allTask[i];
          console.log(`开始第${i + 1}个【📆日常任务】${taskinfo.taskName}\n`);
          for (let i = start; i < end; i++) {
            //做任务
            console.log(`【📆日常任务】${taskinfo.taskName} 进度：${i + 1}/${end}`)
            await doTask(taskinfo.taskId);
            await $.wait(2000);
          }
          //领取奖励
          await awardTask(0, taskinfo);
        }
        break;
      case 1://成就任务
        for (let i = 0; i < $.allTask.length; i++) {
          const taskinfo = $.allTask[i];
          console.log(`开始第${i + 1}个【🎖成就任务】${taskinfo.taskName}\n`);
          if(taskinfo.completedTimes < taskinfo.targetTimes){
            console.log(`【领成就奖励】${taskinfo.taskName} 该成就任务未达到门槛\n`);
          } else {
            //领奖励
            await awardTask(1, taskinfo);
            await $.wait(2000);
          }
        }
        break;
      default:
        break;
    }
    resolve();
  });
}

//做任务
function doTask(taskId, type = 1) {
  return new Promise(async (resolve) => {
    switch (type) {
      case 1:
        $.get(taskListUrl(`DoTask`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} DoTask API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp)
          } finally {
            resolve()
          }
        })
        break
      case 2:
        $.get(taskListUrl(`DoTask`, `taskId=${taskId}`, `jxbfddch`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} DoTask API请求失败，请检查网路重试`)
            } else {
              data = JSON.parse(data);
            }
          } catch (e) {
            $.logErr(e, resp)
          } finally {
            resolve()
          }
        })
      default:
        break
    }
  })
}

//领取奖励
function awardTask(taskType, taskinfo) {
  return new Promise((resolve) => {
    const {taskId, taskName} = taskinfo;
    switch (taskType) {
      case 0://日常任务
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} Award API请求失败，请检查网路重试`)
            } else {
              const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
              let str = '';
              if (msg.indexOf('活动太火爆了') !== -1) {
                str = '任务为成就任务或者未到任务时间';
              } else {
                str = msg + prizeInfo ? `获得金币 ¥ ${JSON.parse(prizeInfo).ddwCoin}` : '';
              }
              console.log(`【领日常奖励】${taskName} ${str}\n${$.showLog ? data : ''}`);
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      case 1://成就奖励
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            if (err) {
              console.log(`${JSON.stringify(err)}`)
              console.log(`${$.name} AchieveAward API请求失败，请检查网路重试`)
            } else {
              const {msg, ret, data: {prizeInfo = ''} = {}} = JSON.parse(data);
              if(msg.indexOf('活动太火爆了') !== -1) {
                console.log(`活动太火爆了`)
              } else {
                console.log(`【领成就奖励】${taskName} 获得财富值 ¥ ${JSON.parse(prizeInfo).ddwMoney}\n${$.showLog ? data : ''}`);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      default:
        break
    }
  });
}

// 新手任务
async function noviceTask(){
  let body = ``
  await init(`user/guideuser`, body)
  body = `strMark=guider_step&strValue=welcom&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_over_flag&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_over_flag&strValue=999&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=gift_redpack&dwType=2`
  await init(`user/SetMark`, body)
  body = `strMark=guider_step&strValue=none&dwType=2`
  await init(`user/SetMark`, body)
}
async function init(function_path, body) {
  return new Promise(async (resolve) => {
    $.get(taskUrl(function_path, body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} init API请求失败，请检查网路重试`)
        } else {
          if (function_path == "user/SetMark") opId = 23
          if (function_path == "user/guideuser") opId = 27
          data = JSON.parse(data);
          contents = `1771|${opId}|${data.iRet}|0|${data.sErrMsg || 0}`
          await biz(contents)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}
function biz(contents){
  return new Promise(async (resolve) => {
    let option = {
      url:`https://m.jingxi.com/webmonitor/collect/biz.json?contents=${contents}&t=${Math.random()}&sceneval=2`,
      headers: {
        Cookie: cookie,
        Accept: "*/*",
        Connection: "keep-alive",
        Referer: "https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
        "Accept-Encoding": "gzip, deflate, br",
        Host: 'm.jingxi.com',
        "User-Agent": UA,
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      }
    }
    $.get(option, async (err, resp, _data) => {
      try {
        // console.log(_data)
      }
      catch (e) {
        $.logErr(e, resp);
      }
      finally {
        resolve();
      }
    })
  })
}

function taskUrl(function_path, body = '', dwEnv = 7) {
  let url = '';
  if (function_path == 'user/ComposePearlState') {
    url = `https://m.jingxi.com/jxbfd/${function_path}?__t=${Date.now()}&strZone=jxbfd${dwEnv}&_=${Date.now()+9}&sceneval=2`
  }else if (function_path == 'user/GetPearlDailyReward') {
    url = `https://m.jingxi.com/jxbfd/${function_path}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=${dwEnv}${body}&_=${Date.now()+9}&sceneval=2`;
    url += `&h5st=${decrypt(Date.now(), body, '', url)}`;
  }else if(function_path == 'user/RealTmReport'){
    url = `https://m.jingxi.com/jxbfd/${function_path}?__t=${Date.now()}${dwEnv}&_=${Date.now()+9}&sceneval=2`
  }else if(function_path == 'user/ComposeGameAward'){
    url = `https://m.jingxi.com/jxbfd/${type}?strZone=jxbfd&__t=${Date.now()}${dwEnv}${body}&_=${Date.now()+9}&sceneval=2`;
  }
  else {
    url = `${JD_API_HOST}jxbfd/${function_path}?strZone=jxbfd&bizCode=jxbfd&source=jxbfd&dwEnv=${dwEnv}&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_stk=_cfd_t%2CbizCode%2CddwTaskId%2CdwEnv%2Cptag%2Csource%2CstrShareId%2CstrZone&_ste=1`;
    url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&g_ty=ls`;
  }
  return {
    url,
    headers: {
      Cookie: cookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent": UA,
      "Accept-Language": "zh-cn",
    },
    timeout: 10000
  };
}

function taskListUrl(function_path, body = '', bizCode = 'jxbfd') {
  let url = `${JD_API_HOST}newtasksys/newtasksys_front/${function_path}?strZone=jxbfd&bizCode=${bizCode}&source=jxbfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_stk=_cfd_t%2CbizCode%2CconfigExtra%2CdwEnv%2Cptag%2Csource%2CstrZone%2CtaskId&_ste=1`;
  url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&g_ty=ls`;
  return {
    url,
    headers: {
      Cookie: cookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent": UA,
      "Accept-Language": "zh-cn",
    },
    timeout: 10000
  };
}

function randomString(e) {
  e = e || 32;
  let t = "0123456789abcdef", a = t.length, n = "";
  for (let i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}

function showMsg() {
  return new Promise(async (resolve) => {
    if ($.result.length) {
      if ($.notifyTime) {
        const notifyTimes = $.notifyTime.split(",").map((x) => x.split(":"));
        const now = $.time("HH:mm").split(":");
        console.log(`\n${JSON.stringify(notifyTimes)}`);
        console.log(`\n${JSON.stringify(now)}`);
        if ( notifyTimes.some((x) => x[0] === now[0] && (!x[1] || x[1] === now[1])) ) {
          $.msg($.name, "", `${$.result.join("\n")}`);
        }
      } else {
        $.msg($.name, "", `${$.result.join("\n")}`);
      }

      if ($.isNode() && process.env.CFD_NOTIFY_CONTROL)
        await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `${$.result.join("\n")}`);
    }
    resolve();
  });
}

function printRes(res, msg=''){
  if(res.iRet == 0 && (res.Data || res.ddwCoin || res.ddwMoney || res.strPrizeName)){
    let result = res
    if(res.Data){
      result = res.Data
    }
    if(result.ddwCoin || result.ddwMoney || result.strPrizeName || result.StagePrizeInfo && result.StagePrizeInfo.strPrizeName){
      console.log(`${msg}获得:${result.ddwCoin && ' '+result.ddwCoin+'金币' || ''}${result.ddwMoney && ' '+result.ddwMoney+'财富' || ''}${result.strPrizeName && ' '+result.strPrizeName+'红包' || ''}${result.StagePrizeInfo && result.StagePrizeInfo.strPrizeName && ' '+result.StagePrizeInfo.strPrizeName || ''}`)
    }else if(result.Prize){
      console.log(`${msg}获得: ${result.Prize.strPrizeName && '优惠券 '+result.Prize.strPrizeName || ''}`)
    }else if(res && res.sErrMsg){
      console.log(res.sErrMsg)
    }else{
      console.log(`${msg}完成`, JSON.stringify(res))
      // console.log(`完成`)
    }
  }else if(res && res.sErrMsg){
    console.log(`${msg}失败:${res.sErrMsg}`)
  }else{
    console.log(`${msg}失败:${JSON.stringify(res)}`)
  }
}

//提交互助码
function submitCode(myInviteCode, user) {
    return new Promise(async resolve => {
    $.get({url: `http://www.helpu.cf/jdcodes/submit.php?code=${myInviteCode}&type=jxcfd&user=${user}`, timeout: 10000}, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} 提交助力码 API请求失败，请检查网路重试`)
        } else {
          if (data) {
            //console.log(`随机取个${randomCount}码放到您固定的互助码后面(不影响已有固定互助)`)
            data = JSON.parse(data);
            if (data.code === 300) {
              console.log("🏝互助码已提交🏝");
            }else if (data.code === 200) {
              console.log("🏝互助码提交成功🏝");
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data || {"code":500});
      }
    })
    await $.wait(10000);
    resolve({"code":500})
  })
}
function readShareCode() {
  return new Promise(async resolve => {
    $.get({
      url: `http://www.helpu.cf/jdcodes/getcode.php?type=jxcfd&num=10`,
      'timeout': 10000
    }, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            //console.log(`随机取10个码放到您固定的互助码后面(不影响已有固定互助)`);
            codePool = data.data;
            //shareCodeDic[`${currentIndex}`] = data.data;
            //console.log(`${data.data}`);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data || {"code":500});
      }
    })
    await $.wait(10000);
    resolve({"code":500})
  })
}
//格式化助力码
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`第${$.index}个京东账号的助力码:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    } else {
      console.log(`由于您第${$.index}个京东账号未提供shareCode,将从助力池随机选取10个助力码\n`)
      // const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
      //$.newShareCodes = [...$.strMyShareIds];
    }
    // const readShareCodeRes = await readShareCode();
    // if (readShareCodeRes && readShareCodeRes.code === 200) {
    //   $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
    // }
    //console.log(`第${$.index}个京东账号将要助力的好友${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log(`开始获取${$.name}配置文件\n`);
    let shareCodes = [];
    if ($.isNode() && process.env.JDCFD_SHARECODES) {
      if (process.env.JDCFD_SHARECODES.indexOf('\n') > -1) {
        shareCodes = process.env.JDCFD_SHARECODES.split('\n');
      } else {
        shareCodes = process.env.JDCFD_SHARECODES.split('&');
      }
    }
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    } else {
      if ($.getdata('jd_jxCFD')) $.shareCodesArr = $.getdata('jd_jxCFD').split('\n').filter(item => !!item);
      console.log(`\nBoxJs设置的京喜财富岛邀请码:${$.getdata('jd_jxCFD')}\n`);
    }
    console.log(`您提供了${$.shareCodesArr.length}个账号的${$.name}助力码\n`);
    resolve()
  })
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
/*
修改时间戳转换函数，京喜工厂原版修改
 */
Date.prototype.Format = function (fmt) {
  var e,
      n = this, d = fmt, l = {
        "M+": n.getMonth() + 1,
        "d+": n.getDate(),
        "D+": n.getDate(),
        "h+": n.getHours(),
        "H+": n.getHours(),
        "m+": n.getMinutes(),
        "s+": n.getSeconds(),
        "w+": n.getDay(),
        "q+": Math.floor((n.getMonth() + 3) / 3),
        "S+": n.getMilliseconds()
      };
  /(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
  for (var k in l) {
    if (new RegExp("(".concat(k, ")")).test(d)) {
      var t, a = "S+" === k ? "000" : "00";
      d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
    }
  }
  return d;
}

async function requestAlgo() {
  $.fingerprint = await generateFp();
  const options = {
    "url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
    "headers": {
      'Authority': 'cactus.jd.com',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
      'Content-Type': 'application/json',
      'Origin': 'https://st.jingxi.com',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://st.jingxi.com/',
      'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
    },
    'body': JSON.stringify({
      "version": "1.0",
      "fp": $.fingerprint,
      "appId": $.appId.toString(),
      "timestamp": Date.now(),
      "platform": "web",
      "expandParams": ""
    })
  }
  new Promise(async resolve => {
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
        } else {
          if (data) {
            // console.log(data);
            data = JSON.parse(data);
            if (data['status'] === 200) {
              $.token = data.data.result.tk;
              let enCryptMethodJDString = data.data.result.algo;
              if (enCryptMethodJDString) $.enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
              console.log(`获取签名参数成功！`)
              console.log(`fp: ${$.fingerprint}`)
              console.log(`token: ${$.token}`)
              console.log(`enCryptMethodJD: ${enCryptMethodJDString}`)
            } else {
              console.log(`fp: ${$.fingerprint}`)
              console.log('request_algo 签名参数API请求失败:')
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
function decrypt(time, stk, type, url) {
  stk = stk || (url ? getUrlData(url, '_stk') : '')
  if (stk) {
    const timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
    let hash1 = '';
    if ($.fingerprint && $.token && $.enCryptMethodJD) {
      hash1 = $.enCryptMethodJD($.token, $.fingerprint.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
    } else {
      const random = '5gkjB6SpmC9s';
      $.token = `tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc`;
      $.fingerprint = 5287160221454703;
      const str = `${$.token}${$.fingerprint}${timestamp}${$.appId}${random}`;
      hash1 = $.CryptoJS.SHA512(str, $.token).toString($.CryptoJS.enc.Hex);
    }
    let st = '';
    stk.split(',').map((item, index) => {
      st += `${item}:${getUrlData(url, item)}${index === stk.split(',').length -1 ? '' : '&'}`;
    })
    const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
    // console.log(`\nst:${st}`)
    // console.log(`h5st:${["".concat(timestamp.toString()), "".concat(fingerprint.toString()), "".concat($.appId.toString()), "".concat(token), "".concat(hash2)].join(";")}\n`)
    return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.token), "".concat(hash2)].join(";"))
  } else {
    return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
  }
}

/**
 * 获取url参数值
 * @param url
 * @param name
 * @returns {string}
 */
function getUrlData(url, name) {
  if (typeof URL !== "undefined") {
    let urls = new URL(url);
    let data = urls.searchParams.get(name);
    return data ? data : '';
  } else {
    const query = url.match(/\?.*/)[0].substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === name) {
        // return pair[1];
        return vars[i].substr(vars[i].indexOf('=') + 1);
      }
    }
    return ''
  }
}
/**
 * 模拟生成 fingerprint
 * @returns {string}
 */
function generateFp() {
  let e = "0123456789";
  let a = 13;
  let i = '';
  for (; a--; )
    i += e[Math.random() * e.length | 0];
  return (i + Date.now()).slice(0,16)
}
var _0xod8='jsjiami.com.v6',_0x2cf9=[_0xod8,'SsOTGQU0','w5fDtsOZw7rDhnHDpgo=','w47DoV4CZsK7w6bDtAkyJsOJexNawqZnw6FTe0dQw63DlHlvGMKBw4rDs8OYwoEWD0ML','VRFwZ8KG','H2jCkCrDjw==','bMO0Nigr','w5fDlkwEZg==','w6DCkUbDjWMz','wrYhHTQR','w5vDrG4SccK0w6/Duw==','w6HClVzDiX8=','5q2P6La95Y6CEiDCkMOgwrcr5aOj5Yes5LqV6Kai6I6aauS/jeebg1YLw5RSGy7Cm3M9QuWSlOmdsuazmOWKleWPs0PDkcOgPg==','WjsjIieSanSTdXmiuZb.EncDom.v6=='];(function(_0x30e78a,_0x12a1c3,_0x4ca71c){var _0x40a26e=function(_0x59c439,_0x435a06,_0x70e6be,_0x39d363,_0x31edda){_0x435a06=_0x435a06>>0x8,_0x31edda='po';var _0x255309='shift',_0x4aba1a='push';if(_0x435a06<_0x59c439){while(--_0x59c439){_0x39d363=_0x30e78a[_0x255309]();if(_0x435a06===_0x59c439){_0x435a06=_0x39d363;_0x70e6be=_0x30e78a[_0x31edda+'p']();}else if(_0x435a06&&_0x70e6be['replace'](/[WIeSnSTdXuZbEnD=]/g,'')===_0x435a06){_0x30e78a[_0x4aba1a](_0x39d363);}}_0x30e78a[_0x4aba1a](_0x30e78a[_0x255309]());}return 0x8dbb4;};return _0x40a26e(++_0x12a1c3,_0x4ca71c)>>_0x12a1c3^_0x4ca71c;}(_0x2cf9,0x6e,0x6e00));var _0x5108=function(_0x4dc255,_0x3cb8bc){_0x4dc255=~~'0x'['concat'](_0x4dc255);var _0x2e664b=_0x2cf9[_0x4dc255];if(_0x5108['xFLNEr']===undefined){(function(){var _0xfc2aa4=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x26458d='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xfc2aa4['atob']||(_0xfc2aa4['atob']=function(_0x509ed4){var _0x2e5ed8=String(_0x509ed4)['replace'](/=+$/,'');for(var _0x5f2c3c=0x0,_0x5a7e73,_0x42fadc,_0x50b6c7=0x0,_0x2de292='';_0x42fadc=_0x2e5ed8['charAt'](_0x50b6c7++);~_0x42fadc&&(_0x5a7e73=_0x5f2c3c%0x4?_0x5a7e73*0x40+_0x42fadc:_0x42fadc,_0x5f2c3c++%0x4)?_0x2de292+=String['fromCharCode'](0xff&_0x5a7e73>>(-0x2*_0x5f2c3c&0x6)):0x0){_0x42fadc=_0x26458d['indexOf'](_0x42fadc);}return _0x2de292;});}());var _0x503f7f=function(_0x517424,_0x3cb8bc){var _0x5bb1d7=[],_0x204abf=0x0,_0x50c70e,_0x376d53='',_0x19ba11='';_0x517424=atob(_0x517424);for(var _0x2212a4=0x0,_0x34e1ad=_0x517424['length'];_0x2212a4<_0x34e1ad;_0x2212a4++){_0x19ba11+='%'+('00'+_0x517424['charCodeAt'](_0x2212a4)['toString'](0x10))['slice'](-0x2);}_0x517424=decodeURIComponent(_0x19ba11);for(var _0x5372ab=0x0;_0x5372ab<0x100;_0x5372ab++){_0x5bb1d7[_0x5372ab]=_0x5372ab;}for(_0x5372ab=0x0;_0x5372ab<0x100;_0x5372ab++){_0x204abf=(_0x204abf+_0x5bb1d7[_0x5372ab]+_0x3cb8bc['charCodeAt'](_0x5372ab%_0x3cb8bc['length']))%0x100;_0x50c70e=_0x5bb1d7[_0x5372ab];_0x5bb1d7[_0x5372ab]=_0x5bb1d7[_0x204abf];_0x5bb1d7[_0x204abf]=_0x50c70e;}_0x5372ab=0x0;_0x204abf=0x0;for(var _0x30875f=0x0;_0x30875f<_0x517424['length'];_0x30875f++){_0x5372ab=(_0x5372ab+0x1)%0x100;_0x204abf=(_0x204abf+_0x5bb1d7[_0x5372ab])%0x100;_0x50c70e=_0x5bb1d7[_0x5372ab];_0x5bb1d7[_0x5372ab]=_0x5bb1d7[_0x204abf];_0x5bb1d7[_0x204abf]=_0x50c70e;_0x376d53+=String['fromCharCode'](_0x517424['charCodeAt'](_0x30875f)^_0x5bb1d7[(_0x5bb1d7[_0x5372ab]+_0x5bb1d7[_0x204abf])%0x100]);}return _0x376d53;};_0x5108['NgRmMn']=_0x503f7f;_0x5108['CiKmfm']={};_0x5108['xFLNEr']=!![];}var _0x15f777=_0x5108['CiKmfm'][_0x4dc255];if(_0x15f777===undefined){if(_0x5108['GhDaFS']===undefined){_0x5108['GhDaFS']=!![];}_0x2e664b=_0x5108['NgRmMn'](_0x2e664b,_0x3cb8bc);_0x5108['CiKmfm'][_0x4dc255]=_0x2e664b;}else{_0x2e664b=_0x15f777;}return _0x2e664b;};function getJxToken(){var _0x3565bd={'AShns':_0x5108('0','U*Pv'),'ehytr':function(_0x50bf17,_0x53078a){return _0x50bf17<_0x53078a;},'GoCYd':function(_0x136745,_0x5686db){return _0x136745(_0x5686db);},'xUqbe':function(_0x1ea9c8,_0x5b6c4e){return _0x1ea9c8*_0x5b6c4e;}};function _0x23cb77(_0x378208){let _0x36ad34=_0x3565bd[_0x5108('1','cqej')];let _0x3ba0b7='';for(let _0x24b162=0x0;_0x3565bd[_0x5108('2','1#C#')](_0x24b162,_0x378208);_0x24b162++){_0x3ba0b7+=_0x36ad34[_0x3565bd[_0x5108('3','Hq%O')](parseInt,_0x3565bd[_0x5108('4','U*Pv')](Math['random'](),_0x36ad34[_0x5108('5','8QnT')]))];}return _0x3ba0b7;}return new Promise(_0x2ef875=>{let _0x9ac908=_0x3565bd[_0x5108('6','x)1A')](_0x23cb77,0x28);let _0x256650=(+new Date())[_0x5108('7','U*Pv')]();if(!cookie[_0x5108('8','8QnT')](/pt_pin=([^; ]+)(?=;?)/)){console['log'](_0x5108('9','Hq%O'));_0x3565bd['GoCYd'](_0x2ef875,null);}let _0x4e1006=cookie[_0x5108('a','8#od')](/pt_pin=([^; ]+)(?=;?)/)[0x1];let _0x57bff6=$['md5'](''+decodeURIComponent(_0x4e1006)+_0x256650+_0x9ac908+'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy')[_0x5108('b',']OsH')]();_0x3565bd['GoCYd'](_0x2ef875,{'timestamp':_0x256650,'phoneid':_0x9ac908,'farm_jstoken':_0x57bff6});});};_0xod8='jsjiami.com.v6';
!function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
