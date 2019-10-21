const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

module.exports = function writeFile( filepath, req, res ){

    const maxSize = 10485760;
    const maxStream = new LimitSizeStream({limit : maxSize});
    const saveStream = fs.createWriteStream(filepath, {flags: 'wx'});

    req
        .pipe(maxStream)
        .pipe(saveStream);

    maxStream.on('error', err=>{
        if (err) {
            res.statusCode = 413;
            res.end('more than max limit');
            fs.unlink(filepath, ()=>{});
        } 
    });

    saveStream.on('error', (err, data) => {
        if (err.code === 'EEXIST') {
        //   res.statusCode = 409;
        //   res.end('File already exists');
        } else {
            res.statusCode = 500;
            res.end(`Unknown error : ${err}`);
        }
    }).on('close', (err, data) => {
        if(err){
            fs.unlink(filepath, ()=>{});
            res.end();
        } else {
            res.statusCode = 201;
            res.end('success');
        }
    });
}