const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Ronda extends Model { }
    Ronda.init({
        nro_correlativo: DataTypes.INTEGER,
        fecha: DataTypes.DATE,
        ordinal: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "Ronda"
    })

    Ronda.associate = models => {
        Ronda.belongsTo(models.Torneo, { as: "torneo", foreignKey: "torneo_id" })
    }
    Ronda.associate = models => {
        Ronda.hasMany(models.Partida, { as: "partidas", foreignKey: "ronda_id" })
    }

    return Ronda
}