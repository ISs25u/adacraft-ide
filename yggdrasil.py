import json
import urllib2
import uuid

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

def authenticate(username, password):
    payload = {
            "agent": {
                    "name": "Minecraft",
                    "version": 1,
            },
            "username": username,
            "password": password,
            "clientToken": str(uuid.uuid1())
    }

    try:
        return _yggdrasil_request(payload, 'authenticate')
    except urllib2.HTTPError as error:
        print error
        return None

def invalidate(authenticate_response):
    payload = {
        "accessToken": authenticate_response["accessToken"],
        "clientToken": authenticate_response["clientToken"],
    }

    try:
        return _yggdrasil_request(payload, 'invalidate') == None
    except urllib2.HTTPError as error:
        print error
        return False

def player_name(authentication_response):
    return authentication_response["selectedProfile"]["name"]
