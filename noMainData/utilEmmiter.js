var util = require('util');
var EventEmmiter = require('events');

function User(){}

util.inherits(User, EventEmmiter);
var eventName = 'greet';

User.prototype.sayHi = function(data){
    this.emit(eventName, data);
}

var user = new User();
user.on(eventName, function(data){
    console.log(data);
});

user.sayHi('I need your help!');