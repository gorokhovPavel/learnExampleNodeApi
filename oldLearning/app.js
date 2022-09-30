// const LimitSizeStream = require('./LimitSizeStream');
// const fs = require('fs');

// const limitedStream = new LimitSizeStream({limit: 8}); // 8 байт
// const outStream = fs.createWriteStream('out.txt');

// limitedStream.pipe(outStream);

// limitedStream.write('hello'); // 'hello' - это 5 байт, поэтому эта строчка целиком записана в файл

// //console.log(limitedStream);

// setTimeout(() => {
//   limitedStream.write('world'); // ошибка LimitExceeded! в файле осталось только hello
// }, 10);

const LineSplitStream = require('./LineSplitStream');
const os = require('os');


const lines = new LineSplitStream({
  encoding: 'utf-8',
});


function onData(line) {
  console.log(line);
}

//lines.on('data \r vdfsves', onData);
//lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`);


//let s = `первая строка${os.EOL}вторая строка${os.EOL}третья строка${os.EOL}`;
//console.log(s);

//lines.write(s);

lines.write('a');
lines.write(`b${os.EOL}c`);
lines.write(`d${os.EOL}e`);
lines.write('f');

lines.on('data', function(chunk){
  console.log(chunk);
});

lines.end();
