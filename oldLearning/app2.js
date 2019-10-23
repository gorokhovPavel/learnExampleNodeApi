const fs = require('fs');
const http = require('http');
const zlib = require('zlib');
const Emmiter = require('events');

//const address = './content/test.txt';
//const address2 = './content/test2.txt.gz';
//const emmiter = new Emmiter();
//const eventName = 'greet';

//const readStream = fs.createReadStream(address, 'utf8');
//const writeStream = fs.createWriteStream(address2);
//const gzip = zlib.createGzip();
//readStream.pipe(gzip).pipe(writeStream);

http.createServer( (req, res)=> {
    
    const filePath = req.url.substr(1);
    const existFile = `./content/${filePath}`;
    
    const header = 'q';
    const message  = '1232134213';

    // fs.access( existFile, fs.constants.R_OK, err=>{
    //     if(err){
    //         res.statusCode = 404;
    //         res.end('Res not found');
    //     } else {
    //         //console.log(existFile);
            
    //         fs.createReadStream(existFile).pipe(res);
    //     }
    // });

    fs.readFile( existFile, 'utf8', (err, data)=> {
        if(err) {
            res.statusCode = 404;
            res.end('Not found');
        } else {
            data = data.replace("{header}", header).replace("{message}", message);
            res.end(data);
        }
    });

    //res.end();
}).listen(3000);

// const ws = fs.createWriteStream(address);
// ws.write('Hello');
// ws.write('Contined text...\n');
// ws.write('Ended text...\n');

// const rs = fs.createReadStream( address, 'utf8' );

// rs.on('data', function(chunk){
//     console.log(chunk);
// });

// class User extends Emmiter {
//     sayHi(data){
//         this.emit(eventName, data);
//     }
// }

// let user = new User();

// user.on(eventName, function(data){
//     console.log(data);
// });

// user.sayHi('I need your clothes...');

// emmiter.on(eventName, function(data){
//     console.log('Hello, all!'+ data);
// });

// emmiter.on(eventName, function(){
//     console.log('sdfgfhgjhj');
// })

// emmiter.emit(eventName, 'hell');

// fs.readFile(address, 'utf8', function(err, data) {
//     console.log('async read of file');
//     if( err ) throw err;
//     console.log(data);
// });

// fs.appendFile(address, ' bla-bla-bla', function(err, data){
//     console.log('async write of file!');
//     if( err ) throw err;
//     console.log(data);
// });