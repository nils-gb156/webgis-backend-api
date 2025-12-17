const { lohmar_pool, roetgen_pool } = require('../db');

const checkDbHealth = async (req, res) => {
	const results = {};
	try {
		await lohmar_pool.query('SELECT 1');
		results.lohmar_db = { status: 'ok', db: process.env.DB1_NAME };
	} catch (err) {
		results.lohmar_db = { status: 'error', error: err.message };
	}
	try {
		await roetgen_pool.query('SELECT 1');
		results.roetgen_db = { status: 'ok', db: process.env.DB2_NAME };
	} catch (err) {
		results.roetgen_db = { status: 'error', error: err.message };
	}
	res.json(results);
};

module.exports = { checkDbHealth };
