/*
 * 如需运行请自行添加环境变量：JD_TRY，值填 true 即可运行
 * 脚本兼容: Node.js
 *
 * @Modified from: https://github.com/X1a0He/jd_scripts_fixed/blob/main/jd_try_xh.js
 * 
 * 30 8 * * * jd_try_MyTrials.js
 * 
 */ 
const $ = new Env('京东试用待领取通知')
const URL = 'https://api.m.jd.com/client.action'
let notifyMsg = ''
$.successNum = 0;
$.giveText = '';
$.sentNum = 0;
$.cookiesArr = []
let args_xh = {
    /*
     * 每多少个账号发送一次通知，默认为4
     * 可通过环境变量控制 JD_TRY_SENDNUM
     * */
    sendNum: process.env.JD_TRY_SENDNUM * 1 || 4,
}

!(async() => {
    await $.wait(500)
    // 如果你要运行京东试用这个脚本，麻烦你把环境变量 JD_TRY 设置为 true
    if(process.env.JD_TRY && process.env.JD_TRY === 'true'){
        await requireConfig()
        if(!$.cookiesArr[0]){
            $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
                "open-url": "https://bean.m.jd.com/"
            })
            return
        }
        for(let i = 0; i < $.cookiesArr.length; i++){
            if($.cookiesArr[i]){
                $.cookie = $.cookiesArr[i];
                $.UserName = decodeURIComponent($.cookie.match(/pt_pin=(.+?);/) && $.cookie.match(/pt_pin=(.+?);/)[1])
                $.index = i + 1;
                $.isLogin = true;
                $.nickName = '';
                await totalBean();
                console.log(`\n开始【京东账号${$.index}】${$.nickName || $.UserName}\n`);
                if(!$.isLogin){
                    $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
                        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                    });
                    await $.notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                    continue
                }
                
                
                $.successNum = 0;
                $.giveText = '';

                // await try_MyTrials(1, 1)    //申请中的商品

                await try_MyTrials(1, 2)    //申请成功的商品
                // await try_MyTrials(1, 3)    //申请失败的商品
                if($.successNum>0){
                    await showMsg()
                }
            }
            if($.isNode()&&notifyMsg!=''){
                if($.index % args_xh.sendNum === 0){
                    $.sentNum++;
                    console.log(`正在进行第 ${$.sentNum} 次发送通知，发送数量：${args_xh.sendNum}`)
                    await $.notify.sendNotify(`${$.name}`, `${notifyMsg}`)
                    notifyMsg = "";
                }
            }
        }
        if($.isNode()&&notifyMsg!=''){
            if(($.cookiesArr.length - ($.sentNum * args_xh.sendNum)) < args_xh.sendNum){
                console.log(`正在进行最后一次发送通知，发送数量：${($.cookiesArr.length - ($.sentNum * args_xh.sendNum))}`)
                await $.notify.sendNotify(`${$.name}`, `${notifyMsg}`)
                notifyMsg = "";
            }
        }
    } else {
        console.log(`\n您未设置运行【京东试用】脚本，结束运行！\n`)
    }
})().catch((e) => {
    console.error(`❗️ ${$.name} 运行错误！\n${e}`)
}).finally(() => $.done())

function requireConfig(){
    return new Promise(resolve => {
        console.log('开始获取配置文件\n')
        $.notify = $.isNode() ? require('./sendNotify') : { sendNotify: async() => { } }
        //获取 Cookies
        $.cookiesArr = []
        if($.isNode()){
            //Node.js用户请在jdCookie.js处填写京东ck;
            const jdCookieNode = require('./jdCookie.js');
            Object.keys(jdCookieNode).forEach((item) => {
                if(jdCookieNode[item]) $.cookiesArr.push(jdCookieNode[item])
            })
            if(process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
        } else {
            //IOS等用户直接用NobyDa的jd $.cookie
            $.cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
        }
        console.log(`共${$.cookiesArr.length}个京东账号\n`)
        resolve()
    })
}

function try_MyTrials(page, selected){
    return new Promise((resolve, reject) => {
        switch(selected){
            case 1:
                console.log('正在获取已申请的商品...')
                break;
            case 2:
                console.log('正在获取申请成功的商品...')
                break;
            case 3:
                console.log('正在获取申请失败的商品...')
                break;
            default:
                console.log('selected错误')
        }
        const body = JSON.stringify({
            "page": page,
            "selected": selected,   // 1 - 已申请 2 - 成功列表，3 - 失败列表
            "previewTime": ""
        });
        let option = taskurl_xh('newtry', 'try_MyTrials', body)
        option.headers.Referer = 'https://pro.m.jd.com/'
        $.get(option, (err, resp, data) => {
            try{
                if(err){
                    console.log(`🚫 ${arguments.callee.name.toString()} API请求失败，请检查网路\n${JSON.stringify(err)}`)
                } else {
                    data = JSON.parse(data)
                    if(data.success){
                        //temp adjustment
                        if(selected === 2){
                            if(data.success && data.data){
                                for(let item of data.data.list){
                                    if(item.status === 2 && item.text.text.includes('试用资格将保留')){
                                        $.successNum += 1
                                        let text = `\n${item.trialName}\n剩余时间：${formatDuring(item.leftTime)}\n商品链接：https://item.jd.com/${item.skuId}.html`
                                        $.giveText += text
                                        // console.log(text)
                                    }
                                }
                            } else {
                                console.log(`获得成功列表失败: ${data.message}`)
                            }
                        }
                    } else {
                        console.error(`ERROR:try_MyTrials`)
                    }
                }
            } catch(e){
                reject(`⚠️ ${arguments.callee.name.toString()} API返回结果解析出错\n${e}\n${JSON.stringify(data)}`)
            } finally{
                resolve()
            }
        })
    })
}

function taskurl_xh(appid, functionId, body = JSON.stringify({})){
    return {
        "url": `${URL}?appid=${appid}&functionId=${functionId}&clientVersion=10.1.2&client=wh5&body=${encodeURIComponent(body)}`,
        'headers': {
            'Host': 'api.m.jd.com',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': $.cookie,
            'Connection': 'keep-alive',
            'UserAgent': 'jdapp;iPhone;10.1.2;15.0;ff2caa92a8529e4788a34b3d8d4df66d9573f499;network/wifi;model/iPhone13,4;addressid/2074196292;appBuild/167802;jdSupportDarkMode/1;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            'Accept-Language': 'zh-cn',
            'Referer': 'https://prodev.m.jd.com/'
        },
    }
}

async function showMsg(){
    let message = ``;
    message += `👤 京东账号${$.index} ${$.nickName || $.UserName}\n`;
    message += `🎉 ${$.successNum}个商品待领取：`;
    message += `${$.giveText}\n`;
    if(!args_xh.jdNotify || args_xh.jdNotify === 'false'){
        $.msg($.name, ``, message, {
            "open-url": 'https://try.m.jd.com/user'
        })
        if($.isNode())
            notifyMsg += `${message}\n`
    } else {
        console.log(message)
    }
}

function totalBean(){
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": $.cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
            },
            "timeout": 10000,
        }
        $.post(options, (err, resp, data) => {
            try{
                if(err){
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if(data){
                        data = JSON.parse(data);
                        if(data['retcode'] === 13){
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if(data['retcode'] === 0){
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch(e){
                $.logErr(e, resp)
            } finally{
                resolve();
            }
        })
    })
}

function jsonParse(str){
    if(typeof str == "string"){
        try{
            return JSON.parse(str);
        } catch(e){
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

// 毫秒
function formatDuring(mss) {
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
}

function Env(name, opts){
    class Http{
        constructor(env){
            this.env = env
        }

        send(opts, method = 'GET'){
            opts = typeof opts === 'string' ? {
                url: opts
            } : opts
            let sender = this.get
            if(method === 'POST'){
                sender = this.post
            }
            return new Promise((resolve, reject) => {
                sender.call(this, opts, (err, resp, body) => {
                    if(err) reject(err)
                    else resolve(resp)
                })
            })
        }

        get(opts){
            return this.send.call(this.env, opts)
        }

        post(opts){
            return this.send.call(this.env, opts, 'POST')
        }
    }

    return new (class{
        constructor(name, opts){
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
            this.log('', `🔔${this.name}, 开始!`)
        }

        isNode(){
            return 'undefined' !== typeof module && !!module.exports
        }

        isQuanX(){
            return 'undefined' !== typeof $task
        }

        isSurge(){
            return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
        }

        isLoon(){
            return 'undefined' !== typeof $loon
        }

        toObj(str, defaultValue = null){
            try{
                return JSON.parse(str)
            } catch{
                return defaultValue
            }
        }

        toStr(obj, defaultValue = null){
            try{
                return JSON.stringify(obj)
            } catch{
                return defaultValue
            }
        }

        getjson(key, defaultValue){
            let json = defaultValue
            const val = this.getdata(key)
            if(val){
                try{
                    json = JSON.parse(this.getdata(key))
                } catch{ }
            }
            return json
        }

        setjson(val, key){
            try{
                return this.setdata(JSON.stringify(val), key)
            } catch{
                return false
            }
        }

        getScript(url){
            return new Promise((resolve) => {
                this.get({
                    url
                }, (err, resp, body) => resolve(body))
            })
        }

        runScript(script, runOpts){
            return new Promise((resolve) => {
                let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
                let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
                httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
                const [key, addr] = httpapi.split('@')
                const opts = {
                    url: `http://${addr}/v1/scripting/evaluate`,
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

        loaddata(){
            if(this.isNode()){
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                if(isCurDirDataFile || isRootDirDataFile){
                    const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
                    try{
                        return JSON.parse(this.fs.readFileSync(datPath))
                    } catch(e){
                        return {}
                    }
                } else return {}
            } else return {}
        }

        writedata(){
            if(this.isNode()){
                this.fs = this.fs ? this.fs : require('fs')
                this.path = this.path ? this.path : require('path')
                const curDirDataFilePath = this.path.resolve(this.dataFile)
                const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
                const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
                const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
                const jsondata = JSON.stringify(this.data)
                if(isCurDirDataFile){
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                } else if(isRootDirDataFile){
                    this.fs.writeFileSync(rootDirDataFilePath, jsondata)
                } else {
                    this.fs.writeFileSync(curDirDataFilePath, jsondata)
                }
            }
        }

        lodash_get(source, path, defaultValue = undefined){
            const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
            let result = source
            for(const p of paths){
                result = Object(result)[p]
                if(result === undefined){
                    return defaultValue
                }
            }
            return result
        }

        lodash_set(obj, path, value){
            if(Object(obj) !== obj) return obj
            if(!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
            path.slice(0, -1).reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
                path[path.length - 1]
                ] = value
            return obj
        }

        getdata(key){
            let val = this.getval(key)
            // 如果以 @
            if(/^@/.test(key)){
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objval = objkey ? this.getval(objkey) : ''
                if(objval){
                    try{
                        const objedval = JSON.parse(objval)
                        val = objedval ? this.lodash_get(objedval, paths, '') : val
                    } catch(e){
                        val = ''
                    }
                }
            }
            return val
        }

        setdata(val, key){
            let issuc = false
            if(/^@/.test(key)){
                const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
                const objdat = this.getval(objkey)
                const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
                try{
                    const objedval = JSON.parse(objval)
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                } catch(e){
                    const objedval = {}
                    this.lodash_set(objedval, paths, val)
                    issuc = this.setval(JSON.stringify(objedval), objkey)
                }
            } else {
                issuc = this.setval(val, key)
            }
            return issuc
        }

        getval(key){
            if(this.isSurge() || this.isLoon()){
                return $persistentStore.read(key)
            } else if(this.isQuanX()){
                return $prefs.valueForKey(key)
            } else if(this.isNode()){
                this.data = this.loaddata()
                return this.data[key]
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        setval(val, key){
            if(this.isSurge() || this.isLoon()){
                return $persistentStore.write(val, key)
            } else if(this.isQuanX()){
                return $prefs.setValueForKey(val, key)
            } else if(this.isNode()){
                this.data = this.loaddata()
                this.data[key] = val
                this.writedata()
                return true
            } else {
                return (this.data && this.data[key]) || null
            }
        }

        initGotEnv(opts){
            this.got = this.got ? this.got : require('got')
            this.cktough = this.cktough ? this.cktough : require('tough-cookie')
            this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
            if(opts){
                opts.headers = opts.headers ? opts.headers : {}
                if(undefined === opts.headers.Cookie && undefined === opts.cookieJar){
                    opts.cookieJar = this.ckjar
                }
            }
        }

        get(opts, callback = () => { }){
            if(opts.headers){
                delete opts.headers['Content-Type']
                delete opts.headers['Content-Length']
            }
            if(this.isSurge() || this.isLoon()){
                if(this.isSurge() && this.isNeedRewrite){
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.get(opts, (err, resp, body) => {
                    if(!err && resp){
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if(this.isQuanX()){
                if(this.isNeedRewrite){
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
            } else if(this.isNode()){
                this.initGotEnv(opts)
                this.got(opts).on('redirect', (resp, nextOpts) => {
                    try{
                        if(resp.headers['set-cookie']){
                            const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                            if(ck){
                                this.ckjar.setCookieSync(ck, null)
                            }
                            nextOpts.cookieJar = this.ckjar
                        }
                    } catch(e){
                        this.logErr(e)
                    }
                    // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
                }).then(
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

        post(opts, callback = () => { }){
            // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
            if(opts.body && opts.headers && !opts.headers['Content-Type']){
                opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            }
            if(opts.headers) delete opts.headers['Content-Length']
            if(this.isSurge() || this.isLoon()){
                if(this.isSurge() && this.isNeedRewrite){
                    opts.headers = opts.headers || {}
                    Object.assign(opts.headers, {
                        'X-Surge-Skip-Scripting': false
                    })
                }
                $httpClient.post(opts, (err, resp, body) => {
                    if(!err && resp){
                        resp.body = body
                        resp.statusCode = resp.status
                    }
                    callback(err, resp, body)
                })
            } else if(this.isQuanX()){
                opts.method = 'POST'
                if(this.isNeedRewrite){
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
            } else if(this.isNode()){
                this.initGotEnv(opts)
                const {
                    url,
                    ..._opts
                } = opts
                this.got.post(url, _opts).then(
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
         * @param {*} fmt 格式化参数
         *
         */
        time(fmt){
            let o = {
                'M+': new Date().getMonth() + 1,
                'd+': new Date().getDate(),
                'H+': new Date().getHours(),
                'm+': new Date().getMinutes(),
                's+': new Date().getSeconds(),
                'q+': Math.floor((new Date().getMonth() + 3) / 3),
                'S': new Date().getMilliseconds()
            }
            if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
            for(let k in o)
                if(new RegExp('(' + k + ')').test(fmt))
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
        msg(title = name, subt = '', desc = '', opts){
            const toEnvOpts = (rawopts) => {
                if(!rawopts) return rawopts
                if(typeof rawopts === 'string'){
                    if(this.isLoon()) return rawopts
                    else if(this.isQuanX()) return {
                        'open-url': rawopts
                    }
                    else if(this.isSurge()) return {
                        url: rawopts
                    }
                    else return undefined
                } else if(typeof rawopts === 'object'){
                    if(this.isLoon()){
                        let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
                        let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
                        return {
                            openUrl,
                            mediaUrl
                        }
                    } else if(this.isQuanX()){
                        let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
                        let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
                        return {
                            'open-url': openUrl,
                            'media-url': mediaUrl
                        }
                    } else if(this.isSurge()){
                        let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
                        return {
                            url: openUrl
                        }
                    }
                } else {
                    return undefined
                }
            }
            if(!this.isMute){
                if(this.isSurge() || this.isLoon()){
                    $notification.post(title, subt, desc, toEnvOpts(opts))
                } else if(this.isQuanX()){
                    $notify(title, subt, desc, toEnvOpts(opts))
                }
            }
            if(!this.isMuteLog){
                let logs = ['', '==============📣系统通知📣==============']
                logs.push(title)
                subt ? logs.push(subt) : ''
                desc ? logs.push(desc) : ''
                console.log(logs.join('\n'))
                this.logs = this.logs.concat(logs)
            }
        }

        log(...logs){
            if(logs.length > 0){
                this.logs = [...this.logs, ...logs]
            }
            console.log(logs.join(this.logSeparator))
        }

        logErr(err, msg){
            const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            if(!isPrintSack){
                this.log('', `❗️${this.name}, 错误!`, err)
            } else {
                this.log('', `❗️${this.name}, 错误!`, err.stack)
            }
        }

        wait(time){
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        done(val = {}){
            const endTime = new Date().getTime()
            const costTime = (endTime - this.startTime) / 1000
            this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
            this.log()
            if(this.isSurge() || this.isQuanX() || this.isLoon()){
                $done(val)
            }
        }
    })(name, opts)
}
