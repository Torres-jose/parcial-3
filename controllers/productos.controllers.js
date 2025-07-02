const Productos = require("../models/productos.models");
const Categoria = require("../models/categoria.models");

const crearProductos = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const product = new Productos({
      name,
      description,
      price,
      category_id,
      created_by: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error al crear el producto" });
  }
};

const listarProductos = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category_id) {
      const categoriaExiste = await Categoria.findById(req.query.category_id);
      if (!categoriaExiste) {
        return res.status(404).json({ message: "Categoria no encontrada" });
      }
      filter.category_id = req.query.category_id;
    }

    if (req.query.search) filter.name = new RegExp(req.query.search, "i");

    const products = await Productos.find(filter)
      .populate("categories_id")
      .populate("created_by");

    if (products === 0) {
      return res
        .status(404)
        .json({
          message:
            "No se encontro productos con ese nombre en la categoria indicada",
        });
    }

    res.json(products);
  } catch (error){
    res.status(500).json({ error: error.message, message: "Error al listar producto" });
  }
};

const detalleProductos = async (req, res) => {
  try {
    //agregar promedio de calificcion
    const products = await Productos.findById(req.params.id).populate(
      "categories_id"
    );
    if (!products)
      return res.status(404).josn({ message: "Producto no encotrado" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Error en el detalle del producto" });
  }
};

const actulizarProductos = async (req, res) => {
  try {
    const updated = await Productos.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actulizar producto" });
  }
};

const eliminarProductos = async (req, res) => {
  try {
    const deleted = await Productos.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

module.exports = {
  crearProductos,
  listarProductos,
  detalleProductos,
  actulizarProductos,
  eliminarProductos
}
