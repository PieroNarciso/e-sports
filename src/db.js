const { Sequelize } = require('sequelize');

const {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } = require('./config/env');

const sequelize = new Sequelize({
  username: DB_USERNAME,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: 'postgres',
});


module.exports = sequelize;
