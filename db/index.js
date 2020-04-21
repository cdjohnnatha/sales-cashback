require('dotenv');

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST
} = process.env;


module.exports = {
  username: process.env.DB_USER || 'sales_cashback_test',
  password: process.env.DB_PASS || 'sales_cashback_test',
  database: process.env.DB_NAME || 'sales_cashback_test',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
};