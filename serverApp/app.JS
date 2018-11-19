var express = require('express');
var bodyParser = require("body-parser");
var fs  = require('fs');
var app = express();

var urlEncoderParser = bodyParser.urlencoded({extended:false});

app.use(express.static(`${__dirname}/public`));

var jsonParse = bodyParser.json();

app.post('/register', jsonParse, function(request, response){

    if(!request.body)
        return response.sendStatus(400);
    
    //console.log(request.body);
    return response.json(`${request.body.userName},${request.body.userAge}`);
});

app.get('/', function(request, response){

    response.send(`<h1>Main page!</h1>`);
});

app.listen(3000);