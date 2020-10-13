import requests
import json
import time
import os
from datetime import datetime
from dateutil import tz

mins = int(time.time())
date_stamp = (mins-57600) % 86400
print(datetime.now(tz=tz.gettz('Asia/Shanghai')).strftime("%Y-%m-%d %H:%M:%S", ))
_datatime = datetime.now(tz=tz.gettz('Asia/Shanghai')).strftime("%Y%m%d", )
start=datetime.now().minute%10

tt='腾讯新闻'
result=''
def tx_user(ck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck}
    response = requests.post('https://r.inews.qq.com/i/getUserCheckInfo?',headers=headers)
    obj=response.json()
    msg=f"""用户名:{obj['data']['nick']}"""
    print(msg)
    loger(msg)

def tx_signday(ck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck}
    response = requests.get('https://api.inews.qq.com/task/v1/user/signin/add?',headers=headers)
    #print(response.json())
    obj=response.json()
    msg=f"""连续签到:{obj['data']['signin_days']}天"""
    print(msg)
    loger(msg)
   
    
def tx_task(ck,rck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck}
    response = requests.get('https://api.inews.qq.com/activity/v1/activity/info/get?activity_id=stair_redpack_chajian&'+rck,headers=headers)
    #print(response.json())
    obj=response.json()
    msg=f"""[阅读红包]{obj['data']['award'][0]['opened']}-{obj['data']['award'][0]['total']}[视频红包]{obj['data']['award'][1]['opened']}-{obj['data']['award'][1]['total']}
[阅读任务]{obj['data']['award'][0]['title']}[视频任务]{obj['data']['award'][1]['title']};"""
    print(msg)
    loger(msg)
    
def tx_read(ck,rck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck,'Content-Type':'application/x-www-form-urlencoded'}
    body ='event=article_read'
    response = requests.post('https://api.inews.qq.com/event/v1/user/event/report?'+rck,headers=headers,data=body)
    print(response.json())
    obj=response.json()
    msg='阅读:'+obj['info']+'✅'
    print(msg)
    loger(msg)
    
def tx_video(ck,rck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck,'Content-Type':'application/x-www-form-urlencoded'}
    body ='event=video_read&extend=%7B%22video_id%22%3A%2220200622V0CGJH00%22%7D'
    response = requests.post('https://api.inews.qq.com/event/v1/user/event/report?'+rck,headers=headers,data=body)
    print(response.json())
    obj=response.json()
    msg='视频:'+obj['info']+'✅'
    print(msg)
    loger(msg)
    
    
    
def tx_wallet(ck):
    headers = {
        'User-Agent': 'QQNews/6.1.30 (iPhone; iOS 12.4; Scale/2.00)','Cookie':ck}
    response = requests.get('https://api.inews.qq.com/activity/v1/usercenter/activity/list?isJailbreak=0',headers=headers)
    #print(response.json())
    obj=response.json()
    msg=f"""金币:{obj['data']['wealth'][0]['title']}红包:{obj['data']['wealth'][1]['title']}"""
    print(msg)
    loger(msg)

def showmsg(t,m):
    purl = "https://api.day.app/"+xmly_bark_cookie+"/"+t+"/"+m
    response = requests.post(purl)
    #print(response.text)
    
def loger(m):
   global result
   result +=m+'\n'
    
    
xmly_bark_cookie='azjFQzUeTG5hVYx7cRJRTU'


if "TXNEWS_READ_COOKIE" in os.environ:
    print("读取阅读数据")
    txnews_read_cookie = os.environ["TXNEWS_READ_COOKIE"]

if "TXNEWS_VIDEO_COOKIE" in os.environ:
    print("读取视频数据")
    txnews_video_cookie = os.environ["TXNEWS_VIDEO_COOKIE"]

if "TXNEWS_COUNT_COOKIE" in os.environ:
    print("读取账号数据")
    txnews_count_cookie = os.environ["TXNEWS_COUNT_COOKIE"]

if "TXNEWS_BARK_COOKIE" in os.environ:
    print("读取BARK数据")
    txnews_bark_cookie = os.environ["TXNEWS_BARK_COOKIE"]


read_cookiesList = []  # 重置cookiesList
for line in txnews_read_cookie.split('\n'):
        if not line:
            continue 
        read_cookiesList.append(line)
if not read_cookiesList[0]:
    print("阅读cookie为空 跳出X")
    exit()
    
    
video_cookiesList = []  # 重置cookiesList
for line in txnews_video_cookie.split('\n'):
        if not line:
            continue 
        video_cookiesList.append(line)

if not video_cookiesList[0]:
    print("视频cookie为空 跳出X")
    exit()

txnews_countListst=[]
for line in txnews_count_cookie.split('\n'):
        if not line:
            continue 
        txnews_countListst.append(line)

if not txnews_countListst[0]:
    print("账号cookie为空 跳出X")
    exit()


def checkcount(b,o):
# 范围时间9:30-9:33
    start_time = datetime.strptime(str(datetime.now().date())+b, '%Y-%m-%d%H:%M')
    end_time =  datetime.strptime(str(datetime.now().date())+o, '%Y-%m-%d%H:%M')
    print(start_time)
    print(end_time)
    now_time = datetime.now()
    if now_time > start_time and now_time<end_time:
       isin = True 
    else:
       isin = False
    return isin
     
flag = checkcount('0:05','12:39')
if flag == True:
   Cookie=txnews_countListst[0]
else:
    Cookie=txnews_countListst[1]
print('>>>>>>>>>【🍋开始】'+str(start)+'篇')
tx_ck1=read_cookiesList[start]
tx_ck2=video_cookiesList[start]
tx_user(Cookie)
tx_signday(Cookie)
tx_read(Cookie,tx_ck1)
tx_video(Cookie,tx_ck2)
tx_task(Cookie,tx_ck1)
tx_wallet(Cookie)
showmsg(tt,result)
 
