This web editor for ScriptCraft files. 
It is derived from John Markus Bjørndalen experiment.

# Installing and running

## Generating the client bundle

Run `webpack`:

```
$ npm run build
```

In development, you can run `webpack` in _watch_ mode:

```
$ npm run build -- -w
```

## The python way

```
pip install -r requirements.txt
SRCDIR=/absolute/path/to/players SECRET=shhhh python main.py
```

## The docker way

### Build

Create the gnancraft image.

    ./bin/build

Create the data container

    docker create --name gnandata -v /data <a_small_image_in_your_cache>

### Run

    ./bin/run

----------------------


Using it should simply be a matter of pointing your editor to one of these: 

   [http://localhost:8095/edit/](http://localhost:8095/edit/)

   To edit the files in the jsfiles directory. 

