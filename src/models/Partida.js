const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Partida extends Model { }
    Partida.init({
        // solo para almacenar y mostrar los nombres de los equipos
        equipo_A: DataTypes.STRING,
        equipo_B: DataTypes.STRING,
        // puntos que ganaron A y B de la partida
        resultado_A: DataTypes.INTEGER,
        resultado_B: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "Partida"
    })

    Partida.associate = models => {
        Partida.belongsTo(models.Ronda, { as: "ronda", foreignKey: "ronda_id" })
    }

    return Partida
}