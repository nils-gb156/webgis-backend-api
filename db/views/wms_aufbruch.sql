-- View: webgis.wms_aufbruch

-- DROP VIEW webgis.wms_aufbruch;

CREATE OR REPLACE VIEW webgis.wms_aufbruch
 AS
 SELECT a.id,
    a.sequence,
    a.created,
    a.owner,
    a.machine,
    a.aufbruchnr,
    a.strasse_id,
    a.ortsbeschreibung,
    a.beschreibung,
    a.datumabnahme,
    a.datumgewaehrleistung,
    a.datumwiedervorlage,
    a.datumendkontrolle,
    a.bemerkungen,
    to_char(a.aufbruchdatum::timestamp with time zone, 'DD.MM.YYYY'::text) AS aufbruchdatum,
    a.trassenverlauf,
    a.gebuehr,
    a.gbbezahlt,
    a.bauweise,
    a.laenge,
    a.breite,
    a.beginn,
    a.ende,
    a.medium,
    a.auftraggeber AS auftraggeber_id,
    g.nachname AS auftraggeber,
    a.auftragnehmer AS auftragnehmer_id,
    n.nachname AS auftragnehmer,
    a.abnahmedurch AS abnahmedurch_id,
    d.nachname AS abnahmedurch,
    a.endkontrolledurch AS endkontrolledurch_id,
    e.nachname AS endkontrolledurch
   FROM gm_str_aufbrueche a
     LEFT JOIN gm_std_person g ON a.auftraggeber = g.id
     LEFT JOIN gm_std_person n ON a.auftragnehmer = n.id
     LEFT JOIN gm_std_person d ON a.abnahmedurch = d.id
     LEFT JOIN gm_std_person e ON a.endkontrolledurch = e.id
  WHERE a.id > 0;

ALTER TABLE webgis.wms_aufbruch
    OWNER TO postgres;

