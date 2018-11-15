
var fs = require('fs');

fs.readFile('test.txt', 'utf8', function(err,data){

    console.log('async reading of file...');
    
    if(err)
        throw err;

    console.log(data);
});

console.log('synchronic reading of file...');
var fileContent = fs.readFileSync('test.txt', 'utf8');
console.log(fileContent);

fs.appendFileSync('test.txt', 'SyncRead!');
fs.appendFile('test.txt', 'Hello, async World!', function(err){
    
    if(err)
        throw err;

    console.log('Async write file ending. Data of file : ');
    var data = fs.readFileSync('test.txt', 'utf8');
    console.log(data);
});