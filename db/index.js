const { Pool } = require('pg');
require('dotenv').config();

const lohmar_pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB1_NAME
});

const roetgen_pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB2_NAME
});

lohmar_pool.on('error', (err) => {
  console.error('Unexpected Lohmar_DB error:', err);
  process.exit(-1);
});

roetgen_pool.on('error', (err) => {
  console.error('Unexpected Roetgen_DB error:', err);
  process.exit(-1);
});

module.exports = {
  lohmar_pool,
  roetgen_pool
};