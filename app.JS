var http    = require('http');
var message = 'starting!';

//function display(data, callback){
//
//    var randInt = Math.random() * (10-1) + 1;
//    var err = randInt>5 ? new Error()
//}

http.createServer(function(request, response){

    console.log(message);
    response.end(message);
}).listen(3000, '127.0.0.1', ()=>{

    console.log('server start listen dfbfbtrof requires');
});