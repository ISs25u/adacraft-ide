This web editor for ScriptCraft files. 
It is derived from John Markus Bjørndalen experiment.

Installing and running 
----------------------
Playing around with it should be fairly simple. 

```
pip install -r requirements.txt
SRCDIR=path/to/players python main.py
```

Using it should simply be a matter of pointing your editor to one of these: 

   [http://localhost:8095/edit/](http://localhost:8095/edit/)

   To edit the files in the jsfiles directory. 

or 

   [http://localhost:8095/logfile](http://localhost:8095/logfile)

   To inspect the logfile from the server. 

To use it with a live Minecraft server, do the following: 

* Replace the file called mcserver.log with a symbolic link to the Minecraft server's logfile.

