/*
cron "0 0 * * *" bot_jd_bean_change.js, tag:机器人查询专用脚本
 */

//详细说明参考 https://github.com/ccwav/QLScript2

const $ = new Env('机器人查询专用脚本');
const JXUserAgent = $.isNode() ? (process.env.JX_USER_AGENT ? process.env.JX_USER_AGENT : ``) : ``;
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let NowHour = new Date().getHours();
let allMessage = '';
let allReceiveMessage = '';
let allWarnMessage = '';
let ReturnMessage = '';

let notifySkipList = "";
let isSignError = false;
let ReturnMessageTitle="";
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let intPerSent = 0;
let i = 0;
let Today = new Date();
let strAllNotify="";
let strSubNotify="";
let llPetError=false;
let strGuoqi="";
let RemainMessage = '';
let TempBaipiao = "";
let llgeterror=false;
let time = new Date().getHours();
const {getEnvByPtPin} = require('./ql');


let userIndex2 = -1;
let userIndex3 = -1;
let userIndex4 = -1;


let decExBean=0;

if ($.isNode()) {
	Object.keys(jdCookieNode).forEach((item) => {
		cookiesArr.push(jdCookieNode[item])
	})
	if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false')
		console.log = () => {};
}
let intcheckckseq=999999;
let strcheckck = process.env.BOTCHECKCODE;

if(!strcheckck){
	console.log("【账号🆔】没有获取到要查询的账号");
	return
}

for (i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
        cookie = cookiesArr[i];
        $.pt_pin = (cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (strcheckck == $.pt_pin) {
            intcheckckseq = i;
            break;
        }
    }
}

if (intcheckckseq == 999999) {
    if (IsNumber(strcheckck)) {
        if (parseInt(strcheckck) > cookiesArr.length) {
            console.log('【账号'+strcheckck+'🆔】你哪来那么多账号,没点逼数吗');
            return
        }
        intcheckckseq = parseInt(strcheckck) - 1;
    }
}
console.log("当前查询的CK序号是:"+(intcheckckseq+1));

//查询开关
let strDisableList = "";
let DisableIndex=-1;
if ($.isNode()) {	
	strDisableList = process.env.BEANCHANGE_BOTDISABLELIST ? process.env.BEANCHANGE_BOTDISABLELIST.split('&') : [];
}

//喜豆查询
let EnableJxBeans=true;
DisableIndex=strDisableList.findIndex((item) => item === "喜豆查询");
if(DisableIndex!=-1){
	console.log("检测到设定关闭喜豆查询");
	EnableJxBeans=false
}
	
//汪汪乐园
let EnableJoyPark=true;
DisableIndex = strDisableList.findIndex((item) => item === "汪汪乐园");
if(DisableIndex!=-1){
	console.log("检测到设定关闭汪汪乐园查询");
	EnableJoyPark=false
}

//京东赚赚
let EnableJdZZ=true;
DisableIndex = strDisableList.findIndex((item) => item === "京东赚赚");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京东赚赚查询");
	EnableJdZZ=false;
}

//京东秒杀
let EnableJdMs=true;
DisableIndex = strDisableList.findIndex((item) => item === "京东秒杀");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京东秒杀查询");
	EnableJdMs=false;	
}
	
//东东农场
let EnableJdFruit=true;
DisableIndex = strDisableList.findIndex((item) => item === "东东农场");
if(DisableIndex!=-1){
	console.log("检测到设定关闭东东农场查询");
	EnableJdFruit=false;	
}

//极速金币
let EnableJdSpeed=true;
DisableIndex = strDisableList.findIndex((item) => item === "极速金币");
if(DisableIndex!=-1){
	console.log("检测到设定关闭极速金币查询");
	EnableJdSpeed=false;	
}

//京喜牧场
let EnableJxMC=true;
DisableIndex= strDisableList.findIndex((item) => item === "京喜牧场");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京喜牧场查询");
	EnableJxMC=false;	
}
//京喜工厂
let EnableJxGC=true;
DisableIndex=strDisableList.findIndex((item) => item === "京喜工厂");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京喜工厂查询");
	EnableJxGC=false;	
}

// 京东工厂
let EnableJDGC=true;
DisableIndex=strDisableList.findIndex((item) => item === "京东工厂");
if(DisableIndex!=-1){
	console.log("检测到设定关闭京东工厂查询");
	EnableJDGC=false;	
}
//领现金
let EnableCash=true;
DisableIndex=strDisableList.findIndex((item) => item === "领现金");
if(DisableIndex!=-1){
	console.log("检测到设定关闭领现金查询");
	EnableCash=false;	
}


//东东萌宠
let EnableJDPet=true;
DisableIndex=strDisableList.findIndex((item) => item === "东东萌宠");
if(DisableIndex!=-1){
	console.log("检测到设定关闭东东萌宠查询");
	EnableJDPet=false
}
//7天过期京豆
let EnableOverBean=true;
DisableIndex=strDisableList.findIndex((item) => item === "过期京豆");
if(DisableIndex!=-1){
	console.log("检测到设定关闭过期京豆查询");
	EnableOverBean=false
}

//查优惠券
let EnableChaQuan=true;
DisableIndex=strDisableList.findIndex((item) => item === "查优惠券");
if(DisableIndex!=-1){
	console.log("检测到设定关闭优惠券查询");
	EnableChaQuan=false
}


!(async() => {
    if (!cookiesArr[intcheckckseq]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    i = intcheckckseq;
    if (cookiesArr[i]) {
        cookie = cookiesArr[i];
        $.pt_pin = (cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
        $.index = i + 1;
        $.beanCount = 0;
        $.incomeBean = 0;
        $.expenseBean = 0;
        $.todayIncomeBean = 0;
        $.todayOutcomeBean = 0;
        $.errorMsg = '';
        $.isLogin = true;
        $.nickName = '';
        $.levelName = '';
        $.message = '';
        $.balance = 0;
        $.expiredBalance = 0;
        $.JdzzNum = 0;
        $.JdMsScore = 0;
        $.JdFarmProdName = '';
        $.JdtreeEnergy = 0;
        $.JdtreeTotalEnergy = 0;
        $.treeState = 0;
        $.JdwaterTotalT = 0;
        $.JdwaterD = 0;
        $.JDwaterEveryDayT = 0;
        $.JDtotalcash = 0;
        $.JDEggcnt = 0;
        $.Jxmctoken = '';
        $.DdFactoryReceive = '';
        $.jxFactoryInfo = '';
        $.jxFactoryReceive = '';
        $.jdCash = 0;
        $.isPlusVip = 0;
        $.JingXiang = "";
        $.allincomeBean = 0; //月收入
        $.allexpenseBean = 0; //月支出
        $.joylevel = 0;
        $.beanChangeXi = 0;
        $.inJxBean = 0;
        $.OutJxBean = 0;
        $.todayinJxBean = 0;
        $.todayOutJxBean = 0;
        $.xibeanCount = 0;
        $.PigPet = '';
        $.YunFeiTitle = "";
        $.YunFeiQuan = 0;
        $.YunFeiQuanEndTime = "";
        $.YunFeiTitle2 = "";
        $.YunFeiQuan2 = 0;
        $.YunFeiQuanEndTime2 = "";
        TempBaipiao = "";
        strGuoqi = "";
		await Promise.all([
		        TotalBean(),
		        TotalBean2()])
		
        if (!$.isLogin) {
            await isLoginByX1a0He();
        }
        if (!$.isLogin) {
            console.log(`【提示】cookie已失效,\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`);
            return
        }
		
		 await Promise.all([
		         getJoyBaseInfo(), //汪汪乐园
		         getJdZZ(), //京东赚赚
		         getMs(), //京东秒杀
		         getjdfruitinfo(), //东东农场
		         cash(), //极速金币
		         jdJxMCinfo(), //京喜牧场
		         bean(), //京豆查询
		         getJxFactory(), //京喜工厂
		         getDdFactoryInfo(), // 京东工厂
		         jdCash(), //领现金
		         GetJxBeaninfo() //喜豆查询		         
		     ])

        await showMsg();        
    }

})()
.catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
})
.finally(() => {
    $.done();
})
async function showMsg() {
	//if ($.errorMsg)
	//return
	ReturnMessageTitle="";
	ReturnMessage = "";
	var strsummary="";
	var temptest = await getEnvByPtPin($.UserName);
	var strRemark=getRemark(temptest.remarks);
	if(strRemark)
		ReturnMessageTitle = `【账号🆔${(intcheckckseq+1)}】`+strRemark+`\n`;
	else
		ReturnMessageTitle = `【账号${(intcheckckseq+1)}收支情况】\n`;

	if ($.levelName || $.JingXiang){
		ReturnMessage += `【账号信息】`;
		if ($.levelName) {
			if ($.levelName.length > 2)
				$.levelName = $.levelName.substring(0, 2);

			if ($.levelName == "注册")
				$.levelName = `😊普通`;

			if ($.levelName == "钻石")
				$.levelName = `💎钻石`;

			if ($.levelName == "金牌")
				$.levelName = `🥇金牌`;

			if ($.levelName == "银牌")
				$.levelName = `🥈银牌`;

			if ($.levelName == "铜牌")
				$.levelName = `🥉铜牌`;

			if ($.isPlusVip == 1)
				ReturnMessage += `${$.levelName}Plus`;
			else
				ReturnMessage += `${$.levelName}会员`;
		}

		if ($.JingXiang){
			if ($.levelName) {
				ReturnMessage +=",";
			}
			ReturnMessage += `${$.JingXiang}`;
		}
		ReturnMessage +=`\n`;
	}
	
	ReturnMessage += `【今日京豆】收${$.todayIncomeBean}豆`;
	strsummary+= `【今日京豆】收${$.todayIncomeBean}豆`;
	if ($.todayOutcomeBean != 0) {
		ReturnMessage += `,支${$.todayOutcomeBean}豆`;
		strsummary += `,支${$.todayOutcomeBean}豆`;
	}
	ReturnMessage += `\n`;
	strsummary+= `\n`;
	ReturnMessage += `【昨日京豆】收${$.incomeBean}豆`;
	
	if ($.expenseBean != 0) {
		ReturnMessage += `,支${$.expenseBean}豆`;		
	}
	ReturnMessage += `\n`;	
	
	if ($.beanCount){		
		ReturnMessage += `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;
		strsummary+= `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;	
	} else {
		if($.levelName || $.JingXiang)
			ReturnMessage += `【当前京豆】获取失败,接口返回空数据\n`;
		else{
			ReturnMessage += `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;
			strsummary += `【当前京豆】${$.beanCount-$.beanChangeXi}豆(≈${(($.beanCount-$.beanChangeXi)/ 100).toFixed(2)}元)\n`;
		}			
	}
	
	if (EnableJxBeans) {
		ReturnMessage += `【今日喜豆】收${$.todayinJxBean}豆`;		
		if ($.todayOutJxBean != 0) {
			ReturnMessage += `,支${$.todayOutJxBean}豆`;			
		}
		ReturnMessage += `\n`;		
		ReturnMessage += `【昨日喜豆】收${$.inJxBean}豆`;		
		if ($.OutJxBean != 0) {
			ReturnMessage += `,支${$.OutJxBean}豆`;			
		}
		ReturnMessage += `\n`;		
		ReturnMessage += `【当前喜豆】${$.xibeanCount}喜豆(≈${($.xibeanCount/ 100).toFixed(2)}元)\n`;
		strsummary += `【当前喜豆】${$.xibeanCount}豆(≈${($.xibeanCount/ 100).toFixed(2)}元)\n`;
	}


	if ($.JDEggcnt) {		
		ReturnMessage += `【京喜牧场】${$.JDEggcnt}枚鸡蛋\n`;
	}
	if ($.JDtotalcash) {
		ReturnMessage += `【极速金币】${$.JDtotalcash}币(≈${($.JDtotalcash / 10000).toFixed(2)}元)\n`;
	}
	if ($.JdzzNum) {
		ReturnMessage += `【京东赚赚】${$.JdzzNum}币(≈${($.JdzzNum / 10000).toFixed(2)}元)\n`;
	}
	if ($.JdMsScore != 0) {
		ReturnMessage += `【京东秒杀】${$.JdMsScore}币(≈${($.JdMsScore / 1000).toFixed(2)}元)\n`;
	}

	if ($.joylevel || $.jdCash) {
		ReturnMessage += `【其他信息】`;
		if ($.joylevel) {
			ReturnMessage += `汪汪:${$.joylevel}级`;
			if ($.jdCash) {
				ReturnMessage += ",";
			}
		}
		if ($.jdCash) {
			ReturnMessage += `领现金:${$.jdCash}元`;
		}

		ReturnMessage += `\n`;

	}

	if ($.JdFarmProdName != "") {
		if ($.JdtreeEnergy != 0) {
			if ($.treeState === 2 || $.treeState === 3) {
				ReturnMessage += `【东东农场】${$.JdFarmProdName} 可以兑换了!\n`;
				TempBaipiao += `【东东农场】${$.JdFarmProdName} 可以兑换了!\n`;
				allReceiveMessage += `【账号🆔】${$.JdFarmProdName} (东东农场)\n`;
			} else {
				if ($.JdwaterD != 'Infinity' && $.JdwaterD != '-Infinity') {
					ReturnMessage += `【东东农场】${$.JdFarmProdName}(${(($.JdtreeEnergy / $.JdtreeTotalEnergy) * 100).toFixed(0)}%,${$.JdwaterD}天)\n`;
				} else {
					ReturnMessage += `【东东农场】${$.JdFarmProdName}(${(($.JdtreeEnergy / $.JdtreeTotalEnergy) * 100).toFixed(0)}%)\n`;

				}
			}
		} else {
			if ($.treeState === 0) {
				TempBaipiao += `【东东农场】水果领取后未重新种植!\n`;
				allWarnMessage += `【账号🆔】水果领取后未重新种植! (东东农场)\n`;

			} else if ($.treeState === 1) {
				ReturnMessage += `【东东农场】${$.JdFarmProdName}种植中...\n`;
			} else {
				TempBaipiao += `【东东农场】状态异常!\n`;
				allWarnMessage += `【账号🆔】状态异常! (东东农场)\n`;
				//ReturnMessage += `【东东农场】${$.JdFarmProdName}状态异常${$.treeState}...\n`;
			}
		}
	}
	if ($.jxFactoryInfo) {
		ReturnMessage += `【京喜工厂】${$.jxFactoryInfo}\n`
	}
	if ($.ddFactoryInfo) {
		ReturnMessage += `【东东工厂】${$.ddFactoryInfo}\n`
	}
	if ($.DdFactoryReceive) {
		allReceiveMessage += `【账号🆔】${$.DdFactoryReceive} (东东工厂)\n`;
		TempBaipiao += `【东东工厂】${$.ddFactoryInfo} 可以兑换了!\n`;
	}
	if ($.jxFactoryReceive) {
		allReceiveMessage += `【账号🆔】${$.jxFactoryReceive} (京喜工厂)\n`;
		TempBaipiao += `【京喜工厂】${$.jxFactoryReceive} 可以兑换了!\n`;

	}
	
	if ($.PigPet) {
		allReceiveMessage += `【账号🆔】${$.PigPet} (金融养猪)\n`;
		TempBaipiao += `【金融养猪】${$.PigPet} 可以兑换了!\n`;

	}
	if(EnableJDPet){
		llPetError=false;
		var response ="";
		response = await PetRequest('energyCollect');
		if(llPetError)
			response = await PetRequest('energyCollect');
		
		llPetError=false;
		var initPetTownRes = "";
		initPetTownRes = await PetRequest('initPetTown');
		if(llPetError)
			initPetTownRes = await PetRequest('initPetTown');
		
		if(!llPetError && initPetTownRes){
			if (initPetTownRes.code === '0' && initPetTownRes.resultCode === '0' && initPetTownRes.message === 'success') {
				$.petInfo = initPetTownRes.result;
				if ($.petInfo.userStatus === 0) {
					ReturnMessage += `【东东萌宠】活动未开启!\n`;
				} else if ($.petInfo.petStatus === 5) {
					ReturnMessage += `【东东萌宠】${$.petInfo.goodsInfo.goodsName}已可领取!\n`;
					TempBaipiao += `【东东萌宠】${$.petInfo.goodsInfo.goodsName}已可领取!\n`;
					allReceiveMessage += `【账号🆔】${$.petInfo.goodsInfo.goodsName}可以兑换了! (东东萌宠)\n`;
				} else if ($.petInfo.petStatus === 6) {
					TempBaipiao += `【东东萌宠】未选择物品! \n`;
					allWarnMessage += `【账号🆔】未选择物品! (东东萌宠)\n`;
				} else if (response.resultCode === '0') {
					ReturnMessage += `【东东萌宠】${$.petInfo.goodsInfo.goodsName}`;
					ReturnMessage += `(${(response.result.medalPercent).toFixed(0)}%,${response.result.medalNum}/${response.result.medalNum+response.result.needCollectMedalNum}块)\n`;
				} else if (!$.petInfo.goodsInfo) {
					ReturnMessage += `【东东萌宠】暂未选购新的商品!\n`;
					TempBaipiao += `【东东萌宠】暂未选购新的商品! \n`;
					allWarnMessage += `【账号🆔】暂未选购新的商品! (东东萌宠)\n`;
				}
			}
		}
	}
	
	if(strGuoqi){		
		ReturnMessage += `💸💸💸临期京豆明细💸💸💸\n`;
		ReturnMessage += `${strGuoqi}`;
	}
	ReturnMessage += `🧧🧧🧧红包明细🧧🧧🧧\n`;
	ReturnMessage += `${$.message}`;
	strsummary +=`${$.message}`;
	
	if($.YunFeiQuan){
		var strTempYF="【免运费券】"+$.YunFeiQuan+"张";
		if($.YunFeiQuanEndTime)
			strTempYF+="(有效期至"+$.YunFeiQuanEndTime+")";
		strTempYF+="\n";
		ReturnMessage +=strTempYF
		strsummary +=strTempYF;
	}
	if($.YunFeiQuan2){
		var strTempYF2="【免运费券】"+$.YunFeiQuan2+"张";
		if($.YunFeiQuanEndTime2)
			strTempYF+="(有效期至"+$.YunFeiQuanEndTime2+")";
		strTempYF2+="\n";
		ReturnMessage +=strTempYF2
		strsummary +=strTempYF2;
	}
	
	allMessage += ReturnMessageTitle+ReturnMessage + `\n`;

	console.log(`${ReturnMessageTitle+ReturnMessage}`);
}
async function bean() {
	// console.log(`北京时间零点时间戳:${parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000}`);
	// console.log(`北京时间2020-10-28 06:16:05::${new Date("2020/10/28 06:16:05+08:00").getTime()}`)
	// 不管哪个时区。得到都是当前时刻北京时间的时间戳 new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000

	//前一天的0:0:0时间戳
	const tm = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 - (24 * 60 * 60 * 1000);
	// 今天0:0:0时间戳
	const tm1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
	let page = 1,
	t = 0,
	yesterdayArr = [],
	todayArr = [];
	do {
		let response = await getJingBeanBalanceDetail(page);		
		// console.log(`第${page}页: ${JSON.stringify(response)}`);
		if (response && response.code === "0") {
			page++;
			let detailList = response.detailList;
			if (detailList && detailList.length > 0) {
				for (let item of detailList) {
					const date = item.date.replace(/-/g, '/') + "+08:00";
					if (new Date(date).getTime() >= tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
						todayArr.push(item);
					} else if (tm <= new Date(date).getTime() && new Date(date).getTime() < tm1 && (!item['eventMassage'].includes("退还") && !item['eventMassage'].includes('扣赠'))) {
						//昨日的
						yesterdayArr.push(item);
					} else if (tm > new Date(date).getTime()) {
						//前天的
						t = 1;
						break;
					}
				}
			} else {
				$.errorMsg = `数据异常`;
				$.msg($.name, ``, `账号${$.index}：${$.nickName}\n${$.errorMsg}`);
				t = 1;
			}
		} else if (response && response.code === "3") {
			console.log(`cookie已过期，或者填写不规范，跳出`)
			t = 1;
		} else {
			console.log(`未知情况：${JSON.stringify(response)}`);
			console.log(`未知情况，跳出`)
			t = 1;
		}
	} while (t === 0);
	for (let item of yesterdayArr) {
		if (Number(item.amount) > 0) {
			$.incomeBean += Number(item.amount);
		} else if (Number(item.amount) < 0) {
			$.expenseBean += Number(item.amount);
		}
	}
	for (let item of todayArr) {
		if (Number(item.amount) > 0) {
			$.todayIncomeBean += Number(item.amount);
		} else if (Number(item.amount) < 0) {
			$.todayOutcomeBean += Number(item.amount);
		}
	}
	$.todayOutcomeBean = -$.todayOutcomeBean;
	$.expenseBean = -$.expenseBean;
	
	decExBean =0;
	if(EnableOverBean)
		await queryexpirejingdou();//过期京豆		
	await redPacket();
	
	if(EnableChaQuan)
		await getCoupon();
}

async function jdJxMCinfo(){
    if (EnableJxMC) {
        llgeterror = false;
        await requestAlgo();
        if (llgeterror) {
            console.log(`等待10秒后再次尝试...`)
            await $.wait(10 * 1000);
            await requestAlgo();
        }
        await JxmcGetRequest();
    }
	return;
}
async function jdCash() {
	if (!EnableCash)
		return;
    let functionId = "cash_homePage";
    let sign = `body=%7B%7D&build=167968&client=apple&clientVersion=10.4.0&d_brand=apple&d_model=iPhone13%2C3&ef=1&eid=eidI25488122a6s9Uqq6qodtQx6rgQhFlHkaE1KqvCRbzRnPZgP/93P%2BzfeY8nyrCw1FMzlQ1pE4X9JdmFEYKWdd1VxutadX0iJ6xedL%2BVBrSHCeDGV1&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJO3CMeyDJCy%22%2C%22osVersion%22%3A%22CJUkDK%3D%3D%22%2C%22openudid%22%3A%22CJSmCWU0DNYnYtS0DtGmCJY0YJcmDwCmYJC0DNHwZNc5ZQU2DJc3Zq%3D%3D%22%2C%22area%22%3A%22CJZpCJCmC180ENcnCv80ENc1EK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1648428189%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=104&lang=zh_CN&networkType=3g&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=11&sign=98c0ea91318ef1313786d86d832f1d4d&st=1648428208392&sv=101&uemps=0-0&uts=0f31TVRjBSv7E8yLFU2g86XnPdLdKKyuazYDek9RnAdkKCbH50GbhlCSab3I2jwM04d75h5qDPiLMTl0I3dvlb3OFGnqX9NrfHUwDOpTEaxACTwWl6n//EOFSpqtKDhg%2BvlR1wAh0RSZ3J87iAf36Ce6nonmQvQAva7GoJM9Nbtdah0dgzXboUL2m5YqrJ1hWoxhCecLcrUWWbHTyAY3Rw%3D%3D`
        return new Promise((resolve) => {
            $.post(apptaskUrl(functionId, sign), async(err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`jdCash API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if (data.code === 0 && data.data.result) {
                                $.jdCash = data.data.result.totalMoney || 0;
                                return
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                }
                finally {
                    resolve(data);
                }
            })
        })
}
function apptaskUrl(functionId = "", body = "") {
  return {
    url: `${JD_API_HOST}?functionId=${functionId}`,
    body,
    headers: {
      'Cookie': cookie,
      'Host': 'api.m.jd.com',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': '',
      'User-Agent': 'JD4iPhone/167774 (iPhone; iOS 14.7.1; Scale/3.00)',
      'Accept-Language': 'zh-Hans-CN;q=1',
      'Accept-Encoding': 'gzip, deflate, br',
    },
    timeout: 10000
  }
}
function getSign(functionId, body) {
  return new Promise(async resolve => {
    let data = {
      functionId,
      body: JSON.stringify(body),
      "client":"apple",
      "clientVersion":"10.3.0"
    }
    let HostArr = ['jdsign.cf', 'signer.nz.lu']
    let Host = HostArr[Math.floor((Math.random() * HostArr.length))]
    let options = {
      url: `https://cdn.nz.lu/ddo`,
      body: JSON.stringify(data),
      headers: {
        Host,
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      timeout: 30 * 1000
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(JSON.stringify(err))
          console.log(`${$.name} getSign API请求失败，请检查网路重试`)
        } else {

        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
function TotalBean() {
	return new Promise(async resolve => {
		const options = {
			url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
			headers: {
				Cookie: cookie,
				"User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
			},
			timeout: 10000
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err)
				} else {
					if (data) {
						data = JSON.parse(data);

						if (data['retcode'] === "1001") {
							$.isLogin = false; //cookie过期
							return;
						}
						if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
							$.nickName = data.data.userInfo.baseInfo.nickname;
							$.levelName = data.data.userInfo.baseInfo.levelName;
							$.isPlusVip = data.data.userInfo.isPlusVip;

						}
						if (data['retcode'] === '0' && data.data && data.data['assetInfo']) {
							if ($.beanCount == 0)
								$.beanCount = data.data && data.data['assetInfo']['beanNum'];
						} else {
							$.errorMsg = `数据异常`;
						}
					} else {
						$.log('京东服务器返回空数据,将无法获取等级及VIP信息');
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
function TotalBean2() {
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
			timeout: 10000
		};
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					$.logErr(err);
				} else {
					if (data) {						
						data = JSON.parse(data);						
						if (!data.user) {
							return;
						}
						const userInfo = data.user;						
						if (userInfo) {
							if (!$.nickName)
								$.nickName = userInfo.petName;
							if ($.beanCount == 0) {
								$.beanCount = userInfo.jingBean;
							}
							$.JingXiang = userInfo.uclass;
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

function isLoginByX1a0He() {
	return new Promise((resolve) => {
		const options = {
			url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
			headers: {
				"Cookie": cookie,
				"referer": "https://h5.m.jd.com/",
				"User-Agent": "jdapp;iPhone;10.1.2;15.0;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
			},
			timeout: 10000
		}
		$.get(options, (err, resp, data) => {
			try {
				if (data) {
					data = JSON.parse(data);
					if (data.islogin === "1") {
						console.log(`使用X1a0He写的接口加强检测: Cookie有效\n`)
					} else if (data.islogin === "0") {
						$.isLogin = false;
						console.log(`使用X1a0He写的接口加强检测: Cookie无效\n`)
					} else {
						console.log(`使用X1a0He写的接口加强检测: 未知返回，不作变更...\n`)
						$.error = `${$.nickName} :` + `使用X1a0He写的接口加强检测: 未知返回...\n`
					}
				}
			} catch (e) {
				console.log(e);
			}
			finally {
				resolve();
			}
		});
	});
}

function getJingBeanBalanceDetail(page) {
	return new Promise(async resolve => {
		const options = {
			"url": `https://api.m.jd.com/client.action?functionId=getJingBeanBalanceDetail`,
			"body": `body=${escape(JSON.stringify({"pageSize": "20", "page": page.toString()}))}&appid=ld`,
			"headers": {
				'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
				'Host': 'api.m.jd.com',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie': cookie,
			}
		}
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`getJingBeanBalanceDetail API请求失败，请检查网路重试`)
				} else {
					if (data) {
						data = JSON.parse(data);
						// console.log(data)
					} else {
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}
function queryexpirejingdou() {
	return new Promise(async resolve => {
		const options = {
			"url": `https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=${Date.now()}&g_login_type=1&sceneval=2`,
			"headers": {
				"Accept": "*/*",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-cn",
				"Connection": "keep-alive",
				"Cookie": cookie,
				"Host": "wq.jd.com",
				"Referer": "https://wqs.jd.com/promote/201801/bean/mybean.html",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`queryexpirejingdou API请求失败，请检查网路重试`)
				} else {
					if (data) {
						// console.log(data)
						data = JSON.parse(data.slice(23, -13));
						if (data.ret === 0) {							
							data['expirejingdou'].map(item => {
								if(item['expireamount']!=0){																	
									strGuoqi+=`【${timeFormat(item['time'] * 1000)}】过期${item['expireamount']}豆\n`;
									if (decExBean==0)
										decExBean=item['expireamount'];
								}
							})							
						}
					} else {
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}
function exchangejxbeans(o) {
    return new Promise(async resolve => {
		var UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');		
		var JXUA = `jdpingou;iPhone;4.13.0;14.4.2;${UUID};network/wifi;model/iPhone10,2;appBuild/100609;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`;
        const options = {
            "url": `https://m.jingxi.com/deal/masset/jd2xd?use=${o}&canpintuan=&setdefcoupon=0&r=${Math.random()}&sceneval=2`,
            "headers": {
                "Host": "m.jingxi.com",
                "Accept": "*/*",
                "Cookie": cookie,
                "Connection": "keep-alive",
                "User-Agent": JXUA,
                "Accept-Language": "zh-cn",
                "Referer": "https://m.jingxi.com/deal/confirmorder/main",
                "Accept-Encoding": "gzip, deflate, br",
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(err);
                } else {
                    data = JSON.parse(data);
                    if (data && data.data && JSON.stringify(data.data) === '{}') {
                        console.log(JSON.stringify(data))
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data || {});
            }
        })
    })
}
function getUUID(x = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", t = 0) {
    return x.replace(/[xy]/g, function (x) {
        var r = 16 * Math.random() | 0,
        n = "x" == x ? r : 3 & r | 8;
        return uuid = t ? n.toString(36).toUpperCase() : n.toString(36),
        uuid
    })
}

function redPacket() {
	return new Promise(async resolve => {
		const options = {
			"url": `https://m.jingxi.com/user/info/QueryUserRedEnvelopesV2?type=1&orgFlag=JD_PinGou_New&page=1&cashRedType=1&redBalanceFlag=1&channel=1&_=${+new Date()}&sceneval=2&g_login_type=1&g_ty=ls`,
			"headers": {
				'Host': 'm.jingxi.com',
				'Accept': '*/*',
				'Connection': 'keep-alive',
				'Accept-Language': 'zh-cn',
				'Referer': 'https://st.jingxi.com/my/redpacket.shtml?newPg=App&jxsid=16156262265849285961',
				'Accept-Encoding': 'gzip, deflate, br',
				"Cookie": cookie,
				'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
			}
		}
		$.get(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`redPacket API请求失败，请检查网路重试`)
				} else {
					if (data) {
						data = JSON.parse(data).data;
						$.jxRed = 0,
						$.jsRed = 0,
						$.jdRed = 0,
						$.jdhRed = 0,
						$.jxRedExpire = 0,
						$.jsRedExpire = 0,
						$.jdRedExpire = 0,
						$.jdhRedExpire = 0;
						let t = new Date();
						t.setDate(t.getDate() + 1);
						t.setHours(0, 0, 0, 0);
						t = parseInt((t - 1) / 1000);
						for (let vo of data.useRedInfo.redList || []) {
							if (vo.orgLimitStr && vo.orgLimitStr.includes("京喜")) {
								$.jxRed += parseFloat(vo.balance)
								if (vo['endTime'] === t) {
									$.jxRedExpire += parseFloat(vo.balance)
								}
							} else if (vo.activityName.includes("极速版")) {
								$.jsRed += parseFloat(vo.balance)
								if (vo['endTime'] === t) {
									$.jsRedExpire += parseFloat(vo.balance)
								}
							} else if (vo.orgLimitStr && vo.orgLimitStr.includes("京东健康")) {
								$.jdhRed += parseFloat(vo.balance)
								if (vo['endTime'] === t) {
									$.jdhRedExpire += parseFloat(vo.balance)
								}
							} else {
								$.jdRed += parseFloat(vo.balance)
								if (vo['endTime'] === t) {
									$.jdRedExpire += parseFloat(vo.balance)
								}
							}
						}
						$.jxRed = $.jxRed.toFixed(2);
						$.jsRed = $.jsRed.toFixed(2);
						$.jdRed = $.jdRed.toFixed(2);
						$.jdhRed = $.jdhRed.toFixed(2);
						$.balance = data.balance;
						$.expiredBalance = ($.jxRedExpire + $.jsRedExpire + $.jdRedExpire).toFixed(2);
						$.message += `【红包总额】${$.balance}(总过期${$.expiredBalance})元 \n`;
						if ($.jxRed > 0)
							$.message += `【京喜红包】${$.jxRed}(将过期${$.jxRedExpire.toFixed(2)})元 \n`;
						if ($.jsRed > 0)
							$.message += `【极速红包】${$.jsRed}(将过期${$.jsRedExpire.toFixed(2)})元 \n`;
						if ($.jdRed > 0)
							$.message += `【京东红包】${$.jdRed}(将过期${$.jdRedExpire.toFixed(2)})元 \n`;
						if ($.jdhRed > 0)
							$.message += `【健康红包】${$.jdhRed}(将过期${$.jdhRedExpire.toFixed(2)})元 \n`;
					} else {
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}

function getCoupon() {
    return new Promise(resolve => {
        let options = {
            url: `https://wq.jd.com/activeapi/queryjdcouponlistwithfinance?state=1&wxadd=1&filterswitch=1&_=${Date.now()}&sceneval=2&g_login_type=1&callback=jsonpCBKB&g_ty=ls`,
            headers: {
                'authority': 'wq.jd.com',
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'accept': '*/*',
                'referer': 'https://wqs.jd.com/',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'cookie': cookie
            },
			timeout: 10000
        }
        $.get(options, async(err, resp, data) => {
            try {
                data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);
                let couponTitle = '';
                let couponId = '';
                // 删除可使用且非超市、生鲜、京贴;
                let useable = data.coupon.useable;
                $.todayEndTime = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 999)).getTime();
                $.tomorrowEndTime = new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999)).getTime();
				$.platFormInfo="";
				//console.log(useable);
                for (let i = 0; i < useable.length; i++) {
					//console.log(useable[i]);
                    if (useable[i].limitStr.indexOf('全品类') > -1) {
                        $.beginTime = useable[i].beginTime;
                        if ($.beginTime < new Date().getTime() && useable[i].quota < 20 && useable[i].coupontype === 1) {                           
							//$.couponEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
                            $.couponName = useable[i].limitStr;
							if (useable[i].platFormInfo) 
								$.platFormInfo = useable[i].platFormInfo;
							var decquota=parseFloat(useable[i].quota).toFixed(2);
							var decdisc= parseFloat(useable[i].discount).toFixed(2);
							
							$.message += `【全品类券】满${decquota}减${decdisc}元`;
							
							if (useable[i].endTime < $.todayEndTime) {
								$.message += `(今日过期,${$.platFormInfo})\n`;
							} else if (useable[i].endTime < $.tomorrowEndTime) {
								$.message += `(明日将过期,${$.platFormInfo})\n`;
							} else {
								$.message += `(${$.platFormInfo})\n`;
							}
							
                        }
                    }
					if (useable[i].couponTitle.indexOf('运费券') > -1 && useable[i].limitStr.indexOf('自营商品运费') > -1) {
					    if (!$.YunFeiTitle) {
					        $.YunFeiTitle = useable[i].couponTitle;
					        $.YunFeiQuanEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					        $.YunFeiQuan += 1;
					    } else {
					        if ($.YunFeiTitle == useable[i].couponTitle) {
					            $.YunFeiQuanEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					            $.YunFeiQuan += 1;
					        } else {
					            if (!$.YunFeiTitle2)
					                $.YunFeiTitle2 = useable[i].couponTitle;
								
					            if ($.YunFeiTitle2 == useable[i].couponTitle) {
					                $.YunFeiQuanEndTime2 = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
					                $.YunFeiQuan2 += 1;
					            }
					        }

					    }

					}
                    /* if (useable[i].couponTitle.indexOf('极速版APP活动') > -1) {						
                        $.couponEndTime = useable[i].endTime;
                        $.startIndex = useable[i].couponTitle.indexOf('-') - 3;
                        $.endIndex = useable[i].couponTitle.indexOf('元') + 1;
                        $.couponName = useable[i].couponTitle.substring($.startIndex, $.endIndex);

                        if ($.couponEndTime < $.todayEndTime) {
                            $.message += `【极速版券】${$.couponName}(今日过期)\n`;
                        } else if ($.couponEndTime < $.tomorrowEndTime) {
                            $.message += `【极速版券】${$.couponName}(明日将过期)\n`;
                        } else {
                            $.couponEndTime = timeFormat(parseInt($.couponEndTime));
                            $.message += `【极速版券】${$.couponName}(有效期至${$.couponEndTime})\n`;
                        }

                    } */
                    //8是支付券， 7是白条券
                    if (useable[i].couponStyle == 7 || useable[i].couponStyle == 8) {
                        $.beginTime = useable[i].beginTime;
                        if ($.beginTime > new Date().getTime() || useable[i].quota > 50 || useable[i].coupontype != 1) {
                            continue;
                        }
                        
                        if (useable[i].couponStyle == 8) {
                            $.couponType = "支付立减";
                        }else{
							$.couponType = "白条优惠";
						}
						if(useable[i].discount<useable[i].quota)
							$.message += `【${$.couponType}】满${useable[i].quota}减${useable[i].discount}元`;
						else
							$.message += `【${$.couponType}】立减${useable[i].discount}元`;
                        if (useable[i].platFormInfo) 
                            $.platFormInfo = useable[i].platFormInfo;                            
                        
                        //$.couponEndTime = new Date(parseInt(useable[i].endTime)).Format('yyyy-MM-dd');
						
                        if (useable[i].endTime < $.todayEndTime) {
                            $.message += `(今日过期,${$.platFormInfo})\n`;
                        } else if (useable[i].endTime < $.tomorrowEndTime) {
                            $.message += `(明日将过期,${$.platFormInfo})\n`;
                        } else {
                            $.message += `(${$.platFormInfo})\n`;
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            }
            finally {
                resolve();
            }
        })
    })
}

function getJdZZ() {
	if (!EnableJdZZ)
		return;
	return new Promise(resolve => {
		$.get(taskJDZZUrl("interactTaskIndex"), async(err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`);
					console.log(`京东赚赚API请求失败，请检查网路重试`);
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);						
						$.JdzzNum = data.data.totalNum;
					}
				}
			} catch (e) {
				//$.logErr(e, resp)
				console.log(`京东赚赚数据获取失败`);
			}
			finally {
				resolve(data);
			}
		})
	})
}

function taskJDZZUrl(functionId, body = {}) {
	return {
		url: `${JD_API_HOST}?functionId=${functionId}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=9.1.0`,
		headers: {
			'Cookie': cookie,
			'Host': 'api.m.jd.com',
			'Connection': 'keep-alive',
			'Content-Type': 'application/json',
			'Referer': 'http://wq.jd.com/wxapp/pages/hd-interaction/index/index',
			'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
			'Accept-Language': 'zh-cn',
			'Accept-Encoding': 'gzip, deflate, br',
		},
		timeout: 10000
	}
}

function getMs() {
	if (!EnableJdMs)
		return;
	return new Promise(resolve => {
		$.post(taskMsPostUrl('homePageV2', {}, 'appid=SecKill2020'), (err, resp, data) => {
			try {
				if (err) {
					console.log(`${err},${jsonParse(resp.body)['message']}`)
					console.log(`getMs API请求失败，请检查网路重试`)
				} else {
					if (safeGet(data)) {
						//console.log("Debug :" + JSON.stringify(data));
						data = JSON.parse(data);						
						if (data.result.assignment.assignmentPoints) {
							$.JdMsScore = data.result.assignment.assignmentPoints || 0
						}
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}

function taskMsPostUrl(function_id, body = {}, extra = '', function_id2) {
	let url = `${JD_API_HOST}`;
	if (function_id2) {
		url += `?functionId=${function_id2}`;
	}
	return {
		url,
		body: `functionId=${function_id}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.0.0&${extra}`,
		headers: {
			"Cookie": cookie,
			"origin": "https://h5.m.jd.com",
			"referer": "https://h5.m.jd.com/babelDiy/Zeus/2NUvze9e1uWf4amBhe1AV6ynmSuH/index.html",
			'Content-Type': 'application/x-www-form-urlencoded',
			"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
		},
		timeout: 10000
	}
}

function jdfruitRequest(function_id, body = {}, timeout = 1000) {
	return new Promise(resolve => {
		setTimeout(() => {
			$.get(taskfruitUrl(function_id, body), (err, resp, data) => {
				try {
					if (err) {
						console.log('\n东东农场: API查询请求失败 ‼️‼️')
						console.log(JSON.stringify(err));
						console.log(`function_id:${function_id}`)
						$.logErr(err);
					} else {
						if (safeGet(data)) {
							data = JSON.parse(data);
							$.JDwaterEveryDayT = data.totalWaterTaskInit.totalWaterTaskTimes;
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				}
				finally {
					resolve(data);
				}
			})
		}, timeout)
	})
}

async function getjdfruitinfo() {
    if (EnableJdFruit) {
        llgeterror = false;

        await jdfruitRequest('taskInitForFarm', {
            "version": 14,
            "channel": 1,
            "babelChannel": "120"
        });

        await getjdfruit();
        if (llgeterror) {
            console.log(`东东农场API查询失败,等待10秒后再次尝试...`)
            await $.wait(10 * 1000);
            await getjdfruit();
        }
        if (llgeterror) {
            console.log(`东东农场API查询失败,有空重启路由器换个IP吧.`)
        }

    }
	return;
}

async function GetJxBeaninfo() {
    await GetJxBean(),
    await jxbean();
	return;
}

async function getjdfruit() {
	return new Promise(resolve => {
		const option = {
			url: `${JD_API_HOST}?functionId=initForFarm`,
			body: `body=${escape(JSON.stringify({"version":4}))}&appid=wh5&clientVersion=9.1.0`,
			headers: {
				"accept": "*/*",
				"accept-encoding": "gzip, deflate, br",
				"accept-language": "zh-CN,zh;q=0.9",
				"cache-control": "no-cache",
				"cookie": cookie,
				"origin": "https://home.m.jd.com",
				"pragma": "no-cache",
				"referer": "https://home.m.jd.com/myJd/newhome.action",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
				"User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
				"Content-Type": "application/x-www-form-urlencoded"
			},
			timeout: 10000
		};
		$.post(option, (err, resp, data) => {
			try {
				if (err) {
					if(!llgeterror){
						console.log('\n东东农场: API查询请求失败 ‼️‼️');
						console.log(JSON.stringify(err));
					}
					llgeterror = true;
				} else {
					llgeterror = false;
					if (safeGet(data)) {
						$.farmInfo = JSON.parse(data)
							if ($.farmInfo.farmUserPro) {
								$.JdFarmProdName = $.farmInfo.farmUserPro.name;
								$.JdtreeEnergy = $.farmInfo.farmUserPro.treeEnergy;
								$.JdtreeTotalEnergy = $.farmInfo.farmUserPro.treeTotalEnergy;
								$.treeState = $.farmInfo.treeState;
								let waterEveryDayT = $.JDwaterEveryDayT;
								let waterTotalT = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy - $.farmInfo.farmUserPro.totalEnergy) / 10; //一共还需浇多少次水
								let waterD = Math.ceil(waterTotalT / waterEveryDayT);

								$.JdwaterTotalT = waterTotalT;
								$.JdwaterD = waterD;
							}
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

async function PetRequest(function_id, body = {}) {
	await $.wait(3000);
	return new Promise((resolve, reject) => {
		$.post(taskPetUrl(function_id, body), (err, resp, data) => {
			try {
				if (err) {
					llPetError=true;
					console.log('\n东东萌宠: API查询请求失败 ‼️‼️');
					console.log(JSON.stringify(err));
					$.logErr(err);
				} else {
					data = JSON.parse(data);
				}
			} catch (e) {
				$.logErr(e, resp);
			}
			finally {
				resolve(data)
			}
		})
	})
}
function taskPetUrl(function_id, body = {}) {
	body["version"] = 2;
	body["channel"] = 'app';
	return {
		url: `${JD_API_HOST}?functionId=${function_id}`,
		body: `body=${escape(JSON.stringify(body))}&appid=wh5&loginWQBiz=pet-town&clientVersion=9.0.4`,
		headers: {
			'Cookie': cookie,
			'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
			'Host': 'api.m.jd.com',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		timeout: 10000
	};
}

function taskfruitUrl(function_id, body = {}) {
  return {
    url: `${JD_API_HOST}?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&appid=wh5`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": cookie
    },
    timeout: 10000
  }
}

function safeGet(data) {
	try {
		if (typeof JSON.parse(data) == "object") {
			return true;
		}
	} catch (e) {
		console.log(e);
		console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
		return false;
	}
}

function cash() {
	if (!EnableJdSpeed)
		return;
	return new Promise(resolve => {
		$.get(taskcashUrl('MyAssetsService.execute', {
				"method": "userCashRecord",
				"data": {
					"channel": 1,
					"pageNum": 1,
					"pageSize": 20
				}
			}),
			async(err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`cash API请求失败，请检查网路重试`)
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data.data.goldBalance)
							$.JDtotalcash = data.data.goldBalance;
						else
							console.log(`领现金查询失败，服务器没有返回具体值.`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve(data);
			}
		})
	})
}

var __Oxb24bc = ["lite-android&", "stringify", "&android&3.1.0&", "&", "&846c4c32dae910ef", "12aea658f76e453faf803d15c40a72e0", "isNode", "crypto-js", "", "api?functionId=", "&body=", "&appid=lite-android&client=android&uuid=846c4c32dae910ef&clientVersion=3.1.0&t=", "&sign=", "api.m.jd.com", "*/*", "RN", "JDMobileLite/3.1.0 (iPad; iOS 14.4; Scale/2.00)", "zh-Hans-CN;q=1, ja-CN;q=0.9", "undefined", "log", "", "", "", "", "jsjia", "mi.com"];

function taskcashUrl(_0x7683x2, _0x7683x3 = {}) {
	let _0x7683x4 = +new Date();
	let _0x7683x5 = `${__Oxb24bc[0x0]}${JSON[__Oxb24bc[0x1]](_0x7683x3)}${__Oxb24bc[0x2]}${_0x7683x2}${__Oxb24bc[0x3]}${_0x7683x4}${__Oxb24bc[0x4]}`;
	let _0x7683x6 = __Oxb24bc[0x5];
	const _0x7683x7 = $[__Oxb24bc[0x6]]() ? require(__Oxb24bc[0x7]) : CryptoJS;
	let _0x7683x8 = _0x7683x7.HmacSHA256(_0x7683x5, _0x7683x6).toString();
	return {
		url: `${__Oxb24bc[0x8]}${JD_API_HOST}${__Oxb24bc[0x9]}${_0x7683x2}${__Oxb24bc[0xa]}${escape(JSON[__Oxb24bc[0x1]](_0x7683x3))}${__Oxb24bc[0xb]}${_0x7683x4}${__Oxb24bc[0xc]}${_0x7683x8}${__Oxb24bc[0x8]}`,
		headers: {
			'Host': __Oxb24bc[0xd],
			'accept': __Oxb24bc[0xe],
			'kernelplatform': __Oxb24bc[0xf],
			'user-agent': __Oxb24bc[0x10],
			'accept-language': __Oxb24bc[0x11],
			'Cookie': cookie
		},
		timeout: 10000
	}
}
(function (_0x7683x9, _0x7683xa, _0x7683xb, _0x7683xc, _0x7683xd, _0x7683xe) {
	_0x7683xe = __Oxb24bc[0x12];
	_0x7683xc = function (_0x7683xf) {
		if (typeof alert !== _0x7683xe) {
			alert(_0x7683xf)
		};
		if (typeof console !== _0x7683xe) {
			console[__Oxb24bc[0x13]](_0x7683xf)
		}
	};
	_0x7683xb = function (_0x7683x7, _0x7683x9) {
		return _0x7683x7 + _0x7683x9
	};
	_0x7683xd = _0x7683xb(__Oxb24bc[0x14], _0x7683xb(_0x7683xb(__Oxb24bc[0x15], __Oxb24bc[0x16]), __Oxb24bc[0x17]));
	try {
		_0x7683x9 = __encode;
		if (!(typeof _0x7683x9 !== _0x7683xe && _0x7683x9 === _0x7683xb(__Oxb24bc[0x18], __Oxb24bc[0x19]))) {
			_0x7683xc(_0x7683xd)
		}
	} catch (e) {
		_0x7683xc(_0x7683xd)
	}
})({})

async function JxmcGetRequest() {
	let url = ``;
	let myRequest = ``;
	url = `https://m.jingxi.com/jxmc/queryservice/GetHomePageInfo?channel=7&sceneid=1001&activeid=null&activekey=null&isgift=1&isquerypicksite=1&_stk=channel%2Csceneid&_ste=1`;
	url += `&h5st=${decrypt(Date.now(), '', '', url)}&_=${Date.now() + 2}&sceneval=2&g_login_type=1&callback=jsonpCBK${String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0))}&g_ty=ls`;
	myRequest = getGetRequest(`GetHomePageInfo`, url);

	return new Promise(async resolve => {
		$.get(myRequest, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`JxmcGetRequest API请求失败，请检查网路重试`)
					$.runFlag = false;
					console.log(`请求失败`)
				} else {
					data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);
					if (data.ret === 0) {
						$.JDEggcnt = data.data.eggcnt;
					}
				}
			} catch (e) {
				console.log(data);
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

// 惊喜工厂信息查询
function getJxFactory() {
	if (!EnableJxGC)
		return;
	return new Promise(async resolve => {
		let infoMsg = "";
		let strTemp = "";
		await $.get(jxTaskurl('userinfo/GetUserInfo', `pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&source=`, '_time,materialTuanId,materialTuanPin,pin,sharePin,shareType,source,zone'), async(err, resp, data) => {
			try {
				if (err) {
					$.jxFactoryInfo = "";
					//console.log("jx工厂查询失败"  + err)
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data['ret'] === 0) {
							data = data['data'];
							$.unActive = true; //标记是否开启了京喜活动或者选购了商品进行生产
							if (data.factoryList && data.productionList) {
								const production = data.productionList[0];
								const factory = data.factoryList[0];
								//const productionStage = data.productionStage;
								$.commodityDimId = production.commodityDimId;
								// subTitle = data.user.pin;
								await GetCommodityDetails(); //获取已选购的商品信息
								infoMsg = `${$.jxProductName}(${((production.investedElectric / production.needElectric) * 100).toFixed(0)}%`;
								if (production.investedElectric >= production.needElectric) {
									if (production['exchangeStatus'] === 1) {
										infoMsg = `${$.jxProductName}已可兑换`;
										$.jxFactoryReceive = `${$.jxProductName}`;
									}
									if (production['exchangeStatus'] === 3) {
										if (new Date().getHours() === 9) {
											infoMsg = `兑换超时，请重选商品!`;
										}
									}
									// await exchangeProNotify()
								} else {
									strTemp = `,${((production.needElectric - production.investedElectric) / (2 * 60 * 60 * 24)).toFixed(0)}天)`;
									if (strTemp == ",0天)")
										infoMsg += ",今天)";
									else
										infoMsg += strTemp;
								}
								if (production.status === 3) {
									infoMsg = "商品已失效，请重选商品!";
								}
							} else {
								$.unActive = false; //标记是否开启了京喜活动或者选购了商品进行生产
								if (!data.factoryList) {
									infoMsg = ""
										// $.msg($.name, '【提示】', `京东账号${$.index}[${$.nickName}]京喜工厂活动未开始\n请手动去京东APP->游戏与互动->查看更多->京喜工厂 开启活动`);
								} else if (data.factoryList && !data.productionList) {
									infoMsg = ""
								}
							}
						}
					} else {
						console.log(`GetUserInfo异常：${JSON.stringify(data)}`)
					}
				}
				$.jxFactoryInfo = infoMsg;
				// console.log(infoMsg);
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

// 惊喜的Taskurl
function jxTaskurl(functionId, body = '', stk) {
	let url = `https://m.jingxi.com/dreamfactory/${functionId}?zone=dream_factory&${body}&sceneval=2&g_login_type=1&_time=${Date.now()}&_=${Date.now() + 2}&_ste=1`
		url += `&h5st=${decrypt(Date.now(), stk, '', url)}`
		if (stk) {
			url += `&_stk=${encodeURIComponent(stk)}`;
		}
		return {
		url,
		headers: {
			'Cookie': cookie,
			'Host': 'm.jingxi.com',
			'Accept': '*/*',
			'Connection': 'keep-alive',
			'User-Agent': functionId === 'AssistFriend' ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36" : 'jdpingou',
			'Accept-Language': 'zh-cn',
			'Referer': 'https://wqsd.jd.com/pingou/dream_factory/index.html',
			'Accept-Encoding': 'gzip, deflate, br',
		},
		timeout: 10000
	}
}

//惊喜查询当前生产的商品名称
function GetCommodityDetails() {
	return new Promise(async resolve => {
		// const url = `/dreamfactory/diminfo/GetCommodityDetails?zone=dream_factory&sceneval=2&g_login_type=1&commodityId=${$.commodityDimId}`;
		$.get(jxTaskurl('diminfo/GetCommodityDetails', `commodityId=${$.commodityDimId}`, `_time,commodityId,zone`), (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`GetCommodityDetails API请求失败，请检查网路重试`)
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data['ret'] === 0) {
							data = data['data'];
							$.jxProductName = data['commodityList'][0].name;
						} else {
							console.log(`GetCommodityDetails异常：${JSON.stringify(data)}`)
						}
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

// 东东工厂信息查询
async function getDdFactoryInfo() {
	if (!EnableJDGC)
		return;
	// 当心仪的商品存在，并且收集起来的电量满足当前商品所需，就投入
	let infoMsg = "";
	return new Promise(resolve => {
		$.post(ddFactoryTaskUrl('jdfactory_getHomeData'), async(err, resp, data) => {
			try {
				if (err) {
					$.ddFactoryInfo = "获取失败!"
						/*console.log(`${JSON.stringify(err)}`)
						console.log(`${$.name} API请求失败，请检查网路重试`)*/
				} else {
					if (safeGet(data)) {
						data = JSON.parse(data);
						if (data.data.bizCode === 0) {
							// $.newUser = data.data.result.newUser;
							//let wantProduct = $.isNode() ? (process.env.FACTORAY_WANTPRODUCT_NAME ? process.env.FACTORAY_WANTPRODUCT_NAME : wantProduct) : ($.getdata('FACTORAY_WANTPRODUCT_NAME') ? $.getdata('FACTORAY_WANTPRODUCT_NAME') : wantProduct);
							if (data.data.result.factoryInfo) {
								let {
									totalScore,
									useScore,
									produceScore,
									remainScore,
									couponCount,
									name
								} = data.data.result.factoryInfo;
								if (couponCount == 0) {
									infoMsg = `${name} 没货了,死了这条心吧!`
								} else {
									infoMsg = `${name}(${((remainScore * 1 + useScore * 1) / (totalScore * 1)* 100).toFixed(0)}%,剩${couponCount})`
								}
								if (((remainScore * 1 + useScore * 1) >= totalScore * 1 + 100000) && (couponCount * 1 > 0)) {
									// await jdfactory_addEnergy();
									infoMsg = `${name} 可以兑换了!`
										$.DdFactoryReceive = `${name}`;

								}

							} else {
								infoMsg = ``
							}
						} else {
							$.ddFactoryInfo = ""
						}
					}
				}
				$.ddFactoryInfo = infoMsg;
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

function ddFactoryTaskUrl(function_id, body = {}, function_id2) {
	let url = `${JD_API_HOST}`;
	if (function_id2) {
		url += `?functionId=${function_id2}`;
	}
	return {
		url,
		body: `functionId=${function_id}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.1.0`,
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-cn",
			"Connection": "keep-alive",
			"Content-Type": "application/x-www-form-urlencoded",
			"Cookie": cookie,
			"Host": "api.m.jd.com",
			"Origin": "https://h5.m.jd.com",
			"Referer": "https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html",
			"User-Agent": "jdapp;iPhone;9.3.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/1C141FDD-C62F-425B-8033-9AAB7E4AE6A3;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167502;jdSupportDarkMode/0;pv/414.19;apprpd/Babel_Native;ref/TTTChannelViewContoller;psq/5;ads/;psn/88732f840b77821b345bf07fd71f609e6ff12f43|1701;jdv/0|iosapp|t_335139774|appshare|CopyURL|1610885480412|1610885486;adk/;app_device/IOS;pap/JA2015_311210|9.3.4|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
		},
		timeout: 10000
	}
}

async function getJoyBaseInfo(taskId = '', inviteType = '', inviterPin = '') {
	if (!EnableJoyPark)
		return;
	return new Promise(resolve => {
		$.post(taskPostClientActionUrl(`body={"taskId":"${taskId}","inviteType":"${inviteType}","inviterPin":"${inviterPin}","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&appid=activities_platform`), async(err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`汪汪乐园 API请求失败，请检查网路重试`)
				} else {
					data = JSON.parse(data);
					if (data.success) {
						$.joylevel = data.data.level;
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}
function taskPostClientActionUrl(body) {
	return {
		url: `https://api.m.jd.com/client.action?functionId=joyBaseInfo`,
		body: body,
		headers: {
			'User-Agent': $.user_agent,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Host': 'api.m.jd.com',
			'Origin': 'https://joypark.jd.com',
			'Referer': 'https://joypark.jd.com/?activityId=LsQNxL7iWDlXUs6cFl-AAg&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0',
			'Cookie': cookie,
		},
		timeout: 10000
	}
}

function taskJxUrl(functionId, body = '') {
    let url = ``;
    var UA = `jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`;

    if (body) {
        url = `https://m.jingxi.com/activeapi/${functionId}?${body}`;
        url += `&_=${Date.now() + 2}&sceneval=2&g_login_type=1&callback=jsonpCBK${String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0))}&g_ty=ls`;
    } else {
        url = `https://m.jingxi.com/activeapi/${functionId}?_=${Date.now() + 2}&sceneval=2&g_login_type=1&callback=jsonpCBK${String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0))}&g_ty=ls`;
    }
    return {
        url,
        headers: {
            "Host": "m.jingxi.com",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://st.jingxi.com/",
            "Cookie": cookie
        },
		timeout: 10000
    }
}


function GetJxBeanDetailData() {
  return new Promise((resolve) => {
    $.get(taskJxUrl("queryuserjingdoudetail","pagesize=10&type=16"), async (err, resp, data) => {
        try {
          if (err) {
            console.log(JSON.stringify(err));
            console.log(`GetJxBeanDetailData请求失败，请检查网路重试`);
          } else {
            data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);      
            
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve(data);
        }
      });
  });
}
function GetJxBean() {
    if (!EnableJxBeans)
        return;
    return new Promise((resolve) => {
        $.get(taskJxUrl("querybeanamount"), async(err, resp, data) => {
            try {
                if (err) {
                    console.log(JSON.stringify(err));
                    console.log(`GetJxBean请求失败，请检查网路重试`);
                } else {
                    data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);
                    if (data) {
                        if (data.errcode == 0) {
                            $.xibeanCount = data.data.xibean;
                            if (!$.beanCount) {
                                $.beanCount = data.data.jingbean;
                            }
                        }
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
}
async function jxbean() {
	if (!EnableJxBeans)
        return;
    //前一天的0:0:0时间戳
    const tm = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 - (24 * 60 * 60 * 1000);
    // 今天0:0:0时间戳
    const tm1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000;
    var JxYesterdayArr = [],
    JxTodayArr = [];
    var JxResponse = await GetJxBeanDetailData();
    if (JxResponse && JxResponse.ret == "0") {
        var Jxdetail = JxResponse.detail;
        if (Jxdetail && Jxdetail.length > 0) {
            for (let item of Jxdetail) {
                const date = item.createdate.replace(/-/g, '/') + "+08:00";
                if (new Date(date).getTime() >= tm1 && (!item['visibleinfo'].includes("退还") && !item['visibleinfo'].includes('扣赠'))) {
                    JxTodayArr.push(item);
                } else if (tm <= new Date(date).getTime() && new Date(date).getTime() < tm1 && (!item['visibleinfo'].includes("退还") && !item['visibleinfo'].includes('扣赠'))) {
                    //昨日的
                    JxYesterdayArr.push(item);
                } else if (tm > new Date(date).getTime()) {
                    break;
                }
            }
        } else {
            $.errorMsg = `数据异常`;
            $.msg($.name, ``, `账号${$.index}：${$.nickName}\n${$.errorMsg}`);
        }

        for (let item of JxYesterdayArr) {
            if (Number(item.amount) > 0) {
                $.inJxBean += Number(item.amount);
            } else if (Number(item.amount) < 0) {
                $.OutJxBean += Number(item.amount);
            }
        }
        for (let item of JxTodayArr) {
            if (Number(item.amount) > 0) {
                $.todayinJxBean += Number(item.amount);
            } else if (Number(item.amount) < 0) {
                $.todayOutJxBean += Number(item.amount);
            }
        }
		$.todayOutJxBean = -$.todayOutJxBean;
		$.OutJxBean = -$.OutJxBean;
    }

}


	
function randomString(e) {
	e = e || 32;
	let t = "0123456789abcdef",
	a = t.length,
	n = "";
	for (let i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

function getGetRequest(type, url) {
	UA = `jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`

		const method = `GET`;
	let headers = {
		'Origin': `https://st.jingxi.com`,
		'Cookie': cookie,
		'Connection': `keep-alive`,
		'Accept': `application/json`,
		'Referer': `https://st.jingxi.com/pingou/jxmc/index.html`,
		'Host': `m.jingxi.com`,
		'User-Agent': UA,
		'Accept-Encoding': `gzip, deflate, br`,
		'Accept-Language': `zh-cn`
	};
	return {
		url: url,
		method: method,
		headers: headers,
		timeout: 10000
	};
}

Date.prototype.Format = function (fmt) {
	var e,
	n = this,
	d = fmt,
	l = {
		"M+": n.getMonth() + 1,
		"d+": n.getDate(),
		"D+": n.getDate(),
		"h+": n.getHours(),
		"H+": n.getHours(),
		"m+": n.getMinutes(),
		"s+": n.getSeconds(),
		"w+": n.getDay(),
		"q+": Math.floor((n.getMonth() + 3) / 3),
		"S+": n.getMilliseconds()
	};
	/(y+)/i.test(d) && (d = d.replace(RegExp.$1, "".concat(n.getFullYear()).substr(4 - RegExp.$1.length)));
	for (var k in l) {
		if (new RegExp("(".concat(k, ")")).test(d)) {
			var t,
			a = "S+" === k ? "000" : "00";
			d = d.replace(RegExp.$1, 1 == RegExp.$1.length ? l[k] : ("".concat(a) + l[k]).substr("".concat(l[k]).length))
		}
	}
	return d;
}

function getRemark(strRemark) {
    var strTempRemark = "";
    if (strRemark) {
        var Tempindex = strRemark.indexOf("@@");
        if (Tempindex != -1) {
			var TempRemarkList = strRemark.split("@@");
			strTempRemark=TempRemarkList[0];            
        } else{
			strTempRemark=strRemark;
		}
    }
   
    return strTempRemark;
}

function decrypt(time, stk, type, url) {
	$.appId = 10028;
	stk = stk || (url ? getJxmcUrlData(url, '_stk') : '')
		if (stk) {
			const timestamp = new Date(time).Format("yyyyMMddhhmmssSSS");
			let hash1 = '';
			if ($.fingerprint && $.Jxmctoken && $.enCryptMethodJD) {
				hash1 = $.enCryptMethodJD($.Jxmctoken, $.fingerprint.toString(), timestamp.toString(), $.appId.toString(), $.CryptoJS).toString($.CryptoJS.enc.Hex);
			} else {
				const random = '5gkjB6SpmC9s';
				$.Jxmctoken = `tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc`;
				$.fingerprint = 5287160221454703;
				const str = `${$.Jxmctoken}${$.fingerprint}${timestamp}${$.appId}${random}`;
				hash1 = $.CryptoJS.SHA512(str, $.Jxmctoken).toString($.CryptoJS.enc.Hex);
			}
			let st = '';
			stk.split(',').map((item, index) => {
				st += `${item}:${getJxmcUrlData(url, item)}${index === stk.split(',').length - 1 ? '' : '&'}`;
			})
			const hash2 = $.CryptoJS.HmacSHA256(st, hash1.toString()).toString($.CryptoJS.enc.Hex);
			return encodeURIComponent(["".concat(timestamp.toString()), "".concat($.fingerprint.toString()), "".concat($.appId.toString()), "".concat($.Jxmctoken), "".concat(hash2)].join(";"))
		} else {
			return '20210318144213808;8277529360925161;10001;tk01w952a1b73a8nU0luMGtBanZTHCgj0KFVwDa4n5pJ95T/5bxO/m54p4MtgVEwKNev1u/BUjrpWAUMZPW0Kz2RWP8v;86054c036fe3bf0991bd9a9da1a8d44dd130c6508602215e50bb1e385326779d'
		}
}

async function requestAlgo() {
	$.fingerprint = await generateFp();
	$.appId = 10028;
	const options = {
		"url": `https://cactus.jd.com/request_algo?g_ty=ajax`,
		"headers": {
			'Authority': 'cactus.jd.com',
			'Pragma': 'no-cache',
			'Cache-Control': 'no-cache',
			'Accept': 'application/json',
			'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
			//'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
			'Content-Type': 'application/json',
			'Origin': 'https://st.jingxi.com',
			'Sec-Fetch-Site': 'cross-site',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Dest': 'empty',
			'Referer': 'https://st.jingxi.com/',
			'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'
		},
		'body': JSON.stringify({
			"version": "1.0",
			"fp": $.fingerprint,
			"appId": $.appId.toString(),
			"timestamp": Date.now(),
			"platform": "web",
			"expandParams": ""
		})
	}
	new Promise(async resolve => {
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					console.log(`${JSON.stringify(err)}`)
					console.log(`request_algo 签名参数API请求失败，请检查网路重试`)
					llgeterror = true;
				} else {
					if (data) {
						data = JSON.parse(data);
						if (data['status'] === 200) {
							$.Jxmctoken = data.data.result.tk;
							let enCryptMethodJDString = data.data.result.algo;
							if (enCryptMethodJDString)
								$.enCryptMethodJD = new Function(`return ${enCryptMethodJDString}`)();
						} else {
							console.log('request_algo 签名参数API请求失败:')
						}
					} else {
						llgeterror = true;
						console.log(`京东服务器返回空数据`)
					}
				}
			} catch (e) {
				llgeterror = true;
				$.logErr(e, resp)
			}
			finally {
				resolve();
			}
		})
	})
}

function generateFp() {
	let e = "0123456789";
	let a = 13;
	let i = '';
	for (; a--; )
		i += e[Math.random() * e.length | 0];
	return (i + Date.now()).slice(0, 16)
}

function getJxmcUrlData(url, name) {
	if (typeof URL !== "undefined") {
		let urls = new URL(url);
		let data = urls.searchParams.get(name);
		return data ? data : '';
	} else {
		const query = url.match(/\?.*/)[0].substring(1)
			const vars = query.split('&')
			for (let i = 0; i < vars.length; i++) {
				const pair = vars[i].split('=')
					if (pair[0] === name) {
						return vars[i].substr(vars[i].indexOf('=') + 1);
					}
			}
			return ''
	}
}

function jsonParse(str) {
	if (typeof str == "string") {
		try {
			return JSON.parse(str);
		} catch (e) {
			console.log(e);
			$.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
			return [];
		}
	}
}
function timeFormat(time) {
	let date;
	if (time) {
		date = new Date(time)
	} else {
		date = new Date();
	}
	return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}


function IsNumber(value) {
    intPerSent = parseInt(value);
    if (!intPerSent)
        return false;
    else
        return true;
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

// prettier-ignore
function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	class s {
		constructor(t) {
			this.env = t
		}
		send(t, e = "GET") {
			t = "string" == typeof t ? {
				url: t
			}
			 : t;
			let s = this.get;
			return "POST" === e && (s = this.post),
			new Promise((e, i) => {
				s.call(this, t, (t, s, r) => {
					t ? i(t) : e(s)
				})
			})
		}
		get(t) {
			return this.send.call(this.env, t)
		}
		post(t) {
			return this.send.call(this.env, t, "POST")
		}
	}
	return new class {
		constructor(t, e) {
			this.name = t,
			this.http = new s(this),
			this.data = null,
			this.dataFile = "box.dat",
			this.logs = [],
			this.isMute = !1,
			this.isNeedRewrite = !1,
			this.logSeparator = "\n",
			this.startTime = (new Date).getTime(),
			Object.assign(this, e),
			this.log("", `🔔${this.name}, 开始!`)
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports
		}
		isQuanX() {
			return "undefined" != typeof $task
		}
		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}
		isLoon() {
			return "undefined" != typeof $loon
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t)
			} catch {
				return e
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t)
			} catch {
				return e
			}
		}
		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i)
				try {
					s = JSON.parse(this.getdata(t))
				} catch {}
			return s
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e)
			} catch {
				return !1
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({
					url: t
				}, (t, s, i) => e(i))
			})
		}
		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
				i = i ? i.replace(/\n/g, "").trim() : i;
				let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
				r = r ? 1 * r : 20,
				r = e && e.timeout ? e.timeout : r;
				const[o, h] = i.split("@"),
				n = {
					url: `http://${h}/v1/scripting/evaluate`,
					body: {
						script_text: t,
						mock_type: "cron",
						timeout: r
					},
					headers: {
						"X-Key": o,
						Accept: "*/*"
					}
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}
		loaddata() {
			if (!this.isNode())
				return {}; {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e);
				if (!s && !i)
					return {}; {
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i))
					} catch (t) {
						return {}
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require("fs"),
				this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
				e = this.path.resolve(process.cwd(), this.dataFile),
				s = this.fs.existsSync(t),
				i = !s && this.fs.existsSync(e),
				r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}
		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i)
				if (r = Object(r)[t], void 0 === r)
					return s;
			return r
		}
		lodash_set(t, e, s) {
			return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
				r = s ? this.getval(s) : "";
				if (r)
					try {
						const t = JSON.parse(r);
						e = t ? this.lodash_get(t, i, "") : e
					} catch (t) {
						e = ""
					}
			}
			return e
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
				o = this.getval(i),
				h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t),
					s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t),
					s = this.setval(JSON.stringify(o), i)
				}
			} else
				s = this.setval(t, e);
			return s
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}
		initGotEnv(t) {
			this.got = this.got ? this.got : require("got"),
			this.cktough = this.cktough ? this.cktough : require("tough-cookie"),
			this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar,
			t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
		}
		get(t, e = (() => {})) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
			this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.get(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
					try {
						if (t.headers["set-cookie"]) {
							const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
							s && this.ckjar.setCookieSync(s, null),
							e.cookieJar = this.ckjar
						}
					} catch (t) {
						this.logErr(t)
					}
				}).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				}))
		}
		post(t, e = (() => {})) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon())
				this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
						"X-Surge-Skip-Scripting": !1
					})), $httpClient.post(t, (t, s, i) => {
					!t && s && (s.body = i, s.statusCode = s.status),
					e(t, s, i)
				});
			else if (this.isQuanX())
				t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
						hints: !1
					})), $task.fetch(t).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => e(t));
			else if (this.isNode()) {
				this.initGotEnv(t);
				const {
					url: s,
					...i
				} = t;
				this.got.post(s, i).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				})
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date;
			let i = {
				"M+": s.getMonth() + 1,
				"d+": s.getDate(),
				"H+": s.getHours(),
				"m+": s.getMinutes(),
				"s+": s.getSeconds(),
				"q+": Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let e in i)
				new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}
		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t)
					return t;
				if ("string" == typeof t)
					return this.isLoon() ? t : this.isQuanX() ? {
						"open-url": t
					}
				 : this.isSurge() ? {
					url: t
				}
				 : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"],
						s = t.mediaUrl || t["media-url"];
						return {
							openUrl: e,
							mediaUrl: s
						}
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
						s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						}
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						}
					}
				}
			};
			if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
				let t = ["", "==============📣系统通知📣=============="];
				t.push(e),
				s && t.push(s),
				i && t.push(i),
				console.log(t.join("\n")),
				this.logs = this.logs.concat(t)
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]),
			console.log(t.join(this.logSeparator))
		}
		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}
		done(t = {}) {
			const e = (new Date).getTime(),
			s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
			this.log(),
			(this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}
	(t, e)
}
