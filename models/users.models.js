const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('users', usersSchema);