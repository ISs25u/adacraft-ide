import unittest
import auth

class TestTokenReader(unittest.TestCase):
    def test_can_read_token(self):
        token = '{"login": "toto", "signature": "whatever"}'
        self.assertEqual('toto',auth.readLogin(token))

    def test_will_not_verify_malformed_token(self):
        tokenwithnologin = '{"signature": "sig"}'
        self.assertEqual(False,auth.verify(tokenwithnologin,'secret'))
        tokenwithnosignature = '{"login": "toto"}'
        self.assertEqual(False,auth.verify(tokenwithnosignature,'secret'))

    def test_can_verify_authentic_token(self):
        token = '{"login": "toto", "signature": "334653c938d6ec85903dff5ed6b11170bcd008b6"}'
        self.assertEqual(True,auth.verify(token,'secret'))

    def test_will_not_authenticate_token_with_fake_signature(self):
        secret = 'secret';
        faketoken = '{"login": "toto", "signature": "portnawak"}'
        self.assertEqual(False,auth.verify(faketoken,'secret'))

if __name__ == '__main__':
    unittest.main()
