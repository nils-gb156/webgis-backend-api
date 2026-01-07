const express = require('express');
const router = express.Router();
const { getStrassenabschnitte, getStrassenabschnitteByGid, getKontrollenByStrassenabschnittGid, getAufbruecheByStrassenabschnittGid } = require('../controllers/strassenabschnitt');

// Route: /:db/strassenabschnitt
router.get('/:db/strassenabschnitt', getStrassenabschnitte);

// Route: /:db/strassenabschnitt/:gid
router.get('/:db/strassenabschnitt/:gid', getStrassenabschnitteByGid);

// Route: /:db/strassenabschnitt/:gid/kontrolle
router.get('/:db/strassenabschnitt/:gid/kontrolle', getKontrollenByStrassenabschnittGid);

// Route: /:db/strassenabschnitt/:gid/aufbruch
router.get('/:db/strassenabschnitt/:gid/aufbruch', getAufbruecheByStrassenabschnittGid);

module.exports = router;
