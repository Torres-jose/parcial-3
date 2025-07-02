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
app.use('/api/usuario',UsuarioRouter);
app.use('/api/categoria',CategoriaRouter);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
})
