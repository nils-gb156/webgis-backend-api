-- View: webgis.wms_schaden

-- DROP VIEW webgis.wms_schaden;

CREATE OR REPLACE VIEW webgis.wms_schaden
 AS
 SELECT gm_ih_schaden_geo.gid,
    gm_ih_schaden_geo.fc,
    gm_ih_schaden_geo.uri,
    gm_ih_schaden_geo.rotation,
    gm_ih_schaden_geo.txtrotation,
    gm_ih_schaden_geo.fid,
    gm_ih_schaden_geo.editor,
    gm_ih_schaden_geo.constructor,
    gm_ih_schaden_geo.created,
    gm_ih_schaden_geo.lastupdate,
    gm_ih_schaden_geo.mandant,
    gm_ih_schaden_geo.the_geom,
    gm_ih_schaden.masterclass,
    gm_ih_cat_schaeden.art,
        CASE
            WHEN gm_ih_schaden.datumbehoben IS NULL THEN 'nicht erledigt'::text
            ELSE 'erledigt'::text
        END AS status,
    gm_ih_schaden.datumbehoben
   FROM gm_ih_schaden_geo
     JOIN gm_ih_schaden ON gm_ih_schaden.id = gm_ih_schaden_geo.fid
     JOIN gm_ih_cat_schaeden ON gm_ih_cat_schaeden.id = gm_ih_schaden.childid
  WHERE gm_ih_schaden.id > 0 AND gm_ih_schaden_geo.gid > 0;

ALTER TABLE webgis.wms_schaden
    OWNER TO postgres;

