const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    subcategory : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    images : [{
        type : String
    }]
});

module.exports = connection.model('Product', schema);