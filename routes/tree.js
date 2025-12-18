const express = require('express');
const router = express.Router();
const { getTrees, getTreeById } = require('../controllers/tree');

// Route: /:db/tree
router.get('/:db/tree', getTrees);

// Route: /:db/tree/:id
router.get('/:db/tree/:id', getTreeById);

module.exports = router;
