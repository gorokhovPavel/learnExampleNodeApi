const fs = require('fs');
const address = './content/test.txt';

fs.readFile(address, 'utf8', function(err, data) {
    console.log('async read of file');
    if( err ) throw err;
    console.log(data);
});

fs.appendFile(address, ' bla-bla-bla', function(err, data){
    console.log('async write of file!');
    if( err ) throw err;
    console.log(data);
});