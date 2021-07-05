const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Ronda extends Model {
  static associate({ Torneo, Partida }) {
    this.belongsTo(Torneo, { as: 'torneo', foreignKey: 'torneo_id' });
    this.hasMany(Partida, { as: 'partidas', foreignKey: 'ronda_id' });
  }
}
Ronda.init(
  {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  },
  {
    sequelize,
    modelName: 'Ronda',
  }
);

module.exports = { Ronda };
