const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Partida extends Model {
  static associate({ Ronda }) {
    this.belongsTo(Ronda, { as: 'ronda', foreignKey: 'ronda_id' });
  }
}
Partida.init(
  {
    // solo para almacenar y mostrar los nombres de los equipos
    equipo_A: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipo_B: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // puntos que ganaron A y B de la partida
    resultado_A: {
      type: DataTypes.INTEGER,
    },
    resultado_B: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Partida',
  }
);

module.exports = { Partida };
