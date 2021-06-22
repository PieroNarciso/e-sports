const { Model } = require('sequelize');
const user = require('../controllers/user');
module.exports = (sequelize, DataTypes) => {

    class Equipo extends Model { }
    Equipo.init({
        nombre: DataTypes.STRING,
        lista_integrantes: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Equipo"
    })

    Equipo.associate = models => {
        Equipo.belongsToMany(models.Torneo, { through: "torneo_equipo"})
    }
    Equipo.associate = models => {
        Equipo.belongsTo(models.Usuario, { as: "lider", foreignKey: "lider_id" })
    }
    return Equipo
}