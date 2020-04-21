require('dotenv');

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST
} = process.env;


module.exports = {
  username: process.env.DB_USER || 'sales_cashback',
  password: process.env.DB_PASS || 's4l3s',
  database: process.env.DB_NAME || 'sales_cashback',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
};