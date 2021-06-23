const sequelize = require('../db');

const db = {
  Sequelize: sequelize,
  sequelize,
  ...require('./Equipo'),
  ...require('./Partida'),
  ...require('./Ronda'),
  ...require('./Torneo'),
  ...require('./Usuario'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = {
  ...db,
};
