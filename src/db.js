const { Sequelize } = require('sequelize');

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME, DATABASE_URL } = require('./config/env');


const sequelizeOpts = DATABASE_URL? DATABASE_URL : {
  username: DB_USERNAME,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: 'postgres',
};

const sequelize = new Sequelize(sequelizeOpts);


module.exports = sequelize;
