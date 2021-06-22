const { Model, DataTypes } = require('sequelize');


class Usuario extends Model {

  static associate({ Torneo, Equipo }) {
    this.hasMany(Torneo, { as: "torneos_creados", foreignKey: "organizador_id" });
    this.hasOne(Equipo, { as: "equipo", foreignKey: "lider_id" });
  }

}
Usuario.init({
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
    }
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 8,
    }
  },
  rol: {
    type: DataTypes.ENUM('admin', 'org', 'lider'),
    allowNull: false,
  }// admin 0, org 1, lider 2
}, {
  sequelize,
  modelName: "Usuario"
});

module.exports = {
  Usuario,
}
