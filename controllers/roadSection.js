exports.getControlsByRoadSectionId = async (req, res) => {
  const db = req.params.db;
  const id = req.params.id;
  let pool;
  if (db === 'lohmar') {
    pool = lohmar_pool;
  } else if (db === 'roetgen') {
    pool = roetgen_pool;
  } else {
    return res.status(400).json({ error: 'Unknown database' });
  }

  try {
    const result = await pool.query('SELECT * FROM gm_ih_kontrolle WHERE masterid = $1 AND masterclass = 9585', [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getRoadSectionById = async (req, res) => {
  const db = req.params.db;
  const id = req.params.id;
  let pool;
  if (db === 'lohmar') {
    pool = lohmar_pool;
  } else if (db === 'roetgen') {
    pool = roetgen_pool;
  } else {
    return res.status(400).json({ error: 'Unknown database' });
  }

  try {
    const result = await pool.query('SELECT * FROM webgis.wms_strassenabschnitt WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
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
