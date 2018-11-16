var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){

   if( request.url == '/some.doc' ){

    response.writeHead(200, {"Content-Type" : "application/msword"})
    fs.createReadStream('some.doc').pipe(response);
   }
   else {

    response.end('hello,as world!')
   }
}).listen(3000);