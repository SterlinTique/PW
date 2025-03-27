const express = require('express');
const cors = require('cors'); //La biblioteca CORS es para poder habilitar el acceso a la API desde diferentes partes
const app = express();

// Habilitar estos modulos
app.use(express.json());
app.use(cors());

// Importar rutas
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');

// Habilitar esta rutas
app.use('./api/v1', userRoutes);
app.use('./api/v1', authRoutes);
app.use('./api/v1', projectRoutes);

module.exports = app;