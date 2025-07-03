
const Reviews = require("../models/reviews.models");
const mongoose = require("mongoose");

const crearReviews = async (req, res)=>{
    try {
        const {product_id,rating,comment } =req.body;
        const reviews = new Reviews({
            product_id,
            user_id:req.user.id,
            rating,
            comment,
            created_at: new Date()
        });
        await reviews.save();
        res.status(201).json({message: "Reseña registrada",data: reviews});
    } catch (error) {
        res.status(500).json({error: error.message, message: "Error al crear la reseña"});
    }
};

const listarReviews = async (req, res) =>{
    try {
        const {product_id} = req.params;

         // Verifica que el product_id sea válido
        if (!mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: "ID de producto no válido" });
        }

        const productId = new mongoose.Types.ObjectId(product_id);

        const reviews = await Reviews.find({product_id: productId}).populate('product_id','name');

        if(reviews.length === 0){
            return res.status(404).json({message: "No hay reseñas de este productos"});
        }

        const sumaRating = reviews.reduce((total, reviews) => total + reviews.rating, 0);
        const promedioRating = sumaRating / reviews.length;

        const redondearPromedio = parseFloat(promedioRating.toFixed(1));

        res.status(200).json({
            message: `Reseñas del producto ${product_id}`,
            data: reviews,
            Promedio_rating: redondearPromedio,
            totalReviews: reviews.length
        });
    } catch (error) {
        res.status(500).json({error: error.message, message: "Error al listar las reseñas"});
    }
};

const editarReviewas = async (req, res) =>{
    try {
        const {id} = req.params;
        const {rating, comment} = req.body;

        const reviews = await Reviews.findById(id);
        if(!reviews){
            return res.status(404).json({message: "Reseña no encontrada"});
        }

        if(reviews.user_id.toString() !== req.user.id){
             return res.status(403).json({ 
                message: "No tienes permiso para editar esta reseña." 
            });
        }

        const updatedReview = await Reviews.findByIdAndUpdate(id, {rating, comment}, {new:true});

         res.status(200).json({
            message: "Reseña actualizada exitosamente.",
            data: updatedReview
        });


    } catch (error) {
        res.status(500).json({error: error.message, message: "Error al editar reseña"});
    }
};

const eliminarReviewas = async (req, res)=>{
    try {
        const {id} = req.params;

         const reviews = await Reviews.findById(id);
        if(!reviews){
            return res.status(404).json({message: "Reseña no encontrada"});
        }

        if(reviews.user_id.toString() !== req.user.id){
             return res.status(403).json({ 
                message: "No tienes permiso para editar esta reseña." 
            });
        }

        await Reviews.findByIdAndDelete(id);
        res.json({ message: "reseña eliminado correctamente" });
    } catch (error) {
        res.status(500).json({error: error.message, message: "Error al eliminar reseña"});
    }
};

module.exports ={
    crearReviews,
    listarReviews,
    editarReviewas,
    eliminarReviewas
}