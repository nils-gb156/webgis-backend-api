const express = require('express');
const router = express.Router();
const { getTrees, getTreeById, getControlsByTreeId } = require('../controllers/tree');

// Route: /:db/tree
router.get('/:db/tree', getTrees);

// Route: /:db/tree/:id
router.get('/:db/tree/:id', getTreeById);

// Route: /:db/tree/:id/control
router.get('/:db/tree/:id/control', getControlsByTreeId);

module.exports = router;
