import unittest
import tempfile
import os
import shutil


SRCDIR = tempfile.mkdtemp()
os.environ['SRCDIR'] = SRCDIR
os.environ['SECRET'] = 'secret'

import main

main.init_repo()


class TestMain(unittest.TestCase):
    def setUp(self):
        main.app.config['TESTING'] = True
        self.app = main.app.test_client()
        with self.app.session_transaction() as sess:
            sess['player'] = 'jojo'
        if not os.path.isdir(SRCDIR + '/jojo'):
            os.makedirs(SRCDIR + '/jojo')

    def tearDown(self):
        pass

    def test_home_redirects_to_edit(self):
        resp = self.app.get('/')
        self.assertEqual(302, resp.status_code)
        self.assertEqual('http://localhost/edit/', resp.headers['Location'])

    def test_save_creates_directory(self):
        shutil.rmtree(SRCDIR + '/jojo')
        resp = self.app.post('/save/jojo/code.js', data=dict(text='hello'))
        self.assertEqual(200, resp.status_code)
        self.assertTrue(os.path.isdir(SRCDIR + '/jojo'))

    def test_save_creates_file(self):
        resp = self.app.post('/save/jojo/code.js', data=dict(text='hello'))
        self.assertEqual(200, resp.status_code)
        self.assertTrue(os.path.isfile(SRCDIR + '/jojo/code.js'))
        with open(SRCDIR + '/jojo/code.js') as f:
            self.assertEqual('hello', f.read())
        headcommit = main.repo.head.commit
        self.assertEqual('create jojo/code.js', headcommit.message)
        names = map(lambda x: x.name, headcommit.tree['jojo'].blobs)
        self.assertIn('code.js', names)

    def test_save_erases_file_if_no_content(self):
        with open(SRCDIR + '/jojo/code_to_delete.js', 'w') as f:
            f.write('existing')
        main.repo.index.add(['jojo/code_to_delete.js'])
        main.repo.index.commit('test file creation')
        resp = self.app.post('/save/jojo/code_to_delete.js', data=dict(text=''))
        self.assertEqual(200, resp.status_code)
        self.assertFalse(os.path.isfile(SRCDIR + '/jojo/code_to_delete.js'))
        headcommit = main.repo.head.commit
        self.assertEqual('delete jojo/code_to_delete.js', headcommit.message)
        names = map(lambda x: x.name, headcommit.tree['jojo'].blobs)
        self.assertNotIn('code_to_delete.js', names)

    def test_save_does_not_create_file_if_no_content(self):
        resp = self.app.post('/save/jojo/code_empty.js', data=dict(text=''))
        self.assertEqual(200, resp.status_code)
        self.assertFalse(os.path.isfile(SRCDIR + '/jojo/code_empty.js'))

if __name__ == '__main__':
    unittest.main()
