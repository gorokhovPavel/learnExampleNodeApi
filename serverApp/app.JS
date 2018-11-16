var express = require('express');
var app = express();

app.get('/', function(request, response){

    response.send('<h2>hello, expr!</h2>');
});

app.get('/about', function(request, response){

    response.send('<h1>About this site</h1>');
});

app.get('/contact', function(request, response){

    response.send('<h1>Contacts list</h1>')
})

app.listen(3000);