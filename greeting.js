const currentDate = new Date();

module.exports.date = currentDate;
module.exports.getMessage = function(name) {
    
    const start = 'Good';
    const hour = currentDate.getHours();
    const end = (hour>16) ? 'Goog everning' : 'Good morning!';

    return `${start} ${end}, ${name}`;
}