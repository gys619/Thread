/*
大富翁new
0 0,10,20 * * * jd_dfw_new.js
*/
const $=new Env('大富翁');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[];
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x22fcdc=>{
		cookiesArr.push(jdCookieNode[_0x22fcdc]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0x42b2af=>_0x42b2af.cookie)].filter(_0x148601=>!!_0x148601);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.runFlag=false;
	$.runFirst=true;
	for(let _0x1d746b=0;_0x1d746b<cookiesArr.length;_0x1d746b++){
		$.index=(_0x1d746b+1);
		$.cookie=cookiesArr[_0x1d746b];
		$.isLogin=true;
		$.nickName='';
		$.UserName=decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&$.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.name=true;
		await TotalBean();
		console.log('\n*****开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*****\n');
		if(!$.isLogin){
			$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
			if($.isNode()){
				await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
			}
			continue;
		}
		try{
			await main($.cookie);
		}catch(_0x240eeb){
			$.logErr(_0x240eeb);
		}
		await $.wait(2000);
	}
})().catch(_0x4b5301=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x4b5301+'!','');
}).finally(()=>{
	$.done();
});
async function main(_0x57c48b){
	if($.name){
		doInfo();
	}
	let _0xbc125c=false;
	let _0x2f7f8e=decodeURIComponent(_0x57c48b.match(/pt_pin=(.+?);/)&&_0x57c48b.match(/pt_pin=(.+?);/)[1]);
	let _0x4f283d='functionId=qryCompositeMaterials&body={"qryParam":"[{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBannerT\\",\\"id\\":\\"06079452\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBannerS\\",\\"id\\":\\"06079411\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBannerA\\",\\"id\\":\\"06079430\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBannerB\\",\\"id\\":\\"05861004\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomHeadPic\\",\\"id\\":\\"05872092\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData0\\",\\"id\\":\\"06110848\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData1\\",\\"id\\":\\"06110849\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData2\\",\\"id\\":\\"06110876\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData3\\",\\"id\\":\\"06110889\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData4\\",\\"id\\":\\"06110899\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData5\\",\\"id\\":\\"06110902\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData6\\",\\"id\\":\\"06110898\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData7\\",\\"id\\":\\"06110893\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData8\\",\\"id\\":\\"06110890\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData9\\",\\"id\\":\\"06110887\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData10\\",\\"id\\":\\"06110872\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"feedBottomData11\\",\\"id\\":\\"06110862\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"fissionData\\",\\"id\\":\\"06082228\\"},{\\"type\\":\\"advertGroup\\",\\"mapTo\\":\\"newProds\\",\\"id\\":\\"06079447\\"}]","activityId":"41AJZXRUJeTqdBK9bPoPgUJiodcU","pageId":"","reqSrc":"","applyKey":"jd_star"}&client=wh5&clientVersion=1.0.0&uuid=8888';
	let _0x3f22f6=await doTask5('?functionId=qryCompositeMaterials',_0x4f283d,_0x57c48b);
	let _0x1b2c97=["pVbNk9xIuI02DeRtwUiztA==","s4UuZYFN6GW3jbg4x9Z8LA==","Vf+kZwVHm4/P5/ZkyCY+DA==", "4y1yGPA4HCaFNCw8BZ6gsw=="];
	let _0x1da5e2=getRandomArrayElements(_0x1b2c97,1)[0];
	await doTask1(_0x57c48b,_0x1da5e2);
	await doTask2(_0x57c48b,_0x1da5e2);
	await doTask3(_0x57c48b,_0x1da5e2);
	await doTask4(_0x57c48b,_0x1da5e2);
	if(_0x3f22f6&&_0x3f22f6.feedBottomData0&&_0x3f22f6.feedBottomData0.list&&$.runFlag){
		await $.wait(2000);
		let _0x21ba54=[];
		for(let _0x4c10fb=0;_0x4c10fb<10;_0x4c10fb++){
			_0x21ba54=[..._0x21ba54,..._0x3f22f6['feedBottomData'+_0x4c10fb].list];
		}
		_0x21ba54=getRandomArrayElements(_0x21ba54,_0x21ba54.length);
		let _0x3b38d3={};
		//console.log('店铺总数：'+_0x21ba54.length);
		for(let _0x44fbb2=0;(_0x44fbb2<10)&&!_0xbc125c&&$.runFlag;_0x44fbb2++){
			let _0x4e7c82=_0x21ba54[_0x44fbb2];
			let _0x529963=_0x4e7c82.link;
			let _0x4841ae=_0x4e7c82.extension.shopInfo.venderId;
			if(!_0x529963||!_0x4841ae){
				return;
			}
			console.log('\n'+_0x2f7f8e+',第'+(_0x44fbb2+1)+'个店铺，'+_0x4e7c82.name+',ID:'+_0x529963);
			let _0x3ff15f=await doTask5('?functionId=jm_promotion_queryPromotionInfoByShopId','functionId=jm_promotion_queryPromotionInfoByShopId&body={"shopId":"'+_0x529963+'","channel":20}&client=wh5&clientVersion=1.0.0',_0x57c48b);
			if(_0x3ff15f&&_0x3ff15f.innerLink&&_0x3ff15f.innerLink.match(/{\"appId\":\"(.*)\",\"category/)&&_0x3ff15f.innerLink.match(/{\"appId\":\"(.*)\",\"category/)[1]){
				let _0x1f794b=_0x3ff15f.innerLink.match(/,\"projectId\":(.*),\"shopId/)[1];
				let _0x3d4943='functionId=jm_marketing_maininfo&body=%7B%22shopId%22%3A%22'+_0x529963+'%22%2C%22venderId%22%3A%22'+_0x4841ae+'%22%2C%22projectId%22%3A%22'+_0x1f794b+'%22%7D&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888';
				let _0x3dff67=await doTask5('',_0x3d4943,_0x57c48b);
				if(!_0x3dff67.userInfo.attention){
					var _0x48796b='3|4|0|2|1'.split('|'),_0x94fef6=0;
					while(true){
						switch(_0x48796b[_0x94fef6++]){
							case'0':
								_0x3d4943='functionId=followShop&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888';
								continue;
							case'1':
								await $.wait(2000);
								continue;
							case'2':
								await doTask5('',_0x3d4943,_0x57c48b);
								continue;
							case'3':
								console.log(_0x2f7f8e+',去关注');
								continue;
							case'4':
								_0x4f283d='{"shopId":"'+_0x529963+'","follow":true,"type":0,"sourceRpc":"shop_app_myfollows_shop","refer":"https://wq.jd.com/pages/index/index"}';
								continue;
						}
						break;
					}
				}else{
					console.log(_0x2f7f8e+',已关注');
				}
				let _0x1112df=false;
				let _0x353674=_0x3dff67.project.viewTaskVOS;
				for(let _0x1c11b9=0;_0x1c11b9<_0x353674.length;_0x1c11b9++){
					let _0x4bba7a=_0x353674[_0x1c11b9];
					if((_0x4bba7a.type===1)||(_0x4bba7a.type===7)||(_0x4bba7a.type===2)||(_0x4bba7a.type===6)){
						continue;
					}if(_0x4bba7a.finishCount!==0){
						console.log(_0x2f7f8e+',任务:'+_0x4bba7a.name+',已完成');
						continue;
					}if((_0x4bba7a.type===50)||(_0x4bba7a.type===3)){
						console.log(_0x2f7f8e+',任务:'+_0x4bba7a.name+',去执行');
						let _0x1576f1=(_0x4bba7a.totalCount-_0x4bba7a.finishCount);
						_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x4bba7a['id']+'}';
						let _0x540daf=await doTask5('','functionId=jm_goods_taskGoods&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
						await $.wait(2000);
						let _0x4e9ebd=_0x540daf.skuList;
						for(let _0x39bba4=0;(_0x39bba4<_0x4e9ebd.length)&&(_0x39bba4<_0x1576f1);_0x39bba4++){
							_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x4bba7a['id']+',"token":"'+_0x4bba7a.token+'","opType":1,"referSource":'+_0x4e9ebd[_0x39bba4].skuId+'}';
							await doTask5('','functionId=jm_task_process&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
							await $.wait(6000);
							_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x4bba7a['id']+',"token":"'+_0x4bba7a.token+'","opType":2,"referSource":'+_0x4e9ebd[_0x39bba4].skuId+'}';
							let _0x3b39d2=await doTask5('','functionId=jm_task_process&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
							if(_0x3b39d2&&_0x3b39d2.awardVO){
								console.log(_0x2f7f8e+',获得：'+_0x3b39d2.awardVO.name);
							}else{
								_0xbc125c=true;
							}
						}
						await $.wait(2000);
						_0x1112df=true;
					}else if((_0x4bba7a.type===8)||(_0x4bba7a.type===4)){
						console.log(_0x2f7f8e+',任务:'+_0x4bba7a.name+',去执行');
						_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x4bba7a['id']+',"token":"'+_0x4bba7a.token+'","opType":1}';
						await doTask5('','functionId=jm_task_process&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
						await $.wait(5000);
						_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x4bba7a['id']+',"token":"'+_0x4bba7a.token+'","opType":2}';
						let _0x26d415=await doTask5('','functionId=jm_task_process&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
						if(_0x26d415&&_0x26d415.awardVO){
							console.log(_0x2f7f8e+',获得：'+_0x26d415.awardVO.name);
						}else{
							console.log('2222');
							_0xbc125c=true;
						}
						await $.wait(2000);
						_0x1112df=true;
					}else{
						console.log(_0x2f7f8e+',任务:'+_0x4bba7a.name+',不执行');
					}
				}
				if(_0x1112df){
					_0x3d4943='functionId=jm_marketing_maininfo&body=%7B%22shopId%22%3A%22'+_0x529963+'%22%2C%22venderId%22%3A%22'+_0x4841ae+'%22%2C%22projectId%22%3A%22'+_0x1f794b+'%22%7D&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888';
					_0x3dff67=await doTask5('',_0x3d4943,_0x57c48b);
					_0x353674=_0x3dff67.project.viewTaskVOS;
				}
				let _0x37098b=_0x3dff67.userInfo.fansIcon;
				let _0x57f677='';
				let _0x15db42='';
				for(let _0xb68119=0;_0xb68119<_0x353674.length;_0xb68119++){
					if(_0x353674[_0xb68119].type===1){
						_0x57f677=_0x353674[_0xb68119]['id'];
						_0x15db42=_0x353674[_0xb68119].token;
					}
				}
				await $.wait(2000);
				for(let _0x5a76b7=0;_0x5a76b7<_0x37098b;_0x5a76b7++){
					console.log(_0x2f7f8e+',丢一次骰子');
					_0x3b38d3='{"shopId":"'+_0x529963+'","venderId":"'+_0x4841ae+'","projectId":"'+_0x1f794b+'","taskId":'+_0x57f677+',"token":"'+_0x15db42+'","opType":2}';
					let _0x26d415=await doTask5('','functionId=jm_task_process&body='+encodeURIComponent(_0x3b38d3)+'&t='+Date.now()+'&eid=&appid=shop_view&clientVersion=10.0.0&client=wh5&uuid=8888',_0x57c48b);
					if(_0x26d415&&_0x26d415.awardVO){
						console.log(_0x2f7f8e+',获得：'+_0x26d415.awardVO.name);
					}
					if(JSON.stringify(_0x26d415)==='{}'){
						//console.log('33');
						_0xbc125c=true;
					}
					//console.log(JSON.stringify(_0x26d415)+'\n');
					await $.wait(2000);
				}
			}
		}
	}else{
		console.log(_0x2f7f8e+',获取店铺列表失败');
	}
}
async function doInfo(){
	$.name=false;
	$.runFlag=true;
	for(let _0x9d5463=0;_0x9d5463<cookiesArr.length;_0x9d5463++){
		let _0x4dbe6a=["pVbNk9xIuI02DeRtwUiztA==","s4UuZYFN6GW3jbg4x9Z8LA==","Vf+kZwVHm4/P5/ZkyCY+DA==", "4y1yGPA4HCaFNCw8BZ6gsw=="];
		let _0x4fab4a=getRandomArrayElements(_0x4dbe6a,1)[0];
		await doTask1(cookiesArr[_0x9d5463],_0x4fab4a);
		await doTask2(cookiesArr[_0x9d5463],_0x4fab4a);
		await doTask3(cookiesArr[_0x9d5463],_0x4fab4a);
		await doTask4(cookiesArr[_0x9d5463],_0x4fab4a);
		await $.wait(500);
	}
}
async function doTask1(_0x4a4190,_0x3d5c5b){
	let _0x229895=+new Date();
	let _0x58fd22={'url':'https://api.m.jd.com/?t='+_0x229895,'body':'functionId=InviteFriendChangeAssertsService&body='+JSON.stringify({'method':'attendInviteActivity','data':{'inviterPin':encodeURIComponent(_0x3d5c5b),'channel':1,'token':'','frontendInitStatus':''}})+'&referer=-1&eid=eidI9b2981202fsec83iRW1nTsOVzCocWda3YHPN471AY78%2FQBhYbXeWtdg%2F3TCtVTMrE1JjM8Sqt8f2TqF1Z5P%2FRPGlzA1dERP0Z5bLWdq5N5B2VbBO&aid=&client=ios&clientVersion=14.4.2&networkType=wifi&fp=-1&uuid=ab048084b47df24880613326feffdf7eee471488&osVersion=14.4.2&d_brand=iPhone&d_model=iPhone10,2&agent=-1&pageClickKey=-1&platform=3&lang=zh_CN&appid=market-task-h5&_t='+_0x229895,'headers':{
			'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-type':'application/x-www-form-urlencoded','Origin':'https://invite-reward.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://invite-reward.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':_0x4a4190
		}};
	$.post(_0x58fd22,(_0x19a1d8,_0xeda2ae,_0x2e81e9)=>{});
}
async function doTask2(_0x1c2d06,_0x307d8c){
	let _0x2b8623={'url':'https://api.m.jd.com/','body':'functionId=TaskInviteService&body='+JSON.stringify({'method':'participateInviteTask','data':{'channel':'1','encryptionInviterPin':encodeURIComponent(_0x307d8c),'type':1}})+'&appid=market-task-h5&uuid=&_t='+Date.now(),'headers':{
			'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://assignment.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://assignment.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':_0x1c2d06
		}};
	$.post(_0x2b8623,(_0x40dbe3,_0x522be3,_0x4da84f)=>{});
}
async function doTask3(_0x17b0c6,_0x5bad6f){
	let _0x45f9a9=Date.now();
	var _0x2d0864={
		'Host':'api.m.jd.com','accept':'application/json, text/plain, */*','content-type':'application/x-www-form-urlencoded','origin':'https://invite-reward.jd.com','accept-language':'zh-cn','user-agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','referer':'https://invite-reward.jd.com/','Cookie':_0x17b0c6
	};
	var _0x58a4bc='functionId=InviteFriendApiService&body={"method":"attendInviteActivity","data":{"inviterPin":"'+encodeURIComponent(_0x5bad6f)+'","channel":1,"token":"","frontendInitStatus":""}}&referer=-1&eid=eidIf3dd8121b7sdmiBLGdxRR46OlWyh62kFAZogTJFnYqqRkwgr63%2BdGmMlcv7EQJ5v0HBic81xHXzXLwKM6fh3i963zIa7Ym2v5ehnwo2B7uDN92Q0&aid=&client=ios&clientVersion=14.4&networkType=wifi&fp=-1&appid=market-task-h5&_t='+_0x45f9a9;
	var _0x5b5a1d={'url':'https://api.m.jd.com/?t='+Date.now(),'headers':_0x2d0864,'body':_0x58a4bc};
	$.post(_0x5b5a1d,(_0x198b8b,_0x426bf9,_0x3ec43c)=>{});
}
async function doTask4(_0x45172f,_0x1916e4){
	let _0x22d2b9=Date.now();
	let _0x13d77d={
		'Host':'api.m.jd.com','accept':'application/json, text/plain, */*','content-type':'application/x-www-form-urlencoded','origin':'https://assignment.jd.com','accept-language':'zh-cn','user-agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','referer':'https://assignment.jd.com/?inviterId='+encodeURIComponent(_0x1916e4),'Cookie':_0x45172f
	};
	let _0x533b18='functionId=TaskInviteService&body={"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":"'+encodeURIComponent(_0x1916e4)+'","type":1}}&appid=market-task-h5&uuid=&_t='+_0x22d2b9;
	var _0x5b4159={'url':'https://api.m.jd.com/','headers':_0x13d77d,'body':_0x533b18};
	$.post(_0x5b4159,(_0x3868d2,_0x462c6c,_0x4def3a)=>{});
}
async function doTask5(_0x2d96d6,_0x4ec296,_0x54e777,_0x57746e=0){
	let _0x587042=["pVbNk9xIuI02DeRtwUiztA==","s4UuZYFN6GW3jbg4x9Z8LA==","Vf+kZwVHm4/P5/ZkyCY+DA==", "4y1yGPA4HCaFNCw8BZ6gsw=="];
	let _0x5335c5=getRandomArrayElements(_0x587042,1)[0];
	let _0x2c0c3e='https://api.m.jd.com/client.action'+_0x2d96d6;
	const _0x48a44f={
		'Origin':'https://wbbny.m.jd.com','Cookie':_0x54e777,'Connection':'keep-alive','Accept':'application/json, text/plain, */*','Referer':'https://wbbny.m.jd.com/babelDiy/Zeus/41AJZXRUJeTqdBK9bPoPgUJiodcU/index.html','Host':'api.m.jd.com','user-agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br'
	};
	let _0x27927b={'url':_0x2c0c3e,'headers':_0x48a44f,'body':_0x4ec296};
	return new Promise(async _0x28a905=>{
		$.post(_0x27927b,(_0x4f15a4,_0x5d3ed0,_0x710c31)=>{
			try{
				if(_0x4f15a4){
					console.log(_0x4f15a4);
				}else{
					_0x710c31=JSON.parse(_0x710c31);
				}
			}catch(_0x53a495){
				console.log(_0x710c31);
				$.logErr(_0x53a495,_0x5d3ed0);
			}
			finally{
				_0x28a905(_0x710c31.data||{});
			}
		});
	});
}
function TotalBean(){
	return new Promise(async _0x4dc6a6=>{
		const _0x3e03ae={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{
				'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':$.cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
			}};
		$.post(_0x3e03ae,(_0x23c91a,_0x3439f1,_0x599c86)=>{
			try{
				if(_0x23c91a){
					console.log(''+JSON.stringify(_0x23c91a));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x599c86){
						_0x599c86=JSON.parse(_0x599c86);
						if(_0x599c86.retcode===13){
							$.isLogin=false;
							return;
						}if(_0x599c86.retcode===0){
							$.nickName=_0x599c86.base&&_0x599c86.base.nickname||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x15ea74){
				$.logErr(_0x15ea74,_0x3439f1);
			}
			finally{
				_0x4dc6a6();
			}
		});
	});
}
function getRandomArrayElements(_0x1388d0,_0x2137e5){
	var _0x23236e=_0x1388d0.slice(0),_0x57ebf6=_0x1388d0.length,_0x19deda=(_0x57ebf6-_0x2137e5),_0xd18891,_0x403cdd;
	while(_0x57ebf6-->_0x19deda){
		_0x403cdd=Math.floor((_0x57ebf6+1)*Math.random());
		_0xd18891=_0x23236e[_0x403cdd];
		_0x23236e[_0x403cdd]=_0x23236e[_0x57ebf6];
		_0x23236e[_0x57ebf6]=_0xd18891;
	}
	return _0x23236e.slice(_0x19deda);
};
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}