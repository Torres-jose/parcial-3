//require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/users.models');
const RegistrarUsuario = async (req, res)=>{
   try {
        //cifrado de password
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        //insertar datos
        const usuario = new Usuario(req.body);
        await usuario.save();
        return res.status(201).json({status: true, mesaage:'ok', data:usuario});
   } catch (error) {
        return res.status(500).json({status:false, mesaage:error.mesaage});
   }
};

 //no loge arreglar ahora mas tarde 5:00 am
        //11: am era una referencia equibocado a la base de datos 
        //buscar usuario
const LoginUsuario = async (req, res)=>{
    try {
       
        const usuario = await Usuario.findOne({ username:req.body.username });
        if(!usuario)
            return res.status(500).json({status:false, message:"Usuario no encontrado"});//cambiar usuario o passwor no encotrado

        //valida password
        if(!bcrypt.compareSync(req.body.password, usuario.password))
            return res.status(500).json({status:false, message:"contraseña incorrecta"});//cambia a usuario o passwor no encontrado
        //Genera el token
        const token = jwt.sign({id: usuario._id, username:usuario.username, fullname:usuario.fullname}, process.env.KEY, {expiresIn:'1h'});
            return res.status(200).json({status: true, message:"Login exitoso",token: token});
    } catch (error) {
        return res.status(500).json({status:false, message:error.message});
    }
};

const PerfilUsuario = async (req, res)=>{
    try {
        const usuario = await Usuario.findById(req.usuarioId).select('-password');

        if(!usuario){return res.status(404).json({status:false, message: "Usuario no encotrado"});} 

        return res.status(200).json({status: true, message:" perfil obtenido correctamente", data: usuario});

    } catch (error) {
        return res.status(500).json({status:false, message: error.message});
    }
};

module.exports ={
    RegistrarUsuario,
    LoginUsuario,
    PerfilUsuario
}


