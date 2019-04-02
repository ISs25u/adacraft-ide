#!/usr/bin/env python
# -*- coding: utf-8 -*-
#

from __future__ import unicode_literals
import io 
import glob
import os
import signal
import mftp

from flask import Flask, make_response, request, session, render_template, flash, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename

ENCODING = "UTF-8"
DEBUG = 'DEBUG' in os.environ
SECRET = os.environ['SECRET']
HOST = os.environ['HOST']
SCHEM_DIR = os.environ['FTP_SCHEM']

def get_file_content(file_path):

  playername, filename = file_path.split('/')

  try:
    return mftp.load_file(playername,filename)

  except:
    return ""

def set_file_content(file_path, txt):

  playername, filename = file_path.split('/')

  mftp.save_file(playername, filename, txt)

  return


def logged_in_player():

  if 'player' in session:
    return session['player']
  else:
    return None

# ---------------------

app = Flask(__name__)
app.secret_key = SECRET
app.config['UPLOAD_FOLDER'] = SCHEM_DIR
app.config['MAX_CONTENT_LENGTH'] = 128 * 1024       # Max file size is 128 KiB

@app.route('/')
def index():
    return redirect(url_for('code'))


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

  return redirect(url_for('code'))


@app.route('/logout')
def logout():
  if 'player' in session:
    session.pop('player', None)
    flash('Logged out')
  return redirect(url_for('code'))


@app.route("/code/")
def code():
  "lists files we might want to edit"

  fnames = mftp.list_files()

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
    logged_in_player=logged_in_player())


@app.route("/schematic/")
def schematic():
    
  schemFiles = mftp.list_schematics();

  return render_template('schematic.html', schemFiles=schemFiles, logged_in_player=logged_in_player())


@app.route('/schematic/upload', methods=['GET', 'POST'])
def upload_schematic():

  if request.method == 'POST':

    if 'schemLoader' not in request.files :
      flash('Pas de fichier trouvé', category='warning')
      return redirect(url_for('schematic'))

  mfile = request.files['schemLoader']

  if mfile.filename == '':
    flash('Pas de fichier sélectionné', category='warning')
    return redirect(url_for('schematic'))

  if mfile:
 
    cur_files = mftp.list_schematics()
    filename = secure_filename(mfile.filename)

    allowed_file = filename.split('.')[1].lower() == 'schematic'

    if filename not in cur_files and allowed_file:

      flash('Le ficher \''+ filename + '\' a été transféré', category='info') 
      mpath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
      mftp.save_schematic(filename, mfile)
      return redirect(url_for('schematic'))

    else :

      flash('Impossible de tranférer le ficher \''+ filename + '\'', category='error') 
      return redirect(url_for('schematic'))


@app.route("/code/<playername>/<filename>")
def editcode(playername, filename):
  "edit the content of a file"

  fname = playername + '/' + filename

  app.logger.debug(url_for("download_code", playername=playername, filename=filename))

  return render_template(
    'editfile_ace.html',
    fname=fname,
    logged_in_player=logged_in_player(),
    can_save=logged_in_player() == playername,
    save_url=url_for("upload_code", playername=playername, filename=filename),
    file_url=url_for("download_code", playername=playername, filename=filename),
  )


@app.route("/load/<playername>/<filename>")
def download_code(playername, filename):
  "get the content of a file"

  fname = playername + '/' + filename
  mfile = get_file_content("%s"%fname)

  response = make_response(mfile.encode("utf8"))
  response.headers['Content-Type'] = "text/plain"
  response.headers['Content-Disposition'] = "inline; filename=" + filename
  return response


@app.route('/save/<playername>/<filename>', methods=['GET', 'POST'])
def upload_code(playername, filename):
  "Handles save file"

  if logged_in_player() != playername:
    return "", 403

  fname = playername + '/' + filename
  app.logger.debug("Saving file %s" % fname)

  txt = request.form['text']
  
  file_path = "%s"%fname
  set_file_content(file_path, txt)

  return ""


def term_handler(signum, frame):
  app.logger.info("Caught TERM signal, shutting down.")
  exit(0)


if __name__ == "__main__":
  signal.signal(signal.SIGTERM, term_handler)
  app.run(host=HOST, debug=DEBUG)
