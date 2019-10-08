const currentDate = new Date();

global.date = currentDate;

module.exports.name='vasya';
module.exports.age = 12;

module.exports.getMessage = function(name) {
    
    const start = 'Good';
    const hour = currentDate.getHours();
    const end = (hour>16) ? 'Goog everning' : 'Good morning';

    return `${start} ${end}, ${name}!`;
}