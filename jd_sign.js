//48 9,22 * * * m_jd_sign.js
const {Env} = require('./magic');
const $ = new Env('M京东签到')
$.logic = async function () {
    await signBeanIndex()
    await $.wait(3000, 5000)
    await cgame();
}
$.run({filename: __filename, wait: [1000, 2000], random: true})
.catch(reason => console.log(reason))

async function signBeanIndex() {
    let url = `https://api.m.jd.com/client.action`
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        'Host': `api.m.jd.com`,
        'Origin': 'https://api.m.jd.com',
        'Referer': `https://api.m.jd.com`,
        'Cookie': $.cookie
    }
    let body = "functionId=signBeanIndex&appid=ld"
    let data = await $.post(url, body, headers)
    let title = data.data?.dailyAward?.title
        || data.data?.continuityAward?.title;
    let bean = data.data?.dailyAward?.beanAward?.beanCount
        || data.data?.continuityAward?.beanAward?.beanCount;
    if (bean) {
        $.log(`${title} 获得${bean}京豆`)
    }
}

async function cgame() {
    let url = `https://cgame-stadium.jd.com/api/v1/sign`
    let headers = {
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Origin': 'https://pro.m.jd.com',
        'ActivityId': 'a54e9a0a1b6044189753e7eba51aab19',
        'Host': 'cgame-stadium.jd.com',
        'Referer': 'https://pro.m.jd.com/mall/active/dj6us2JJRLMMBb4iDaSK4wxvBMt/index.html',
        'Accept-Language': 'zh-cn',
        'Accept': 'application/json',
        'Cookie': $.cookie
    }
    let data = await $.post(url, {}, headers)
    let bean = data?.data?.beanNum || 0;
    if (bean > 0) {
        $.log(`汽车签到 获得${bean}京豆`)
    }
}

