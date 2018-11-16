var Emmiter = require('events');
var emmiter = new Emmiter();
var eventName = 'great';

emmiter.on(eventName, function(data){

    console.log(data);
});

emmiter.emit( eventName, 'hell!' );