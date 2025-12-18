const express = require('express');
const router = express.Router();
const { getTrees } = require('../controllers/tree');

// Route: /:db/tree
router.get('/:db/tree', getTrees);

module.exports = router;
