/*=================================
#微信公众号iosrule
#by红鲤鱼绿鲤鱼与驴 2020.9.23
#很多网友在公众号回复微博超话，于是就改写很早之前的版本，就当更新下。
#教程:关注公众号，翻看历史教程文章。

#本脚本远程库订阅
https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/newsinachaohua.js

#QX 新浪超话签到
https:\/\/m\.weibo\.cn\/api\/config url script-request-header newsinachaohua.js

#定时(远程订阅)
0 30 0,6 * * ? newsinachaohua.js, tag=新浪微博超话签到, enabled=true

mit=m.weibo.cn

//====================================

#loon新浪超话签到

http-request https:\/\/m\.weibo\.cn\/api\/config script-path=newsinachaohua.js, requires-header=true, timeout=30, tag=新浪微博超话签到

mit=m.weibo.cn


#使用方法🔍

##苹果手机浏览器登录打开微博网址
https://m.weibo.cn/login?
登录获取ck。如果登录后获取不到ck，登录手机网页微博后打开网址https://m.weibo.cn/api/config获取ck。


*/

const $iosrule = iosrule();
const log=1;//设置0关闭日志,1开启日志
const getck=1;//设置0关闭获取ck,1开启获取ck








//以下部分不要改动

var all="";
var tt=`超话签到 `;
var sinack="";var sinackst="QQ群559544370";var chaohua_signed=0;var letmego="%7B%22manage%22%3A%22%22%2C%22follow%22%3A%221022%3A100808d6c28f442d2e533060293f0dc9acaafa%22%2C%22page%22%0A22%7D";



//++++++++++++++++++++++++++++++++




 async function sinachaogua_begin()
 {
await sinachaogua_data();
let user=await sinachaogua_user();
await sinachaogua_sign(user,letmego,chaohua_signed);

   
}




function sinachaogua_data(){
  return  new Promise((resolve, reject) => {sinack=$iosrule.read(sinackst);
  tt+=getCurrentDate();
  if(sinack==undefined)
  {
    
    let st1="读取签到Cookies数据错误❎";
    let st2=`请看使用说明获取ck数据!
#1.苹果手机浏览器登录打开微博网址
https://m.weibo.cn/login?
登录获取ck。
#2.如果登录后获取不到ck，登录手机网页微博后打开网址
https://m.weibo.cn/api/config
获取ck。`;console.log(st1+"\n"+st2);
    papa(tt,st1,st2)}
  else sinack=JSON.parse(sinack);
  resolve();})}

function sinachaogua_user(){
return  new Promise((resolve, reject) => {
    
var result1=tt;var result2="";
const user_url={
      url:"https://m.weibo.cn/api/users/show",
       headers:{Cookie:sinack.Cookie,'User-Agent':sinack['User-Agent']},
       timeout:600
               };
      $iosrule.get(user_url,function(error, response, data) {
//console.log(data)
var obj=JSON.parse(data);
if(obj.ok==1)
result2=`【用户名】`+obj.data.screen_name+`\n    [微博]`+obj.data.statuses_count+"[关注]"+obj.data.followers_count+"[粉丝]"+obj.data.follow_count+"\n";
console.log(result2);
resolve(result2);
})
})}



  
function sinachaogua_sign(before,firstid,sed)
  {
   return  new Promise((resolve, reject) => {
    
   var result1=tt;
   var result2="";
 
   const pageurl = {
        url: 'https://m.weibo.cn/api/container/getIndex?containerid=100803_-_followsuper&luicode=10000011&lfid=231093_-_chaohua&since_id='+firstid,
       headers:{Cookie:sinack.Cookie,'User-Agent':sinack['User-Agent']},
       timeout:600
               };
               
       
    
 $iosrule.get(pageurl, function(error, response, data) {
 const obj = JSON.parse(data)

if(obj.ok=="1"){
firstid=obj.data.cardlistInfo.since_id;
firstid=encodeURIComponent(firstid);

let tot=obj.data.cards[0].card_group.length;
    for (i=0;i<obj.data.cards[0].card_group.length;i++){
       (function(i) {
       setTimeout(function() {
    let check=obj.data.cards[0].card_group[i].card_type;

    if(check!="8")
    {
      i++;tot--;

if(check=="6")
{
console.log("**********🔔统计*********")
console.log(tt+"\n"+before+all);
console.log("**********🔔结束*********")
papa(tt,"",before+all);
resolve();}
    }
else{
var stt=obj.data.cards[0].card_group[i].buttons[0].scheme;
var title=obj.data.cards[0].card_group[i].title_sub;

  if (stt==false)
  {
    sed++;
  
 console.log(sed+".【"+title+"】已签到✅✅");
  all+=sed+".【"+title+"】已签到✅✅"+"\n";
  
 if(i==tot-1)
   {if(!firstid=="")
   {
   sinachaogua_sign(before,firstid,sed);
}


 }
  

  }
  
  else
  {
chaosign=stt.substring(stt.indexOf("sign"),stt.length);

 
const chaohuaurl = {
 url: 'https://m.weibo.cn/api/container/button?'+chaosign,
        headers:{Cookie:sinack.Cookie,'User-Agent':sinack['User-Agent']},
             timeout:600
              };

   chaohuaurl.headers['Referer'] ='https://m.weibo.cn/p/tabbar?containerid=100803_-_followsuper&luicode=10000011&lfid=231093_-_chaohua&page_type=tabbar';
   $iosrule.post(chaohuaurl, function(error, response, data) {
 //console.log("超话"+title+"签到data")
  const objj = JSON.parse(data);
if (objj.msg=="已签到"){
sed++;
 console.log(sed+".【"+title+"】已签到✅");
  all+=sed+".【"+title+"】已签到✅"+"\n";
  
  if(i==tot-1)
    {if(!firstid==""){sed++;
  sinachaogua_sign(before,firstid,sed)}
  }
  }
  })
}
}
   }, (i + 1) * 1000);
       })(i)
       }



 }else{result2=obj.msg;
console.log(tt+"\n"+before+result2);
papa(tt,"",before+result2);resolve();
 }

})
})}
   




  

























function sinachaogua_getck() {

  if ($request.headers) {

 var urlval = $request.url;

var md_hd=$request.headers;
if(urlval.indexOf("api/config")>=0&&urlval.indexOf("api/config/")<0)
{
console.log("发现"+tt+"签到数据");
 var sk= $iosrule.write(JSON.stringify(md_hd),sinackst);

if (sk==true) 
 papa(tt,"[获取超话签到数据]","✌🏻成功");}



  
}}





function main()
{sinachaogua_begin();}



function papa(x,y,z){$iosrule.notify(x,y,z);}


if ($iosrule.isRequest) {
  if(getck==1)sinachaogua_getck()
  $iosrule.end()
} else {
  main();
  $iosrule.end()
 }

function getCurrentDate() {

      var myDate = new Date();

var year = myDate.getFullYear(); //年

var month = myDate.getMonth() + 1; //月

      var day = myDate.getDate(); //日

      var days = myDate.getDay();

      switch(days) {

            case 1:

                  days = '星期一';

                  break;

            case 2:

                  days = '星期二';

                  break;

            case 3:

                  days = '星期三';

                  break;

            case 4:

                  days = '星期四';

                  break;

            case 5:

                  days = '星期五';

                  break;

            case 6:

                  days = '星期六';

                  break;

            case 0:

                  days = '星期日';

                  break;



      }

      var str = year + "年" + month + "月" + day + "日  " + days;

      return str;

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




