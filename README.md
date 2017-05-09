# couchdb-rev-injection
Couch DB revision injection scripts

A pair of scripts to take revision from the document and update it in local JSON document,
useful in couch db batch files for initialization and database migrations.

`node rev.js` - read revision from document JSON, provided in STDIN.
`node rev.js -inject localfile.js` - read revision from STDIN and update it in the lcoal json document file.

Batch File Example
===
```
@set DB=mydb
@set DOC=--Config
@set FILENAME=--Config.json
curl -s http://localhost:5984/%DB%/%DOC% | node rev.js | node rev.js -inject %FILENAME%
curl -X PUT -H "Content-Type: application/json" http://localhost:5984/%DB%/%DOC% -d @%FILENAME%
node rev.js -remove %FILENAME%
```

Shell File Example
===
```
#!/bin/bash
export DB=mydb
export DOC=_design/backend
export FILENAME=design_backend.json
curl -s http://localhost:5984/$DB/$DOC | node rev.js | node rev.js -inject $FILENAME
curl -X PUT -H "Content-Type: application/json" http://localhost:5984/4DB/$DOC -d @$FILENAME
node rev.js -remove $FILENAME
```