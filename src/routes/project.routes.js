const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller'); // Importamos el controlador de proyectos

// Ruta POST para crear un proyecto
router.post('/projects/...', projectController.createProject);

// Exportamos el router para que se puedan utilizar las rutas que se hayan definido
module.exports = router;