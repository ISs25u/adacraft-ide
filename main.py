#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
"""
Dependencies (on a Ubuntu computer, on other systems you will need to find other ways of finding these) :
  python-bottle
  python-beaker
  python-pycrotopp (on Ubuntu 12.04, maybe not needed on 12.10 and newer)

Included in this repo:
  cork

Loaded remotely:
  ace   (javascript editor from ace.ajax.org)
  jquery


 NB/TODO:
 - security issues in the handling of filenames (both file select and save)
"""

from __future__ import unicode_literals
import io                   # Better alternative for unicode files.
import cgi
import bottle
from bottle import route, static_file, template, redirect, request, post, get
from beaker.middleware import SessionMiddleware
import glob
import string
import datetime

ENCODING="UTF-8"

import os
JSDIR = os.environ['SRCDIR']
BKDIR = os.environ['SRCDIR'] +"-backups"
ACEDIR = "content/ace"

@route("/css/<filename>")
def css_static(filename):
    return static_file(filename, root="content/css")

def get_html_file(fname):
    try:
        return io.open(fname, "r", encoding=ENCODING).read()
    except:
        return ""

@route("/edit/")
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

@route("/edit/file")
def editfile():
    "lists files we might want to edit"
    #html = get_html_file("content/template/editfile.html")
    fname = request.query.file

    html = get_html_file("content/template/editfile_ace.html")
    cont = get_html_file("%s/%s" % (JSDIR, fname))
    return string.Template(html).substitute(fname = fname, content = cgi.escape(cont))


@route("/edit/ace/<filename>")
def edit_ace_file(filename):
    "serves the ace files"
    cont = get_html_file("%s/%s" % (ACEDIR, filename))
    return cont


# Maybe not needed anymore
@get('/edit/sfile')
def editfile_hidden():
    return ""

@post('/edit/sfile')
def editfile_submit():
    "Handles 'save file'"
    print "Submitting new file"
    fname = request.forms['fname']
    txt   = request.forms['text']
    print "  fname", fname, "len", len(txt)

    # create a backup
    tnow = datetime.datetime.now()
    try:
        oldtxt = io.open("%s/%s" %(JSDIR, fname), "r", encoding=ENCODING).read()
        io.open("%s/%s-pre-%s" %(BKDIR, fname.replace('/', '-'), tnow.isoformat()), "w", encoding=ENCODING).write(oldtxt)
    except:
        pass
    # Now overwrite the file we want to save
    io.open("%s/%s" %(JSDIR, fname), "w", encoding=ENCODING).write(unicode(txt,encoding = ENCODING))
    return ""


@route("/logfile")
def logfile():
    html = get_html_file("content/template/logfile.html")
    cont = get_html_file("mcserver.log")
    return string.Template(html).substitute(content = cont)


# ------------------------------------------------------------
#
#  Mainstuff
#

# Get cork and bottle to cooperate
session_opts = {
    'session.type': 'cookie',
    'session.validate_key': True,
}

app = bottle.default_app()
app = SessionMiddleware(app, session_opts)

# With reloader: automatically reloads the bottle server when the python modules have been updated.
#bottle.run(app=app, reloader=True, host="localhost", port=8090)
bottle.run(app=app, reloader=True, host="0.0.0.0", port=8095)  # listens to all hosts

