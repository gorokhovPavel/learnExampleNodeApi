var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){

    console.log(`address : ${request.url}`);
    if(request.url.startsWith('/public')){

        var filePath = request.url.substr(1);
        fs.readFile(filePath, function(err, data){

            if(err){
                
                response.statusCode = 404;
                response.end('Resource not found!')
            }
            else {

                response.end(data);
            }
            return;
        })
    } else {

        response.end('hello, word!');
    }

}).listen(3000);