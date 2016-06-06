import jwt

ALGORITHM = 'HS256'


def verifyToken(token, secret):
    return jwt.decode(token, secret, algorithm=ALGORITHM)


def createToken(data, secret):
    return jwt.encode(data, secret, algorithm=ALGORITHM)


if __name__ == "__main__":
    import sys
    if len(sys.argv) != 3:
        sys.stderr.write('usage: auth.py SECRET USER\n')
        sys.exit(1)
    secret = sys.argv[1]
    sys.stdout.write(createToken(dict(login=sys.argv[1]), sys.argv[2]) + '\n')
