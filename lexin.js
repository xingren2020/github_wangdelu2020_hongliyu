/*=================================
关注微信公众号iosrule和微信群,2020.9.10
by红鲤鱼绿鲤鱼与驴

   群内转发乐心健康代码，当时不知道什么原因运行不成功。于是就参考作者代码修改。原作者脚本地址
https://raw.githubusercontent.com/iepngs/Script/master/lxhealth/index.js

#本脚本远程库订阅
https://raw.githubusercontent.com/wangdelu2020/hongliyu/master/lexin.js

配置教程:https://mp.weixin.qq.com/s/YjTgTToPEeX1infR1vTwHg


#QX 远程订阅乐心健康App签到

^https?:\/\/sports\.lifesense\.com\/sport_service\/sport\/sport\/uploadMobileStepV2 url script-request-body lexin.js


#定时(远程订阅)参考
0 2,13,25,45,55 0-23 * * ? lexin.js, tag=乐心健康, enabled=false


[MITM]
hostname=sports.lifesense.com
//====================================

#loon 远程订阅乐心健康App签到



[Script]
http-request ^https:\/\/sports\.lifesense\.com\/sport_service\/sport\/sport\/uploadMobileStepV2 script-path=lexin.js, requires-body=true, timeout=10, tag=乐❤️健康CK

cron "16 9 * * *" script-path=lexin.js, tag=乐心健康, enabled=true



*/





const $iosrule = iosrule();

const log=1;//设置0关闭日志,1开启日志

const lexinurlname="lexinurlname";
const lexinhdname="lexinhdname";
const lexinbdname="lexinbdname";


//++++++++++++++++++++++++++++++++-

const stepme=20000;//默认。脚本运行一次，步数自动增加。慢慢增加，大了小心封。
const lexin_iosrule="乐❤️健康";








//++++++++++++++++++++++++++++++++




 async function iosrule_begin()
 {
;


 papa(lexin_iosrule,"",await iosrule_sign());
   
}





  
  
  



function iosrule_sign()
  {
  return  new Promise((resolve, reject) => {
    
   var result1="";
   var result2="";

var lexinurl=$iosrule.read("lexinurlname");
var lexinbd=$iosrule.read("lexinbdname");
var lexinhd=$iosrule.read("lexinhdname");


var newurl=lexinurl.replace(/&requestId=\w+&/, `&requestId=${md5(guid())}&`);


var newbd=buildReqBody(lexinbd);




  const llUrl1={
      url:newurl,
      headers:JSON.parse(lexinhd),
      body:newbd,
      timeout:600};
     
  $iosrule.post(llUrl1,function(error, response, data) {
    console.log(data)
    newbd=JSON.parse(newbd);
    result2=newbd.list[0].created+"当前步数"+newbd.list[0].step+"步.步数里程"+newbd.list[0].distance/1000+"公里";
    console.log(result2);
resolve(result2);
})
})}

  

   
   



function iosrule_getck() {

  if ($request.headers) {

 var urlval = $request.url;

var md_hd=$request.headers;
   var md_bd = JSON.parse($request.body);


    md_bd.list = [md_bd.list[md_bd.list.length - 1]];
   
if(urlval.indexOf("sport_service/sport/sport/uploadMobileStepV2")>0)
{
 var sm= $iosrule.write(JSON.stringify(md_bd),lexinbdname);
 var sk= $iosrule.write(urlval,lexinurlname);
 var sl= $iosrule.write(JSON.stringify(md_hd),lexinhdname);
if (sk==true&&sl==true&&sm==true) 
 papa(lexin_iosrule,"[获取数据]","✌🏻成功");}



  
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



function buildReqBody(raw, modify = true) {
    steps =stepme+ Math.ceil(Math.random() * 2000);
    const calories = (0.0325 * steps).toFixed(2);
    const distance = Math.ceil((0.7484 * steps).toFixed(1));

    let body = JSON.parse(raw);
    const lastSectionIndex = body.list.length - 1;
    let section = body.list[lastSectionIndex];
    section.step = steps.toString();
    section.calories = calories.toString();
    section.distance = distance.toString();

    if (modify) {
        const nowMTs = Date.now().toString();
        const datetime = date("Y-m-d H:i:s", nowMTs);

        body.timestamp = nowMTs;
        section.id = md5(section.deviceId + nowMTs);
        section.created = datetime;
        section.measurementTime = datetime.substr(0, 14) + "00:00";
    }

    body.list[lastSectionIndex] = section;
    return JSON.stringify(body);
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


function md5(s, hexcase = 0) { var b64pad = ""; function hex_md5(s) { return rstr2hex(rstr_md5(str2rstr_utf8(s))) } function b64_md5(s) { return rstr2b64(rstr_md5(str2rstr_utf8(s))) } function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e) } function hex_hmac_md5(k, d) { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))) } function b64_hmac_md5(k, d) { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))) } function any_hmac_md5(k, d, e) { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e) } function md5_vm_test() { return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72" } function rstr_md5(s) { return binl2rstr(binl_md5(rstr2binl(s), s.length * 8)) } function rstr_hmac_md5(key, data) { var bkey = rstr2binl(key); if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8); var ipad = Array(16), opad = Array(16); for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 0x36363636; opad[i] = bkey[i] ^ 0x5C5C5C5C } var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8); return binl2rstr(binl_md5(opad.concat(hash), 512 + 128)) } function rstr2hex(input) { try { hexcase } catch (e) { hexcase = 0 } var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef"; var output = ""; var x; for (var i = 0; i < input.length; i++) { x = input.charCodeAt(i); output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F) } return output } function rstr2b64(input) { try { b64pad } catch (e) { b64pad = '' } var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var output = ""; var len = input.length; for (var i = 0; i < len; i += 3) { var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0); for (var j = 0; j < 4; j++) { if (i * 8 + j * 6 > input.length * 8) output += b64pad; else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F) } } return output } function rstr2any(input, encoding) { var divisor = encoding.length; var i, j, q, x, quotient; var dividend = Array(Math.ceil(input.length / 2)); for (i = 0; i < dividend.length; i++) { dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1) } var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2))); var remainders = Array(full_length); for (j = 0; j < full_length; j++) { quotient = Array(); x = 0; for (i = 0; i < dividend.length; i++) { x = (x << 16) + dividend[i]; q = Math.floor(x / divisor); x -= q * divisor; if (quotient.length > 0 || q > 0) quotient[quotient.length] = q } remainders[j] = x; dividend = quotient } var output = ""; for (i = remainders.length - 1; i >= 0; i--)output += encoding.charAt(remainders[i]); return output } function str2rstr_utf8(input) { var output = ""; var i = -1; var x, y; while (++i < input.length) { x = input.charCodeAt(i); y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0; if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) { x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF); i++ } if (x <= 0x7F) output += String.fromCharCode(x); else if (x <= 0x7FF) output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F)); else if (x <= 0xFFFF) output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)); else if (x <= 0x1FFFFF) output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F)) } return output } function str2rstr_utf16le(input) { var output = ""; for (var i = 0; i < input.length; i++)output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF); return output } function str2rstr_utf16be(input) { var output = ""; for (var i = 0; i < input.length; i++)output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF); return output } function rstr2binl(input) { var output = Array(input.length >> 2); for (var i = 0; i < output.length; i++)output[i] = 0; for (var i = 0; i < input.length * 8; i += 8)output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32); return output } function binl2rstr(input) { var output = ""; for (var i = 0; i < input.length * 32; i += 8)output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF); return output } function binl_md5(x, len) { x[len >> 5] |= 0x80 << ((len) % 32); x[(((len + 64) >>> 9) << 4) + 14] = len; var a = 1732584193; var b = -271733879; var c = -1732584194; var d = 271733878; for (var i = 0; i < x.length; i += 16) { var olda = a; var oldb = b; var oldc = c; var oldd = d; a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936); d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586); c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819); b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330); a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897); d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426); c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341); b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983); a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416); d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417); c = md5_ff(c, d, a, b, x[i + 10], 17, -42063); b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162); a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682); d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101); c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290); b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329); a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510); d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632); c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713); b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302); a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691); d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083); c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335); b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848); a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438); d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690); c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961); b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501); a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467); d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784); c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473); b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734); a = md5_hh(a, b, c, d, x[i + 5], 4, -378558); d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463); c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562); b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556); a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060); d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353); c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632); b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640); a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174); d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222); c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979); b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189); a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487); d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835); c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520); b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651); a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844); d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415); c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905); b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055); a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571); d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606); c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523); b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799); a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359); d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744); c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380); b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649); a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070); d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379); c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259); b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551); a = safe_add(a, olda); b = safe_add(b, oldb); c = safe_add(c, oldc); d = safe_add(d, oldd) } return Array(a, b, c, d) } function md5_cmn(q, a, b, x, s, t) { return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b) } function md5_ff(a, b, c, d, x, s, t) { return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t) } function md5_gg(a, b, c, d, x, s, t) { return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t) } function md5_hh(a, b, c, d, x, s, t) { return md5_cmn(b ^ c ^ d, a, b, x, s, t) } function md5_ii(a, b, c, d, x, s, t) { return md5_cmn(c ^ (b | (~d)), a, b, x, s, t) } function safe_add(x, y) { var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF) } function bit_rol(num, cnt) { return (num << cnt) | (num >>> (32 - cnt)) } return rstr2hex(rstr_md5(str2rstr_utf8(s))) }
function guid() { const S4 = () => { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); }; return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); }
function date(fmt, dateObject = '') { dateObject = dateObject ? (dateObject == "object" ? dateObject : (new Date(+dateObject.toString().padEnd(13, "0").substr(0, 13)))) : new Date(); let ret; const opt = { "Y": dateObject.getFullYear().toString(), "m": (dateObject.getMonth() + 1).toString(), "d": dateObject.getDate().toString(), "H": dateObject.getHours().toString(), "i": dateObject.getMinutes().toString(), "s": dateObject.getSeconds().toString() }; for (let k in opt) { ret = new RegExp("(" + k + ")").exec(fmt); if (ret) { fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k].padStart(2, "0") : opt[k]) }; }; return fmt; }

