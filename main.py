#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
"""
Dependencies (on a Ubuntu computer, on other systems you will need to find other ways of finding these) :
  Flask

Loaded remotely:  
  ace   (javascript editor from ace.ajax.org)
  jquery 


 NB/TODO:
 - security issues in the handling of filenames (both file select and save)
"""

from __future__ import unicode_literals
import io                   # Better alternative for unicode files.
import cgi
import glob
import string
import datetime

from flask import Flask, request

app = Flask(__name__)

ENCODING="UTF-8"

import os
JSDIR = os.environ['SRCDIR']
BKDIR = os.environ['SRCDIR'] +"-backups"
ACEDIR = "content/ace"

def get_html_file(fname):
    try:
        return io.open(fname, "r", encoding=ENCODING).read()
    except:
        return ""

@app.route("/edit/")
def edit():
    "lists files we might want to edit"

    lis=""
    directories = glob.glob("%s/*/" % (JSDIR,))
    dnames = [ d[len(JSDIR):] for d in directories]
    for dn in dnames:
        files = glob.glob("%s%s*.js" % (JSDIR,dn))
        files.sort()
        fnames= [ f[len(JSDIR):] for f in files]
        lis+= "\n".join(['<li><a href="file?file=%s">%s</a></li>' % (fn, fn) for fn in fnames])
        lis+= '\n<li>%s<input type="text" data-url="file?file=%s"></input></li>' % (dn, dn)
    html = get_html_file("content/template/edit.html")
    return string.Template(html).substitute(flist = lis)

@app.route("/edit/file")
def editfile():
    "lists files we might want to edit"
    #html = get_html_file("content/template/editfile.html")
    fname = request.args.get("file")

    html = get_html_file("content/template/editfile_ace.html")
    cont = get_html_file("%s/%s" % (JSDIR, fname))
    return string.Template(html).substitute(fname = fname, content = cgi.escape(cont))


@app.route("/edit/ace/<filename>")
def edit_ace_file(filename):
    "serves the ace files"
    cont = get_html_file("%s/%s" % (ACEDIR, filename))
    return cont

@app.route('/edit/sfile', methods = ['POST'])
def editfile_submit():
    "Handles save file'"
    print "Submitting new file"
    fname = request.form['fname']
    txt   = request.form['text']
    print "  fname", fname, "len", len(txt)
    return ""
    # create a backup
    tnow = datetime.datetime.now()
    oldtxt = io.open("%s/%s" %(JSDIR, fname), "r", encoding=ENCODING).read()

    # Now overwrite the file we want to save
    io.open("%s/%s" %(JSDIR, fname), "w", encoding=ENCODING).write(unicode(txt,encoding = ENCODING))
    return ""

@app.route("/logfile")
def logfile():
    html = get_html_file("content/template/logfile.html")
    cont = get_html_file("mcserver.log")
    return string.Template(html).substitute(content = cont)


# ------------------------------------------------------------
#
#  Mainstuff
# 

if __name__ == "__main__":
    app.run(debug=True)
