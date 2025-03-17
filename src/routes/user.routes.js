const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // Importamos el controlador de usuarios

// Ruta POST para crear un usuario
router.post('/users/...', userController.createUser);

// Exportamos el router para que se puedan utilizar las rutas que se hayan definido
module.exports = router;