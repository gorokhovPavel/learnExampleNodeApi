const mongoose = require('mongoose');
const connection = require('../libs/connection');

const schema = new mongoose.Schema({
  token: {
    type: String,
    unique: false,
    required: true,
  },
  
  lastVisit: {
    type: Date,
    required: false,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  
});

schema.path('lastVisit').index({expires: '7d'});

module.exports = connection.model('Session', schema);
