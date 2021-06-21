const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Torneo extends Model { }
    Torneo.init({
        nombre: DataTypes.STRING,
        fec_inicio: DataTypes.DATE,
        fec_fin: DataTypes.DATE,
        max_participantes: DataTypes.INTEGER,
        descripcion: DataTypes.STRING,
        estado: DataTypes.STRING,
        cant_particip_diarios: DataTypes.INTEGER,
        tipo: DataTypes.STRING,
        puntaje_perdedor: DataTypes.INTEGER,
        puntaje_ganador: DataTypes.INTEGER,
        puntaje_empate: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: "Torneo"
    })

    Torneo.associate = models => {
        Torneo.belongsToMany(models.Equipo, { through: "torneo_equipo" })
    }
    Torneo.associate = models => {
        Torneo.hasMany(models.Ronda, { as: "rondas", foreignKey: "torneo_id" })
    }
    Torneo.associate = models => {
        Torneo.belongsTo(models.Usuario, { as: "organizador", foreignKey: "organizador_id" })
    }

    return Torneo
}