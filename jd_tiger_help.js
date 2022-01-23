/*
萌虎摇摇乐
https://yearfestival.jd.com
优先内部互助,剩余次数助力作者和助力池
cron 0 0,18 * * * jd_tiger_help.js
转义自HW大佬
const $ = new Env('萌虎摇摇乐助力');
*/
const name = '萌虎摇摇乐助力'
let UA = process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)
const got = require('got')
const notify = require('./sendNotify')
const jdCookieNode = require('./jdCookie.js')
let shareCodesSelf = []
let cookiesArr = [],
    cookie
Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
})

!(async () => {
    if (!cookiesArr[0]) {
        console.error('No CK found')
        return
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i]
        const userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
        console.log(`\n开始【京东账号${i + 1}】${userName}\n`)
        try {
            let res = await api({ "apiMapping": "/api/task/support/getShareId" })
            console.log('助力码：', res.data)
            await wait(1000)
            shareCodesSelf.push(res.data)
            res = await api({ "apiMapping": "/api/task/support/list" })
            console.log('收到助力：', res.data.supportedNum)
            await wait(1000)

            res = await api({ "apiMapping": "/api/task/brand/tabs" })
            await wait(1000)
            for (let tab of res.data) {
                let taskGroupId = tab.taskGroupId
                // res = await api({ "taskGroupId": taskGroupId, "apiMapping": "/api/task/brand/getTaskList" })
                for (let t of res.data) {
                    for (let i = t.finishNum; i < t.totalNum; i++) {
                        res = await getTaskDetail(taskGroupId)
                        if (res) {
                            console.log(taskGroupId, res.taskId, res.taskItemId, res.taskType, res.taskItemName)
                            let sleep = res.browseTime ? res.browseTime * 1000 : 1000
                            res = await api({ "taskGroupId": taskGroupId, "taskId": res.taskId, "taskItemId": res.taskItemId, "apiMapping": "/api/task/brand/doTask" })
                            await wait(sleep)
                            if (res.data.taskType === 'BROWSE_TASK') {
                                res = await api({ "taskGroupId": taskGroupId, "taskId": res.data.taskId, "taskItemId": res.data.taskItemId, "timestamp": res.data.timeStamp, "apiMapping": "/api/task/brand/getReward" })
                                console.log('任务完成，积分：', res.data.integral, '，京豆：', res.data.jbean)
                                //await wait(1000)
                            } else if (res.data.taskType === 'FOLLOW_SHOP_TASK') {
                                // console.log('任务完成，获得：', res.data.rewardInfoVo?.integral, res.data.rewardInfoVo?.jbean)
                                console.log(res.data.rewardInfoVo)
                            }
                        }
                    }
                }
            }
        } catch (e) {
            console.log('黑号？', e)
        }
    }
    let authorCode = []
    let res = await getAuthorShareCode('')
    if (!res) {
        res = await getAuthorShareCode('')
    }
    if (res) {
        authorCode = res.sort(() => 0.5 - Math.random())
        const limit = 3
        if (authorCode.length > limit) {
            authorCode = authorCode.splice(0, limit)
        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i]
        const userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
        const pool = await getShareCodePool('tiger', 5)
        // if (shareCodesHW.length === 0) {
        //     shareCodesHW = await getshareCodeHW('tiger')
        // }
        // index === 0 ?
        //     shareCodes = Array.from(new Set([...shareCodesHW, ...shareCodesSelf, ...temp])) :
        //     shareCodes = Array.from(new Set([...shareCodesSelf, ...shareCodesHW, ...temp]))
        shareCodes = Array.from(new Set([...shareCodesSelf, ...authorCode, ...pool]))
        // console.log(shareCodes)
        for (let code of shareCodes) {
            console.log(`账号${i + 1} 去助力 ${code} ${shareCodesSelf.includes(code) ? '(内部)' : ''}`)
            try {
                const res = await api({ "shareId": code, "apiMapping": "/api/task/support/doSupport" })
                if (res.data.status === 1) {
                    !res.data.supporterPrize ?
                        console.log('不助力自己') :
                        console.log('助力成功，京豆：', res.data.supporterPrize.beans, '，积分：', res.data.supporterPrize.score)
                } else if (res.data.status === 7) {
                    console.log('上限')
                    break
                } else if (res.data.status === 3) {
                    console.log('已助力过')
                } else {
                    console.log('其他情况', res.data.status)
                }
                await wait(1000)
            } catch (e) {
                console.log('黑号？', e)
            }

        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        cookie = cookiesArr[i]
        const userName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
        console.log(`\n开始【京东账号${i + 1}】${userName}\n`)
        try {
            let res = await api({ "apiMapping": "/api/index/indexInfo" })
            let lotteryNum = res.data.lotteryNum
            for (let i = 0; i < lotteryNum; i++) {
                res = await api({ "apiMapping": "/api/lottery/lottery" })
                console.log('抽奖：', res.data.prizeName)
                await wait(4000)
            }
        } catch (e) {
            console.log('黑号？', e)
        }
    }
})()
    .catch((e) => {
        console.error(`${name} error: ${e.stack}`)
    })
    .finally(() => {
        console.log(`${name} finished`)
    })

async function getAuthorShareCode(url) {
    try {
        const options = {
            url,
            "timeout": 10000,
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        const { body } = await got(options)
        // console.debug('getAuthorShareCode:',body)
        return JSON.parse(body) || []
    } catch (e) {
        // console.warn('getAuthorShareCode:', e)
        return false
    }

}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

async function api(r_body) {
    const options = {
        url: 'https://api.m.jd.com/api',
        headers: {
            'Host': 'api.m.jd.com',
            'Origin': 'https://yearfestival.jd.com',
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': UA,
            'Referer': 'https://yearfestival.jd.com/',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Cookie': cookie
        },
        form: {
            appid: 'china-joy',
            functionId: 'collect_bliss_cards_prod',
            body: JSON.stringify(r_body),
            t: Date.now(),
            loginType: 2
        }
        // body: `appid=china-joy&functionId=collect_bliss_cards_prod&body=${JSON.stringify(r_body)}&t=${Date.now()}&loginType=2`
    }
    const { body } = await got.post(options)
    // console.debug(options)
    // console.log(body)
    return JSON.parse(body)
}

async function getShareCodePool(key, num) {
    let shareCode = []
    for (let i = 0; i < 2; i++) {
        try {
            const { body } = await got(``)
            //console.debug('getShareCodePool:', body)
            shareCode = JSON.parse(body).data || []
            console.log(`随机获取${num}个${key}成功：${JSON.stringify(shareCode)}`)
            if (shareCode.length !== 0) {
                break
            }
        } catch (e) {
            // console.warn(e.stack)
            //console.log("getShareCodePool Error, Retry...")
            // await wait(2000 + Math.floor((Math.random() * 4000)))
        }
    }
    return shareCode
}


async function getTaskDetail(taskGroupId) {
    let res = await api({ "taskGroupId": taskGroupId, "apiMapping": "/api/task/brand/getTaskList" })
    await wait(1000)
    for (let t of res.data) {
        if (t.finishNum !== t.totalNum) {
            return t
        }
    }
    return ''
}