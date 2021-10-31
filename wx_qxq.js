/*
软件名称:趣星球
更新时间：2021-10-9 @YaphetS0903
邀请码  8T8HT5968
每天随机金额自动提现
一天220-300星钻左右（100星钻1毛），加入自动夺宝5次(50人自动开奖)，五十分之一概率中奖，运气好1000多星钻，中了一次
测试了四天自动提现金额是一天3毛6，一天3毛5，一天3毛2，一天3毛3提现全部秒到

获取数据： 进入软件，点击赚钱，下拉刷新获取数据


趣星球
青龙环境配置(@隔开)export qxqhd='抓取的header1@抓取的header2'

[task_local]
#趣星球
0 8-18/2 * * * https://raw.githubusercontent.com/KingRan/JD-Scripts/main/wx_qxq.js, tag=趣星球, enabled=true
[rewrite_local]
#趣星球
https://api.xqustar.com/api/task/v2/list url script-request-header https://raw.githubusercontent.com/KingRan/JD-Scripts/main/wx_qxq.js
[MITM]
hostname = api.xqustar.com
*/
const $ = new Env('趣星球');
let status;

status = (status = ($.getval("qxqstatus") || "1")) > 1 ? `${status}` : "";
let qxqurlArr = [], qxqhdArr = [], qxqcount = ''
let qxqurl = $.getdata('qxqurl')
let qxqhd= $.isNode() ? (process.env.qxqhd ? process.env.qxqhd : "") : ($.getdata('qxqhd') ? $.getdata('qxqhd') : "")

let b = Math.round(new Date().getTime() / 1000).toString();
let DD = RT(1000, 1500)
let tz = ($.getval('tz') || '1');
let tx = ($.getval('tx') || '1');
let id = '', txid = '', ppid = '', amt = '', idd = '', pid1 = ''
let target = ''
$.message = ''
let qxqhds = ""




!(async () => {
    if (typeof $request !== "undefined") {
        await qxqck()
    } else {
        if(!$.isNode()){
        qxqurlArr.push($.getdata('qxqurl'))
        qxqhdArr.push($.getdata('qxqhd'))

        let qxqcount = ($.getval('qxqcount') || '1');
        for (let i = 2; i <= qxqcount; i++) {
            qxqurlArr.push($.getdata(`qxqurl${i}`))
            qxqhdArr.push($.getdata(`qxqhd${i}`))

        }
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);
        for (let i = 0; i < qxqhdArr.length; i++) {
            if (qxqhdArr[i]) {

                qxqurl = qxqurlArr[i];
                qxqhd = qxqhdArr[i];


                $.index = i + 1;
                console.log(`\n\n开始【趣星球${$.index}】`)

                await qxqsign()//签到
                await $.wait(3000)

                await qxqzpinfo()//转盘
                await $.wait(5000)
                await qxqhaggleinfo()//砍价
                await $.wait(3000)
                for (let p = 0; p < 2; p++) {
                    $.index = p+ 1
                    console.log(`\n【开始第${p + 1}个看创意视频任务!】\n等待2秒开始看创意视频任务`)
                    await qxqvideo()
                    await $.wait(20000)
                }


                await qxqshare()//分享
                await $.wait(3000)
                await qxqlottoinfo()//抽奖
                await $.wait(3000)
                await qxqtxpage()//提现
               //message()
            }
        }
       }else {
        if (process.env.qxqhd && process.env.qxqhd.indexOf('@') > -1) {
            qxqhdArr = process.env.qxqhd.split('@');
          console.log(`您选择的是用"@"隔开\n`)
      } else {
        qxqhds = [process.env.qxqhd]
      };
      Object.keys(qxqhds).forEach((item) => {
      if (qxqhds[item]) {
        qxqhdArr.push(qxqhds[item])
      }
  })
        console.log(`共${qxqhdArr.length}个cookie`)
          for (let k = 0; k < qxqhdArr.length; k++) {
              $.message = ""
              qxqhd = qxqhdArr[k]
              $.index = k + 1;
        console.log(`\n开始【趣星球${$.index}】`)
        await qxqsign()//签到
        await $.wait(3000)

        await qxqzpinfo()//转盘
        await $.wait(5000)
        await qxqhaggleinfo()//砍价
        await $.wait(3000)
        for (let p = 0; p < 2; p++) {
            $.index = p+ 1
            console.log(`\n【开始第${p + 1}个看创意视频任务!】\n等待2秒开始看创意视频任务`)
            await qxqvideo()
            await $.wait(30000)
        }


        await qxqshare()//分享
        await $.wait(3000)
        await qxqlottoinfo()//抽奖
        await $.wait(3000)
        await qxqtxpage()//提现
        //message()
    }
}

    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())




function qxqck() {
    if ($request.url.indexOf("task/v2/list") > -1) {
        const qxqurl = $request.url
        if (qxqurl) $.setdata(qxqurl, `qxqurl${status}`)
        $.log(qxqurl)

        const qxqhd = JSON.stringify($request.headers)
        if (qxqhd) $.setdata(qxqhd, `qxqhd${status}`)
        $.log(qxqhd)



        $.msg($.name, "", `趣星球${status}获取数据成功`)

    }
}


//签到
function qxqsign(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/signin`,
            headers: JSON.parse(qxqhd),
            body: `{
                "sm": {
                  "shuMeiDeviceId": "",
                  "appVersion": "",
                  "os": "",
                  "guestId": ""
                }
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【签到】：${result.message}\n`)
                    await $.wait(2000)
                    await qxqsigndb()


                } else {

                    console.log(`【签到失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}




//签到翻倍
function qxqsigndb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/signinDouble`,
            headers: JSON.parse(qxqhd),
            body: `{
                "sm": {
                  "shuMeiDeviceId": "",
                  "appVersion": "",
                  "os": "",
                  "guestId": ""
                }
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【签到翻倍】：${result.message}\n`)


                } else {

                    console.log(`【签到翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//看创意视频
function qxqvideo(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/v2/watchVideo`,
            headers: JSON.parse(qxqhd),
            body: `{
  "sm": {
    "shuMeiDeviceId": "",
    "appVersion": "",
    "os": "",
    "guestId": ""
  },
  "taskcode": "watchappads"
}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【看创意视频】：${result.message}\n`)
                    await $.wait(2000)
                    await qxqvideodb()

                } else {

                    console.log(`【看创意视频失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//看创意视频领取双倍奖励
function qxqvideodb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/v2/receiveDiamond`,
            headers: JSON.parse(qxqhd),
            body: `{
                "taskcode": "watchappads",
                "double": true
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【看创意视频翻倍】：${result.message}\n`)


                } else {

                    console.log(`【看创意视频翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//分享任务
function qxqshare(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/share`,
            headers: JSON.parse(qxqhd),
            body: `{
                "sm": {
                  "shuMeiDeviceId": "",
                  "appVersion": "",
                  "os": "",
                  "guestId": ""
                }
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【分享任务】：${result.message}\n`)
                    await $.wait(2000)
                    await qxqsharedb()


                } else {

                    console.log(`【分享任务失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//分享任务双倍奖励
function qxqsharedb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/v2/receiveDiamond`,
            headers: JSON.parse(qxqhd),
            body: `{
                "taskcode": "share",
                "double": true
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【分享任务翻倍】：${result.message}\n`)


                } else {

                    console.log(`【分享任务翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}






//抽奖信息获取
function qxqlottoinfo(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/lotto/v2/products?catid=recommend&pn=1&ps=10`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【获取到抽奖信息】：${result.data[0].desc}\n`)

                    ppid = result.data[0].pid
                    await $.wait(2000)
                    await qxqlotto()


                } else {

                    console.log(`【获取到抽奖信息失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//抽奖
function qxqlotto(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/lotto/v2/partake`,
            headers: JSON.parse(qxqhd),
            body: `{
            "seconds": 27,
            "pid": "${ppid}",
            "plat": "app",
            "inviterid": "",
            "type": "video",
            "sm": {
              "shuMeiDeviceId": "",
              "appVersion": "",
              "os": "",
              "guestId": ""
            }
          }
          `,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    console.log(`【抽奖成功，获得抽奖码】\n`)
                    await $.wait(2000)
                    await qxqlottodb()


                } else {

                    console.log(`【抽奖失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//抽奖任务双倍奖励
function qxqlottodb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/v2/receiveDiamond`,
            headers: JSON.parse(qxqhd),
            body: `{
                "taskcode": "lotto",
                "double": true
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【抽奖翻倍】：${result.message}\n`)


                } else {

                    console.log(`【抽奖翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}





//砍价信息获取
function qxqhaggleinfo(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/haggle/v2/products?pn=1&ps=10`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【获取到砍价信息】：${result.data.productList[0].desc}\n`)
                    pid1 = result.data.productList[0].pid
                    await $.wait(2000)
                    await qxqhuid()


                } else {

                    console.log(`【获取到砍价信息失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//uid获取
function qxqhuid(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/invite/invitepage`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【获取userid】：${result.data.userid}\n`)
                    target = result.data.userid
                    await $.wait(2000)
                    await qxqhaggle()


                } else {

                    console.log(`【获取userid失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//砍价
function qxqhaggle(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `https://api.xqustar.com/api/haggle/partake`,
            headers: JSON.parse(qxqhd),
            body: `{
            "source": "app",
            "pid": "${pid1}",
            "plat": "app",
            "target": "${target}",
            "seconds": 45,
            "addressid": "cafff2be-d3ea-4d7a-a6c0-9d643dc75bb8",
            "type": "video",
            "sm": {
              "shuMeiDeviceId": "",
              "appVersion": "",
              "os": "",
              "guestId": ""
            }
          }
          `
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【完成砍价任务】\n`)
                    await $.wait(2000)
                    await qxqhaggledb()


                } else {

                    console.log(`【砍价任务失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//砍价任务双倍奖励
function qxqhaggledb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/v2/receiveDiamond`,
            headers: JSON.parse(qxqhd),
            body: `{
                "taskcode": "haggle",
                "double": true
              }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【砍价翻倍】：${result.message}\n`)


                } else {

                    console.log(`【砍价翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}




//转盘信息获取
function qxqzpinfo(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/turntable/init`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    console.log(`【查询剩余转盘次数】：${result.data.times}\n`)
                    if (result.data.times == 0) {
                        console.log(`【转盘次数已用完】\n`)
                    } else {
                        console.log(`【开始转盘】：${result.data.times}\n`)
                        await qxqzp()
                        await $.wait(DD)
                    }
                } else {

                    console.log(`【查询剩余转盘次数】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//转盘任务
function qxqzp(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/turntable/start`,
            headers: JSON.parse(qxqhd),

        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {

                    if (result.data.result == 2) {

                        console.log(`【转盘获得金币】：${result.data.number}\n`)
                        console.log(`【等待金币翻倍】\n`)
                        idd = result.data.id
                        await qxqzpdb()
                        if (result.data.times == 0) {
                            console.log(`【转盘次数不足，停止转盘】\n`)
                        } else {
                            await qxqzpinfo()
                            await $.wait(1000)
                        }
                    } else {
                        console.log(`【转盘未获得金币】\n`)
                        if (result.data.times == 0) {
                            console.log(`【转盘次数不足，停止转盘】\n`)
                        } else {
                            await qxqzpinfo()
                            await $.wait(1000)
                        }
                    }

                } else {

                    console.log(`【转盘失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//转盘翻倍
function qxqzpdb(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/turntable/double`,
            headers: JSON.parse(qxqhd),
            body: `{
            "id": "${idd}"
          }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {



                    console.log(`【转盘金币翻倍】：${result.message}\n`)


                } else {

                    console.log(`【转盘金币翻倍失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//提现页面
function qxqtxpage(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/withdraw/withdrawpage`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    if (result.data.activeList[3].amount == 0) {
                        console.log(`【金额未到88星钻，未解锁提现】\n`)
                    } else {
                        console.log(`【查询到每日提现金额】：${result.data.activeList[3].amount}\n`)
                        amt = result.data.activeList[3].amount
                        await $.wait(2000)
                        await qxqtxtj()
                    }




                } else {

                    console.log(`【查询每日提现金额失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//提现条件
function qxqtxtj(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/task/diamondNumber`,
            headers: JSON.parse(qxqhd),

        }
        $.get(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {
                    if (result.data.today >= 88) {
                        console.log(`【今日已达88星钻，开始提现】\n`)
                        await $.wait(1000)
                        await qxqtx()
                    } else {
                        console.log(`【今日未达88星钻，继续努力哦】\n`)
                    }

                } else {

                    console.log(`【查询今日星钻失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//提现
function qxqtx(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://api.xqustar.com/api/withdraw/apply`,
            headers: JSON.parse(qxqhd),
            body: `{
            "amount": ${amt},
            "withdrawtype": "random",
            "ac": {}
          }`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                const result = JSON.parse(data)

                if (result.code == 200) {



                    console.log(`【提现】：${result.message}\n`)
                    $.message += `【提现】：${result.message}\n`
                } else {

                    console.log(`【提现失败】：${result.message}\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



function message() {
    if (tz == 1) { $.msg($.name, "", $.message) }
}

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}


//console.log('\n'+getCurrentDate());
function getCurrentDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;


}











function Env(name, opts) {
    class Http {
        constructor(env) {
            this.env = env
        }
        send(opts, method = 'GET') {
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if (method === 'POST') {
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if (err) reject(err)
                    else resolve(resp)
                })
            })
        }
        get(opts) {
            return this.send.call(this.env, opts)
        }
        post(opts) {
            return this.send.call(this.env, opts, 'POST')
        }
    }
    return new (class {
        constructor(name, opts) {
            this.name = name
            this.http = new Http(this)
            this.data = null
            this.dataFile = 'box.dat'
            this.logs = []
            this.isMute = false
            this.isNeedRewrite = false
            this.logSeparator = '\n'
            this.startTime = new Date().getTime()
            Object.assign(this, opts)
            this.log('', `🔔${this.name
                }, 开始!`)
        }
        isNode() {
            return 'undefined' !== typeof module && !!module.exports
        }
        isQuanX() {
            return 'undefined' !== typeof $task
        }
        isSurge() {
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }
        isLoon() {
            return 'undefined' !== typeof $loon
        }
        isShadowrocket() {
            return 'undefined' !== typeof $rocket
        }
        toObj(str, defaultValue = null) {
            try {
                return JSON.parse(str)
            } catch {
                return defaultValue
            }
        }
        toStr(obj, defaultValue = null) {
            try {
                return JSON.stringify(obj)
            } catch {
                return defaultValue
            }
        }
        getjson(key, defaultValue) {
            let json = defaultValue
            const val = this.getdata(key)
            if (val) {
                try {
                    json = JSON.parse(this.getdata(key))
                } catch { }
            }
            return json
        }
        setjson(val, key) {
            try {
                return this.setdata(JSON.stringify(val), key)
            } catch {
                return false
            }
        }
        getScript(url) {
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }
        runScript(script, runOpts) {
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http: //${addr}/v1/scripting/evaluate`,
                    body: {
                        script_text: script,
                        mock_type: 'cron',
                        timeout: httpapi_timeout
                    },
                    headers: {
                        'X-Key': key,
                        'Accept': '*/*'
                    }
                }
                this.post(opts, (err, resp, body) => resolve(body))
            }).catch((e) => this.logErr(e))
        }
        loaddata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if (isCurDirDataFile || isRootDirDataFile) {
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try {
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch (e) {
                        return {}
                    }
                } else return {}
            } else return {}
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if (isCurDirDataFile) {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if (isRootDirDataFile) {
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }
        lodash_get(source, path, defaultValue = undefined) {
            const paths = path.replace(/[(d+)]/g, '.$1').split('.')
            let result = source
            for (const p of paths) {
                result = Object(result)[p]
                if (result === undefined) {
                    return defaultValue
                }
            }
            return result
        }
        lodash_set(obj, path, value) {
            if (Object(obj) !== obj) return obj
            if (!Array.isArray(path)) path = path.toString().match(/[^.[]]+/g) || []
            path
                .slice(0, -1)
                .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
            ] = value
            return obj
        }
        getdata(key) {
            let val = this.getval(key)
            // 如果以 @
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if (objval) {
                    try {
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch (e) {
                        val = ''
                    }
                }
            }
            return val
        }
        setdata(val, key) {
            let issuc = false
            if (/^@/.test(key)) {
                const [, objkey, paths] = /^@(.*?).(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try {
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch (e) {
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }
        getval(key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.read(key)
            } else if (this.isQuanX()) {
                return $prefs.valueForKey(key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        setval(val, key) {
            if (this.isSurge() || this.isLoon()) {
                return $persistentStore.write(val, key)
            } else if (this.isQuanX()) {
                return $prefs.setValueForKey(val, key)
            } else if (this.isNode()) {
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }
        initGotEnv(opts) {
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if (opts) {
                opts.headers = opts.headers ? opts.headers : {}
                if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
                    opts.cookieJar = this.ckjar
                }
            }
        }
        get(opts, callback = () => { }) {
            if (opts.headers) {
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                this.got(opts)
                    .on('redirect', (resp, nextOpts) => {
                        try {
                            if (resp.headers['set-cookie']) {
                                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                if (ck) {
                                    this.ckjar.setCookieSync(ck, null)
                                }
                                nextOpts.cookieJar = this.ckjar
                            }
                        } catch (e) {
                            this.logErr(e)
                        }
                        // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                    })
                    .then(
                        (resp) => {
                            const {
                                statusCode: status,
                                statusCode,
                                headers,
                                body
                            } = resp
                            callback(null, {
                                status,
                                statusCode,
                                headers,
                                body
                            }, body)
                        },
                        (err) => {
                            const {
                                message: error,
                                response: resp
                            } = err
                            callback(error, resp, resp && resp.body)
                        }
                    )
            }
        }
        post(opts, callback = () => { }) {
            const method = opts.method ? opts.method.toLocaleLowerCase() : 'post'
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if (opts.body && opts.headers && !opts.headers['Content-Type']) {
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if (opts.headers) delete opts.headers['Content-Length']
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient[method](opts, (err, resp, body) => {
                    if (!err && resp) {
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if (this.isQuanX()) {
                opts.method = method
                if (this.isNeedRewrite) {
                    opts.opts = opts.opts || {}
                    Object.assign(opts.opts, {
                        hints: false
                    })
                }
                $task.fetch(opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => callback(err)
                )
            } else if (this.isNode()) {
                this.initGotEnv(opts)
                const {
                    url,
                    ..._opts
                } = opts
                this.got[method](url, _opts).then(
                    (resp) => {
                        const {
                            statusCode: status,
                            statusCode,
                            headers,
                            body
                        } = resp
                        callback(null, {
                            status,
                            statusCode,
                            headers,
                            body
                        }, body)
                    },
                    (err) => {
                        const {
                            message: error,
                            response: resp
                        } = err
                        callback(error, resp, resp && resp.body)
                    }
                )
            }
        }
        /**
         *
         * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
         *    :$.time('yyyyMMddHHmmssS')
         *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
         *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
         * @param {string} fmt 格式化参数
         * @param {number} 可选: 根据指定时间戳返回格式化日期
         *
         */
        time(fmt, ts = null) {
            const date = ts ? new Date(ts) : new Date()
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'H+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            }
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            for (let k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
            return fmt
        }
        /**
         * 系统通知
         *
         * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
         *
         * 示例:
         * $.msg(title, subt, desc, 'twitter://')
         * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
         *
         * @param {*} title 标题
         * @param {*} subt 副标题
         * @param {*} desc 通知详情
         * @param {*} opts 通知参数
         *
         */
        msg(title = name, subt = '', desc = '', opts) {
            const toEnvOpts = (rawopts) => {
                if (!rawopts) return rawopts
                if (typeof rawopts === 'string') {
                    if (this.isLoon()) return rawopts
                    else if (this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if (this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if (typeof rawopts === 'object') {
                    if (this.isLoon()) {
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if (this.isQuanX()) {
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if (this.isSurge()) {
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if (!this.isMute) {
                if (this.isSurge() || this.isLoon()) {
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if (this.isQuanX()) {
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if (!this.isMuteLog) {
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }
        log(...logs) {
            if (logs.length > 0) {
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }
        logErr(err, msg) {
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if (!isPrintSack) {
                this.log('', `❗️${this.name
                    }, 错误!`, err)
            } else {
                this.log('', `❗️${this.name
                    }, 错误!`, err.stack)
            }
        }
        wait(time) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }
        done(val = {}) {
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name
                }, 结束!🕛${costTime}秒`)
            this.log()
            if (this.isSurge() || this.isQuanX() || this.isLoon()) {
                $done(val)
            }
        }
    })(name, opts)
}

