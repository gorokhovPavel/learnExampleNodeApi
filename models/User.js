const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 'такой email уже есть',
    validate: [{
      validator: value => {
        return value.includes('@');
      },
      message: 'email некорректный'
    }]
  },
  name: {
    type: String,
    index: true,
  },
  age: {
    type: Number,
    validate: [{
      validator: value => {
        return value > 16;
      },
      message: 'пользователю должно быть не менее 16 лет'
    }]
  },
  gender: {
    type: String,
    enum: ['f', 'm', 't'],
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});

schema.index({ email: 1, name: 1 });

module.exports = connection.model('User', schema);
