const express = require('express');
const router = express.Router();
const { checkDbHealth } = require('../controllers/health');

router.get('/', checkDbHealth);

module.exports = router;
