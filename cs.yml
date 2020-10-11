import requests
import json
import rsa
import base64
import time
from itertools import groupby
from functools import reduce
from random import choice
import hashlib
from datetime import datetime
from dateutil import tz
import os

# 喜马拉雅极速版
# 使用参考 xmly_speed.md
# cookies填写

cookies1 = ""  # 字符串形式 都可以识别
cookies2 = {
}  # 字典形式




cookiesList = [cookies1, ]  # 多账号准备




UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iting/1.0.12 kdtunion_iting/1.0 iting(main)/1.0.12/ios_1"
# 非iOS设备的需要的自行修改,自己抓包 与cookie形式类似


def str2dict(str_cookie):
    if type(str_cookie) == dict:
        return str_cookie
    tmp = str_cookie.split(";")
    dict_cookie = {}
    for i in tmp:
        j = i.split("=")
        if not j[0]:
            continue
        dict_cookie[j[0].strip()] = j[1].strip()
    return dict_cookie




if "XMLY_SPEED_COOKIE" in os.environ:
    """
    判断是否运行自GitHub action,"XMLY_SPEED_COOKIE" 该参数与 repo里的Secrets的名称保持一致
    """
    print("执行自GitHub action")
    xmly_speed_cookie = os.environ["XMLY_SPEED_COOKIE"]
  
