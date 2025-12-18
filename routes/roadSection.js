const express = require('express');
const router = express.Router();
const { getRoadSections, getRoadSectionById, getControlsByRoadSectionId, getExcavationByRoadSectionId } = require('../controllers/roadSection');

// Route: /:db/road-section
router.get('/:db/road-section', getRoadSections);

// Route: /:db/road-section/:id
router.get('/:db/road-section/:id', getRoadSectionById);

// Route: /:db/road-section/:id/control
router.get('/:db/road-section/:id/control', getControlsByRoadSectionId);

// Route: /:db/road-section/:id/excavation
router.get('/:db/road-section/:id/excavation', getExcavationByRoadSectionId);

module.exports = router;
