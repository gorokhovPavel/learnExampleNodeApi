const url = require('url');
const http = require('http');
const path = require('path');

const writeFile = require('./writeFile');

const server = new http.Server();
server.on('request', (req, res) => {

    const pathName = url.parse(req.url).pathname.slice(1);
    const filePath = path.join(__dirname, 'files', pathName);
    
    const urlArr = req.url.split('/');
    
    if( urlArr.length > 2 ) {
        res.statusCode = 400;
        fs.unlink(filepath, ()=>{});
        res.end('Unknown request');
    } 

    switch (req.method) {
        case 'POST':
            if( !filePath ) {
                res.statusCode = 404;
                fs.unlink(filepath, ()=>{});
                res.end('file not found')
            }
            writeFile(filePath, req, res);
            break;
        default:
            fs.unlink(filepath, ()=>{});
            res.statusCode = 501;
            res.end('Not implemented');
    }
});

module.exports = server;