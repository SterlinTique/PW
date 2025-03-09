const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proyect = sequelize.define('proyectos', {
    id: { type: DataTypes.INTEGER, primarykey: false, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: false }, 
    fecha_creacion: { type: DataTypes.DATE, allowNull: false }, 
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' } 
    }, 
    
}, {
    timestamps: false,
    tableName: 'proyectos',
});

module.exports = Proyect;