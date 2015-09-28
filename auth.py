import jwt

def verifyToken(token, secret):
    return jwt.decode(token, secret, algorithm='HS256')
