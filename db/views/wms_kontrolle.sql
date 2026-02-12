-- View: webgis.wms_kontrolle

-- DROP VIEW webgis.wms_kontrolle;

CREATE OR REPLACE VIEW webgis.wms_kontrolle
 AS
 SELECT gm_ih_kontrolle.id,
    gm_ih_kontrolle.created,
    gm_ih_kontrolle.machine,
    gm_ih_kontrolle.owner,
    gm_ih_kontrolle.sequence,
    gm_ih_kontrolle.zeit,
    gm_ih_kontrolle.kontrolleur AS kontrolleur_id,
    gm_ih_werker.bezeichnung AS kontrolleur,
    gm_ih_kontrolle.status,
    gm_ih_kontrolle.datum,
    gm_ih_kontrolle.bemerkung,
    gm_ih_kontrolle.masterclass,
    gm_ih_kontrolle.masterid,
    gm_ih_kontrolle.wetter,
    gm_ih_kontrolle.typ,
    gm_ih_kontrolle.hauptkontrolle,
    gm_ih_kontrolle.naechstekontrolle,
    gm_ih_kontrolle.bewertung
   FROM gm_ih_kontrolle
     JOIN gm_ih_werker ON gm_ih_kontrolle.kontrolleur = gm_ih_werker.id
  WHERE gm_ih_kontrolle.id > 0;

ALTER TABLE webgis.wms_kontrolle
    OWNER TO postgres;

