const fs = require('fs');

const readRevisionFromStdin = (callback) => {
  let rev = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) { rev += chunk; }
  });
  process.stdin.on('end', () => {
    if (!rev) process.stderr.write('No Revision Provided');
    callback(rev.trim());
  });
}

const readDocumentJson = (name, callback) => {
  fs.readFile(name, 'utf8', (err, data) => {
    if (err) throw err;
    if (data._id) throw "Invalid Document Read, expected _id property";
    if (typeof callback === 'function') callback(JSON.parse(data));
  });  
}

const writeDocumentJson = (name, doc, callback) => {
  fs.writeFile(name, JSON.stringify(doc, null, 2), {}, (err, data) => {
    if (err) throw err;
    if (typeof callback === 'function') callback(data);
  });  
};

if (process.argv[2] === '-remove') {
  const jsonFileName = process.argv[3];
  if (!jsonFileName) { throw Exception('Json document is not provided\n'); }
  readDocumentJson(jsonFileName, (doc) => {
    delete doc._rev; delete doc.rev;
    writeDocumentJson(jsonFileName, doc);
  });
} else if (process.argv[2] === '-inject') {

  const jsonFileName = process.argv[3];
  if (!jsonFileName) { throw Exception('Json document is not provided\n'); }
  readDocumentJson(jsonFileName, (doc) => {
    // process.stdout.write(JSON.stringify(doc, null, 2) + "\n");   
    readRevisionFromStdin((rev) =>  {
      process.stdout.write('\nrev: ' + rev);
      if (rev) {
        doc._rev = rev;
        writeDocumentJson(jsonFileName, doc);
      }
    });
  });

} else {

  let jsonData = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk) { jsonData += chunk; }
  });
  process.stdin.on('end', () => {
    const data = JSON.parse(jsonData);
    if (data && data._rev) process.stdout.write(data._rev);
  });

}


