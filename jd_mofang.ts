/**
 * const $ = new Env('京东新品-集魔方兑换-接口版');
 * cron: 10 8 * * *
 * 默认魔方满3/6自动兑换
 */

import {requireConfig, wait, post, get} from './function/TS_USER_AGENTS'
import {existsSync} from "fs";
import * as dotenv from 'dotenv'

let cookie: string = '', res: any = '', UserName: string, index: number, log: string = ''
let mf_logs: any, logApi: boolean = true // 若有log接口请改为true并修改line174接口地址

!(async () => {
  dotenv.config()
  if (existsSync('./utils/mf_log.ts')) {
    mf_logs = require('./utils/mf_log').mf_logs
  } else {
    console.log('./utils/mf_log not found')
  }
  let cookiesArr: any = await requireConfig()
  for (let i = 0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i]
    UserName = decodeURIComponent(cookie.match(/pt_pin=([^;]*)/)![1])
    index = i + 1
    console.log(`\n开始【京东账号${index}】${UserName}\n`)
    if (logApi === true) {
      console.log("开启偷撸模式")
    }
    res = await api("functionId=getInteractionHomeInfo&body=%7B%22sign%22%3A%22u6vtLQ7ztxgykLEr%22%7D&appid=content_ecology&client=wh5&clientVersion=1.0.0")
    let sign: string = res.result.taskConfig.projectId, reward: string = res.result.taskConfig.projectPoolId, rewardSign: string = res.result.giftConfig.projectId

    res = await api(`functionId=queryInteractiveInfo&body=%7B%22encryptProjectId%22%3A%22${sign}%22%2C%22sourceCode%22%3A%22acexinpin0823%22%2C%22ext%22%3A%7B%7D%7D&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
    for (let t of res.assignmentList) {
      if (t.completionCnt < t.assignmentTimesLimit) {
        if (t.ext) {
          if (t.assignmentName === '每日签到') {
            if (t.ext.sign1.status === 1) {
              let signDay: number = t.ext.sign1.signList?.length || 0,
                type: number = t.rewards[signDay].rewardType
              console.log(signDay, type)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({
                "encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": "1", "actionType": "", "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}
              })}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log('签到成功')
            } else {
              console.log('已签到')
            }
          }

          for (let proInfo of t.ext.productsInfo ?? []) {
            if (proInfo.status === 1) {
              console.log(t.assignmentName)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${encodeURIComponent(JSON.stringify({"encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": 0, "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
              if (res.msg === '任务已完成') {
                break
              }
            }
          }

          for (let proInfo of t.ext.shoppingActivity ?? []) {
            if (proInfo.status === 1) {
              console.log(t.assignmentName)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${encodeURIComponent(JSON.stringify({"encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": 1, "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
              await wait(t.ext.waitDuration * 1000)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${encodeURIComponent(JSON.stringify({"encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": 0, "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
            }
          }

          for (let proInfo of t.ext.browseShop ?? []) {
            if (proInfo.status === 1) {
              console.log(t.assignmentName)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({
                "encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": 1, "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}
              })}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
              await wait(t.ext.waitDuration * 1000)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({
                "encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": 0, "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFhPageh5"}
              })}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
            }
          }

          for (let proInfo of t.ext.addCart ?? []) {
            if (proInfo.status === 1) {
              console.log(t.assignmentName)
              log = await getLog()
              res = await api(`functionId=doInteractiveAssignment&body=${encodeURIComponent(JSON.stringify({"encryptProjectId": sign, "encryptAssignmentId": t.encryptAssignmentId, "sourceCode": "acexinpin0823", "itemId": proInfo.itemId, "actionType": "0", "completionFlag": "", "ext": {}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFJGh5"}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
              console.log(res.msg)
              if (res.msg === '任务已完成') {
                break
              }
            }
          }
        } else if (t.assignmentName === '去新品频道逛逛') {
        }
      }
    }

    res = await api(`functionId=queryInteractiveRewardInfo&body=${encodeURIComponent(JSON.stringify({"encryptProjectPoolId":reward,"sourceCode":"acexinpin0823","ext":{"needPoolRewards":1,"needExchangeRestScore":1}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
    let sum: number = res.exchangeRestScoreMap["368"]
    console.log('当前碎片', sum+'片')
    if (sum >= 6) {
        for (let k = 1; k <= Math.floor(sum / 6); k++) {
            console.log(`开始第${k}次收集魔方`)
            log = await getLog()
            res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({"encryptProjectId": rewardSign, "encryptAssignmentId": "wE62TwscdA52Z4WkpTJq7NaMvfw", "sourceCode": "acexinpin0823", "itemId": "", "actionType": "", "completionFlag": "", "ext": {"exchangeNum": 1}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFDHh5"}})}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
            if (res.subCode === '0') {
            console.log('收集成功')
            } else {
            console.log('收集失败', res.msg)
            }
            await wait(3000)
        }
    }

    res = await api(`functionId=queryInteractiveRewardInfo&body=${encodeURIComponent(JSON.stringify({"encryptProjectId": rewardSign, "sourceCode": "acexinpin0823", "ext": {"needExchangeRestScore": "1"}}))}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
    let score: number = res.exchangeRestScoreMap["367"]
    console.log('当前魔方', score+'个')
    if (score >= 6) {
      log = await getLog()
      res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({"encryptProjectId": rewardSign, "encryptAssignmentId": "42pP1FaQ4FTMurVsJpZhiFJXCZox", "sourceCode": "acexinpin0823", "itemId": "", "actionType": "", "completionFlag": "", "ext": {"exchangeNum": 1}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFDHh5"}})}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
      if (res.subCode === '0') {
        console.log('兑换6魔方成功:', res.rewardsInfo.successRewards['3'][0].rewardName)
        score -= 6
      } else {
        console.log('兑换6魔方失败:', res.msg)
      }
    }
    if (score >= 3) {
      log = await getLog()
      res = await api(`functionId=doInteractiveAssignment&body=${JSON.stringify({"encryptProjectId": rewardSign, "encryptAssignmentId": "khdCzL9YRdYjh3dWFXfZLteUTYu", "sourceCode": "acexinpin0823", "itemId": "", "actionType": "", "completionFlag": "", "ext": {"exchangeNum": 1}, "extParam": {"businessData": {"random": log.match(/"random":"(\d+)"/)[1]}, "signStr": log.match(/"log":"(.*)"/)[1], "sceneid": "XMFDHh5"}})}&client=wh5&clientVersion=1.0.0&appid=content_ecology`)
      if (res.subCode === '0') {
        console.log('兑换3魔方成功:', res.rewardsInfo.successRewards['3'][0].rewardName)
        score -= 3
        console.log('剩余魔方', score+'个')
      } else {
        console.log('兑换3魔方失败:', res.msg)
        console.log('剩余魔方', score+'个')
      }
    } else {
        console.log(`当前只有${score}个魔方,不够兑换`)
    }
  }
})()

async function api(params: string) {
  await wait(1000)
  return await post("https://api.m.jd.com/client.action", params, {
    'Content-Type': 'application/x-www-form-urlencoded',
    "User-Agent": "Mozilla/5.0 (Linux; U; Android 8.0.0; zh-cn; Mi Note 2 Build/OPR1.170623.032) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.1.1",
    'Referer': 'https://h5.m.jd.com/babelDiy/Zeus/2bf3XEEyWG11pQzPGkKpKX2GxJz2/index.html',
    'Origin': 'https://h5.m.jd.com',
    'Host': 'api.m.jd.com',
    'Cookie': cookie
  })
}

async function getLog() {
  if (logApi === true) {
    let data = await get("http://106.126.11.114:5889/log") //若有,请把log接口填写在此处
    return `'"random":"${data.random}","log":"${data.log}"'`
  } else if (mf_logs) {
    return mf_logs[Math.floor(Math.random() * mf_logs.length)]
  } else {
    console.log('No log')
    process.exit(0)
  }
}