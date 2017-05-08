let jsonData = '';
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) { jsonData += chunk; }
});

process.stdin.on('end', () => {
  const data = JSON.parse(jsonData);
  process.stdout.write(data._rev);
});

