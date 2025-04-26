// Importamos los modelos de usuario, proyecto y el de usarios-proyectos
const User = require('./user.model');
const Project = require('./project.model');
const UserProject = require('./userProject.model');

// Definimos las relaciones 
// Relaciones muchos a muchos "belongsToMany", entre usuarios y proyectos
User.belongsToMany(Project, { through: UserProject, foreignKey: 'usuario_id', as: 'proyectos'});
Project.belongsToMany(User, { through: UserProject, foreignKey: 'proyecto_id', as: 'usuarios'});

// Relación de un proyecto con su administrador "belongsTo"
Project.belongsTo(User, { foreignKey: 'administrador_id', as: 'administrador'});

// Se exporta el modelo con sus relaciones definidas
module.exports = { User, Project, UserProject };

/* recordar que:
EL parámetro "through" especifica el modelo que actúa como puente entre las dos entidades,
el parámetro "foreignkey" especifica la clave foránea que se utiliza para establecer la relación y
el parámetro "as" especifica el alias que se utiliza para referirse a la relación*/