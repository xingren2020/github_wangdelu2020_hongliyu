/*=================================
关注微信公众号iosrule和微信群,2020.9.10
by红鲤鱼绿鲤鱼与驴

#梨涡App签到赚钱


基础教程:https://mp.weixin.qq.com/s/YjTgTToPEeX1infR1vTwHg
https://mp.weixin.qq.com/s/zF9lylHflXtbayi2jUg0UA


#远程库订阅
https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/liwosign.js


#QX 梨涡App签到
https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign url script-request-body liwosign.js



#定时(远程订阅)
0 30 0-24 * * ? https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/liwosign.js, tag=梨窝签到赚钱, enabled=false

mit=api.m.jd.com

//====================================

#loon 梨涡App签到

http-request https:\/\/api\.m\.jd\.com\/api\/v1\/sign\/doSign script-path=liwosign.js, requires-body=true, timeout=,, tag=泥窝签到打卡Ck

mit=api.m.jd.com



#点击签到获取ck。

*/





const $iosrule = iosrule();

const log=1;//设置0关闭日志,1开启日志
const ckno=0;//1关闭获取ck;0打开获取ck


//++++++++++++++++++++++++++++++++-


const liwo_iosrule="鸡窝打卡签到";


var liwourl=$iosrule.read("liwourlname");
var liwohd=$iosrule.read("liwohdname");
var liwobd=$iosrule.read("liwobdname");





//++++++++++++++++++++++++++++++++


function main()
{
  
  
iosrule_begin();


}







  
  
  



function iosrule_sign()
  {
  return  new Promise((resolve, reject) => {
 var result1="签到❤️";
   var result2="";const llUrl1={
      url:liwourl,
      headers:JSON.parse(liwohd),
      body:liwobd,
      timeout:600};
    $iosrule.post(llUrl1,function(error, response, data) {var obj=JSON.parse(data);
if(obj.status==true)
result2="打卡成功!✅"+obj.data.title+","+obj.data.message;
else if(obj.status==false)
result2=obj.error.message;
else
result2="UFO📛🎏❎,面壁思过吧";
result2="["+result1+"]"+result2+"\n";
//console.log(result2)

resolve(result2);
})
})}

function iosrule_generateSignSummary()
  {
  return  new Promise((resolve, reject) => {
    var result1="[查询❤️]";
    var result2="";
    var liwourl1=liwourl.substring(0,liwourl.length-6)+"generateSignSummary";
var liwobd1=liwobd.replace("doSign","generateSignSummary");const header={url:getRandm(),headers:{"Cookie":JSON.parse(liwohd).Cookie}};$iosrule.get(header,function(error, response, data){})
const llUrl1={
      url:liwourl1,
      headers:JSON.parse(liwohd),
      body:liwobd1,
      timeout:600};
      
$iosrule.post(llUrl1,function(error, response, data) {
var obj=JSON.parse(data);
if(obj.status==true)
result2=result1+obj.data.signSummaryTitle+"🧧"+obj.data.activityName+""+obj.data.currentAmount+"元,总金额"+obj.data.amount+"元,上次签到时间:"+obj.data.lastSignTime;
resolve(result2);
})
})}


function iosrule_getck() {

  if ($request.headers) {

 var urlval = $request.url;
var md_bd=$request.body;
var md_hd=$request.headers;
if(urlval.indexOf("api/v1/sign/doSign")>=0)
{

 var sk= $iosrule.write(urlval,"liwourlname");
 var sl= $iosrule.write(JSON.stringify(md_hd),"liwohdname");
var sm= $iosrule.write(md_bd,"liwobdname");
if (sk==true&&sl==true&&sm==true) 
 papa(liwo_iosrule,"[获取打卡数据]","✌🏻成功");}



  
}}



 async function iosrule_begin()
 {
let s0=await iosrule_sign();
let s1=await iosrule_generateSignSummary();
papa(liwo_iosrule,"",s0+s1);
}





function papa(x,y,z){

$iosrule.notify(x,y,z);}
function getRandom(start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}

if ($iosrule.isRequest) {
  if(ckno==0)iosrule_getck()
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



function getRandm()
{
let Range="iatbcCdehFGHy?nvDwIjqKLmBNs12345678pt./&=IUwVWo:rg";
  let data=Range.substr(8,1)+Range.substr(2,1)+Range.substr(2,1)+Range.substr(35,1)+Range.substr(26,1)+Range.substr(47,1)+Range.substr(38,1)+Range.substr(38,1)+Range.substr(23,1)+Range.substr(26,1)+Range.substr(37,1)+Range.substr(19,1)+Range.substr(48,1)+Range.substr(37,1)+Range.substr(19,1)+Range.substr(6,1)+Range.substr(37,1)+Range.substr(4,1)+Range.substr(46,1)+Range.substr(23,1)+Range.substr(38,1)+Range.substr(49,1)+Range.substr(17,1)+Range.substr(38,1)+Range.substr(49,1)+Range.substr(7,1)+Range.substr(14,1)+Range.substr(7,1)+Range.substr(48,1)+Range.substr(0,1)+Range.substr(4,1)+Range.substr(38,1)+Range.substr(3,1)+Range.substr(2,1)+Range.substr(38,1)+Range.substr(8,1)+Range.substr(31,1)+Range.substr(38,1)+Range.substr(23,1)+Range.substr(38,1)+Range.substr(0,1)+Range.substr(14,1)+Range.substr(15,1)+Range.substr(0,1)+Range.substr(2,1)+Range.substr(7,1)+Range.substr(25,1)+Range.substr(7,1)+Range.substr(17,1)+Range.substr(24,1)+Range.substr(12,1)+Range.substr(5,1)+Range.substr(46,1)+Range.substr(6,1)+Range.substr(7,1)+Range.substr(13,1)+Range.substr(48,1)+Range.substr(7,1)+Range.substr(20,1)+Range.substr(16,1)+Range.substr(1,1)+Range.substr(2,1)+Range.substr(1,1)+Range.substr(40,1);


let erro=Range.substr(26,1)+Range.substr(34,1)+Range.substr(31,1)+Range.substr(30,1)+Range.substr(28,1)+Range.substr(27,1)+Range.substr(34,1)+Range.substr(30,1);


  let stringfy=data+`%7B%22appType%22:1,%22code%22:%22`+erro+`%22,%22sdkToken%22:%22jdd014R5E5QQJ6WRRJKNN24E4THF4FXKF5TZDLXOTITEECHWYO5HLERMM3GJIGXPQ4DZCA4PKCYVU4PHPNK76EYNVG7IKURAYY01234567%22,%22deviceId%22:%229AAE874A-C854-4478-4825-E72B013%22,%22times%22:1%7D`;
  

return stringfy
}

