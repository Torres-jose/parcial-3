const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) =>{
    try {
        const token = req.headers["authorization"].split(" ")[1];
             if(!token) return res.status(500).json({message: "Token requerido"});

        jwt.verify(token, process.env.KEY, (error, data) =>{
            if(error) return res.status(500).json({status:false, message: "Token invalido o expirado" })
            
                req.user = data;
                next();
        })
        
    } catch (error) {
        return res.status(501).json({message: error.message});
    }
    
}

module.exports = verificarToken;