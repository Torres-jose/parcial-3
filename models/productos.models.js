const mongoose = require('mongoose');

const productsShema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    category_id:{
        type: mongoose.Types.ObjectId, 
        ref: 'categories', 
        required: true
    },
    created_by:{
        type: mongoose.Types.ObjectId,
        ref:'users',
        required: true
    }
})

module.exports = mongoose.model('products', productsShema);