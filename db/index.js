const { Pool } = require('pg');
require('dotenv').config();
const dbConfig = require('./config');

// Erzeuge für jede DB in der Konfiguration einen Pool und mappe sie nach Name
const dbPools = {};
for (const [name, config] of Object.entries(dbConfig)) {
  const pool = new Pool(config);
  pool.on('error', (err) => {
    console.error(`Unexpected DB error in pool '${name}':`, err);
    process.exit(-1);
  });
  dbPools[name] = pool;
}

module.exports = dbPools;