const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class torneo_equipo extends Model {
}

torneo_equipo.init(
    {
        estado: {
            type: DataTypes.ENUM('activo', 'inactivo'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'torneo_equipo',
        timestamps: false,
    }
);

module.exports = { torneo_equipo };