const { Model, DataTypes } = require('sequelize');

class Torneo extends Model { 
  static associate({ Equipo, Ronda, Usuario }) {
    this.belongsToMany(Equipo, { through: "torneo_equipo" });
    this.hasMany(Ronda, { as: "rondas", foreignKey: "torneo_id" });
    this.belongsTo(Usuario, { as: "organizador", foreignKey: "organizador_id" });
  }
}
Torneo.init({
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fec_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fec_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  max_participantes: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  descripcion: {
    type: DataTypes.STRING(526),
    validate: {
      min: 5
    }
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo', 'en curso'),
    defaultValue: 'activo',
  },
  cant_particip_diarios: DataTypes.INTEGER,
  tipo: DataTypes.STRING,
  puntaje_perdedor: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  puntaje_ganador: {
    type: DataTypes.INTEGER,
    defaultValue: 3,
  },
  puntaje_empate: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  sequelize,
  modelName: "Torneo"
});


