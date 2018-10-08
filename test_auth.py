import unittest
import auth


class TestAuth(unittest.TestCase):
    def test_will_not_verify_malformed_token(self):
        with self.assertRaises(Exception):
            auth.verifyToken('bad_token', 'secret')

    def test_can_verify_authentic_token(self):
        verified = auth.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Impvam8ifQ.WWbCWlsc2x_j8ivaVtBRHZhkxyEpTxOc92ReXEDkXNM', 'secret')
        self.assertEquals('jojo', verified['login'])

    def test_can_create_token(self):
        token = auth.createToken(dict(login='jojo'), 'secret')
        verified = auth.verifyToken(token, 'secret')
        self.assertEquals('jojo', verified['login'])


if __name__ == '__main__':
    unittest.main()
