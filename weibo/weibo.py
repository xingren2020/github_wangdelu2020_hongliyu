import requests
import json
import os

cookiesList = []

headers={"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Weibo (iPhone11,8__weibo__10.10.2__iphone__os12.4)"}

weibo_sign_cookie=''
def weibo_sign(url):
    print('\n签到')
    msg='【签到】'
    response = requests.post(url)
    try:
      print(response.text)
    except Exception as e:
        msg=+str(e)
        print(msg)
        


def check():
   global weibo_sign_cookie
   if "WEIBO_SIGN_COOKIE" in os.environ:
      weibo_sign_cookie = os.environ["WEIBO_SIGN_COOKIE"]
      for line in weibo_sign_cookie.split('\n'):
        if not line:
          continue 
        cookiesList.append(line)
   elif weibo_sign_cookie:
       for line in weibo_sign_cookie.split('\n'):
         if not line:
            continue 
         cookiesList.append(line.strip())
   else:
    	print('没有基础数据退出')
    	exit()

def main():
   check()
   for count in cookiesList:
      print(count)
      weibo_sign(count)

if __name__ == '__main__':
    main()
