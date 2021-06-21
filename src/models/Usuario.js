const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Usuario extends Model { }
    Usuario.init({
        correo: DataTypes.STRING,
        contraseña: DataTypes.STRING,
        nombre_completo: DataTypes.STRING,
        rol: DataTypes.INTEGER // admin 0, org 1, lider 2
    }, {
        sequelize,
        modelName: "Usuario"
    })

    Usuario.associate = models => {
        Usuario.hasMany(models.Torneo, { as: "torneos_creados", foreignKey: "organizador_id" })
    }
    Usuario.associate = models => {
        Usuario.hasOne(models.Equipo, { as: "equipo", foreignKey: "lider_id" })
    }

    return Usuario
}