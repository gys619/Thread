/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: whyour
 * @Last Modified time: 2021-5-1 15:00:54
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 */
//详细说明参考 https://github.com/ccwav/QLScript2.
const querystring = require('querystring');
const exec = require('child_process').exec;
const $ = new Env();
const timeout = 15000; //超时时间(单位毫秒)

// =======================================go-cqhttp通知设置区域===========================================
//gobot_url 填写请求地址http://127.0.0.1/send_private_msg
//gobot_token 填写在go-cqhttp文件设置的访问密钥
//gobot_qq 填写推送到个人QQ或者QQ群号
//go-cqhttp相关API https://docs.go-cqhttp.org/api
let GOBOT_URL = ''; // 推送到个人QQ: http://127.0.0.1/send_private_msg  群：http://127.0.0.1/send_group_msg
let GOBOT_TOKEN = ''; //访问密钥
let GOBOT_QQ = ''; // 如果GOBOT_URL设置 /send_private_msg 则需要填入 user_id=个人QQ 相反如果是 /send_group_msg 则需要填入 group_id=QQ群

// =======================================微信server酱通知设置区域===========================================
//此处填你申请的SCKEY.
//(环境变量名 PUSH_KEY)
let SCKEY = '';

// =======================================Bark App通知设置区域===========================================
//此处填你BarkAPP的信息(IP/设备码，例如：https://api.day.app/XXXXXXXX)
let BARK_PUSH = '';
//BARK app推送铃声,铃声列表去APP查看复制填写
let BARK_SOUND = '';
//BARK app推送消息的分组, 默认为"QingLong"
let BARK_GROUP = 'QingLong';

// =======================================telegram机器人通知设置区域===========================================
//此处填你telegram bot 的Token，telegram机器人通知推送必填项.例如：1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
//(环境变量名 TG_BOT_TOKEN)
let TG_BOT_TOKEN = '';
//此处填你接收通知消息的telegram用户的id，telegram机器人通知推送必填项.例如：129xxx206
//(环境变量名 TG_USER_ID)
let TG_USER_ID = '';
//tg推送HTTP代理设置(不懂可忽略,telegram机器人通知推送功能中非必填)
let TG_PROXY_HOST = ''; //例如:127.0.0.1(环境变量名:TG_PROXY_HOST)
let TG_PROXY_PORT = ''; //例如:1080(环境变量名:TG_PROXY_PORT)
let TG_PROXY_AUTH = ''; //tg代理配置认证参数
//Telegram api自建的反向代理地址(不懂可忽略,telegram机器人通知推送功能中非必填),默认tg官方api(环境变量名:TG_API_HOST)
let TG_API_HOST = 'api.telegram.org';
// =======================================钉钉机器人通知设置区域===========================================
//此处填你钉钉 bot 的webhook，例如：5a544165465465645d0f31dca676e7bd07415asdasd
//(环境变量名 DD_BOT_TOKEN)
let DD_BOT_TOKEN = '';
//密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串
let DD_BOT_SECRET = '';

// =======================================企业微信机器人通知设置区域===========================================
//此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//(环境变量名 QYWX_KEY)
let QYWX_KEY = '';

// =======================================企业微信应用消息通知设置区域===========================================
/*
此处填你企业微信应用消息的值(详见文档 https://work.weixin.qq.com/api/doc/90000/90135/90236)
环境变量名 QYWX_AM依次填入 corpid,corpsecret,touser(注:多个成员ID使用|隔开),agentid,消息类型(选填,不填默认文本消息类型)
注意用,号隔开(英文输入法的逗号)，例如：wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
可选推送消息类型(推荐使用图文消息（mpnews）):
- 文本卡片消息: 0 (数字零)
- 文本消息: 1 (数字一)
- 图文消息（mpnews）: 素材库图片id, 可查看此教程(http://note.youdao.com/s/HMiudGkb)或者(https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)
 */
let QYWX_AM = '';

// =======================================iGot聚合推送通知设置区域===========================================
//此处填您iGot的信息(推送key，例如：https://push.hellyw.com/XXXXXXXX)
let IGOT_PUSH_KEY = '';

// =======================================push+设置区域=======================================
//官方文档：http://www.pushplus.plus/
//PUSH_PLUS_TOKEN：微信扫码登录后一对一推送或一对多推送下面的token(您的Token)，不提供PUSH_PLUS_USER则默认为一对一推送
//PUSH_PLUS_USER： 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码，如果您是创建群组人。也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送）
let PUSH_PLUS_TOKEN = '';
let PUSH_PLUS_USER = '';
let PUSH_PLUS_TOKEN_hxtrip = '';
let PUSH_PLUS_USER_hxtrip = '';

// ======================================= WxPusher 通知设置区域 ===========================================
// 此处填你申请的 appToken. 官方文档：https://wxpusher.zjiecode.com/docs
// WP_APP_TOKEN 可在管理台查看: https://wxpusher.zjiecode.com/admin/main/app/appToken
// WP_TOPICIDS 群发, 发送目标的 topicId, 以 ; 分隔! 使用 WP_UIDS 单发的时候, 可以不传
// WP_UIDS 发送目标的 uid, 以 ; 分隔。注意 WP_UIDS 和 WP_TOPICIDS 可以同时填写, 也可以只填写一个。
// WP_URL 原文链接, 可选参数
let WP_APP_TOKEN = "";
let WP_TOPICIDS = "";
let WP_UIDS = "";
let WP_URL = "";

let WP_APP_TOKEN_ONE = "";
let WP_UIDS_ONE = "";
/**
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 * @returns {Promise<unknown>}
 */
let PushErrorTime = 0;
let strTitle = "";
let ShowRemarkType = "1";
let Notify_NoCKFalse = "false";
let Notify_NoLoginSuccess = "false";
let UseGroupNotify = 1;
let strAuthor = "";
const {
	getEnvs
} = require('./ql');
const fs = require('fs');
let strCKFile = './CKName_cache.json';
let Fileexists = fs.existsSync(strCKFile);
let TempCK = [];
if (Fileexists) {
	console.log("加载sendNotify,检测到别名缓存文件，载入...");
	TempCK = fs.readFileSync(strCKFile, 'utf-8');
	if (TempCK) {
		TempCK = TempCK.toString();
		TempCK = JSON.parse(TempCK);
	}
}
let strUidFile = './CK_WxPusherUid.json';
let UidFileexists = fs.existsSync(strUidFile);
let TempCKUid = [];
if (UidFileexists) {
	console.log("检测到WxPusherUid文件，载入...");
	TempCKUid = fs.readFileSync(strUidFile, 'utf-8');
	if (TempCKUid) {
		TempCKUid = TempCKUid.toString();
		TempCKUid = JSON.parse(TempCKUid);
	}
}

let tempAddCK = {};
let boolneedUpdate = false;
let strCustom = "";
let strCustomArr = [];
let strCustomTempArr = [];
let Notify_CKTask = "";
let Notify_SkipText = [];
async function sendNotify(text, desp, params = {}, author = '\n\n本通知 By ccwav Mod') {
	console.log(`开始发送通知...`);
	try {
		//Reset 变量
		console.log("通知标题: " + text);
		UseGroupNotify = 1;
		strTitle = "";
		GOBOT_URL = '';
		GOBOT_TOKEN = '';
		GOBOT_QQ = '';
		SCKEY = '';
		BARK_PUSH = '';
		BARK_SOUND = '';
		BARK_GROUP = 'QingLong';
		TG_BOT_TOKEN = '';
		TG_USER_ID = '';
		TG_PROXY_HOST = '';
		TG_PROXY_PORT = '';
		TG_PROXY_AUTH = '';
		TG_API_HOST = 'api.telegram.org';
		DD_BOT_TOKEN = '';
		DD_BOT_SECRET = '';
		QYWX_KEY = '';
		QYWX_AM = '';
		IGOT_PUSH_KEY = '';
		PUSH_PLUS_TOKEN = '';
		PUSH_PLUS_USER = '';
		PUSH_PLUS_TOKEN_hxtrip = '';
		PUSH_PLUS_USER_hxtrip = '';
		Notify_CKTask = "";
		Notify_SkipText = [];

		//变量开关
		var Use_serverNotify = true;
		var Use_pushPlusNotify = true;
		var Use_BarkNotify = true;
		var Use_tgBotNotify = true;
		var Use_ddBotNotify = true;
		var Use_qywxBotNotify = true;
		var Use_qywxamNotify = true;
		var Use_iGotNotify = true;
		var Use_gobotNotify = true;
		var Use_pushPlushxtripNotify = true;
		var Use_WxPusher = true;

		if (process.env.NOTIFY_NOCKFALSE) {
			Notify_NoCKFalse = process.env.NOTIFY_NOCKFALSE;
		}
		strAuthor = "";
		if (process.env.NOTIFY_AUTHOR) {
			strAuthor = process.env.NOTIFY_AUTHOR;
		}
		if (process.env.NOTIFY_SHOWNAMETYPE) {
			ShowRemarkType = process.env.NOTIFY_SHOWNAMETYPE;
		}
		if (process.env.NOTIFY_NOLOGINSUCCESS) {
			Notify_NoLoginSuccess = process.env.NOTIFY_NOLOGINSUCCESS;
		}
		if (process.env.NOTIFY_CKTASK) {
			Notify_CKTask = process.env.NOTIFY_CKTASK;
		}

		if (process.env.NOTIFY_SKIP_TEXT && desp) {
			Notify_SkipText = process.env.NOTIFY_SKIP_TEXT.split('&');
			if (Notify_SkipText.length > 0) {
				for (var Templ in Notify_SkipText) {					
					if (desp.indexOf(Notify_SkipText[Templ]) != -1) {
						console.log("检测内容到内容存在屏蔽推送的关键字(" + Notify_SkipText[Templ] + ")，将跳过推送...");
						return;
					}
				}
			}
		}

		if (text.indexOf("cookie已失效") != -1 || desp.indexOf("重新登录获取") != -1 || text == "Ninja 运行通知") {

			if (Notify_CKTask) {
				console.log("触发CK脚本，开始执行....");
				Notify_CKTask = "task " + Notify_CKTask + " now";
				await exec(Notify_CKTask, function (error, stdout, stderr) {
					console.log(error, stdout, stderr)
				});
			}
			if (Notify_NoCKFalse == "true" && text != "Ninja 运行通知") {
				return;
			}
		}

		//检查黑名单屏蔽通知
		const notifySkipList = process.env.NOTIFY_SKIP_LIST ? process.env.NOTIFY_SKIP_LIST.split('&') : [];
		let titleIndex = notifySkipList.findIndex((item) => item === text);

		if (titleIndex !== -1) {
			console.log(`${text} 在推送黑名单中，已跳过推送`);
			return;
		}

		if (text.indexOf("已可领取") != -1) {
			if (text.indexOf("农场") != -1) {
				strTitle = "东东农场领取";
			} else {
				strTitle = "东东萌宠领取";
			}
		}
		if (text.indexOf("汪汪乐园养joy") != -1) {
			strTitle = "汪汪乐园养joy领取";
		}

		if (text == "京喜工厂") {
			if (desp.indexOf("元造进行兑换") != -1) {
				strTitle = "京喜工厂领取";
			}
		}

		if (text.indexOf("任务") != -1 && (text.indexOf("新增") != -1 || text.indexOf("删除") != -1)) {
			strTitle = "脚本任务更新";
		}
		if (strTitle) {
			const notifyRemindList = process.env.NOTIFY_NOREMIND ? process.env.NOTIFY_NOREMIND.split('&') : [];
			titleIndex = notifyRemindList.findIndex((item) => item === strTitle);

			if (titleIndex !== -1) {
				console.log(`${text} 在领取信息黑名单中，已跳过推送`);
				return;
			}

		} else {
			strTitle = text;
		}

		if (Notify_NoLoginSuccess == "true") {
			if (desp.indexOf("登陆成功") != -1) {
				console.log(`登陆成功不推送`);
				return;
			}
		}

		//检查脚本名称是否需要通知到Group2,Group2读取原环境配置的变量名后加2的值.例如: QYWX_AM2
		const notifyGroup2List = process.env.NOTIFY_GROUP2_LIST ? process.env.NOTIFY_GROUP2_LIST.split('&') : [];
		const titleIndex2 = notifyGroup2List.findIndex((item) => item === strTitle);
		const notifyGroup3List = process.env.NOTIFY_GROUP3_LIST ? process.env.NOTIFY_GROUP3_LIST.split('&') : [];
		const titleIndexGp3 = notifyGroup3List.findIndex((item) => item === strTitle);
		const notifyGroup4List = process.env.NOTIFY_GROUP4_LIST ? process.env.NOTIFY_GROUP4_LIST.split('&') : [];
		const titleIndexGp4 = notifyGroup4List.findIndex((item) => item === strTitle);
		const notifyGroup5List = process.env.NOTIFY_GROUP5_LIST ? process.env.NOTIFY_GROUP5_LIST.split('&') : [];
		const titleIndexGp5 = notifyGroup5List.findIndex((item) => item === strTitle);
		const notifyGroup6List = process.env.NOTIFY_GROUP6_LIST ? process.env.NOTIFY_GROUP6_LIST.split('&') : [];
		const titleIndexGp6 = notifyGroup6List.findIndex((item) => item === strTitle);

		if (titleIndex2 !== -1) {
			console.log(`${strTitle} 在群组2推送名单中，初始化群组推送`);
			UseGroupNotify = 2;
		}
		if (titleIndexGp3 !== -1) {
			console.log(`${strTitle} 在群组3推送名单中，初始化群组推送`);
			UseGroupNotify = 3;
		}
		if (titleIndexGp4 !== -1) {
			console.log(`${strTitle} 在群组4推送名单中，初始化群组推送`);
			UseGroupNotify = 4;
		}
		if (titleIndexGp5 !== -1) {
			console.log(`${strTitle} 在群组5推送名单中，初始化群组推送`);
			UseGroupNotify = 5;
		}
		if (titleIndexGp6 !== -1) {
			console.log(`${strTitle} 在群组6推送名单中，初始化群组推送`);
			UseGroupNotify = 6;
		}
		if (process.env.NOTIFY_CUSTOMNOTIFY) {
			strCustom = process.env.NOTIFY_CUSTOMNOTIFY;
		}
		if (strCustom) {
			strCustomArr = strCustom.replace(/^\[|\]$/g, "").split(",");
			strCustomTempArr = [];
			for (var Tempj in strCustomArr) {
				strCustomTempArr = strCustomArr[Tempj].split("&");
				if (strCustomTempArr.length > 1) {
					if (strTitle == strCustomTempArr[0]) {
						console.log("检测到自定义设定,开始执行配置...");
						if (strCustomTempArr[1] == "组1") {
							console.log("自定义设定强制使用组1配置通知...");
							UseGroupNotify = 1;
						}
						if (strCustomTempArr[1] == "组2") {
							console.log("自定义设定强制使用组2配置通知...");
							UseGroupNotify = 2;
						}
						if (strCustomTempArr[1] == "组3") {
							console.log("自定义设定强制使用组3配置通知...");
							UseGroupNotify = 3;
						}
						if (strCustomTempArr[1] == "组4") {
							console.log("自定义设定强制使用组4配置通知...");
							UseGroupNotify = 4;
						}
						if (strCustomTempArr[1] == "组5") {
							console.log("自定义设定强制使用组5配置通知...");
							UseGroupNotify = 5;
						}
						if (strCustomTempArr[1] == "组6") {
							console.log("自定义设定强制使用组6配置通知...");
							UseGroupNotify = 6;
						}

						if (strCustomTempArr.length > 2) {
							console.log("关闭所有通知变量...");
							Use_serverNotify = false;
							Use_pushPlusNotify = false;
							Use_pushPlushxtripNotify = false;
							Use_BarkNotify = false;
							Use_tgBotNotify = false;
							Use_ddBotNotify = false;
							Use_qywxBotNotify = false;
							Use_qywxamNotify = false;
							Use_iGotNotify = false;
							Use_gobotNotify = false;

							for (let Tempk = 2; Tempk < strCustomTempArr.length; Tempk++) {
								var strTrmp = strCustomTempArr[Tempk];
								switch (strTrmp) {
								case "Server酱":
									Use_serverNotify = true;
									console.log("自定义设定启用Server酱进行通知...");
									break;
								case "pushplus":
									Use_pushPlusNotify = true;
									console.log("自定义设定启用pushplus(推送加)进行通知...");
									break;
								case "pushplushxtrip":
									Use_pushPlushxtripNotify = true;
									console.log("自定义设定启用pushplus_hxtrip(推送加)进行通知...");
									break;
								case "Bark":
									Use_BarkNotify = true;
									console.log("自定义设定启用Bark进行通知...");
									break;
								case "TG机器人":
									Use_tgBotNotify = true;
									console.log("自定义设定启用telegram机器人进行通知...");
									break;
								case "钉钉":
									Use_ddBotNotify = true;
									console.log("自定义设定启用钉钉机器人进行通知...");
									break;
								case "企业微信机器人":
									Use_qywxBotNotify = true;
									console.log("自定义设定启用企业微信机器人进行通知...");
									break;
								case "企业微信应用消息":
									Use_qywxamNotify = true;
									console.log("自定义设定启用企业微信应用消息进行通知...");
									break;
								case "iGotNotify":
									Use_iGotNotify = true;
									console.log("自定义设定启用iGot进行通知...");
									break;
								case "gobotNotify":
									Use_gobotNotify = true;
									console.log("自定义设定启用go-cqhttp进行通知...");
									break;
								case "WxPusher":
									Use_WxPusher = true;
									console.log("自定义设定启用WxPusher进行通知...");
									break;

								}
							}

						}
					}
				}
			}

		}

		//console.log("UseGroup2 :"+UseGroup2);
		//console.log("UseGroup3 :"+UseGroup3);


		switch (UseGroupNotify) {
		case 1:
			if (process.env.GOBOT_URL && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL;
			}
			if (process.env.GOBOT_TOKEN && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN;
			}
			if (process.env.GOBOT_QQ && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ;
			}

			if (process.env.PUSH_KEY && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY;
			}

			if (process.env.WP_APP_TOKEN && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN;
			}

			if (process.env.WP_TOPICIDS && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS;
			}

			if (process.env.WP_UIDS && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS;
			}

			if (process.env.WP_URL && Use_WxPusher) {
				WP_URL = process.env.WP_URL;
			}
			if (process.env.BARK_PUSH && Use_BarkNotify) {
				if (process.env.BARK_PUSH.indexOf('https') > -1 || process.env.BARK_PUSH.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH}`;
				}
				if (process.env.BARK_SOUND) {
					BARK_SOUND = process.env.BARK_SOUND;
				}
				if (process.env.BARK_GROUP) {
					BARK_GROUP = process.env.BARK_GROUP;
				}
			} else {
				if (BARK_PUSH && BARK_PUSH.indexOf('https') === -1 && BARK_PUSH.indexOf('http') === -1 && Use_BarkNotify) {
					//兼容BARK本地用户只填写设备码的情况
					BARK_PUSH = `https://api.day.app/${BARK_PUSH}`;
				}
			}
			if (process.env.TG_BOT_TOKEN && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
			}
			if (process.env.TG_USER_ID && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID;
			}
			if (process.env.TG_PROXY_AUTH && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH;
			if (process.env.TG_PROXY_HOST && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST;
			if (process.env.TG_PROXY_PORT && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT;
			if (process.env.TG_API_HOST && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST;

			if (process.env.DD_BOT_TOKEN && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN;
				if (process.env.DD_BOT_SECRET) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET;
				}
			}

			if (process.env.QYWX_KEY && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY;
			}

			if (process.env.QYWX_AM && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM;
			}

			if (process.env.IGOT_PUSH_KEY && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY;
			}

			if (process.env.PUSH_PLUS_TOKEN && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN;
			}
			if (process.env.PUSH_PLUS_USER && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip;
			}
			break;

		case 2:
			//==========================第二套环境变量赋值=========================

			if (process.env.GOBOT_URL2 && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL2;
			}
			if (process.env.GOBOT_TOKEN2 && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN2;
			}
			if (process.env.GOBOT_QQ2 && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ2;
			}

			if (process.env.PUSH_KEY2 && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY2;
			}

			if (process.env.WP_APP_TOKEN2 && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN2;
			}

			if (process.env.WP_TOPICIDS2 && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS2;
			}

			if (process.env.WP_UIDS2 && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS2;
			}

			if (process.env.WP_URL2 && Use_WxPusher) {
				WP_URL = process.env.WP_URL2;
			}
			if (process.env.BARK_PUSH2 && Use_BarkNotify) {
				if (process.env.BARK_PUSH2.indexOf('https') > -1 || process.env.BARK_PUSH2.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH2;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH2}`;
				}
				if (process.env.BARK_SOUND2) {
					BARK_SOUND = process.env.BARK_SOUND2;
				}
				if (process.env.BARK_GROUP2) {
					BARK_GROUP = process.env.BARK_GROUP2;
				}
			}
			if (process.env.TG_BOT_TOKEN2 && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN2;
			}
			if (process.env.TG_USER_ID2 && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID2;
			}
			if (process.env.TG_PROXY_AUTH2 && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH2;
			if (process.env.TG_PROXY_HOST2 && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST2;
			if (process.env.TG_PROXY_PORT2 && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT2;
			if (process.env.TG_API_HOST2 && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST2;

			if (process.env.DD_BOT_TOKEN2 && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN2;
				if (process.env.DD_BOT_SECRET2) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET2;
				}
			}

			if (process.env.QYWX_KEY2 && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY2;
			}

			if (process.env.QYWX_AM2 && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM2;
			}

			if (process.env.IGOT_PUSH_KEY2 && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY2;
			}

			if (process.env.PUSH_PLUS_TOKEN2 && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN2;
			}
			if (process.env.PUSH_PLUS_USER2 && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER2;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip2 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip2;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip2 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip2;
			}
			break;

		case 3:
			//==========================第三套环境变量赋值=========================

			if (process.env.GOBOT_URL3 && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL3;
			}
			if (process.env.GOBOT_TOKEN3 && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN3;
			}
			if (process.env.GOBOT_QQ3 && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ3;
			}

			if (process.env.PUSH_KEY3 && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY3;
			}

			if (process.env.WP_APP_TOKEN3 && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN3;
			}

			if (process.env.WP_TOPICIDS3 && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS3;
			}

			if (process.env.WP_UIDS3 && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS3;
			}

			if (process.env.WP_URL3 && Use_WxPusher) {
				WP_URL = process.env.WP_URL3;
			}

			if (process.env.BARK_PUSH3 && Use_BarkNotify) {
				if (process.env.BARK_PUSH3.indexOf('https') > -1 || process.env.BARK_PUSH3.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH3;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH3}`;
				}
				if (process.env.BARK_SOUND3) {
					BARK_SOUND = process.env.BARK_SOUND3;
				}
				if (process.env.BARK_GROUP3) {
					BARK_GROUP = process.env.BARK_GROUP3;
				}
			}
			if (process.env.TG_BOT_TOKEN3 && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN3;
			}
			if (process.env.TG_USER_ID3 && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID3;
			}
			if (process.env.TG_PROXY_AUTH3 && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH3;
			if (process.env.TG_PROXY_HOST3 && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST3;
			if (process.env.TG_PROXY_PORT3 && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT3;
			if (process.env.TG_API_HOST3 && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST3;

			if (process.env.DD_BOT_TOKEN3 && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN3;
				if (process.env.DD_BOT_SECRET3) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET3;
				}
			}

			if (process.env.QYWX_KEY3 && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY3;
			}

			if (process.env.QYWX_AM3 && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM3;
			}

			if (process.env.IGOT_PUSH_KEY3 && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY3;
			}

			if (process.env.PUSH_PLUS_TOKEN3 && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN3;
			}
			if (process.env.PUSH_PLUS_USER3 && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER3;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip3 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip3;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip3 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip3;
			}
			break;

		case 4:
			//==========================第四套环境变量赋值=========================

			if (process.env.GOBOT_URL4 && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL4;
			}
			if (process.env.GOBOT_TOKEN4 && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN4;
			}
			if (process.env.GOBOT_QQ4 && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ4;
			}

			if (process.env.PUSH_KEY4 && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY4;
			}

			if (process.env.WP_APP_TOKEN4 && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN4;
			}

			if (process.env.WP_TOPICIDS4 && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS4;
			}

			if (process.env.WP_UIDS4 && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS4;
			}

			if (process.env.WP_URL4 && Use_WxPusher) {
				WP_URL = process.env.WP_URL4;
			}

			if (process.env.BARK_PUSH4 && Use_BarkNotify) {
				if (process.env.BARK_PUSH4.indexOf('https') > -1 || process.env.BARK_PUSH4.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH4;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH4}`;
				}
				if (process.env.BARK_SOUND4) {
					BARK_SOUND = process.env.BARK_SOUND4;
				}
				if (process.env.BARK_GROUP4) {
					BARK_GROUP = process.env.BARK_GROUP4;
				}
			}
			if (process.env.TG_BOT_TOKEN4 && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN4;
			}
			if (process.env.TG_USER_ID4 && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID4;
			}
			if (process.env.TG_PROXY_AUTH4 && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH4;
			if (process.env.TG_PROXY_HOST4 && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST4;
			if (process.env.TG_PROXY_PORT4 && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT4;
			if (process.env.TG_API_HOST4 && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST4;

			if (process.env.DD_BOT_TOKEN4 && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN4;
				if (process.env.DD_BOT_SECRET4) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET4;
				}
			}

			if (process.env.QYWX_KEY4 && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY4;
			}

			if (process.env.QYWX_AM4 && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM4;
			}

			if (process.env.IGOT_PUSH_KEY4 && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY4;
			}

			if (process.env.PUSH_PLUS_TOKEN4 && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN4;
			}
			if (process.env.PUSH_PLUS_USER4 && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER4;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip4 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip4;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip4 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip4;
			}

			break;

		case 5:
			//==========================第五套环境变量赋值=========================

			if (process.env.GOBOT_URL5 && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL5;
			}
			if (process.env.GOBOT_TOKEN5 && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN5;
			}
			if (process.env.GOBOT_QQ5 && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ5;
			}

			if (process.env.PUSH_KEY5 && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY5;
			}

			if (process.env.WP_APP_TOKEN5 && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN5;
			}

			if (process.env.WP_TOPICIDS5 && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS5;
			}

			if (process.env.WP_UIDS5 && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS5;
			}

			if (process.env.WP_URL5 && Use_WxPusher) {
				WP_URL = process.env.WP_URL5;
			}
			if (process.env.BARK_PUSH5 && Use_BarkNotify) {
				if (process.env.BARK_PUSH5.indexOf('https') > -1 || process.env.BARK_PUSH5.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH5;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH5}`;
				}
				if (process.env.BARK_SOUND5) {
					BARK_SOUND = process.env.BARK_SOUND5;
				}
				if (process.env.BARK_GROUP5) {
					BARK_GROUP = process.env.BARK_GROUP5;
				}
			}
			if (process.env.TG_BOT_TOKEN5 && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN5;
			}
			if (process.env.TG_USER_ID5 && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID5;
			}
			if (process.env.TG_PROXY_AUTH5 && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH5;
			if (process.env.TG_PROXY_HOST5 && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST5;
			if (process.env.TG_PROXY_PORT5 && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT5;
			if (process.env.TG_API_HOST5 && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST5;

			if (process.env.DD_BOT_TOKEN5 && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN5;
				if (process.env.DD_BOT_SECRET5) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET5;
				}
			}

			if (process.env.QYWX_KEY5 && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY5;
			}

			if (process.env.QYWX_AM5 && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM5;
			}

			if (process.env.IGOT_PUSH_KEY5 && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY5;
			}

			if (process.env.PUSH_PLUS_TOKEN5 && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN5;
			}
			if (process.env.PUSH_PLUS_USER5 && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER5;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip5 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip5;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip5 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip5;
			}
			break;

		case 6:
			//==========================第六套环境变量赋值=========================

			if (process.env.GOBOT_URL6 && Use_gobotNotify) {
				GOBOT_URL = process.env.GOBOT_URL6;
			}
			if (process.env.GOBOT_TOKEN6 && Use_gobotNotify) {
				GOBOT_TOKEN = process.env.GOBOT_TOKEN6;
			}
			if (process.env.GOBOT_QQ6 && Use_gobotNotify) {
				GOBOT_QQ = process.env.GOBOT_QQ6;
			}

			if (process.env.PUSH_KEY6 && Use_serverNotify) {
				SCKEY = process.env.PUSH_KEY6;
			}

			if (process.env.WP_APP_TOKEN6 && Use_WxPusher) {
				WP_APP_TOKEN = process.env.WP_APP_TOKEN6;
			}

			if (process.env.WP_TOPICIDS6 && Use_WxPusher) {
				WP_TOPICIDS = process.env.WP_TOPICIDS6;
			}

			if (process.env.WP_UIDS6 && Use_WxPusher) {
				WP_UIDS = process.env.WP_UIDS6;
			}

			if (process.env.WP_URL6 && Use_WxPusher) {
				WP_URL = process.env.WP_URL6;
			}
			if (process.env.BARK_PUSH6 && Use_BarkNotify) {
				if (process.env.BARK_PUSH6.indexOf('https') > -1 || process.env.BARK_PUSH6.indexOf('http') > -1) {
					//兼容BARK自建用户
					BARK_PUSH = process.env.BARK_PUSH6;
				} else {
					BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH6}`;
				}
				if (process.env.BARK_SOUND6) {
					BARK_SOUND = process.env.BARK_SOUND6;
				}
				if (process.env.BARK_GROUP6) {
					BARK_GROUP = process.env.BARK_GROUP6;
				}
			}
			if (process.env.TG_BOT_TOKEN6 && Use_tgBotNotify) {
				TG_BOT_TOKEN = process.env.TG_BOT_TOKEN6;
			}
			if (process.env.TG_USER_ID6 && Use_tgBotNotify) {
				TG_USER_ID = process.env.TG_USER_ID6;
			}
			if (process.env.TG_PROXY_AUTH6 && Use_tgBotNotify)
				TG_PROXY_AUTH = process.env.TG_PROXY_AUTH6;
			if (process.env.TG_PROXY_HOST6 && Use_tgBotNotify)
				TG_PROXY_HOST = process.env.TG_PROXY_HOST6;
			if (process.env.TG_PROXY_PORT6 && Use_tgBotNotify)
				TG_PROXY_PORT = process.env.TG_PROXY_PORT6;
			if (process.env.TG_API_HOST6 && Use_tgBotNotify)
				TG_API_HOST = process.env.TG_API_HOST6;

			if (process.env.DD_BOT_TOKEN6 && Use_ddBotNotify) {
				DD_BOT_TOKEN = process.env.DD_BOT_TOKEN6;
				if (process.env.DD_BOT_SECRET6) {
					DD_BOT_SECRET = process.env.DD_BOT_SECRET6;
				}
			}

			if (process.env.QYWX_KEY6 && Use_qywxBotNotify) {
				QYWX_KEY = process.env.QYWX_KEY6;
			}

			if (process.env.QYWX_AM6 && Use_qywxamNotify) {
				QYWX_AM = process.env.QYWX_AM6;
			}

			if (process.env.IGOT_PUSH_KEY6 && Use_iGotNotify) {
				IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY6;
			}

			if (process.env.PUSH_PLUS_TOKEN6 && Use_pushPlusNotify) {
				PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN6;
			}
			if (process.env.PUSH_PLUS_USER6 && Use_pushPlusNotify) {
				PUSH_PLUS_USER = process.env.PUSH_PLUS_USER6;
			}

			if (process.env.PUSH_PLUS_TOKEN_hxtrip6 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_TOKEN_hxtrip = process.env.PUSH_PLUS_TOKEN_hxtrip6;
			}
			if (process.env.PUSH_PLUS_USER_hxtrip6 && Use_pushPlushxtripNotify) {
				PUSH_PLUS_USER_hxtrip = process.env.PUSH_PLUS_USER_hxtrip6;
			}
			break;
		}

		//检查是否在不使用Remark进行名称替换的名单
		const notifySkipRemarkList = process.env.NOTIFY_SKIP_NAMETYPELIST ? process.env.NOTIFY_SKIP_NAMETYPELIST.split('&') : [];
		const titleIndex3 = notifySkipRemarkList.findIndex((item) => item === strTitle);

		if (text == "京东到家果园互助码:") {
			ShowRemarkType = "1";
			if (desp) {
				var arrTemp = desp.split(",");
				var allCode = "";
				for (let k = 0; k < arrTemp.length; k++) {
					if (arrTemp[k]) {
						if (arrTemp[k].substring(0, 1) != "@")
							allCode += arrTemp[k] + ",";
					}
				}

				if (allCode) {
					desp += '\n' + '\n' + "ccwav格式化后的互助码:" + '\n' + allCode;
				}
			}
		}

		if (ShowRemarkType != "1" && titleIndex3 == -1) {
			console.log("正在处理账号Remark.....");
			//开始读取青龙变量列表
			const envs = await getEnvs();
			if (envs[0]) {
				for (let i = 0; i < envs.length; i++) {
					cookie = envs[i].value;
					$.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
					$.nickName = "";
					$.Remark = envs[i].remarks || '';
					$.FoundnickName = "";
					$.FoundPin = "";
					//判断有没有Remark，没有搞个屁，有的继续
					if ($.Remark) {
						//先查找缓存文件中有没有这个账号，有的话直接读取别名
						if (envs[i].status == 0) {
							if (TempCK) {
								for (let j = 0; j < TempCK.length; j++) {
									if (TempCK[j].pt_pin == $.UserName) {
										$.FoundPin = TempCK[j].pt_pin;
										$.nickName = TempCK[j].nickName;
									}
								}
							}
							if (!$.FoundPin) {
								//缓存文件中有没有这个账号，调用京东接口获取别名,并更新缓存文件
								console.log($.UserName + "好像是新账号，尝试获取别名.....");
								await GetnickName();
								if (!$.nickName) {
									console.log("别名获取失败，尝试调用另一个接口获取别名.....");
									await GetnickName2();
								}
								if ($.nickName) {
									console.log("好像是新账号，从接口获取别名" + $.nickName);
								} else {
									console.log($.UserName + "该账号没有别名.....");
								}
								tempAddCK = {
									"pt_pin": $.UserName,
									"nickName": $.nickName
								};
								TempCK.push(tempAddCK);
								//标识，需要更新缓存文件
								boolneedUpdate = true;
							}
						}

						$.nickName = $.nickName || $.UserName;
						//这是为了处理ninjia的remark格式
						$.Remark = $.Remark.replace("remark=", "");
						$.Remark = $.Remark.replace(";", "");
						//开始替换内容中的名字
						if (ShowRemarkType == "2") {
							$.Remark = $.nickName + "(" + $.Remark + ")";
						}
						if (ShowRemarkType == "3") {
							$.Remark = $.UserName + "(" + $.Remark + ")";
						}
						try {
							//加个空格，因为有些通知账号前没有空格很丑-_-!!!
							text = text.replace(new RegExp(`${$.UserName}|${$.nickName}`, 'gm'), " " + $.Remark);
							desp = desp.replace(new RegExp(`${$.UserName}|${$.nickName}`, 'gm'), " " + $.Remark);
						} catch (err) {
							console.log("替换出错了");
							console.log("Debug Name1 :" + $.UserName);
							console.log("Debug Name2 :" + $.nickName);
							console.log("Debug Remark :" + $.Remark);
						}
						//console.log($.nickName+$.Remark);

					}

				}

			}
			console.log("处理完成，开始发送通知...");
		}
	} catch (error) {
		console.error(error);
	}

	if (boolneedUpdate) {
		var str = JSON.stringify(TempCK, null, 2);
		fs.writeFile(strCKFile, str, function (err) {
			if (err) {
				console.log(err);
				console.log("更新CKName_cache.json失败!");
			} else {
				console.log("缓存文件CKName_cache.json更新成功!");
			}
		})
	}

	//提供6种通知
	if (strAuthor)
		desp += '\n\n本通知 By ' + strAuthor + "\n通知时间: " + GetDateTime(new Date());
	else
		desp += author + "\n通知时间: " + GetDateTime(new Date());

	await serverNotify(text, desp); //微信server酱

	if (PUSH_PLUS_TOKEN_hxtrip) {
		console.log("hxtrip TOKEN :" + PUSH_PLUS_TOKEN_hxtrip);
	}
	if (PUSH_PLUS_USER_hxtrip) {
		console.log("hxtrip USER :" + PUSH_PLUS_USER_hxtrip);
	}
	PushErrorTime = 0;
	await pushPlusNotifyhxtrip(text, desp); //pushplushxtrip(推送加)
	if (PushErrorTime > 0) {
		console.log("等待1分钟后重试.....");
		await $.wait(60000);
		await pushPlusNotifyhxtrip(text, desp);
	}

	if (PUSH_PLUS_TOKEN) {
		console.log("PUSH_PLUS TOKEN :" + PUSH_PLUS_TOKEN);
	}
	if (PUSH_PLUS_USER) {
		console.log("PUSH_PLUS USER :" + PUSH_PLUS_USER);
	}
	PushErrorTime = 0;
	await pushPlusNotify(text, desp); //pushplus(推送加)
	if (PushErrorTime > 0) {
		console.log("等待1分钟后重试.....");
		await $.wait(60000);
		await pushPlusNotify(text, desp); //pushplus(推送加)
	}
	if (PushErrorTime > 0) {
		console.log("等待1分钟后重试.....");
		await $.wait(60000);
		await pushPlusNotify(text, desp); //pushplus(推送加)

	}

	//由于上述两种微信通知需点击进去才能查看到详情，故text(标题内容)携带了账号序号以及昵称信息，方便不点击也可知道是哪个京东哪个活动
	text = text.match(/.*?(?=\s?-)/g) ? text.match(/.*?(?=\s?-)/g)[0] : text;
	await Promise.all([
			BarkNotify(text, desp, params), //iOS Bark APP
			tgBotNotify(text, desp), //telegram 机器人
			ddBotNotify(text, desp), //钉钉机器人
			qywxBotNotify(text, desp), //企业微信机器人
			qywxamNotify(text, desp), //企业微信应用消息推送
			iGotNotify(text, desp, params), //iGot
			gobotNotify(text, desp), //go-cqhttp
			wxpusherNotify(text, desp) // wxpusher
		]);
}

async function sendNotifybyWxPucher(text, desp, PtPin, author = '\n\n本通知 By ccwav Mod') {

	try {
		var Uid = "";
		var UserRemark = [];
		strAuthor = "";
		if (process.env.NOTIFY_AUTHOR) {
			strAuthor = process.env.NOTIFY_AUTHOR;
		}
		WP_APP_TOKEN_ONE = "";
		if (process.env.WP_APP_TOKEN_ONE) {
			WP_APP_TOKEN_ONE = process.env.WP_APP_TOKEN_ONE;
		}
		if (WP_APP_TOKEN_ONE) {
			if (TempCKUid) {
				for (let j = 0; j < TempCKUid.length; j++) {
					if (PtPin == decodeURIComponent(TempCKUid[j].pt_pin)) {
						Uid = TempCKUid[j].Uid;
					}
				}
			}
			if (Uid) {
				console.log("查询到Uid ：" + Uid);
				WP_UIDS_ONE = Uid;
				console.log("正在发送一对一通知,请稍后...");
				if (strAuthor)
					desp += '\n\n本通知 By ' + strAuthor;
				else
					desp += author;
				await wxpusherNotifyByOne(text, desp);
			} else {
				console.log("未查询到用户的Uid,取消一对一通知发送...");
			}
		} else {
			console.log("变量WP_APP_TOKEN_ONE未配置WxPusher的appToken, 取消发送...");

		}
	} catch (error) {
		console.error(error);
	}

}
function gobotNotify(text, desp, time = 2100) {
	return new Promise((resolve) => {
		if (GOBOT_URL) {
			const options = {
				url: `${GOBOT_URL}?access_token=${GOBOT_TOKEN}&${GOBOT_QQ}`,
				json: {
					message: `${text}\n${desp}`
				},
				headers: {
					'Content-Type': 'application/json',
				},
				timeout,
			};
			setTimeout(() => {
				$.post(options, (err, resp, data) => {
					try {
						if (err) {
							console.log('发送go-cqhttp通知调用API失败！！\n');
							console.log(err);
						} else {
							data = JSON.parse(data);
							if (data.retcode === 0) {
								console.log('go-cqhttp发送通知消息成功🎉\n');
							} else if (data.retcode === 100) {
								console.log(`go-cqhttp发送通知消息异常: ${data.errmsg}\n`);
							} else {
								console.log(`go-cqhttp发送通知消息异常\n${JSON.stringify(data)}`);
							}
						}
					} catch (e) {
						$.logErr(e, resp);
					}
					finally {
						resolve(data);
					}
				});
			}, time);
		} else {
			resolve();
		}
	});
}

function serverNotify(text, desp, time = 2100) {
	return new Promise((resolve) => {
		if (SCKEY) {
			//微信server酱推送通知一个\n不会换行，需要两个\n才能换行，故做此替换
			desp = desp.replace(/[\n\r]/g, '\n\n');
			const options = {
				url: SCKEY.includes('SCT') ? `https://sctapi.ftqq.com/${SCKEY}.send` : `https://sc.ftqq.com/${SCKEY}.send`,
				body: `text=${text}&desp=${desp}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				timeout,
			};
			setTimeout(() => {
				$.post(options, (err, resp, data) => {
					try {
						if (err) {
							console.log('发送通知调用API失败！！\n');
							console.log(err);
						} else {
							data = JSON.parse(data);
							//server酱和Server酱·Turbo版的返回json格式不太一样
							if (data.errno === 0 || data.data.errno === 0) {
								console.log('server酱发送通知消息成功🎉\n');
							} else if (data.errno === 1024) {
								// 一分钟内发送相同的内容会触发
								console.log(`server酱发送通知消息异常: ${data.errmsg}\n`);
							} else {
								console.log(`server酱发送通知消息异常\n${JSON.stringify(data)}`);
							}
						}
					} catch (e) {
						$.logErr(e, resp);
					}
					finally {
						resolve(data);
					}
				});
			}, time);
		} else {
			resolve();
		}
	});
}

function BarkNotify(text, desp, params = {}) {
	return new Promise((resolve) => {
		if (BARK_PUSH) {
			const options = {
				url: `${BARK_PUSH}/${encodeURIComponent(text)}/${encodeURIComponent(
          desp
        )}?sound=${BARK_SOUND}&group=${BARK_GROUP}&${querystring.stringify(params)}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				timeout,
			};
			$.get(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('Bark APP发送通知调用API失败！！\n');
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.code === 200) {
							console.log('Bark APP发送通知消息成功🎉\n');
						} else {
							console.log(`${data.message}\n`);
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve();
				}
			});
		} else {
			resolve();
		}
	});
}

function tgBotNotify(text, desp) {
	return new Promise((resolve) => {
		if (TG_BOT_TOKEN && TG_USER_ID) {
			const options = {
				url: `https://${TG_API_HOST}/bot${TG_BOT_TOKEN}/sendMessage`,
				body: `chat_id=${TG_USER_ID}&text=${text}\n\n${desp}&disable_web_page_preview=true`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				timeout,
			};
			if (TG_PROXY_HOST && TG_PROXY_PORT) {
				const tunnel = require('tunnel');
				const agent = {
					https: tunnel.httpsOverHttp({
						proxy: {
							host: TG_PROXY_HOST,
							port: TG_PROXY_PORT * 1,
							proxyAuth: TG_PROXY_AUTH,
						},
					}),
				};
				Object.assign(options, {
					agent
				});
			}
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('telegram发送通知消息失败！！\n');
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.ok) {
							console.log('Telegram发送通知消息成功🎉。\n');
						} else if (data.error_code === 400) {
							console.log('请主动给bot发送一条消息并检查接收用户ID是否正确。\n');
						} else if (data.error_code === 401) {
							console.log('Telegram bot token 填写错误。\n');
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function ddBotNotify(text, desp) {
	return new Promise((resolve) => {
		const options = {
			url: `https://oapi.dingtalk.com/robot/send?access_token=${DD_BOT_TOKEN}`,
			json: {
				msgtype: 'text',
				text: {
					content: ` ${text}\n\n${desp}`,
				},
			},
			headers: {
				'Content-Type': 'application/json',
			},
			timeout,
		};
		if (DD_BOT_TOKEN && DD_BOT_SECRET) {
			const crypto = require('crypto');
			const dateNow = Date.now();
			const hmac = crypto.createHmac('sha256', DD_BOT_SECRET);
			hmac.update(`${dateNow}\n${DD_BOT_SECRET}`);
			const result = encodeURIComponent(hmac.digest('base64'));
			options.url = `${options.url}&timestamp=${dateNow}&sign=${result}`;
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('钉钉发送通知消息失败！！\n');
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.errcode === 0) {
							console.log('钉钉发送通知消息成功🎉。\n');
						} else {
							console.log(`${data.errmsg}\n`);
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else if (DD_BOT_TOKEN) {
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('钉钉发送通知消息失败！！\n');
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.errcode === 0) {
							console.log('钉钉发送通知消息完成。\n');
						} else {
							console.log(`${data.errmsg}\n`);
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function qywxBotNotify(text, desp) {
	return new Promise((resolve) => {
		const options = {
			url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${QYWX_KEY}`,
			json: {
				msgtype: 'text',
				text: {
					content: ` ${text}\n\n${desp}`,
				},
			},
			headers: {
				'Content-Type': 'application/json',
			},
			timeout,
		};
		if (QYWX_KEY) {
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('企业微信发送通知消息失败！！\n');
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.errcode === 0) {
							console.log('企业微信发送通知消息成功🎉。\n');
						} else {
							console.log(`${data.errmsg}\n`);
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function ChangeUserId(desp) {
	const QYWX_AM_AY = QYWX_AM.split(',');
	if (QYWX_AM_AY[2]) {
		const userIdTmp = QYWX_AM_AY[2].split('|');
		let userId = '';
		for (let i = 0; i < userIdTmp.length; i++) {
			const count = '账号' + (i + 1);
			const count2 = '签到号 ' + (i + 1);
			if (desp.match(count2)) {
				userId = userIdTmp[i];
			}
		}
		if (!userId)
			userId = QYWX_AM_AY[2];
		return userId;
	} else {
		return '@all';
	}
}

function qywxamNotify(text, desp) {
	return new Promise((resolve) => {
		if (QYWX_AM) {
			const QYWX_AM_AY = QYWX_AM.split(',');
			const options_accesstoken = {
				url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken`,
				json: {
					corpid: `${QYWX_AM_AY[0]}`,
					corpsecret: `${QYWX_AM_AY[1]}`,
				},
				headers: {
					'Content-Type': 'application/json',
				},
				timeout,
			};
			$.post(options_accesstoken, (err, resp, data) => {
				html = desp.replace(/\n/g, '<br/>');
				var json = JSON.parse(data);
				accesstoken = json.access_token;
				let options;

				switch (QYWX_AM_AY[4]) {
				case '0':
					options = {
						msgtype: 'textcard',
						textcard: {
							title: `${text}`,
							description: `${desp}`,
							url: 'https://github.com/whyour/qinglong',
							btntxt: '更多',
						},
					};
					break;

				case '1':
					options = {
						msgtype: 'text',
						text: {
							content: `${text}\n\n${desp}`,
						},
					};
					break;

				default:
					options = {
						msgtype: 'mpnews',
						mpnews: {
							articles: [{
									title: `${text}`,
									thumb_media_id: `${QYWX_AM_AY[4]}`,
									author: `智能助手`,
									content_source_url: ``,
									content: `${html}`,
									digest: `${desp}`,
								}, ],
						},
					};
				}
				if (!QYWX_AM_AY[4]) {
					//如不提供第四个参数,则默认进行文本消息类型推送
					options = {
						msgtype: 'text',
						text: {
							content: `${text}\n\n${desp}`,
						},
					};
				}
				options = {
					url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accesstoken}`,
					json: {
						touser: `${ChangeUserId(desp)}`,
						agentid: `${QYWX_AM_AY[3]}`,
						safe: '0',
						...options,
					},
					headers: {
						'Content-Type': 'application/json',
					},
				};

				$.post(options, (err, resp, data) => {
					try {
						if (err) {
							console.log('成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息失败！！\n');
							console.log(err);
						} else {
							data = JSON.parse(data);
							if (data.errcode === 0) {
								console.log('成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息成功🎉。\n');
							} else {
								console.log(`${data.errmsg}\n`);
							}
						}
					} catch (e) {
						$.logErr(e, resp);
					}
					finally {
						resolve(data);
					}
				});
			});
		} else {
			resolve();
		}
	});
}

function iGotNotify(text, desp, params = {}) {
	return new Promise((resolve) => {
		if (IGOT_PUSH_KEY) {
			// 校验传入的IGOT_PUSH_KEY是否有效
			const IGOT_PUSH_KEY_REGX = new RegExp('^[a-zA-Z0-9]{24}$');
			if (!IGOT_PUSH_KEY_REGX.test(IGOT_PUSH_KEY)) {
				console.log('您所提供的IGOT_PUSH_KEY无效\n');
				resolve();
				return;
			}
			const options = {
				url: `https://push.hellyw.com/${IGOT_PUSH_KEY.toLowerCase()}`,
				body: `title=${text}&content=${desp}&${querystring.stringify(params)}`,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				timeout,
			};
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log('发送通知调用API失败！！\n');
						console.log(err);
					} else {
						if (typeof data === 'string')
							data = JSON.parse(data);
						if (data.ret === 0) {
							console.log('iGot发送通知消息成功🎉\n');
						} else {
							console.log(`iGot发送通知消息失败：${data.errMsg}\n`);
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}
function pushPlusNotifyhxtrip(text, desp) {
	return new Promise((resolve) => {
		if (PUSH_PLUS_TOKEN_hxtrip) {
			desp = desp.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
			const body = {
				token: `${PUSH_PLUS_TOKEN_hxtrip}`,
				title: `${text}`,
				content: `${desp}`,
				topic: `${PUSH_PLUS_USER_hxtrip}`,
			};
			const options = {
				url: `http://pushplus.hxtrip.com/send`,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': ' application/json',
				},
				timeout,
			};
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log(`hxtrip push+发送${PUSH_PLUS_USER_hxtrip ? '一对多' : '一对一'}通知消息失败！！\n`);
						PushErrorTime += 1;
						console.log(err);
					} else {
						if (data.indexOf("200") > -1) {
							console.log(`hxtrip push+发送${PUSH_PLUS_USER_hxtrip ? '一对多' : '一对一'}通知消息完成。\n`);
							PushErrorTime = 0;
						} else {
							console.log(`hxtrip push+发送${PUSH_PLUS_USER_hxtrip ? '一对多' : '一对一'}通知消息失败：${data}\n`);
							PushErrorTime += 1;
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function pushPlusNotify(text, desp) {
	return new Promise((resolve) => {
		if (PUSH_PLUS_TOKEN) {
			desp = desp.replace(/[\n\r]/g, '<br>'); // 默认为html, 不支持plaintext
			const body = {
				token: `${PUSH_PLUS_TOKEN}`,
				title: `${text}`,
				content: `${desp}`,
				topic: `${PUSH_PLUS_USER}`,
			};
			const options = {
				url: `https://www.pushplus.plus/send`,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': ' application/json',
				},
				timeout,
			};
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败！！\n`);
						PushErrorTime += 1;
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.code === 200) {
							console.log(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息完成。\n`);
							PushErrorTime = 0;
						} else {
							console.log(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败：${data.msg}\n`);
							PushErrorTime += 1;
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}
function wxpusherNotifyByOne(text, desp) {
	return new Promise((resolve) => {
		if (WP_APP_TOKEN_ONE) {
			var WPURL = "";
			let uids = [];
			for (let i of WP_UIDS_ONE.split(";")) {
				if (i.length != 0)
					uids.push(i);
			};
			let topicIds = [];
			const body = {
				appToken: `${WP_APP_TOKEN_ONE}`,
				content: `${text}\n\n${desp}`,
				summary: `${text}`,
				contentType: 1,
				topicIds: topicIds,
				uids: uids,
				url: `${WPURL}`,
			};
			const options = {
				url: `http://wxpusher.zjiecode.com/api/send/message`,
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				timeout,
			};
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log("WxPusher 发送通知调用 API 失败！！\n");
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.code === 1000) {
							console.log("WxPusher 发送通知消息成功!\n");
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function wxpusherNotify(text, desp) {
	return new Promise((resolve) => {
		if (WP_APP_TOKEN) {
			let uids = [];
			for (let i of WP_UIDS.split(";")) {
				if (i.length != 0)
					uids.push(i);
			};
			let topicIds = [];
			for (let i of WP_TOPICIDS.split(";")) {
				if (i.length != 0)
					topicIds.push(i);
			};
			const body = {
				appToken: `${WP_APP_TOKEN}`,
				content: `${text}\n\n${desp}`,
				summary: `${text}`,
				contentType: 1,
				topicIds: topicIds,
				uids: uids,
				url: `${WP_URL}`,
			};
			const options = {
				url: `http://wxpusher.zjiecode.com/api/send/message`,
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				timeout,
			};
			$.post(options, (err, resp, data) => {
				try {
					if (err) {
						console.log("WxPusher 发送通知调用 API 失败！！\n");
						console.log(err);
					} else {
						data = JSON.parse(data);
						if (data.code === 1000) {
							console.log("WxPusher 发送通知消息成功!\n");
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			});
		} else {
			resolve();
		}
	});
}

function GetDateTime(date) {

	var timeString = "";

	var timeString = date.getFullYear() + "-";
	if ((date.getMonth() + 1) < 10)
		timeString += "0" + (date.getMonth() + 1) + "-";
	else
		timeString += (date.getMonth() + 1) + "-";

	if ((date.getDate()) < 10)
		timeString += "0" + date.getDate() + " ";
	else
		timeString += date.getDate() + " ";

	if ((date.getHours()) < 10)
		timeString += "0" + date.getHours() + ":";
	else
		timeString += date.getHours() + ":";

	if ((date.getMinutes()) < 10)
		timeString += "0" + date.getMinutes() + ":";
	else
		timeString += date.getMinutes() + ":";

	if ((date.getSeconds()) < 10)
		timeString += "0" + date.getSeconds();
	else
		timeString += date.getSeconds();

	return timeString;
}

function GetnickName() {
	return new Promise(async resolve => {
		const options = {
			url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
			headers: {
				Host: "me-api.jd.com",
				Accept: "*/*",
				Connection: "keep-alive",
				Cookie: cookie,
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
				"Accept-Language": "zh-cn",
				"Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
				"Accept-Encoding": "gzip, deflate, br"
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err)
				} else {
					if (data) {
						data = JSON.parse(data);
						if (data['retcode'] === "1001") {
							return;
						}
						if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
							$.nickName = data.data.userInfo.baseInfo.nickname;
						}

					} else {
						$.log('京东服务器返回空数据');
					}
				}
			} catch (e) {
				$.logErr(e)
			}
			finally {
				resolve();
			}
		})
	})
}

function GetnickName2() {
	return new Promise(async(resolve) => {
		const options = {
			url: `https://wxapp.m.jd.com/kwxhome/myJd/home.json?&useGuideModule=0&bizId=&brandId=&fromType=wxapp&timestamp=${Date.now()}`,
			headers: {
				Cookie: cookie,
				'content-type': `application/x-www-form-urlencoded`,
				Connection: `keep-alive`,
				'Accept-Encoding': `gzip,compress,br,deflate`,
				Referer: `https://servicewechat.com/wxa5bf5ee667d91626/161/page-frame.html`,
				Host: `wxapp.m.jd.com`,
				'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.10(0x18000a2a) NetType/WIFI Language/zh_CN`,
			},
		};
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err);
				} else {
					if (data) {
						data = JSON.parse(data);
						if (!data.user) {
							$.isLogin = false; //cookie过期
							return;
						}
						const userInfo = data.user;
						if (userInfo) {
							$.nickName = userInfo.petName;
						}
					} else {
						$.log('京东服务器返回空数据');
					}
				}
			} catch (e) {
				$.logErr(e);
			}
			finally {
				resolve();
			}
		});
	});
}

module.exports = {
	sendNotify,
	sendNotifybyWxPucher,
	BARK_PUSH,
};

// prettier-ignore
function Env(t, s) {
	return new(class {
		constructor(t, s) {
			(this.name = t),
			(this.data = null),
			(this.dataFile = 'box.dat'),
			(this.logs = []),
			(this.logSeparator = '\n'),
			(this.startTime = new Date().getTime()),
			Object.assign(this, s),
			this.log('', `\ud83d\udd14${this.name}, \u5f00\u59cb!`);
		}
		isNode() {
			return 'undefined' != typeof module && !!module.exports;
		}
		isQuanX() {
			return 'undefined' != typeof $task;
		}
		isSurge() {
			return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon;
		}
		isLoon() {
			return 'undefined' != typeof $loon;
		}
		getScript(t) {
			return new Promise((s) => {
				$.get({
					url: t
				}, (t, e, i) => s(i));
			});
		}
		runScript(t, s) {
			return new Promise((e) => {
				let i = this.getdata('@chavy_boxjs_userCfgs.httpapi');
				i = i ? i.replace(/\n/g, '').trim() : i;
				let o = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout');
				(o = o ? 1 * o : 20),
				(o = s && s.timeout ? s.timeout : o);
				const[h, a] = i.split('@'),
				r = {
					url: `http://${a}/v1/scripting/evaluate`,
					body: {
						script_text: t,
						mock_type: 'cron',
						timeout: o
					},
					headers: {
						'X-Key': h,
						Accept: '*/*'
					},
				};
				$.post(r, (t, s, i) => e(i));
			}).catch((t) => this.logErr(t));
		}
		loaddata() {
			if (!this.isNode())
				return {}; {
				(this.fs = this.fs ? this.fs : require('fs')),
				(this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
				s = this.path.resolve(process.cwd(), this.dataFile),
				e = this.fs.existsSync(t),
				i = !e && this.fs.existsSync(s);
				if (!e && !i)
					return {}; {
					const i = e ? t : s;
					try {
						return JSON.parse(this.fs.readFileSync(i));
					} catch (t) {
						return {};
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				(this.fs = this.fs ? this.fs : require('fs')),
				(this.path = this.path ? this.path : require('path'));
				const t = this.path.resolve(this.dataFile),
				s = this.path.resolve(process.cwd(), this.dataFile),
				e = this.fs.existsSync(t),
				i = !e && this.fs.existsSync(s),
				o = JSON.stringify(this.data);
				e ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(s, o) : this.fs.writeFileSync(t, o);
			}
		}
		lodash_get(t, s, e) {
			const i = s.replace(/\[(\d+)\]/g, '.$1').split('.');
			let o = t;
			for (const t of i)
				if (((o = Object(o)[t]), void 0 === o))
					return e;
			return o;
		}
		lodash_set(t, s, e) {
			return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), (s.slice(0, -1).reduce((t, e, i) => (Object(t[e]) === t[e] ? t[e] : (t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {})), t)[s[s.length - 1]] = e), t);
		}
		getdata(t) {
			let s = this.getval(t);
			if (/^@/.test(t)) {
				const[, e, i] = /^@(.*?)\.(.*?)$/.exec(t),
				o = e ? this.getval(e) : '';
				if (o)
					try {
						const t = JSON.parse(o);
						s = t ? this.lodash_get(t, i, '') : s;
					} catch (t) {
						s = '';
					}
			}
			return s;
		}
		setdata(t, s) {
			let e = !1;
			if (/^@/.test(s)) {
				const[, i, o] = /^@(.*?)\.(.*?)$/.exec(s),
				h = this.getval(i),
				a = i ? ('null' === h ? null : h || '{}') : '{}';
				try {
					const s = JSON.parse(a);
					this.lodash_set(s, o, t),
					(e = this.setval(JSON.stringify(s), i));
				} catch (s) {
					const h = {};
					this.lodash_set(h, o, t),
					(e = this.setval(JSON.stringify(h), i));
				}
			} else
				e = $.setval(t, s);
			return e;
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? ((this.data = this.loaddata()), this.data[t]) : (this.data && this.data[t]) || null;
		}
		setval(t, s) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? ((this.data = this.loaddata()), (this.data[s] = t), this.writedata(), !0) : (this.data && this.data[s]) || null;
		}
		initGotEnv(t) {
			(this.got = this.got ? this.got : require('got')),
			(this.cktough = this.cktough ? this.cktough : require('tough-cookie')),
			(this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
			t && ((t.headers = t.headers ? t.headers : {}), void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
		}
		get(t, s = () => {}) {
			t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length']),
			this.isSurge() || this.isLoon() ? $httpClient.get(t, (t, e, i) => {
				!t && e && ((e.body = i), (e.statusCode = e.status)),
				s(t, e, i);
			}) : this.isQuanX() ? $task.fetch(t).then((t) => {
				const {
					statusCode: e,
					statusCode: i,
					headers: o,
					body: h
				} = t;
				s(null, {
					status: e,
					statusCode: i,
					headers: o,
					body: h
				}, h);
			}, (t) => s(t)) : this.isNode() && (this.initGotEnv(t), this.got(t).on('redirect', (t, s) => {
					try {
						const e = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString();
						this.ckjar.setCookieSync(e, null),
						(s.cookieJar = this.ckjar);
					} catch (t) {
						this.logErr(t);
					}
				}).then((t) => {
					const {
						statusCode: e,
						statusCode: i,
						headers: o,
						body: h
					} = t;
					s(null, {
						status: e,
						statusCode: i,
						headers: o,
						body: h
					}, h);
				}, (t) => s(t)));
		}
		post(t, s = () => {}) {
			if ((t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'), delete t.headers['Content-Length'], this.isSurge() || this.isLoon()))
				$httpClient.post(t, (t, e, i) => {
					!t && e && ((e.body = i), (e.statusCode = e.status)),
					s(t, e, i);
				});
			else if (this.isQuanX())
				(t.method = 'POST'), $task.fetch(t).then((t) => {
					const {
						statusCode: e,
						statusCode: i,
						headers: o,
						body: h
					} = t;
					s(null, {
						status: e,
						statusCode: i,
						headers: o,
						body: h
					}, h);
				}, (t) => s(t));
			else if (this.isNode()) {
				this.initGotEnv(t);
				const {
					url: e,
					...i
				} = t;
				this.got.post(e, i).then((t) => {
					const {
						statusCode: e,
						statusCode: i,
						headers: o,
						body: h
					} = t;
					s(null, {
						status: e,
						statusCode: i,
						headers: o,
						body: h
					}, h);
				}, (t) => s(t));
			}
		}
		time(t) {
			let s = {
				'M+': new Date().getMonth() + 1,
				'd+': new Date().getDate(),
				'H+': new Date().getHours(),
				'm+': new Date().getMinutes(),
				's+': new Date().getSeconds(),
				'q+': Math.floor((new Date().getMonth() + 3) / 3),
				S: new Date().getMilliseconds(),
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length)));
			for (let e in s)
				new RegExp('(' + e + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[e] : ('00' + s[e]).substr(('' + s[e]).length)));
			return t;
		}
		msg(s = t, e = '', i = '', o) {
			const h = (t) => !t || (!this.isLoon() && this.isSurge()) ? t : 'string' == typeof t ? this.isLoon() ? t : this.isQuanX() ? {
				'open-url': t
			}
			 : void 0 : 'object' == typeof t && (t['open-url'] || t['media-url']) ? this.isLoon() ? t['open-url'] : this.isQuanX() ? t : void 0 : void 0;
			$.isMute || (this.isSurge() || this.isLoon() ? $notification.post(s, e, i, h(o)) : this.isQuanX() && $notify(s, e, i, h(o))),
			this.logs.push('', '==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============='),
			this.logs.push(s),
			e && this.logs.push(e),
			i && this.logs.push(i);
		}
		log(...t) {
			t.length > 0 ? (this.logs = [...this.logs, ...t]) : console.log(this.logs.join(this.logSeparator));
		}
		logErr(t, s) {
			const e = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			e ? $.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : $.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t);
		}
		wait(t) {
			return new Promise((s) => setTimeout(s, t));
		}
		done(t = {}) {
			const s = new Date().getTime(),
			e = (s - this.startTime) / 1e3;
			this.log('', `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),
			this.log(),
			(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
		}
	})(t, s);
}
