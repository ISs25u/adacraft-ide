#!/usr/bin/env python

from ftplib import FTP, FTP_TLS
import time as time
import os
import re

WDIR = os.environ['FTP_WDIR']
USR = os.environ['FTP_USER']
PWD = os.environ['FTP_PASS']
HST = os.environ['FTP_HOST']

session = None

def getSession():

    global session


#   if session is None :
#     print("\tFTP Connect")

    try :
      session = FTP(HST)
      session.login(USR,PWD)
    except :
       print("\tError connecting FTP")

    return session

def list_files():

    print("\tFTP list files")

    ses = getSession()

    if ses is None :
      return {}

    content = []

    try :
        ses.retrlines('MLSD %s'%(WDIR),content.append)
    except :
        print("\tError loading directories")
        return {}

    description = []

    for l in content :
        d = {}
        for e in l.split(';'):
            el = e.split('=')
            if len(el) == 2:
                d[el[0].strip()] = el[1].strip()
            elif len(el) == 1:
                d['name'] = el[0].strip()

        description.append(d)

    directories = [d['name'] for d in description if d['type'] == 'dir']
   
    all_files = {}
    for d in directories :
        l_files = []

        try :
            ses.retrlines('NLST %s%s/'%(WDIR,d), l_files.append)
        except :
            print("\tError loading directory")

        if len(l_files) > 0 :
            
            all_files[d] = [re.findall('.*?(\w+\.js)$',f)[0] for f in l_files if len(re.findall('.*?(\w+\.js)$',f)) > 0]
   
    return all_files

def save_file(playername,filename,txt) :

    path = "%s%s/%s"%(WDIR,playername,filename)

    print("\tFTP save %s"%(path))

    ses = getSession()

    if ses is None :
        return

    try :
        ses.mkd(WDIR+playername)
    except:
        print('\tFTP dir %s already exists'%(playername))

    try:
        with open('tempfile', 'wb') as f : f.write(txt.encode('utf8'))
        ses.storbinary('STOR %s'%(path), open('tempfile','rb'))
    except:
        print("\tFTP: ERROR SAVING FILE %s"%path)

    return

def load_file(playername,filename):

    path = "%s%s/%s"%(WDIR,playername,filename)

    print("\tFTP load %s"%(path))

    ses = getSession()

    if ses is None :
        return ""

    data = [] 

    try:
        res = ses.retrbinary('RETR %s'%(path), data.append)
    except:
        print("\tFTP ERROR LOADIND FILE %s"%path)
        data = [""]

    txt = ''.join(data).encode('utf8')

    return txt 
