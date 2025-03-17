// Importar servicio de proyectos
const projectService = require('../services/project.service');

// Controlador para crear nuevos proyectos
exports.createProject = async (req, res) => {
    try {
        const { nombre, descripcion, administrador_id } = req.body;
        const admin_from_token = req.user.administrador_id;
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id, admin_from_token);
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos asociados a un administrador
exports.getAllProjectsByAdministradorId = async (req, res) => {
    try {
        const administrador_id = req.user.id;
        const projects = await projectService.getAllProjectsByAdministradorId(administrador_id);
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un proyecto por el id
exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await projectService.getProjectById(id);
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un proyecto
exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, descripcion, administrador_id } = req.body;
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto
exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await projectService.deleteProject(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};