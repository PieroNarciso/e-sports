const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Equipo extends Model { }
    Equipo.init({
        nombre: DataTypes.STRING,
        lista_integrantes: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Equipo"
    })

    Equipo.associate = (models) => {
        Equipo.belongsToMany(models.Torneo, { foreignKey: TorneoId, through: models.torneo_equipo, as: 'torneo'})
    }
    Equipo.associate = models => {
        Equipo.belongsTo(models.Usuario, { as: "lider", foreignKey: "lider_id" })
    }
    return Equipo
}