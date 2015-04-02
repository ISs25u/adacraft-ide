import json
import hashlib, hmac

def readLogin(token):
    return json.loads(token)['login']

def verify(token, secret):
    token = json.loads(token)
    if not 'login' in token or not 'signature' in token:
        return False
    return hmac.HMAC(secret, token['login'], hashlib.sha1).hexdigest() == token['signature']
