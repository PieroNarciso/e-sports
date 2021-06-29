'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adm_Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Adm_Rol.hasMany(models.Adm_Usuario, {foreignKey: 'rolId', as:'usuarios'})
    }
  };
  Adm_Rol.init({
    rol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Adm_Rol',
  });
  return Adm_Rol;
};