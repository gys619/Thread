/*
京东天天加速链接：https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_speed.js
更新时间：2020-12-25
支持京东双账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
每天4京豆，再小的苍蝇也是肉
从 https://github.com/Zero-S1/JD_tools/blob/master/JD_speed.py 改写来的
建议3小时运行一次，打卡时间间隔是6小时
*/
// quantumultx
// [task_local]
// #天天加速
// 8 */3 * * * https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_speed.js, tag=京东天天加速, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdjs.png, enabled=true
// Loon
// [Script]
// cron "8 */3 * * *" script-path=https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_speed.js,tag=京东天天加速
// Surge
//天天加速 = type=cron,cronexp="8 */3 * * *",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/LXK9301/jd_scripts/master/jd_speed.js
const $ = new Env('✈️天天加速');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let jdNotify = true;//是否开启静默运行。默认true开启
let message = '', subTitle = '';
const JD_API_HOST = 'https://api.m.jd.com/'

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      await TotalBean();
      console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      message = '';
      subTitle = '';
      await jDSpeedUp();
      await getMemBerList();
      await showMsg();
    }
  }
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
function showMsg() {
  jdNotify = $.getdata('jdSpeedNotify') ? $.getdata('jdSpeedNotify') : jdNotify;
  if (!jdNotify || jdNotify === 'false') {
    $.msg($.name, subTitle, `【京东账号${$.index}】${$.nickName}\n` + message);
  } else {
    $.log(`\n${message}\n`);
  }
}
function jDSpeedUp(sourceId) {
  return new Promise((resolve) => {
    let body = {"source": "game"};
    if (sourceId) {
      body.source_id = sourceId
    }
    const url = {
      // url: JD_API_HOST + '?appid=memberTaskCenter&functionId=flyTask_' + (sourceId ? 'start&body=%7B%22source%22%3A%22game%22%2C%22source_id%22%3A' + sourceId + '%7D' : 'state&body=%7B%22source%22%3A%22game%22%7D'),
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=flyTask_${sourceId ? 'start' : 'state'}&body=${escape(JSON.stringify(body))}`,
      headers: {
        'Cookie': cookie,
        'Host': 'api.m.jd.com',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
        'Accept-Language': 'zh-cn',
        'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html?lng=116.845095&lat=39.957701&sid=ea687233c5e7d226b30940ed7382c5cw&un_area=5_274_49707_49973',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    };
    $.get(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log('京东天天-加速: 签到接口请求失败 ‼️‼️');
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (data) {
            let res = JSON.parse(data);
            if (!sourceId) {
              console.log(`\n天天加速任务进行中`);
            } else {
              console.log("\n" + "天天加速-开始本次任务 ");
            }
            if (res.info.isLogin === 1) {
              subTitle = `【奖励】${res.data.beans_num}京豆`;
              if (res.data.task_status === 0) {
                const taskID = res.data.source_id;
                await jDSpeedUp(taskID);
              } else if (res.data.task_status === 1) {
                const EndTime = res.data.end_time ? res.data.end_time : ""
                console.log("\n天天加速进行中-结束时间: \n" + EndTime);
                const space = await spaceEventList()
                const HandleEvent = await spaceEventHandleEvent(space)
                const step1 = await energyPropList();//检查燃料
                const step2 = await receiveEnergyProp(step1);//领取可用的燃料
                const step3 = await energyPropUsaleList(step2)
                const step4 = await useEnergy(step3)
                if (step4) {
                  await jDSpeedUp(null);
                } else {
                  message += `【空间站】 ${res.data.destination}\n`;
                  message += `【结束时间】 ${res.data.end_time}\n`;
                  message += `【进度】 ${((res.data['done_distance'] / res.data.distance) * 100).toFixed(2)}%\n`;
                }
              } else if (res.data.task_status === 2) {
                if (data.match(/\"beans_num\":\d+/)) {
                  //message += "【上轮奖励】成功领取" + data.match(/\"beans_num\":(\d+)/)[1] + "京豆 🐶";
                  if (!jdNotify || jdNotify === 'false') {
                    // $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n` + "【上轮太空旅行】成功领取" + data.match(/\"beans_num\":(\d+)/)[1] + "京豆 🐶");
                  }
                } else {
                  console.log("京东天天-加速: 成功, 明细: 无京豆 🐶")
                }
                console.log("\n天天加速-领取上次奖励成功")
                await jDSpeedUp(null);
              } else {
                console.log("\n" + "天天加速-判断状态码失败")
              }
            } else {
              console.log("\n" + "天天加速-判断状态失败")
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.msg("京东天天-加速" + e.name + "‼️", JSON.stringify(e), e.message)
      } finally {
        resolve()
      }
    })
  })
}

// 检查太空特殊事件
function spaceEventList() {
  return new Promise((resolve) => {
    let spaceEvents = [];
    const body = { "source": "game"};
    const spaceEventUrl = {
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=spaceEvent_list&body=${escape(JSON.stringify(body))}`,
      headers: {
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
        Cookie: cookie
      }
    }
    $.get(spaceEventUrl, async (err, resp, data) => {
      try {
        if (err) {
          console.log("\n京东天天-加速: 查询太空特殊事件请求失败 ‼️‼️")
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (data) {
            const cc = JSON.parse(data);
            if (cc.message === "success" && cc.data.length > 0) {
              for (let item of cc.data) {
                if (item.status === 1) {
                  for (let j of item.options) {
                    if (j.type === 1) {
                      spaceEvents.push({
                        "id": item.id,
                        "value": j.value
                      })
                    }
                  }
                }
              }
              if (spaceEvents && spaceEvents.length > 0) {
                console.log("\n天天加速-查询到" + spaceEvents.length + "个太空特殊事件")
              } else {
                console.log("\n天天加速-暂无太空特殊事件")
              }
            } else {
              console.log("\n天天加速-查询无太空特殊事件")
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (e) {
        $.msg("天天加速-查询太空特殊事件" + e.name + "‼️", JSON.stringify(e), e.message)
      } finally {
        resolve(spaceEvents)
      }
    })
  })
}

//处理太空特殊事件
function spaceEventHandleEvent(spaceEventList) {
  return new Promise((resolve) => {
    if (spaceEventList && spaceEventList.length > 0) {
      let spaceEventCount = 0, spaceNumTask = 0;
      for (let item of spaceEventList) {
        let body = {
          "source":"game",
          "eventId": item.id,
          "option": item.value
        }
        const spaceHandleUrl = {
          url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=spaceEvent_handleEvent&body=${escape(JSON.stringify(body))}`,
          headers: {
            Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
            Cookie: cookie
          }
        }
        spaceEventCount += 1
        $.get(spaceHandleUrl, (err, resp, data) => {
          try {
            if (err) {
              console.log("\n京东天天-加速: 处理太空特殊事件请求失败 ‼️‼️")
              console.log(`${JSON.stringify(err)}`)
            } else {
              if (data) {
                const cc = JSON.parse(data);
                // console.log(`处理特殊事件的结果：：${JSON.stringify(cc)}`);
                console.log("\n天天加速-尝试处理第" + spaceEventCount + "个太空特殊事件")
                if (cc.message === "success" && cc.success) {
                  spaceNumTask += 1;
                } else {
                  console.log("\n天天加速-处理太空特殊事件失败")
                }
              } else {
                console.log(`京豆api返回数据为空，请检查自身原因`)
              }
            }
          } catch (e) {
            $.msg("天天加速-查询处理太空特殊事件" + e.name + "‼️", JSON.stringify(e), e.message)
          } finally {
            if (spaceEventList.length === spaceNumTask) {
              console.log("\n天天加速-已成功处理" + spaceNumTask + "个太空特殊事件")
              resolve()
            }
          }
        })
      }
    } else {
      resolve()
    }
  })
}

//检查燃料
function energyPropList() {
  return new Promise((resolve) => {
    let TaskID = "";
    const body = { "source": "game"};
    const QueryUrl = {
      // url: JD_API_HOST + '?appid=memberTaskCenter&functionId=energyProp_list&body=%7B%22source%22%3A%22game%22%7D',
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=energyProp_list&body=${escape(JSON.stringify(body))}`,
      headers: {
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
        Cookie: cookie
      }
    };
    $.get(QueryUrl, async (err, resp, data) => {
      try {
        if (err) {
          console.log("\n京东天天-加速: 查询道具请求失败 ‼️‼️")
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (data) {
            const cc = JSON.parse(data)
            if (cc.message === "success" && cc.data.length > 0) {
              for (let i = 0; i < cc.data.length; i++) {
                if (cc.data[i].thaw_time === 0) {
                  TaskID += cc.data[i].id + ",";
                }
              }
              if (TaskID.length > 0) {
                TaskID = TaskID.substr(0, TaskID.length - 1).split(",")
                console.log("\n天天加速-查询到" + TaskID.length + "个可用燃料")
              } else {
                console.log("\n天天加速-检查燃料-暂无可用燃料")
              }
            } else {
              console.log("\n天天加速-查询无燃料")
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (eor) {
        $.msg("天天加速-查询燃料" + eor.name + "‼️", JSON.stringify(eor), eor.message)
      } finally {
        resolve(TaskID)
      }
    })
  })
}

//领取可用的燃料
function receiveEnergyProp(CID) {
  return new Promise((resolve) => {
    var NumTask = 0;
    if (CID) {
      let count = 0
      for (let i = 0; i < CID.length; i++) {
        let body = {
          "source":"game",
          "energy_id": CID[i]
        }
        const TUrl = {
          // url: JD_API_HOST + '?appid=memberTaskCenter&functionId=energyProp_gain&body=%7B%22source%22%3A%22game%22%2C%22energy_id%22%3A' + CID[i] + '%7D',
          url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=energyProp_gain&body=${escape(JSON.stringify(body))}`,
          headers: {
            Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
            Cookie: cookie
          }
        };
        count += 1
        $.get(TUrl, (error, response, data) => {
          try {
            if (error) {
              console.log("\n天天加速-领取道具请求失败 ‼️‼️")
              console.log(`${JSON.stringify(error)}`)
            } else {
              if (data) {
                const cc = JSON.parse(data)
                console.log("\n天天加速-尝试领取第" + count + "个可用燃料")
                if (cc.message === 'success') {
                  NumTask += 1
                }
              } else {
                console.log(`京豆api返回数据为空，请检查自身原因`)
              }
            }
          } catch (eor) {
            $.msg("天天加速-领取可用燃料" + eor.name + "‼️", JSON.stringify(eor), eor.message)
          } finally {
            if (CID.length === count) {
              console.log("\n天天加速-已成功领取" + NumTask + "个可用燃料")
              resolve(NumTask)
            }
          }
        })
      }
    } else {
      resolve(NumTask)
    }
  })
}

//检查剩余燃料
function energyPropUsaleList(EID) {
  return new Promise((resolve) => {
    let TaskCID = '';
    const body = { "source": "game"};
    const EUrl = {
      // url: JD_API_HOST + '?appid=memberTaskCenter&functionId=energyProp_usalbeList&body=%7B%22source%22%3A%22game%22%7D',
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=energyProp_usalbeList&body=${escape(JSON.stringify(body))}`,
      headers: {
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
        Cookie: cookie
      }
    };
    $.get(EUrl, (error, response, data) => {
      try {
        if (error) {
          console.log("\n天天加速-查询道具ID请求失败 ‼️‼️")
          console.log(`${JSON.stringify(error)}`)
        } else {
          if (data) {
            const cc = JSON.parse(data);
            if (cc.data.length > 0) {
              for (let i = 0; i < cc.data.length; i++) {
                if (cc.data[i].id) {
                  TaskCID += cc.data[i].id + ",";
                }
              }
              if (TaskCID.length > 0) {
                TaskCID = TaskCID.substr(0, TaskCID.length - 1).split(",")
                console.log("\n天天加速-查询成功" + TaskCID.length + "个燃料ID")
              } else {
                console.log("\n天天加速-暂无有效燃料ID")
              }
            } else {
              console.log("\n天天加速-查询无燃料ID")
            }
          } else {
            console.log(`京豆api返回数据为空，请检查自身原因`)
          }
        }
      } catch (eor) {
        $.msg("天天加速-燃料ID" + eor.name + "‼️", JSON.stringify(eor), eor.message)
      } finally {
        resolve(TaskCID)
      }
    })
    // if (EID) {
    //
    // } else {
    //   resolve(TaskCID)
    // }
  })
}

//使用能源
function useEnergy(PropID) {
  return new Promise((resolve) => {
    var PropNumTask = 0;
    let PropCount = 0
    if (PropID) {
      for (let i = 0; i < PropID.length; i++) {
        let body = {
          "source":"game",
          "energy_id": PropID[i]
        }
        const PropUrl = {
          // url: JD_API_HOST + '?appid=memberTaskCenter&functionId=energyProp_use&body=%7B%22source%22%3A%22game%22%2C%22energy_id%22%3A%22' + PropID[i] + '%22%7D',
          url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=energyProp_use&body=${escape(JSON.stringify(body))}`,
          headers: {
            Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
            Cookie: cookie
          }
        };
        PropCount += 1;
        $.get(PropUrl, (error, response, data) => {
          try {
            if (error) {
              console.log("\n天天加速-使用燃料请求失败 ‼️‼️")
              console.log(`${JSON.stringify(error)}`)
            } else {
              if (data) {
                const cc = JSON.parse(data);
                console.log("\n天天加速-尝试使用第" + PropCount + "个燃料")
                if (cc.message === 'success' && cc.success === true) {
                  PropNumTask += 1
                }
              } else {
                console.log(`京豆api返回数据为空，请检查自身原因`)
              }
            }
          } catch (eor) {
            $.msg("天天加速-使用燃料" + eor.name + "‼️", JSON.stringify(eor), eor.message)
          } finally {
            if (PropID.length === PropCount) {
              console.log("\n天天加速-已成功使用" + PropNumTask + "个燃料")
              resolve(PropNumTask)
            }
          }
        })
      }
    } else {
      resolve(PropNumTask)
    }
  })
}
function getMemBerList() {
  return new Promise((resolve) => {
    const body = { "source": "game", "status": 0};
    const spaceEventUrl = {
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=member_list&body=${escape(JSON.stringify(body))}&_t=${Date.now()}`,
      headers: {
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      }
    }
    $.get(spaceEventUrl, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data && data.success) {
              $.getRewardBeans = 0;
              console.log(`\n检查是否可领虫洞京豆奖励`)
              $.memBerList = data.data.filter(item => item['taskStatus'] === 2);
              if ($.memBerList && $.memBerList.length > 0) {
                for (let uuids of $.memBerList) {
                  await getReward(uuids['uuid']);
                }
                if ($.getRewardBeans > 0) {
                  $.msg(`${$.name}`, '', `京东账号${$.index}  ${$.nickName}\n虫洞任务：获得${$.getRewardBeans}京豆`);
                  if ($.isNode()) await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `京东账号${$.index}  ${$.nickName}\n虫洞任务：获得${$.getRewardBeans}京豆`)
                }
              } else {
                console.log(`暂无可领取的虫洞京豆奖励`)
              }
            }
          }
        }
      } catch (e) {
        $.msg("天天加速-查询太空特殊事件" + e.name + "‼️", JSON.stringify(e), e.message)
        $.logErr(e, resp)
      } finally {
        resolve()
      }
    })
  })
}
function getReward(uuid) {
  return new Promise((resolve) => {
    const body = { "source": "game", uuid};
    const options = {
      url: `${JD_API_HOST}?appid=memberTaskCenter&functionId=member_getReward&body=${escape(JSON.stringify(body))}&_t=${Date.now()}`,
      headers: {
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/6yCQo2eDJPbyPXrC3eMCtMWZ9ey/index.html',
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.name} API请求失败，请检查网路重试`)
          console.log(`${JSON.stringify(err)}`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data && data.success) {
              $.getRewardBeans += data.data.beans;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve()
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
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
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
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t)))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t))}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",o){const r=t=>{if(!t||!this.isLoon()&&this.isSurge())return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}