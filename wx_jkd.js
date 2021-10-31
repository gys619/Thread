/*
邀请码必填得金币  我的邀请码 24516823

hostname = *.xiaodouzhuan.cn
##点任务获取数据##
===========ql===========
变量
export jkdhd='{"openid": "替换的CK"}' 

export jkdck='{"Cookie":"xz_jkd_appkey=替换的CK"}'

多账号用@隔开
*/

const $ = new Env('聚看点');
let status;
status = (status = ($.getval("jkdstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
let jkdhdArr = [],jkdckArr = [],jzreadcount = ''
let jkdhd= $.isNode() ? (process.env.jkdhd ? process.env.jkdhd : "") : ($.getdata('jkdhd') ? $.getdata('jkdhd') : "")
let jkdck= $.isNode() ? (process.env.jkdck ? process.env.jkdck : "") : ($.getdata('jkdck') ? $.getdata('jkdck') : "")
let jkdcks = ""
let jkdhds = ""
const logs =0;

var hours = new Date().getHours();
var s = new Date().getMinutes();

var timestamp = Math.round(new Date().getTime()/1000).toString();
!(async () => {
  if (typeof $request !== "undefined") {
        await getck()
  } else {
      if(!$.isNode()){
          jkdhdArr.push($.getdata('jkdhd'))
          jkdckArr.push($.getdata('jkdck'))
          let jzreadcount = ($.getval('jkdcount') || '1');
          for (let i = 2; i <= jzreadcount; i++) {
            jkdhdArr.push($.getdata(`jkdhd${i}`))
            jkdckArr.push($.getdata(`jkdck${i}`))
            }
    console.log(`------------- 共${jkdhdArr.length}个账号-------------\n`)
      for (let i = 0; i < jkdhdArr.length; i++) {
        if (jkdhdArr[i]) {
          jkdhd = jkdhdArr[i];
          jkdck = jkdckArr[i]
          $.index = i + 1;
        
          console.log(`\n开始【聚看点${$.index}】`)

await qx()

    

  }
}
      }else  {
          if (process.env.jkdhd && process.env.jkdhd.indexOf('@') > -1) {
            jkdhdArr = process.env.jkdhd.split('@');
            jkdckArr = process.env.jkdck.split('@');
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            jkdhds = [process.env.jkdhd]
            jkdcks = [process.env.jkdck]
        };
        Object.keys(jkdhds).forEach((item) => {
        if (jkdhds[item]) {
            jkdhdArr.push(jkdhds[item])
        }
    })
            Object.keys(jkdcks).forEach((item) => {
        if (jkdcks[item]) {
            jkdckArr.push(jkdcks[item])
        }
    })
          console.log(`共${jkdhdArr.length}个cookie`)
	        for (let k = 0; k < jkdhdArr.length; k++) {
                $.message = ""
                jkdhd = jkdhdArr[k]
                jkdck = jkdckArr[k]
                $.index = k + 1;
          console.log(`\n开始【聚看点${$.index}】`)
          //$.log(jkdhd)
await ql()
	        }
      }
  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())


function getck() {
   if ($request.url.indexOf("userlive") > -1) {
  const jkdhd = $request.body
if(jkdhd)    $.setdata(jkdhd,`jkdhd${status}`)
  const jkdck = JSON.stringify($request.headers)
if(jkdck)    $.setdata(jkdck,`jkdck${status}`)

$.log(jkdhd)
$.log(jkdck)

   $.msg($.name,"",'聚看点'+`${status}` +'数据获取成功！')
 
}
}
async function qx(){

  await qxinfo()  
  await getMoneyTree()
  await qxstimulateAdvAccount(17)
for(let i=0;i<5;i++){
  
  await $.wait(30000)
  await qxread()}
  await qxsign()
  await qxstimulateAdvAccount(14)
for(let i=0;i<5;i++){


await qxartlist()}
  await xinshoutx()
}

async function ql(){

await qlinfo()
await getMoneyTree()
await qlstimulateAdvAccount(17)  
for(let i=0;i<5;i++){
  
  await $.wait(30000)
  await qlread()}
await qlsign()
await qlstimulateAdvAccount(14) 
for(let i=0;i<5;i++){
await qlartlist()}
await xinshoutx()
}
async function qxinfo(){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]

    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newMobileMenu/infoMe.action`,
     body: 'jsondata='+qxhd,
     headers:{
'Host': 'www.xiaodouzhuan.cn',
'Content-Type': 'application/x-www-form-urlencoded',
'User-Agent': 'JuKanDian/5.6.5 (iPhone; iOS 14.3; Scale/3.00)',
}
        
    }
   $.post(nm,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.ret == "ok")
        $.log(`usercode: ${result.userinfo.usercode}\n${result.userinfo.infoMeSumCashItem.value} ${result.userinfo.infoMeSumCashItem.title}\n${result.userinfo.infoMeCurCashItem.value} ${result.userinfo.infoMeCurCashItem.title}\n${result.userinfo.infoMeGoldItem.value} ${result.userinfo.infoMeGoldItem.title}`)
    
       if(result.code != 0)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }

async function qlinfo(){
 return new Promise((resolve) => {
qlhd = JSON.parse(jkdhd)

    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newMobileMenu/infoMe.action`,
     body: `jsondata={"openid": "${qlhd.openid}","channel": "iOS","os": "iOS","appversioncode": "565","time": "1630328609","psign": "92dea068b6c271161be05ed358b59932","apptoken": "xzwltoken070704","appid": "xzwl","appversion": "5.6.5"}`,
     headers:{
'Host': 'www.xiaodouzhuan.cn',
'Content-Type': 'application/x-www-form-urlencoded',
'User-Agent': 'JuKanDian/5.6.5 (iPhone; iOS 14.3; Scale/3.00)',
}
        
    }
   $.post(nm,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.ret == "ok")
        $.log(`usercode: ${result.userinfo.usercode}\n${result.userinfo.infoMeSumCashItem.value} ${result.userinfo.infoMeSumCashItem.title}\n${result.userinfo.infoMeCurCashItem.value} ${result.userinfo.infoMeCurCashItem.title}\n${result.userinfo.infoMeGoldItem.value} ${result.userinfo.infoMeGoldItem.title}`)
    
       if(result.code != 0)
          
          $.log(result.msg)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function getMoneyTree(){
 return new Promise((resolve) => {


    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/task/getMoneyTreeProfit.action`,
     body: 'box_type=1',
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
      // $.log(JSON.stringify(nm))
       //$.log(data)
    try{
        //const result = JSON.parse(data)
        if(logs)$.log(data)
$.log("can get coin: "+data)
          if(data>0){
              await getTaskBox()
          }
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function getTaskBox(){
 return new Promise((resolve) => {


    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/task/getTaskBoxProfit.action`,
     body: 'box_type=1',
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
      // $.log(JSON.stringify(nm))
       //$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
    }
       
          
          
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }


  
  async function qlstimulateAdvAccount(position){
 return new Promise((resolve) => {
qlhd = JSON.parse(jkdhd)

    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/stimulateAdvAccount.action`,
     body: `jsondata={  "openid" : "${qlhd.openid}",  "channel" : "iOS",  "os" : "iOS",  "appversioncode" : "565",  "time" : "1630331719",  "psign" : "92dea068b6c271161be05ed358b59932",  "position" : ${position},  "apptoken" : "xzwltoken070704",  "appid" : "xzwl",  "appversion" : "5.6.5"}`,
     //14 17
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
if(result.profit==1){
await qllogin()
}
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qxstimulateAdvAccount(position){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]
qxhd = decodeURIComponent  (qxhd)

qxhd = JSON.parse(qxhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/stimulateAdvAccount.action`,
     body: `jsondata={  "openid" : "${qxhd.openid}",  "channel" : "iOS",  "os" : "iOS",  "appversioncode" : "565",  "time" : "1630331719",  "psign" : "${qxhd.psign}",  "position" : ${position},  "apptoken" : "${qxhd.apptoken}",  "appid" : "xzwl",  "appversion" : "5.6.5"}`,
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
if(result.profit==1){
await qxlogin()
}
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  
  async function qxread(){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]
qxhd = decodeURIComponent  (qxhd)

qxhd = JSON.parse(qxhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/readAccount.action`,
     body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 1,  "securitykey" : "",  "channel" : "iOS",  "psign" : "${qxhd.psign}",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "${qxhd.apptoken}",  "appversion" : "5.6.5",  "openid" : "${qxhd.openid}",  "os" : "iOS",  "artid" : 812907${Math.round(Math.random()*9)}${s},  "accountType" : "0",  "readmodel" : "1"}`,
//{  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 2,  "securitykey" : "",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630335383",  "apptoken" : "xzwltoken070704",  "appversion" : "5.6.5",  "openid" : "0189b3c44c814491ade2028dfb6e1c2d",  "os" : "iOS",  "artid" : 812923981,  "accountType" : "0",  "readmodel" : "1"}
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qlread(){
 return new Promise((resolve) => {

qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/readAccount.action`,
     body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 1,  "securitykey" : "",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "xzwltoken070704",  "appversion" : "5.6.5",  "openid" : "${qlhd.openid}",  "os" : "iOS",  "artid" : 812907${Math.round(Math.random()*9)}${s},  "accountType" : "0",  "readmodel" : "1"}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qlsign(){
 return new Promise((resolve) => {

qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/task/sign.action?openID=${qlhd.openid}&accountType=0`,
     //body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 1,  "securitykey" : "",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "xzwltoken070704",  "appversion" : "5.6.5",  "openid" : "${qlhd.openid}",  "os" : "iOS",  "artid" : 812907${Math.round(Math.random()*9)}${s},  "accountType" : "0",  "readmodel" : "1"}`,

     headers:JSON.parse(jkdck)
        
    }
   $.get(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.datas.profitDesc)
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qxsign(){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]
qxhd = decodeURIComponent  (qxhd)

qxhd = JSON.parse(qxhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/task/sign.action?openID=${qxhd.openid}&accountType=0`,
     //body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 1,  "securitykey" : "",  "channel" : "iOS",  "psign" : "${qxhd.psign}",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "${qxhd.apptoken}",  "appversion" : "5.6.5",  "openid" : "${qxhd.openid}",  "os" : "iOS",  "artid" : 812907${Math.round(Math.random()*9)}${s},  "accountType" : "0",  "readmodel" : "1"}`,

     headers:JSON.parse(jkdck)
        
    }
   $.get(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.datas.profitDesc)
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  async function qxvideo(artid){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]
qxhd = decodeURIComponent  (qxhd)

qxhd = JSON.parse(qxhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/readAccount.action`,
     body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 2,  "securitykey" : "",  "channel" : "iOS",  "psign" : "${qxhd.psign}",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "${qxhd.apptoken}",  "appversion" : "5.6.5",  "openid" : "${qxhd.openid}",  "os" : "iOS",  "artid" : ${artid},  "accountType" : "0",  "readmodel" : "1"}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  async function qlvideo(artid){
 return new Promise((resolve) => {

qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/account/readAccount.action`,
     body: `jsondata={  "appid" : "xzwl",  "read_weal" : 0,  "paytype" : 2,  "securitykey" : "",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630332532",  "apptoken" : "xzwltoken070704",  "appversion" : "5.6.5",  "openid" : "${qlhd.openid}",  "os" : "iOS",  "artid" : ${artid},  "accountType" : "0",  "readmodel" : "1"}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log("get coin: "+result.profit)
    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  
  async function xinshoutx(){
 return new Promise((resolve) => {

    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/activity/cashweal/noviceWelfareCash.action`,


     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
        $.log(result.ret)
    }else if(result.ret=="fail"){
        $.log(result.rtn_msg)
    }

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  
  
    async function qlartlist(){
 return new Promise((resolve) => {

qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newmobile/artlist.action`,
     body: `jsondata={  "appid" : "xzwl",  "connectionType" : 100,  "optaction" : "up",  "pagesize" : 12,  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337840",  "apptoken" : "xzwltoken070704",  "cateid" : 53,  "openid" : "${qlhd.openid}",  "os" : "iOS",  "appversion" : "5.6.5",  "idfa" : "1E83F5F8-7908-45CD-907A-DE1E93F505D6",  "operatorType" : 3,  "page" : 3}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
       qllist = result.artlist

        qlid = qllist[0]['art_id']
        $.log(qlid)
        await qlartDetail(qlid)
        await $.wait(30000)
        await qlvideo(qlid)

    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
   async function qlartDetail(artid){
 return new Promise((resolve) => {

qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newmobile/artDetail.action`,
     //body: `jsondata={  "appid" : "xzwl",  "connectionType" : 100,  "optaction" : "up",  "pagesize" : 12,  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337840",  "apptoken" : "xzwltoken070704",  "cateid" : 53,  "openid" : "${qlhd.openid}",  "os" : "iOS",  "appversion" : "5.6.5",  "idfa" : "1E83F5F8-7908-45CD-907A-DE1E93F505D6",  "operatorType" : 3,  "page" : 3}`,
body: `jsondata={  "appid" : "xzwl",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337593",  "apptoken" : "xzwltoken070704",  "requestid" : "1630337520179543",  "openid" : "${qlhd.openid}",  "os" : "iOS",  "artid" : ${artid},  "appversion" : "5.6.5",  "relate" : "1",  "scenetype" : ""}`,
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){

    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  async function qxartlist(){
 return new Promise((resolve) => {
qlhd = jkdhd.match(/jsondata=(.+)/)[1]
qlhd = decodeURIComponent  (qlhd)
qlhd = JSON.parse(qlhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newmobile/artlist.action`,
     body: `jsondata={  "appid" : "xzwl",  "connectionType" : 100,  "optaction" : "up",  "pagesize" : 12,  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337840",  "apptoken" : "xzwltoken070704",  "cateid" : 53,  "openid" : "${qlhd.openid}",  "os" : "iOS",  "appversion" : "5.6.5",  "idfa" : "1E83F5F8-7908-45CD-907A-DE1E93F505D6",  "operatorType" : 3,  "page" : 3}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){
       qllist = result.artlist

        qlid = qllist[0]['art_id']
        $.log(qlid)
        await qxartDetail(qlid)
        await $.wait(30000)
        await qxvideo(qlid)

    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
   async function qxartDetail(artid){
 return new Promise((resolve) => {
qlhd = jkdhd.match(/jsondata=(.+)/)[1]
qlhd = decodeURIComponent  (qlhd)
qlhd = JSON.parse(qlhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/newmobile/artDetail.action`,
     //body: `jsondata={  "appid" : "xzwl",  "connectionType" : 100,  "optaction" : "up",  "pagesize" : 12,  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337840",  "apptoken" : "xzwltoken070704",  "cateid" : 53,  "openid" : "${qlhd.openid}",  "os" : "iOS",  "appversion" : "5.6.5",  "idfa" : "1E83F5F8-7908-45CD-907A-DE1E93F505D6",  "operatorType" : 3,  "page" : 3}`,
body: `jsondata={  "appid" : "xzwl",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1630337593",  "apptoken" : "xzwltoken070704",  "requestid" : "1630337520179543",  "openid" : "${qlhd.openid}",  "os" : "iOS",  "artid" : ${artid},  "appversion" : "5.6.5",  "relate" : "1",  "scenetype" : ""}`,
     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{
//$.log(data)
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)

    if(result.ret=="ok"){

    }else $.log(result.rtn_msg)

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }


 async function qxlogin(){
 return new Promise((resolve) => {
qxhd = jkdhd.match(/jsondata=(.+)/)[1]
qxhd = decodeURIComponent  (qxhd)

qxhd = JSON.parse(qxhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/login/userlogin.action`,
     body: `jsondata={  "appid" : "xzwl",  "logout" : "0",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1631921300",  "upopenid" : "",  "apptoken" : "xzwltoken070704",  "openid" : ${qxhd.openid},  "os" : "iOS",  "uniqueid" : "",  "appversion" : "5.6.5",  "umengid" : "",  "memid" : "",  "smid" : ""}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  async function qllogin(){
 return new Promise((resolve) => {
qlhd = JSON.parse(jkdhd)
    let nm = {
     url: `https://www.xiaodouzhuan.cn/jkd/login/userlogin.action`,
     body: `jsondata={  "appid" : "xzwl",  "logout" : "0",  "channel" : "iOS",  "psign" : "92dea068b6c271161be05ed358b59932",  "appversioncode" : "565",  "time" : "1631921300",  "upopenid" : "",  "apptoken" : "xzwltoken070704",  "openid" : ${qlhd.openid},  "os" : "iOS",  "uniqueid" : "",  "appversion" : "5.6.5",  "umengid" : "",  "memid" : "",  "smid" : ""}`,

     headers:JSON.parse(jkdck)
        
    }
   $.post(nm,async(error, response, data) =>{

    try{

          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
