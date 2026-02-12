-- View: webgis.wms_baum

-- DROP VIEW webgis.wms_baum;

CREATE OR REPLACE VIEW webgis.wms_baum
 AS
 SELECT DISTINCT gm_bk_baum.baumnr,
    gm_bk_baum.bemerkung,
    gm_bk_baum_geo.txtrotation,
    gm_bk_baum.bezeichnungbot,
    gm_bk_baum.bezeichnung,
    gm_bk_baum.funktion,
    gm_bk_baum.pflanzjahr,
    gm_bk_baum.vital,
    gm_bk_baum.kronendm_aktuell,
    gm_bk_baum.hoehe_aktuell,
    gm_bk_baum.umfang_aktuell,
    gm_bk_baum.durchmesser_stamm,
    gm_bk_baum.datumwachstum,
    gm_std_strasse.bezeichnung AS strasse,
    gm_bk_baum_geo.the_geom,
    st_buffer(gm_bk_baum_geo.the_geom, gm_bk_baum.kronendm_aktuell / 2::double precision) AS krone,
    gm_bk_baum_geo.gid,
    gm_bk_baum_geo.fid,
    gm_bk_baum.id,
    gm_bk_baum_geo.fc
   FROM gm_bk_baum_geo
    LEFT JOIN gm_bk_baum ON gm_bk_baum.id = gm_bk_baum_geo.fid
     LEFT JOIN gm_std_strasse ON gm_bk_baum.strasseid = gm_std_strasse.id
  WHERE gm_bk_baum_geo.gid > 0 AND gm_bk_baum_geo.the_geom IS NOT NULL;

ALTER TABLE webgis.wms_baum
    OWNER TO postgres;

