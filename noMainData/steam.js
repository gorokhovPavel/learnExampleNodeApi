var fs = require('fs');

    var ws = fs.createWriteStream('test.txt');
    ws.write('Hello!');
    ws.write('Continue... \n');
    ws.end('End of writing. \n');

    var rs = fs.createReadStream('test.txt', 'utf8');
    rs.on('data', function(chunk){
        
        console.log(chunk);
    });

    var productRouter = express.Router();
productRouter.route('/')
    .get(function(request, response){
        response.send('list of products');
    });
productRouter.route("/:id")
    .get(function(request, response){
        response.send(`Product is ${request.params.id}`);
    });

app.use('/products', productRouter);
app.use('/products', function(request, response, next){

    var nowDt = new Date();
    var hour = nowDt.getHours();
    var min  = nowDt.getMinutes();
    var sec  = nowDt.getSeconds();
    var data = `${hour}:${min}:${sec}:${request.method}:${request.url}:${request.get('user-agent')}`;
    console.log(data);
    fs.appendFile('serverApp/server.log', data+'\n', function(){});
    next();
});