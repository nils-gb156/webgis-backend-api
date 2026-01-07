const express = require('express');
const router = express.Router();
const { getRoadSections, getRoadSectionByGid, getControlsByRoadSectionGid, getExcavationByRoadSectionGid } = require('../controllers/roadSection');

// Route: /:db/road-section
router.get('/:db/road-section', getRoadSections);

// Route: /:db/road-section/:gid
router.get('/:db/road-section/:gid', getRoadSectionByGid);

// Route: /:db/road-section/:gid/control
router.get('/:db/road-section/:gid/control', getControlsByRoadSectionGid);

// Route: /:db/road-section/:gid/excavation
router.get('/:db/road-section/:gid/excavation', getExcavationByRoadSectionGid);

module.exports = router;
