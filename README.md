This code was an experiment that I used to let my kids and my brother
edit ScriptCraft files on our Bukkit (Minecraft) server. I'm pushing
it out in case it's a useful starting point for others.

WARNING: this code was experimental, so there might be security issues
here. I'm making no claims about dogs being held hostage by
aliens. Just mentioning it.


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

