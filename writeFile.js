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
            fs.unlink(filepath, ()=>{});
            res.statusCode = 413;
            res.end('more than max limit');
            return;
        } 
    });

    saveStream.on('error', (err, data) => {
        if (err.code === 'EEXIST') {
          res.statusCode = 409;
          res.end('File already exists');
          return;
        } else {
            res.statusCode = 500;
            fs.unlink(filepath, ()=>{});
            res.end(`Unknown error : ${err}`);
            return;
        }
    }).on('close', (err, data) => {
        res.statusCode = 201;
        //fs.unlink(filepath, ()=>{});
        res.end('success');
        return;
    });

    // res.on('close', (err, data) => {
    //     if (res.finished) return;
    //     //fs.unlink(filepath, ()=>{});
    //     res.end();
    //     return;
    // });
}