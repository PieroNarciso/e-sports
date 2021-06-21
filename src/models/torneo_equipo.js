const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class torneo_equipo extends Model { }
    torneo_equipo.init({
        TorneoId: DataTypes.INTEGER,
        EquipoId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "torneo_equipo"
    })

    torneo_equipo.associate = (models) => {}

    return torneo_equipo
}