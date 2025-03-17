const jwt = require('jsonwebtoken'); // Importar librería de "jsonwebtoken" para generar token de autenticación
const bcrypt = require('bcryptjs'); // Importar la librería "bcryptjs" para cifrar contraseñas
const dotenv = require('dotenv'); //importar las variables de entornos 
// importamos el modelo user y el modelo rol permisos
const  User = require ('../models/user.model');
const RolePermisssion = require('../models/rolePermission.model');

dotenv.config();//cargar variables de entorno

const SECRET_KEY = process.env.JWT_SECRET; // Obtener la clave secreta desde las claves de entorno
// exportamos un servicio que va ha recibir una email y un  passwor
exports.loginUser = async (email, password) => {
    try{
        // verifica que el ususario existe 
        const user = await User.findOne({ where: {email}}); // el findOne es un modelo que se utilliza con sequelize para buscar
        if (!user) {
            throw new Error('Usuario no encontrada');
        }

        //Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        // consultar permisos de rol
        const rolePermissions = await RolePermisssion.findAll({
            where: { rol_id: user.rol_id },
            attributes: ['persimo_id']
        });
        
        // Extraemos los permisos del resultado
        const permisos = rolePermissions.map(rp => rp.permiso_id);

        // Generar un token JWT con los datos del usuario y sus permisos
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, email: user.email, rol_id: user.rol_id, permisos },
            SECRET_KEY,
            { expiresIn: '1h'}
        );

        return token;
    } catch (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
    }
}