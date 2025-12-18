const dbPools = require('../db');

const checkDbHealth = async (req, res) => {
  const results = {};
  const poolNames = Object.keys(dbPools);
  for (const name of poolNames) {
    try {
      await dbPools[name].query('SELECT 1');
      results[name] = { status: 'ok', db: name };
    } catch (err) {
      results[name] = { status: 'error', error: err.message };
    }
  }
  res.json(results);
};

module.exports = { checkDbHealth };
