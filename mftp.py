#!/usr/bin/env python

from ftplib import FTP, FTP_TLS
import time as time
import os
import re

WDIR = '/scriptcraft/plugins/'
USR = "mine110058"
PWD = "Y1hElvLo"
HST = "94.23.20.216"

def getSession():

    session = FTP(HST)
    session.login(USR,PWD)

    return session

def list_files():

    print("FTP list files")

    ses = getSession()

    content = []
    ses.retrlines('MLSD %s'%(WDIR),content.append)
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
        ses.retrlines('NLST %s%s/'%(WDIR,d), l_files.append)
        if len(l_files) > 0 :
            
            all_files[d] = [re.findall('.*?(\w+\.js)$',f)[0] for f in l_files if len(re.findall('.*?(\w+\.js)$',f)) > 0]
    
    return all_files

def save_file(playername,filename,txt) :

    path = "%s%s/%s"%(WDIR,playername,filename)

    print("FTP save %s"%(path))

    try :
        session.mkd(WDIR+playername)
    except:
        print('FTP dir %s already exists'%(playername))

    try:
        with open('tempfile', 'wb') as f : f.write(txt)
        getSession().storbinary('STOR %s'%(path), open('tempfile','rb'))
    except:
        print("FTP: ERROR SAVING FILE %s"%path)

    return

def load_file(playername,filename):

    path = "%s%s/%s"%(WDIR,playername,filename)

    print("FTP load %s"%(path))

    data = [] 

    try:
        getSession().retrbinary('RETR %s'%(path), data.append)
    except:
        print("FTP ERROR LOADIND FILE %s"%path)
        data = [""]

    txt = data[0]

    return txt 



