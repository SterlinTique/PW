const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userProyect.model');

// Relaciones muchos a muchos "belongsToMany"
User.belogsToMany(Proyect, { through: UserProyect, foreignkey: 'usuario_id', as: 'proyectos'});
Proyect.belongsToMany(User, { through: UserProyect, foreignkey: 'proyecto_id', as: 'usuarios'});

// Relación de administrador
Proyect.belongsTo(User, { foreignkey: 'administrador_id', as: 'administrador'});

module.exports = { User, Proyect, UserProyect };