# Installing and running

## Dependencies

```
npm
python
pip
```

## Installing npm modules

```
npm install
```

## Generating the client bundle

```
sudo npm run build
```

## Installing python requirements

```
pip install -r requirements.txt
```

## Start the server

```
MODE="[SSH|LOCAL]" \
SECRET="secret" \
LOC_HOST="127.0.0.10" \
LOC_WDIR="/path/to/local/javascript/folder" \
FTP_WDIR="/path/to/distant/javascript/folder" \
FTP_USER="ftp_username" \
FTP_PASS="ftp_password" \
FTP_HOST="y.y.y.y" \
python /path/to/adacraft-ide/main.py
```

## Create your token

```python
python auth.py secret username
```

this command generates a token. You can now connect to the server with the token :

[http://127.0.0.10:5000/auth/\<token\>](http://127.0.0.10:5000/auth/\<token\>)
    
## Access your server

[http://127.0.0.10:5000/edit/](http://127.0.0.10:5000/edit/)
