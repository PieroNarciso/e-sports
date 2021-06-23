const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Equipo extends Model {
  static associate({ Torneo, Usuario }) {
    this.belongsToMany(Torneo, { as: 'torneos', through: 'torneo_equipo' });
    this.belongsTo(Usuario, { as: 'lider', foreignKey: 'lider_id' });
  }
}

Equipo.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lista_integrantes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Equipo',
  }
);

module.exports = { Equipo };
