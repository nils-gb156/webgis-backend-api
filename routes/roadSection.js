const express = require('express');
const router = express.Router();
const roadSectionController = require('../controllers/roadSection');

// Route: /:db/road-section
router.get('/:db/road-section', roadSectionController.getRoadSections);

// Route: /:db/road-section/:id
router.get('/:db/road-section/:id', roadSectionController.getRoadSectionById);

module.exports = router;
