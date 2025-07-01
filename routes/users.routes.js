const express = require('express');
const {check} = require('express-validator');
const usersRouter = express.Router();
const{RegistrarUsuario, LoginUsuario, PerfilUsuario} = require('../controllers/users.controllers');
const verificarToken = require('../middlewares/validartoken.middlewares');
const validarCampos = require('../middlewares/validarcampos.meddlewares');

usersRouter.post("/",[
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
    check('fullname', 'El nombre completo es obligatorio').not().isEmpty(),
    validarCampos
],RegistrarUsuario);
usersRouter.post("/login",[
    check('username', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,LoginUsuario);
usersRouter.get("/", verificarToken ,PerfilUsuario);

module.exports = usersRouter;
