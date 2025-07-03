const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },

    description:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('categories', categoriesSchema);