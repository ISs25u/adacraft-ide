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
from git import Actor, Repo

from flask import Flask, make_response, request, session, render_template, flash, redirect, url_for

ENCODING = "UTF-8"
JSDIR = os.environ['SRCDIR']
DEBUG = 'DEBUG' in os.environ
SECRET = os.environ['SECRET']

repo = None


def get_file_content(file_path):
    try:
        return io.open(file_path, "r", encoding=ENCODING).read()
    except:
        return ""


def set_file_content(file_path, txt):
    if not os.path.isdir(os.path.dirname(file_path)):
        os.makedirs(os.path.dirname(file_path))
    with io.open(file_path, "wt", encoding=ENCODING) as f:
        f.write(unicode(txt))


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

    directories = glob.glob("%s/*/" % (JSDIR,))
    fnames = {}
    for directory in directories:
        files = glob.glob("%s*.js" % (directory))
        dirname = os.path.basename(os.path.dirname(directory))
        if files:
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

    fname = playername + '/' + filename
    response = make_response(get_file_content("%s/%s" % (JSDIR, fname)))
    response.headers['Content-Type'] = "text/javascrpt"
    response.headers['Content-Disposition'] = "inline; filename=" + filename
    return response


@app.route('/save/<playername>/<filename>', methods=['GET', 'POST'])
def save(playername, filename):
    "Handles save file"

    if logged_in_player() != playername:
        return "", 403

    fname = playername + '/' + filename
    app.logger.debug("Saving file %s" % fname)

    txt = request.form['text']
    file_path = "%s/%s" % (JSDIR, fname)
    isCreation = not os.path.isfile(file_path)
    isEmpty = txt == ''
    if isCreation and isEmpty:
        return ''
    isDeletion = isEmpty and not isCreation
    if isDeletion:
        os.remove(file_path)
    else:
        set_file_content(file_path, txt)

    if repo.is_dirty(untracked_files=True):
        if isDeletion:
            repo.index.remove([file_path])
        else:
            repo.index.add([file_path])
        commit_message_prefix = 'create' if isCreation else ('delete' if isDeletion else 'update')
        author = Actor(playername, "unknown@email")
        repo.index.commit('%s %s' % (commit_message_prefix, fname), author=author)
    return ""


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
    init_repo()
    signal.signal(signal.SIGTERM, term_handler)
    app.run(host='0.0.0.0', debug=DEBUG)
