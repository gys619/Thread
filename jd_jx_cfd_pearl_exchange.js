// noinspection JSUnresolvedVariable

/*
[task_local]
财富岛珍珠兑换
59 * * * * jd_jx_cfd_pearl_exchange.js, tag=财富岛珍珠兑换, enabled=true
================Loon==============
[Script]
cron "59 * * * *" script-path=jd_jx_cfd_pearl_exchange.js,tag=财富岛珍珠兑换
*/
// noinspection JSUnresolvedFunction
const {Env} = require('./utils/magic');
const $ = new Env('M财富岛珍珠兑换');
let money = process.env.PEARL_MONEY ? process.env.PEARL_MONEY * 1 : 5
$.logic = async function () {
    const {ddwVirHb, exchangeInfo} = await ExchangePearlState();
    if (ddwVirHb / 100 < money) {
        $.log(`钱不够呀! 你只有${ddwVirHb / 100}元,没资格兑换${money}元`)
        return;
    }
    let prizeInfos = exchangeInfo?.prizeInfo;
    await $.countdown();
    for (let i = 0; i < prizeInfos.length; i++) {
        let prizeInfo = prizeInfos[i];
        let number = prizeInfo.strPrizeName.replace('元', '') * 1;
        if (money === number) {
            $.log('将要兑换', prizeInfo.strPrizeName, '参数', prizeInfo.dwLvl,
                prizeInfo.ddwVirHb, prizeInfo.strPool)
            if (prizeInfo.dwState === 3) {
                $.log('你已经换过了')
                break;
            }
            if (prizeInfo.dwState === 1) {
                $.log('没货')
                break;
            }
            for (let j = 0; j < 3; j++) {
                if (await ExchangePearlHb(prizeInfo.dwLvl, prizeInfo.ddwVirHb,
                    prizeInfo.strPool)) {
                    break;
                }
                await $.wait(1950, 2100)
            }
        }
    }
}
$.run({filename: __filename, wait: [3000, 5000]}).catch(
    reason => console.log(reason));

/**
 * 游戏红包列表
 *
 * jsonpCBKF({"ddwVirHb":248,"dwExchangeType":0,"exchangeInfo":{"prizeInfo":[{"Condition":[{"descr":"本赛季连续登陆(1/1) 天","reach":1,"type":1},{"descr":"岛主等级达到2级","reach":1,"type":2},{"descr":"满1元解锁兑换资格","reach":1,"type":0}],"ddwVirHb":20,"dwLvl":5,"dwState":3,"strPool":"anhjZmQyX2V4Y2hhbmdlX2hjaGJfMjAyMTEwMjc=","strPrizeName":"0.2元"},{"Condition":[{"descr":"本赛季连续登陆(2/2) 天","reach":1,"type":1},{"descr":"岛主等级达到3级","reach":1,"type":2},{"descr":"满1元解锁兑换资格","reach":1,"type":0}],"ddwVirHb":100,"dwLvl":4,"dwState":3,"strPool":"anhjZmQyX2V4Y2hhbmdlX2hjaGJfMjAyMTEwMjc=","strPrizeName":"1元"},{"Condition":[{"descr":"本赛季连续登陆(4/4) 天","reach":1,"type":1},{"descr":"岛主等级达到3级","reach":1,"type":2},{"descr":"满5元解锁兑换资格","reach":0,"type":0}],"ddwVirHb":500,"dwLvl":3,"dwState":3,"strPool":"anhjZmQyX2V4Y2hhbmdlX2hjaGJfMjAyMTEwMjc=","strPrizeName":"5元"},{"Condition":[{"descr":"本赛季连续登陆(7/7) 天","reach":1,"type":1},{"descr":"岛主等级达到5级","reach":1,"type":2},{"descr":"满10元解锁兑换资格","reach":0,"type":0}],"ddwVirHb":1000,"dwLvl":2,"dwState":1,"strPool":"anhjZmQyX2V4Y2hhbmdlX2hjaGJfMjAyMTEwMjc=","strPrizeName":"10元"},{"Condition":[{"descr":"本赛季连续登陆(2/2) 天","reach":1,"type":1},{"descr":"岛主等级达到2级","reach":1,"type":2},{"descr":"满100元解锁兑换资格","reach":0,"type":0}],"ddwVirHb":10000,"dwLvl":1,"dwState":3,"strPool":"anhjZmQyX2V4Y2hhbmdlX2hjaGJfMjAyMTEwMjc=","strPrizeName":"100元"}],"randHbPrizeInfo":{"Condition":[{"descr":"本赛季连续登陆(2/2) 天","reach":1,"type":1},{"descr":"岛主等级达到2级","reach":1,"type":2},{"descr":"满5元解锁兑换资格","reach":0,"type":0}],"dwState":10,"strMaxHb":"5","strMinHb":"0.1","strPool":"anhjZmQyX2V4Y2hhbmdlX2hjc2poYl8yMDIxMTE="}},"iRet":0,"sErrMsg":""}
 )
 */
// noinspection DuplicatedCode
async function ExchangePearlState() {
    let url = `https://m.jingxi.com/jxbfd/user/ExchangePearlState?__t=1636003501193&strZone=jxbfd&dwExchangeType=undefined&_stk=__t%2CstrZone&_ste=1&h5st=20211104132501193%3B5590711643310161%3B10032%3Btk01w5cf31af630n0cGarPU%2B3%2FQN4Xla0SYq%2FH7tEeT9VQWsNTAKrMGSp0UT%2BD2ditCEz3s2VVKHLx3rPtqT%2FqQAEnon%3B9889d83b496ebfb1a8de1679e4b0eef7a723dd0b0f3a769ab8be5492299e9614&_=1636003501196&sceneval=2&g_login_type=1&callback=jsonpCBKF&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/promote/2021/fortune_island_complex_v2/index.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie

    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.randomString(
        40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.iRet === 0) {
        return data
    }
    return '';
}

/**
 * 游戏兑换
 *
 * jsonpCBKE({"ddwVirHb":20,"iRet":0,"sErrMsg":"","strAwardDetail":{"dwAwardLevel":5,"dwIsAward":1,"dwWantLevel":5,"strActName":"jxcfd2_exchange_hchb_20211027","strName":"0.20元"}}
 )
 */
// noinspection DuplicatedCode
async function ExchangePearlHb(dwLvl, ddwVirHb, strPoolName) {
    let url = `https://m.jingxi.com/jxbfd/user/ExchangePearlHb?__t=1636003500978&strZone=jxbfd&dwLvl=${dwLvl}&dwIsRandHb=0&ddwVirHb=${ddwVirHb}&strPoolName=${strPoolName}&dwExchangeType=0&_stk=__t%2CddwVirHb%2CdwExchangeType%2CdwIsRandHb%2CdwLvl%2CstrPoolName%2CstrZone&_ste=1&h5st=20211104132500978%3B5590711643310161%3B10032%3Btk01w5cf31af630n0cGarPU%2B3%2FQN4Xla0SYq%2FH7tEeT9VQWsNTAKrMGSp0UT%2BD2ditCEz3s2VVKHLx3rPtqT%2FqQAEnon%3B9c4ccb7d63152b384bf7f5b853c6d8bedc902069874785bb7f89f6cfcca15072&_=1636003500980&sceneval=2&g_login_type=1&callback=jsonpCBKE&g_ty=ls`;
    // noinspection DuplicatedCode
    let headers = {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Referer': 'https://st.jingxi.com/promote/2021/fortune_island_complex_v2/index.html',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'm.jingxi.com',
        'Accept-Language': 'zh-cn',
        'Cookie': $.cookie
    }
    // noinspection DuplicatedCode
    headers['User-Agent'] = `jdpingou;iPhone;5.2.2;14.3;${$.randomString(
        40)};network/wifi;model/iPhone12,1;appBuild/100630;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/1;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`
    let data = await $.get(url, headers)
    // noinspection DuplicatedCode
    if (data?.iRet === 0) {
        $.log(`${data?.strAwardDetail?.strName}兑换成功`)
        $.putMsg(`${data?.strAwardDetail?.strName}兑换成功`)
        return true;
    }
    if (data?.iRet === 2046) {
        $.log("余额不足")
        return true;
    }
    if (data?.iRet === 1003) {
        return false;
    }
    return false;
}

