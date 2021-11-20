//48 9,18 * * * m_jd_sign.js
// noinspection JSUnresolvedFunction
const {Env} = require('./magic');
const $ = new Env('M京东签到')
$.logic = async function () {
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
    $.putMsg(`${title} 获得 ${bean}京豆`)
}
$.run({wait: [1000, 2000], random: true})
.catch(reason => console.log(reason))

