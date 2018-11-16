var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){

    fs.readFile('public/index.html', 'utf8', function(err,data){

        var message = 'learn node.js';
        var header = 'main page';
        
        data = data
            .replace('{header}', header)
            .replace('{message}', message);

        response.end(data);
    })
}).listen(3000);