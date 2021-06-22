const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
        allowNull: false,
        defaultValue: 0,
      },
      resultado_B: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Partida',
    }
  );
  return Partida;
};
