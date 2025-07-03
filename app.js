require('dotenv').config();
const express = require('express');
const conexion = require('./db');
const puerto = process.env.PORT;
const app = express();
app.use(express.json());
conexion();

//Importacion de ruta
const UsuarioRouter = require('./routes/users.routes');
const CategoriaRouter = require('./routes/categoria.routes');
const productoRouter = require('./routes/productos.routes');
const reviewsRouter = require('./routes/reviews.routes');
app.use('/api/usuario',UsuarioRouter);
app.use('/api/categoria',CategoriaRouter);
app.use('/api/producto',productoRouter);
app.use('/api/reviews',reviewsRouter);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
})
