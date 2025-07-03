const express = require('express');
const categoriaRouter = express.Router();
const { check } = require('express-validator');
const {crearCategoria, listaCategoria, actulizarCategoria, eliminarCategoria}= require('../controllers/categoria.controllers');
const verificarToken = require('../middlewares/validartoken.middlewares');
const validarCampos = require('../middlewares/validarcampos.meddlewares');



categoriaRouter.post("/",verificarToken,[
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('description', 'La descripcion de la categoria es obligatoria').not().isEmpty(),
    validarCampos
], crearCategoria);

categoriaRouter.get("/",verificarToken,listaCategoria);
categoriaRouter.put("/:id",verificarToken,actulizarCategoria);
categoriaRouter.delete("/:id",verificarToken,eliminarCategoria);

module.exports = categoriaRouter;