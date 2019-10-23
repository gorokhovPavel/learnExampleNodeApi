const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {

    const pathName = url.parse(req.url).pathname.slice(1);
    const filePath = path.join( __dirname, 'files', pathName );
    const urlArr = req.url.split('/');
    
    if( urlArr.length > 2 ) {
        res.statusCode = 400;
        res.end('Unknown request');
    } 
    
    fs.readFile( filePath, (err, data)=> {
        if(err) {
            res.statusCode = 404;
            res.end('file not found!')
        } else {
            res.end(data);
        }
    }); 
    
});

module.exports = server;
