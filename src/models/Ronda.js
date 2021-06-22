const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Ronda extends Model {
    static associate({ Torneo, Partida }) {
      this.belongsTo(Torneo, { as: 'torneo', foreignKey: 'torneo_id' });
      this.hasMany(Partida, { as: 'partidas', foreignKey: 'ronda_id' });
    }
  }
  Ronda.init(
    {
      nro_correlativo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ordinal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Ronda',
    }
  );

  return Ronda;
};
