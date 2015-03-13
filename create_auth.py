#!/usr/bin/env python
#
#
# Regenerate files in example_conf

from datetime import datetime
from cork import Cork

def makeuser(cork, username, password, tstamp):
    cork._store.users[username] = {
        'role': 'admin',
        'hash': cork._hash(username, password),
        'email_addr': username + '@localhost.local',
        'desc': username + ' test user',
        'creation_date': tstamp
    }

def populate_conf_directory():
    cork = Cork('auth', initialize=True)

    cork._store.roles['admin'] = 100
    cork._store.roles['editor'] = 60
    cork._store.roles['user'] = 50
    cork._store._savejson('roles', cork._store.roles)

    tstamp = str(datetime.utcnow())
    makeuser(cork, 'admin', 'admin', tstamp)

    cork._store.save_users()

if __name__ == '__main__':
    populate_conf_directory()

