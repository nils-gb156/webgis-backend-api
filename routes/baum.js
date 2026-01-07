const express = require('express');
const router = express.Router();
const { getBaeume, getBaumById, getKontrollenByBaumId } = require('../controllers/baum');

// Route: /:db/baum
router.get('/:db/baum', getBaeume);

// Route: /:db/baum/:id
router.get('/:db/baum/:id', getBaumById);

// Route: /:db/baum/:id/kontrolle
router.get('/:db/baum/:id/kontrolle', getKontrollenByBaumId);

module.exports = router;
