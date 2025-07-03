const express = require('express');
const productoRouter = express.Router();

const {crearProductos, listarProductos, detalleProductos, actulizarProductos, eliminarProductos}= require('../controllers/productos.controllers');
const verificarToken = require('../middlewares/validartoken.middlewares');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos.meddlewares');



productoRouter.post("/",verificarToken,[
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripcion del producto es obligatoria').not().isEmpty(),
    check('price','El precio del productos es requerido').not().isEmpty(),
    check('category_id','El id de la categoria es requerido').not().isEmpty(),
    validarCampos
], crearProductos);

productoRouter.get("/",verificarToken,[
    check('category_id', 'El id de la categoría no puede estar vacío').not().notEmpty(),
    check('search', 'El campo de búsqueda no debe estar vacío').not().notEmpty(),
  validarCampos
], listarProductos);

productoRouter.get("/:id",verificarToken,detalleProductos);
productoRouter.put("/:id",verificarToken,actulizarProductos);
productoRouter.delete("/:id",verificarToken,eliminarProductos);

module.exports = productoRouter;