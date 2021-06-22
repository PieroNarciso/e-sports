const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Equipo extends Model {
    static associate({ Torneo, Usuario }) {
      this.belongsToMany(Torneo, { through: 'torneo_equipo' });
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
  return Equipo;
};
