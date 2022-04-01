/*
4.01～4.10 米粉节联合活动 [gua_opencard125.js]
新增开卡脚本
一次性脚本

1.邀请一人10豆
2.开10张卡(共2组) 成功开1组 有机会获得30豆
3.抽奖 (默认不抽奖 如需抽奖请设置环境变量[guaopencard_draw125]为"3"
填写要抽奖的次数 不足已自身次数为准
guaopencard_draw125="3"
填非数字会全都抽奖

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

默认脚本不执行
如需执行脚本请设置环境变量
guaopencard125="true"
每个账号之间延迟 100=延迟100秒 0=延迟0秒会使用每3个账号延迟60秒
guaopenwait_All 所有
guaopenwait125="0"


All变量适用
————————————————
入口：[ 4.01～4.10 米粉节联合活动 (https://lzdz1-isv.isvjcloud.com/dingzhi/mar2022/miFenJie/activity/563603?activityId=dzlhkk068d4d0ab8a1234853002f66&shareUuid=48266fd539924f23bfebbe8f200d368d)]

请求太频繁会被黑ip
过10分钟再执行

cron:30 1 2-10/3 4 *
============Quantumultx===============
[task_local]
#4.01～4.10 米粉节联合活动
30 1 2-10/3 4 * https://raw.githubusercontent.com/11111120/scripts/master/gua_opencard125.js, tag=4.01～4.10 米粉节联合活动, enabled=true

*/
let guaopencard_addSku = "false"
let guaopencard = "false"
let guaopenwait = "0"
let guaopencard_draw = "0"

const $ = new Env('4.01～4.10 米粉节联合活动');
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

guaopencard_addSku = $.isNode() ? (process.env.guaopencard_addSku125 ? process.env.guaopencard_addSku125 : `${guaopencard_addSku}`) : ($.getdata('guaopencard_addSku125') ? $.getdata('guaopencard_addSku125') : `${guaopencard_addSku}`);
guaopencard_addSku = $.isNode() ? (process.env.guaopencard_addSku_All ? process.env.guaopencard_addSku_All : `${guaopencard_addSku}`) : ($.getdata('guaopencard_addSku_All') ? $.getdata('guaopencard_addSku_All') : `${guaopencard_addSku}`);
guaopencard = $.isNode() ? (process.env.guaopencard125 ? process.env.guaopencard125 : `${guaopencard}`) : ($.getdata('guaopencard125') ? $.getdata('guaopencard125') : `${guaopencard}`);
guaopencard = $.isNode() ? (process.env.guaopencard_All ? process.env.guaopencard_All : `${guaopencard}`) : ($.getdata('guaopencard_All') ? $.getdata('guaopencard_All') : `${guaopencard}`);
guaopenwait = $.isNode() ? (process.env.guaopenwait125 ? process.env.guaopenwait125 : `${guaopenwait}`) : ($.getdata('guaopenwait125') ? $.getdata('guaopenwait125') : `${guaopenwait}`);
guaopenwait = $.isNode() ? (process.env.guaopenwait_All ? process.env.guaopenwait_All : `${guaopenwait}`) : ($.getdata('guaopenwait_All') ? $.getdata('guaopenwait_All') : `${guaopenwait}`);
guaopenwait = parseInt(guaopenwait, 10) || 0
guaopencard_draw = $.isNode() ? (process.env.guaopencard_draw125 ? process.env.guaopencard_draw125 : guaopencard_draw) : ($.getdata('guaopencard_draw125') ? $.getdata('guaopencard_draw125') : guaopencard_draw);
guaopencard_draw = $.isNode() ? (process.env.guaopencard_draw ? process.env.guaopencard_draw : guaopencard_draw) : ($.getdata('guaopencard_draw') ? $.getdata('guaopencard_draw') : guaopencard_draw);
allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie =''
let activityCookie =''
let shareUuidArr = []
!(async () => {
  if ($.isNode()) {
    if(guaopencard+"" != "true"){
      console.log('如需执行脚本请设置环境变量[guaopencard125]为"true"')
    }
    if(guaopencard+"" != "true"){
      return
    }
  }
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dzlhkk068d4d0ab8a1234853002f66"
  $.shareUuid = "48266fd539924f23bfebbe8f200d368d"
  console.log(`入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/mar2022/miFenJie/activity/563603?activityId=${$.activityId}&shareUuid=${$.shareUuid}`)
  shareUuidArr = [$.shareUuid,"a56d82adb48c408698bcc38c389e5529","a6598803a0a84d478bf8796b75e5ae33","f5d7d0ea17ce4a6da8bc889ef39ee292","d92288fe87f1406f93a32cf04b63a55e","dea685ee409e4155896c61779775002f","495ece11f2dd4e519c5c4ddb369b01c9","c0488a573be547d59b053f0984969c11","310cfdfe95f444d0b249bc2d77e6bf9a","d6fa8c1bd43c488eba67e19a72b3c8d5"]
  let s = Math.floor((Math.random()*10))
  let n = 0
  if(s >= 1 && s<= 6) n = Math.floor((Math.random()*shareUuidArr.length))
  $.shareUuid = shareUuidArr[n] ? shareUuidArr[n] : $.shareUuid

  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      message = ""
      $.bean = 0
      $.hotFlag = false
      $.nickName = '';
      console.log(`\n\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      await getUA()
      await run();
      if(i == 0 && !$.actorUuid) break
      if($.outFlag || $.activityEnd) break
    }
  }
  if($.outFlag) {
    let msg = '此ip已被限制，请过10分钟后再执行脚本'
    $.msg($.name, ``, `${msg}`);
    if ($.isNode()) await notify.sendNotify(`${$.name}`, `${msg}`);
  }
  if(allMessage){
    $.msg($.name, ``, `${allMessage}`);
    // if ($.isNode()) await notify.sendNotify(`${$.name}`, `${allMessage}`);
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


async function run() {
  try {
    $.hasEnd = true
    $.endTime = 0
    lz_jdpin_token_cookie = ''
    $.Token = ''
    $.Pin = ''
    let flag = false
    await takePostRequest('isvObfuscator');
    if($.Token == ''){
      console.log('获取[token]失败！')
      return
    }
    await getCk()
    if (activityCookie == '') {
      console.log(`获取cookie失败`); return;
    }
    if($.activityEnd === true){
      console.log('活动结束')
      return
    }
    if($.outFlag){
      console.log('此ip已被限制，请过10分钟后再执行脚本\n')
      return
    }
    await takePostRequest('getSimpleActInfoVo');
    await takePostRequest('getMyPing');
    if(!$.Pin){
      console.log('获取[Pin]失败！')
      return
    }
    await takePostRequest('accessLogWithAD');
    await takePostRequest('getUserInfo');
    await takePostRequest('activityContent');
    if($.hotFlag) return
    if(!$.actorUuid){
      console.log('获取不到[actorUuid]退出执行，请重新执行')
      return
    }
    if($.hasEnd === true || Date.now() > $.endTime){
      $.activityEnd = true
      console.log('活动结束')
      return
    }
    await takePostRequest('drawContent');
    await $.wait(1000)
    $.openList = []
    $.allOpenCard = false
    if($.openCardAll) console.log('已全部开卡')
    if(!$.allFlagOne){
      flag = true
      console.log('开第1组卡')
      $.openCardToken = 'B72D5A632BD61531B6CB676350A7E6B8'
      await openCardHttp("getCardMaterial")
      await openCardHttp("queryUnionGiftList")
      await openCardHttp("submitBindCards")
      await openCardHttp("sendUnionGift")
      await takePostRequest('activityContent');
      await takePostRequest('drawContent');
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
    }
    if(!$.allFlagTwo){
      flag = true
      console.log('开第2组卡')
      $.openCardToken = '643CC63D4608E5F02BE678F53CABD333'
      await openCardHttp("getCardMaterial")
      await openCardHttp("queryUnionGiftList")
      await openCardHttp("submitBindCards")
      await openCardHttp("sendUnionGift")
      await takePostRequest('activityContent');
      await takePostRequest('drawContent');
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
    }
    $.log("关注: " + $.openFollowAll)
    if(!$.openFollowAll && !$.outFlag){
      flag = true
      await takePostRequest('followShop');
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10))
    }
    if(flag){
      await takePostRequest('activityContent');
    }

    console.log(`${$.score}值`)
    if(guaopencard_draw+"" !== "0"){
      $.runFalag = true
      let count = parseInt($.score/100)
      guaopencard_draw = parseInt(guaopencard_draw, 10)
      if(count > guaopencard_draw) count = guaopencard_draw
      console.log(`抽奖次数为:${count}`)
      for(m=1;count--;m++){
        console.log(`第${m}次抽奖`)
        await takePostRequest('抽奖');
        if($.runFalag == false) break
        if(Number(count) <= 0) break
        if(m >= 10){
          console.log("抽奖太多次，多余的次数请再执行脚本")
          break
        }
        await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
      }
    }else console.log('如需抽奖请设置环境变量[guaopencard_draw125]为"3" 3为次数');
    
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10))
    await takePostRequest('getDrawRecordHasCoupon');
    await takePostRequest('getShareRecord');
    console.log($.actorUuid)
    console.log(`当前助力:${$.shareUuid}`)
    if($.index == 1){
      $.shareUuid = $.actorUuid
      console.log(`后面的号都会助力:${$.shareUuid}`)
    }
    await $.wait(parseInt(Math.random() * 1000 + 5000, 10))
    if(flag) await $.wait(parseInt(Math.random() * 1000 + 10000, 10))
    if(guaopenwait){
      if($.index != cookiesArr.length){
        console.log(`等待${guaopenwait}秒`)
        await $.wait(parseInt(guaopenwait, 10) * 1000)
      }
    }else{
      if($.index % 3 == 0) console.log('休息1分钟，别被黑ip了\n可持续发展')
      if($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 60000, 10))
    }
  } catch (e) {
    console.log(e)
  }
}

async function takePostRequest(type) {
  if($.outFlag) return
  let domain = 'https://lzdz1-isv.isvjcloud.com';
  let body = ``;
  let method = 'POST'
  let admJson = ''
  switch (type) {
    case 'isvObfuscator':
      url = `https://api.m.jd.com/client.action?functionId=isvObfuscator`;
      body = `body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=7b7d04623bc4083f7191386b8d607b4855511a8f&client=apple&clientVersion=10.1.4&st=1648811310743&sv=111&sign=08c42ef0a98f1f0584a79752da6c21c5`;
      break;
      case 'getSimpleActInfoVo':
        url = `${domain}/dz/common/getSimpleActInfoVo`;
        body = `activityId=${$.activityId}`;
        break;
      case 'getMyPing':
        url = `${domain}/customer/getMyPing`;
        body = `userId=${$.shopId || $.venderId || ''}&token=${$.Token}&fromType=APP`;
        break;
      case 'accessLogWithAD':
        url = `${domain}/common/accessLogWithAD`;
        let pageurl = `${domain}/drawCenter/activity?activityId=${$.activityId}&shareUuid=${$.shareUuid}`
        body = `venderId=${$.shopId || $.venderId || ''}&code=99&pin=${encodeURIComponent($.Pin)}&activityId=${$.activityId}&pageUrl=${encodeURIComponent(pageurl)}&subType=app&adSource=`
        break;
      case 'getUserInfo':
        url = `${domain}/wxActionCommon/getUserInfo`;
        body = `pin=${encodeURIComponent($.Pin)}`;
        break;
      case 'activityContent':
        url = `${domain}/dingzhi/mar2022/miFenJie/activityContent`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&pinImg=${encodeURIComponent($.attrTouXiang)}&nick=${encodeURIComponent($.nickname)}&cjyxPin=&cjhyPin=&shareUuid=${$.shareUuid}`
        break;
      case 'drawContent':
        url = `${domain}/dingzhi/taskact/common/drawContent`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
        break;
      case 'checkOpenCard':
        url = `${domain}/dingzhi/linkgame/checkOpenCard`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&shareUuid=${$.shareUuid}`
        break;
      case 'info':
        url = `${domain}/dingzhi/linkgame/task/opencard/info`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
        break;
      case 'startDraw':
        url = `${domain}/joint/order/draw`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&drawType=1`
        break;
      case 'followShop':
        url = `${domain}/dingzhi/mar2022/miFenJie/saveTask`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&taskType=23&taskValue=1&shareUuid=${$.shareUuid}`
        break;
      case 'sign':
      case 'addCart':
      case 'browseGoods':
        url = `${domain}/dingzhi/opencard/${type}`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
        if(type == 'browseGoods') body += `&value=${$.visitSkuValue}`
        break;
      case '邀请':
      case '助力':
        if(type == '助力'){
          url = `${domain}/dingzhi/linkgame/assist`;
        }else{
          url = `${domain}/dingzhi/linkgame/assist/status`;
        }
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&shareUuid=${$.shareUuid}`
        break;
      case 'viewVideo':
      case 'visitSku':
      case 'toShop':
      case 'addSku':
        url = `${domain}/dingzhi/opencard/${type}`;
        let taskType = ''
        let taskValue = ''
        if(type == 'viewVideo'){
          taskType = 31
          taskValue = 31
        }else if(type == 'visitSku'){
          taskType = 5
          taskValue = $.visitSkuValue || 5
        }else if(type == 'toShop'){
          taskType = 14
          taskValue = $.toShopValue || 14
        }else if(type == 'addSku'){
          taskType = 2
          taskValue = $.addSkuValue || 2
        }
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}&taskType=${taskType}&taskValue=${taskValue}`
        break;
      case 'getDrawRecordHasCoupon':
        url = `${domain}/dingzhi/taskact/common/getDrawRecordHasCoupon`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
        break;
      case 'getShareRecord':
        url = `${domain}/dingzhi/taskact/common/getShareRecord`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}&actorUuid=${$.actorUuid}`
        break;
      case '抽奖':
        url = `${domain}/dingzhi/mar2022/miFenJie/start`;
        body = `activityId=${$.activityId}&pin=${encodeURIComponent($.Pin)}`
        break;
      default:
        console.log(`错误${type}`);
    }
    let myRequest = getPostRequest(url, body, method);
    // console.log(myRequest)
    return new Promise(async resolve => {
      $.post(myRequest, (err, resp, data) => {
        try {
          setActivityCookie(resp)
          if (err) {
            if(resp && typeof resp.statusCode != 'undefined'){
              if(resp.statusCode == 493){
                console.log('此ip已被限制，请过10分钟后再执行脚本\n')
                $.outFlag = true
              }
            }
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
    if(type != 'accessLogWithAD' || type != 'drawContent'){
      if(data){
        res = JSON.parse(data);
      }
    }
  } catch (e) {
    console.log(`${type} 执行任务异常`);
    console.log(data);
    $.runFalag = false;
  }
  try {
    switch (type) {
      case 'isvObfuscator':
        if(typeof res == 'object'){
          if(res.errcode == 0){
            if(typeof res.token != 'undefined') $.Token = res.token
          }else if(res.message){
            console.log(`isvObfuscator ${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
        break;
      case 'getSimpleActInfoVo':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(typeof res.data.shopId != 'undefined') $.shopId = res.data.shopId
            if(typeof res.data.venderId != 'undefined') $.venderId = res.data.venderId
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getMyPing':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(res.data && typeof res.data.secretPin != 'undefined') $.Pin = res.data.secretPin
            if(res.data && typeof res.data.nickname != 'undefined') $.nickname = res.data.nickname
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getUserInfo':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(res.data && typeof res.data.yunMidImageUrl != 'undefined') $.attrTouXiang = res.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png"
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'activityContent':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            $.endTime = res.data.endTime || (res.data.activityVo && res.data.activityVo.endTime) || res.data.activity.endTime || 0
            $.hasEnd = res.data.isEnd || false
            $.score = res.data.score2 || 0
            $.actorUuid = res.data.actorUuid || ''
            $.openCardAll = res.data.openCardAll || ''
            $.allFlagOne = res.data.allFlagOne || ''
            $.allFlagTwo = res.data.allFlagTwo || ''
            $.openFollowAll = res.data.openFollowAll || ''
            if(!$.shareUuids) $.shareUuids = $.shareUuid
            if(res.data.groupCardBean) console.log(`开卡获得:${res.data.groupCardBean || res.data.addBeanNum}豆`)
            getAssistStatus(res.data.assistStatus)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'info':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            // $.drawCount = res.data.drawCount || 0
            $.addCart = res.data.addCart || false
            // $.followShop = res.data.followShop || false
            // $.sign = res.data.isSignStatus || false
            // $.visitSku = res.data.visitSku || false
            // $.visitSkuList = res.data.visitSkuList || []
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'checkOpenCard':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            let cardList1 = res.data.cardList1 || []
            let cardList2 = res.data.cardList2 || []
            let cardList = res.data.cardList || []
            let openCardList = res.data.openCardList || []
            $.openList = [...cardList,...cardList1,...cardList2,...openCardList]
            $.allOpenCard = res.data.allOpenCard || res.data.isOpenCardStatus || false
            $.openCardScore1 = res.data.score1 || 0
            $.openCardScore2 = res.data.score2 || 0
            $.drawScore = res.data.drawScore || 0
            if(res.data.beans || res.data.addBeanNum) console.log(`开卡获得:${res.data.beans || res.data.addBeanNum}豆`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'startDraw':
      case 'followShop':
      case 'viewVideo':
      case 'visitSku':
      case 'toShop':
      case 'addSku':
      case 'sign':
      case 'addCart':
      case 'browseGoods':
      case '抽奖':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            if(typeof res.data == 'object'){
              getAssistStatus(res.data.assistStatus || '')
              let msg = ''
              let title = '抽奖'
              if(res.data.addBeanNum){
                msg = `${res.data.addBeanNum}京豆`
              }
              if(res.data.addPoint){
                msg += ` ${res.data.addPoint}游戏机会`
              }
              if(type == 'followShop'){
                title = '关注'
                if(res.data.beanNumMember && res.data.assistSendStatus){
                  msg += ` 额外获得:${res.data.beanNumMember}京豆`
                }
              }else if(type == 'addSku' || type == 'addCart'){
                title = '加购'
              }else if(type == 'viewVideo'){
                title = '热门文章'
              }else if(type == 'toShop'){
                title = '浏览店铺'
              }else if(type == 'visitSku' || type == 'browseGoods'){
                title = '浏览商品'
              }else if(type == 'sign'){
                title = '签到'
              }else{
                let drawData = res.data.wdsrvo || res.data
                msg = drawData.drawOk == true && drawData.name || ''
              }
              if(!msg){
                msg = '空气💨'
              }
              console.log(`${title}获得:${msg || data}`)
            }else{
              console.log(`${type} ${data}`)
            }
          }else if(res.errorMessage){
            $.runFalag = false;
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getDrawRecordHasCoupon':
        if(typeof res == 'object'){
          if(res.result && res.result === true){
            console.log(`我的奖品：`)
            let num = 0
            let value = 0
            let typeArr = {
              "dayShareBeans":"邀请",
              "dayBeSharedBeans":"被邀请",
              "openCardBeans":"开卡",
              "saveTaskBeans23":"关注",
              "saveTaskBeans12":"逛店铺",
              "saveTaskBeans21":"加购",
            }
            for(let i in res.data){
              let item = res.data[i]
              if(item.drawId == 'dayShareBeans'){
                num++
                value = item.infoName.replace('京豆','')
              }else{
                console.log(`${item.infoType != 10 && item.drawId && (typeArr[item.drawId] || item.drawId)+':' || item.value && item.value +':' || ''}${item.infoName}`)
              }
            }
            if(num > 0) console.log(`邀请好友(${num}):${num*parseInt(value, 10) || 30}京豆`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case 'getShareRecord':
        if(typeof res == 'object'){
          if(res.result && res.result === true && res.data){
            $.ShareCount = res.data.length
            $.log(`=========== 你邀请了:${$.ShareCount}个\n`)
          }else if(res.errorMessage){
            console.log(`${type} ${res.errorMessage || ''}`)
          }else{
            console.log(`${type} ${data}`)
          }
        }else{
          console.log(`${type} ${data}`)
        }
        break;
      case '邀请':
      case '助力':
        // console.log(data)
        if(typeof res == 'object'){
          if(res.data.status == 200){
            if(type == '助力'){
              console.log('助力成功')
            }else{
              $.yaoqing = true
            }
          }else if(res.data.status == 105){
            console.log('已经助力过')
          }else if(res.data.status == 104){
            console.log('已经助力其他人')
          }else if(res.data.status == 101){
            // console.log('已经助力过')
          }else{
            console.log(data)
          }
        }else{
          console.log(`${type} ${data}`)
        }

      case 'accessLogWithAD':
      case 'drawContent':
        break;
      default:
        console.log(`${type}-> ${data}`);
    }
    if(typeof res == 'object'){
      if(res.errorMessage){
        if(res.errorMessage.indexOf('火爆') >-1 ){
          $.hotFlag = true
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function getPostRequest(url, body, method="POST") {
  let headers = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  }
  if(url.indexOf('https://lzdz1-isv.isvjcloud.com') > -1){
    headers["Referer"] = `https://lzdz1-isv.isvjcloud.com/dingzhi/mar2022/miFenJie/activity/563603?activityId=${$.activityId}&shareUuid=${$.shareUuid}`
    headers["Cookie"] = `${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ''}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${activityCookie}`
  }
  // console.log(headers)
  // console.log(headers.Cookie)
  return  {url: url, method: method, headers: headers, body: body, timeout:30000};
}

function getAssistStatus(id) {
  switch (id) { // 1成功 0直接访问 2已经助力 3已为他人助力 12助力次数达到上限 -1失败
    case 1:
      console.log('成功为好友助力！');
      if($.index != 1) $.assistCount++
      $.assistStatus = true
      break;
    case 2:
      console.log('已经为好友助力过了！');
      $.assistStatus = true
      break;
    case 3:
      console.log('已经为其他好友助力过了！');
      $.assistStatus = true
      break;
    case 11:
      console.log('当天助力次数已达上限！');
      $.assistStatus = true
      break;
    case 12:
      console.log('活动助力次数已达上限！');
      $.assistStatus = true
      break;
    case 21:
      console.log('您未注册会员,无法为好友助力！');
      break;
    case 22:
      console.log('您不是新会员,无法为好友助力！');
      break;
    case 77:
      break;
    case 66:
      break;
  }
}

var _0xodt='jsjiami.com.v6',_0xodt_=['‮_0xodt'],_0x38f2=[_0xodt,'SgLDomVBwqQ=','w6rDk8OcwpzDrg==','WhbDpcKyw7owwq/CjsKwXCkQI0bCiTTDjCnCriPCqGQLw7DCmcKHw5BHw58=','wonDqhYbQw==','wp8GHQRG','e8KvU8O2worDmBpR','wpnCu1h+wrl0w5Bpwo3DiQ==','fsOgw4k4wpo=','wp5WLHcGw5k=','MTMfwrs/','wp83PsK9wrc=','f8KbcR8/','LSDCqcKRLw==','wobDiQzCmMO1','wqHDtBEBew==','Z8KdX8OhwrY=','TMK5WTMd','K8Ktw6DCoVZcw7HDpDU=','w6bCq8K4w6sGDA8PwoUxN8Kpwow=','CMO9wqw=','wr46H8OWw4E=','wodJGFom','wpPDiDEcfQ==','OBvCi8KVOg==','NhkLwpoz','wojDtAMASR7CssKbO1/CgMONMw==','w4B1MXnDiSHDmcKl','G0UKMicDw4jDtmk=','D3cKNyY=','wqvCvltdwpo=','dirCv8K5LBtqbw==','KV/Di04zWcOFTTtW','XTp+woDCgA==','wqA5wrnDvxRr','woQfDMOQw5I=','b8KZawIQ','wr0Uwo7DkQI=','MAccwpMJEMKSPsO2MsKrwpdl','w5HDn8Kewq/Cl2LChEc=','wrA9OsK3wpbCvyPClQE=','M8Kqw5LCnFQ=','VFkRwq/Duw==','UgjDn3ZH','w47CsgLCgls=','w7kkS3XDug==','wpIECsOtw5U=','Hw3CkBrDrg==','VzbCrcKcMQ==','MQAcUMOP','B3XChMKo','w7HDoMO6wqXDhw==','A0bCr8OzUg==','d8K7c8ODwrA=','w5HDosOkwpfDrg==','wro6KMOEw7U=','RnQoVcK2','w5nCh8Oy','GU83IjA=','fDRu','Qn4oZA==','cg7Cox7orbrmsKvlpKXotJbvvInorZDmo5jmn6Tnvqzot4nphZDor5w=','esKOw7XCvcO3','d8K/UScHw6/CqMOF','wr80wrbDqgVWacOhwqfDnw==','w4fDn8KsLQA=','PirCnTDDuQE=','QnAJWMKC','w4jDkcKVPy4=','w5LDpcOfwrfDnA==','DMK9wpPCmsKi','cyvCuw==','ZDRawrrCqA==','ZsKkfw==','wqg5OcK2','Wj/DgcKP6K295rCB5aak6LaE776T6K+I5qKb5p6Y57yB6LeI6YSp6K+P','woZcDXIY','fVw3RMK5','w5rChivCqV4=','wrvDpwXDmw==','wrI8w6o4BQ==','wqUywrTDtBVnecO7','wqzDrhDDiMKpHsOJwrg3Tw==','K1gQIA8=','ZsKudsOgwqbCng==','w6XCu8O4worDsQ==','w5LCsxPCik4=','w44DWxlK','GsKew7XChHQ=','GmnCssKNwpA=','w4zDnsKywoTClQ==','LhXDsWpZ','wo7Csk1t','wqIswpnDkwo=','w61NAMOZBA==','JQ0DwqcE','TsKKw6PCqQ==','bzbCtcKvPDZrbw==','w6vDvsOkwpk=','wpo4w6oTQsOhXSg1','CgvDosKu','wpcsw4ASDMK2aQ==','MDHDhMKUw44=','w7fDmMOXcMOpcAbCuA==','CMKMHcOPV10iERs=','YC56wqY=','CMKMHcOPV2cP','IMKxKcOzdw==','cBB9K8K8','Ni7ChzY=','fMKxfsORwpU=','BgIAXMOg','JsKMw7nCiVo=','wobCvF4=','w6USd2PDr8OgDg==','fVgewpvDlsKtBcK+','IjrCgD8=','WcKrQcOMwog=','c8Kdw53CrsOG','w6zDgsKrKCwxw70=','VTXChw==','GxYba8OpAmw=','wrkZw6geXQ==','w7rDjcO8wrLDkw==','OzjDjFpX','P0PDomYm','NhHDgA==','wr4IwofDlS8=','wow/LMKBwqY=','YMKMw6/CmsO1','w6oFZX7DqsO0IsOmYQ==','YloSwo/DsMKFE8KpAsK3w6pUbg==','NljDjQ==','JcKww6bCikBd','Rl4peMKr','MUzCtsKowrE=','wqANw6EdcA==','w5nCh8OywobDiDo=','w47DuMO3XMOP','KMK2wrUjw7M=','w5vCqMK5w7ER','VMKHWCo7','wpvDmxnCi8Om','w7TDqcO9wpTDncKY','EH/Cg8KfwpbCnlfCiS09w6nClcK9D8O7','I8KNwqknw6A=','woQ+PcOFw58=','wr0Kw68kQA==','O8KUwr4ww647NMOcw6rDpsKVwp3CmmLCg8KmCcKD','KcOmwq9jw6k=','P8KvPsOzdQ==','GsKlwo8jw6M=','BcKqw5PCp0Q=','ScKIVh0Z','XwrCmUvCmA==','w6IhSknDnw==','ccKTRMOPwo8=','fxp/LMK1','OEfDsFoe','Jjw7TA==','wq3Clm0=','UivCpsK8NRNuM8OnORsFfcKGw5LDrFjCvSPDhR0lJMKBw5QKacKHPcKEN8KKw68bQcK4AMOgwqnClE9mVMOIwrgWwr1QwrDCtMOcwr3CvMKuX8OxwqvCh8OcI0hnw53Cs8K0w7rCnjQUw5XCuyvDlWNdwofDn2TDinbCpcOnUMOUME3ChcKVwpXDrDPDlCvDn8O1RV80wrbCuEQCfmPCkDnDvFcWwrvDi8OMw65Kwqg4wrJHfcOU','wpnCplthwrVVw6dpwofDngFpwpXDu18=','GMKNwrXCvMKQ','wqXDvAIDeQ==','BRYGfMOdC2DDgcK9LRF3Wg==','MWHDmVYT','wp/CpWp/woY=','wrgaOcOJw7Q=','BsO9wq92','w5wFVSRAwqw7','w4LDiMK2Lyg4w6zCkMODWFMS','w7/Dm8OqecOtcQLCvm/CvkN2wqnCrcKew64=','X8KyUS4Cw78=','DjHCvcKMF8KrGsOCw5ECJH7ChgVJPTLDmcOFA3HCjMOkw5pCT8OEQUc4w7oQPA==','OCnDiXhe','C8Kew6DCgEM=','wpANMyFT','RCxbwp/Cgg==','cBZZEsKI','w6lFOnPDhg==','wqkLHcKfwoE=','wqvDij3CvsOb','I1LCkMOtZg==','w6bCgcOhwqvDlQ==','XMKQUwQD','MMKgwpQHw6c=','w5/CisOBwqnDlA==','YcOqw4Ugwoo=','GQbDhFxK','S1oAwo7Dgg==','OhI9wpMT','ExXDhsKOw7k=','w5U0diVD','K2YNGS0=','wpYcw4syVw==','wpgbwrvDuxg=','wog7PylX','eQXCjcKdNA==','cMKKV8OCwqI=','TMK7b8OowqM=','aDPCr8KiNw==','bMKbw6DCp8OR','w6pdKsOaNg==','di/Ci8KdKg==','JMKTCcOJYA==','w6bCpcOzwonDlw==','w7fDgMONXcO3','ZWo3asK4','V8KkQCAF','M1nDiVAjaMOVVw==','wozDlQ7CncOmH8K4w7I+Xw==','Ynk+wq3DgQ==','NhvDiX5Ow70=','MxXDsFFJ','OC3Cmg/Dpw==','AMKcFcO5WQ==','wooLEsKLwok=','KRIXwpkvA8KpPsOR','wpwow7cf','DTPCrMKOGsKBHw==','wpjDizrCocOn','w5zCm8OYwqbDlyrDtgc=','RBXDrWxRwr97dUE=','w7HDksKrMw==','BsOgwqphw5XDshY=','wohyDVUC','wqnCq1pJwqw=','w4vDtcKaCCU=','w6vDv8K1wobCmg==','Fm3ClcKawpM=','w4IFWiRAwqwBw69c','cMKzUcO0wpvDjzZGMQ==','InfCqMObc8KCYcKi','BMKVw47CpVY=','BE4HOjcVw6TDoQ==','aBxTEsKVw6jDp0RBw5I=','wp8AEsOuw5c=','dxFcB8KEw5U=','w71NF2nDiA==','w4caQlrDgg==','NRPDl8KMw4Y=','OiAuQMOy','wpBkLHEW','a8KBW8OTwp8=','w7nCsS7Cikg=','wrYmw4I5GA==','w6TDicKjwpnCgg==','w5fCtw3CrEA=','C8Kgwr4ww70=','HxrDs1VK','wqvCklx+wrY=','w4DDnAzCm8OqPMKkw68jZcKEw7DCg8K7TyFJDMKQ','wp8jPsOMw6bDlUZDwpDCncOxw7DChQ==','FzTDqHNe','chpRDMKFw5nDt14=','LB8Ywo8vJMKVM8OGLg==','VgnCqUXCqQ==','jNpsjiZYLaCzbmiC.VbrpWcowm.v6=='];if(function(_0x53b839,_0x53b5b8,_0x4f44f1){function _0x21878f(_0x396157,_0x12589c,_0x5ea016,_0x14d902,_0x29cf0b,_0x421132){_0x12589c=_0x12589c>>0x8,_0x29cf0b='po';var _0x4bc5eb='shift',_0x4c9986='push',_0x421132='‮';if(_0x12589c<_0x396157){while(--_0x396157){_0x14d902=_0x53b839[_0x4bc5eb]();if(_0x12589c===_0x396157&&_0x421132==='‮'&&_0x421132['length']===0x1){_0x12589c=_0x14d902,_0x5ea016=_0x53b839[_0x29cf0b+'p']();}else if(_0x12589c&&_0x5ea016['replace'](/[NpZYLCzbCVbrpWw=]/g,'')===_0x12589c){_0x53b839[_0x4c9986](_0x14d902);}}_0x53b839[_0x4c9986](_0x53b839[_0x4bc5eb]());}return 0xdb844;};return _0x21878f(++_0x53b5b8,_0x4f44f1)>>_0x53b5b8^_0x4f44f1;}(_0x38f2,0x8b,0x8b00),_0x38f2){_0xodt_=_0x38f2['length']^0x8b;};function _0x417b(_0x854f13,_0x2fd287){_0x854f13=~~'0x'['concat'](_0x854f13['slice'](0x1));var _0x481444=_0x38f2[_0x854f13];if(_0x417b['vkMuOg']===undefined){(function(){var _0xdf98b6=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x58eaf7='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xdf98b6['atob']||(_0xdf98b6['atob']=function(_0x3e0743){var _0x2b6cc7=String(_0x3e0743)['replace'](/=+$/,'');for(var _0x4a87d4=0x0,_0x4f75bd,_0x49cf89,_0x41e054=0x0,_0x52c349='';_0x49cf89=_0x2b6cc7['charAt'](_0x41e054++);~_0x49cf89&&(_0x4f75bd=_0x4a87d4%0x4?_0x4f75bd*0x40+_0x49cf89:_0x49cf89,_0x4a87d4++%0x4)?_0x52c349+=String['fromCharCode'](0xff&_0x4f75bd>>(-0x2*_0x4a87d4&0x6)):0x0){_0x49cf89=_0x58eaf7['indexOf'](_0x49cf89);}return _0x52c349;});}());function _0xffd04b(_0x585755,_0x2fd287){var _0x75eeed=[],_0x29f8ff=0x0,_0x40a69f,_0x5c011f='',_0x2777b0='';_0x585755=atob(_0x585755);for(var _0x1c138c=0x0,_0x250b0b=_0x585755['length'];_0x1c138c<_0x250b0b;_0x1c138c++){_0x2777b0+='%'+('00'+_0x585755['charCodeAt'](_0x1c138c)['toString'](0x10))['slice'](-0x2);}_0x585755=decodeURIComponent(_0x2777b0);for(var _0x2be53a=0x0;_0x2be53a<0x100;_0x2be53a++){_0x75eeed[_0x2be53a]=_0x2be53a;}for(_0x2be53a=0x0;_0x2be53a<0x100;_0x2be53a++){_0x29f8ff=(_0x29f8ff+_0x75eeed[_0x2be53a]+_0x2fd287['charCodeAt'](_0x2be53a%_0x2fd287['length']))%0x100;_0x40a69f=_0x75eeed[_0x2be53a];_0x75eeed[_0x2be53a]=_0x75eeed[_0x29f8ff];_0x75eeed[_0x29f8ff]=_0x40a69f;}_0x2be53a=0x0;_0x29f8ff=0x0;for(var _0x2d623f=0x0;_0x2d623f<_0x585755['length'];_0x2d623f++){_0x2be53a=(_0x2be53a+0x1)%0x100;_0x29f8ff=(_0x29f8ff+_0x75eeed[_0x2be53a])%0x100;_0x40a69f=_0x75eeed[_0x2be53a];_0x75eeed[_0x2be53a]=_0x75eeed[_0x29f8ff];_0x75eeed[_0x29f8ff]=_0x40a69f;_0x5c011f+=String['fromCharCode'](_0x585755['charCodeAt'](_0x2d623f)^_0x75eeed[(_0x75eeed[_0x2be53a]+_0x75eeed[_0x29f8ff])%0x100]);}return _0x5c011f;}_0x417b['oZCHEh']=_0xffd04b;_0x417b['KHmoFh']={};_0x417b['vkMuOg']=!![];}var _0xf1a8a7=_0x417b['KHmoFh'][_0x854f13];if(_0xf1a8a7===undefined){if(_0x417b['guAuQj']===undefined){_0x417b['guAuQj']=!![];}_0x481444=_0x417b['oZCHEh'](_0x481444,_0x2fd287);_0x417b['KHmoFh'][_0x854f13]=_0x481444;}else{_0x481444=_0xf1a8a7;}return _0x481444;};function openCardHttp(_0x2517a7){var _0x50492a={'gvUNd':function(_0x27114e,_0x1df861){return _0x27114e==_0x1df861;},'bWnad':function(_0x2667fe){return _0x2667fe();},'BAaOq':function(_0x2871d1){return _0x2871d1();},'TwRQX':function(_0x4ba5ba,_0x136a51){return _0x4ba5ba!==_0x136a51;},'kbkrx':_0x417b('‮0','XLP6'),'YBbpj':function(_0x11fa5b,_0x12279c){return _0x11fa5b===_0x12279c;},'oSILr':function(_0x3d50bd,_0x477cec){return _0x3d50bd!=_0x477cec;},'qWQLp':_0x417b('‮1','(D4z'),'Sitho':_0x417b('‫2','nSIR'),'zAOEp':function(_0x25289a,_0x4bd5d2){return _0x25289a==_0x4bd5d2;},'jbTjn':_0x417b('‮3','y6X%'),'XpoOj':function(_0x3a61e9,_0x1ebb9a){return _0x3a61e9===_0x1ebb9a;},'CxcEp':_0x417b('‮4','J#xl'),'Fpwoq':function(_0x468077,_0x273918){return _0x468077!==_0x273918;},'eeDnY':_0x417b('‮5','$eYz'),'ikWHs':function(_0x4b811a,_0x5a6534){return _0x4b811a===_0x5a6534;},'aTBef':_0x417b('‮6','6DOR'),'FFiOo':_0x417b('‮7','Sn4g'),'TGlcx':_0x417b('‮8','$eYz'),'ZwmGu':_0x417b('‫9','p8JO'),'fAQHm':_0x417b('‮a','X7NA'),'wwswn':_0x417b('‫b','$eYz'),'CXlJe':_0x417b('‫c','Aw6&'),'NmuhS':_0x417b('‮d','(D4z'),'SMfJm':_0x417b('‮e','c48o'),'Iurkw':_0x417b('‮f','NnX3'),'jbiXj':_0x417b('‮10','ERWq'),'LSFXz':function(_0x27c572){return _0x27c572();},'JRBSh':_0x417b('‫11','WQF6'),'MJOjd':function(_0xe625a6,_0x5c6617){return _0xe625a6===_0x5c6617;},'OmFJL':_0x417b('‫12','g)4p'),'aJCTM':_0x417b('‫13','LrRn'),'EdTLp':function(_0xb2e2d6,_0x5b59d3){return _0xb2e2d6==_0x5b59d3;},'AAerj':_0x417b('‮14','[3w!'),'qXKmP':function(_0x40b9cb){return _0x40b9cb();},'nnpuI':_0x417b('‮15','cWVj'),'GzcWz':function(_0x552e91,_0x20d6e2){return _0x552e91!=_0x20d6e2;},'nDfFu':function(_0x318695){return _0x318695();},'YojnD':function(_0x40a9b8,_0x53aab7){return _0x40a9b8==_0x53aab7;},'BadqQ':function(_0xceb961,_0x5dc3a0){return _0xceb961==_0x5dc3a0;},'ytcwv':_0x417b('‮16','[3w!'),'mVGfd':_0x417b('‮17','l[HO'),'Rhkxo':_0x417b('‮18','@0w$'),'NiDtd':function(_0x48c6ed,_0x4c89f1){return _0x48c6ed==_0x4c89f1;},'uzZJT':_0x417b('‫19','LrRn'),'tLWrw':function(_0x49e66c,_0x3ad8c0){return _0x49e66c!==_0x3ad8c0;},'WZFuD':_0x417b('‫1a','g)4p'),'inrgy':_0x417b('‮1b','[3w!'),'AmbQF':function(_0x12c934,_0x4df9ff){return _0x12c934===_0x4df9ff;},'MawNZ':function(_0x5c8ac7,_0x59ef58){return _0x5c8ac7!=_0x59ef58;},'qHYIb':_0x417b('‫1c','6DOR'),'zuSSf':function(_0x4d1d48){return _0x4d1d48();},'YsfNH':_0x417b('‫1d','p8JO'),'MBcMc':_0x417b('‫1e','BeXQ'),'qSOet':_0x417b('‫1f','N^v2'),'bWQOp':_0x417b('‮20','op$V'),'HrqIh':_0x417b('‮21','(D4z'),'GstHG':_0x417b('‮22','Kvk8')};return new Promise(_0x56a100=>{var _0xbd8d13={'awbFd':function(_0x1b7091){return _0x50492a[_0x417b('‮23','(37E')](_0x1b7091);},'jkmTy':function(_0x3a9d97){return _0x50492a[_0x417b('‮24','Aw6&')](_0x3a9d97);},'QCnRD':function(_0x3bfe6b){return _0x50492a[_0x417b('‮25','&Qbt')](_0x3bfe6b);},'ezCYO':function(_0x1160fd,_0x59e59c){return _0x50492a[_0x417b('‫26','ng1b')](_0x1160fd,_0x59e59c);},'JisfP':_0x50492a[_0x417b('‮27','WQF6')],'PebuW':function(_0x15f01e,_0x1c34a3){return _0x50492a[_0x417b('‫28','*crm')](_0x15f01e,_0x1c34a3);},'FxtvM':function(_0x30cd60,_0x3398a2){return _0x50492a[_0x417b('‮29','vhCK')](_0x30cd60,_0x3398a2);},'noLYM':function(_0x36dac6,_0x5ddd21){return _0x50492a[_0x417b('‫2a','nSIR')](_0x36dac6,_0x5ddd21);},'IvMdc':_0x50492a[_0x417b('‮2b','Mw[)')],'InHFb':_0x50492a[_0x417b('‮2c','AiO0')],'PSmIK':function(_0x5b7881){return _0x50492a[_0x417b('‮2d','(D4z')](_0x5b7881);},'QCrEv':function(_0x44a54a,_0x141a2a){return _0x50492a[_0x417b('‮2e','$eYz')](_0x44a54a,_0x141a2a);},'YvJff':_0x50492a[_0x417b('‫2f','AiO0')],'GbKDm':function(_0x46b9e7,_0xd4c7d2){return _0x50492a[_0x417b('‫30','DSxY')](_0x46b9e7,_0xd4c7d2);},'zcoYo':_0x50492a[_0x417b('‮31','(37E')],'SAtKF':function(_0x3f1cd0,_0x45fdd5){return _0x50492a[_0x417b('‫32','mRuY')](_0x3f1cd0,_0x45fdd5);},'msEQg':_0x50492a[_0x417b('‫33','[rFt')],'npNKj':function(_0x23f883,_0x3351f1){return _0x50492a[_0x417b('‮34','9ZUZ')](_0x23f883,_0x3351f1);},'DHFIW':_0x50492a[_0x417b('‫35','BeXQ')],'zzzZN':_0x50492a[_0x417b('‮36','lZnp')],'JOURD':function(_0x33bb8c,_0x2efb41){return _0x50492a[_0x417b('‫37','Sn4g')](_0x33bb8c,_0x2efb41);},'kdOKL':_0x50492a[_0x417b('‮38','6x[R')],'pqhDh':_0x50492a[_0x417b('‮39','&Qbt')],'oSxFh':_0x50492a[_0x417b('‫3a','cWVj')],'KjqVw':function(_0x90117c,_0x5899cc){return _0x50492a[_0x417b('‮3b','MS)H')](_0x90117c,_0x5899cc);},'UDliz':function(_0x4ad62f,_0x4c8565){return _0x50492a[_0x417b('‫3c','MS)H')](_0x4ad62f,_0x4c8565);},'aFkCm':_0x50492a[_0x417b('‫3d','cWVj')],'rTPMO':function(_0xaad3ee,_0x117805){return _0x50492a[_0x417b('‮3e','lw1J')](_0xaad3ee,_0x117805);},'JgxRU':_0x50492a[_0x417b('‫3f','6rby')],'jAlyd':function(_0x32358f,_0x2bc2e5){return _0x50492a[_0x417b('‫40','cWVj')](_0x32358f,_0x2bc2e5);},'FVAtF':_0x50492a[_0x417b('‫41','X7NA')],'LPejW':_0x50492a[_0x417b('‫42','AiO0')]};if(_0x50492a[_0x417b('‫43','op$V')](_0x50492a[_0x417b('‫44','KjVy')],_0x50492a[_0x417b('‮45','(D4z')])){if(_0x50492a[_0x417b('‫43','op$V')](shareUuidArr[_0x417b('‮46','g)4p')]($[_0x417b('‫47','nSIR')]),![])&&_0x50492a[_0x417b('‮48','mRuY')](shareUuidArr[_0x417b('‫49','(37E')],0xa)){if(_0x50492a[_0x417b('‮4a','(37E')](_0x50492a[_0x417b('‮4b','UzF!')],_0x50492a[_0x417b('‫4c','X7NA')])){_0x50492a[_0x417b('‫4d','vhCK')](_0x56a100);return;}else{$[_0x417b('‫4e','[rFt')][_0x417b('‮4f','Sn4g')](i[_0x417b('‮50','Kvk8')]);if(_0x50492a[_0x417b('‮51','nSIR')](i[_0x417b('‮52','AiO0')],![])){$[_0x417b('‫53','wW(F')][_0x417b('‫54','N^v2')](i[_0x417b('‫55','p8JO')]);}}}if(_0x50492a[_0x417b('‮56','&(DI')](_0x2517a7,_0x50492a[_0x417b('‮57','[3w!')])){if(_0x50492a[_0x417b('‫32','mRuY')](_0x50492a[_0x417b('‫58','N^v2')],_0x50492a[_0x417b('‮59','Ab^h')])){_0xbd8d13[_0x417b('‫5a','J#xl')](_0x56a100);return;}else{$[_0x417b('‫5b','BeXQ')]=[];$[_0x417b('‮5c','ERWq')]=[];$[_0x417b('‮5d','Mw[)')]=[];}}if(_0x50492a[_0x417b('‫5e','Aw6&')](shareUuidArr[_0x417b('‫5f','lZnp')]($[_0x417b('‫60','WQF6')]),![])&&_0x50492a[_0x417b('‫61','6DOR')](shareUuidArr[_0x417b('‮62','WQF6')],0xa)){if(_0x50492a[_0x417b('‫63','*crm')](_0x50492a[_0x417b('‫64','NnX3')],_0x50492a[_0x417b('‮65','9ZUZ')])){_0x50492a[_0x417b('‫66','LrRn')](_0x56a100);return;}else{_0x50492a[_0x417b('‮67','&(DI')](_0x56a100);return;}}let _0x3306b3=_0x50492a[_0x417b('‫68','MS)H')];let _0x220f2c='';if(_0x50492a[_0x417b('‮69','dPEI')](_0x2517a7,_0x50492a[_0x417b('‮6a','NPf(')])||_0x50492a[_0x417b('‫6b','Ab^h')](_0x2517a7,_0x50492a[_0x417b('‮6c','dPEI')]))_0x3306b3=_0x50492a[_0x417b('‫6d','$eYz')];if(_0x50492a[_0x417b('‫6e','(37E')](_0x3306b3,_0x50492a[_0x417b('‫6f','[3w!')]))_0x220f2c=_0x417b('‫70','nSIR')+$[_0x417b('‫71','6DOR')];if(_0x50492a[_0x417b('‮72','(37E')](shareUuidArr[_0x417b('‫73','WQF6')]($[_0x417b('‫74','[rFt')]),![])&&_0x50492a[_0x417b('‫75','c48o')](shareUuidArr[_0x417b('‫76','wW(F')],0xa)){_0x50492a[_0x417b('‮77','y6X%')](_0x56a100);return;}let _0x3d1a64={'url':_0x417b('‫78','9ZUZ')+_0x2517a7+_0x220f2c,'headers':{'Cookie':cookie,'User-Agent':_0x50492a[_0x417b('‮79','@0w$')]},'timeout':0x7530,'method':_0x3306b3};if(_0x50492a[_0x417b('‮7a','&Qbt')](shareUuidArr[_0x417b('‫7b','ERWq')]($[_0x417b('‫7c','[3w!')]),![])&&_0x50492a[_0x417b('‫7d','DSxY')](shareUuidArr[_0x417b('‫7e','&(DI')],0xa)){_0x50492a[_0x417b('‮7f','[rFt')](_0x56a100);return;}if(_0x50492a[_0x417b('‫80','vhCK')](_0x3306b3,_0x50492a[_0x417b('‫81','(D4z')])){let _0x3f8448='';if(_0x50492a[_0x417b('‮82','Kvk8')](_0x2517a7,_0x50492a[_0x417b('‮83','nSIR')])){if(_0x50492a[_0x417b('‮84','@0w$')](_0x50492a[_0x417b('‮85','MS)H')],_0x50492a[_0x417b('‫86','(D4z')])){_0x3f8448={'phone':null,'smsCode':null,'brandsIds':$[_0x417b('‮87','Aw6&')],'bindChannel':![],'activityId':'','token':$[_0x417b('‮88','XLP6')]};}else{console[_0x417b('‫89','p8JO')](data);}}else if(_0x50492a[_0x417b('‫8a','6DOR')](_0x2517a7,_0x50492a[_0x417b('‮8b','&(DI')])){if(_0x50492a[_0x417b('‮8c','@0w$')](_0x50492a[_0x417b('‫8d','Kvk8')],_0x50492a[_0x417b('‮8e','[rFt')])){_0x3f8448={'activityId':null,'token':$[_0x417b('‫8f','@0w$')],'prizeIds':$[_0x417b('‮90','*crm')],'venderIds':$[_0x417b('‮91','lZnp')]};}else{_0x50492a[_0x417b('‮92','lZnp')](_0x56a100);return;}}if(_0x50492a[_0x417b('‮93','[3w!')](shareUuidArr[_0x417b('‫94','cWVj')]($[_0x417b('‮95','g)4p')]),![])&&_0x50492a[_0x417b('‫96','ng1b')](shareUuidArr[_0x417b('‫97','6x[R')],0xa)){if(_0x50492a[_0x417b('‫98','6DOR')](_0x50492a[_0x417b('‫99','(D4z')],_0x50492a[_0x417b('‮9a','6x[R')])){_0x3f8448={'activityId':null,'token':$[_0x417b('‮9b','[rFt')],'prizeIds':$[_0x417b('‮9c','Ab^h')],'venderIds':$[_0x417b('‮9d','vhCK')]};}else{_0x50492a[_0x417b('‮9e','Aw6&')](_0x56a100);return;}}_0x3d1a64[_0x50492a[_0x417b('‮9f','mRuY')]]=$[_0x417b('‮a0','wW(F')](_0x3f8448,_0x3f8448);_0x3d1a64[_0x50492a[_0x417b('‫a1','dPEI')]][_0x50492a[_0x417b('‮a2','NnX3')]]=_0x50492a[_0x417b('‮a3','6DOR')];_0x3d1a64[_0x50492a[_0x417b('‮a4','UzF!')]][_0x50492a[_0x417b('‫a5','cWVj')]]=_0x50492a[_0x417b('‮a6','LrRn')];}$[_0x417b('‮a7','J#xl')](_0x3d1a64,async(_0x435ed8,_0x533c4b,_0x57e15b)=>{var _0x31b6a3={'tkVsc':function(_0x13111a){return _0xbd8d13[_0x417b('‮a8','y6X%')](_0x13111a);},'etHZp':function(_0x15429d){return _0xbd8d13[_0x417b('‫a9','Mw[)')](_0x15429d);}};if(_0xbd8d13[_0x417b('‮aa','ERWq')](_0xbd8d13[_0x417b('‫ab','y6X%')],_0xbd8d13[_0x417b('‫ac','6DOR')])){_0xbd8d13[_0x417b('‮ad','KjVy')](_0x56a100);return;}else{try{if(_0x435ed8){console[_0x417b('‫ae','AiO0')](''+$[_0x417b('‮af','lZnp')](_0x435ed8));console[_0x417b('‫b0','ng1b')]($[_0x417b('‫b1','KjVy')]+'\x20'+_0x2517a7+_0x417b('‮b2','UzF!'));}else{if(_0xbd8d13[_0x417b('‫b3','lw1J')](shareUuidArr[_0x417b('‮b4','(D4z')]($[_0x417b('‫b5','6x[R')]),![])&&_0xbd8d13[_0x417b('‮b6','N^v2')](shareUuidArr[_0x417b('‫b7','UzF!')],0xa)){if(_0xbd8d13[_0x417b('‮b8','KjVy')](_0xbd8d13[_0x417b('‫b9','N^v2')],_0xbd8d13[_0x417b('‮ba','y6X%')])){_0xbd8d13[_0x417b('‫bb','l[HO')](_0x56a100);return;}else{console[_0x417b('‫bc','cWVj')](''+$[_0x417b('‮bd','ng1b')](_0x435ed8));console[_0x417b('‫be','MS)H')]($[_0x417b('‫bf','vhCK')]+'\x20'+_0x2517a7+_0x417b('‫c0','9ZUZ'));}}let _0x34a3ae=$[_0x417b('‮c1','&(DI')](_0x57e15b,_0x57e15b);if(_0xbd8d13[_0x417b('‮c2','KjVy')](typeof _0x34a3ae,_0xbd8d13[_0x417b('‮c3','dPEI')])){if(_0x34a3ae[_0x417b('‫c4','S2Ad')]){if(_0xbd8d13[_0x417b('‮c5','NPf(')](shareUuidArr[_0x417b('‫c6','6x[R')]($[_0x417b('‮c7','S2Ad')]),![])&&_0xbd8d13[_0x417b('‫c8','lZnp')](shareUuidArr[_0x417b('‫c9','MS)H')],0xa)){_0xbd8d13[_0x417b('‮ca','AiO0')](_0x56a100);return;}if(_0xbd8d13[_0x417b('‫cb','dPEI')](_0x2517a7,_0xbd8d13[_0x417b('‫cc','BeXQ')])){if(_0xbd8d13[_0x417b('‮cd','Aw6&')](_0xbd8d13[_0x417b('‮ce','J#xl')],_0xbd8d13[_0x417b('‮cf','Ab^h')])){_0x31b6a3[_0x417b('‫d0','(37E')](_0x56a100);}else{for(let _0x2ad723 of _0x34a3ae[_0x417b('‫d1','[3w!')]){if(_0xbd8d13[_0x417b('‮d2','6x[R')](_0xbd8d13[_0x417b('‮d3','6rby')],_0xbd8d13[_0x417b('‫d4','[rFt')])){for(let _0x49a91d of _0x34a3ae[_0x417b('‮d5','lw1J')]){$[_0x417b('‫d6','cWVj')][_0x417b('‫d7','y6X%')](_0x49a91d['id']);}}else{$[_0x417b('‫d8','Sn4g')][_0x417b('‮d9','9ZUZ')](_0x2ad723[_0x417b('‮da','NPf(')]);if(_0xbd8d13[_0x417b('‫db','9ZUZ')](_0x2ad723[_0x417b('‮dc','op$V')],![])){$[_0x417b('‫dd','X7NA')][_0x417b('‮de','ng1b')](_0x2ad723[_0x417b('‮df','X7NA')]);}}}}}else if(_0xbd8d13[_0x417b('‫e0','X7NA')](_0x2517a7,_0xbd8d13[_0x417b('‫e1','WQF6')])){for(let _0x118266 of _0x34a3ae[_0x417b('‫e2','UzF!')]){if(_0xbd8d13[_0x417b('‮e3','ERWq')](_0xbd8d13[_0x417b('‫e4','LrRn')],_0xbd8d13[_0x417b('‮e5','Aw6&')])){console[_0x417b('‫e6','[3w!')](_0x2517a7+'\x20'+(_0x34a3ae[_0x417b('‫e7','NnX3')]||''));}else{$[_0x417b('‫e8','mRuY')][_0x417b('‫e9','UzF!')](_0x118266['id']);}}}}else if(_0xbd8d13[_0x417b('‮ea','ERWq')](typeof _0x34a3ae,_0xbd8d13[_0x417b('‫eb','lw1J')])&&_0x34a3ae[_0x417b('‫ec','N^v2')]){console[_0x417b('‫ed','c48o')](_0x2517a7+'\x20'+(_0x34a3ae[_0x417b('‫ee','LrRn')]||''));}else{if(_0xbd8d13[_0x417b('‫ef','Sn4g')](_0xbd8d13[_0x417b('‮f0','y6X%')],_0xbd8d13[_0x417b('‫f1','(37E')])){_0x31b6a3[_0x417b('‫f2','g)4p')](_0x56a100);return;}else{console[_0x417b('‫f3','(37E')](_0x57e15b);}}}else{if(_0xbd8d13[_0x417b('‫f4','6x[R')](_0xbd8d13[_0x417b('‫f5','vhCK')],_0xbd8d13[_0x417b('‮f6','lw1J')])){body={'phone':null,'smsCode':null,'brandsIds':$[_0x417b('‫f7','NnX3')],'bindChannel':![],'activityId':'','token':$[_0x417b('‮f8','mRuY')]};}else{console[_0x417b('‮f9','g)4p')](_0x57e15b);}}}}catch(_0x331a54){$[_0x417b('‫fa','Aw6&')](_0x331a54,_0x533c4b);}finally{if(_0xbd8d13[_0x417b('‮fb','KjVy')](_0xbd8d13[_0x417b('‫fc','J#xl')],_0xbd8d13[_0x417b('‮fd','Sn4g')])){$[_0x417b('‫fe','AiO0')](e,_0x533c4b);}else{_0xbd8d13[_0x417b('‫ff','op$V')](_0x56a100);}}}});}else{_0x50492a[_0x417b('‮100','$eYz')](_0x56a100);return;}});};_0xodt='jsjiami.com.v6';

function getCk() {
  return new Promise(resolve => {
    let get = {
      url:`https://lzdz1-isv.isvjcloud.com/dingzhi/mar2022/miFenJie/activity/563603?activityId=${$.activityId}&shareUuid=${$.shareUuid}`,
      followRedirect:false,
      headers: {
        "User-Agent": $.UA,
      },
      timeout:30000
    }
    $.get(get, async(err, resp, data) => {
      try {
        if (err) {
          if(resp && typeof resp.statusCode != 'undefined'){
            if(resp.statusCode == 493){
              console.log('此ip已被限制，请过10分钟后再执行脚本\n')
              $.outFlag = true
            }
          }
          console.log(`${$.toStr(err)}`)
          console.log(`${$.name} cookie API请求失败，请检查网路重试`)
        } else {
          let end = data.match(/(活动已经结束)/) && data.match(/(活动已经结束)/)[1] || ''
          if(end){
            $.activityEnd = true
            console.log('活动已结束')
          }
          setActivityCookie(resp)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function setActivityCookie(resp){
  let LZ_TOKEN_KEY = ''
  let LZ_TOKEN_VALUE = ''
  let lz_jdpin_token = ''
  let setcookies = resp && resp['headers'] && (resp['headers']['set-cookie'] || resp['headers']['Set-Cookie'] || '') || ''
  let setcookie = ''
  if(setcookies){
    if(typeof setcookies != 'object'){
      setcookie = setcookies.split(',')
    }else setcookie = setcookies
    for (let ck of setcookie) {
      let name = ck.split(";")[0].trim()
      if(name.split("=")[1]){
        // console.log(name.replace(/ /g,''))
        if(name.indexOf('LZ_TOKEN_KEY=')>-1) LZ_TOKEN_KEY = name.replace(/ /g,'')+';'
        if(name.indexOf('LZ_TOKEN_VALUE=')>-1) LZ_TOKEN_VALUE = name.replace(/ /g,'')+';'
        if(name.indexOf('lz_jdpin_token=')>-1) lz_jdpin_token = ''+name.replace(/ /g,'')+';'
      }
    }
  }
  if(LZ_TOKEN_KEY && LZ_TOKEN_VALUE) activityCookie = `${LZ_TOKEN_KEY} ${LZ_TOKEN_VALUE}`
  if(lz_jdpin_token) lz_jdpin_token_cookie = lz_jdpin_token
}

async function getUA(){
  $.UA = `jdapp;iPhone;10.1.4;13.1.2;${randomString(40)};network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`
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

