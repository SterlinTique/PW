// Importamos los modelos de usuario, proyecto y el de usarios-proyectos
const User = require('./user.model');
const Proyect = require('./proyect.model');
const UserProyect = require('./userProyect.model');

// Definimos las relaciones 
// Relaciones muchos a muchos "belongsToMany", entre usuarios y proyectos
User.belogsToMany(Proyect, { through: UserProyect, foreignkey: 'usuario_id', as: 'proyectos'});
Proyect.belongsToMany(User, { through: UserProyect, foreignkey: 'proyecto_id', as: 'usuarios'});

// Relación de un proyecto con su administrador "belongsTo"
Proyect.belongsTo(User, { foreignkey: 'administrador_id', as: 'administrador'});

// Se exporta el modelo con sus relaciones definidas
module.exports = { User, Proyect, UserProyect };

/* recordar que:
EL parámetro "through" especifica el modelo que actúa como puente entre las dos entidades,
el parámetro "foreignkey" especifica la clave foránea que se utiliza para establecer la relación y
el parámetro "as" especifica el alias que se utiliza para referirse a la relación*/