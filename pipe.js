

var http = require('http');

var fs = require('fs');
var zlib = require('zlib');

var rs = fs.createReadStream('test.txt', 'utf8');
var ws = fs.createWriteStream('some.txt');
var gz = fs.createWriteStream('test.txt.gz');

// rs.on('data', function(chunk){

//     ws.write(chunk);
// });

//rs.pipe(ws);

var gzip = zlib.createGzip();
rs.pipe(gzip).pipe(ws);

http.createServer(function(request, response){

}).listen(3000);