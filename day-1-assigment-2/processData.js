const fs = require('fs');
const readline = require('readline');

module.exports = async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');
  const data = [];

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    data.push( parseInt( line, 10 ) );
  }

  return data;
}
