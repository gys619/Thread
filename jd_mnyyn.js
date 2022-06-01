/*
5.1-5.30 云养牛，免费赢好礼

无助力功能

做任务、抽奖、等等

定时自己改，收草一个小时收一次5个饲料


12 3,10,16 1-30 5 * jd_mnyyn.js,

*/

const $ = new Env('蒙牛云养牛赢好礼')


const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x32a26e=>{
		cookiesArr.push(jdCookieNode[_0x32a26e]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x11b032=>_0x11b032.cookie)].filter(_0x4546e2=>!!_0x4546e2);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='dzd826641f4bcea64bd52e72255e';
	$.shareUuid='8c915d0a0cb14d08b4f09bc2dfb2243f';
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	let _0x96e477=[];
	let _0x30ec8a=0;
	_0x30ec8a=Math.floor(Math.random()*_0x96e477.length);
	$.shareUuid=_0x96e477[_0x30ec8a]?_0x96e477[_0x30ec8a]:$.shareUuid;
	for(let _0x33522a=0;_0x33522a<cookiesArr.length;_0x33522a++){
		cookie=cookiesArr[_0x33522a];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x33522a+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(_0x33522a==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}if($.outFlag){
		let _0x193daf='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x193daf);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x193daf);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0xae8ef7=>$.logErr(_0xae8ef7)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x382078=false;
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
		console.log('活动获取成功，助力码：'+$.actorUuid+'\n无助力功能，无助力功能，无助力功能\n活动邀请助力需新开会员\n默认不开卡，请手动进入活动页面开卡\n');
		await takePostRequest('drawContent');
		console.log('开始填写名称......');
		await takePostRequest('名称');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做日常任务......');
		await takePostRequest('每日签到');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('关注店铺');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('开始做浏览好物,每日三次......');
		await takePostRequest('浏览好物1');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物2');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		await takePostRequest('浏览好物3');
		await $.wait(parseInt(Math.random()*2000+3000,10));
		//await takePostRequest('加购');
		//await $.wait(parseInt(Math.random()*2000+3000,10));
		console.log('日常任务全部完成,开始收取额外奖励......');
		await takePostRequest('getTaskDetail');
		if($.taskTimes>=3){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励1');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=5){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励2');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.taskTimes>=10){
			console.log('开始收取额外奖励......');
			await takePostRequest('额外奖励3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		let _0x4c5662=parseInt(60-$.loadMinute);
		console.log('当前收草剩余时间:'+_0x4c5662+' 分钟');
		if($.loadMinute>=60){
			console.log('开始收草......');
			await takePostRequest('收草');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		console.log('查询当前汇总......');
		console.log('\n小牛名称：'+$.cowName+' \n抽奖大转盘：'+$.canDrawTimes+' 次\n饲料：'+$.score+' \n等级：'+$.cowLevel+'\n已喂养：'+$.feedTimes+' 次\n');
		if($.score>=10*$.cowLevel){
			console.log('开始喂养......');
			let _0x513596=parseInt(10*$.cowLevel);
			console.log('当前等级喂养饲料需:'+_0x513596);
			let _0xb2f939=parseInt($.score/_0x513596);
			console.log('当前可喂养次数为:'+_0xb2f939);
			for(m=1;_0xb2f939--;m++){
				console.log('第'+m+'次喂养');
				await takePostRequest('喂养');
				if($.runFalag==false)break;
				if(Number(_0xb2f939)<=0)break;
				if(m>=5){
					console.log('喂养太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await takePostRequest('activityContent');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		if($.canDrawTimes>=1){
			console.log('开始大转盘抽奖......');
			let _0x15be61=parseInt($.canDrawTimes/1);
			console.log('当前可抽奖次数为:'+_0x15be61);
			for(m=1;_0x15be61--;m++){
				console.log('第'+m+'次抽奖');
				await takePostRequest('抽奖');
				if($.runFalag==false)break;
				if(Number(_0x15be61)<=0)break;
				if(m>=5){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*2000+2000,10));
			}
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		await takePostRequest('getDrawRecordHasCoupon');
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await $.wait(parseInt(Math.random()*1000+5000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if($.index%3==0)await $.wait(parseInt(Math.random()*5000+30000,10));
	}catch(_0x385d6a){
		console.log(_0x385d6a);
	}
}
async function takePostRequest(_0x5d5bc1){
	if($.outFlag)return;
	let _0x4cab78='https://lzdz1-isv.isvjcloud.com';
	let _0x1283ba='';
	let _0x366a8b='POST';
	let _0x1edffb='';
	switch(_0x5d5bc1){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x1283ba='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=_0x4cab78+'/dz/common/getSimpleActInfoVo';
			_0x1283ba='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=_0x4cab78+'/customer/getMyPing';
			_0x1283ba='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=_0x4cab78+'/common/accessLogWithAD';
			let _0x284be7=_0x4cab78+'/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x1283ba='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x284be7)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x4cab78+'/wxActionCommon/getUserInfo';
			_0x1283ba='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/activityContent';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=_0x4cab78+'/dingzhi/taskact/common/drawContent';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getRankList':
			url=_0x4cab78+'/dingzhi/taskact/common/getRankList';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'checkOpenCard':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/initOpenCard';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/task/opencard/info';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case '关注店铺':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=1&taskValue=1000014803';
			break;
		case '浏览好物1':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100008226516';
			break;
		case '每日签到':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=1000014803';
			break;
		case '浏览好物2':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100003661795';
			break;
		case '浏览好物3':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue=100004891782';
			break;
		case'加购':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=2693720';
			break;
		case '额外奖励1':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=1';
			break;
		case '额外奖励2':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=2';
			break;
		case '额外奖励3':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveExtraTask';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&index=3';
			break;
		case'喂养':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/feedCow';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'名称':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveCow';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&cowNick=%E6%97%A0%E5%A4%84%E6%97%A0%E5%9C%A8';
			break;
		case'收草':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/saveForage';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getTaskDetail':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/getTaskDetail';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=_0x4cab78+'/dingzhi/opencard/'+_0x5d5bc1;
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(_0x5d5bc1=='browseGoods')_0x1283ba+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(_0x5d5bc1=='助力'){
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/assist';
		}else{
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/assist/status';
		}
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=_0x4cab78+'/dingzhi/opencard/'+_0x5d5bc1;
			let _0x4c8532='';
			let _0x2a6ff9='';
			if(_0x5d5bc1=='viewVideo'){
			_0x4c8532=31;
			_0x2a6ff9=31;
		}else if(_0x5d5bc1=='visitSku'){
			_0x4c8532=5;
			_0x2a6ff9=$.visitSkuValue||5;
		}else if(_0x5d5bc1=='toShop'){
			_0x4c8532=14;
			_0x2a6ff9=$.toShopValue||14;
		}else if(_0x5d5bc1=='addSku'){
			_0x4c8532=2;
			_0x2a6ff9=$.addSkuValue||2;
		}
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+_0x4c8532+'&taskValue='+_0x2a6ff9;
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x4cab78+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/help/list';
			_0x1283ba='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=_0x4cab78+'/dingzhi/mengniumilk/grow/start';
			_0x1283ba='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x5d5bc1);
	}
	let _0x308bf0=getPostRequest(url,_0x1283ba,_0x366a8b);
	return new Promise(async _0x422101=>{
		$.post(_0x308bf0,(_0x345483,_0x1ef349,_0x52ed1e)=>{
			try{
				setActivityCookie(_0x1ef349);
				if(_0x345483){
					if(_0x1ef349&&typeof _0x1ef349.statusCode!='undefined'){
						if(_0x1ef349.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x345483,_0x345483));
					console.log(_0x5d5bc1+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x5d5bc1,_0x52ed1e);
				}
			}catch(_0x3ba206){
				console.log(_0x3ba206,_0x1ef349);
			}
			finally{
				_0x422101();
			}
		});
	});
}
async function dealReturn(_0x30482d,_0x18cd25){
	let _0x525566='';
	try{
		if(_0x30482d!='accessLogWithAD'||_0x30482d!='drawContent'){
			if(_0x18cd25){
				_0x525566=JSON.parse(_0x18cd25);
			}
		}
	}catch(_0x3d1b4a){
		console.log(_0x30482d+' 执行任务异常');
		console.log(_0x18cd25);
		$.runFalag=false;
	}try{
		switch(_0x30482d){
			case 'isvObfuscator':
				if(typeof _0x525566=='object'){
					if(_0x525566.errcode==0){
					if(typeof _0x525566.token!='undefined')$.Token=_0x525566.token;
				}else if(_0x525566.message){
					console.log('isvObfuscator '+(_0x525566.message||''));
				}else{
					console.log(_0x18cd25);
				}
				}else{
					console.log(_0x18cd25);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					if(typeof _0x525566.data.shopId!='undefined')$.shopId=_0x525566.data.shopId;
					if(typeof _0x525566.data.venderId!='undefined')$.venderId=_0x525566.data.venderId;
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'getMyPing':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					if(_0x525566.data&&typeof _0x525566.data.secretPin!='undefined')$.Pin=_0x525566.data.secretPin;
					if(_0x525566.data&&typeof _0x525566.data.nickname!='undefined')$.nickname=_0x525566.data.nickname;
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'getUserInfo':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					if(_0x525566.data&&typeof _0x525566.data.yunMidImageUrl!='undefined')$.attrTouXiang=_0x525566.data.yunMidImageUrl||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'activityContent':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					$.endTime=_0x525566.data.endTime||_0x525566.data.activityVo&&_0x525566.data.activityVo.endTime||_0x525566.data.activity.endTime||0;
					$.hasEnd=_0x525566.data.isEnd||false;
					$.score=_0x525566.data.score||0;
					$.cowLevel=_0x525566.data.cowLevel||0;
					$.shareSocre=_0x525566.data.shareSocre||0;
					$.loadMinute=_0x525566.data.loadMinute;
					$.signLevel=_0x525566.data.signLevel||0;
					$.actorUuid=_0x525566.data.actorUuid||'';
					$.assistCount=_0x525566.data.assistCount||0;
					$.assistStatus=_0x525566.data.assistStatus||0;
					$.canDrawTimes=_0x525566.data.canDrawTimes||0;
					$.cowName=_0x525566.data.cowName||'';
					$.remainderTimes=_0x525566.data.remainderTimes||0;
					$.feedTimes=_0x525566.data.feedTimes||0;
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'getTaskDetail':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					$.taskTimes=_0x525566.data.dayTask.taskTimes;
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'info':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					$.addCart=_0x525566.data.addCart||false;
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case '关注店铺':
			case '浏览好物1':
			case '每日签到':
			case '浏览好物2':
			case '浏览好物3':
			case'加购':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('任务完成，获得饲料：'+_0x525566.data.score);
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case '额外奖励1':
			case '额外奖励2':
			case '额外奖励3':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('任务完成，获得饲料：'+_0x525566.data.addScore);
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case'喂养':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('执行成功，喂养次数：'+_0x525566.data.feedTimes);
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case'名称':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('成功取名：'+_0x525566.data.cowNick+'  (*￣︶￣)');
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case'收草':
			case '卖豆乳':
			case '卖燕麦牛奶':
			case '卖豆乳':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('执行成功，获得饲料：'+_0x525566.data.addScore);
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'checkOpenCard':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					let _0x1d0da5=_0x525566.data.openInfo||[];
					$.openList=[..._0x1d0da5];
					$.allOpenCard=_0x525566.data.allOpenCard||_0x525566.data.isOpenCardStatus||false;
					if(_0x525566.data.beans||_0x525566.data.addBeanNum)console.log('开卡获得:'+(_0x525566.data.beans||_0x525566.data.addBeanNum)+'豆');
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
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
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					if(typeof _0x525566.data=='object'){
						let _0x2332d8='';
						let _0x295b97='抽奖';
						if(_0x525566.data.addBeanNum){
							_0x2332d8=_0x525566.data.addBeanNum+'京豆';
						}
						if(_0x525566.data.addPoint){
							_0x2332d8+=' '+_0x525566.data.addPoint+'游戏机会';
						}
						if(_0x30482d=='followShop'){
							_0x295b97='关注';
							if(_0x525566.data.beanNumMember&&_0x525566.data.assistSendStatus){
								_0x2332d8+=' 额外获得:'+_0x525566.data.beanNumMember+'京豆';
							}
						}else if(_0x30482d=='addSku'||_0x30482d=='addCart'){
							_0x295b97='加购';
						}else if(_0x30482d=='viewVideo'){
							_0x295b97='热门文章';
						}else if(_0x30482d=='toShop'){
							_0x295b97='浏览店铺';
						}else if(_0x30482d=='visitSku'||_0x30482d=='browseGoods'){
							_0x295b97='浏览商品';
						}else if(_0x30482d=='sign'){
							_0x295b97='签到';
						}else{
							let _0x5c63d2=typeof _0x525566.data.drawOk==='object'&&_0x525566.data.drawOk||_0x525566.data;
							_0x2332d8=_0x5c63d2.drawOk==true&&_0x5c63d2.name||'';
						}
						if(_0x295b97=='抽奖'&&_0x2332d8&&_0x2332d8.indexOf('京豆') > -1){
							if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+_0x295b97+'成功,获得 '+_0x2332d8+'\n');
						}
						if(!_0x2332d8){
							_0x2332d8='空气💨';
						}
						console.log(_0x295b97+'获得:'+(_0x2332d8||_0x18cd25));
					}else{
						console.log(_0x30482d+' '+_0x18cd25);
					}
				}else if(_0x525566.errorMessage){
					$.runFalag=false;
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true){
					console.log('我的奖品：');
					let _0x5c2b3d=0;
					let _0x3a99a3=0;
					let _0x35f84e=0;
					for(let _0x543357 in _0x525566.data){
						let _0x5b4802=_0x525566.data[_0x543357];
						if(_0x5b4802.infoName==''&&_0x5b4802.sendStatus==0){
							_0x5c2b3d++;
							_0x3a99a3=_0x5b4802.infoName.replace('','');
							_0x35f84e=_0x35f84e<_0x5b4802.createTime?_0x5b4802.createTime:_0x35f84e;
						}else{
							console.log(''+(_0x5b4802.infoType!=10&&_0x5b4802.value&&_0x5b4802.value+':'||'')+_0x5b4802.infoName);
						}
					}
					if(_0x35f84e>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',_0x35f84e));
					if(_0x5c2b3d>0)console.log('邀请好友('+_0x5c2b3d+'):'+(_0x5c2b3d*parseInt(_0x3a99a3,10)||30)+'京豆');
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x525566=='object'){
					if(_0x525566.result&&_0x525566.result===true&&_0x525566.data){
					$.ShareCount=_0x525566.data.shareList.length;
					$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
				}else if(_0x525566.errorMessage){
					console.log(_0x30482d+' '+(_0x525566.errorMessage||''));
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof _0x525566=='object'){
					if(_0x525566.data.status==200){
					if(_0x30482d=='助力'){
						console.log('助力成功');
					}else{
						$.yaoqing=true;
					}
				}else if(_0x525566.data.status==105){
					console.log('已经助力过');
				}else if(_0x525566.data.status==104){
					console.log('已经助力其他人');
				}else if(_0x525566.data.status==101){}else{
					console.log(_0x18cd25);
				}
				}else{
					console.log(_0x30482d+' '+_0x18cd25);
				}
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x30482d+'-> '+_0x18cd25);
		}
		if(typeof _0x525566=='object'){
			if(_0x525566.errorMessage){
				if(_0x525566.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x5b511b){
		console.log(_0x5b511b);
	}
}
function getPostRequest(_0xfc6373,_0x221928,_0x3d318d='POST'){
	let _0x4aa42b={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$['UA'],'X-Requested-With':'XMLHttpRequest'};
	if(_0xfc6373.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		_0x4aa42b.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x4aa42b.Cookie=''+(lz_jdpin_token_cookie&&lz_jdpin_token_cookie||'')+($.Pin&&'AUTH_C_USER='+$.Pin+';'||'')+activityCookie;
	}
	return{'url':_0xfc6373,'method':_0x3d318d,'headers':_0x4aa42b,'body':_0x221928,'timeout':30000};
}
function getCk(){
	return new Promise(_0xd824aa=>{
		let _0x436447={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/mengniumilk/grow/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$['UA']},'timeout':30000};
		$.get(_0x436447,async(_0xbc2b1d,_0x4d47b4,_0xa785cd)=>{
			try{
				if(_0xbc2b1d){
					if(_0x4d47b4&&typeof _0x4d47b4.statusCode!='undefined'){
						if(_0x4d47b4.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xbc2b1d));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x1d5c34=_0xa785cd.match(/(活动已经结束)/)&&_0xa785cd.match(/(活动已经结束)/)[1]||'';
					if(_0x1d5c34){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x4d47b4);
				}
			}catch(_0x44ba2a){
				$.logErr(_0x44ba2a,_0x4d47b4);
			}
			finally{
				_0xd824aa();
			}
		});
	});
}
function setActivityCookie(_0xfd7520){
	let _0x3e7370='';
	let _0xb30611='';
	let _0x315139='';
	let _0x9ddb63=_0xfd7520&&_0xfd7520.headers&&(_0xfd7520.headers['set-cookie']||_0xfd7520.headers['Set-Cookie']||'')||'';
	let _0x1c5123='';
	if(_0x9ddb63){
		if(typeof _0x9ddb63!='object'){
			_0x1c5123=_0x9ddb63.split(',');
		}else _0x1c5123=_0x9ddb63;
		for(let _0x37db7c of _0x1c5123){
			let _0x178822=_0x37db7c.split(';')[0].trim();
			if(_0x178822.split('=')[1]){
				if(_0x178822.indexOf('LZ_TOKEN_KEY=')>-1)_0x3e7370=_0x178822.replace(/ /g,'')+';';
				if(_0x178822.indexOf('LZ_TOKEN_VALUE=')>-1)_0xb30611=_0x178822.replace(/ /g,'')+';';
				if(_0x178822.indexOf('lz_jdpin_token=')>-1)_0x315139=''+_0x178822.replace(/ /g,'')+';';
			}
		}
	}
	if(_0x3e7370&&_0xb30611)activityCookie=_0x3e7370+' '+_0xb30611;
	if(_0x315139)lz_jdpin_token_cookie=_0x315139;
}
async function getUA(){
	$['UA']='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2cc0c0){
	_0x2cc0c0=_0x2cc0c0||32;
	let _0x17db70='abcdef0123456789',_0x2cfe59=_0x17db70.length,_0x3ed91e='';
	for(i=0;i<_0x2cc0c0;i++)_0x3ed91e+=_0x17db70.charAt(Math.floor(Math.random()*_0x2cfe59));
	return _0x3ed91e;
}
function jsonParse(_0x44f1f7){
	if(typeof _0x44f1f7=='string'){
		try{
			return JSON.parse(_0x44f1f7);
		}catch(_0x36f812){
			console.log(_0x36f812);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

