require('dotenv').config();

const {
  PORT = 3000,
  DB_USERNAME = 'root',
  DB_PASSWORD = null,
  DB_DATABASE = 'db-dev',
  DB_HOST = '127.0.0.1',
  DB_MONGODB_URI = '',
  SESSION_NAME = 'connectsid',
  SECRET_KEY = 'secret',
  SALT_ROUNDS = 10,
  DATABASE_URL,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_USER_ID,
} = process.env;

module.exports = {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_MONGODB_URI,
  SESSION_NAME,
  SECRET_KEY,
  SALT_ROUNDS,
  DATABASE_URL,
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_USER_ID,
}
