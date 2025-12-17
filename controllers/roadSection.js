const { lohmar_pool, roetgen_pool } = require('../db');

exports.getRoadSections = async (req, res) => {
  const db = req.params.db;
  let pool;
  if (db === 'lohmar') {
    pool = lohmar_pool;
  } else if (db === 'roetgen') {
    pool = roetgen_pool;
  } else {
    return res.status(400).json({ error: 'Unknown database' });
  }

  try {
    const result = await pool.query('SELECT * FROM webgis.wms_strassenabschnitt');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
