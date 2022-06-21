/*
汽车签到
cron 43 7,21 * * * jd_car.js
const $ = new Env('汽车签到');
*/
const name = '汽车签到'
let UA
const got = require('got')
const notify = require('./sendNotify')
const jdCookieNode = require('./jdCookie.js')

function oc(fn, defaultVal) { //optioanl chaining
    try {
        return fn()
    } catch (e) {
        return undefined
    }
}

let cookiesArr = [],
    cookie
Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
});
!(async () => {
    if (!cookiesArr[0]) {
        console.error('No CK found')
        return
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i]
            const UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            console.log(`\n******开始【京东账号${i + 1}】${UserName}*********\n`);
            UA = process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)
            await main()
        }
        if (i != cookiesArr.length - 1) {
            await wait(3000)
        }
    }

})()
.catch((e) => {
        console.error(`${name} 错误 :${e.stack}`)
    })
    .finally(() => {
        console.log(`${name} finish`)
    })

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

async function main() {
    await signBeanIndex()
    await wait(3000)
    await cgame()
}

async function signBeanIndex() {
    const options = {
        url: `https://api.m.jd.com/client.action`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Host': `api.m.jd.com`,
            'Origin': 'https://api.m.jd.com',
            'Referer': `https://api.m.jd.com`,
            'Cookie': cookie
        },
        body: "functionId=signBeanIndex&appid=ld"
    }
    const { body } = await got.post(options)
    const data = JSON.parse(body)

    let title = oc(() => data.data.dailyAward.title) || oc(() => data.data.continuityAward.title)
    let bean = oc(() => data.data.dailyAward.beanAward.beanCount) || oc(() => data.data.continuityAward.beanAward.beanCount)
    if (bean) {
        console.log(`${title} 获得${bean}京豆`)
    }
}

async function cgame() {
    const options = {
        url: `https://cgame-stadium.jd.com/api/v1/sign`,
        headers: {
            'Connection': 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Origin': 'https://pro.m.jd.com',
            'ActivityId': '7c51826be9f241c1ad9733df34d242c5',
            'Host': 'cgame-stadium.jd.com',
            'Referer': 'https://pro.m.jd.com/mall/active/dj6us2JJRLMMBb4iDaSK4wxvBMt/index.html',
            'Accept-Language': 'zh-cn',
            'Accept': 'application/json',
            'Cookie': cookie
        }
    }
    const { body } = await got.post(options)
    const data = JSON.parse(body)

    let bean = oc(() => data.data.beanNum)
    if (bean > 0) {
        console.log(`汽车签到 获得${bean}京豆`)
    }
}
