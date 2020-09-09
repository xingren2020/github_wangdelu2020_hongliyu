/*=================================
关注微信公众号iosrule和微信群,2020.9.8
by红鲤鱼绿鲤鱼与驴


2020.9.9增加1个,请及时更新重写命令。教程:https://mp.weixin.qq.com/s/YjTgTToPEeX1infR1vTwHg


#欢迎微信撸金币群提出靠谱打卡小程序方便更新。远程库订阅
https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js


#QX 远程订阅微信签到打卡小程序App签到
https:\/\/(www\.baimaa\.com|www\.2xtj7\.cn|www\.hnmiaosu\.cc|ph0001\.hezyq\.com)\/app\/index\.php? url script-request-header https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js



#定时
0 2,13,25,45,55 0-23 * * ? wxdaka.js, tag=微信小程序打卡签到, enabled=false

mit=www.2xtj7.cn,www.baimaa.com,www.hnmiaosu.cc,ph0001.hezyq.com

//====================================

#loon 微信签到打卡小程序App签到

http-request https:\/\/(www\.baimaa\.com|www\.2xtj7\.cn|www\.hnmiaosu\.cc|ph0001\.hezyq\.com)\/app\/index\.php? script-path=https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/wxdaka.js, requires-header=true, timeout=30, tag=微信打卡小程序

mit=www.2xtj7.cn,www.baimaa.com,www.hnmiaosu.cc,ph0001.hezyq.com

#定时间隔5分

#点击打卡获取ck。

*/





const $iosrule = iosrule();

const log=1;//设置0关闭日志,1开启日志

var mit=["www.2xtj7.cn","www.baimaa.com","www.hnmiaosu.cc","ph0001.hezyq.com"];
var tt=["小打卡赚钱(20次打卡)","音乐line(10次)"," 天天打卡赚赚(9次)","天天打卡赚钱(20次)"];


//++++++++++++++++++++++++++++++++-


const weixin_iosrule="微信小程序打卡集成";
var wxurlname="wxurlname";
var wxbdname="wxbdname";







//++++++++++++++++++++++++++++++++




 async function iosrule_begin()
 {
let s0=await iosrule_sign(0);
let s1=await iosrule_sign(1);
let s2=await iosrule_sign(2);
let s3=await iosrule_sign(3);
 papa(weixin_iosrule,"",s0+s1+s2+s3);
   
}





  
  
  



function iosrule_sign(t)
  {
  return  new Promise((resolve, reject) => {
    
   var result1=tt[t];
   var result2="";

var wxurl=$iosrule.read("wxurlname"+t);
var wxhd=$iosrule.read("wxhdname"+t);

  const llUrl1={
      url:wxurl,
      headers:JSON.parse(wxhd),
      timeout:600};
     
  $iosrule.get(llUrl1,function(error, response, data) {
//if(log==1)console.log(JSON.stringify(data))
var obj=JSON.parse(data);
if(obj.status==1)
result2="打卡成功!✅";
else if(obj.status==2)
result2=obj.info;
else
result2="UFO📛🎏❎,面壁思过吧";
result2="["+result1+"]"+result2+"\n";

resolve(result2);
})
})}

  

   
   



function iosrule_getck() {

  if ($request.headers) {

 var urlval = $request.url;

var md_hd=$request.headers;
if(urlval.indexOf("&action=sign&contr=clock")>=0)
{
for(var i in mit)
{
  if(urlval.indexOf(mit[i])>0)
  {var temp=i;
  var wxurlname="wxurlname"+i;
    var wxhdname="wxhdname"+i;
  console.log(wxurlname)}
}
 var sk= $iosrule.write(urlval,wxurlname);
 var sl= $iosrule.write(JSON.stringify(md_hd),wxhdname);
if (sk==true&&sl==true) 
 papa(tt[temp],"[获取打卡数据]","✌🏻成功");}



  
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
  iosrule_getck()
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




