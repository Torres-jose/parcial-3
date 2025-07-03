const mongoose = require('mongoose');

const reviewsShema = new mongoose.Schema({
    product_id:{
        type: mongoose.Types.ObjectId,
        ref:'products',
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required: true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    created_at:{
        type:Date
    }
})

module.exports = mongoose.model('reviews', reviewsShema);