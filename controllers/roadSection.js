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

const getRoadSectionByGid = async (req, res) => {
  const db = req.params.db;
  const gid = req.params.gid;
  let sql = 'SELECT * FROM webgis.wms_strassenabschnitt WHERE gid = $1';
  const pool = dbPools[db];
  if (!pool) {
    return res.status(400).json({ error: 'Unknown database' });
  }

  try {
    const result = await pool.query(sql, [gid]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getControlsByRoadSectionGid = async (req, res) => {
  const db = req.params.db; 
  const gid = req.params.gid;
  let sql;
  
  // Special handling for 'lohmar' database
  if (db === 'lohmar') {
    sql = `
WITH base_abschnitt AS (
    -- der Abschnitt, für den wir die Straße ermitteln
    SELECT sa.fid, sa.strasseid, sa.the_geom
    FROM webgis.wms_strassenabschnitt sa
    WHERE sa.gid = $1
),
alle_abschnitte AS (
    -- alle Abschnitte derselben Straße
    SELECT a.id
    FROM gm_str_abschnitt a
    JOIN base_abschnitt b
      ON a.strasseid = b.strasseid
)
-- alle Kontrollen, die zu irgendeinem Abschnitt der Straße gehören
SELECT 
    b.fid AS abschnitt_id,
    b.the_geom AS abschnitt_geom,
    k.*
FROM base_abschnitt b
JOIN webgis.wms_kontrolle k
  ON k.masterid IN (SELECT id FROM alle_abschnitte)
WHERE k.masterclass = 9585`;

  } else {
    sql = 'SELECT * FROM webgis.wms_kontrolle WHERE masterid = (SELECT id from webgis.wms_strassenabschnitt where gid = $1 LIMIT 1) AND masterclass = 9585 and id > 0';
  }

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
    const result = await pool.query(sql, [gid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExcavationByRoadSectionGid = async (req, res) => {
  const db = req.params.db;
  const gid = req.params.gid;
  let sql = 'SELECT * FROM webgis.wms_aufbruch WHERE strasse_id = (select strasseid from webgis.wms_strassenabschnitt where gid = $1)';
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
    const result = await pool.query(sql, [gid]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getRoadSections, getRoadSectionByGid, getControlsByRoadSectionGid, getExcavationByRoadSectionGid };
