/*

https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html

27 8,18 * 9-12 * https://raw.githubusercontent.com/smiek2121/scripts/master/gua_UnknownTask7.js
*/
const $ = new Env('寻找内容鉴赏官');
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
let UA = ''
$.hotFlag = false
$.outFlag = 0
$.temp = [];
$.list = []
$.canHelpInfo = {};
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  console.log(`入口:\nhttps://prodev.m.jd.com/mall/active/2VyRHGE7jM1igBJcrjoB6ak1JJWV/index.html`)
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      message = ""
      $.bean = 0
      $.hotFlag = false
      await getUA()
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      await run();
    }
    if($.outFlag != 0) break
  }
  $.projectId = "rfhKVBToUL4RGuaEo7NtSEUw2bA"
  $.assignmentId = "3PX8SPeYoQMgo1aJBZYVkeC7QzD3"
  $.helpType = 2
  $.type = 2
  if($.temp.length > 0){
    for (let i = 0; i < cookiesArr.length && true; i++) {
      if (cookiesArr[i]) {
        cookie = cookiesArr[i];
        $.canHelp = true;//能否助力
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        $.canHelp = $.canHelpInfo[$.UserName];
        if ((cookiesArr && cookiesArr.length >= 1) && $.canHelp) {
          for (let t in $.temp) {
            let item = $.temp[t]
            if (!item) continue;
            console.log(`\n${$.UserName} 去助力 ${item}`);
            $.toHelp = ''
            $.itemId = item
            await takePostRequest('help');
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
            if($.toHelpMsg.indexOf('可助力') > -1){
              await takePostRequest('interactive_done');
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
            }else if($.toHelpMsg.indexOf('任务已完成') > -1){
              $.temp[t] = ''
              break;
            }else if($.toHelpMsg.indexOf('最多助力') > -1 || $.toHelpMsg.indexOf('火爆') > -1) break;
          }
        }
      }
    }
  }
  if(allMessage){
    $.msg($.name, ``, `${allMessage}`);
    if ($.isNode() && $.sendMessage){
      await notify.sendNotify(`${$.name}`, `${allMessage}`);
    }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
  try {
    $.earn = 0
    $.signTask = ''
    $.total = ''
    await takePostRequest('interactive_rewardInfo');
    $.helpType = 1
    $.itemId = ''
    await takePostRequest('help');
    $.canHelpInfo[$.UserName] = true;
    if($.total === '' || $.hasRisk){
      let msg = '账号异常'
      if($.hasRisk){
        $.canHelpInfo[$.UserName] = false;
        msg = '账号火爆'
      }
      console.log(msg)
      allMessage += `【京东账号${$.index}】${$.nickName || $.UserName}\n${msg}\n`
      return
    }
    if($.list.length == 0){
      await getList1()
      await getList2()
    }
    for(let i in $.list || []){
      if($.list[i]){
        $.type = $.list[i].type
        $.projectId = $.list[i].projectId
        $.assignmentId = $.list[i].assignmentId
        $.Task = ''
        $.infoBody = {"type":$.type+"","projectId":$.projectId+"","assignmentId":$.assignmentId+"","doneHide":false}
        if($.list[i].agId) $.infoBody["agId"] = $.list[i].agId
        if($.list[i].helpType) $.infoBody["helpType"] = $.list[i].helpType+""
        if($.list[i].itemId) $.infoBody["itemId"] = $.list[i].itemId
        $.infoBody = $.toStr($.infoBody,$.infoBody)
        await takePostRequest('interactive_info');
        // console.log($.Task)
        if(Object.getOwnPropertyNames($.Task).length > 0){
          if($.type == 5) console.log(`签到天数${$.Task.current || 0}/${$.Task.signDays || 0}`)
          $.projectId = $.Task.projectId
          $.assignmentId = $.Task.assignmentId
          $.itemId = $.Task.itemId || ''
          let title = $.Task.title || $.list[i].name || ""
          if($.Task.status+"" === "0"){
            console.log(`${title}`)
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
            if($.Task.waitDuration > 0){
              await takePostRequest('interactive_accept');
              await $.wait(parseInt($.Task.waitDuration > 0 && $.Task.waitDuration*1000, 10) || 10000)
              UA = 'JD4iPhone/167863 (iPhone; iOS 13.1.2; Scale/2.00)'
              await takePostRequest('qryViewkitCallbackResult');
              UA = ''
            }else{
              if($.type == 9 || $.type == 1 || $.type == 5){
                if($.type == 9) UA = 'JD4iPhone/167863 (iPhone; iOS 13.1.2; Scale/2.00)'
                await takePostRequest('interactive_done');
                if($.type == 9){
                  UA = ''
                  await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
                  await takePostRequest('interactive_reward');
                }
              }else{
                let num1 = 0
                let num2 = 0
                if($.type == 11){
                  num1 = $.Task.viewNum - $.Task.viewedNum
                  num2 = $.Task.evaluateNum - $.Task.evaluatedNum
                }else if($.type == 10){
                  num1 = $.Task.likeTotalCount - $.Task.likeAlreadyCount
                  num2 = $.Task.watchTotalCount - $.Task.watchAlreadyCount
                }
                if(num1 > 0 || num2 > 0){
                  let list = []
                  if($.type == 10){
                    $.agid = $.list[i].advIdKOC
                    await takePostRequest('aha_card_list');
                    await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
                    list = $.cardList
                  }else{
                    list = $.Task.videoDtoPageResult.list
                  }
                  for(let i of list || []){
                    if(num1 <= 0 && num2 <= 0) break
                    $.contentId = ''
                    if(i.adMaterialDto){
                      $.contentId = i.adMaterialDto.id
                    }else if(i.id){
                      $.contentId = i.id
                    }
                    if(!$.contentId) continue
                    if(num1 > 0){
                      $.actionType = 1
                      await takePostRequest('interactive_done');
                      await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
                    }
                    if(num2 > 0){
                      $.actionType = 2
                      await takePostRequest('interactive_done');
                      await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
                    }
                    num1--
                    num2--
                  }
                  await $.wait(parseInt(Math.random() * 1000 + 1000, 10))
                  await takePostRequest('interactive_reward');
                }
              }
            }
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10))

          }else if($.Task.status+"" === "1" && $.type == 9){
            await takePostRequest('interactive_reward');
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
          }else if($.Task.status+"" === "2"){
            console.log(`${title} 已完成`)
          }else{
            console.log(`${title}-未知 ${$.Task.status}`)
          }
        }else{
          console.log(`${$.list[i].name || $.assignmentId} 获取失败`)
        }
      }
    }
    await takePostRequest('interactive_rewardInfo');
    if($.earn > 0) {
      allMessage += `【京东账号${$.index}】${$.nickName || $.UserName}\n本次运行获得${$.earn}京豆，共计${$.total}京豆\n`
      $.sendMessage = true
    }
    await $.wait(parseInt(Math.random() * 1000 + 3000, 10))
  } catch (e) {
    console.log(e)
  }
}

async function takePostRequest(type) {
  let url = '';
  let body = ``;
  switch (type) {
    case 'interactive_rewardInfo':
      url = `https://api.m.jd.com/interactive_rewardInfo?functionId=interactive_rewardInfo&appid=contenth5_common&body={"encryptProjectPoolId":"DhFbbuoB65uR33ntszFgY8raqPQ"}&client=wh5`;
      body = ``;
      break;
    case 'interactive_info':
      url = `https://api.m.jd.com/interactive_info?functionId=interactive_info&appid=contenth5_common&body=[${$.infoBody}]&client=wh5`;
      body = ``;
      break;
    case 'help':
      url = `https://api.m.jd.com/interactive_info?functionId=interactive_info&appid=contenth5_common&body=[{"type":"2","projectId":"rfhKVBToUL4RGuaEo7NtSEUw2bA","assignmentId":"3PX8SPeYoQMgo1aJBZYVkeC7QzD3","doneHide":false,"helpType":"${$.helpType}","itemId":"${$.itemId}"}]&client=wh5`;
      body = ``;
      break;
    case 'interactive_done':
    case 'interactive_accept':
    case 'aha_card_list':
      let bodys = ''
      if($.type == 5) bodys = ',"agid":["05804754","05822013"]'
      if($.type == 2) bodys = ',"agid":["05804754","05804886"]'
      if($.type == 11 || $.type == 10){
        bodys = `,"actionType":${$.actionType},"contentId":"${$.contentId}"`
        if(type == "aha_card_list"){
          bodys = `,"agid":${$.toStr($.agid,$.agid)},"firstStart":1`
        }
        url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body={"projectId":"${$.projectId}","assignmentId":"${$.assignmentId}","type":"${$.type}"${bodys}}&client=wh5`;
      }else{
        url = `https://api.m.jd.com/${type}?functionId=${type}&appid=contenth5_common&body={"projectId":"${$.projectId}","assignmentId":"${$.assignmentId}","type":"${$.type}","itemId":"${$.itemId}"${bodys}}&client=wh5`;
      }
      body = ``;
      if($.type == 9){
        url = `https://api.m.jd.com/client.action?functionId=interactive_done`;
        body = `body=%7B%22assignmentId%22%3A%22485y3NEBCKGJg6L4brNg6PHhuM9d%22%2C%22type%22%3A%229%22%2C%22projectId%22%3A%22rfhKVBToUL4RGuaEo7NtSEUw2bA%22%7D&uuid=f3ee276edabfc0ad98ff9c35743ec729b3eb30af&client=apple&clientVersion=10.1.4&st=1636278455578&sv=111&sign=76313d9e2b4682324e557cbd0e9e3500`;
      }
      break;
    case 'interactive_reward':
      url = `https://api.m.jd.com/interactive_reward?functionId=interactive_reward&appid=contenth5_common&body={"projectId":"${$.projectId}","assignmentId":"${$.assignmentId}","type":"${$.type}"}&client=wh5`;
      body = ``;
      break;
    case 'qryViewkitCallbackResult':
      url = `https://api.m.jd.com/client.action?functionId=qryViewkitCallbackResult`;
      let signBody = `{"dataSource":"babelInteractive","method":"customDoInteractiveAssignmentForBabel","reqParams":"{\\"itemId\\":\\"${$.itemId}\\",\\"encryptProjectId\\":\\"${$.projectId}\\",\\"encryptAssignmentId\\":\\"${$.assignmentId}\\"}"}`
      let sign = await jdSign('qryViewkitCallbackResult', signBody)
      if(!sign) return
      body = sign;
      break;
    default:
      console.log(`错误${type}`);
  }
  let myRequest = getPostRequest(url, body);
  return new Promise(async resolve => {
    $.post(myRequest, (err, resp, data) => {
      try {
        if (err) {
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
    res = JSON.parse(data);
  } catch (e) {
    console.log(`执行任务异常`);
    // console.log(data);
    $.runFalag = false;
  }
  switch (type) {
    case 'interactive_rewardInfo':
      if (res.data && res.success && res.code+"" === "0" && res.data) {
        if($.total === ''){
          $.total = parseInt(res.data,10) > 0 && parseInt(res.data,10) || 0
          console.log(`当前累计${res.data || 0}京豆`)
        }else{
          $.earn = parseInt(res.data,10) > 0 && (parseInt(res.data,10) - $.total) || 0
          $.total = parseInt(res.data,10) > 0 && parseInt(res.data,10) || 0
          console.log(`本次运行获得${$.earn}京豆`)
        }
      } else {
        console.log(`${type}-> ${data}`);
      }
      break;
    case 'interactive_info':
      if (res.data && res.success && res.code+"" === "0" && res.data) {
        $.Task = res.data[0] || res.data || {};
      } else {
        console.log(`${type}-> ${data}`);
      }
      break;
    case 'aha_card_list':
      if (res.data && res.success && res.code+"" === "0" && res.data) {
        $.cardList = res.data.cardList || [];
      } else {
        console.log(`${type}-> ${data}`);
      }
      break;
    case 'interactive_done':
    case 'interactive_reward':
      if (res.data && res.success && res.code+"" === "0" && res.data) {
        console.log(`${res.data && (res.data.rewardMsg || res.data.msg || '') || data}`)
      } else {
        console.log(`${type}-> ${data}`);
      }
      break;
    case 'help':
      if (res.data && res.success && res.code+"" === "0" && res.data) {
        let arr = res.data[0] || res.data || {}
        $.hasRisk = arr.hasRisk || false
        if($.helpType == 1 && !arr.hasRisk){
          console.log(`助力码:${arr.itemId || '获取失败'}`)
          if(arr.itemId){
            $.temp.push(arr.itemId);
          }
        }else if($.helpType == 2){
          $.toHelp = arr.remainAssistTime
          if(arr.hasRisk){
            $.toHelpMsg = '账号火爆'
            console.log($.toHelpMsg)
          }else{
            $.toHelpMsg = arr.msg
            console.log(arr.msg)
          }
        }
      } else {
        console.log(`${type}-> ${data}`);
      }
      break;
    default:
      console.log(`${type}-> ${data}`);
  }
}

function getList1() {
  return new Promise(resolve => {
    let opts = {
      url:`https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html`,
      followRedirect:false,
      headers: {
        "User-Agent": $.UA,
      },
      timeout:30000
    }
    $.get(opts, async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.toStr(err)}`)
          console.log(`${$.name} list API请求失败，请检查网路重试`)
        } else {
          let list = data.match(/window.__react_data__ = (.+)/) && data.match(/window.__react_data__ = (.+)/)[1] || {}
          list = $.toObj(list,list)
          if(Object.getOwnPropertyNames(list).length > 0){
            for(let i of list.activityData.floorList || []){
              if(i.boardParams && i.boardParams.projectCode && i.boardParams.taskCode){
                let type = 1
                if(i.boardParams.taskCode == "2PbAu1BAT79RxrM5V7c2VAPUQDSd") type = 5
                if(i.boardParams.taskCode == "2CCbSBbVWkFZzRDngs4F6q3YZ62o") type = 11
                if(i.boardParams.taskCode == "4JHmm8nEpyuKgc3z9wkGArXDtEdh") type = 10
                if(i.boardParams.taskCode == "2gWnJADG8JXMpp1WXiNHgSy4xUSv") type = 1
                if(i.boardParams.taskCode == "485y3NEBCKGJg6L4brNg6PHhuM9d") type = 9
                let arr = {"type":type,"projectId":i.boardParams.projectCode,"assignmentId":i.boardParams.taskCode,"doneHide":false,"name":""}
                if(i.boardParams.titleText || i.boardParams.btnText) arr["name"] = i.boardParams.titleText || i.boardParams.btnText || ''
                if(type == 11 && i.materialParams.advIdVideo[0].advGrpId) arr["agId"] = [i.materialParams.advIdVideo[0].advGrpId]
                if(type == 10 && i.materialParams.advIdKOC[0].advGrpId) arr["advIdKOC"] = [i.materialParams.advIdKOC[0].advGrpId]
                $.list.push(arr)
              }
            }
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
function getList2() {
  return new Promise(resolve => {
    let opts = {
      url:`https://api.m.jd.com/?client=wh5&clientVersion=1.0.0&functionId=qryH5BabelFloors`,
      followRedirect:false,
      headers: {
        "User-Agent": $.UA,
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie":cookie
      },
      body:`body=%7B%22activityId%22%3A%222y1S9xVYdTud2VmFqhHbkcoAYhJT%22%2C%22pageNum%22%3A%22-1%22%2C%22innerAnchor%22%3A%22%22%2C%22innerExtId%22%3A%22%22%2C%22hideTopFoot%22%3A%22%22%2C%22innerLinkBase64%22%3A%22%22%2C%22innerIndex%22%3A%220%22%2C%22focus%22%3A%22%22%2C%22forceTop%22%3A%22%22%2C%22addressId%22%3A%222862725865%22%2C%22posLng%22%3A%22118.1423%22%2C%22posLat%22%3A%2224.49335%22%2C%22homeLng%22%3A%22%22%2C%22homeLat%22%3A%22%22%2C%22gps_area%22%3A%22%22%2C%22headId%22%3A%22%22%2C%22headArea%22%3A%22%22%2C%22warehouseId%22%3A%22%22%2C%22jxppGroupid%22%3A%22%22%2C%22jxppFreshman%22%3A%22%22%2C%22dcId%22%3A%22%22%2C%22babelChannel%22%3A%22%22%2C%22mitemAddrId%22%3A%2216_1315_3486_59648%22%2C%22geo%22%3A%7B%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D%2C%22flt%22%3A%22%22%2C%22jda%22%3A%22209449046.1636152208102536431468.1636152208.1636725651.1636803628.46%22%2C%22topNavStyle%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F2y1S9xVYdTud2VmFqhHbkcoAYhJT%2Findex.html%22%2C%22fullUrl%22%3A%22https%3A%2F%2Fprodev.m.jd.com%2Fmall%2Factive%2F2y1S9xVYdTud2VmFqhHbkcoAYhJT%2Findex.html%22%2C%22autoSkipEmptyPage%22%3Afalse%2C%22paginationParam%22%3A%222%22%2C%22paginationFlrs%22%3A%22%5B%5B62955735%2C62955736%2C62955737%2C62955739%2C64833751%2C62957541%2C62957542%2C64770387%2C64770388%2C64770389%2C67005145%2C65097981%2C65692910%2C63379295%5D%2C%5B64770390%2C63024171%2C63025563%2C62991890%2C62957544%2C64580300%2C63632301%2C63632302%2C68346160%2C68371270%2C63025564%2C68373413%2C68391609%2C68383144%2C68391610%2C68383145%2C68391611%2C68383147%2C68391612%2C68383149%2C68391613%2C68391614%2C68383150%2C68383151%2C68383152%5D%5D%22%2C%22transParam%22%3A%22%7B%5C%22bsessionId%5C%22%3A%5C%22707f6e8a-5e7b-4961-91b2-353a6c29ecd5%5C%22%2C%5C%22babelChannel%5C%22%3A%5C%22%5C%22%2C%5C%22actId%5C%22%3A%5C%2201043576%5C%22%2C%5C%22enActId%5C%22%3A%5C%222y1S9xVYdTud2VmFqhHbkcoAYhJT%5C%22%2C%5C%22pageId%5C%22%3A%5C%222929776%5C%22%2C%5C%22encryptCouponFlag%5C%22%3A%5C%221%5C%22%2C%5C%22sc%5C%22%3A%5C%22apple%5C%22%2C%5C%22scv%5C%22%3A%5C%2210.2.2%5C%22%2C%5C%22requestChannel%5C%22%3A%5C%22h5%5C%22%2C%5C%22jdAtHomePage%5C%22%3A%5C%220%5C%22%2C%5C%22utmFlag%5C%22%3A%5C%220%5C%22%7D%22%2C%22siteClient%22%3A%22apple%22%2C%22siteClientVersion%22%3A%2210.2.2%22%2C%22_mkjdcn%22%3A%22a4d2e2d9062d32b9361020528efedb8a%22%2C%22matProExt%22%3A%7B%22unpl%22%3A%22V2_ZzNtbUtVEEchCUAHeh8LAmJTEw1KX0FHJl0VAHIYW1Y3UUFbclRCFnUURlRnGV8UZwsZXkVcQxFFCEZkeBhcBmIKF1lLUHMlfQAoVzYZMgYJAF8QD2dAFUUJdlR8G1sFYwARXEtXQhZxCkFReRlZAm4zIl1EZ3MldDhHZHopF2tmThJaQFBDEXYLR117GF8BZQQXX0JSRBxFCXZX%22%7D%2C%22userInterest%22%3A%7B%22whiteNote%22%3A%220_0_0%22%2C%22payment%22%3A%220_0_0%22%2C%22plusNew%22%3A%220_0_0%22%2C%22plusRenew%22%3A%220_0_0%22%7D%7D&screen=1242*2208&sid=&uuid=${$.UUID}&area=16_1315_3486_59648&osVersion=13.1.2&d_model=iphone8%2C1`,
      timeout:30000
    }
    $.post(opts, async(err, resp, data) => {
      try {
        if (err) {
          console.log(`${$.toStr(err)}`)
          console.log(`${$.name} list API请求失败，请检查网路重试`)
        } else {
          // console.log(data)
          let list = $.toObj(data,data)
          if(Object.getOwnPropertyNames(list).length > 0){
            for(let i of list.floorList || []){
              // console.log(i.boardParams)
              if(i.boardParams && i.boardParams.projectCode && i.boardParams.taskCode){
                let type = 1
                if(i.boardParams.taskCode == "3PX8SPeYoQMgo1aJBZYVkeC7QzD3"){
                  continue
                  type = 2
                }
                let arr = {"type":type,"projectId":i.boardParams.projectCode,"assignmentId":i.boardParams.taskCode,"doneHide":false,"name":""}
                if(i.boardParams.titleText || i.boardParams.btnText) arr["name"] = i.boardParams.titleText || i.boardParams.btnText || ''
                if(type == 2 && i.materialParams.advIdVideo[0].advGrpId){
                  arr["helpType"] = "1"
                  arr["itemId"] = ""
                }
                $.list.push(arr)
              }
            }
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
function jdSign(fn,body) {
  return new Promise((resolve) => {
    let url = {
      url: `https://jd.smiek.tk/jdsign_21092132`,
      body:`{"fn":"${fn}","body":${body}}`,
      followRedirect:false,
      headers: {
        'Accept':'*/*',
        "accept-encoding": "gzip, deflate, br",
        'Content-Type': 'application/json',
      },
      timeout:30000
    }
    $.post(url, async (err, resp, data) => {
      try {
        let res = $.toObj(data,data)
        if(res && typeof res === 'object'){
          if(res.code && res.code == 200 && res.msg == "ok" && res.data){
            let sign = ''
            if(res.data.sign) sign = res.data.sign || ''
            resolve(sign)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve('')
      }
    })
  })
}
function getPostRequest(url,body) {
  let headers =  {
    "Accept": "application/json",
    "Accept-Language": "zh-cn",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    'Cookie': `${cookie}`,
    "Origin": `https://prodev.m.jd.com`,
    "X-Requested-With": "XMLHttpRequest",
    "Referer": `https://prodev.m.jd.com/mall/active/2y1S9xVYdTud2VmFqhHbkcoAYhJT/index.html`,
    "User-Agent": `${UA || $.UA}` ,
  }
  // console.log(headers)
  // console.log(headers.Cookie)
  return  {url: url, method: `POST`, headers: headers, body: body};
}

async function getUA(){
  $.UUID = randomString(40)
  $.UA = `jdapp;iPhone;10.2.2;13.1.2;${$.UUID};M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
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
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

