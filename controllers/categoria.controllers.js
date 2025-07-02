const Categories = require("../models/categoria.moduls");
/*- POST /categories → Crear categoría (usuario autenticado)*.
- GET /categories → Listar categorías.
- PUT /categories/:id → Editar categoría (usuario autenticado).
- DELETE /categories/:id → Eliminar (usuario autenticado).
- Los productos deben estar vinculados a una categoría válida. */

//crear categoria
const crearCategoria = async (req, res) => {
  try {
    const categoria = new Categories(req.body);
    await categoria.save();
    return res
      .status(202)
      .json({ status: true, message: "Categoria Registrada", data: categoria });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

//listar categoria

const listaCategoria = async (req, res) =>{
    try {
        const categoria = await Categories.find();
        return res.json(categoria);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "error al obtener las categorias"});
    }
};
//actulizar categoria
const actulizarCategoria = async (req, res) =>{
    try {
        const update = await Categories.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!update) return res.status(500).json({error: "No se a encontrado registro"});
        return res.json(update);
    } catch (error) {
        return res.status(500).json({error: "Error al actulizar categoria"});
    }
};
//eliminar categoria
const eliminarCategoria = async (req, res) =>{
    try {
        const delete_categoria = await Categories.findByIdAndDelete(req.params.id);
        if(!delete_categoria) return res.status(500).json({error: "No se a encontrado registro"});
        return res.json({message:"categoria eliminada"});
    } catch (error) {
        return res.status(500).json({error: "Error al actulizar categoria"});
    }
};

module.exports = { crearCategoria, listaCategoria, actulizarCategoria, eliminarCategoria}; 