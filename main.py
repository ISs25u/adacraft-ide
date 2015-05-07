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
import glob
import string
import datetime
import os
import random

from flask import Flask, make_response, request, session, render_template, flash, redirect, url_for
from flask.ext.wtf import Form
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired

ENCODING="UTF-8"
JSDIR = os.environ['SRCDIR']
DEBUG = 'DEBUG' in os.environ
SECRET = os.environ['SECRET']

def get_file_content(fname):
    try:
        return io.open(fname, "r", encoding=ENCODING).read()
    except:
        return ""

def logged_in_player():
    if 'player' in session:
        return session['player']
    else:
        return None

class LoginForm(Form):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('username', validators=[DataRequired()])

app = Flask(__name__)
app.wtf_csrf_enabled = False
app.secret_key = SECRET

@app.route('/')
def index():
    return redirect(url_for('edit')) 

@app.route('/auth/<token>')
def auth(token):
    import auth;
    import base64;
    token = base64.b64decode(token)
    if auth.verify(token, SECRET):
        login = auth.readLogin(token)
        session['player']= login;
        flash('Logged in as %s' % login)
    else:
        flash('Invalid token')

    return redirect(url_for('edit'))

@app.route('/logout')
def logout():
    if 'player' in session: 
        session.pop('player', None)
        flash('Logged out')
    return redirect(url_for('edit'))

@app.route("/edit/")
def edit():
    "lists files we might want to edit"

    directories = glob.glob("%s/*/" % (JSDIR,))
    dnames = [ d[len(JSDIR):] for d in directories]
    fnames = {}
    for dn in dnames:
        files = glob.glob("%s%s*.js" % (JSDIR,dn))
        fnames[dn]= [ f[len(JSDIR)+1:] for f in files]
    ownedFiles = None
    playerDir = None
    if logged_in_player() :
        ownedFiles = []
        playerDir = '/%s/' % logged_in_player()
        if fnames.has_key(playerDir):
            ownedFiles = fnames[playerDir]
            del fnames[playerDir]
    return render_template(
        'edit.html',
        ownedFiles = ownedFiles,
        playerDir = playerDir,
        filesByDirectory = fnames,
        logged_in_player = logged_in_player()
    )

@app.route("/edit/<playername>/<filename>")
def editfile(playername, filename):
    "edit the content of a file"

    fname = playername + '/' + filename;

    print url_for("load",playername=playername,filename=filename)
    return render_template(
        'editfile_ace.html',
        fname = fname,
        logged_in_player = logged_in_player(),
        can_save = logged_in_player() == playername,
        save_url = url_for("save", playername=playername, filename=filename),
        file_url = url_for("load", playername=playername, filename=filename),
    )

@app.route("/load/<playername>/<filename>")
def load(playername, filename):
    "get the content of a file"

    fname = playername + '/' + filename;
    response = make_response(get_file_content("%s/%s" % (JSDIR, fname)))
    response.headers['Content-Type'] = "text/javascrpt"
    response.headers['Content-Disposition'] = "inline; filename=" + filename
    return response

@app.route('/save/<playername>/<filename>', methods = ['GET','POST'])
def save(playername, filename):
    "Handles save file'"
    if logged_in_player() != playername:
        return "", 403
    fname = playername + '/' + filename;
    txt   = request.form['text']
    print "Submitting file %s" % fname
    file = io.open("%s/%s" %(JSDIR, fname), "wt", encoding=ENCODING)
    file.write(unicode(txt))
    file.close()
    return ""

@app.route("/logfile")
def logfile():
    return render_template(
        'logfile.html',
        content = get_file_content("mcserver.log")
    )


# ------------------------------------------------------------
#
#  Mainstuff
#

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=DEBUG)
