
const mongoose = require('mongoose');

const conexion = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("conexion exitosa..");
    })

    .catch((error)=>{
        console.log("Error" + error.message)
    })
};

module.exports = conexion;