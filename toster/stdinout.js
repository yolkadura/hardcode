process.stdin.setEncoding('utf8');

console.log('Who are U?');

process.stdin.on('readable', () => {
  const username = process.stdin.read();
  if (username !== null) {
    process.stdout.write(`Hello,  ${username}`);
  }

});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
