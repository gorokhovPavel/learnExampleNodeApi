var fs = require('fs');

    var ws = fs.createWriteStream('test.txt');
    ws.write('Hello!');
    ws.write('Continue... \n');
    ws.end('End of writing. \n');

    var rs = fs.createReadStream('test.txt', 'utf8');
    rs.on('data', function(chunk){
        
        console.log(chunk);
    });