# Installing and running

## Installing npm modules

```
$ npm install
```

## Generating the client bundle

```
$ npm run build
```

## Installing python requirements

```
pip install -r requirements.txt
```

## Start the server

```
MODE="[SSH|LOCAL]" \
SECRET="secret" \
LOC_HOST="x.x.x.x" \
LOC_WDIR="/path/to/local/javascript/folder" \
FTP_WDIR="/path/to/distant/javascript/folder" \
FTP_USER="ftp_username" \
FTP_PASS="ftp_password" \
FTP_HOST="y.y.y.y" \
python /home/blac/adacraft-ide/main.py
```

## Create your token

```python
python auth.py secret username
```

this command generates a token. You can now connect to the server with the token :

[http://x.x.x.x:5000/auth/\<token\>](http://x.x.x.x:5000/auth/\<token\>)
    
## Access your server

[http://x.x.x.x:5000/edit/](http://x.x.x.x:5000/edit/)
