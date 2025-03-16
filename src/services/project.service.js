const project = require('../models/project.model');
const user = require('../models/user.model');

exports.createProject = async (nombre, descripcion, administrador_id, admin_from_token ) => {
    try {
        if (administrador_id !== admin_from_token) {  // se tiene que comprobar primero que sea administrador */
            throw new Error('Acceso denegado, el proyecto debe ser creado por un administrador');
        }

        const newProject = await Project.create({
            nombre,
            descripcion,
            administrador_id,
        });

        return newProject;
    } catch (err) {
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

exports.getAllProjectsByAdministradorId = async (administrador_id) => {
    try {
        const projects = await Project.findAll({ where: { administrador_id } });
        return projects;
    } catch (err) {
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

exports.getProjectById = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (err) {
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }

        await project.update({
            nombre,
            descripcion,
            administrador_id,
        });

        return project;
    } catch (err) {
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

exports.deleteProject = async (id) => {
    try {
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' };
    } catch (err) {
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};