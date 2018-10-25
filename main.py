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
import os
import signal
import mftp
from git import Actor, Repo

from flask import Flask, make_response, request, session, render_template, flash, redirect, url_for, send_from_directory

ENCODING = "UTF-8"
JSDIR = os.environ['SRCDIR']
EXTDIR = os.environ.get('EXTDIR')
DEBUG = 'DEBUG' in os.environ
SECRET = os.environ['SECRET']
FILEMODE = 'SSH'

repo = None


def get_file_content(file_path):

    print("Will get content of %s"%file_path)

    playername, filename = file_path.split('/')

    try:

        if FILEMODE == 'SSH' :
	    return mftp.load_file(playername,filename)
        else :
	    with open("%s/%s"%(JSDIR,file_path),'r') as f :
                return f.read()

    except:
        return ""


def set_file_content(file_path, txt):

    print("Will set content of %s"%file_path)

    playername, filename = file_path.split('/')

    #if not os.path.isdir(os.path.dirname(file_path)):
    #    os.makedirs(os.path.dirname(file_path))
    #with io.open(file_path, "wt", encoding=ENCODING) as f:
    #    f.write(unicode(txt))

    if FILEMODE == 'SSH' :
        mftp.save_file(playername, filename, txt)
    else :
        if not os.path.isdir(os.path.dirname("%s/%s"%(JSDIR,file_path))):
            os.makedirs(os.path.dirname("%s/%s"%(JSDIR,file_path)))
        
        with open("%s/%s"%(JSDIR,file_path), 'w') as f :
            f.write(txt)


def logged_in_player():
    if 'player' in session:
        return session['player']
    else:
        return None

app = Flask(__name__)
app.secret_key = SECRET


@app.route('/')
def index():
    return redirect(url_for('edit'))


@app.route('/auth/<token>')
def auth(token):
    import auth
    try:
        info = auth.verifyToken(token, SECRET)
        login = info['login']
        session['player'] = login
        flash('Logged in as %s' % login)
    except Exception, e:
        app.logger.error("Auth error: %s" % str(e))
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

    if FILEMODE == 'SSH' :
        fnames = mftp.list_files()
    else :
        directories = glob.glob("%s/*/"%(JSDIR))
        print("DIRS: %s"%directories)
        fnames = {}
        for directory in directories:
            files = glob.glob("%s*.js"%directory)
            dirname = os.path.basename(os.path.dirname(directory))
            if files :
                fnames[dirname] = [os.path.basename(f) for f in files]
  
    ownedFiles = None
    playerDir = None
    if logged_in_player():
        ownedFiles = []
        playerDir = logged_in_player()
        if playerDir in fnames:
            ownedFiles = fnames[playerDir]
            del fnames[playerDir]
    return render_template(
        'edit.html',
        ownedFiles=ownedFiles,
        playerDir=playerDir,
        filesByDirectory=fnames,
        logged_in_player=logged_in_player()
    )


@app.route("/edit/<playername>/<filename>")
def editfile(playername, filename):
    "edit the content of a file"

    print("Editing %s/%s"%(playername,filename))

    fname = playername + '/' + filename

    app.logger.debug(url_for("load", playername=playername, filename=filename))
    return render_template(
        'editfile_ace.html',
        fname=fname,
        logged_in_player=logged_in_player(),
        can_save=logged_in_player() == playername,
        save_url=url_for("save", playername=playername, filename=filename),
        file_url=url_for("load", playername=playername, filename=filename),
    )


@app.route("/load/<playername>/<filename>")
def load(playername, filename):
    "get the content of a file"

    print("Loading %s/%s"%(playername,filename))

    fname = playername + '/' + filename
    response = make_response(get_file_content("%s"%fname))
    response.headers['Content-Type'] = "text/javascript"
    response.headers['Content-Disposition'] = "inline; filename=" + filename
    return response


@app.route('/save/<playername>/<filename>', methods=['GET', 'POST'])
def save(playername, filename):
    "Handles save file"

    print("Saving %s/%s"%(playername,filename))

    if logged_in_player() != playername:
        return "", 403

    fname = playername + '/' + filename
    app.logger.debug("Saving file %s" % fname)

    txt = request.form['text']
    
    file_path = "%s"%fname
    set_file_content(file_path, txt)

    return ""


if EXTDIR is not None:
    @app.route('/ide-ext/<path:path>')
    def send_ext(path):
        return send_from_directory(EXTDIR, path)


def term_handler(signum, frame):
    app.logger.info("Caught TERM signal, shutting down.")
    exit(0)


def init_repo():
    global repo
    if os.path.isdir("%s/.git" % JSDIR):
        repo = Repo(JSDIR)
    else:
        repo = Repo.init(JSDIR)
        repo.index.add(repo.untracked_files)
        repo.index.commit('initial commit')
        app.logger.info("Git repo initialized")

if __name__ == "__main__":
    #init_repo()
    signal.signal(signal.SIGTERM, term_handler)
    app.run(host='5.196.73.114', debug=DEBUG)
