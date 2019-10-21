const mongoose = require('mongoose');
const connection = require('../lib/connection');

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    subcategories : [{
        title : {
            type : String,
            required : true
        } 
    }],
});

module.exports = connection.model( 'Category', schema );