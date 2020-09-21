/*=================================
⚠️免责声明：
1. 此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2. 由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3. 请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4. 此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5. 本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6. 如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7. 所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。

#关注微信公众号iosrule和微信群,by红鲤鱼绿鲤鱼与驴 2020.9.16

Quantumult X:
[task_local]
0 0 * * * airplaysign.js, tag=机场签到

[rewrite_local]
^https:\/\/glados\.rocks\/api\/user\/checkin url script-request-body airplaysign.js


Surge & Loon:
[Script]
cron "0 0 * * *" script-path=airplaysign.js

http-request ^https:\/\/glados\.rocks\/api\/user\/checkin script-path=airplaysign.js requires-body=true, timeout=10, tag=airplaysign.js

All app:
[mitm]
hostname = glados.rocks

获取完 Cookie 后可不注释 rewrite / hostname，Cookie 更新时会弹窗。若因 MitM 导致该软件网络不稳定，可注释掉 hostname。
*/

const $iosrule = iosrule();
const log=1;//设置0关闭日志,1开启日志
const getck=1;//设置0关闭获取ck,1开启获取ck





var tt=["[https://glados.rocks]✈️场ོ签到"];







//以下部分不要改动
//以下部分不要改动



//以下部分不要改动
//以下部分不要改动



//以下部分不要改动
//以下部分不要改动




var all="";
const _iosrule=tt[0];


const sign_hdst="glados.rocks";
const sign_bdst="glados_network";






















//++++++++++++++++++++++++++++++++




 async function iosrule_begin()
 {


try{
 
all=await iosrule_sign();



}catch(all){

  console.log(all)
}

finally{
papa(_iosrule,"",all);
}

   




}





  
  
  



function iosrule_sign()
  {
  return  new Promise((resolve, reject) => {
    
   var result1="[签到]";
   var result2="";


var jichanghd=$iosrule.read(sign_hdst);
var jichangbd=$iosrule.read(sign_bdst);
//console.log(jichanghd)
if(jichanghd!==undefined)
  {const jsonurl={
      url:"https://glados.rocks/api/user/checkin",
      headers:JSON.parse(jichanghd),
      body:JSON.parse(jichangbd),
      timeout:60000};
     
  $iosrule.post(jsonurl,function(error, response, data) {
console.log(data)
var obj=JSON.parse(data);
if(obj.code==0)
result2="打卡成功!✅"+obj.message+",打卡时间:"+obj.list[0].detail+",剩余天"+obj.list[0].balance.match(/\d+/g)[0]+"天.";
else
result2="UFO📛🎏❎,面壁思过吧";
//console.log(result2)

resolve(result2);
})
} else papa(_iosrule,"❎错误","请获取ck")
})}

   






function iosrule_getck() {

  if ($request.headers) {

 var urlval = $request.url;
var md_bd=$request.body;
var md_hd=$request.headers;
if(urlval.indexOf("api/user/checkin")>=0)
{
 var sk= $iosrule.write(JSON.stringify(md_hd),sign_hdst);


var sm= $iosrule.write(JSON.stringify(md_bd),sign_bdst);
if (sk==true&&sm==true) 
 papa(_iosrule,"[获取签到数据]","✌🏻成功");}  
}}





function main()
{
iosrule_begin();}



function papa(x,y,z){

$iosrule.notify(x,y,z);}
function getRandom(start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}

if ($iosrule.isRequest) {
  if(getck==1)iosrule_getck()
  $iosrule.end()
} else {
  main();
  $iosrule.end()
 }



function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};




