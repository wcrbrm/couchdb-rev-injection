# couchdb-rev-injection
Couch DB revision injection scripts

A pair of scripts to take revision from the document and update it in local JSON document,
useful in couch db batch files for initialization and database migrations.

`node rev.js` - read revision from document JSON, provided in STDIN.
`node rev-inject.js localfile.js` - read revision from STDIN and update it in the lcoal json document file.

Usage Example
===
```
curl -s http://localhost:5984/mydb/_design/public | node rev.js | node rev-inject.js design_public.json
curl -X PUT -H "Content-Type: application/json" http://localhost:5984/mydb/_design/public -d @design_public.json
```