require('dotenv');

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
} = process.env;

module.exports = {
  username: DB_USER || 'postgres',
  password: DB_PASS || 'postgres',
  database: DB_NAME || 'sales_cashback',
  host: DB_HOST || '127.0.0.1',
  dialect: 'postgres',
};