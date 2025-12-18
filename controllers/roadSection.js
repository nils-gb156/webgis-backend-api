const dbPools = require('../db');
const { parseSortby } = require('../utils/sorting');

// Whitelist of allowed columns to prevent SQL injection
const allowedColumns = ['id', 'gid', 'fid', 'fc', 'strasseid', 'strasse', 'lfdnr', 'baulasttraeger_id', 'baulasttraeger', 'bezeichnung', 'creadted', 'machine', 'owner', 'sequence', 'zeit', 'kontrolleur', 'status', 'datum', 'bemerkung', 'masterclass', 'masterid', 'wetter', 'typ', 'hauptkontrolle', 'naechstekontrolle', 'aufbruchnr', 'strasse_id', 'ortsneschreibung', 'beschreibung', 'datumabnahme', 'datumgewaehrleistung', 'datumwiedervorlage', 'bemerkungen', 'aufbruchdatum', 'trassenverlauf', 'gebuehr', 'gbbezahlt', 'bauweise', 'laenge', 'breite', 'beginn', 'ende', 'medium', 'auftraggeber', 'auftragnehmer', 'abnahmedurch', 'endkontrolledurch'];

const getRoadSections = async (req, res) => {
  const db = req.params.db;
  let sql = 'SELECT * FROM webgis.wms_strassenabschnitt';
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

const getRoadSectionById = async (req, res) => {
  const db = req.params.db;
  const id = req.params.id;
  let sql = 'SELECT * FROM webgis.wms_strassenabschnitt WHERE id = $1';
  const pool = dbPools[db];
  if (!pool) {
    return res.status(400).json({ error: 'Unknown database' });
  }

  try {
    const result = await pool.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getControlsByRoadSectionId = async (req, res) => {
  const db = req.params.db;
  const id = req.params.id;
  let sql = 'SELECT * FROM webgis.wms_kontrolle WHERE masterid = $1 AND masterclass = 9585 and id > 0';
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
    const result = await pool.query(sql, [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeparturesByRoadSectionId = async (req, res) => {
  const db = req.params.db;
  const id = req.params.id;
  let sql = 'SELECT * FROM webgis.wms_aufbruch WHERE strasse_id = (select strasseid from webgis.wms_strassenabschnitt where id = $1) AND id > 0';
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
    const result = await pool.query(sql, [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getRoadSections, getRoadSectionById, getControlsByRoadSectionId, getDeparturesByRoadSectionId };
