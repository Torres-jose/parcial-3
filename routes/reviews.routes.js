const express = require('express');
const verificarToken = require('../middlewares/validartoken.middlewares');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validarcampos.meddlewares');
const { crearReviews, listarReviews, editarReviewas, eliminarReviewas } = require('../controllers/reviews.controllers');
const reviewsRouter = express.Router();





reviewsRouter.post("/",verificarToken,[
    check('product_id','El id del producto es obligatorio').not().isEmpty(),
    check('rating','el rating es obligatorio del 1 a 5').not().isEmpty().isLength({min:1,max:5}),
    check('comment','agregar un comentari es obligatorio').not().isEmpty(),
    validarCampos
],crearReviews);

reviewsRouter.get("/:id", verificarToken,listarReviews);
reviewsRouter.put("/:id",verificarToken,editarReviewas);
reviewsRouter.delete("/:id",verificarToken,eliminarReviewas);

module.exports = reviewsRouter;