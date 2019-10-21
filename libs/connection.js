const mongoose = require('mongoose');
const mongooseUniquePlugin = require('mongoose-beautiful-unique-validation');

mongoose.set('debug', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

mongoose.plugin(mongooseUniquePlugin);

module.exports = mongoose.createConnection('mongodb://localhost:27017/local');
