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
import urllib2
import json
import random

from flask import Flask, request, session, render_template, flash, redirect, url_for
from flask.ext.wtf import Form
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired


ENCODING="UTF-8"
JSDIR = os.environ['SRCDIR']

def get_file_content(fname):
    try:
        return io.open(fname, "r", encoding=ENCODING).read()
    except:
        return ""

class LoginForm(Form):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('username', validators=[DataRequired()])

app = Flask(__name__)
app.wtf_csrf_enabled = False
app.secret_key = os.urandom(24)

def _yggdrasil_request(payload, endpoint):
    req = urllib2.Request(
        url='https://authserver.mojang.com/%s' % endpoint,
        data=json.dumps(payload),
        headers={"Content-Type": "application/json"}
    )

    try:
        return json.loads(urllib2.urlopen(req).read())
    except ValueError:
        return None

def _yggdrasil_authenticate(username, password):
        payload = {
                "agent": {
                        "name": "Minecraft",
                        "version": 1,
                },
                "username": username,
                "password": password,
                "clientToken": session['client_token'],
        }

        try:
            return _yggdrasil_request(payload, 'authenticate')
        except urllib2.HTTPError:
            return None

def _yggdrasil_invalidate(access_token):
        payload = {
                "accessToken": access_token,
                "clientToken": session['client_token'],
        }

        try:
            return _yggdrasil_request(payload, 'invalidate') == None
        except urllib2.HTTPError:
            return False

@app.route('/')
def index():
    return redirect(url_for('edit')) 

@app.route('/login', methods=['GET', 'POST'])
def login():
    if not 'client_token' in session:
        import uuid
        session['client_token'] = str(uuid.uuid1())

    form = LoginForm()

    if form.validate_on_submit():
        session['yggdrasil'] = _yggdrasil_authenticate(form.username.data, form.password.data)

        if session['yggdrasil']:
            flash('Logged in to Minecraft')
        else:
            flash('Could not log in to Minecraft')

        return redirect(url_for('edit'))

    return render_template(
        'login.html',
        form=form
    )

@app.route('/logout')
def logout():
    if 'yggdrasil' in session and _yggdrasil_invalidate(session['yggdrasil']['accessToken']):
        session.pop('yggdrasil', None)
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
        files.sort()
        fnames[dn]= [ f[len(JSDIR):] for f in files]
    return render_template(
        'edit.html',
        filesByDirectory = fnames
    )

@app.route("/edit/file")
def editfile():
    "edit the content of a file"

    fname = request.args.get("file")

    return render_template(
        'editfile_ace.html',
        fname = fname,
        content = get_file_content("%s/%s" % (JSDIR, fname))
    )

@app.route('/edit/sfile', methods = ['POST'])
def editfile_submit():
    "Handles save file'"
    fname = request.form['fname']
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
    app.run(debug=True)
