const dbPools = require('../db');
const { parseSortby } = require('../utils/sorting');

// Whitelist of allowed columns to prevent SQL injection
const allowedColumns = ['baumnr', 'baumnr_id', 'bemerkung', 'txtrotation', 'bezeichnungbot', 'bezeichnung', 'funktion', 'pflanzjahr', 'vital', 'kronendm_aktuell', 'hoehe_aktuell', 'umfang_aktuell', 'durchmesser_stamm', 'datumwachstum', 'strasse', 'gid', 'fid', 'id', 'fc'];

const getTrees = async (req, res) => {
  const db = req.params.db;
  let sql = 'SELECT * FROM webgis.wms_baum';
  const pool = dbPools[db];
  if (!pool) {
    return res.status(400).json({ error: 'Unknown database' });
  }

  // Parse and validate sorting
  const { orderByClauses, error: sortError } = parseSortby(req.query.sortby, allowedColumns);
  if (sortError) {
    return res.status(sortError.status).json({
      error: sortError.error,
      message: sortError.message
    });
  }

  if (orderByClauses.length > 0) {
    sql += ` ORDER BY ${orderByClauses.join(', ')}`;
  }

  try {
    const result = await pool.query(sql);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTrees };
