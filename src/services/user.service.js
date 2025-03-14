const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.createUser = async (nombre, ElementInternals, password, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: {email}}); // El findOne es un modelo que se utiliza con sequelize 
        if (!userExists) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (err) {
        throw new Error('Error al crear el usuario: ${err.message}');
    }
};