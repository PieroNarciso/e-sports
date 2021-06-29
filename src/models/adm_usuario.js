'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adm_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adm_Usuario.belongsTo(models.Adm_Rol, { foreignKey:'rolId', as: 'roles'})
    }
  };
  Adm_Usuario.init({
    nombre: DataTypes.STRING,
    correo_electronico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Adm_Usuario',
  });
  return Adm_Usuario;
};