import requests
import json
import time
import os
import re
from datetime import datetime
from dateutil import tz

mins = int(time.time())
date_stamp = (mins-57600) % 86400
print(datetime.now(tz=tz.gettz('Asia/Shanghai')).strftime("%Y-%m-%d %H:%M:%S", ))
_datatime = datetime.now(tz=tz.gettz('Asia/Shanghai')).strftime("%Y%m%d", )
start=datetime.now().minute%10

tt='飞机✈️场ོ签到Github'
result=''
xmly_bark_cookie='azjFQzUeTG5hVYx7cRJRTU'

airplay_count_cookie="""_ga=GA1.2.1981050800.1600229941; _gid=GA1.2.1569373085.1600645292; koa:sess=eyJ1c2VySWQiOjUxNjMzLCJfZXhwaXJlIjoxNjI2MTUwMDczNTUxLCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=EmeUPW5KKelweXn0n6Z8FU73Jj8
_ga=GA1.2.1981050800.1600229941; _gat_gtag_UA_104464600_2=1; _gid=GA1.2.1681199069.1601014106; koa:sess=eyJ1c2VySWQiOjUyNjk0LCJfZXhwaXJlIjoxNjI2OTM0MjM0NDQ5LCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=YHOwLHoLxeM4RQYw7wV7dky9Ypo"""






def airplay_sign(ck):
    headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1','Host':'glados.rocks','Cookie':ck}
    body={"token":"glados_network"}
    response = requests.post('https://glados.rocks/api/user/checkin',headers=headers,data=body)
    #print(response.text)
    obj=response.json()
    x=re.findall('\d+',obj['list'][0]['balance'])
    msg=f"""打卡成功✅{obj['message']}打卡时间:{obj['list'][0]['detail']}剩余{x[0]}天"""
    loger(msg)
    

    
    
def showmsg(t,m):
    purl = "https://api.day.app/"+xmly_bark_cookie+"/"+t+"/"+m
    response = requests.post(purl)
    #print(response.text)
    
def loger(m):
   print(m)
   global result
   result +=m+'\n'
   
   
airplay_countListst=[]
for line in airplay_count_cookie.split('\n'):
        if not line:
            continue 
        airplay_countListst.append(line)

if not airplay_countListst[0]:
    print("账号cookie为空 跳出X")
    exit()

for count in airplay_countListst:
    airplay_sign(count)
    showmsg(tt,result)
    time.sleep(2)
