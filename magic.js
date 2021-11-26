// noinspection JSUnresolvedFunction,JSUnresolvedVariable

const axios = require('axios');
const fs = require("fs");
// const moment = require("moment");
const {format} = require("date-fns");
const notify = require('./sendNotify');
const jdCookieNode = require('./jdCookie.js');
const CryptoJS = require("crypto-js");
let cookies = [];
let testMode = process.env.TEST_MODE?.includes('on') ? true
    : __dirname.includes("/home/magic")
Object.keys(jdCookieNode).forEach((item) => {
    cookies.push(jdCookieNode[item])
})

const USER_AGENTS = [
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;android;10.0.2;9;network/4g;Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; GM1910 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "jdapp;android;10.0.2;9;network/wifi;Mozilla/5.0 (Linux; Android 9; 16T Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;13.6;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.6;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.5;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.7;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;13.4;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;android;10.0.2;9;network/wifi;Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "jdapp;android;10.0.2;11;network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K30 5G Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045511 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;11.4;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79",
    "jdapp;android;10.0.2;10;;network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36",
    "jdapp;android;10.0.2;9;network/wifi;Mozilla/5.0 (Linux; Android 9; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "jdapp;android;10.0.2;8.1.0;network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "jdapp;android;10.0.2;8.0.0;network/wifi;Mozilla/5.0 (Linux; Android 8.0.0; HTC U-3w Build/OPR6.170623.013; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;14.0.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;14.2;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.2;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;android;10.0.2;8.1.0;network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Premium Edition Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;14.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;iPhone;10.0.2;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    "jdapp;android;10.0.2;11;network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045513 Mobile Safari/537.36",
    "jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36",
    "jdapp;iPhone;10.0.2;14.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
]

const $ = axios.create({timeout: 4000});
$.defaults.headers['Accept'] = '*/*';
$.defaults.headers['User-Agent'] = USER_AGENTS[randomNumber(0,
    USER_AGENTS.length)];
$.defaults.headers['Connection'] = 'keep-alive';
$.defaults.headers['Accept-Language'] = "zh-CN,zh-Hans;q=0.9";
$.defaults.headers['Accept-Encoding'] = "gzip, deflate, br";

function randomNumber(min = 0, max = 100) {
    return Math.min(Math.floor(min + Math.random() * (max - min)), max);
}

class Env {
    constructor(name) {
        this.name = name
        this.username = '';
        this.cookie = '';
        this.cookies = [];
        this.index = '';
        this.ext = [];
        this.msg = [];
        this.delimiter = '';
        this.filename = ''
        this.appId = '';
        this.algo = {};
        this.bot = false;
        this.expire = false;
    }

    async run(data = {
        wait: [1000, 2000],
        bot: false,
        delimiter: '',
        filename: '',
        o2o: false,
        random: false,
        once: false,
        blacklist: [],
        whitelist: []
    }) {
        console.log(
            `${this.now()} ${this.name} ${data?.filename ? data?.filename
                : ''} 开始运行...`)
        let start = this.timestamp();
        if (data?.delimiter) {
            this.delimiter = data?.delimiter
        }
        if (data?.filename) {
            this.filename = data.filename;
        }
        if (data?.bot) {
            this.bot = data.bot;
        }
        if (data?.blacklist?.length > 0) {
            for (const cki of data.blacklist) {
                delete cookies[cki - 1];
            }
        }
        if (data?.whitelist?.length > 0) {
            let cks = []
            for (const cki of data.whitelist) {
                if (cki - 1 < cookies.length) {
                    cks.push(cookies[cki - 1])
                }
            }
            cookies = cks;
        }
        if (data?.random) {
            cookies = this.randomArray(cookies)
        }
        await this.verify()
        this.cookies = cookies;
        if (data?.before) {
            for (let i = 0; i <= this.cookies.length; i++) {
                if (this.cookies[i] && !this.expire) {
                    let cookie = this.cookies[i];
                    this.cookie = cookie;
                    this.username = decodeURIComponent(
                        cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                    $.defaults.headers['Cookie'] = this.cookie;
                    this.index = i + 1;
                    let me = {
                        username: this.username,
                        index: this.index,
                        cookie: this.cookie
                    };
                    try {
                        this.ext.push(Object.assign(me, await this.before()));
                    } catch (e) {
                        console.log(e)
                    }
                    if (data?.wait?.length > 0 && this.index
                        !== cookies.length) {
                        await this.wait(data?.wait[0], data?.wait[1])
                    }
                }
            }
        }
        let once = false;
        for (let i = 0; i <= this.cookies.length; i++) {
            if (this.cookies[i] && !this.expire) {
                this.index = i + 1;
                if (data?.once && this.index !== data.once) {
                    once = true;
                    continue;
                }
                let cookie = this.cookies[i];
                this.cookie = cookie;
                this.username = decodeURIComponent(
                    cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.defaults.headers['Cookie'] = this.cookie;
                this.index = i + 1;
                try {
                    await this.logic()
                    if (data?.o2o) {
                        await this.send();
                        testMode ? console.log(this.msg) : ''
                        this.msg = [];
                    }
                    if (once) {
                        break;
                    }
                } catch (e) {
                    console.log(e)
                }
                if (data?.wait?.length > 0 && this.index !== cookies.length) {
                    await this.wait(data?.wait[0], data?.wait[1])
                }
            }
        }
        console.log(`${this.now()} ${this.name} 运行结束,耗时 ${this.timestamp()
        - start}ms\n`)
        testMode && this.msg.length > 0 ? console.log(this.msg) : ''
        if (!data?.o2o) {
            await this.send();
        }
    }

    deleteCookie() {
        delete this.cookies[this.index - 1]
        return {};
    }

    groupBy(arr, fn) {
        const data = {};
        arr.forEach(function (o) {
            const k = fn(o);
            data[k] = data[k] || []
            data[k].push(o)
        })

        return data;
    }

    async send() {
        if (this.msg?.length > 0) {
            if (this.bot) {
                await notify.sendNotify("/" + this.name,
                    this.msg.join(this.delimiter || ''))
            } else {
                await notify.sendNotify(this.name, this.msg.join("\n"))
            }
        }
    }

    async verify() {
        let x = 'm_jx_';
        this.appId = this.filename ? this.name.slice(0, 1) === 'M'
                ? (this.filename.includes(x + 'cfd') ? '10032' :
                    this.filename.includes(x + 'mc') ? '10028' :
                        this.filename.includes(x + 'factory') ? 'c0ff1' : '') : ''
            : '';
        this.appId ? this.algo = await this._algo() : '';
    }

    async wait(min, max) {
        if (max) {
            return new Promise(
                (resolve) => setTimeout(resolve, this.random(min, max)));
        } else {
            return new Promise((resolve) => setTimeout(resolve, min));
        }
    }

    putMsg(msg) {
        this.log(msg)
        this.bot ? this.msg.push(msg) :
            this.msg.push(`【当前账号】 ${this.username} ${msg}`)
    }

    md5(str) {
        return CryptoJS.MD5(str).toString()
    }

    HmacSHA256(param, key) {
        return CryptoJS.HmacSHA256(param, key).toString()
    }

    log(...msg) {
        console.log(`${this.now()} ${this.username}`, ...msg)
    }

    build(url) {
        debugger
        if (url.match(/&callback=(jsonpCBK(.*))&/)) {
            let cb = url.match(/&callback=(jsonpCBK(.*))&/);
            url = url.replace(cb[1], this.randomCallback(cb[2].length || 0))
        }
        let stk = decodeURIComponent(this.getQueryString(url, '_stk') || '');
        if (stk) {
            let ens, hash, st = '',
                ts = this.now('yyyyMMddHHmmssSSS').toString(),
                tk = this.algo.tk, fp = this.algo.fp, em = this.algo.em;
            if (tk && fp && em) {
                hash = em(tk, fp, ts, this.appId, CryptoJS).toString(
                    CryptoJS.enc.Hex)
            } else {
                const random = '5gkjB6SpmC9s';
                tk = 'tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc';
                fp = '9686767825751161';
                hash = CryptoJS.SHA512(
                    `${tk}${fp}${ts}${this.appId}${random}`,
                    tk).toString(CryptoJS.enc.Hex);
            }
            stk.split(',').map((item, index) => {
                st += `${item}:${this.getQueryString(url, item)}${index
                === stk.split(',').length - 1 ? '' : '&'}`;
            })
            ens = encodeURIComponent(
                [''.concat(ts), ''.concat(fp),
                    ''.concat(this.appId), ''.concat(tk),
                    ''.concat(CryptoJS.HmacSHA256(st, hash.toString()).toString(
                        CryptoJS.enc.Hex))].join(';'));
            if (url.match(/[?|&]h5st=(.*?)&/)) {
                url = url.replace(url.match(/[?|&]h5st=(.*?)&/)[1], 'H5ST')
                .replace(/H5ST/, ens)
            }
            let matchArr = [/[?|&]_time=(\d+)/, /[?|&]__t=(\d+)/,
                /[?|&]_ts=(\d+)/,
                /[?|&]_=(\d+)/, /[?|&]t=(\d+)/, /[?|&]_cfd_t=(\d+)/]
            for (let ms of matchArr) {
                if (url.match(ms)) {
                    url = url.replace(url.match(ms)[1], Date.now())
                }
            }
            let t = this._tk();
            if (url.match(/strPgUUNum=(.*?)&/)) {
                url = url.replace(url.match(/strPgUUNum=(.*?)&/)[1], t.tk)
                if (url.match(/strPhoneID=(.*?)&/)) {
                    url = url.replace(url.match(/strPhoneID=(.*?)&/)[1], t.id)
                }
                if (url.match(/strPgtimestamp=(.*?)&/)) {
                    url = url.replace(url.match(/strPgtimestamp=(.*?)&/)[1],
                        t.ts)
                }
            }
            if (url.match(/jxmc_jstoken=(.*?)&/)) {
                url = url.replace(url.match(/jxmc_jstoken=(.*?)&/)[1], t.tk)
                if (url.match(/phoneid=(.*?)&/)) {
                    url = url.replace(url.match(/phoneid=(.*?)&/)[1], t.id)
                }
                if (url.match(/timestamp=(.*?)&/)) {
                    url = url.replace(url.match(/timestamp=(.*?)&/)[1], t.ts)
                }
            }
        }
        return url;
    }

    getQueryString(url, name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = url.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }

    unique(arr) {
        return Array.from(new Set(arr))
    }

    async logic() {
        console.log("default logic")
    }

    async before() {
        return -1;
    }

    async after() {
        return -1;
    }

    tryLock(username, key) {
        try {
            fs.accessSync(`/jd/log/lock/${key}_${username}`);
            return false;
        } catch (e) {
            return true;
        }
    }

    setLock(username, key) {
        try {
            try {
                fs.accessSync(`/jd/log/lock`);
            } catch (e) {
                fs.mkdirSync(`/jd/log/lock`);
            }
            fs.mkdirSync(`/jd/log/lock/${key}_${username}`);
            return false;
        } catch (e) {
            return true;
        }
    }

    match(pattern, string) {
        pattern = (pattern instanceof Array) ? pattern : [pattern];
        for (let pat of pattern) {
            const match = pat.exec(string);
            if (match) {
                const len = match.length;
                if (len === 1) {
                    return match;
                } else if (len === 2) {
                    return match[1];
                } else {
                    const r = [];
                    for (let i = 1; i < len; i++) {
                        r.push(match[i])
                    }
                    return r;
                }
            }
        }
        return '';
    }

    async countdown(s) {
        let date = new Date();
        if (date.getMinutes() === 59) {
            let ms = this.now("s.SSS")
            if (ms < 59) {
                let st = (60 - ms) * 1000;
                console.log(` 需要等待时间 ${st / 1000} 秒`);
                await this.wait(st - (s || 20))
            }
        }
    }

    readFileSync(path) {
        try {
            return fs.readFileSync(path).toString();
        } catch (e) {
            console.log(path, '文件不存在进行创建')
            this.writeFileSync(path, '');
            return '';
        }
    }

    writeFileSync(path, data) {
        fs.writeFileSync(path, data)
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async notify(text, desc) {
        return notify.sendNotify(text, desc);
    }

    async get(url, headers) {
        url = this.appId ? this.build(url) : url
        return new Promise((resolve, reject) => {
            $.get(url, {headers: headers}).then(
                data => resolve(this.handler(data) || data))
            .catch(e => reject(e))
        })
    }

    async post(url, body, headers) {
        url = this.appId ? this.build(url) : url
        return new Promise((resolve, reject) => {
            $.post(url, body, {headers: headers})
            .then(data => resolve(this.handler(data) || data))
            .catch(e => reject(e));
        })
    }

    handler(res) {
        let data = res.data;
        if (typeof data === 'string') {
            data = data.replace(/[\n\r| ]/g, '');
            if (data.includes("try{jsonpCB")) {
                data = data.replace(/try{jsonpCB.*\({/, '{')
                .replace(/}\)([;])?}catch\(e\){}/, '}')
            } else if (data.includes('jsonpCB')) {
                let st = data.replace(/[\n\r]/g, '').replace(/jsonpCB.*\({/,
                    '{');
                data = st.substring(0, st.length - 1)
            } else if (/try{.*\({/) {
                data = data.replace(/try{.*\({/, '{')
                .replace(/}\)([;])?}catch\(e\){}/, '}')
            } else {
                testMode ? console.log('例外', data) : ''
            }
            testMode ? console.log(data) : ''
            testMode ? console.log('----------------分割线--------------------')
                : ''
            return JSON.parse(data)
        }
        testMode ? console.log(JSON.stringify(data)) : ''
        testMode ? console.log('----------------分割线---------------------') : ''
        return data;
    }

    randomNum(length) {
        length = length || 32;
        let t = "0123456789", a = t.length, n = '';
        for (let i = 0; i < length; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return n
    }

    randomString(e) {
        e = e || 32;
        let t = "0123456789abcdef", a = t.length, n = '';
        for (let i = 0; i < e; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return n
    }

    randomCallback(e = 1) {
        let t = "abcdefghigklmnopqrstuvwsyz", a = t.length, n = '';
        for (let i = 0; i < e; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return "jsonpCBK" + n.toUpperCase()
    }

    randomArray(arr, count) {
        count = count || arr.length
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp,
            index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    now(fmt) {
        return format(new Date(), fmt || 'yyyy-MM-dd HH:mm:ss.SSS')
    }

    // format(date, fmt) {
    //     return moment(typeof date === 'string' ? date * 1 : date).format(
    //         fmt || 'yyyy-MM-DD HH:mm:ss')
    // }

    timestamp() {
        return new Date().getTime()
    }

    _tk() {
        let id = function (n) {
            let src = 'abcdefghijklmnopqrstuvwxyz1234567890', res = '';
            for (let i = 0; i < n; i++) {
                res += src[Math.floor(src.length * Math.random())];
            }
            return res;
        }(40), ts = Date.now().toString(), tk = this.md5(
            '' + decodeURIComponent(this.username) + ts + id
            + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');
        return {ts: ts, id: id, tk: tk}
    }

    async get_bean() {
        let data = await $.post('https://api.m.jd.com/client.action',
            `functionId=plantBeanIndex&body=${escape(
                JSON.stringify({
                    version: "9.0.0.1",
                    "monitor_source": "plant_app_plant_index",
                    "monitor_refer": ""
                })
            )}&appid=ld&client=apple&area=5_274_49707_49973&build=167283&clientVersion=9.1.0`,
            {
                'Host': "api.m.jd.com",
                "Cookie": this.cookie
            });
        return data.data.jwordShareInfo.shareUrl.split('Uuid=')[1] ?? ''
    }

    async get_farm() {
        let data = await $.post(
            'https://api.m.jd.com/client.action?functionId=initForFarm',
            `body=${escape(
                JSON.stringify({"version": 4}))}&appid=wh5&clientVersion=9.1.0`,
            {
                "origin": "https://home.m.jd.com",
                "referer": "https://home.m.jd.com/myJd/newhome.action",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": this.cookie
            })
        return data?.farmUserPro?.shareCode ?? ''
    }

    async _algo() {
        let fp = function () {
            let e = "0123456789", a = 13, i = ''
            for (; a--;) {
                i += e[Math.random() * e.length | 0]
            }
            return (i + Date.now()).slice(0, 16)
        }();
        let data = await this.post(
            'https://cactus.jd.com/request_algo?g_ty=ajax', JSON.stringify({
                "version": "1.0",
                "fp": fp,
                "appId": this.appId,
                "timestamp": this.timestamp(),
                "platform": "web",
                "expandParams": ''
            }), {
                'Authority': 'cactus.jd.com',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                'Content-Type': 'application/json',
                'Origin': 'https://st.jingxi.com',
                'Referer': 'https://st.jingxi.com/',
            });
        return {
            fp: fp.toString(),
            tk: data?.data?.result?.tk || data?.result?.tk,
            em: new Function(
                `return ${data?.data?.result?.algo || data?.result?.algo}`)()
        }
    }
}

module.exports = {Env, CryptoJS};
