/*
5.1-5.31 植选轻饮小店
脚本默认不开卡，请自行进入活动页面开卡，开卡才能兑换
仅做任务，制作，售卖
兑换请自行进入活动页面兑换，活动期间每个商品仅兑换一次

33 9,19 1-31 5 * jd_zxqyxd.js
*/


const $ = new Env('植选轻饮小店')
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x13fd32=>{
		cookiesArr.push(jdCookieNode[_0x13fd32]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x4c0aac=>_0x4c0aac.cookie)].filter(_0x415e52=>!!_0x415e52);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	console.log('活动时间5.1-30,手动入会\n')
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
    }
	$.activityId='dz3109fd47417ab2d2126ae7ce8165';
	$.shareUuid='886cfd3645d54959bd18e906b0b83c01';
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/april/yiliPlant/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	let _0x54369d=['e52ae94ed0f14f4c81dd24e6f8cbbccd','9f00a3e096eb49469bb23620c84e75ff','886cfd3645d54959bd18e906b0b83c01','c01b75b7148f4a259b01166d2e813ea1'];
	let _0x896ef3=0;
	_0x896ef3=Math.floor(Math.random()*_0x54369d.length);
	$.shareUuid=_0x54369d[_0x896ef3]?_0x54369d[_0x896ef3]:$.shareUuid;
	for(let _0x54be66=0;_0x54be66<cookiesArr.length;_0x54be66++){
		cookie=cookiesArr[_0x54be66];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x54be66+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(_0x54be66==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}if($.outFlag){
		let _0x131761='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x131761);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x131761);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x5617b7=>$.logErr(_0x5617b7)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x96f2af=false;
		await takePostRequest('isvObfuscator');
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await getCk();
		if(activityCookie==''){
			console.log('获取cookie失败');
			return;
		}
		if($.activityEnd===true){
			console.log('活动结束');
			return;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if($.hasEnd===true||Date.now()>$.endTime){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await $.wait(1000);
		console.log('活动获取成功，助力码：'+$.actorUuid+'\n默认不开卡，请手动进入活动页面开卡\n');
		console.log('开始做日常任务......');
		await takePostRequest('关注店铺');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('领取优惠卷');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('每日签到');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做制作轻饮......');
		console.log('查询当前材料分布......');
		console.log('\n轻饮币：'+$.score+' \n优质大豆：'+$.score2+' 份\n燕麦：'+$.score3+' 份\n原浆豆乳：'+$.score4+' 份\n燕麦牛奶：'+$.score5+' 份\n');
		if($.score4===0&&$.score2<15){
			console.log('开始购买优质大豆......');
			let _0x114c2a=parseInt(15-$.score2);
			console.log('优质大豆需要购买次数为:'+_0x114c2a);
			let _0x3d9f9b=parseInt($.score/10);
			console.log('当前可购买燕麦次数为:'+_0x3d9f9b);
			for(m=1;_0x3d9f9b--;m++){
				console.log('第'+m+'次购买');
				await takePostRequest('大豆');
				if($.runFalag==false)break;
				if(Number(_0x3d9f9b)<=0)break;
				if(m>=15){
					console.log('购买太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await takePostRequest('activityContent');
		if($.score5===0&&$.score3<10){
			console.log('开始购买燕麦......');
			let _0xa91ec3=parseInt(10-$.score3);
			console.log('燕麦需要购买次数为:'+_0xa91ec3);
			let _0x574323=parseInt($.score/20);
			console.log('当前可购买燕麦次数为:'+_0x574323);
			for(m=1;_0x574323--;m++){
				console.log('第'+m+'次购买');
				await takePostRequest('燕麦');
				if($.runFalag==false)break;
				if(Number(_0x574323)<=0)break;
				if(m>=10){
					console.log('购买太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await takePostRequest('activityContent');
		console.log('查询是否可以制作......');
		if($.score3>=10){
			console.log('开始制作燕麦牛奶......');
			await $.wait(parseInt(Math.random()*2000+2000,10));
			await takePostRequest('燕麦牛奶');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.score2>=15){
			console.log('开始制作原浆豆乳......');
			await $.wait(parseInt(Math.random()*2000+2000,10));
			await takePostRequest('豆乳');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		console.log('查询是否可以售卖......');
		await takePostRequest('activityContent');
		if($.score5>=1){
			console.log('开始售卖燕麦牛奶......');
			await $.wait(parseInt(Math.random()*2000+2000,10));
			await takePostRequest('卖燕麦牛奶');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.score4>=1){
			console.log('开始售卖原浆豆乳......');
			await $.wait(parseInt(Math.random()*2000+2000,10));
			await takePostRequest('卖豆乳');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		console.log('\n活动期间仅可以兑换一次物品，请手动兑换......');
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await $.wait(parseInt(Math.random()*1000+5000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+30000,10));
	}catch(_0x48a4dc){
		console.log(_0x48a4dc);
	}
}
async function takePostRequest(_0x5d8057){
	if($.outFlag)return;
	let _0x316ed0='https://lzdz1-isv.isvjcloud.com';
	let _0x5ed750='';
	let _0x60bc72='POST';
	let _0x5341f3='';
	switch(_0x5d8057){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x5ed750='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=_0x316ed0+'/dz/common/getSimpleActInfoVo';
			_0x5ed750='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x316ed0+'/customer/getMyPing';
			_0x5ed750='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x316ed0+'/common/accessLogWithAD';
			let _0xc75a5c=_0x316ed0+'/dingzhi/april/yiliPlant/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x5ed750='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0xc75a5c)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x316ed0+'/wxActionCommon/getUserInfo';
			_0x5ed750='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/activityContent';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x316ed0+'/dingzhi/taskact/common/drawContent';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'checkOpenCard':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/initOpenCard';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/task/opencard/info';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case '关注店铺':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=1&taskValue=1000366442';
			break;
		case '领取优惠卷':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=13&taskValue=13';
			break;
		case '每日签到':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=0';
			break;
		case '浏览好物':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100012458742';
			break;
		case'加购':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/saveTask';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=21';
			break;
		case'大豆':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/make';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=1&count=1';
			break;
		case'燕麦':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/make';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=2&count=1';
			break;
		case'豆乳':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/make';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=3&count=1';
			break;
		case '燕麦牛奶':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/make';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=4&count=1';
			break;
		case '卖豆乳':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/sell';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=1&count=1';
			break;
		case '卖燕麦牛奶':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/sell';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&taskValue=2&count=1';
			break;
		case 'getPrize':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/getPrize';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x316ed0+'/dingzhi/opencard/'+_0x5d8057;
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x5d8057=='browseGoods')_0x5ed750+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x5d8057=='助力'){
			url=_0x316ed0+'/dingzhi/april/yiliPlant/assist';
		}else{
			url=_0x316ed0+'/dingzhi/april/yiliPlant/assist/status';
		}
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x316ed0+'/dingzhi/opencard/'+_0x5d8057;
			let _0x5ddd57='';
			let _0x3c2d9e='';
			if(_0x5d8057=='viewVideo'){
			_0x5ddd57=31;
			_0x3c2d9e=31;
		}else if(_0x5d8057=='visitSku'){
			_0x5ddd57=5;
			_0x3c2d9e=$.visitSkuValue||5;
		}else if(_0x5d8057=='toShop'){
			_0x5ddd57=14;
			_0x3c2d9e=$.toShopValue||14;
		}else if(_0x5d8057=='addSku'){
			_0x5ddd57=2;
			_0x3c2d9e=$.addSkuValue||2;
		}
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x5ddd57+'&taskValue='+_0x3c2d9e;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/getDrawRecordHasCoupon';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x316ed0+'/dingzhi/april/yiliPlant/help/list';
			_0x5ed750='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=_0x316ed0+'/dingzhi/opencard/draw';
			_0x5ed750='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x5d8057);
	}
	let _0x3e9407=getPostRequest(url,_0x5ed750,_0x60bc72);
	return new Promise(async _0x4e7eed=>{
		$.post(_0x3e9407,(_0x5747c5,_0x4330fc,_0x225ddf)=>{
			try{
				setActivityCookie(_0x4330fc);
				if(_0x5747c5){
					if(_0x4330fc&&typeof _0x4330fc.statusCode!='undefined'){
						if(_0x4330fc.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x5747c5,_0x5747c5));
					console.log(_0x5d8057+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x5d8057,_0x225ddf);
				}
			}catch(_0xae1513){
				console.log(_0xae1513,_0x4330fc);
			}
			finally{
				_0x4e7eed();
			}
		});
	});
}
async function dealReturn(_0x39af5a,_0x56c6f0){
	let _0x1da944='';
	try{
		if(_0x39af5a!='accessLogWithAD'||_0x39af5a!='drawContent'){
			if(_0x56c6f0){
				_0x1da944=JSON.parse(_0x56c6f0);
			}
		}
	}catch(_0x4fe364){
		console.log(_0x39af5a+' 执行任务异常');
		console.log(_0x56c6f0);
		$.runFalag=false;
	}try{
		switch(_0x39af5a){
			case 'isvObfuscator':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.errcode==0){
					if(typeof _0x1da944.token!='undefined')$.Token=_0x1da944.token;
				}else if(_0x1da944.message){
					console.log('isvObfuscator '+(_0x1da944.message||''));
				}else{
					console.log(_0x56c6f0);
				}
				}else{
					console.log(_0x56c6f0);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					if(typeof _0x1da944.data.shopId!='undefined')$.shopId=_0x1da944.data.shopId;
					if(typeof _0x1da944.data.venderId!='undefined')$.venderId=_0x1da944.data.venderId;
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'getMyPing':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					if(_0x1da944.data&&typeof _0x1da944.data.secretPin!='undefined')$.Pin=_0x1da944.data.secretPin;
					if(_0x1da944.data&&typeof _0x1da944.data.nickname!='undefined')$.nickname=_0x1da944.data.nickname;
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					if(_0x1da944.data&&typeof _0x1da944.data.yunMidImageUrl!='undefined')$.attrTouXiang=_0x1da944.data.yunMidImageUrl||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'activityContent':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					$.endTime=_0x1da944.data.endTime||_0x1da944.data.activityVo&&_0x1da944.data.activityVo.endTime||_0x1da944.data.activity.endTime||0;
					$.hasEnd=_0x1da944.data.isEnd||false;
					$.score=_0x1da944.data.score||0;
					$.score2=_0x1da944.data.score2||0;
					$.score3=_0x1da944.data.score3||0;
					$.score4=_0x1da944.data.score4||0;
					$.score5=_0x1da944.data.score5||0;
					$.actorUuid=_0x1da944.data.actorUuid||'';
					$.assistCount=_0x1da944.data.assistCount||0;
					$.assistStatus=_0x1da944.data.assistStatus||0;
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'getPrize':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					$.exchangePriceList=_0x1da944.data.exchangePriceList||[];
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'info':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					$.addCart=_0x1da944.data.addCart||false;
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case '关注店铺':
			case '领取优惠卷':
			case '每日签到':
			case '浏览好物':
			case'加购':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					console.log('任务完成，获得轻饮币：'+_0x1da944.data.score);
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case'大豆':
			case'燕麦':
			case '燕麦牛奶':
			case '卖豆乳':
			case '卖燕麦牛奶':
			case '卖豆乳':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					console.log('买卖完成，剩余轻饮币：'+_0x1da944.data.score);
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					let _0x3d395c=_0x1da944.data.openInfo||[];
					$.openList=[..._0x3d395c];
					$.allOpenCard=_0x1da944.data.allOpenCard||_0x1da944.data.isOpenCardStatus||false;
					if(_0x1da944.data.beans||_0x1da944.data.addBeanNum)console.log('开卡获得:'+(_0x1da944.data.beans||_0x1da944.data.addBeanNum)+'豆');
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					if(typeof _0x1da944.data=='object'){
						let _0x5626e3='';
						let _0x511f71='抽奖';
						if(_0x1da944.data.addBeanNum){
							_0x5626e3=_0x1da944.data.addBeanNum+'京豆';
						}
						if(_0x1da944.data.addPoint){
							_0x5626e3+=' '+_0x1da944.data.addPoint+'游戏机会';
						}
						if(_0x39af5a=='followShop'){
							_0x511f71='关注';
							if(_0x1da944.data.beanNumMember&&_0x1da944.data.assistSendStatus){
								_0x5626e3+=' 额外获得:'+_0x1da944.data.beanNumMember+'京豆';
							}
						}else if(_0x39af5a=='addSku'||_0x39af5a=='addCart'){
							_0x511f71='加购';
						}else if(_0x39af5a=='viewVideo'){
							_0x511f71='热门文章';
						}else if(_0x39af5a=='toShop'){
							_0x511f71='浏览店铺';
						}else if(_0x39af5a=='visitSku'||_0x39af5a=='browseGoods'){
							_0x511f71='浏览商品';
						}else if(_0x39af5a=='sign'){
							_0x511f71='签到';
						}else{
							let _0x26c4db=typeof _0x1da944.data.drawOk==='object'&&_0x1da944.data.drawOk||_0x1da944.data;
							_0x5626e3=_0x26c4db.drawOk==true&&_0x26c4db.name||'';
						}
						if(_0x511f71=='抽奖'&&_0x5626e3&&_0x5626e3.indexOf('京豆')==-1){
							if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+_0x511f71+'成功,获得 '+_0x5626e3+'\n活动地址: https://3.cn/-106MEjSh');
						}
						if(!_0x5626e3){
							_0x5626e3='空气💨';
						}
						console.log(_0x511f71+'获得:'+(_0x5626e3||_0x56c6f0));
					}else{
						console.log(_0x39af5a+' '+_0x56c6f0);
					}
				}else if(_0x1da944.errorMessage){
					$.runFalag=false;
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true){
					console.log('我的奖品：');
					let _0x1c5f4b=0;
					let _0x2e7d48=0;
					let _0x4430b6=0;
					for(let _0x2986f1 in _0x1da944.data.recordList){
						let _0x59c576=_0x1da944.data.recordList[_0x2986f1];
						if(_0x59c576.infoName=='20京豆'&&_0x59c576.drawStatus==0){
							_0x1c5f4b++;
							_0x2e7d48=_0x59c576.infoName.replace('京豆','');
							_0x4430b6=_0x4430b6<_0x59c576.createTime?_0x59c576.createTime:_0x4430b6;
						}else{
							console.log(''+(_0x59c576.infoType!=10&&_0x59c576.value&&_0x59c576.value+':'||'')+_0x59c576.infoName);
						}
					}
					if(_0x4430b6>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x4430b6));
					if(_0x1c5f4b>0)console.log('邀请好友('+_0x1c5f4b+'):'+(_0x1c5f4b*parseInt(_0x2e7d48,10)||30)+'京豆');
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.result&&_0x1da944.result===true&&_0x1da944.data){
					$.ShareCount=_0x1da944.data.shareList.length;
					$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
				}else if(_0x1da944.errorMessage){
					console.log(_0x39af5a+' '+(_0x1da944.errorMessage||''));
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x1da944=='object'){
					if(_0x1da944.data.status==200){
					if(_0x39af5a=='助力'){
						console.log('助力成功');
					}else{
						$.yaoqing=true;
					}
				}else if(_0x1da944.data.status==105){
					console.log('已经助力过');
				}else if(_0x1da944.data.status==104){
					console.log('已经助力其他人');
				}else if(_0x1da944.data.status==101){}else{
					console.log(_0x56c6f0);
				}
				}else{
					console.log(_0x39af5a+' '+_0x56c6f0);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x39af5a+'-> '+_0x56c6f0);
		}
		if(typeof _0x1da944=='object'){
			if(_0x1da944.errorMessage){
				if(_0x1da944.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1725bc){
		console.log(_0x1725bc);
	}
}
function getPostRequest(_0x31f8b8,_0x18a645,_0x10edc4='POST'){
	let _0x53ed35={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$['UA'],'X-Requested-With':'XMLHttpRequest'};
	if(_0x31f8b8.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x53ed35.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/april/yiliPlant/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x53ed35.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0x31f8b8,'method':_0x10edc4,'headers':_0x53ed35,'body':_0x18a645,'timeout':30000};
}
function getCk(){
	return new Promise(_0x2a8007=>{
		let _0x46ae8c={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/april/yiliPlant/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$['UA']},'timeout':30000};
		$.get(_0x46ae8c,async(_0x5e81a5,_0x940285,_0x414408)=>{
			try{
				if(_0x5e81a5){
					if(_0x940285&&typeof _0x940285.statusCode!='undefined'){
						if(_0x940285.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x5e81a5));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x123a72=_0x414408.match(/(活动已经结束)/)&&_0x414408.match(/(活动已经结束)/)[1]||'';
					if(_0x123a72){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x940285);
				}
			}catch(_0x14bb5b){
				$.logErr(_0x14bb5b,_0x940285);
			}
			finally{
				_0x2a8007();
			}
		});
	});
}
function setActivityCookie(_0x4e4872){
	let _0x9a9f9b='';
	let _0x355ab6='';
	let _0x4cb72b='';
	let _0x170ced=_0x4e4872&&_0x4e4872.headers&&(_0x4e4872.headers['set-cookie']||_0x4e4872.headers['Set-Cookie']||'')||'';
	let _0x35a03c='';
	if(_0x170ced){
		if(typeof _0x170ced!='object'){
			_0x35a03c=_0x170ced.split(',');
		}else _0x35a03c=_0x170ced;
		for(let _0x4cbc4c of _0x35a03c){
			let _0x2b33a5=_0x4cbc4c.split(';')[0].trim();
			if(_0x2b33a5.split('=')[1]){
				if(_0x2b33a5.indexOf('LZ_TOKEN_KEY=')>-1)_0x9a9f9b=_0x2b33a5.replace(/ /g,'')+';';
				if(_0x2b33a5.indexOf('LZ_TOKEN_VALUE=')>-1)_0x355ab6=_0x2b33a5.replace(/ /g,'')+';';
				if(_0x2b33a5.indexOf('lz_jdpin_token=')>-1)_0x4cb72b=''+_0x2b33a5.replace(/ /g,'')+';';
			}
		}
	}
	if(_0x9a9f9b&&_0x355ab6)activityCookie=_0x9a9f9b+' '+_0x355ab6;
	if(_0x4cb72b)lz_jdpin_token_cookie=_0x4cb72b;
}
async function getUA(){
	$['UA']='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x59eab2){
	_0x59eab2=_0x59eab2||32;
	let _0x27d0a7='abcdef0123456789',_0x4446d1=_0x27d0a7.length,_0x20847a='';
	for(i=0;i<_0x59eab2;i++)_0x20847a+=_0x27d0a7.charAt(Math.floor(Math.random()*_0x4446d1));
	return _0x20847a;
}
function jsonParse(_0x49dbdc){
	if(typeof _0x49dbdc=='string'){
		try{
			return JSON.parse(_0x49dbdc);
		}catch(_0x31b9d6){
			console.log(_0x31b9d6);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x5081af=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x378bc1='';
		if($.shopactivityId)_0x378bc1=',"activityId":'+$.shopactivityId;
		let _0x2845ac='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x378bc1+',"channel":406}';
		let _0x55bc0f='20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306';
		const _0x4b070b={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x2845ac+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x55bc0f,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x4b070b,async(_0x18efc6,_0x32e964,_0x1bac3f)=>{
			try{
				_0x1bac3f=_0x1bac3f&&_0x1bac3f.match(/jsonp_.*?\((.*?)\);/)&&_0x1bac3f.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1bac3f;
				let _0x326935=$.toObj(_0x1bac3f,_0x1bac3f);
				if(_0x326935&&typeof _0x326935=='object'){
					if(_0x326935&&_0x326935.success===true){
						console.log(_0x326935.message);
						$.errorJoinShop=_0x326935.message;
						if(_0x326935.result&&_0x326935.result.giftInfo){
							for(let _0x2384a3 of _0x326935.result.giftInfo.giftList){
								console.log('入会获得:'+_0x2384a3.discountString+_0x2384a3.prizeName+_0x2384a3.secondLineDesc);
							}
						}
					}else if(_0x326935&&typeof _0x326935=='object'&&_0x326935.message){
						$.errorJoinShop=_0x326935.message;
						console.log(''+(_0x326935.message||''));
					}else{
						console.log(_0x1bac3f);
					}
				}else{
					console.log(_0x1bac3f);
				}
			}catch(_0x473905){
				$.logErr(_0x473905,_0x32e964);
			}
			finally{
				_0x5081af();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x475220=>{
		let _0x1f03c9='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x14d029='20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306';
		const _0x3a63f9={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1f03c9+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x14d029,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x3a63f9,async(_0x107bf3,_0x151a8f,_0x542ebb)=>{
			try{
				_0x542ebb=_0x542ebb&&_0x542ebb.match(/jsonp_.*?\((.*?)\);/)&&_0x542ebb.match(/jsonp_.*?\((.*?)\);/)[1]||_0x542ebb;
				let _0xe31f69=$.toObj(_0x542ebb,_0x542ebb);
				if(_0xe31f69&&typeof _0xe31f69=='object'){
					if(_0xe31f69&&_0xe31f69.success==true){
						console.log('入会:'+(_0xe31f69.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0xe31f69.result.interestsRuleList&&_0xe31f69.result.interestsRuleList[0]&&_0xe31f69.result.interestsRuleList[0].interestsInfo&&_0xe31f69.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x542ebb);
				}
			}catch(_0x270657){
				$.logErr(_0x270657,_0x151a8f);
			}
			finally{
				_0x475220();
			}
		});
	});
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}



// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

